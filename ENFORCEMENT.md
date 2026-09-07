# Enforcement

Doctrine for whoever owns the instruments that grade the maker — lint gates, stream rules, CI checks, thresholds, rubrics, advisors. This document is **not resident** in the maker's context and must never be `@`-imported by a maker's harness: the maker's law is `CONSTITUTION.md`; this file is read by the channel that builds and changes the machinery of judgment, at the moment it does so.

## The ladder

An obligation binds through the strongest mechanism that can carry it, strongest first:

1. **The type system** — the illegal state does not construct. Nothing re-fires because nothing can fire.
2. **A command that fails** — a lint rule, a compiler diagnostic, a mutation threshold, a boundary audit: red until the shape is right.
3. **A refusal at the decision point** — a stream rule that interrupts the violating write or tool call as it happens.
4. **Resident prose** — the floor. It orients and obligates; it does not enforce.

Measured in-house (software-wiki `pin-or-gate` corpus): a restraint carried only by prose holds at 0% unaided; resident governance is dropped by compaction (violations 0% → 30% after one compact, 59% for the worst model) and decays over turns (prohibition compliance 73% at turn 5 → 33% at turn 16); re-firing the rule at the decision point restores 0%. Presence in the window is the floor, not the contract — a document that is always loaded is still only loaded, and loading is not binding.

## Gate design (the doctrine formerly CONST-E5)

- Key every gate on a recomputation — source bytes, a compiler verdict, a rehash — never on a field the gated work's author supplied. When a gate reads a field, recompute that field in the same run.
- A gate whose verdict the gated agent can produce or observe is unverified until an independent channel confirms it: an instrument the agent does not control, or review by someone who is not the gated agent.
- Never accept a self-reported field, a presence flag, a metadata suffix, or a comment as evidence a property holds. Never treat a mechanical gate's green as self-certifying.
- A gate that cannot fail is a certificate, not enforcement: assert the input set, not only the contents — an empty mutated set, an empty corpus, and a missing input must all go red.

Check: review — each gate names the recomputation it runs and the independent channel that confirms its verdict; a fixture proves each gate can fail.

## Changing an instrument (the doctrine formerly CONST-E8)

- An instrument change lands alone, in its own commit, observed failing before and passing after, for the reason it states — and by hands that do not hold the work the instrument judges.
- Never loosen a threshold, budget, glob, or baseline to make in-flight work pass. There is no separate-commit exception: the same hands in a second commit is the same cheat with better hygiene.
- The maker's side of this boundary is `CONSTITUTION.md` CONST-E9; this side is yours: when the maker escalates an ungated principle, you build the instrument, land it through your own channel, and only then does the maker's work proceed.

Check: review — no commit carries both an instrument change and the work it judges; a loosened threshold stands alone and names its reason.

## Enrollment (settled 2026-09-07)

- A new gate enrolls over a clean tree only: migrate every live violation first, then enroll at error. A baseline, an allowlist of existing violations, or a per-file override is suppression with a date on it — the gate then certifies a tree it never measured.
- The gate fires where the consumer stands: a rule registered only in its own test harness is not enrolled; carriage is proven by driving the published artifact the way a consumer resolves it.
- `warn` is dominated. A rule is error with a clean tree, or off with the reason named. A warning is a decision deferred until it is invisible.
- Delete the retired shape from every owner at enrollment — a migration that leaves the old form standing is two conventions, and the next agent imitates the wrong one.

Check: review — enrollment lands after the migration commit, on a tree where the rule already passes; a planted forbidden shape goes red through the consumer-facing chain.

## Historical correction (2026-09-07)

Commit `26a527c` ("restore the single resident document") retired this repo's stream-rule plugin on the argument that residency makes every stream rule redundant — "an interrupt can only inject text the agent already has." That conflated the two things an interrupt can do. An interrupt that re-injects resident text is indeed redundant. An interrupt that *refuses* the violating write is the mechanism residency cannot be: it re-fires at the decision point, after compaction, at turn 40, when the resident text has long since stopped binding. The same commit minted enforcement rules in the maker's voice ("make any principle that can fail a command fail that command") while deleting the refusal channel and flipping the corpus gate inside the same commit as the corpus it gates. The residency merge itself stands; the enforcement reasoning is superseded by this document and by CONST-E9.
