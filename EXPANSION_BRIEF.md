# Strataflow Mockup Expansion — Brief v2

**Replaces:** the "Comprehensive High-Fidelity Mockup Expansion" prompt (1 Sep 2026).
**Why a v2:** the v1 prompt was assessed in depth (this session) and independently
reviewed; both reviews agreed on the same weaknesses — it assumed the mockup repo was
self-contained, mandated hand-maintained registers this project has documented rotting,
re-derived artifacts that already exist as approved research, left the audit loop's
mechanics vague, and carried a moderate-to-high risk of analysis paralysis. v2 keeps
v1's discipline rules, which were its strength, and fixes the grounding.
**This is the working copy.** Its source is `docs/design/mockup-expansion-brief.md`
in the private app repo (`jerrychokes/strataflow`), published here on Jerry's decision
(1 Sep 2026). Change both or neither.

---

## 1. Mission

Expand the existing 66-screen Strataflow mockup into a coherent, comprehensive screen
system for a professional environmental data management platform — **drawn, so it can
be judged by looking**. The primary audience is Jerry, who decides by seeing; the
secondary use is design-partner outreach.

The objective is **not** screen count and **not** superficial feature parity with
EQuIS, ESdat, HGA+ or EnviroSys. It is:

1. Functional breadth at the level a practitioner expects from a mature platform —
   understood as the PRD's *destination* (PRD §0.2: deferred in time, not cut), never
   overriding PRD NG1 (no EQuIS parity) or §5.2 (breadth is not where Strataflow
   competes).
2. Better workflow coherence, transparency, provenance and defensibility than the
   incumbents, visible in actual walkable journeys.
3. Every screen with a clear owner, purpose, entry path, parent context and onward
   path; no disconnected concepts, duplicates or overlapping responsibilities.
4. One coherent fictional dataset throughout.

Bias the effort toward **drawing over documenting**. Planning artifacts in this brief
are decision instruments, not archives: each has a named form, a size cap and a
timebox, and when a timebox expires the artifact ships with its gaps marked
`UNRESOLVED` rather than growing.

---

## 2. Repository topology and source of truth

Two repositories participate. Get this wrong and everything downstream is wrong.

| Repo | Role |
|---|---|
| `jerrychokes/strataflow-mockup` (public) | **The working copy.** All mockup changes land here. GitHub Pages serves `index.html`. |
| `jerrychokes/strataflow` (private) | **The product repo and the source of authority.** Read-only for this work. Its `design/mockup/` is a dated snapshot (23 Aug 2026, exported 1 Sep) and is *not* updated by this work — its own README already says a re-mock is a dated rebuild. |

**A session doing this work needs both repos.** The governing documents live only in
the private repo. If the app repo is not readable in the session, **stop and ask** —
do not proceed from the mockup repo alone, and do not reconstruct the PRD from memory.

**Confidentiality rule:** never vendor the private repo's documents (PRD, GOALS,
incumbent baseline, the reference docs) into the public mockup repo. The mockup repo
carries drawings and their build; strategy stays private. This brief is the one
deliberate exception — Jerry chose to publish it alongside the mockup (1 Sep 2026).

### Required reading, with exact paths (all in `strataflow`)

| Document | What it governs |
|---|---|
| `docs/PRD.md` (v0.4) | Scope, users U1–U4, quality bars QB-1…10, FRs, non-goals, staging S0–S8 |
| `docs/GOALS.md` | What is actually done vs claimed; §5 (oracle approval), §7.4 (the unprinted-figure gate) |
| `docs/GLOSSARY.md` | The words. Binds every label on every screen |
| `docs/reference/incumbent-baseline.md` | The approved competitor teardown, with ✅/◐/⚠️ evidence tiers |
| `docs/design/figure-grammar.md` | The frozen chart grammar (A — Regulator), incl. §6's self-approval caveat |
| `design/reference/` | The 12 approved figure plates, tokens, screens — the visual oracle |
| `docs/design/ia-rationale.md`, `visual-language.md`, `component-inventory.md` | Why the product's IA and visual system are what they are |
| `docs/audits/2026-08-23-uiux/` | The 27-finding UI/UX audit the second mockup pass answered |
| `apps/web/lib/navigation/ia.ts` + `routes.ts` | The product's real sections and route inventory today |
| `packages/db/seed/demo/README.md` and `fixtures/partner/` | The `DEMO-` and `MOCK-` fictional-data conventions |

