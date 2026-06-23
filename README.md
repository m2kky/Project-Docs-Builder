# Project Docs Builder

Production-grade Agent Skill for creating, reviewing, updating, and auditing full project documentation packs from a short brief or partial docs.

It is designed for documentation-first software projects where the docs must drive product decisions, requirements, architecture, API contracts, data modeling, UX flows, delivery planning, operations, and AI-assisted implementation.

Built by muhammed mekky.

## Landing Page

Visit the landing page for the visual overview, supported agents, and install commands:

[m2kky.github.io/Project-Docs-Builder](https://m2kky.github.io/Project-Docs-Builder/)

## What It Builds

`project-docs-builder` can generate or maintain documentation systems with:

- Product docs: PRD, vision, scope, personas, journeys, metrics, roadmap.
- Requirements docs: BRS, FRS, detailed function specs, NFRs, user stories, traceability.
- Architecture docs: C4, components, API design, errors, auth, security, threat model, ERD, data dictionary, DFD.
- Integration docs: provider contracts, webhooks, queues, caching, failure handling.
- Operations docs: testing strategy, deployment, monitoring, backup/recovery, incident response, privacy draft.
- UX docs: information architecture, low/medium/high fidelity wireframes, use cases, UI states.
- Engineering docs: onboarding, team workflow, branching, review checklist, definition of done.
- AI docs: agent rules, runbook, context index, team routing, phase prompts.
- Artifacts: Mermaid diagrams and OpenAPI skeletons.

## Skill Files

```text
SKILL.md
agents/openai.yaml
references/
  intake-and-routing.md
  full-pack-structure.md
  document-templates.md
  quality-gates.md
scripts/
  scaffold_docs_pack.py
```

## Install

### npm CLI

Install a native skill or adapter with npm after the registry publish is available:

```bash
npx project-docs-builder install codex
npx project-docs-builder install claude --scope project
npx project-docs-builder install antigravity
npx project-docs-builder install amazonq --project .
```

Create a docs-pack skeleton:

```bash
npx project-docs-builder scaffold . --level full
```

Useful commands:

```bash
npx project-docs-builder paths
npx project-docs-builder adapters
```

If the npm package is not available yet, use the GitHub fallback:

```bash
npx github:m2kky/Project-Docs-Builder install codex
```

### Manual install

This repository is already a complete `SKILL.md` skill folder. For tools that support Agent Skills natively, clone the repository directly into that tool's skills directory.

### Native Agent Skills

| Tool | User/global install | Project install | Invoke |
| --- | --- | --- | --- |
| OpenAI Codex | `~/.agents/skills/project-docs-builder` | `.agents/skills/project-docs-builder` | `$project-docs-builder` |
| Claude Code | `~/.claude/skills/project-docs-builder` | `.claude/skills/project-docs-builder` | `/project-docs-builder` |
| Google Antigravity | `~/.gemini/config/skills/project-docs-builder` | `.agents/skills/project-docs-builder` | Ask Antigravity to use Project Docs Builder |
| VS Code / GitHub Copilot Agent Skills | N/A | `.github/skills/project-docs-builder` | `/project-docs-builder` |

macOS/Linux examples:

```bash
git clone https://github.com/m2kky/Project-Docs-Builder.git ~/.agents/skills/project-docs-builder
git clone https://github.com/m2kky/Project-Docs-Builder.git ~/.claude/skills/project-docs-builder
git clone https://github.com/m2kky/Project-Docs-Builder.git ~/.gemini/config/skills/project-docs-builder
```

Windows PowerShell examples:

```powershell
git clone https://github.com/m2kky/Project-Docs-Builder.git "$env:USERPROFILE\.agents\skills\project-docs-builder"
git clone https://github.com/m2kky/Project-Docs-Builder.git "$env:USERPROFILE\.claude\skills\project-docs-builder"
git clone https://github.com/m2kky/Project-Docs-Builder.git "$env:USERPROFILE\.gemini\config\skills\project-docs-builder"
```

Project-scoped examples:

```bash
git clone https://github.com/m2kky/Project-Docs-Builder.git .agents/skills/project-docs-builder
git clone https://github.com/m2kky/Project-Docs-Builder.git .claude/skills/project-docs-builder
git clone https://github.com/m2kky/Project-Docs-Builder.git .github/skills/project-docs-builder
```

Codex installs that still scan the older `~/.codex/skills` location can also use:

```powershell
git clone https://github.com/m2kky/Project-Docs-Builder.git $env:USERPROFILE\.codex\skills\project-docs-builder
```

Restart the agent/IDE if the skill does not appear immediately.

### Rule or Instruction Adapters

Some agents do not load `SKILL.md` folders directly, but they can still use Project Docs Builder through rules or instruction files. Clone the repo somewhere stable, then add a small adapter rule that tells the agent to read `SKILL.md` and the referenced files when documentation-pack work is requested.

Recommended project-local clone:

```bash
git clone https://github.com/m2kky/Project-Docs-Builder.git tools/project-docs-builder
```

Adapter text:

```markdown
# Project Docs Builder

When asked to create, review, update, or audit project documentation, use the Project Docs Builder workflow.

Read `tools/project-docs-builder/SKILL.md` first. Load only the referenced files under `tools/project-docs-builder/references/` that match the task. Create implementation-grade docs, not summaries. Keep product, requirements, architecture, data, API, UX, testing, deployment, operations, and AI-agent docs consistent with each other.
```

Common adapter locations:

| Tool | Put the adapter in |
| --- | --- |
| Amazon Q Developer | `.amazonq/rules/project-docs-builder.md` |
| Kiro CLI / Kiro IDE | `.kiro/steering/project-docs-builder.md` |
| Cursor | `AGENTS.md` or `.cursor/rules/project-docs-builder.mdc` |
| GitHub Copilot repository instructions | `.github/copilot-instructions.md`, `.github/instructions/project-docs-builder.instructions.md`, or `AGENTS.md` |
| Gemini CLI | `GEMINI.md`, or configure Gemini CLI to use `AGENTS.md` |
| Windsurf / Devin Cascade | `AGENTS.md`, `.devin/rules/project-docs-builder.md`, or legacy `.windsurf/rules/project-docs-builder.md` |
| Cline | `.clinerules/project-docs-builder.md` or `AGENTS.md` |
| Roo Code | `.roo/rules/project-docs-builder.md` |
| Continue | `.continue/rules/project-docs-builder.md` |
| OpenCode, Aider, Zed, Junie, and other AGENTS.md-aware agents | `AGENTS.md` |

For rule-only tools that do not reliably follow file references, copy the core workflow from `SKILL.md` into the adapter file instead of referencing it indirectly.

## Usage

Example prompts:

```text
Use $project-docs-builder to create a full documentation pack for a SaaS booking platform.
```

```text
Use $project-docs-builder to review this docs folder and find missing architecture, API, security, and operations docs.
```

```text
Use $project-docs-builder to update the documentation after adding Paymob webhooks and private product downloads.
```

## Scaffold Script

The skill includes a small Python helper that creates a docs-pack skeleton.

Dry-run:

```bash
python scripts/scaffold_docs_pack.py /path/to/project --level full --dry-run
```

Create files:

```bash
python scripts/scaffold_docs_pack.py /path/to/project --level full
```

Supported levels:

- `lite`
- `full`
- `enterprise`

The script only writes safe placeholders. The agent should fill the content using the project brief and the skill references.

## Compatibility Notes

- `SKILL.md` is the canonical source for this package.
- `references/` contains the detailed templates and quality gates used through progressive disclosure.
- `scripts/scaffold_docs_pack.py` is optional and creates only safe placeholder files.
- `bin/project-docs-builder.js` is the npm CLI installer and scaffold wrapper.
- Rule/instruction adapters are fallback wrappers for agents that do not support native Agent Skills yet.

Official references checked on 2026-06-23:

- [OpenAI Codex Agent Skills](https://developers.openai.com/codex/skills)
- [Claude Code skills](https://code.claude.com/docs/en/skills)
- [Google Antigravity skills](https://antigravity.google/docs/skills)
- [VS Code Agent Skills](https://code.visualstudio.com/docs/agent-customization/agent-skills)
- [AGENTS.md](https://agents.md/)
- [Amazon Q Developer project rules](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/context-project-rules.html)
- [GitHub Copilot repository custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions)

## Version

Current version: `0.2.1`

## License

MIT. See [LICENSE](LICENSE).
