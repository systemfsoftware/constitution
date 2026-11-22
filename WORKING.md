# Working

How every agent works in a systemfsoftware repository. A repository imports this
file into its always-on `AGENTS.md` or `CLAUDE.md`. A repository's own
instructions may narrow a rule here, never loosen it.

- **SF-WRK-1** Deliver the whole task. Stop only when it is merged or in the
  merge queue, or blocked by something only the owner holds; say which.
- **SF-WRK-2** Do reversible work without asking. A design or technical decision
  you would ask the owner goes to Gemini; report its answer and proceed.
- **SF-WRK-3** Spawn no subagents unless the owner asked for them in this task.
- **SF-WRK-4** Run no full test suite, end-to-end or microVM run on a shared
  host; CI runs them.
- **SF-WRK-5** Before a destructive or wide step, restate the instruction's verb
  and object in one line and act on that, not on a nearby meaning.
- **SF-FIN-1** Call nothing done, blocked or broken without the output that
  shows it: a command that passed, the compiler error, or the state of the real
  system.
