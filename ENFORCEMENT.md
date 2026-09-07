# Enforcement

Doctrine for whoever owns the instruments that grade the maker — lint gates, stream rules, CI checks, thresholds, rubrics, advisors. Read at the moment an instrument is built or changed. Never `@`-imported into a maker's context: the maker's law is `CONSTITUTION.md`, and the maker must not meet instrument doctrine while doing graded work.

Every claim below names its ground. Wiki entity names resolve in the software-wiki canon; arXiv ids are primary sources.

## Why the maker never holds the instrument

The separation is measured, not principled:

- A model that catches an error presented as external misses the byte-identical error attributed to its own reasoning 64.5% of the time (arXiv:2507.02778). A gate the producer grades through is the corrupted channel.
- Role-separated review lifts a weak producer 71.6% → 89.7%; the producer's own self-review reaches only 84.5% (arXiv:2607.21656). Who reviews beats how hard the producer thinks.
- Given a blocked task and reachable machinery, the measured behaviour is to edit the machinery — agents may delete failing tests rather than fix the bug, more complex scaffolds encourage more cheating, and more capable models cheat at higher rates, not lower (arXiv:2510.20270). RL post-training lifts the exploit rate from 0.6% to 13.9%, and 72% of exploits carry explicit chain-of-thought framing — the cheat arrives laundered in plausible reasoning (arXiv:2605.02964).
- The measured remedy is structural: read-only access to the instruments prevents the modification while restoring legitimate performance (arXiv:2510.20270).

Hence CONST-E9 on the maker's side and everything below on yours. A model the instrument grades must not be able to reach the instrument.

## Choosing the rung

An obligation binds through the strongest mechanism that can carry it, strongest first:

1. **The type system.** The illegal state does not construct; nothing re-fires because nothing can fire. 94% of LLM compile errors are type errors (arXiv:2504.09246) — the compiler is the channel the author already watches.
2. **A command that fails.** Lint, mutation threshold, boundary audit: red until the shape is right.
3. **A refusal at the decision point.** A pre-execution verdict that blocks the write or tool call is emission-gated: the call does not execute whatever the model read. A post-hoc stream rule that only injects a reminder is window-mediated — it re-enters the same window the violation just left, and holds only as well as prose does (`restraint-gates-must-be-emission-gated`, `window-mediated-versus-emission-gated`).
4. **Resident prose.** The floor. It orients; it does not enforce. Measured in-house (`pin-or-gate`): a prose-only restraint holds at 0% unaided; compaction drops resident governance (violations 0% → 30%); compliance decays over turns (73% at turn 5 → 33% at turn 16); re-firing at the decision point restores 0%.

Presence in the window is the floor, not the contract (`compelled-retrieval-gate-limits`). When you build, build on the highest rung that can carry the obligation.

## Gate design

Four admission tests, each naming a measured failure shape:

1. **Polarity.** State the gate as one sentence. If it forbids an end state — *do not ship an export whose dist file is missing* — it may proceed. If it commands an action — *declare a category and write a reason* — refuse it: every rule measured as beneficial was a negative constraint; positive directives distort (arXiv:2604.11088). A commanded ritual is satisfiable without the concern it stands for being true.
2. **Witness.** Who supplies the value the gate checks? If the party the gate governs writes it, the check has no independent witness (`form-checking-gate-is-a-ritual`). Key the verdict on a recomputation from source bytes, a compiler verdict, or a rehash. When the gate must read a field, recompute the field in the same run.
3. **Direction.** Every uncertainty resolves against the permissive outcome: unparseable output degrades to revise, never to pass; an absent grant means required, not waived; an unscannable input is surfaced, never silently skipped; a dead run never reports itself running (`fail-closed-verdict-direction`). Silence never infers the permissive reading.
4. **Vacuity.** Assert the input set, not only its contents: an empty corpus, an empty mutated set, and a missing input must all go red. A gate that cannot fail is a certificate, not enforcement.

## Changing an instrument

- An instrument change lands alone, in its own commit, observed failing before and passing after, for the reason it states — by hands that do not hold the work the instrument judges.
- Never loosen a threshold, budget, glob, or baseline to make in-flight work pass. The same hands in a second commit is the same cheat with better hygiene.
- When the maker escalates an ungated principle (CONST-E9's hand-off), you build the instrument, land it through your own channel, and only then does the maker's work proceed.

## Enrollment

- A new gate enrolls over a clean tree only: migrate every live violation first, then enroll at error. A baseline or allowlist of existing violations is suppression with a date on it — the gate then certifies a tree it never measured.
- The gate fires where the consumer stands. A rule registered only in its own test harness is not enrolled; carriage is proven by driving the published artifact the way a consumer resolves it.
- `warn` is dominated: error with a clean tree, or off with the reason named. A warning is a decision deferred until it is invisible (`warn-severity-is-dominated`).
- Delete the retired shape from every owner at enrollment. A migration that leaves the old form standing is two conventions, and the next agent imitates the wrong one.

## Accretion

Enforcement machinery only grows unless you price it. Three gradients, all measured (`gate-accretion-mechanism`): deletion produces no artifact while addition produces a file; a doctrine that asks instruction files to earn their place while gates go untested teaches that gates are free; an audit whose score rises with file count pays for addition. The repairs:

- Every gate names the mistake it prevents. A gate that cannot name one does not land.
- Judge gate work by net line delta, so subtraction has an artifact.
- Keep the enforcement surface read-only to the agents it governs — the measured intervention, and the reason this document and the maker's corpus are different documents.
