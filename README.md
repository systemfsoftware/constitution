# Constitution

[![License: Apache-2.0](https://img.shields.io/badge/license-Apache%202.0-blue?style=flat-square)](LICENSE)
[![System F Software](https://img.shields.io/badge/systemfsoftware.com-constitution-black?style=flat-square)](https://systemfsoftware.com/constitution)
[![Rules: 40](https://img.shields.io/badge/rules-40%20in%20corpus-blue?style=flat-square)](CONSTITUTION.md)

Shared engineering laws for repositories at [System F Software](https://systemfsoftware.com).

It sets baseline requirements for clean code: a pure functional core behind a thin imperative shell, domain types before logic, mutation testing for decisions, and deleting code before writing more. Principles are stack-neutral, so they apply to any language.

```mermaid
flowchart LR
    S["<b>systemfsoftware/constitution</b><br><i>Upstream Repository</i>"] -->|git subtree| A[Consumer Repo A]
    S -->|git subtree| B[Consumer Repo B]
    S -->|git subtree| C[Consumer Repo C]
    A -.symlink.-> S
    B -.symlink.-> S
    C -.symlink.-> S
```

---

## One file, always resident

The whole constitution lives in one file, loaded into agent context on every run:

```
constitution/
└── CONSTITUTION.md    # All five articles + Application: resident on every run
```

| File | Delivery | Contents | How to load it |
| :--- | :--- | :--- | :--- |
| `CONSTITUTION.md` | **Always on** | Application + Articles I–V (Pure Core, Boundaries, Testing, Project Layout, Conduct) | Include in agent context on every turn (`@CONSTITUTION.md` in `AGENTS.md` or `CLAUDE.md`) |

Law that is not in the window is not law. Retrieval forces presence of a document, never conformance to it, and compaction silently drops rules that live outside the context window — so nothing is split out and nothing is loaded on demand.

---

## Quick start

Vendor the repository using `git subtree` and symlink the constitution to the project root:

```bash
# 1. Fetch the remote into a local ref
git fetch https://github.com/systemfsoftware/constitution.git main:refs/remotes/vendor/constitution

# 2. Add as a squashed subtree
git subtree add --prefix=vendor/constitution refs/remotes/vendor/constitution --squash \
  -m "chore: vendor shared constitution"

# 3. Symlink the constitution to the repo root
ln -s vendor/constitution/CONSTITUTION.md CONSTITUTION.md
```

If the repository is brand new, create an initial commit first (`git commit --allow-empty -m "init"`).

### Connect to your agent harness

1. Add `@CONSTITUTION.md` to `AGENTS.md` or `CLAUDE.md`.
2. Optionally add the marketplace and install the TTSR plugin, whose rule files state the same residency contract:
   ```bash
   omp plugin marketplace add systemfsoftware/constitution
   omp plugin install constitution@systemfsoftware-marketplace
   ```

---

## The articles

| Article | Core rules |
| :--- | :--- |
| **Application** | Invoke rules by the harm they name, prefer the gate, evidence before done, the evaluator is not the agent's to edit, the constitution is supreme. |
| **I: Pure Core** | Pure decisions, explicit types, tagged error variants, no `null` states. |
| **II: Boundaries** | Functional core / imperative shell, values for effects, decode inputs rather than casting. |
| **III: Verification** | The trophy's investment order, properties by narrow grant, mutation as the measure, independent oracles, pinned published contracts. |
| **IV: Organization** | Organize by domain responsibility, clear naming, keep modules small. |
| **V: Conduct** | Zero-appeal P0 review enforcement, fix root causes, challenge decisions before committing, remove code before adding. |

---

## Pulling updates

Pull upstream changes into the subtree without changing existing symlinks:

```bash
git subtree pull --prefix=vendor/constitution https://github.com/systemfsoftware/constitution.git main --squash \
  -m "chore: update shared constitution"
```

---

## Machine validation

Every rule is defined in structured YAML:

```yaml
- id: CONST-S4
  title: Subtract Before You Add
  gate: review
  do: treat every line as a liability — removal is the default response to slop
  dont: extend a copy-paste cluster; patch around a rotten core
  harm: the codebase only grows; rot survives every patch and regrows
  check: review reads the net line delta; fixes that leave root violations are rejected
```

Run the validator to check rule IDs, schema compliance, and references across the corpus:

```bash
deno task test
```

---

## Contributing

Amendments need a written explanation, a version bump, and updates to consuming repos. See [AGENTS.md](AGENTS.md) for commit standards and testing guidelines.

## License

[Apache-2.0](LICENSE) (c) 2026 Ryan Lee.
