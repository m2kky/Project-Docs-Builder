# Document Templates

Use these templates as section contracts. Adapt names and sections to the project; do not leave empty headings.

## Root README.md

Required sections:

- Project overview.
- Current status.
- Planned or actual tech stack.
- Repository structure.
- Documentation map.
- Local setup.
- Environment variables.
- Testing commands.
- Development workflow.
- Release/changelog.
- Security notes.
- Activity/worklog rules.

## AGENTS.md

Required sections:

- Repository purpose.
- Working rules.
- Required reading order.
- Team routing rules if roles exist.
- Documentation update rules.
- Project constraints.
- High-risk areas.
- Secrets/logging rules.

## docs/README.md

Required sections:

- Folder structure table.
- Recommended reading order.
- Notes about canonical files.
- Audience guidance.

## Product Docs

### PRD.md

Required sections:

- Product overview.
- Product vision.
- Product goals.
- Success metrics.
- Target users.
- Personas.
- Problem statement.
- Product principles.
- Scope: in scope and out of scope.
- Technical context.
- Functional requirements summary.
- Core user journeys.
- Non-functional expectations.
- Design/brand requirements if known.
- Constraints and assumptions.
- Risks.
- Acceptance criteria.
- Priorities.
- Future enhancements.
- Open notes.

### Product-Vision.md

Use for concise strategic framing:

- Product promise.
- Audience.
- Differentiation.
- Business outcomes.
- Experience principles.
- Long-term direction.

### Scope.md

Use a table:

| Area | Phase-One Scope | Out of Scope | Future |
| --- | --- | --- | --- |

### Personas.md

For each persona:

- Name/role.
- Goal.
- Pain points.
- Context.
- Success criteria.
- Key flows.

### User-Journeys.md

For each journey:

- Trigger.
- Steps.
- System responsibilities.
- Failure states.
- Success state.
- Metrics.

## Requirements Docs

### BRS.md

Business requirement template:

- Business objectives.
- Stakeholders.
- Business processes.
- Business rules.
- Assumptions.
- Constraints.
- Success measurements.
- Approval/sign-off.

### FRS.md

Short implementation reference:

- Document overview.
- Scope.
- Global rules.
- Public/user-facing functions.
- Admin/operator functions.
- Domain-specific workflows.
- Notifications/analytics.
- Acceptance criteria.
- Future growth.

### FRS - Functional Requirements Specification.md

Detailed function template. Use one block per function:

```markdown
## <number>. <Function Area>

### <number>.<subnumber> <Function Name>

**Function Name:**
<Stable function name.>

**Purpose:**
<Why the function exists.>

**Users:**
<Actors allowed to use or affected by this function.>

**Trigger / Entry Point:**
<Page, endpoint, job, provider callback, admin action.>

**UI/Screen Description:**
<Relevant screen behavior or "API/worker only" if no UI.>

**Inputs:**
<Fields, provider payloads, state read, config.>

**Business Logic:**
<State transitions, calculations, constraints, side effects.>

**Outputs / States:**
<Response, saved records, emails/jobs, final statuses.>

**Validation Rules:**
<Field validation and business validation.>

**Error Handling:**
<Expected failures and user/admin/system response.>

**Permissions:**
<Public, authenticated, admin role, provider-authenticated, token-based.>

**Dependencies:**
<Services, tables, providers, jobs, config.>

**Acceptance Criteria:**
<Concrete criteria; include edge cases.>
```

### NFR.md

Short quality reference:

- Purpose.
- Scope.
- Performance.
- Usability.
- Reliability.
- Security.
- Scalability.
- Accessibility.
- SEO.
- Maintainability.
- Availability and stability.

### Non-Functional Requirements.md

Expanded version:

- Standards and references.
- Measurable targets.
- Verification approach.
- Quality attributes mapped to tests and operational checks.

### Requirements-Traceability-Matrix.md

Use a table:

| Requirement ID | Source | Requirement | Architecture Doc | API/Data Impact | Test Coverage | Status |
| --- | --- | --- | --- | --- | --- | --- |

## Architecture Docs

### System-Architecture.md

Required sections:

- Architecture document map.
- Reading recommendation.
- Purpose and scope.
- Architecture style.
- Design baseline.
- Architecture documentation standard.
- Source documents.
- Architecture goals.
- Quality attribute priorities.
- Key architecture decisions.
- C4 Level 1 system context.
- C4 Level 2 container architecture.
- External actors/providers.
- Reference standards.
- Architecture summary.

### Component-Architecture.md

Required sections:

- C4 Level 3 component diagrams.
- Web/frontend components.
- API/backend components.
- Worker/background components.
- Public rendering and caching rules.
- Admin architecture.
- Content/CMS architecture.
- Code-level boundary direction.
- Repository/module structure.
- Code ownership boundaries.

### API-Design.md

Required sections:

