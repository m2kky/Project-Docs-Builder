# Intake and Routing

Use this reference when building a new docs pack or when the brief is too thin to produce implementation-grade documentation.

## Minimal Intake

Ask only what is needed to unblock high-quality docs. Prefer one compact question set over a long interview.

Required context:

| Area | Ask For | Why It Matters |
| --- | --- | --- |
| Product | What is the product, who uses it, and what outcome should it create? | Drives PRD, scope, personas, journeys. |
| Phase | What is in scope for the first release and explicitly out of scope? | Prevents over-documenting future features as current requirements. |
| Users | External users, internal operators, admins, support roles, providers. | Drives UX, auth, permissions, data model. |
| Core flows | The 3 to 7 flows that must work end to end. | Drives FRS, architecture, testing, runbooks. |
| Tech direction | Known stack, hosting, database, providers, constraints. | Drives architecture and operations docs. |
| Data | Main entities, sensitive data, files, payments, logs, analytics. | Drives ERD, data dictionary, privacy, retention. |
| Risk | What would be expensive or dangerous if wrong? | Drives threat model, testing, monitoring, incidents. |
| Team | Who builds frontend/backend/ops/design and how they coordinate? | Drives engineering workflow and AI routing docs. |

## Pack Depth

Default to **Full** unless the user asks for a small pack or the project is clearly tiny.

| Depth | Use When | Output |
| --- | --- | --- |
| Lite | MVP, internal tool, prototype, or short-lived project. | Core docs only: PRD, FRS, NFR, architecture overview, API/data sketch, UX flows, project plan. |
| Full | Production web app, SaaS, marketplace, booking, commerce, dashboard, or platform. | Complete docs tree with architecture, operations, security, diagrams, OpenAPI skeleton, engineering, AI docs. |
| Enterprise | Regulated, multi-team, financial/medical/legal, complex integrations, high uptime, audit-heavy. | Full plus compliance, governance, vendor reviews, support model, analytics taxonomy, release governance. |

## Default Questions

If the brief is missing details, ask up to 7:

1. What is the product and its first-release goal?
2. Who are the user types and who operates/administers the system?
3. What are the main first-release features and explicit out-of-scope items?
4. What are the highest-risk flows, such as payment, booking, auth, private files, provider callbacks, or migrations?
5. What stack, hosting, database, and external providers are already chosen?
6. Should the docs pack be Lite, Full, or Enterprise?
7. Are there team roles or AI-agent workflow rules that should be included?

If the user does not answer, continue with reasonable assumptions and record them in `Risks-Assumptions.md` or the relevant open decisions section.

## Domain Routing

Add or emphasize docs based on project type:

| Project Type | Must Emphasize |
| --- | --- |
| SaaS/admin dashboard | Auth/security, RBAC, audit logs, data model, onboarding, review workflow. |
| Booking/scheduling | Concurrency, availability, holds, calendar sync, timezone, conflict tests, runbooks. |
| Commerce/payments | Payment verification, webhooks, idempotency, orders, refunds, private downloads, provider contracts. |
| Content/CMS | Publishing states, localization, media, SEO, public/private visibility, cache invalidation. |
| AI product | Model/provider contracts, evals, safety, prompt/version governance, data retention, observability. |
| Marketplace | Multi-party roles, payouts, disputes, trust/safety, search, moderation, compliance. |
| Healthcare/finance/legal | Compliance, audit, consent, privacy, retention, access control, incident response, legal review. |
| Mobile app backend | API contracts, push notifications, auth/session/token strategy, offline/sync behavior. |

## Open Decisions

Every generated pack should include open decisions when facts are unknown. Good open decisions are concrete:

- "Confirm exact payment provider before implementing checkout."
- "Confirm whether product files are streamed through API or served by signed URLs."
- "Confirm retention period for contact inquiries before launch."
- "Confirm whether admin 2FA is required for phase one."

Avoid vague open notes such as "Need more details."
