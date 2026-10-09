#!/usr/bin/env -S deno run --allow-read=/tmp --allow-write=/tmp --allow-run=deno,git --allow-env=VALIDATOR_PATH
const TREE_ROOT = new URL("../", import.meta.url).pathname;
const CONFIG = new URL("../deno.json", import.meta.url).pathname;
const VALIDATOR_ARG = Deno.env.get("VALIDATOR_PATH") ?? "scripts/validate-constitution.ts";
const VALIDATOR = VALIDATOR_ARG.startsWith("/")
  ? VALIDATOR_ARG
  : new URL(VALIDATOR_ARG, `file://${TREE_ROOT}`).pathname;

const CONSTITUTION = `# Constitution

The law text lives here.

## Governance

\`\`\`yaml
- id: CONST-G1
  law: A law must be legible.
  why: Because illegible law cannot be applied.
  example:
    wrong: "Write terse law."
    right: "Write plain law."
\`\`\`

## Testing

\`\`\`yaml
- id: CONST-T1
  law: A gate must fail a command.
  why: A gate that cannot fail is a certificate.
  example:
    wrong: "Report success always."
    right: "Exit non-zero on defect."
\`\`\`
`;

const INCIDENTS = `["consumer abc1234:path/f.ts:12 thing", "this repo 0123abc:scripts/x.ts:3 thing"]`;

const ENFORCEMENT = `# Enforcement

Doctrine prose. Gates fail commands, not clauses.

## Corpus

\`\`\`yaml
version: 1
laws:
  - law: CONST-G1
    handle: LEGIBLE-LAW
    absorbs: [CONST-B1, CONST-B2]
    checks:
      - question: "Is the law legible?"
        criteria: "A reader can act on it."
    mechanism: [review]
    severity: P0
    waiver: "None."
    incidents: ${INCIDENTS}
  - law: CONST-T1
    handle: GATE-FAILS-COMMAND
    absorbs: []
    checks:
      - question: "Does the gate fail?"
        criteria: "Exit is non-zero on defect."
    mechanism: [command]
    severity: P0
    waiver: "None."
    incidents: ${INCIDENTS}
judging:
  - id: CONST-G3
    handle: P0-VERDICT
    rule: "Render a verdict of fixed or wrong."
retired:
  - id: CONST-E7
    reason: "Folded into CONST-G1."
\`\`\`
`;

type Result = { code: number; out: string };

