# Response to the vendor requirements brief — 3 September 2026

The brief is *Strataflow Mockup — Environmental Data Management Capability Gap
Requirements*, an independent environmental-science and EDMS acquisition
advisor's brief covering eleven capability areas, five end-to-end scenarios, ten
screen states and ten deliverables. This document is the vendor-side response:
what was measured, what is already satisfied, what is deferred and why, what
needs Jerry's arbitration before it can be built, and the wave programme that
delivers the rest.

**Method.** Four independent read-only assessments were run against the brief's
own text — not a paraphrase — each measuring the 75-screen catalogue at the §2
standard: *a requirement is not satisfied by adding a navigation item, dashboard
card, table, modal or standalone screen.* Every screen was rendered in a real
browser and read; the in-page link graph was rebuilt from the built page so the
scenario walks are real navigation rather than assertion. Where an assessment
made a claim about a defect, the claim was re-measured here before being
recorded — one was upheld, one was not (§11).

**Status.** This document covers deliverables **#2** (traceability), **#3**
(screen inventory), **#8** (decision log), **#9** (satisfied by existing screens)
and **#10** (deferred items). Deliverables #1, #4, #5, #6 and #7 are the
programme in §10 and are not claimed yet.

---

## 1. Where this brief sits, and what it may not decide by itself

`EXPANSION_BRIEF.md` §3 sets the authority order: `docs/PRD.md` first, then
explicit requirements in the governing brief, then the mockup's recorded
conventions and existing coherent workflows. It also says: *"Do not silently
override a higher source. Record material conflicts in the findings note with a
proposed resolution. Jerry arbitrates."*

Most of this brief has direct PRD warrant, and more than expected:

| Brief section | PRD warrant |
|---|---|
| §7 EDD configuration and onboarding | FR-3.1 formats-as-configuration · FR-3.2 per-laboratory mapping profiles that persist decisions · FR-3.3 fuzzy matching with confidence · **FR-3.4, the exact parse → map → validate → review → commit staging §7.2 asks for** · FR-3.5 partial accept · FR-3.6–3.9 |
| §8 QA/QC catalogue | FR-4.1–4.8, close to item for item |
| §9 Analysis | FR-5.8 censored statistics · FR-5.9 Mann-Kendall, seasonal Kendall, Sen's slope · FR-6.1 hydrograph with rainfall overlay · **FR-6.5 names Piper, Stiff, Durov and Schoeller together** |
| §12 Interpretation and reporting | FR-7.1–7.6, with FR-7.3's snapshot answering §12.4's change-impact question |
| §13 Criteria | FR-5.1 concurrent criteria sets with every outcome retained |
| §14 Multi-domain | **FR-1.1 already requires typed location classes covering groundwater, surface water, soil, sediment, vapour, TSF instrumentation, meteorological, air and discharge points** — six of the brief's seven domains |
| §6 Programme definition | FR-8.1 sampling programs with locations, analyte suites, frequency and responsible party; due and overdue tracked |

### The four items that need Jerry before they can be built

**A1 · §4 Data Explorer — the brief's top P0 has no PRD requirement behind it.**
The PRD has FR-6.3 (crosstab with per-criterion exceedance shading) and an NFR
citing "standard crosstab and trend queries". There is nothing about ad-hoc query
construction, governed datasets, or query-to-analysis lineage. The catalogue found
this gap first and wrote it down: `#saved-views` opens *"Proposed. No FR covers
saved queries. FR-6.6 persists a chart configuration. Nothing persists the question
that selected the data."*
*Proposed resolution:* accept it, and add the requirement to the PRD rather than
letting the mockup demonstrate a capability the product does not claim. Nothing
else in this brief is as load-bearing (§9).

