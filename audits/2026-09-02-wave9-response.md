# Wave 9 — response to the audit, round 1

**The gate passed on the first round — zero P0/P1** — with every mass, bound,
envelope, interval, RPD and holding clock recounted from raw literals, the
groundwater crosstab verified untouched, both traceability directions walked by
real clicks, the figure freeze confirmed by the diff itself, and all three
deferrals held to the recorded-properly standard and passing it. Both P3s were
right and are fixed in this closing commit:

| Finding | Severity | Response |
|---|---|---|
| W9-A-1 — the seed's naming comment claimed the laboratory work order carries the `MOCK-` prefix; `PAS-WO-268503` renders three times without it | P3 | **Accepted and fixed at the comment, because the rendering was right.** The repo's own convention since wave 2 is that work orders and certificates follow the fictional laboratory's numbering (`PAS-WO-268841`, `PAS2026-04417`) and the fictional name is the marking; only the custody form carries `MOCK-`. The comment now says that, and records that its first draft claimed otherwise. |
| W9-A-2 — three thousands-grouping styles on `#composite` ("2,500 g" · "1 000 g" · "1000 g") | P3 | **Accepted and fixed to one style** — en-AU comma grouping, the style the derived numbers already used. Three space-grouped seed strings re-punctuated; four bare `${mass}` interpolations now group through `toLocaleString('en-AU')` like every other mass on the screen. The built page carries zero space-grouped or bare-thousands gram values. |

**State at close:** build exit 0, rebuild byte-identical (`79052b5e…`), the 23 Aug
census state counts unchanged; verify exit 0 across all nine families. Wave 9 —
the composite record with its honest limit, the soil round with its own record
shape, class soil on the register, the fan-in lineage, and the honestly-backed
matrix filter — is closed under §11 on the auditor's round 1 against `5d677a9`
plus these two fixes.

**Deferrals carried forward** (all recorded in-repo and on-screen by their waves):
the DQO duplicate limit's missing matrix dimension; the depth-profile plate
awaiting a grammar proposal to Jerry; the criteria library's matrix column
holding a receptor and a class; and the inherited three (WATER_LEVELS baseline,
`#imports` tiles, PFAS three-way).
