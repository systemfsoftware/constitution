# Review instructions

How review behaves in every repository of the systemfsoftware organization. A
repository's root `REVIEW.md` includes this file and `CODING_STANDARDS.md` from
its vendored copy (`@repos/constitution/REVIEW.md`,
`@repos/constitution/CODING_STANDARDS.md`), and adds its own severities, checks
and exclusions below them. Where the two disagree, the repository's file wins
for that repository, except that it cannot lower a P0 defined here.

## What counts as a finding

File a finding only when all of these hold:

- It reproduces on the PR's current head, on a line the diff adds, edits, moves
  or copies. That the violation existed before the change, or came over with
  moved code, never lowers it. An issue only on untouched lines goes in
  Coverage, not in the findings.
- It cites a rule from `CODING_STANDARDS.md` here, a repository
  `CODING_STANDARDS.md`, or a compound pack the repository enrolls, and that
  rule's stated scope covers the file. An author's personal or global
  instruction file is never criteria. A runtime defect needs no rule.
- It shows the rule's harm is present here, not only that its words match. Where
  a rule's letter and its purpose disagree, the purpose decides.
- The PR body does not record it as a deliberate tradeoff that names the rule.
  If it does, contest the tradeoff instead of the line.
- It asks for a change to the lines the diff touches. A finding that only asks
  for more coverage is not a finding.
- A finding that asks for a test names the behaviour no type can hold
  (`SF-IMP-5`). A finding that asks for an integration, end-to-end or microVM
  test of an invariant a type could hold is not a finding; ask for the type
  instead.

**Accretion.** On the second finding against the same block (a parser, a
classifier, an allowlist, a guard, a prose rule), file one finding against how
the block is represented instead: the condition restated, the boundary changed,
or a decision for the owner. Each case patched into such a block buys one more
round.

## Severity

- **P0**: an illegal state a type could have refused (`SF-IMP-1` to `SF-IMP-3`)
  in new or changed code; a grader edited or loosened so the change passes
  (`SF-GATE-5`); a secret, or anything private in a public repository
  (`SF-SEC-1`); data loss. While one stands, the change is not ready, whatever
  else it fixes.
- **P1**: a runtime defect in behaviour a person or a deploy reaches; a
  violation of any other rule in `CODING_STANDARDS.md` here or in the
  repository; a test that breaks a test rule. A test that cannot fail is a
  broken grader, so it blocks the merge, and its only remedy is deletion
  (`SF-TST-5`).
- **P2 at most**: plans, `docs/solutions/`, PR bodies and other docs; test
  structure no rule covers. These never block a merge.
- **P3**: style and naming.

A breach is legal only when the change itself declares it, naming the rule and
the case. A promise of a follow-up is not a declaration.

## Limits

- Report at most five P3 findings per review.
- On a re-review, report P0 and P1 findings, plus any finding on lines changed
  since the last reviewed head. Don't re-raise findings already recorded as
  follow-ups.

## Do not report

- Anything CI already enforces: type errors, lint, formatting, commit messages.
- Anything under `repos/**`: vendored, updated only by `git subtree pull`.
- Generated output and lockfiles, except to check a dependency change the PR
  states.

## Evidence

- A claim about behaviour cites `file:line` in the source. An inference from a
  name is not evidence.
- A claim about a CLI flag, a library or a vendor's behaviour cites live output,
  the installed source or a reproduction, not documentation alone.