**A2 · §5 GIS workspace reverses a recorded non-goal.** `docs/PRD.md` §3:
**"NG4. Full GIS. Map display and spatial export only."** `#coverage` already
answers the incumbent baseline accordingly — ESdat's ArcGIS/MapInfo/QGIS export is
recorded *defer*, and EQuIS's embedded ArcGIS *concede*, both citing NG4 by name.
§5 asks P0 for **fourteen** layers including geology, hydrostratigraphy, plume contours
and aerial imagery, symbology across seven dimensions, a temporal control and
spatial selection handed to the explorer.
*Proposed resolution:* accept the workspace and hold the line at NG4 by making the
map a **consumer** of layers, never an authoring tool — no digitising, no
geoprocessing, no topology editing. §18's exclusion of GIS-server integration
supports this. If accepted, NG4 is worth restating as "no GIS authoring", because
its current wording will keep reading as a refusal of this work.

**A3 · Noise is the one domain with no warrant at all.** FR-1.1 covers the other
six. Noise appears in the PRD only at **NG5, "Dispersion, noise, or radiological
modelling"** — a non-goal. The brief asks for noise *monitoring data* (locations,
measurement periods, acoustic metrics, operating context, limits), which is not
modelling, so the two are arguably compatible.
*Proposed resolution:* demonstrate the information architecture's extension path
for noise without a designed module, which §14.1 explicitly permits — and say so
on the screen rather than quietly drawing it. If a period-aggregated domain is to
be drawn once as proof (§10, Wave 24), noise is the more probative choice than
dust, because its limit is itself period- and receptor-dependent and therefore
tests the common model harder.

**A4 · §14 as a whole reverses a recorded scheduling decision.** `#coverage`'s
incumbent-baseline table records *"EnviroSys §5 — Breadth across air, noise, waste,
flora and fauna — defer — Wider than the slice; S8 widening, not a screen gap"*,
and the soil, composite, telemetry and exchange screens each state that drawing a
deferred domain **does not reschedule it**. PRD §14 OD-7 puts contaminated land,
aquifer testing and closure at S8; R1 names solo capacity against scope as the
highest risk in the product.
*Proposed resolution:* draw the *common model* and the extension path (one new
screen, §10 Wave 24), plus the two domains that make Scenario E walkable, and keep
every drawn domain labelled as S8 widening. That satisfies §14.3 and §14.4 without
claiming a schedule change.

### One decision that is not arbitration but is yours

**Durov (§9.3) is now unblocked.** `audits/2026-09-02-figure-grammar-proposals.md`
FP-3 recommended *"defer until a practitioner asks"*. **FR-6.5 already required it**,
and this brief asks for it directly at §9.3 — so the condition FP-3 was waiting on
is met, and that recommendation is superseded. The remaining cost is a grammar
approval from you, not a wave. FP-1 (depth profile) is separately blocking two soil
screens and the §14 soil work. Both inherit G-76b in full: the grammar these extend
has still never been printed.

**Two counts corrected 3 September 2026, in wave 18 (W18-A-2).** This document
first said §4.2 held "~35" dimensions and §5 "thirteen" layers. Hand counts give
**43** and **14**, and wave 18's build now reads the brief on every run and fails if
the enumeration drifts from those figures — so the repository enforces one pair of
numbers, and it would have been publishing another. Both are corrected above. The
approximation was the tell: a requirement count that has to be estimated has not
been counted.

---

## 2. Assessment summary

