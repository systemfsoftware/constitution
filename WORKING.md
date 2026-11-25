# Working

Rules for every agent in a systemfsoftware repository. Each repository imports
this file into its always-on `AGENTS.md` or `CLAUDE.md`. Local instructions may
narrow these rules, never loosen them.

- **SF-WRK-1** Deliver the whole task. Stop only when merged, in the merge
  queue, or blocked by something only the owner holds, and state which applies.
- **SF-WRK-2** Do reversible work without asking. Send any design or technical
  decision you would ask the owner to Gemini, report its answer, and proceed.
- **SF-WRK-4** Never run full test suites, end-to-end tests, or microVM runs on
  shared hosts; leave them to CI.
- **SF-WRK-5** Before any destructive or broad action, restate the instruction's
  verb and object in one line and act strictly on that, not on a nearby
  interpretation.
- **SF-WRK-6** Default to one agent loop: one context that plans, acts, and
  revises its own plan, loading tools and instructions on demand. Unless
  explicitly requested by the owner, spawn a subagent only to isolate a
  self-contained task whose raw context would bloat the main loop, to run
  independent tasks in parallel with fresh contexts discarded afterward, or to
  separate conflicting instructions or toolsets that one context cannot cleanly
  hold. Divide work by context boundary (including independent review) rather
  than splitting sequential execution across handoff roles, and require each
  subagent to return a compact result.
- **SF-FIN-1** Never claim a task is done, blocked, or broken without concrete
  proof, such as a passing command, compiler error, or observed system state.
