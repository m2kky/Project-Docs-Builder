# Quality Gates

Use this reference before finishing a generated, reviewed, or updated docs pack.

## Anti-Shallow Gate

A docs pack is too shallow if:

- It has headings without decisions, rules, examples, or acceptance criteria.
- It says "integrate payment provider" without provider verification, webhook, idempotency, retry, and failure behavior.
- It says "secure auth" without session/token, CSRF, rate limit, permission, and audit rules.
- It says "database schema" without relationships, constraints, indexes, status values, and sensitivity.
- It says "deployment" without environment, secrets, migration, rollback, smoke test, and monitoring rules.
- It says "testing" without mapping tests to the highest-risk flows.
- It includes diagrams in prose but no Mermaid/PlantUML source when diagrams are expected.

## Traceability Gate

Check these links:

| Source | Must Connect To |
| --- | --- |
| Product goals | Success metrics, scope, project plan. |
| Scope items | FRS functions and acceptance criteria. |
| FRS functions | API/data/UX/architecture docs. |
| High-risk requirements | Testing strategy, monitoring, incident runbooks. |
| ERD entities | Data dictionary, API schemas, migration plan. |
| API design | OpenAPI skeleton and error handling strategy. |
| External providers | Integration architecture, third-party contract, monitoring, incident response. |
| Security risks | Auth security, threat model, security tests. |
| Release plan | Deployment checklist, backup/recovery, rollback. |

## Consistency Checks

- In-scope features in PRD appear in FRS or are explicitly deferred.
- Out-of-scope features do not appear as required architecture or data model.
- Entity names are consistent across ERD, data dictionary, API schemas, and OpenAPI.
- Status values are consistent across FRS, ERD, data dictionary, API, and tests.
- Public/private data boundaries are consistent across security, API, storage, and privacy docs.
- Async flows have job ownership, retry policy, idempotency anchor, monitoring, and failure handling.
- Provider callbacks/webhooks never directly mutate state without verification and deduplication.
- Migrations are the only path for schema changes.
- Deployment docs mention smoke tests and rollback.
- Onboarding and AI docs point to the correct reading order.

## Risk Coverage Gate

For every high-risk area, require:

| Risk Area | Required Docs |
| --- | --- |
| Booking/concurrency | FRS, Booking/Domain architecture, ERD constraints, indexing, tests, monitoring, incident runbook. |
| Payments/webhooks | FRS, API, integration, webhook, error handling, ERD, tests, monitoring, incident runbook. |
| Private files/downloads | FRS, data model, auth/security, storage contract, tests, incident runbook, privacy. |
| Admin auth/security | Auth security, threat model, API auth matrix, tests, deployment secrets, incident runbook. |
| Migrations/data restore | ERD, migration plan, backup/recovery, deployment checklist, incident playbook. |
| External sync/providers | Integration docs, provider contract, jobs, monitoring, fallback/fail-closed behavior. |
| Personal data/privacy | Data dictionary sensitivity, data architecture retention, privacy policy draft, security docs. |

## File Completeness Gate

For a Full pack, verify:

- `docs/README.md` exists and has reading order.
- Product docs include PRD, scope, personas/journeys, metrics, risks.
- Requirements include FRS short and detailed, NFR short and detailed, traceability.
- Architecture includes system, component, API, error, auth, data, ERD, dictionary, DFD, integrations, webhooks, testing, deployment, monitoring, backup, incident.
- Diagrams folder exists with a README and source files.
- OpenAPI folder exists when an HTTP API exists.
- UX docs cover low/medium/high fidelity or equivalent flow depth.
- Project plan has milestones, weekly/phase plan, dependencies, risks, acceptance.
- Engineering docs cover onboarding, team workflow, branching, review, DoD.
- AI docs exist when the user wants AI-driven implementation runs.

## Final Response Gate

When done, report:

- What was created or updated.
- Any assumptions made.
- Any gaps or decisions still needed.
- Any validation/checks run.
- Anything intentionally not generated and why.