In the mockup repo itself: `README.md` (the three passes and their findings),
`screens.mjs` (register + `RELATED` edge list), `build.mjs` (the checks), `seed.mjs`,
`ui.mjs`, `controls.mjs`, `figures.mjs`, `chrome.mjs`, and the rendered
`index.html` / https://jerrychokes.github.io/strataflow-mockup/.

Note: the mockup's files cite a `UI_EXPECTATIONS.md` that no longer exists in the app
repo. Its two enumerations survive as rows in the mockup's `#coverage` screen; treat
those rows as the record.

---

## 3. Authority and decision hierarchy

When sources conflict, in order:

1. `docs/PRD.md`
2. Explicit requirements in this brief
3. The mockup's recorded conventions (§5 below) and existing coherent workflows
4. The established visual system: the `sf-` primitives, `app.css`, the frozen figure
   grammar and the 12 plates. The `mk-` layer is a proposal, not authority (§5)
5. The core journeys (§8)
6. Verified competitor evidence — **starting from `incumbent-baseline.md`**, extended
   only where it is silent, using its own tiers: ✅ verified · ◐ partial/inferred ·
   ⚠️ claimed-unverified. An unverifiable capability is marked `UNVERIFIED` and never
   becomes a requirement. Roles per PRD §5: **EQuIS is the breadth benchmark;
   EnviroSys is the product-direction comparison**; ESdat and HGA+ are displacement
   targets
7. Proposed improvements

Do not silently override a higher source. Record material conflicts in the findings
note (§6, Phase 1) with a proposed resolution. **Jerry arbitrates.**

---

## 4. Prior art — start from it, never re-derive it

The v1 prompt read as if this were a greenfield audit. It is not: the mockup is the
product of three documented passes, and several of the artifacts v1 asked for already
exist in stronger, machine-checked form. The rule is: **extend these; do not build a
parallel version of any of them.**

| Already exists | Where | v1 asked for |
|---|---|---|
| Screen register (id, name, job, persona, state, `proposed` flag) | `screens.mjs` | Phase 1 inventory |
| Relationship edge list, 3 properties machine-verified on every build | `RELATED` in `screens.mjs` + `build.mjs` | Mermaid graph + edge list |
| Coverage reconciliation as closed enumerations, rendered as a screen | `#coverage` | Gap register |
| Competitor evidence, tiered and approved | `docs/reference/incumbent-baseline.md` | Phase 2 benchmarking |
| Personas U1–U6 (U5/U6 flagged as not-in-PRD, deliberately) | mockup README | per-screen personas |
| Accessibility/overflow/layout sweeps, measured in a real browser | mockup README "What was verified" | consistency checks |

Any diagram wanted for review is **generated from `RELATED`**, one journey at a time —
never a hand-drawn graph of the whole surface, which is unreadable at 66+ screens and
rots the day it is drawn.

---

## 5. Conventions that bind every change

These are the mockup's own recorded rules plus the product's. v1 omitted most of them;
a faithful agent following v1 would have violated several while believing it was
complying.

1. **Registers are code, rendered as screens, checked by the build.** The screen
   register is `screens.mjs` metadata; the edge list is `RELATED`; coverage is the
   `#coverage` screen. No hand-maintained Markdown register may shadow any of them —
   this project has twice documented exactly that artifact rotting.
