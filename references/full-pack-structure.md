# Full Pack Structure

Use this reference to create a production-grade documentation tree. Do not generate every file for every project blindly; choose Lite, Full, or Enterprise based on project complexity.

## Root Files

| File | Purpose |
| --- | --- |
| `README.md` | Developer-facing project overview, status, stack, repo structure, setup, docs map. |
| `AGENTS.md` | AI/human working rules for this repo, log rules, secrets policy, high-risk areas. |
| `.env.example` | Environment contract with safe placeholder names only. |
| `CHANGELOG.md` | Human-readable change history once releases begin. |
| `logs/ACTIVITY.md` | Tracked activity record for meaningful repository changes. |
| `logs/WORKLOG.md` | Tracked coordination record for active work, blockers, handoffs. |

## Full Documentation Tree

```text
docs/
  README.md

  01-product/
    PRD.md
    Product-Vision.md
    Scope.md
    Personas.md
    User-Journeys.md
    Success-Metrics.md
    Risks-Assumptions.md
    Roadmap.md

  02-requirements/
    BRS.md
    FRS.md
    FRS - Functional Requirements Specification.md
    NFR.md
    Non-Functional Requirements.md
    User-Stories.md
    Acceptance-Criteria.md
    Requirements-Traceability-Matrix.md
    Glossary.md

  03-architecture/
    README.md
    System-Architecture.md
    Component-Architecture.md
    Domain-Model.md
    API-Design.md
    Error-Handling-Strategy.md
    Auth-Security.md
    Security-Architecture.md
    Threat-Model.md
    Data-Architecture.md
    ERD.md
    Data-Dictionary.md
    Data-Flow-Diagram.md
    Indexing-Strategy.md
    Migration-Plan.md
    Integration-Architecture.md
    Third-Party-Integrations.md
    Webhook-Strategy.md
    Queue-and-Jobs-Architecture.md
    Caching-Strategy.md
    Testing-Strategy.md
    Deployment-Operations.md
    Deployment-Checklist.md
    Monitoring-Alerting-Plan.md
    Backup-Recovery-Plan.md
    Incident-Response-Playbook.md
    Privacy-Policy.md

    diagrams/
      README.md
      c4-l1-system-context.mmd
      c4-l2-containers.mmd
      c4-l3-components.mmd
      dfd-l0-context.mmd
      dfd-l1-platform.mmd
      dfd-l2-core-flow.mmd
      auth-flow.mmd
      main-user-flow.mmd
      payment-flow.mmd
      webhook-processing-flow.mmd
      deployment-topology.mmd

    openapi/
      README.md
      openapi.yaml

  04-ux-and-flows/
    Information-Architecture.md
    Low-Fidelity-Wireframes.md
    Medium-Fidelity-Wireframes.md
    High-Fidelity-Wireframes.md
    UX-Flows.md
    Use-Case-Diagrams.md
    Admin-Flows.md
    Empty-Loading-Error-States.md

  05-project-plan/
    project_plan.md
    Milestones.md
    Delivery-Risks.md
    Backlog.md
    Release-Plan.md

  06-engineering/
    README.md
    Onboarding-Guide.md
    Team-Workflow.md
    Git-Branching-Strategy.md
    Code-Review-Checklist.md
    Definition-of-Done.md
    Pull-Request-Template.md
    Local-Development.md
    Environment-Variables.md

ai/
  README.md
  AI-Agent-Rules.md
  AI-Agent-Runbook.md
  AI-Context-Index.md
  AI-Team-Routing.md
  AI-Implementation-Backlog.md
  AI-Phase-Prompts.md
  AI-Definition-of-Done.md
```

## Lite Pack

Use for smaller projects:

```text
docs/
  README.md
  01-product/PRD.md
  02-requirements/FRS.md
  02-requirements/NFR.md
  03-architecture/System-Architecture.md
  03-architecture/API-Design.md
  03-architecture/ERD.md
  03-architecture/Testing-Strategy.md
  04-ux-and-flows/UX-Flows.md
  05-project-plan/project_plan.md
  06-engineering/Onboarding-Guide.md
```

## Enterprise Additions

Add when the project has compliance, governance, or multiple teams:

```text
docs/
  01-product/Market-Context.md
  01-product/Stakeholder-Map.md
  02-requirements/Compliance-Requirements.md
  02-requirements/Service-Level-Objectives.md
  03-architecture/ADR/
  03-architecture/Compliance-Architecture.md
  03-architecture/Data-Retention-Policy.md
  03-architecture/Audit-Logging-Strategy.md
  03-architecture/Vendor-Risk-Register.md
  03-architecture/Support-Operations-Runbook.md
  04-ux-and-flows/Accessibility-Review.md
  05-project-plan/Release-Governance.md
  06-engineering/Incident-Postmortem-Template.md
```

## Selection Rules

- Include `Webhook-Strategy.md` only if inbound external events exist or are likely soon.
- Include `Queue-and-Jobs-Architecture.md` when async work, retries, scheduled jobs, emails, sync, or background processing exist.
- Include `Caching-Strategy.md` when content caching, CDN, cache tags, or transactional no-cache rules matter.
- Include `Privacy-Policy.md` when the product collects personal data. Label as legal draft.
- Include OpenAPI when there is an HTTP API contract.
- Include diagrams whenever architecture or flows are complex enough that prose alone is risky.
