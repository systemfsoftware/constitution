# OMP Plugin — Supreme Engineering Constitution

Time-Traveling Stream Rules (TTSR) plugin for Oh My Pi (OMP) and Claude Code that carries the [System F Software Engineering Constitution](https://github.com/systemfsoftware/constitution) into the agent's working context.

## What this plugin does

The constitution is **one file** — `CONSTITUTION.md` — resident in agent context on every run. This plugin does not intercept edits and does not point at any retrieved document: a regex cannot see purity, sandwich order, or oracle independence, so the rule files declare no conditions at all. Each states the residency contract for its article and nothing more:

- **`rules/constitution-pure-core.md` (Article I):** the constitution is one file, already in context; apply the article when authoring domain types or decision functions.
- **`rules/constitution-boundary.md` (Article II):** the same contract for handlers, adapters, ports, and composition roots.
- **`rules/constitution-verification.md` (Article III):** the same contract for authoring or judging tests.
- **`rules/constitution-conduct-review.md` (Article V & Governance):** the one active interrupt — fires on mechanically observable downgrade/bypass language during review or implementation and enforces the automatic-P0 / zero-appeal / declared-bypass law (`CONST-G3`, `CONST-W3`).

## Installation

Install in OMP:

```bash
omp plugin install @systemfsoftware/omp-plugin-constitution
```

Or link directly in local development:

```bash
omp plugin link ./plugins/constitution
```

## License

Apache-2.0
