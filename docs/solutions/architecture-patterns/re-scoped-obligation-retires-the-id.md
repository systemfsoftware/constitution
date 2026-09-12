---
title: A re-scoped obligation retires its rule id, and a captured output is evidence rather than an artifact
date: 2026-09-12
category: architecture-patterns
module: constitution corpus amendment
problem_type: architecture_pattern
component: tooling
severity: high
applies_when:
  - An existing rule's obligation is narrowed, widened, or re-scoped rather than reworded
  - A rule licenses snapshots or same-lineage differentials as the expected side of an assertion
  - A consumer repo hard-codes the corpus rule count in a badge or prose
root_cause: same-lineage oracle presented as a published-surface comparison
tags: [constitution, rule-identity, characterization, snapshot, differential, retirement]
---

## Context

CONST-T11 read "Snapshots and Differentials Are Published-Surface Oracles" and permitted
`snapshot only canonicalized published output; compare two implementations only of the same
published operation (or a prior published major against current)`.

That permission put the subject on both sides of the assertion: a stored snapshot records what
the subject currently emits, and a prior-published-major comparator builds the expected side
from a second build of the same subject. A suite written that way is green whenever the subject
is wrong in both places, so it certifies nothing while reading as coverage.

## Guidance

**Separate the technique from the artifact.** Snapshot and differential testing are legitimate
development-time techniques. What the corpus forbids is committing them: a stored-output
snapshot, a recorded-output fixture, or a differential-comparison test must never land in the
repository. The evidence lives in a dot-prefixed gitignored scratch directory and is deleted in
the commit that lands the intended-contract tests — the committed suite then asserts intended
behavior against an oracle the subject did not produce (`CONST-T10`).

**Retire and re-mint; do not rename in place.** `AGENTS.md` splits the two cases:

- same obligation reworded or moved: keep the id;
- obligation narrowed, widened, split, or deleted: retire the old id forever and mint the next
  free number in the family.

Renaming a rule under its existing id is an id reassignment, and the validator refuses it:

```
FAIL reassigned id: 'CONST-T11' named "… Published-Surface Oracles" at origin/main and names
"… Never Committed Artifacts" now — every citation to it resolves to a different rule
```

The reassignment check is run with `--against <rev>` after a rule is deleted, split, merged, or
re-scoped — not after every edit. A retirement reports as `1 id(s) vacated`, which is legal; a
changed title under the same id does not.

**Keep the count true.** Retire-and-mint is count-neutral at the assembled revision: the badge
and its prose stay accurate once both halves land, though not between the two commits that carry
both ids or neither. A deletion is not count-neutral, and a count that only a human recomputes is
the kind of field `ENFORCEMENT.md` tells gates not to trust.

**Carry the subject-scoping clauses across.** Re-scoping the artifact side does not retire the
subject side: a snapshot of a private helper, mapper, or unexported module, and a snapshot of a
value small enough to be a property or a named example, stay forbidden. Drop them and a scratch
snapshot of a private helper survives a rule whose whole point is that tests assert observable
behavior.

**State the obligation, not a permission.** `do:` opens with what must hold. A `do:` that grants
a use and then delegates the binding to another rule reads as a usage note; the corpus convention
is an obligation sentence.

## Applicability

Applies when a corpus rule's obligation changes shape, and to any rule whose `check:` names a
mechanism — name the rung that can carry the obligation (`lint` for a static pattern) and state
the review fallback, rather than claiming an enrolled implementation that no repo carries.
