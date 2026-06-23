---
name: project-docs-builder
description: Build, review, update, and audit production-grade project documentation packs from a brief, partial docs, or implementation changes. Use when the user asks to create a full docs folder, PRD/FRS/NFR, architecture docs, ERD/data dictionary, API/OpenAPI docs, UX flows, project plans, engineering workflow docs, AI agent runbooks, operational runbooks, or a documentation system similar to a mature product/architecture repository.
---

# Project Docs Builder

Create a complete documentation system, not a few thin spec files. The goal is a coherent pack that can drive product decisions, implementation, testing, operations, and AI-assisted development.

## Workflow

1. Detect the task mode:
   - **Build**: create a new docs pack from a brief.
   - **Review**: inspect existing docs for gaps, contradictions, missing artifacts, and shallow sections.
   - **Update**: propagate a product, requirement, API, data, UX, or operations change across the relevant docs.
   - **Audit**: verify traceability across PRD, requirements, architecture, data, API, tests, deployment, and operations.
2. Read only the references needed:
   - New pack or broad restructure: `references/intake-and-routing.md`, `references/full-pack-structure.md`, `references/document-templates.md`, and `references/quality-gates.md`.
   - Review/audit: `references/full-pack-structure.md` and `references/quality-gates.md`.
   - Focused update: `references/document-templates.md` plus `references/quality-gates.md`.
3. Gather missing context with a small number of high-value questions. If the user gives a usable brief, proceed and mark open assumptions instead of stalling.
4. Choose pack depth:
   - **Lite**: small project, core product/requirements/architecture/plan only.
   - **Full**: default. Production-ready docs pack with product, requirements, architecture, UX, delivery, engineering, AI, diagrams, and OpenAPI skeleton.
   - **Enterprise**: Full plus deeper compliance, governance, vendor, support, analytics, release, and incident detail.
5. Scaffold the tree when useful:
   - Run `scripts/scaffold_docs_pack.py <target-root> --level full` for an empty structure.
   - Use `--dry-run` first if the target already has docs.
6. Generate docs in dependency order:
   - Product intent -> requirements -> architecture -> data/API -> UX -> testing/ops -> engineering/AI workflow.
7. Maintain cross-document consistency:
   - Requirements must map back to product scope.
   - Architecture must implement requirements.
   - ERD/data dictionary/API/OpenAPI must agree.
   - Testing strategy must cover the highest-risk requirements.
   - Deployment, monitoring, backup, and incident docs must cover operational failure modes.
8. End with a concise gap list:
   - Open assumptions.
   - Missing decisions.
   - High-risk areas needing review.
   - Files created or updated.

## Generation Rules

- Write implementation-grade docs, not marketing prose.
- Prefer explicit tables, checklists, diagrams, and acceptance criteria over vague paragraphs.
- Separate short reference docs from detailed traceability docs when both are useful.
- Include executable or renderable artifacts where relevant: Mermaid `.mmd`, PlantUML snippets, and OpenAPI YAML.
- Keep provider contracts concrete: auth, data sent, data received, timeout, retries, fallback, logging, security notes.
- Treat high-risk flows as first-class docs: payments, booking/concurrency, auth, private files, migrations, webhooks, external sync, data restore, or any equivalent domain risks.
- Avoid copying project-specific content from an example repository. Reuse the structure and reasoning pattern, then adapt to the new project.
- If legal/privacy docs are generated, label them as drafts requiring legal review.
- If the user wants a GitHub-ready skill or docs package, include only safe generated examples; never include real secrets, `.env`, provider payloads, signed URLs, or local runtime logs.

## Review Rules

When reviewing an existing docs pack, report findings first:

- Missing required docs.
- Contradictions across scope, requirements, architecture, data, API, tests, and operations.
- Thin docs that have headings but no implementation decisions.
- High-risk flows without tests, runbooks, or failure handling.
- Artifacts not synced with prose, such as OpenAPI or diagrams.

Use file paths and section names where possible. Do not rewrite the whole pack unless the user asks.

## Update Rules

For focused changes, update the minimal connected set:

- Product/scope change: product docs, requirements, project plan, roadmap, acceptance criteria.
- Requirement change: FRS/NFR, traceability matrix, architecture docs, tests, UX if user-facing.
- Data model change: ERD, data dictionary, data architecture, migration plan, indexing strategy, API/OpenAPI if exposed.
- API change: API design, OpenAPI, error handling, frontend/backend contract notes, tests.
- Integration change: integration architecture, third-party contract, webhook strategy, monitoring, incident runbook.
- Security/auth change: auth security, threat model, security architecture, testing, deployment checklist.
- Operations change: deployment operations, checklist, monitoring, backup/recovery, incident response, onboarding.

## Validation

Before finishing, run the relevant checks:

- Validate the skill itself with the skill-creator validator when editing this skill.
- For generated docs, inspect the final file list and confirm required docs exist for the selected depth.
- Check internal links and filenames.
- Check that diagrams/OpenAPI are present when the pack claims they exist.
- Check the quality gates in `references/quality-gates.md`.