| # | Brief area | Priority | Shape of the result |
|---:|---|---|---|
| 1 | §4 Data Explorer | P0 | **Absent as a capability.** No screen composes filters across entities; the nearest surfaces carry 3–6 fixed facets each and hand nothing to one another. Of §4.2's **43** dimensions, roughly a third are partial (a facet exists somewhere, screen-local) and the rest absent. §4.3's worked scenario cannot be expressed — six of its eight terms have no facet, and neither manganese nor a "Unit C" exists in the seed. |
| 2 | §5 GIS workspace | P0 | **Absent as a workspace.** `#map` is two static SVG plates with no layer list, no toggle, no symbology control, no time control and **no selection**. One layer meets §2 outright: the potentiometric surface, which states its method, control set, largest residual (0.55 m), exclusion (MW03B, confined) and the dry bore. |
| 3 | §6 Sampling and Analysis Planning | P0 | **Recording is strong; planning is absent.** `#programme` is read-only — nothing anywhere shows a programme being defined, versioned or amended. §6.4's six-stage reconciliation exists as six sound hand-offs on six different screens and **nowhere as a reconciliation**. Unsampled locations and late-holding-time results are fully satisfied, including MW11's dry disposition with two visits kept as two records. |
| 4 | §7 EDD configuration | P1 | **Exception resolution satisfied; onboarding absent.** `#import-review`/`#quarantine` are the catalogue's strongest pair. But there is **no laboratory object at all**, no format authoring, no test run, no preview, no review. Four of §7.4's nine problem types are demonstrated; five are not. Mapping profiles have no name, no description, no profile version, no approver — and no import run names the profile version it used. |
| 5 | §8 QA/QC catalogue | P1 | **Model is right and must not be redesigned; breadth and declaration are thin.** 13 of §8.2's 22 rules satisfied. Holding time and preservation — the two rules with the sharpest consequences — sit **outside** the governed set. No rule declares severity, analyte group, method, or whether automatic disposition is permitted; those are emergent from a null field. §8.4's judgement workflow is the best thing in the catalogue. |
| 6 | §9 Analysis | P1 | **Groundwater levels and censored statistics excellent; the workspace does not exist.** No analysis object, so §9.5's chain has no first link. `#hydrochem` renders ~1.3 KB against `#hydrograph`'s ~13 KB — no configuration block, no table view, no population, no exclusions. A summary-statistics link points at a screen that contains none. |
| 7 | §10 Portfolio operations | P1 | **Queue content strong, queue mechanics absent.** Seven of the ten required filters have **no data behind them** — work-queue rows hold only kind, urgency, headline, context, project, age, target, action. No organisation or client tier exists (single-tenant by DR-1). Assignment is drawn well; reassignment has no target picker; dependency is prose. |
| 8 | §11 Configuration governance | P1 | **Consequence-before-change is exemplary; hierarchy and lifecycle are absent.** Seven screens compute what a proposed change would reach before it is made. But no organisation → client → project → programme chain exists, no value is marked inherited/overridden/local, and no configuration item anywhere sits in a review, rejected or returned-for-revision state. |
| 9 | §12 Interpretation and reporting | P1/P2 | **Evidence model strong; review machinery absent.** Managed figures, numbering, cross-references and staleness are satisfied, including the distinction between a figure being out of date and having changed under an author. There is **no comment machinery anywhere**, no interpretation review state, no recommended-action object — and report §7 stands at 0 words. |
| 10 | §13 Criteria management | P2 | **Sets are governed; criteria are not.** The library is a register of *sets* — the 58 analytes in ANZG 2018 cannot be browsed, there is no criterion record and no criterion-type field. §13.4 is answered in **one direction only**: rigorous that a change never reaches backwards, with no surface for looking backwards on purpose. |
| 11 | §14 Multi-domain | Strategic | **Domain-specific behaviour is better than the brief asks; four of seven domains have no data.** Air, dust, noise and meteorology are absent (meteorology exists only as a rainfall panel with no record, no location and no lineage). The §14.3 common model is **never stated on any screen**. |

---

## 3. Deliverable #9 — satisfied by existing screens, with rationale

These are claimed at the §2 standard: the workflow, the decision information, the
actions, the states, the exceptions, and the links to upstream evidence and
downstream use. Each is checkable against the named screen.

