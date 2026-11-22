# Coding Standards

Review criteria for every repository in the systemfsoftware organization. A
repository vendors this repository with `git subtree` at `repos/constitution/`,
and its own `CODING_STANDARDS.md` files add the rules only that repository
needs. A local rule may narrow a rule here, never loosen it. Cite a rule by its
ID, as `(SF-IMP-1)`.

Read every rule by its purpose: where its words and its harm part ways, the harm
decides.

## Impossible states first

Before you write or propose any test, make the wrong state impossible to build.
A state the compiler refuses needs no test, and no later change can bring it
back unnoticed.

- **SF-IMP-1** Close your types so an illegal value cannot be constructed: a
  union of the valid combinations, a branded type for each role, a separate
  service tag for each resource that must not be shared. Outside data becomes a
  domain type only through a decode that returns a typed result, never through a
  cast or a suppression comment.
  - Why: a value the type could have refused reaches runtime, and every check
    downstream trusts it.
  - Wrong: a lock helper took a lock spec and a nullable adapter, so a spec that
    required the lock, paired with no adapter, ran its body unlocked.
  - Right: one union of the valid spec-and-adapter pairs made the unlocked case
    impossible to construct.
- **SF-IMP-2** Model mutually exclusive states as a tagged union, one variant
  per state carrying only its own fields. Keep a plain nullable only for a value
  that is absent the same way in every state.
  - Why: a state machine hides in a record, and the compiler cannot reject an
    invalid mix of fields.
- **SF-IMP-3** Give every distinct failure its own tagged variant.
  - Why: callers cannot branch on the real failure, and distinct errors collapse
    into one case.
- **SF-IMP-4** The compiler is the evidence for such a fix. Wire the wrong state
  once on purpose, paste the compiler error into the PR body, and revert the
  wiring. Never commit that wiring as a test.
  - Why: the type error holds on every future build; a test proves one case once
    and costs a run every time.