- Overview.
- API standards.
- Base URLs.
- Resource naming.
- HTTP method semantics.
- Authentication and authorization.
- Required headers.
- Response conventions.
- Status codes.
- Error format.
- Pagination/filtering/sorting.
- Idempotency.
- Resource groups.
- Core request/response schemas.
- Cache rules.
- Rate limiting.
- Security rules.
- OpenAPI documentation rule.
- Review checklist.

### Error-Handling-Strategy.md

Required sections:

- Goals.
- Error response standard.
- Problem type URI rules.
- HTTP status mapping.
- Error code catalog.
- Validation errors.
- Domain-specific error rules.
- Sensitive data rules.
- Localization.
- Server-side exception mapping.
- Retry policy.
- Logging.
- Observability and alerts.
- Testing requirements.
- Review checklist.

### Data Docs

`ERD.md`:

- Purpose and scope.
- Modeling standards.
- Key assumptions.
- Domain areas.
- Consolidated ERD diagram.
- Entity catalog.
- Recommended enums/statuses.
- Critical constraints.
- Recommended indexes.
- Deletion/retention rules.
- Acceptance criteria.

`Data-Dictionary.md`:

- Standards baseline.
- Required column metadata.
- Naming conventions.
- Sensitivity levels.
- Common columns.
- Controlled values.
- Table dictionary with column/type/constraints/business definition/example/source/sensitivity.
- Maintenance rules.

`Data-Architecture.md`:

- Relationship to ERD and DFD.
- Source of truth.
- Timestamp rules.
- IDs/public references.
- Integrity rules.
- Data ownership.
- Lifecycle states.
- Retention and archiving.
- Storage rules.
- Data pipeline direction.
- Data quality/governance.
- Analytics architecture.

`Data-Flow-Diagram.md`:

- Purpose.
- Scope.
- DFD notation.
- External entities.
- Logical data stores.
- Level 0 context diagram.
- Level 1 process decomposition.
- Level 2 high-risk flows.
- Data flow dictionary.
- Consistency checks.
- Open implementation notes.
- Diagram source file list.

### Security Docs

`Auth-Security.md`:

- Scope.
- Standards baseline.
- Current auth decision.
- Authentication flows.
- Session security.
- Password/token security.
- CSRF protection.
- OAuth/OIDC/JWT future direction if relevant.
- RBAC model.
- Endpoint authorization matrix.
- Webhook authentication.
- Download/token authorization.
- Audit logging.
- Security testing checklist.

`Threat-Model.md`:

- Method.
- System scope.
- Assets.
- Trust boundaries.
- Entry points.
- STRIDE matrix.
- OWASP mapping.
- Critical threat scenarios.
- Threat register.
- Derived security requirements.
- Review cadence.

`Security-Architecture.md`:

- Security baseline.
- Secrets management.
- Authorization rules.
- File upload safety.
- Rate limiting.
- Security headers.
- Privacy/compliance direction.

### Integration Docs

`Integration-Architecture.md`:

- Integration catalog.
- Sync vs async rules.
- Retry policy.
- Failure handling.
- Idempotency requirements.
- Rate limits/backoff.
- Fallback strategy.
- Domain integration flows.

`Third-Party-Integrations.md` provider template:

| Item | Content |
| --- | --- |
| Service Name | Provider name. |
| Purpose | Business reason. |
| Direction | Inbound, outbound, or both. |
| Auth Method | API key, OAuth, HMAC, mTLS, etc. |
| Endpoints Used | Provider endpoints/SDK methods. |
| Data Sent | Fields leaving the platform. |
| Data Received | Fields entering the platform. |
| Timeout | Explicit timeout. |
| Retries | Retryable conditions and max attempts. |
| Rate Limits | Official/internal throttles. |
| Fallback | Degraded behavior. |
| Logging | Safe metadata. |
| Security Notes | Secrets, PII, signature, redaction. |

`Webhook-Strategy.md`:

- Scope.
- Webhook principles.
- Endpoint standard.
- Processing flow.
- Signature verification.
- Deduplication keys.
- Database rules.
- Status codes.
- Queue strategy.
- Retry policy.
- Provider-specific handling.
- Event storage.
- Failure handling.
- Observability.
- Security controls.
- Testing checklist.

### Operations Docs

`Testing-Strategy.md`:

- Goals.
- Testing pyramid.
- Recommended tooling.
- Test environments.
- Test data strategy.
- Unit/integration/contract/E2E/security/smoke scopes.
- Coverage targets.
- CI/CD gates.
- Flakiness control.
- Performance/concurrency tests.
- Ownership.
- Review checklist.

`Deployment-Operations.md`:

- Production topology.
- Components.
- Routing.
- Environment separation.
- Configuration/secrets.
- Release flow.
- Observability.
- Backup/disaster recovery summary.
- Performance.
- Reliability.
- Background jobs.
- Testing architecture.
- CI/CD.
- Failure modes.
- Incident response.
- Scalability path.
- Risks.
- Implementation checklist.
- Open implementation decisions.

`Deployment-Checklist.md`:

- Principles.
- Release metadata table.
- Hard blockers.
- Pre-deployment checklist.
- Staging checklist.
- Production checklist.
- Smoke tests.
- Post-deployment monitoring.
- Rollback checklist.
- Release sign-off.