| Requirement | Screen | Why it satisfies §2 |
|---|---|---|
| §7.4 exception resolution, and "no silent material transformation" | `#import-review`, `#quarantine` | Confidence per question, rows-at-stake summing to the header count, "If you accept" stating the downstream, and a held row where the screen **refuses to offer an accept control** because there is nothing to accept. The "Applied without asking — and why" table names the basis and row count for each. |
| §8.4 the whole judgement workflow | `#qc` | Each open finding carries the question in a hydrogeologist's words, the evidence, and an options table with propagation basis, what it writes, and **whether it is available on this evidence** — two options refused with the reason, plus an explicitly refused course. |
| §9.2 groundwater-level analysis, all eight items | `#hydrograph`, `#map`, `#logger-series` | Elevation derived through the survey in force at each measurement date, the resurvey drawn as a ruled and named step, gradient by planar fit with its residual printed and its exclusion argued, dry drawn as a break rather than a line. |
| §9.4 censored-data treatment | `#statistics`, `#background` | Never substituted; non-detects enter as tied values; robust ROS and Kaplan-Meier named with the worker that computes them; the LOR step drawn as a stepped line, with the note that half-LOR substitution would have manufactured a 2 µg/L step at the method change. |
| §11.2 "consequence of a proposed change" | `#criteria`, `#qc-limits`, `#project-settings`, `#mapping-profiles`, `#package`, `#programme`, `#exceedances` | Every configuration screen computes the blast radius before the control: results re-derived, evaluations recomputed, outcomes changed, issued reports flagged stale **not rewritten**, historical evaluations untouched, and reversibility stated. |
| §11.3 effective / superseded / historical applicability, and version comparison | `#criteria`, `#qc-limits`, `#licence`, `#submissions` | "The span reaches forward only"; the window and criterion in force at each round frozen onto the outcome; side-by-side version diffs down to byte level with identical items drawn rather than dropped. |
| §12.3 managed figures and tables | `#report-figures`, `#narrative` | Numbering computed from position and scoped to template version; 18 cross-references resolving with dangling detection; staleness with its cause; and the load-bearing distinction that a figure being out of date and a figure having changed under an author are two findings on two screens. |
| §12.4 change-impact on interpretations, figures and sections | `#supersession`, `#snapshot`, `#narrative` | The cascade withdraws an exceedance and a TARP state, flags the report section, and `#snapshot` reports the difference value by value across sections. |
| §13.3 background and reference values | `#background` | Reference population named, ANZG §3.1.4 cited, 80th percentile by Kaplan-Meier rather than substitution, a per-analyte basis column, and adoption with its consequence computed. |
| §13.2 hardness dependency and qualifier representation | `#hardness`, `#qualifiers` | Relationship, cap, what the cap costs, and a cross-check against Ca/Mg; qualifiers carry origin and scheme, with the export refusing to write a code a laboratory never said. |
| §6.4 unsampled locations, and results received after holding time | `#programme`, `#field-capture`, `#receipt` | MW11 has a disposition with its reason, two visits as two records, a countdown counted rather than typed, a completion control that **refuses and names the three lines holding it**, and downstream consequences drawn on three screens. The nitrate clock runs from collection, and a holding time measured from receipt would have called it compliant. |
| §17 exception, superseded and approval states | `#quarantine`, `#indeterminate`, `#certificate`, `#composite`, `#supersession`, `#signoff` | A locked period refuses a write rather than warning; an unanswerable attribution is drawn with a computed bound and an expiry to buy it back; signatures carry capacity, digest and exactly what was covered. |
| §20 "no requirement claimed complete from a menu item" | `#coverage` | Its "What a green row here does not mean" section, its four `n/a` rows, and its refusal to claim a screen for a behaviour-shaped requirement are the discipline §2 asks for, already built and machine-checked. |

---

## 4. Deliverable #10 — deferred, with reason and effect

