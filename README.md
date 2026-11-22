# constitution

[![License: Apache 2.0](https://img.shields.io/badge/license-Apache_2.0-blue?style=flat-square)](LICENSE)

The shared coding standards and review policy for System F Software. Every
repository in the organization vendors this one and is reviewed against the same
rules.

## What is here

| File                                       | Read it when                                                                                                                |
| :----------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| [CODING_STANDARDS.md](CODING_STANDARDS.md) | You plan, write, review or propose a test for code in any organization repository. It leads with "Impossible states first". |
| [REVIEW.md](REVIEW.md)                     | You review a change or answer review findings: the finding bar, severities and evidence.                                    |
| [GRADERS.md](GRADERS.md)                   | You build or change a check: a lint rule, CI job, hook, threshold or rubric.                                                |
| [WORKING.md](WORKING.md)                   | Always: every repository imports it into its always-on `AGENTS.md` or `CLAUDE.md`.                                          |
| [`docs/solutions/`](docs/solutions)        | You want the past problem behind a rule.                                                                                    |

The files follow the `CODING_STANDARDS.md` and `REVIEW.md` model of the
[Compound Engineering plugin](https://github.com/EveryInc/compound-engineering-plugin):
`ce-code-review` and Claude Code Review read them as criteria and review policy.

## Use it in a repository

1. Vendor this repository with `git subtree` at `repos/constitution/`.
2. In the repository's root `REVIEW.md`, include both files, each on its own
   line:

   ```markdown
   @repos/constitution/CODING_STANDARDS.md @repos/constitution/REVIEW.md
   ```

3. Keep the repository's own rules in its own `CODING_STANDARDS.md` and
   `REVIEW.md`. A repository with no rules of its own may symlink its root
   `CODING_STANDARDS.md` to `repos/constitution/CODING_STANDARDS.md`.
4. Route agents to the standards and review files from the repository's
   `AGENTS.md` under the trigger "you plan, write, review or propose a test",
   and to `GRADERS.md` under "you build or change a check". Do not `@`-import
   those into an always-loaded file.
5. `@`-import `repos/constitution/WORKING.md` into the always-on `AGENTS.md` or
   `CLAUDE.md`, on a line of its own.

A repository with its own root `CODING_STANDARDS.md` receives the organization's
rules through the `REVIEW.md` include: review tools find standards files by
placement, so the vendored copy otherwise governs only `repos/constitution/`.

Update the vendored copy with
`git subtree pull --prefix repos/constitution https://github.com/systemfsoftware/constitution main --squash`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Apache 2.0. See [LICENSE](LICENSE).
