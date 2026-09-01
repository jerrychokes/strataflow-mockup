# Wave 5 — response to the audit, round 1

The gate passed on the auditor's first round — zero P0/P1 — with the isolation
re-proven by the auditor's own script, the day-count arithmetic re-derived from
AS_AT, thirty-plus recount checks from re-typed literals, and the boundary honesty
verified by eye. All three findings were right and are fixed in this closing commit:

| Finding | Severity | Response |
|---|---|---|
| W5-A-1 — `#roles` carried no KRJ binding while two screens and the top bar cite it as the grounding authority | P2 | **Accepted and fixed.** Every membership row now names its project, the register carries A. Nakamura's MOCK-KRJ Approver binding from its own directory group, and the membership table gained a Project column — the register two screens rest on now actually holds what they rest on. |
| W5-A-2 — "Viewer" against the register's and glossary's "Reader" | P3 | **Accepted and fixed.** The glossary's role vocabulary is *reader* ("reader sees a project's data, contributor also records and corrects"); every Viewer — seed row, group name, tag tones, the projects-screen prose, a seed comment — now says Reader. QB-9: a word minted in passing, unminted. |
| W5-A-3 — the seed docstring said three rounds over a four-round array | P3 | **Accepted and fixed.** Four. |

**Carried riders for the next wave** (recorded, not silently absorbed): the
`#project-settings` typed facility select naming a facility no project holds
(corroborated by the auditor as real, pre-existing, outside this wave), and the
`programme` screen's one-day countdown inconsistency the AS_AT derivation documented
(nine days implies 2026-05-23; the board's other six countdowns imply 2026-05-24).

**State at close:** build and verify exit 0 (nine families, 68 screens) with the
three fixes in. Wave 5 is closed under §11 — and with it the wave plan's automatic
pipeline: Wave 6 is gated on the practitioner review, per the brief and the standing
instruction.