| Item | Reason | Effect on the demonstrated workflow |
|---|---|---|
| **Soil and sediment criteria** | 0 of the 5 sets in the library carry a soil or sediment matrix, and the catalogue has three times refused to invent a limit no source states — most recently in wave 16, where six records were searched and all six said no. | **Every soil and sediment result stays `not evaluated`.** Ratio-to-background is offered instead, explicitly as an interpretation and not a criterion. This blocks §14's soil and sediment domains from being *evaluated* at all. **This is the single largest unlock available and it needs a source, not a design** — a real, citable one (NEPM HILs/ESLs, or the site's own approved assessment levels). Jerry supplies or approves it; the wave that draws it comes after. |
| **Durov (§9.3), depth profile (FP-1), head contours (FP-2)** | Figure families outside the twelve approved plates. FP-2 is refused on measured grounds: seven control points, one dry — contours over that network imply knowledge a plane states more honestly. | Durov and the depth profile are approvable now (§1). FP-2 stays deferred until a denser network exists; §9.2's gradient requirement is already satisfied by the plane fit with its printed residual, so nothing is lost. |
| **Air, dust, noise, meteorology as designed modules** | S8 widening on the PRD's own sequencing; `#coverage` records the breadth question as *defer*. R1 names scope against solo capacity as the highest product risk. | §14.2's four remaining domains are demonstrated as an extension path and a common model rather than modules. Scenario E needs exactly two of them as real records (surface water, meteorology) and no more. |
| **Live query interaction** | The catalogue is static HTML by construction; the built page's only script does screen navigation, a rail filter and slide-overs. | §4.3's "show how the population changes as filters are applied" is delivered as **a sequence of linked drawn states** with the population readout at each step, which is what §17 asks for. It is not delivered as a working filter, and the response says so rather than implying interactivity. |
| **Organisation and client tier (§10.2, §11.2)** | The instance is single-tenant by DR-1; both projects belong to one operator. This is a deployment-model fact, not a missing screen. | The portfolio hierarchy is drawn from **project** down. Whether the brief wants a multi-client portfolio or a client *label* on projects is an open question for Jerry (§5, Q3). |
| **`#home` as the owner/assignment surface (§6.4, §10.3)** | `#home` is a proposal kept as a proposal by Jerry's decision — the product's `/` is deliberately a project list. | §6.4's owners-and-assignment requirement lands on a surface already ruled out of the product. Completeness items get owners on the completeness workspace instead, and the response records that the queue that would surface them is a proposal. |

---

## 5. Deliverable #8 — decision log

**Assumptions taken, to be corrected if wrong.**
1. The brief governs the *mockup*, not the product roadmap: drawing a deferred
   domain demonstrates the architecture and does not reschedule it. Every drawn
   S8 domain stays labelled as such, per the convention already in the repo.
2. §5 is compatible with NG4 if the map consumes layers rather than authoring
   them (A2). All §5 work is planned on that reading and stops if it is wrong.
3. "Not among the codes the specification names" is the strongest claim the
   record supports about a format field; the brief's §7 work will not assert that
   a field *rejects* anything the specification does not say it rejects.
4. A population that has been cited by a figure is frozen at a version; a
   population being refined is live. These are two states of one object, and the
   mockup will draw the seam rather than hide it (§9).

**Unresolved environmental-science questions.**
1. **Which soil assessment levels apply at this site?** Without a source, soil
   results cannot be evaluated (§4).
2. **Is a proposed-but-unapplied qualifier inside or outside a figure's
   population?** Nine zinc results are in exactly this state today. Whichever way
   it goes, the plate must say which — and this decides the shape of the analysis
   object.
3. **Does "criterion" generalise?** Noise compares a period-aggregated metric to a
   receptor- and time-dependent limit; stygofauna returns *persisting* against a
   reference and never touches the criteria library. The catalogue has already
   answered this two incompatible ways. §14.3 stands or falls on making them one
   object at different settings **without a mark on a grid coming to mean four
   things**.
4. Whether the portfolio tier the brief wants is a client or a label (§4).

**Proposed departures from the existing interaction model.**
1. `#crosstab` is demoted from a self-filtering screen to **one representation of
   an explorer population**, keeping its cell grammar and losing its private filter
   bar. This is a real change to a screen a practitioner has seen.
2. `#search`'s recorded boundary — *"Search covers identifiers and names, not
   result values — a number is found through the crosstab's filters, where the
   criteria set and period that make it meaningful are also chosen"* — is
   **honoured, not overturned**: the explorer reaches values through a query that
   carries a criteria set and a period, never through a free-text box.
