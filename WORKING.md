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
- **SF-WRK-6** Work in one agent loop: one context that plans, acts, and revises
  its own plan. Spawn a subagent only when that loop measurably degrades from
  context bloat, when independent tasks need fresh contexts in parallel that are
  discarded afterwards, or when one context cannot pick the right tools or holds
  conflicting instructions. Split work by context, never by problem type or
  role, and have each subagent return a compact result.
- **SF-FIN-1** Never claim a task is done, blocked, or broken without concrete
  proof, such as a passing command, compiler error, or observed system state.
