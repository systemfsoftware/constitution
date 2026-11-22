# Graders

Read this when a change builds or edits anything that grades work: a lint rule,
a CI job, a hook, a threshold, a rubric. `SF-GATE-2` and `SF-GATE-5` in
`CODING_STANDARDS.md` apply as well.

- **SF-GATE-1** Bind each obligation through the strongest mechanism that can
  carry it: the type system first, then a command that fails, then a refusal
  before the call runs, and prose last.
- **SF-GATE-3** A check asserts its input set: an empty corpus, an empty file
  list or a missing input is a failure.
  - Why: a check that cannot fail is a certificate, not enforcement.
- **SF-GATE-4** Decide which checks, tests and requirements apply to code from
  what it is and does, never from its name or location.
  - Why: a rename or a move silently drops a requirement, or applies one where
    it does not belong.
- **SF-GATE-6** Enroll a rule over a clean tree, at error: fix every live
  violation first. No baseline, allowlist or warn level.
  - Why: a baseline is suppression with a date on it, and a warning is noise
    nobody reads.