function decode(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

async function runValidator(cwd: string, args: string[] = []): Promise<Result> {
  const cmd = new Deno.Command("deno", {
    args: [
      "run",
      "--quiet",
      "--allow-read=CONSTITUTION.md,ENFORCEMENT.md",
      "--allow-run=git",
      `--config=${CONFIG}`,
      VALIDATOR,
      ...args,
    ],
    cwd,
    stdout: "piped",
    stderr: "piped",
  });
  const o = await cmd.output();
  return { code: o.code, out: decode(o.stdout) + decode(o.stderr) };
}

async function runGit(cwd: string, args: string[]): Promise<void> {
  const cmd = new Deno.Command("git", {
    args: ["-c", "user.email=test@example.com", "-c", "user.name=test", "-c", "commit.gpgsign=false", ...args],
    cwd,
    stdout: "piped",
    stderr: "piped",
  });
  const o = await cmd.output();
  if (!o.success) {
    throw new Error(`git ${args.join(" ")} failed: ${decode(o.stderr)}`);
  }
}

async function withCorpus(
  files: { constitution?: string; enforcement: string },
  fn: (dir: string) => Promise<void>,
): Promise<void> {
  const dir = await Deno.makeTempDir({ dir: "/tmp", prefix: "constitution-test-" });
  try {
    await Deno.writeTextFile(`${dir}/CONSTITUTION.md`, files.constitution ?? CONSTITUTION);
    await Deno.writeTextFile(`${dir}/ENFORCEMENT.md`, files.enforcement);
    await fn(dir);
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
}

function assert(cond: boolean, message: string): void {
  if (!cond) throw new Error(message);
}

function assertFailsWith(result: Result, needle: string): void {
  assert(result.code === 1, `expected exit 1, got ${result.code}; output: ${result.out}`);
  assert(
    result.out.includes(needle),
    `expected output to include ${JSON.stringify(needle)}; got: ${result.out}`,
  );
}

type Case = { name: string; fn: () => Promise<void> };
const cases: Case[] = [];
function test(name: string, fn: () => Promise<void>): void {
  cases.push({ name, fn });
}

test("#green: a valid placeholder corpus exits 0, and --against its own rev exits 0", async () => {
  await withCorpus({ enforcement: ENFORCEMENT }, async (dir) => {
    const r = await runValidator(dir);
    assert(r.code === 0, `expected exit 0, got ${r.code}; output: ${r.out}`);
    assert(r.out.includes("valid: 2 laws, 1 judging rules"), `success line missing: ${r.out}`);

    await runGit(dir, ["init", "-q"]);
    await runGit(dir, ["add", "-A"]);
    await runGit(dir, ["commit", "-qm", "rev"]);
    await runGit(dir, ["tag", "rev"]);
    const against = await runValidator(dir, ["--against", "rev"]);
    assert(against.code === 0, `expected exit 0, got ${against.code}; output: ${against.out}`);
  });
});

test("#1: a fabricated absorbed or retired id is rejected", async () => {
  const citedAbsorbed = ENFORCEMENT
    .replace(
      "Doctrine prose. Gates fail commands, not clauses.",
      "Doctrine prose. CONST-Q9 governs the gate.",
    )
    .replace("absorbs: [CONST-B1, CONST-B2]", "absorbs: [CONST-B5, CONST-Q9]");
  await withCorpus({ enforcement: citedAbsorbed }, async (dir) => {
    assertFailsWith(await runValidator(dir), "CONST-Q9");
  });

  const liveFamilyAbsorbed = ENFORCEMENT.replace(
    "absorbs: [CONST-B1, CONST-B2]",
    "absorbs: [CONST-B5, CONST-B7]",
  );
  await withCorpus({ enforcement: liveFamilyAbsorbed }, async (dir) => {
    assertFailsWith(await runValidator(dir), "absorbed id 'CONST-B7' is not a known old id");
  });

  const fabricatedRetired = ENFORCEMENT.replace(
    "- id: CONST-E7\n    reason: \"Folded into CONST-G1.\"",
    "- id: CONST-Q9\n    reason: \"Folded into CONST-G1.\"",
  );
  await withCorpus({ enforcement: fabricatedRetired }, async (dir) => {
    assertFailsWith(await runValidator(dir), "retired id 'CONST-Q9' is not a known old id");
  });
});

test("#3: --against fails when an id absorbed at rev has no home now", async () => {
  await withCorpus({ enforcement: ENFORCEMENT }, async (dir) => {
    const rev = ENFORCEMENT.replace("absorbs: [CONST-B1, CONST-B2]", "absorbs: [CONST-B1, CONST-B5]");
    await Deno.writeTextFile(`${dir}/ENFORCEMENT.md`, rev);
    await runGit(dir, ["init", "-q"]);
    await runGit(dir, ["add", "-A"]);
    await runGit(dir, ["commit", "-qm", "rev"]);
    await runGit(dir, ["tag", "rev"]);
    await Deno.writeTextFile(
      `${dir}/ENFORCEMENT.md`,
      ENFORCEMENT.replace("absorbs: [CONST-B1, CONST-B2]", "absorbs: [CONST-B1]"),
    );
    assertFailsWith(await runValidator(dir, ["--against", "rev"]), "unaccounted id CONST-B5");
  });
});

test("#12: an absorbed id must match the id shape and carry a registered family", async () => {
  const enf = ENFORCEMENT.replace("absorbs: [CONST-B1, CONST-B2]", "absorbs: [CONST-Z5, CONST-9]");
  await withCorpus({ enforcement: enf }, async (dir) => {
    const r = await runValidator(dir);
    assertFailsWith(r, "absorbed id 'CONST-Z5' has family 'Z' which is not registered");
    assert(
      r.out.includes("absorbed id 'CONST-9' does not match"),
      `expected shape FAIL line; got: ${r.out}`,
    );
  });
});

test("#13: an empty checks list is rejected", async () => {
  const enf = ENFORCEMENT.replace(
    "    checks:\n      - question: \"Is the law legible?\"\n        criteria: \"A reader can act on it.\"\n",
    "    checks: []\n",
  );
  assert(enf.includes("checks: []"), "fixture edit failed");
  await withCorpus({ enforcement: enf }, async (dir) => {
    assertFailsWith(await runValidator(dir), "'checks' must be a non-empty list");
  });
});

let failed = 0;
for (const c of cases) {
  try {
    await c.fn();
    console.log(`ok - ${c.name}`);
  } catch (e) {
    failed++;
    console.error(`not ok - ${c.name}\n  ${(e as Error).message}`);
  }
}
if (failed > 0) {
  console.error(`\n${failed} failed, ${cases.length - failed} passed`);
  Deno.exit(1);
}
console.log(`\nall ${cases.length} passed`);