- **SF-IMP-5** Never write or propose an integration, end-to-end or microVM test
  for an invariant a type can hold: make the type hold it (`SF-IMP-1`). Runtime
  tests are for what the compiler cannot prove (a decode of outside data, a
  peer's answer, timing, what a real database or runtime does), at the lightest
  tier that reaches that boundary, and a proposal for one names the behaviour it
  covers.
  - Why: those tests run for minutes on hosts every session shares, and they
    prove less than a compile error.

## Tests

- **SF-TST-1** Test the published surface with real inputs and outputs: what a
  consumer imports or calls, never the package's internals.
  - Why: a test that stops short of what ships stays green while the shipped
    artifact is broken.
- **SF-TST-2** Take every expected value from an oracle the code under test did
  not produce: a literal from the requirement, an independent fixture, a law
  between two views, or a second implementation.
  - Why: a test that compares the code with itself cannot fail when the code is
    wrong.
- **SF-TST-3** Make every test able to fail when the behaviour it names breaks,
  and see it fail once.
  - Why: a suite that notices nothing certifies nothing, and a toothless test
    hides among the ones that work.
- **SF-TST-4** Judge outcomes, not steps. Assert what the system produced, never
  which functions ran, which lines a file holds, or which keys, entries or
  values the repository's own configuration lists.
  - Why: a test of steps or configuration breaks on every refactor and passes
    while the outcome is wrong.
- **SF-TST-5** A test whose assertion breaks these rules (it checks steps,
  configuration or file layout, copies its expected value from the code, cannot
  fail, or covers removed behaviour) is deleted, never rewritten, retitled or
  replaced. Deleting a worthless test is welcome and is not lost coverage. A
  test that keeps these rules and goes red found a defect: fix the code under
  test, never the test.
  - Why: a reshaped bad test keeps its cost and its false confidence; a weakened
    good test hides the defect it found.
- **SF-TST-6** A unit test is deterministic and isolated: no child process, real
  clock, network, host port, host file system or state shared with another test.
  I/O belongs to an adapter's tests, run where the repository's testing rules
  say.
  - Why: a test that spawns processes or sleeps stalls the machine it runs on
    and fails by timing, not by defect.
- **SF-TST-7** A property test that times out is a design failure. Fix the
  schema it draws from, or delete the test if it is a scenario dressed as a
  property. Never raise its timeout, cut its runs or narrow its generator.
  - Why: a tuned budget hides a schema that admits values the domain does not.

## Shape the code

- **SF-SHP-1** Keep effects at the edges, as values: a pure step returns the
  next read or write as data, and a thin shell performs it.
  - Why: an effect inside a decision cannot be tested without the world it
    touches.
- **SF-SHP-2** The shell imports the core, and every implementation is wired at
  one composition root. The core never imports the shell, a database or a
  framework.
  - Why: a decision chained to infrastructure cannot be tested or replaced.
- **SF-SHP-3** Name every file and folder for its job; a name answers "of
  what?".
  - Why: a bucket named for a layer says nothing a reader can check, and one
    change scatters across the tree.
- **SF-SHP-4** Give each module one responsibility, and split it when its tests
  need elaborate setup.
  - Why: nobody can reason about the whole module, and its tests grow brittle.
- **SF-SHP-5** Fix the root cause; when the design is wrong, restructure it. Add
  no alias, fallback or compatibility shim nobody asked for.
  - Why: a patched symptom comes back, and every shim is a second path to keep
    correct.
- **SF-SHP-6** Justify every choice by these rules and the repository's own,
  never by the file next to it or an earlier plan's wording.
  - Why: an unexamined default hardens into a rule, and each copy seeds the
    next.
- **SF-SHP-7** Treat every line as a liability: delete, unify or make the bad
  state unconstructable before you add. A removal reaches every definition, call
  site and export in the same change.
  - Why: the codebase only grows, and two conventions standing is the next
    change imitating the wrong one.
- **SF-SHP-8** Prefer what the runtime, the lockfile and the organization's own
  packages already provide. Add no patch, fork or override of a dependency;
  change the design that needed it or fix it upstream. A PR that adds a
  third-party dependency states its registry maintainers, publish provenance,
  weekly downloads and three real dependents, each read from the primary source.
  - Why: a patched dependency silently diverges on every upgrade, and an
    unvetted one is a supply-chain hole.

## Secrets and public repositories

- **SF-SEC-1** Commit no secret, token or credential. A public repository
  receives nothing from a private one: no private repository, package or product
  name, local path, host, person, email, private run ID or link, issue-tracker
  ID, or internal agent or process name, in files, fixtures, commit messages, PR
  text or comments.
  - Why: a leaked secret must be rotated everywhere it reached, and a private
    name in public history cannot be taken back.

## Checks and gates

These apply to anything that grades work: lint rules, CI jobs, hooks,
thresholds, rubrics.

- **SF-GATE-1** Bind each obligation through the strongest mechanism that can
  carry it: the type system first, then a command that fails, then a refusal
  before the call runs, and prose last.
  - Why: prose orients and enforces nothing; a type error cannot be argued with.
- **SF-GATE-2** Add a check only for a mistake it names, and key it on the
  failure itself (recomputed source, the compiler's verdict, the real outcome),
  never on names, line positions, formatting or a field the author supplied.
  When something fails, fix the failure; do not add a check beside it.
  - Why: brittle checks pile up, block correct work and still miss the mistake.
- **SF-GATE-3** A check asserts its input set: an empty corpus, an empty file
  list or a missing input is a failure.
  - Why: a check that cannot fail is a certificate, not enforcement.
- **SF-GATE-4** Decide which checks, tests and requirements apply to code from
  what it is and does, never from its name or location.
  - Why: a rename or a move silently drops a requirement, or applies one where
    it does not belong.
- **SF-GATE-5** A grader changes only in a change whose task is that grader,
  observed failing before and passing after. Never edit, loosen or add to a
  grader (a threshold, budget, glob, baseline, timeout, lint config, workflow or
  rubric) so that in-flight work passes.
  - Why: whoever edits the grader reports the score they chose.
- **SF-GATE-6** Enroll a rule over a clean tree, at error: fix every live
  violation first. No baseline, allowlist or warn level.
  - Why: a baseline is suppression with a date on it, and a warning is noise
    nobody reads.

## Finish

- **SF-FIN-1** Show evidence before you call work done: a command that passed,
  the compiler error, or the state of the real system.
  - Why: work called done on no evidence ships broken.

## Former IDs

The laws in the retired `CONSTITUTION.md` map here. Dated plans keep the old
IDs; read them through this table.

| Former                                                     | Now                                    |
| :--------------------------------------------------------- | :------------------------------------- |
| CONST-D1, CONST-B5                                         | SF-IMP-1                               |
| CONST-D4                                                   | SF-IMP-2                               |
| CONST-D2                                                   | SF-IMP-3                               |
| CONST-B1, CONST-B2, CONST-B3, CONST-B6, CONST-P1, CONST-P2 | SF-SHP-1                               |
| CONST-B4                                                   | SF-SHP-2                               |
| CONST-N1, CONST-N2                                         | SF-SHP-3                               |
| CONST-N3                                                   | SF-SHP-4                               |
| CONST-S1                                                   | SF-SHP-5                               |
| CONST-S2                                                   | SF-SHP-6                               |
| CONST-S4, CONST-S3                                         | SF-SHP-7                               |
| CONST-T8, CONST-T9, CONST-T14, CONST-T15                   | SF-TST-1                               |
| CONST-T10                                                  | SF-TST-2                               |
| CONST-T3, CONST-T13                                        | SF-TST-3                               |
| CONST-T12, CONST-P3                                        | SF-GATE-4                              |
| CONST-E7, CONST-E9                                         | SF-FIN-1, SF-GATE-5                    |
| CONST-W1                                                   | moved to each agent's own instructions |
| CONST-G3, CONST-G4, CONST-G5                               | `REVIEW.md`                            |
| CONST-D3, CONST-W2, CONST-W3, and any other                | retired                                |
