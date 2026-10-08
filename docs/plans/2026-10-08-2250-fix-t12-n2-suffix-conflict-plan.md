---
title: T12 and N2 Suffix Conflict, S4 Net-Delta Check - Plan
type: fix
date: 2026-10-08
topic: t12-n2-suffix-conflict
artifact_contract: ce-unified-plan/v1
product_contract_source: ce-brainstorm
execution: code
---

# T12 and N2 Suffix Conflict, S4 Net-Delta Check - Plan

## Goal Capsule

- **Objective:** A repository that vendors the constitution can obey every rule at once. Specifically, an allowed-suffix filename lint and a runner's ordinary test discovery no longer violate CONST-T12. A reviewer grading a change against CONST-S4 works from a net line delta computed from the diff, never from an eyeballed figure or one the author supplied.
- **Means:** Rewrite CONST-T12's `check` and add a `scope` (KTD1). Rewrite the opening clause of CONST-S4's `check` (KTD2). Update the README's S4 excerpt to match (KTD3). Both rule ids stay.
- **Authority:** Conductor rulings c02 and c03 settle every open product question. `CONSTITUTION.md` governs the meaning of any rule. `AGENTS.md` governs the commit, verification, and surface-class discipline. The conductor's rulings are not the owner's approval: `CONSTITUTION.md` and `README.md` are human-controlled, so the PR opens for the owner to approve the final text before merge.
- **Execution profile:** One feature branch off `origin/main`, opened as one PR carrying the T12, S4, and README edits plus this plan. No stack split (KTD5).
- **Stop conditions:** Stop for repair, without approximating, if a find-pattern in Appendix A misses. Stop if `deno task test --against origin/main` reports any reassigned or vacated id. Stop if a gate fails for a reason the edits do not explain. If commit signing fails, report the exact error and leave the git config alone.
- **Who finishes:** The implementer (`ce-work`) lands the edits, runs the Verification Contract, and opens the PR. The conductor merges.

---

## Product Contract

Product Contract preservation: changed R4, R6, R7, R8, R10, R12. Each was an open fork in the brainstorm or a doc-review finding, and conductor rulings c02 and c03 resolved it. No requirement was added or dropped.

### Summary

Rewrite CONST-T12's `check` so that no rule, runner, project split, or tool picks the requirement, harness, or suite that governs a test from its folder or from any part of its name beyond the generic test-file ending. A new `scope` states how `do` and `check` are read, and permits naming and placement lints and a runner's generic test discovery. Sharpen CONST-S4's `check` so that review computes the net line delta from the diff against the change's base, defined as the merge base with the target branch at review time.

### Problem Frame

CONST-T12's `check` reads "lint — no linter or test runner rules that pick tests by filename suffix" (`CONSTITUTION.md:280`). CONST-N2's `check` reads "filename lint — allowed suffixes" (`CONSTITUTION.md:305`), and its `dont` forbids "a suffix no rule keys on" (`CONSTITUTION.md:303`). An allowed-suffix lint inspects test files by suffix, so obeying N2 breaks T12's literal check. The same literal check also forbids the default discovery of mainstream runners: Vitest's default `include` is `**/*.{test,spec}.?(c|m)[jt]s?(x)`.

The conflict is in the letter, not the purpose. T12's harm is "renaming a test file secretly stops its rules from running while the test suite still looks complete" (`CONSTITUTION.md:279`). A naming lint applies no testing requirement, and generic discovery decides only that a file runs. A rename cannot make a requirement stop firing through either one. CONST-G5 names "conflicts left unresolved" as a harm, so the letter contradiction must be fixed in the text itself.

The contradiction has a second leg. If only an allowed-suffix list keys on a test-kind suffix, that suffix is a label nothing checks. It passes N2's lint while carrying the very harm N2 names.

CONST-S4's `check` opens with "review reads the net line delta" (`CONSTITUTION.md:392`). "Reads" is satisfied by a glance or by an author's stated figure. The why-and-what-deleted clause it triggers therefore turns on a number nobody had to compute.

