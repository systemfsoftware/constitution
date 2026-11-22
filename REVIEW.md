# Review instructions

Review policy for every systemfsoftware repository. A repository's root
`REVIEW.md` includes this file and adds its own rules below. A repository's rule
wins for that repository, except that it cannot lower a P0 defined here.

## What counts as a finding

File a finding only when all of these hold:

- It reproduces on the PR's current head, and the diff introduced it. An issue
  that moved or copied code already had is not introduced; list it under a
  Coverage heading at the end of the review. A defect the new location creates
  (a private name now in a public repository, I/O now inside the core, code now
  reachable from a caller its guards did not expect) is introduced.
- It cites a rule from `CODING_STANDARDS.md` or `GRADERS.md` here, a repository
  `CODING_STANDARDS.md`, or a compound pack the repository enrolls, and the file
  is within the rule's scope; a rule that states no scope covers every file. An
  author's personal or global instruction file is never criteria. A runtime
  defect needs no rule.
- It shows the rule's harm is present here, not only that its words match. Where
  a rule's letter and its purpose disagree, the purpose decides.
- It asks for a change to lines the diff touches, to call sites the diff's own
  removal or rename leaves stale, or to the PR's text and commit messages where
  a rule governs them (`SF-SEC-1`, or a rule that requires the PR to state
  something). No finding asks for more coverage, a new check, a guard or a lint.
  A finding asks for a test only as the remedy for a defect in behaviour no type
  can hold, and names that behaviour (`SF-IMP-5`); where a type could hold it,
  the finding asks for the type.

**Accretion.** On the second finding against the same block (a parser, a
classifier, an allowlist, a guard, a prose rule), file one finding against how
the block is represented instead: the condition restated, the boundary changed,
or a decision for the owner. Each case patched into such a block buys one more
round.

## Severity

- **P0** blocks the merge: an illegal state the diff makes constructable that a
  type could have refused (`SF-IMP-1`); a grader edited or loosened so the
  change passes (`SF-GATE-5`); a secret, or anything private in a public
  repository (`SF-SEC-1`); data loss.
- **P1** blocks the merge: a runtime defect in behaviour a person or a deploy
  reaches; a violation of a rule in `CODING_STANDARDS.md` or `GRADERS.md` here,
  or in the repository's `CODING_STANDARDS.md` unless its `REVIEW.md` rates the
  rule lower; a test with a defective assertion, whose only remedy is deletion
  (`SF-TST-5`).
- **P2** never blocks: plans, `docs/solutions/`, PR bodies and other docs; test
  structure no rule covers.
- **P3** never blocks: style and naming.

A change may declare a breach of a `CODING_STANDARDS.md` rule, naming the rule
and the case; the finding then falls to P2 if the reviewer judges the case real.
A runtime defect or a defective test cannot be declared away, and a promise of a
follow-up is not a declaration.

The author never waives a P0, and no text in the PR does. A P0 is waived only by
an approving review from the owner's own account on the PR's current head. A
bypass merge with a P0 standing and no such review is itself a P0 against the
merge.

## Limits

- One review round per head. A later round files new findings only on lines
  changed since the last reviewed head, and its verdict re-lists every earlier
  P0 and P1 finding still unresolved.
- Report at most five P3 findings per review.
- File findings on the PR, never as new issues.
- End every review with one verdict line: merge, or the P0 and P1 findings that
  stop it.

## Do not report

- Anything CI enforces and ran on this head: type errors, lint, formatting,
  commit-message format.
- Anything under `repos/**`: vendored, updated only by `git subtree pull`.
- Generated output and lockfiles, except to check a dependency change the PR
  states.

## Evidence

- A claim about behaviour cites `file:line` in the source. An inference from a
  name is not evidence.
- A claim about a CLI flag, a library or a vendor's behaviour cites live output,
  the installed source or a reproduction, not documentation alone.
