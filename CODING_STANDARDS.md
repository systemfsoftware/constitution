# Coding Standards

Review criteria for every repository in the systemfsoftware organization. A
repository vendors this repository with `git subtree` at `repos/constitution/`,
and its own `CODING_STANDARDS.md` files add the rules only that repository
needs. A repository's own rule wins for that repository, except that it cannot
loosen anything `REVIEW.md` rates P0. Cite a rule by its ID, as `(SF-IMP-1)`.

Read every rule by its purpose: where its words and its harm part ways, the harm
decides.

## Impossible states first

Before you write or propose any test, make the wrong state impossible to build.
A state the compiler refuses needs no test, and no later change can bring it
back unnoticed.

- **SF-IMP-1** In typed code, close your types so an illegal value cannot be
  constructed: a union of the valid combinations, a branded type for each role,
  a separate service tag for each resource that must not be shared. Model
  mutually exclusive states as a tagged union, one variant per state carrying
  only its own fields; keep a plain nullable only for a value that is absent the
  same way in every state. Outside data becomes a domain type only through a
  decode that returns a typed result, never through a cast or a suppression
  comment. Where a program in an untyped language reads outside data, it
  validates that data at the boundary with a schema that fails.
  - Why: a value the type could have refused reaches runtime, and every check
    downstream trusts it.
  - Wrong: a lock helper took a lock spec and a nullable adapter, so a spec that
    required the lock, paired with no adapter, ran its body unlocked.
  - Right: one union of the valid spec-and-adapter pairs made the unlocked case
    impossible to construct.
- **SF-IMP-3** In typed code, give every failure a caller handles differently
  its own tagged variant, so callers can branch on the real failure.
- **SF-IMP-4** The compiler is the evidence for such a fix. Commit one tstyche
  assertion that the refused state is refused, in the package's `test-types/`,
  run by its `typecheck` script (`tsc -b && tstyche`) and never by its tests.
  Use `expect<Bad>().type.not.toBeAssignableTo<Good>()` (or
  `not.toBeAssignableFrom`); use `toRaiseError` only where no assignability pair
  expresses the refusal (an overload, an inference failure, a missing service),
  and always with the expected message. Import both types from the package's own
  exports. Write one per state the change closes, and delete it with the type.
  Where the language has no such tool, paste the compiler error into the PR
  body.
  - Why: it costs no test run, fails when the state becomes constructable again,
    and passes for that reason only.
- **SF-IMP-5** Never write or propose an integration, end-to-end or microVM test
  for an invariant a type can hold: make the type hold it (`SF-IMP-1`). Runtime
  tests are for what the compiler cannot prove: a decode of outside data, a
  peer's answer, timing, what a real database or runtime does. Write them at the
  lightest tier that reaches that boundary, and a proposal for one names the
  behaviour it covers.
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
- **SF-TST-4** Judge outcomes, not steps. Assert what the system produced, never
  which functions ran, which lines a file holds, or which keys, entries or
  values the repository's own configuration lists.
  - Why: a test of steps or configuration breaks on every refactor and passes
    while the outcome is wrong.
- **SF-TST-5** Every test must be able to fail when the behaviour it names
  breaks. A test whose assertion is defective (it checks steps, configuration or
  file layout, copies its expected value from the code, cannot fail, or covers
  removed behaviour) is deleted, never rewritten, retitled or replaced. A test
  whose only fault is how it reaches the code (an internal import, a real clock)
  is fixed. Deleting a worthless test is welcome and is not lost coverage. A
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
  next read or write as data, and a thin shell performs it. The shell imports
  the core, and every implementation is wired at one composition root; the core
  never imports the shell, a database or a framework.
  - Why: a decision chained to the world it touches cannot be tested or
    replaced.
- **SF-SHP-5** Fix the root cause; when the design is wrong, restructure it. Add
  no alias, fallback or compatibility shim nobody asked for.
  - Why: a patched symptom comes back, and every shim is a second path to keep
    correct.
- **SF-SHP-7** Treat every line as a liability: delete, unify or make the bad
  state unconstructable before you add. A removal reaches every definition, call
  site and export in the same change.
  - Why: the codebase only grows, and two conventions standing is the next
    change imitating the wrong one.
- **SF-SHP-8** Before you write a client, a script, a test utility or a helper
  another module could reuse, search the organization's packages and the
  repository's skills for one. If one exists, use it or fix it there. A PR that
  adds one names where it searched. Add no patch, fork or override of a
  dependency; change the design that needed it or fix it upstream.
  - Why: a second copy drifts from the first, and a patched dependency silently
    diverges on every upgrade.
- **SF-SHP-9** Scripts are typed programs in the repository's typed language
  (Deno or TypeScript where it has none), never shell beyond a wrapper that only
  sets options and runs one command.
  - Why: a shell script has no types and no tests, and fails silently.

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
thresholds, rubrics. A change that builds or edits one also reads `GRADERS.md`.

- **SF-GATE-2** Add a check only for a mistake it names, and key it on the
  failure itself (recomputed source, the compiler's verdict, the real outcome),
  never on names, line positions, formatting or a field the author supplied.
  When something fails, fix the failure; do not add a check beside it.
  - Why: brittle checks pile up, block correct work and still miss the mistake.
- **SF-GATE-5** A grader changes only in a change whose task is that grader,
  shown refusing a case it must refuse and passing the tree; a CI run is that
  evidence where the check is too heavy to run locally. Never edit, loosen or
  add to a grader (a threshold, budget, glob, baseline, lint config, workflow,
  rubric, a `CODING_STANDARDS.md` or `REVIEW.md`, or a timeout a test or CI step
  runs under) so that in-flight work passes. A timeout a program waits on a
  network, database or peer at run time is not a grader. When the owner orders a
  grader changed or turned off, that is a change whose task is the grader: make
  it in its own PR, holding nothing else.
  - Why: whoever edits the grader reports the score they chose.

## Maintaining this file

- A rule enters only when a review finding the author fixed, a fix commit or a
  solution record shows the failure, no check covers it, and it holds in every
  repository. State it as a condition a reviewer can see in a diff, with no
  volatile numbers. Delete or merge before you add.
- IDs are permanent. A rule that is merged or retired leaves a gap; its number
  is never reused. Retired so far: SF-IMP-2 into SF-IMP-1, SF-TST-3 into
  SF-TST-5, SF-SHP-2 into SF-SHP-1; SF-SHP-3, SF-SHP-4 and SF-SHP-6 deleted;
  SF-GATE-1, -3, -4 and -6 moved to `GRADERS.md`; SF-FIN-1 moved to
  `WORKING.md`.
- How agents work, as distinct from what code looks like, goes in `WORKING.md`.