3. `#location` stops being MW05. It currently serves nine location classes with one
   bore's drawing, and needs at least three class states.

---

## 6. Deliverable #3 — screen inventory

**Modified: 31.** `map` (the largest single change in the brief) · `crosstab` ·
`saved-views` · `locations` · `location` · `programme` · `events` ·
`field-capture` · `exceedances` · `statistics` · `hydrograph` · `hydrochem` ·
`background` · `report-figures` · `narrative` · `lineage` · `dqa` · `facility` ·
`qc-limits` · `qc` · `formats` · `mapping-profiles` · `import-review` ·
`quarantine` · `imports` · `criteria` · `result-detail` · `snapshot` · `signoff` ·
`home` · `obligations`.

**New: 24, in the order the programme builds them.**
Governed dataset (population object) · Data Explorer query canvas ·
Representation switcher over one population · Map layer manager · Map symbology
configuration · Map time control · In-map location investigation · Spatial
selection hand-off · Programme designer · Programme amendment history · Round
preparation · Planned-versus-actual completeness workspace · Unmatched sample
resolution · Laboratory register · Format onboarding workspace · Rule catalogue
(distinct from a project's DQO set) · Analysis workspace with a first-class
analysis object · Configuration governance register · Criterion record · Criteria
applicability and conflict workspace · Historical reassessment · Interpretation
review · Recommendations register · Common-model page (§14.3, each domain as a
governed variation with the cells that are empty for that domain shown empty).

**Retired: none.** No existing screen is made redundant; `crosstab` changes role
but keeps its grammar.

---

## 7. Deliverable #4 status — scenarios A–E as they walk today

Walked by real navigation in the built page, not asserted.

| Scenario | Status | Where it breaks |
|---|---|---|
| **A** Routine groundwater monitoring | **Walkable**, 10 hops | Strains at planned-vs-actual (three columns wide; submitted/analysed/validated absent), and `crosstab` has no link to `hydrograph`. |
| **B** Problematic laboratory batch | **Satisfied** — the catalogue's best scenario, 10 hops end to end | Five of §7.4's nine problem types are not demonstrated as resolvable; `narrative` flags a sentence but offers no reviewer comment or return-for-revision. |
| **C** Historical investigation | **Breaks twice, both at the top** | There is **no route from an issued report to the result rows it stands on** — `#snapshot` reaches no result. From the figure down it is excellent; the figure register's Source cell is text, not a link. |
| **D** Emerging groundwater issue | **Both ends work, the middle carries no context** | `#map` has no selection, so "surrounding bores → Data Explorer" cannot be expressed; and `#narrative` reaches no obligation surface. |
| **E** Multi-domain investigation | **Not walkable** | Breaks at the first cross-domain hop: SW01 has no detail state, the surface-water round is a row with no manifest, and rainfall is a bar panel with no record, no location and no lineage. |

Two chain hops in §15 are missing entirely — **a sampling plan for groundwater**
(soil has one; groundwater's `#programme` is a recurrence schedule) and
**interpretation → obligation** — and three are one-directional: result→query,
query→analysis, analysis→figure all break on the way back.

---

## 8. Deliverable #2 — traceability

Traceability is delivered the way this repo already does it, and extended rather
than duplicated: `#coverage` is a rendered screen reconciling closed enumerations,
machine-checked on every build. This brief becomes a **seventh enumeration** on
that screen — every requirement section against the screens and states that answer
it, with the same three verdicts and the same refusal to claim a screen for a
behaviour-shaped requirement. That work is Wave 18's first half, so the matrix is
built before the capabilities it will track, and every later wave updates it in the
same commit that changes what it measures.

---

## 9. The keystone: three P0s are one missing object

Two assessments reached this independently, from different sections, and it is the
finding that shapes the programme. **§4.3, §4.4, §4.5, §5.6, §6.4, §9.5 and §12.2
all collapse onto one artefact**: a population that can be selected, named,
versioned, carried between workspaces, and cited by a figure years later at the
exact version used.

It carries a contradiction the catalogue already knows how to talk about. A live
query and a frozen dataset are opposite objects, and this product's discipline is
that an outcome freezes onto the record at evaluation date and a licence varied
next year moves nothing already decided. Build the population as session state and
*"two people asking for the compliance boundary numbers get two questions"* — the
disagreement `#saved-views` says the product exists to end. Build it as a snapshot
and it diverges silently, and a stale figure becomes undetectable — exactly what
`#report-figures` currently catches for certificates and would lose for datasets.

And a trap specific to this catalogue: **a population is not a row set.** Its most
careful work is that *dry*, *not analysed*, *composited* and *not evaluated* are
four different absences and none is a pass. An explorer that filters to "validated
results only" and quietly drops those cells destroys the distinction the catalogue
is most proud of. The population readout must count what was excluded and why, per
kind — `#crosstab` already does this in one static line: *61 results (was 66) · 11
cells at a bore that returned nothing · 5 where the suite was never run*.

Get this object right and most of the brief becomes additive. Get it wrong and the
Data Explorer is the screen that reintroduces "not evaluated reads as compliant".

---

## 10. The programme

Sequenced so the keystone lands first and the arbitration-blocked work is late
enough that answers can arrive without stalling the queue. Each wave runs the
established loop: plan → implement → measured review gate → independent audit to
zero P0/P1 → response → push.

| Wave | Delivers | Status |
|---|---|---|
| **18** | The vendor-requirements enumeration on `#coverage` (deliverable #2), and the **saved-views defect** fixed as its rider | ready |
| **19** | The **governed dataset** — population object with definition, version, owner, lifecycle, variant lineage, and the four-absence exclusion accounting. Retires the typed view tables. | **D1 ✓** |
| **20** | **Data Explorer** — query canvas over the dataset, progressive construction as linked drawn states, the inclusion/exclusion explainer, and the representation switcher; `#crosstab` becomes one representation (**D11 ✓**) | **D1 ✓** |
| **21** | **Analysis object**, and `#hydrochem`'s missing population, configuration, exclusions and table view. Populations carry each member's QA/QC state, and a proposed-but-unapplied qualifier is **inside** the population with the plate saying so (**D10 ✓**) | **D1 ✓** |
| **22** | **Sampling and analysis planning** — programme designer, versioned amendments, round preparation, and the six-stage completeness workspace | ready |
| **23** | **Map workspace** — layers with source/date/authority, symbology configuration, time control, in-map investigation, spatial selection hand-off. NG4 restated as "no GIS authoring": the map consumes layers, never authors them (**D4 ✓**) | **D4 ✓** |
| — | **Practitioner walk** — carries D9, D11, the four screens the first review corrected, and everything waves 18–23 built (**D13 ✓**) | Jerry |
| — | **Print test (G-76b)** — an approved plate placed in the Word template and printed, before any new figure family is drawn (**D13 ✓**) | Jerry · gates all figure work |
| **24a** | **Common model and extension path** (§14.3–14.4), plus surface-water and meteorological records — the two that make Scenario E walkable. Criterion generalises fully: one object at different settings, with every finding rendering which kind of assertion produced it (**D5 ✓, D9 ✓**) | after the walk |
| **24b** | **Noise and dust** as period-aggregated proofs — a receptor- and time-dependent limit, and a deposition rate over an interval. Noise states on the screen that monitoring is not modelling, so NG5 stands (**D6 ✓**) | after 24a |
| **25** | **Criterion record**, criterion type, applicability conditions, conflict surface, and §13.4's historical reassessment. Soil and sediment gain **NEPM 2013 HIL D and ESLs at commercial/industrial land use**, with land use as an applicability condition (**D3 ✓**) | **D3 ✓** |
| **26** | **Configuration governance** — hierarchy, inherited/overridden/local, review and rejected states, future-effective calendar. A **client label** on projects, with the single tenancy stated where the tier would otherwise be (**D8 ✓**) | **D8 ✓** |
| **27** | **Laboratory register and format onboarding**, plus the five missing §7.4 exception types and profile versioning on an import run | ready |
| **28** | **Rule catalogue** — severity, analyte group, method, disposition permissions; holding time and preservation brought inside the governed set | ready |
| **29** | **Interpretation review, comments, recommendations register**, and the interpretation → obligation hop | ready |
| **30** | **The work queue as its own screen** — the seven missing filter dimensions as data, dependency, escalation, working reassignment. `/` stays a project list, so both prior decisions hold (**D7 ✓**) | **D7 ✓** |
| **31** | **Scenario completion pass** — Scenario C's snapshot-contents and as-at-issue result, the reverse links on `#report-figures`, and the linked prototypes for A–E (deliverable #4) | ready |

**Figure work.** FP-1 (depth profile), FP-2 (head contours) and FP-3 (Durov) are
all approved (**D2 ✓**) and all three are **gated on the print test**, not on a
wave. Each family's reference rendering is authored as its own step before any
screen or test asserts against it, per the oracle rule. FP-2 is drawn to the
grammar banked in its proposal — contours clipped to the seven-point control hull,
residuals printed, the interpolation rule named in provenance — so the plate states
what it does not know. All three inherit G-76b until the print test closes it.

**All thirteen decisions are answered** — see `2026-09-03-open-decisions.md` for
the verdict table waves cite, the three departures from my recommendations, and
what follows from each.

---

## 11. Defects found during assessment, independent of the brief

**Upheld — `#saved-views` contradicts the seed for the same objects.** The screen
holds **four typed literal rows** in `screens.mjs`; the seed holds a different
four-row list for the same objects. Only one name is common, *TSF downgradient —
metals*, and the two disagree about what it selects — *6 metals over a rolling 3
years* on the screen, *dissolved metals (8) over a rolling 8 quarters* in the seed —
and different last-run dates. Its claimed figures do not match what
`#report-figures` cites.

**Corrected 3 September 2026, in wave 18.** This paragraph said the two records
also disagreed *about its owner*. They do not, and the wave that fixed the defect
found it by re-measuring rather than accepting the finding: the drawn table's third
column is **Used by** and reads `A. Nakamura`; the seed's `by` reads `A. Nakamura`.
The seed's `owner` field holds `Project`, which is a sharing class and not a person,
and this document conflated the two. **Three values moved on that row, not four**,
and the unchanged one is kept in the settlement's own moved-values table so the
claim cannot be re-asserted. Three surfaces, three answers, about the object §4.5 asks
to be governed. Fixed as Wave 18's rider.

**Not upheld — `#coverage` journey 9.** An assessment recorded the matrix as
claiming a journey the seed records as unmet. Re-measured: the row marks journey 9
*covered* and its note in the same cell states that the descent runs into MOCK-WDL,
and the seed's record is that *Kurrajong's workspace* is not drawn — not that the
journey is unmet. A caveat stated in the same cell is not a falsified claim.

**Carried into their waves:** `#report-figures`' Source cell is text where it should
be a link in both directions; `#crosstab` has no edge to `#hydrograph` and none to
`#map` in either direction; and `#batches` shows an MSD result while the 19-check
register has no MSD row, so two surfaces disagree about whether it was judged.

---

## 12. What this response does not claim

The catalogue draws expectations; a drawn expectation is not a built capability and
is not evidence that it is right. Fourteen of the 75 screens are marked `proposed`
and several verdicts above sit on them — `#home`, `#narrative`, `#saved-views`,
`#lineage`, `#field-capture` among them. They are satisfied *as drawings*, which is
what a mockup is asked for, and they should not be read as capability.

Both design oracles this catalogue is drawn to were self-approved and **neither has
ever been printed** (G-76b). A practitioner has read **four** of the 75 screens, and
the four screens that review corrected now carry more invention than they did
before it. §20's "followable without verbal explanation from the vendor" is
therefore untested against a practitioner for 71 screens, and this response does not
claim otherwise.