`Monitoring-Alerting-Plan.md`:

- Goals.
- Monitoring principles.
- Scope.
- Tooling.
- Health checks.
- Core metrics by area.
- Alert severity.
- Alert routing.
- Dashboards.
- Logging standard.
- Retention.
- Runbook mapping.
- Implementation checklist.

`Backup-Recovery-Plan.md`:

- Goals.
- Backup principles.
- RPO/RTO.
- Data classification.
- Backup scope.
- Database backup plan.
- Object/file backup plan.
- Backup schedule.
- Restore procedure.
- Disaster recovery.
- Reconciliation after restore.
- Backup security.
- Restore testing.

`Incident-Response-Playbook.md`:

- Goals.
- Incident model.
- Severity levels.
- Roles.
- First 15 minutes.
- Decision matrix.
- Communication format.
- General workflow.
- Domain runbooks.
- Post-incident review template.
- Closure criteria.

`Privacy-Policy.md`:

- Legal-review disclaimer.
- Effective date placeholders.
- Controller/business identity.
- Scope.
- Personal data collected.
- Purposes.
- Legal bases if applicable.
- Recipients/providers.
- Transfers.
- Retention.
- Security.
- User rights.
- Cookies.
- Payments.
- External services.
- Launch completion checklist.

## UX and Flow Docs

### Information-Architecture.md

- Sitemap.
- Navigation model.
- Route groups.
- Content hierarchy.
- Admin module map.

### Low-Fidelity-Wireframes.md

Describe layout blocks without visual styling:

- Global layout.
- Main public pages.
- Core flows.
- Admin dashboard.

### Medium-Fidelity-Wireframes.md

Add hierarchy and real component intent without final colors:

- Navigation.
- Page sections.
- Form and table behavior.
- Flow step layouts.

### High-Fidelity-Wireframes.md

Use page-by-page detail:

- Global layout.
- Every public page.
- Core wizard/checkout/onboarding flows.
- Admin modules.
- Important states.

### Use-Case-Diagrams.md

For each diagram:

- PlantUML block.
- Structured prompt for regeneration.
- Actors.
- System boundary.
- Use cases.
- Connections.
- Notes.
- Style guidance.
- Summary table.

### Empty-Loading-Error-States.md

For each core UI area:

- Loading state.
- Empty state.
- Success state.
- Error state.
- Retry/recovery action.

## Project Plan Docs

`project_plan.md`:

- Project overview.
- Technical direction.
- Goals.
- Phase scope.
- Assumptions.
- Milestones.
- Weekly plan.
- Dependencies.
- Risks.
- Acceptance criteria.
- Deliverables.

`Backlog.md`:

Use tables by phase:

| ID | Area | Task | Owner | Dependencies | Acceptance | Risk |
| --- | --- | --- | --- | --- | --- | --- |

## Engineering Docs

`Team-Workflow.md`:

- Team roles.
- Collaboration model.
- AI session start rule if used.
- Ownership boundaries.
- Branch naming.
- PR rules.
- Review rules.
- Contract-first flow.
- Roadmap.
- Activity/worklog rules.

`Code-Review-Checklist.md`:

- Review principles.
- Author checklist.
- Ownership review.
- Functionality.
- Project rules.
- Readability.
- Architecture.
- API/error handling.
- Data/migrations.
- Security/privacy.
- Integrations.
- Testing.
- Performance.
- Frontend/UX.
- Observability.
- Documentation.
- Severity labels.
- Approval standard.

`Onboarding-Guide.md`:

- Project overview.
- Timeline.
- Team split.
- Before day one checklist.
- Required background.
- Tech stack.
- Documentation map.
- Repo tour.
- Local setup.
- Environment variables.
- Tests.
- Critical flows.
- First tasks.
- Working rules.
- PR template.
- Troubleshooting.
- Contacts/ownership.

## AI Docs

`ai/README.md`:

- Purpose.
- File list.
- Recommended start.
- Context loading strategy.

`AI-Agent-Rules.md`:

- Required reading.
- Scope discipline.
- Log updates.
- Secrets.
- Testing.
- Docs updates.
- Human handoff.

`AI-Agent-Runbook.md`:

- How to start a run.
- How to choose context.
- How to implement by phase.
- How to verify.
- How to update docs/logs.

`AI-Context-Index.md`:

Task-to-doc map:

| Task | Read First | Then Read | Notes |
| --- | --- | --- | --- |

`AI-Team-Routing.md`:

- Role detection.
- Frontend context.
- Backend context.
- Shared context.
- Required first message format.

`AI-Implementation-Backlog.md`:

- Phase list.
- Task IDs.
- Dependencies.
- Definition of done.

`AI-Phase-Prompts.md`:

- Copy-ready prompts for each phase.

`AI-Definition-of-Done.md`:

- Module DoD.
- PR DoD.
- Docs DoD.
- Test DoD.
- Production readiness DoD.