### Key Decisions

- **The fix lands in T12; N2 stays verbatim.** T12's check overreaches its own harm, while N2's lint governs names. Governs R2, R3. (session-settled: user-directed — chosen over amending N2: the brief required N2 kept verbatim.)
- **A runner may recognise a test by the generic test-file ending; nothing may use a kind or lane suffix to pick the requirement, harness, or suite.** The generic ending decides only that a file runs. Governs R3, R4, R6. (session-settled: user-directed — chosen over a total ban on suffix-based runner selection and over permitting suffix selection outright: a total ban outlaws mainstream runner defaults, and outright permission lets a lane suffix route requirements.)
- **CONST-T12 keeps its id; `title`, `do`, `dont`, and `harm` stay byte-identical, and the changed check is declared under CONST-W3.** The obligation (no requirement may depend on a file's name) is unchanged. The edit stops the check from also outlawing N2's naming lint and generic discovery. Governs R10. (session-settled: user-directed — chosen over retire-and-mint: the conductor judged the obligation unchanged.)
- **`do` governs what kind of test a file is, not whether a file is a test at all.** Its own gloss ("public exports or pure logic under mutation") names kinds. A runner recognising a file as a test by the generic ending therefore does not classify it under `do`. T12's `scope` opens by stating this reading, so the corpus text settles it rather than this plan. Governs R6, R10. (session-settled: user-directed — chosen over editing `do`: the ruling keeps `do` byte-identical, and editing it would put the id at risk.)
- **For S4, review computes the delta and never grades on an author-supplied figure.** CONST-E7 holds that "a report of either is not either", and `ENFORCEMENT.md:17` keys verdicts on recomputation. S4 keeps its id. Governs R7, R8. (session-settled: user-directed — chosen over requiring the author to report the delta, alone or alongside recomputation: an author's figure is the field the doctrine forbids grading on, and requiring a report would widen the obligation and vacate S4.)
- **T12 names no other rule by id and no concrete suffix.** The naming lint is described by its function. Governs R5. (session-settled: user-directed — chosen over citing CONST-N2: a functional description survives renumbering and keeps the rule self-contained.)
- **A bare allowed-suffix list is not "a rule that keys on" a suffix under N2, read by purpose.** A list certifies only that a label is on the list. A consumer that wants test-kind suffixes needs a lint that checks the name against the file's imports, which R4 permits. N2's text is unchanged. Governs R4. (session-settled: user-directed — chosen over counting the list as keying: that reading leaves test-kind suffixes as unchecked labels.)
- **Whether generated or lock files count toward the delta is left to consumers' ADRs.** It is a contestable choice under CONST-G5. Governs R7. (session-settled: user-directed — chosen over a constitutional clause: such a clause would pin a contestable choice.)

### Requirements

**T12 and N2 coexist**

- R1. One tree can run an allowed-suffix filename lint (N2) and satisfy T12's check together.
- R2. CONST-N2 stays byte-identical.
- R3. T12 forbids every rule, runner, project split, or tool that picks the requirement, harness, or suite governing a test from its folder or from any part of its name beyond the generic test-file ending.
- R4. T12's `scope` says that a lint checking a file's name or placement, whether against an allowed list or against the file's imports, governs the name and states no requirement a rename can drop, because every requirement it enforces resolves from the test's imports and calls. A two-way lint that fails any file whose test-kind suffix disagrees with its imports is permitted (AE5); a one-way lint that requires a suffixed file to import something is not (AE2).
- R5. T12 names no concrete suffix and cites no other rule by id.
- R6. T12's `scope` opens by stating how `do` and `check` are read: `do` governs what kind of test a file is, not whether a file is a test at all. It then says that a runner may recognise a file as a test by the generic test-file ending it uses for discovery, and that this decides only that the file runs.

**S4 net-delta check**

- R7. S4's check requires review to compute the net line delta from the diff against the change's base: the merge base of the change and its target branch at the time of review, recomputed whenever the target moves. The clause carries that one definition and no other.
- R8. S4's check forbids grading on a figure the author supplied.
- R9. The rest of S4's check stays verbatim: the why-and-what-deleted clause, the features exemption, root violations, "rotten", and the CONST-T9 pin.

**Identity, consistency, verification**

- R10. CONST-T12 and CONST-S4 keep their ids and titles, and the change declares under CONST-W3 that each changed check leaves its obligation unchanged.
- R11. No other rule's text changes, including G4, G5, N2, T13, T15, and W2.
- R12. `README.md`'s CONST-S4 excerpt reproduces the changed opening ("review reads the net line delta", `README.md:69`), so it is updated to reproduce U2's opening clause up to "from the diff". The PR body's first line carries the human-controlled notice and says the README edit is included.
- R13. `deno task test` passes. `deno task test --against origin/main` reports no reassigned id and no vacated id. The rule count stays 36.

### Acceptance Examples

- AE1. **Covers R1, R4.** Given a lint that fails any file whose suffix is not on an allowed list, when it inspects a test file's name, then T12 is not violated.
- AE2. **Covers R3.** Given a lint that requires files with a property-test suffix to import a property library, when such a file is renamed to a plain test name, then T12 is violated, because the requirement was keyed on the suffix and the rename dropped it.
- AE3. **Covers R3.** Given a lint that requires every test importing a property library to run under mutation, when the same file is renamed, then T12 is satisfied, because the requirement follows the import.
- AE4. **Covers R7, R8.** Given a refactor PR whose body says "net −40" while the diff against its base computes to +12, then S4 is graded on +12, and the refactor owes its why-and-what-deleted statement.
- AE5. **Covers R1, R4.** Given a lint that fails any file whose test-kind suffix disagrees with its imports, when a property test is renamed to a plain test name, then the rename fails loudly, T12 is satisfied, and the suffix is one a rule keys on for N2's purposes.
- AE6. **Covers R3, R6.** Given a runner that discovers files by the generic test-file ending, then T12 is satisfied. Given a runner or project split that sends files with an integration-kind suffix to a separate suite or harness, then T12 is violated.

### Scope Boundaries

- No new article, family, gate value, or schema field.
- No edit to N2, G4, G5, T13, T15, W2, `ENFORCEMENT.md`, or `CONCEPTS.md`. `ENFORCEMENT.md:37` already agrees with R7.
- No validator change. A mechanical net-delta gate or a T12 lint is instrument work for its owner (CONST-E9).
- No tests are added. The repository has no test suite; the corpus gate and the diff invariants in the Verification Contract are the verification.
- No constitution text defines which test-file endings are generic. The runner's own discovery configuration defines them; a consuming repo that customises discovery records that in its own ADR.
- Earlier files under `docs/plans/` are dated records and stay unedited.
- Considered and not built: S4's features exemption keys on a change's self-declared type, which is an author-supplied label. It is outside this brief; a ruling that extends R8's reasoning to change type would reopen it.
- Considered and not built: proof that any consumer backs T12's `gate: lint` with a real lint. This repository cannot observe that.

### Dependencies / Assumptions

- Measured at `origin/main` 693a6d7: `deno task test` gives "valid: 36 rules across 6 yaml blocks in 1 files, 9 families", and `--against origin/main` reports no id reassigned. These expectations hold only for that base. Re-derive them if the base moves.
- Validator facts: required fields are `id, title, gate, do, dont, harm, check`; optional fields are `scope, example, layers` (`scripts/validate-constitution.ts:60-61`). `--against` flags reassignment only when an id's title changes (`scripts/validate-constitution.ts:247-253`), so keeping an id while its obligation changes is a review matter (`CONCEPTS.md:11`) that the gate cannot see.
- No rule in `CONSTITUTION.md` cites CONST-T12, CONST-N2, or CONST-S4 except the rule itself. `README.md:63-69` excerpts S4.

### Sources / Research

- `CONSTITUTION.md:274-280` (T12), `:296-305` (N2), `:377-392` (S4), `:7-41` (G4, G5).
- `CONCEPTS.md:11`: the identity law for amending in place versus vacating and minting.
- `ENFORCEMENT.md:16-17, 37`: recompute, never trust author-supplied fields; judge by net line delta.
- Commit 37c076f (#25): a kept-id change declared under CONST-W3 in the commit body. This is the shape KTD4 follows, cited as a shape rather than as precedent.
- `docs/solutions/workflow-issues/plans-freeze-observations-about-a-moving-base.md`: verification expectations are scoped to the revision they were measured at.
- vitest.dev/config/include: the default suffix-glob discovery behind R6.

---

## Planning Contract

### Key Technical Decisions

- KTD1. **The T12 edit replaces `check` and inserts `scope` between `dont` and `harm`.** That field order matches CONST-P2, the corpus's other `scope` user, so the block reads in the same order wherever it appears. The normative text is in Appendix A. Governs R3, R4, R5, R6.
- KTD2. **The S4 edit replaces only the opening clause of `check`, the text before its first em dash.** Everything after the em dash stays byte-identical. Governs R7, R8, R9.
- KTD3. **README line 69 changes only its opening clause, to "review computes the net line delta from the diff".** The README's tail after the semicolon stays as it is. Governs R12.
- KTD4. **The CONST-W3 declaration goes in the commit body and in the PR body, not in the corpus.** CONST-W3 asks for the declaration "in the change itself"; rule YAML holds law, not change history. The declaration covers both kept ids. For T12, the obligation is unchanged: `do` governs what kind of test a file is, not whether a file is a test at all, and the check no longer outlaws N2's naming lint or generic test discovery. For S4, only the grading method changes; the maker's obligation does not. Governs R10.
- KTD5. **One branch, one PR, conventional type `fix(constitution)!:` with the breaking marker.** No id is vacated, but T12's rewritten check now names folders: a consumer whose runner or project split chooses a suite or harness by directory violates T12's check, where before only `do` forbade it. Consumers' instruments keyed on the old check must change. (session-settled: user-directed — chosen over two stacked layers: both edits touch one file.) This plan ships in the same PR, following the existing tracked `docs/plans/` files.

### Deferred to Implementation

- The PR body's first line is fixed by ruling c03: "CONSTITUTION.md and README.md are human-controlled: the owner must approve the text before merge.", followed on the same line by the statement that the README edit is included. The W3 declaration wording is composed at execution, within KTD4.
- If the harness's pre-push gate requires the branch to be listed by `gh stack`, a single-layer stack meets it without splitting the PR.

---

## Implementation Units

### U1. Amend CONST-T12

- **Goal:** T12's `check` and new `scope` carry the Appendix A text, and the block's other fields are unchanged.
- **Requirements:** R1, R3, R4, R5, R6, R10; KTD1.
- **Dependencies:** none.
- **Files:** `CONSTITUTION.md`.
- **Approach:**
  1. Read the T12 block and confirm that Appendix A's current-text pattern matches byte-for-byte.
  2. Replace the `check` line and insert the `scope` line after `dont`.
  3. If the pattern misses, stop for repair.
- **Test expectation:** none — law text. The corpus gate and the diff invariants in the Verification Contract cover it.
- **Verification:** The diff touches only T12's `check` line and adds the `scope` line. `title`, `do`, `dont`, and `harm` are byte-identical.

### U2. Amend CONST-S4

- **Goal:** S4's `check` opens with the Appendix A clause, and the rest of the line is byte-identical.
- **Requirements:** R7, R8, R9, R10; KTD2.
- **Dependencies:** none.
- **Files:** `CONSTITUTION.md`.
- **Approach:**
  1. Confirm that the opening clause "review reads the net line delta" is present on S4's `check` line.
  2. Replace only the text before the first em dash.
- **Test expectation:** none — law text.
- **Verification:** The diff touches only the opening clause of S4's `check`.

### U3. Update the README S4 excerpt

- **Goal:** The README's abridged S4 `check` reproduces U2's opening clause up to "from the diff", and the abridged tail after the semicolon is unchanged.
- **Requirements:** R12; KTD3.
- **Dependencies:** U2.
- **Files:** `README.md`.
- **Approach:** Replace "review reads the net line delta" on line 69 with "review computes the net line delta from the diff", and leave the rest of the line as it is.
- **Test expectation:** none — prose.
- **Verification:** The diff touches only line 69 of `README.md`.

---

## Verification Contract

| Gate | Command or check | Expected at 693a6d7 + this change |
|---|---|---|
| Corpus schema | `deno task test` | `valid: 36 rules across 6 yaml blocks in 1 files, 9 families` |
| Id identity | `deno task test --against origin/main` | `no id reassigned since origin/main`, with no vacated-id line |
| Commit message | `deno run --allow-read --allow-env --allow-run --allow-sys npm:@commitlint/cli@21 --from HEAD~1` | exit 0 |
| Diff scope | `git diff origin/main` restricted to `CONSTITUTION.md` and `README.md` | only T12 `check`, the T12 `scope` insertion, S4 `check`, and README line 69 change |
| R5 | the T12 block after the edit | contains no `CONST-` id other than its own, and no literal file suffix |
| R2, R11 | `git diff origin/main -- CONSTITUTION.md` | no hunk outside the T12 and S4 blocks |

Run every row once U1–U3 are applied, in the run that ships them; re-run any row whose inputs change if the base moves.

---

## Definition of Done

- U1–U3 are applied, and every Verification Contract row has passed in the run that ships them.
- The commit is signed and conventional (`fix(constitution)!: …`), and its body carries the KTD4 CONST-W3 declaration.
- The PR body's first line carries the human-controlled notice and states that the README S4 excerpt edit is included. The PR body carries the CONST-W3 declaration and the computed net line delta.
- No abandoned-attempt edits remain in the diff, and the working tree is clean.

---

## Appendix A — Normative payload

**CONST-T12.** Current lines to match:

```yaml
    dont: decide which testing rules apply to a file based on its name or suffix
    harm: renaming a test file secretly stops its rules from running while the test suite still looks complete
    check: lint — no linter or test runner rules that pick tests by filename suffix
```

Replacement: `dont` and `harm` are unchanged, `scope` is inserted, and `check` is replaced.

```yaml
    dont: decide which testing rules apply to a file based on its name or suffix
    scope: states how `do` and `check` are read — `do` governs what kind of test a file is, not whether a file is a test at all; the rule binds which requirement, harness, or suite governs a test, never what a file is called; a lint that checks a file's name or placement, against an allowed list or against the file's imports, governs the name and states no requirement a rename can drop, because every requirement it enforces resolves from the test's imports and calls; a runner may recognise a file as a test by the generic test-file ending it uses to discover tests, which decides only that the file runs, never which requirement, harness, or suite governs it
    harm: renaming a test file secretly stops its rules from running while the test suite still looks complete
    check: lint — no rule, runner, project split, or tool chooses the requirement, harness, or suite that governs a test from its folder or from any part of its name beyond the generic test-file ending; each requirement resolves from the test's imports and calls
```

**CONST-S4.** Opening clause to match: `check: review reads the net line delta — `. Replacement opening clause:

```yaml
    check: review computes the net line delta from the diff against the change's base (the merge base of the change and its target branch at the time of review, recomputed whenever the target moves), never from a figure the author supplied — 
```

The text after the em dash ("a refactor/improvement/chore that adds net lines …" through "… on every published path it deletes") is unchanged.

**README.md line 69.** Replacement:

```yaml
  check: review computes the net line delta from the diff; fixes that leave root violations are rejected
```