2. **Passes are dated; history is never retro-edited.** The state labels in
   `screens.mjs` record what was true on 23 Aug 2026, deliberately. A new pass
   re-derives states as of its own date and says so; it does not "fix" the old
   record. (v1's "documentation must never lag" would have destroyed this.)
3. **The photocopier rule.** Colour is never the sole carrying channel: every state
   encoding also carries a glyph, shape, border weight or word.
4. **Consequence before use — at QB-7 strength.** Every action that appears
   destructive is reversible *and the user can see that before acting*; where an
   action genuinely cannot be undone, the control says so. ("Reversible where
   appropriate" is weaker than the PRD and is not the rule.)
5. **The namespace boundary is the approval boundary.** `sf-` primitives are
   product-implemented; everything in `controls.mjs` is `mk-` and is a proposal.
   New interaction patterns go in `mk-`, never dressed as `sf-`.
6. **Seed discipline.** One coherent dataset; deterministic — no `Math.random()`, a
   rebuild is byte-identical; `MOCK-` on every identifier per `fixtures/partner/`.
   Portfolio and cross-project screens **cannot be drawn honestly from a one-site
   seed**: adding a second `MOCK-` project to `seed.mjs` is a named, one-time
   workstream in the first wave that needs it, done under the same determinism.
7. **Personas are U1–U6, closed.** U5 (site administrator) and U6 (instance operator)
   carry their recorded not-in-PRD provenance. No new persona without a recorded
   case in the findings note.
8. **The figure grammar is frozen and fenced.** Grammar A and the 12 plates are the
   oracle. A figure family outside them (Piper, Stiff, Durov, Schoeller, seasonal-
   Kendall renderings — all PRD FR-6.5/FR-5.9, none yet in the plate set) requires a
   written grammar proposal *on the screen that uses it*, flagged for Jerry's
   decision — the same convention as the recorded rainfall-contrast finding. Every
   such screen also inherits and states the standing caveat: the grammar has never
   been print-tested (G-76b, GOALS §7.4); drawing more of it does not close that gap.
9. **Glossary words only** (`docs/GLOSSARY.md`): LOR not EQL, and no invented
   abstractions over established concepts (QB-9).
10. **Screens marked `proposed` argue for themselves** — each states the user
    decision it exists for, as today.

---

## 6. Fundamental rules (carried from v1, unchanged in substance)

**Journey before screen count.** The domain lenses (§9) are a coverage test, never a
screen-generation checklist.

**The New-Screen Test.** Create a screen only when: (1) a distinct user decision,
workflow or durable record requires it; (2) no existing screen reasonably owns it;
(3) it needs its own route or substantial state; (4) it improves the relationship
graph rather than the count. Otherwise: enhance an existing screen, or a tab, drawer,
dialog, expandable section or inline state. Dispositions for existing screens:
retain · enhance · split · merge · move · replace · retire.

**Existing design is normative.** Extend the closest analogue; no unsolicited visual
redesign; reuse primitives before creating them.

**Evidence before claims.** Never claim missing/duplicated/covered/complete without
inspecting the evidence. A screen is not "missing" if an existing screen owns the
decision.

**One coherent product.** Records connect to related records, actions, evidence,
configuration, history and outputs.

**No backend gaps as screen gaps.** Architecture, performance and testing concerns
are out of scope unless a genuine user-facing surface is required.

---

## 7. Phases, timeboxes, deliverables

Planning altogether is capped at **five working days** and produces a review pack a
person can read in one evening. When a timebox expires, ship with `UNRESOLVED` marks.

### Phase 0 — Reconnaissance (½ day)
Read §2's required set; run `node build.mjs`; walk the rendered mockup at desktop and
375 px. **Deliverable: none.** Do not begin by generating screens.

### Phase 1 — Current-state delta (1 day)
The register already exists in `screens.mjs`; the deliverable is a **delta, not an
inventory**: corrections to register metadata committed to `screens.mjs`, plus a
findings note (`audits/<date>-pass4-findings.md` in the mockup repo, **≤ 2 pages**)
listing only screens whose disposition is not `retain`, any orphan/dead-end/duplicate
found, material conflicts (§3), and a one-paragraph reconciliation of discovered
screen count vs the README's 66. Do not trust the README or the state labels — the
labels are the 23 Aug record (§5.2); re-derive current state and record it as a new
dated pass.

### Phase 2 — Coverage matrix extension (2 days)
Extend the `#coverage` pattern with **closed enumerations only** — one row each, no
open-ended prose register:

- (a) every PRD FR, QB, OM and DR row;
- (b) every capability row in `incumbent-baseline.md` (add rows of your own only with
  a recorded evidence source and tier);
- (c) every step of the nine active journeys (§8).

Each row carries exactly eight fields: **id · source · status · owning screen
(existing or proposed) · response · priority · evidence tier · note (one line)**.
Statuses: covered · partially covered · missing · incorrectly located · duplicate ·
deferred · no additional screen required · unverified. Responses (for competitor
rows): match · simplify · integrate · defer · reject · exceed. Priorities:

- **P0** — the core vertical slice loop (PRD §13.1)
- **P1** — competitive v1
- **P2** — customer readiness
- **P3** — comprehensive platform
- **P4** — specialist/future (telemetry, external parties, integration estate)

The matrix renders as a screen (the existing `#coverage`, extended), so it is
reviewable in the mockup itself and checkable by the build. Rows marked `n/a` carry a
reason rather than being silently counted.

### Phase 3 — Target information architecture (1 day)
Resolve the finding the mockup already makes visible: under **By section**, eighteen
screens sit in *"No section owns these"* because configuration, provenance and
instance administration have no home in the product's six-section, fieldwork-ordered
IA. Design the smallest structure that: preserves the natural workflow order, gives
durable entities stable homes, separates operation from administration, keeps project
context visible, supports portfolio views, and owns every screen — **no unexplained
miscellaneous group**. The v1 candidate list (Home / Plan / Field / Data / Quality /
Evaluate / Insights / Compliance / Reports / Records / Configure / Admin) is one
input, not the answer. **Deliverable:** the revised section structure as data in the
mockup's by-section navigation (so the build tests it against the register
automatically) plus ≤ 1 page of rationale in the findings note. An accepted IA change
is *proposed* to the product; landing it in `apps/web/lib/navigation/ia.ts` is a
separate decision in the app repo, out of scope here.

### Phase 4 — Wave plan (½ day)
Waves are sized **≤ 8 screens or ≤ 1 week**, whichever is smaller, and each is one
page: objective · journeys advanced · screens retained/modified/created (each new
screen with its New-Screen-Test justification) · primitives reused · seed changes ·
navigation changes · states required · acceptance checks · regression risk. Ordering
follows dependency and the PRD wedge (ingestion pain and output quality), not
domains: 1 import→approved data, 2 result→issued report, 3 obligations/notification,
4 field work/eCOC, 5 visualisation/statistics, 6 water management, 7 configuration/
administration, 8+ deferred scope (§8, §9).

### MANDATORY STOP GATE
After Phases 0–4: **stop. Do not modify screens.** Present the review pack — the
extended coverage screen (rendered), the findings note, the wave plan, and the
recommended first wave — and **wait for Jerry's explicit approval of a named wave**.
Planning completion is not permission. The pack must be readable in one evening; if
it is not, it is too big, and that is a defect to fix before presenting.

### Phase 5 — Implementation (per approved wave)
For every new or modified screen: established patterns and primitives first; exact
glossary terminology; realistic data from the shared seed, reused entities, cross-
screen consistency; useful register defaults, filters, sorting; status, ownership and
required action exposed; empty/loading/error/partial/blocked/superseded/completed
states where relevant; §5.4's reversibility rule; ambiguity surfaced as an explicit
user decision; findings explain why they exist; derived values link to inputs and
rule versions; issued outputs link to snapshots; access restrictions visible;
keyboard/focus/heading/touch-target expectations met; constrained mobile layouts for
field-facing work; no decorative-card dashboards; environmental-scale tables usable;
summary→evidence navigation without loss of context. Update `screens.mjs` metadata,
`RELATED` and the coverage rows **in the same change** — they are code, so the build
enforces most of this.

---

## 8. Core journeys

Journeys are authoritative; domain coverage serves them. Every participating screen
links realistically to its preceding and following states.

1. **Laboratory EDD → approved data:** Programme → Round → Sampling event → eCOC →
   Certificate → Import batch → Parse → Map → Validate → Exceptions → Partial accept
   → QA/QC → Data-quality assessment → Approval → Results
2. **Result → exceedance response:** Result → Applicable criteria → Derivation →
   Exceedance → Evaluation → TARP/obligation → Acknowledge → Assign → Evidence →
   Approve → Close
3. **Result → issued report:** Result → Validation → Evaluation → Figure/table →
   Snapshot → Report assembly → Quality review → Approval → Issue → Archive →
   Regenerate
4. **Certificate amendment:** Original → Amendment → Supersession comparison →
   Impacted results → Recalculated derivations → Changed exceedances → Changed
   trigger states → Affected reports → Amendment/no-impact decision
5. **Programme → completed field work:** Programme → Recurrence → Round →
   Locations/suites → Assignment → Field work → Samples/QC → eCOC → Custody transfer
   → Laboratory receipt → Completion
6. **Statutory notification:** Licence condition → Triggering result → Became-aware
   event → Deadline → Evidence review → Approval → Submission → Proof → Closure →
   Audit
7. **Groundwater interpretation:** Location/bore nest → Water levels → Datum
   conversion → Groundwater elevation → Hydrograph → Potentiometric surface →
   Reliability → Interpretation → Saved figure → Report
8. **Configuration → operational effect:** Criteria/QA rule → Version → Test against
   real records → Impact preview → Approval → Activation → Affected results →
   Re-evaluation → Audit → Rollback
9. **Portfolio → evidence:** Portfolio → Project issue → Location/obligation →
   Triggering data → Response → Report/notification → Evidence → Audit trail

**Deferred journey — telemetry exception** (Instrument → Raw series → Gap/anomaly →
Correction → Corrected series → Re-evaluation → Alert/TARP impact → Audit): deferred
with Domain K, matching the PRD's S8 marking of FR-1.10/FR-3.10. v1 listed it as
authoritative while marking its domain future-scope; that contradiction is resolved
here in the PRD's favour.

---

## 9. Coverage domains — lenses, not a checklist

Consolidate wherever it makes a better workflow; never create a screen because a
capability appears below. Scope tags reflect the PRD.

- **A. Home, portfolio, work management** — actionable work first (approvals, import
  exceptions, QA/QC findings, unacknowledged exceedances, statutory deadlines),
  portfolio compliance/sampling/data-quality status, project switcher, global search.
  Portfolio views need the second seed project (§5.6).
- **B. Projects, facilities, areas, locations** — registers and details, lifecycle,
  coordinates/CRS, survey/datum history, bore construction, lithology,
  hydrostratigraphy, nests/clusters, inspections, documents. Location detail is an
  entity hub.
- **C. Sampling programmes and field work** — programme → recurrence → round →
  assignment → field capture → samples/QC → eCOC → custody → lab receipt →
  completion; calendars, due/overdue, measurements, purge/stabilisation,
  preservation, photographs, mobile layouts. Offline capture/sync is **not in the
  PRD** — if drawn, it is `proposed` and argues for itself.
- **D. Laboratories, certificates, EDD** — the import pipeline end to end including
  held rows, partial acceptance, duplicates, rerun/reversal, amendments,
  supersession impact, mapping profiles, migration reconciliation. Normal *and*
  recoverable exception paths.
- **E. Results and environmental records** — registers/details, annotation, lineage,
  qualifiers, non-detects, reporting limits, derived/converted values with inputs
  and rule versions, supersession, bulk review, locks, unassessable results.
- **F. Master data and reference configuration** — analytes (CAS/synonyms/groups,
  PFAS/PAH/PCB structure), matrices, methods, units/conversions, limit definitions,
  qualifier/reason codes, suites, versioned reference history.
- **G. Validation and QA/QC** — queues and workspaces, holding times, RL-above-
  criterion, duplicates/blanks/LCS/spikes/surrogates, batches, acceptance limits as
  versioned config, ionic balance/TDS/EC:TDS, manual qualification, DQ assessment,
  bulk validation, locks. Every finding links to results, samples, governing rule
  and resolution.
- **H. Criteria, rules, derived values** — libraries/sets/versions, applicability,
  effective dates, builders and test workspaces, non-detect propagation bound to the
  criteria set, hardness-dependent criteria *showing the working*, re-evaluation
  preview, activation/retirement.
- **I. Evaluation, exceedances, TARP** — registers/details, concurrent criteria,
  consecutive/rolling windows, unassessable-results register, background comparison,
  trigger states, acknowledgement→response→evidence→closure, changed outcomes.
- **J. Hydrogeology and water management** — water levels and corrections,
  elevations, hydrographs with rainfall, nests read vertically, potentiometric
  surfaces with residual/reliability printed, extraction/entitlements, loads, water
  balance, aquifer tests. Figures expose inputs and assumptions.
- **K. Telemetry, loggers, instruments** — **deferred (P4, PRD S8)** with the
  telemetry journey.
- **L. Maps and spatial** — display, symbology by exceedance/TARP, layers, print
  layout, shapefile/GeoJSON export. Full GIS is a PRD non-goal (NG4).
- **M. Charts, statistics, interpretation** — figure library/builders, saved
  configurations, censored rendering, hydrogeochemical diagrams and statistical
  plots **under §5.8's grammar fence**, statistical assumptions and sample-size
  warnings, snapshots, vector export, report reuse.
- **N. Licences, conditions, obligations** — registers/details/calendars,
  became-aware events, frozen deadlines, notification preparation and evidence,
  submissions, annual compliance reporting, WA statutory content. Legal condition →
  triggering data → decision → notification → evidence stays connected.
- **O. Reports, submissions, documents** — report creation from templates, corporate
  styling, structure/sections, data/figure/table selection, captions and cross-
  references, snapshots, quality checks, previews, review/approval/sign-off,
  issue/archive/regenerate, supersession impact, golden-output comparison.
- **P. Audit, lineage, records** — entity history, before/after, lineage explorer
  (source→result→figure→report), snapshots, deletion/restoration, retention, legal
  hold, published-period locks, attribution.
- **Q. Administration, security, access** — org/project settings, membership, roles,
  identity (Entra ID), sessions, controlled vocabulary, configuration packages.
  External-party/consultancy access is **deferred (PRD OD-2, S8)** — the IA must
  accommodate it later without route restructuring, which is a test on §7 Phase 3,
  not a licence to draw it now.
- **R. Integration and data exchange** — mostly **P3/P4**; incumbent import with
  reconciliation is PRD FR-3.11, EQuIS export is S8 (OD-8), and nothing may imply a
  Strataflow-operated relay (DR-2/DR-3).
- **S. Platform operation and support** — version/entitlement, health, upgrade
  scheduling/pre-flight/rollback, diagnostics with preview-before-export, backup/
  restore, continuity. Maps to PRD §12 OM-1…OM-5; the mockup already has J9 screens
  for much of this.

---

## 10. Verification — measured, every wave

The mockup's history is unambiguous: every consequential defect it has ever contained
was found by **measurement**, not by reading. After every wave, run and keep green:

- `node build.mjs` — link-graph integrity: no dangling target, no screen without an
  exit, no screen nothing points at; printed on green runs too.
- The browser sweep at **375, 1000 and 1280 px**: horizontal overflow, duplicate DOM
  ids, controls without accessible names, heading order, empty panels, degenerate
  SVG geometry. (1280 was skipped in pass three; do not skip it again.)
- The figure layout check: lay out every `svg.mk-fig`, compare every `<text>`
  bounding box against every other for collisions.
- Touch targets under an emulated coarse pointer, by hit-testing.
- A walk of the wave's journey in the rendered output, at both desktop and 375 px.

New kinds of content extend the checks in the same wave (a new figure family joins
the layout check; a new register joins the sweep). Cross-screen data consistency
(counts on portfolio vs register vs detail; supersession propagation; status
consistency) is asserted against `seed.mjs` — the seed is the single source, so a
count drawn by hand anywhere is a defect.

---

## 11. Independent audit loop — mechanics

The implementing agent must not be the sole judge of its own work. After each wave,
an independent auditor (Codex; or, if unavailable, any capable model session with no
prior context from the implementation — the mechanics matter more than the model)
audits the wave.

**Inputs to the auditor:** the mockup repo at the wave's commit, this brief, the
wave's one-page plan and acceptance checks, and read access to the app repo's
required set (§2). The implementer's summary is informational only — never evidence.

**The auditor must run, not read:** every check in §10, plus the wave's journey
walked end-to-end in the rendered mockup. A finding with no command output or
screenshot behind it is an opinion and is filed P3.

**Findings** go in `audits/<date>-wave<N>-codex.md` in the mockup repo, one entry
per finding: id · severity · evidence (command/screenshot reference) · affected
requirement or journey step · expected · observed · recommended correction.
Severities: **P0** blocks a workflow or invalidates product behaviour · **P1**
material functional/UX/traceability defect · **P2** meaningful improvement · **P3**
minor polish.

**Response:** the implementer answers in `audits/<date>-wave<N>-response.md` — every
P0/P1 fixed, every P2/P3 accepted, deferred or rejected with one line of reasoning —
then the auditor re-verifies the fixes the same way.

**Termination:** the wave is complete when zero P0/P1 findings remain open, the
acceptance checks pass, and the journey walks end-to-end. **Maximum three
audit rounds per wave**; a finding still disputed after three rounds goes to Jerry
with both positions stated in two sentences each, rather than looping. Do not begin
the next wave before the gate passes.

---

## 12. Definition of done

The expansion is complete when: every screen has an owner, route, entry path and
onward path, and none exists solely to satisfy a lens; every P0/P1 coverage row is
covered by a usable interaction (a name appearing in the UI is not coverage);
durable entities have stable homes; major workflows include normal, exception,
recovery and historical states; source → issued output is traceable on the drawn
journeys; groundwater is at full vertical-slice depth; the IA owns future domains
without restructuring; the coverage screen is green from evidence, with every `n/a`
reasoned; all waves passed the audit gate.

**And, recorded rather than assumed:** a green coverage row means an expectation has
been *drawn* — not that it is built, and not that it is right. The mockup's own
README is explicit that the screens with the most invention (the QA/QC workspace,
lineage panel, interpretation editor, field-capture grid) have never been seen by a
practitioner, and that five minutes of a hydrogeologist's attention on those is worth
more than another day of drawing. **After wave 2, put the rendered mockup in front of
a practitioner before committing to P2+ breadth waves.** Drawing is cheap; drawing
the wrong invention comprehensively is not.

---

## 13. Success measure

Not screen count. An environmental practitioner moves coherently from **planned work
→ field evidence → laboratory data → QA/QC → validated records → defensible
interpretation → compliance decision → response → report/submission → historical
evidence** without losing context, reconstructing provenance by hand, crossing
disconnected screens, trusting unexplained calculations, losing the source-to-output
relationship, or leaving Strataflow — and the mockup demonstrates a more connected,
transparent and defensible workflow than the incumbents *in walkable journeys*, not
in a catalogue.
