# Project Docs Builder

Production-grade Codex skill for creating, reviewing, updating, and auditing full project documentation packs from a short brief or partial docs.

It is designed for documentation-first software projects where the docs must drive product decisions, requirements, architecture, API contracts, data modeling, UX flows, delivery planning, operations, and AI-assisted implementation.

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

Clone this repository into your Codex skills directory:

```bash
git clone https://github.com/m2kky/Project-Docs-Builder.git ~/.codex/skills/project-docs-builder
```

On Windows:

```powershell
git clone https://github.com/m2kky/Project-Docs-Builder.git $env:USERPROFILE\.codex\skills\project-docs-builder
```

Restart Codex after installing if the skill does not appear immediately.

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

The script only writes safe placeholders. The Codex agent should fill the content using the project brief and the skill references.

## Version

Current version: `0.1.0`

## License

MIT. See [LICENSE](LICENSE).
