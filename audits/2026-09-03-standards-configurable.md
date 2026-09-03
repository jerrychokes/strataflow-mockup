# X1 · Make all standards configurable across the platform

**Directive from Jerry, 3 September 2026**, given while the thirteen decisions
were being recorded. It is not one of them: it is a cross-cutting requirement
that changes what several waves build and the order they run in.

## What it is read to mean

Every standard the product **evaluates against, works to, or decides by** is a
configuration record — versioned, scoped, effective-dated, attributed to whoever
approved it, and citing the document it comes from. Nothing hard-coded in a
screen. Nothing living only in a sentence.

The set is deliberately wide, because "all" was:

- criteria and guideline values — ANZG, NEPM, PFAS NEMP, licence table limits,
  site-specific triggers, TARP levels, background and reference values
- QA/QC acceptance limits and their applicability rules — RPD limits, recovery
  ranges, blank limits, the 5 × LOR rule, field-parameter stabilisation tolerances
- holding times and preservation requirements
- analytical methods, and sampling and field standards
- units, conversion rules, and whether each is exact
- derivation rules — sums, non-detect propagation, hardness equations and caps,
  mass loads, consecutive-window rules
- detection and reporting-limit conventions
- EDD format specifications and the code lists inside them
- report templates, numbering rules, golden comparisons
- completeness and data-quality-assessment targets
- statistical method choices and their parameters
- and the period-aggregated limits noise and dust will need (D6)

**Boundary.** Configurable does not mean editable by anyone at any time. It means
the standard is a governed object with a lifecycle — which is the opposite of a
free-text field. A standard that can be changed without a version, an effective
date and an approver would be less defensible than the literal it replaced, not
more.

## Why this is the right instruction, on the record's own evidence

The assessments found the pattern before the directive arrived, in several
places at once:

- **Holding time** — the rule that *quarantines data* — is a bare method string
  (`APHA 4500-NO₃⁻ · 2 d`) with no version, approver, effective span or matrix.
  It sits outside the governed DQO set entirely, as does preservation.
- The **95% completeness target** lives in data-quality-assessment prose with no
  version and no approver.
- **Required QA frequency** is a population string on a limit row
  (*"one per 20 samples per matrix per batch"*) and nothing counts against it.
- **Units rules** carry a version by name (`unit-scale v1`) but no effective date,
  approval or scope. The **analyte dictionary** screen carries no version,
  effective date, lifecycle or scope at all. Two of the four **EDD formats** carry
  no version.
- **Stygofauna** has a bespoke verdict vocabulary that never touches the criteria
  library — one of the two incompatible answers D9 now resolves.

Meanwhile the catalogue already holds the house pattern this should be lifted to:
the DQO set at versions 2025.2 → 2026.1, with per-limit source, applicability
rule and matrix, a named approver with a timestamp, effective spans that *reach
forward only*, and findings that keep the version they were raised under.

## What it changes about the programme

**The standards register becomes foundational**, and moves ahead of every wave
that adds a new standard. Building noise and dust limits (24b) or the criterion
record (25) on top of an ungoverned base would mean governing them twice.

It also absorbs and widens two waves already planned: **26** (configuration
governance — hierarchy, inherited/overridden/local, lifecycle states) and **28**
(rule catalogue — severity, analyte group, method, disposition permissions).
Those were the same idea at two scopes, and this directive is the general case.

The re-sequencing is written into the response document's programme table once
the inventory below is complete.

## The measurement, first

The inventory is below, and it changed the shape of the answer: **112 standards,
48 of them hard-coded literals, 16 of them prose, and only 15 carrying an approver
at all — eleven of which are one version of one record.** Designing the register
before knowing what had to fit on it would have been the mistake this pipeline
exists to avoid.

Two findings from it govern everything the register becomes. A **holding time is
not an independent standard** — it is a field on a method-adoption record, and its
homelessness today is exactly why no screen owns it. And **twelve things break** if
every standard naively becomes a versioned record with an effective period; that
list is not an obstacle to the design, it *is* the design.

## Open questions the inventory is expected to force

1. **Instance or project scope.** The catalogue has two scopes today —
   `/config/*` for units, dictionary and formats, `/projects/:id/*` for criteria,
   mappings and objectives. Some standards need both: an instance default a
   project overrides. That is D8's inheritance question arriving from a second
   direction.
2. **Standards that resist being configuration.** A *method* is a published
   document rather than a value. A format's own code list is the vendor's
   standard, not the operator's — the operator can record which version they read
   it at, and cannot amend it. A statistical *method choice* is a judgement
   rather than a limit.
3. **What a version change must not move.** Every standard becoming versioned
   makes the forward-only rule load-bearing everywhere rather than in the three
   places that state it today. A criterion varied next year still moves nothing
   already decided, and the same must hold for a holding time, a recovery range
   and a noise limit — which is a claim the catalogue will have to make on far
   more surfaces than it currently does.

---

# The inventory — measured 3 September 2026

**112 standards.** Form: **C** configuration (a record with fields) · **L** literal
(a hard-coded value or string) · **P** prose (a sentence only). Flags: **V** version ·
**E** effective period · **S** scope as a structured field · **A** a named approver
*with* a timestamp · **Src** a cited source document.

## The counts

| Form | Count | Share |
|---|---:|---:|
| Configuration | 48 | 43% |
| Literal | 48 | 43% |
| Prose | 16 | 14% |

| Governance | Carries it | Does not |
|---|---:|---:|
| Version | 38 | 74 |
| Effective period | 26 | 86 |
| Scope as a structured field | 46 | 66 |
| Approver, with a timestamp | **15** | 97 |
| Source citation | 65 | 47 |

**Concentration matters more than the totals.** Of the 38 versioned standards, 21 sit
in two records — the DQO set's eleven rows and the criteria library's five, plus five
conversion rules. Of the 26 with an effective period, 17 are those same two. **Of the
15 with an approver, eleven are the DQO's 2026.1 version alone.** Two registers carry
almost all the governance in the product; everything outside them is a string.

Two further measurements: **not one** of the six holding-time and preservation
standards carries a version, an effective period or an approver, and **not one** of the
eight statistical standards does either — six of those eight are prose.

## The inventory, by kind

Each row: ID · standard · where it lives · form · the five flags it carries.

### A · Criteria and guideline values (13)
`A1` ANZG 2018 95% · `seed.mjs:2923` · C · V E S Src · `A2` ANZG 2018 99% · `seed.mjs:2924` · C · V E S ·
`A3` Licence Table 4 · `seed.mjs:2925` · C · V E S Src · `A4` Table 4 superseded · `seed.mjs:2926` · C · V E S ·
`A5` TSF site-specific triggers · `seed.mjs:2927` · C · V E S · `A6` **PFAS NEMP 2.0, three receptor sets** · `screens.mjs:4756` · **L** · S ·
`A7` **Per-analyte criterion values on the grid** · `seed.mjs:837` · **L** · S · `A8` 80th-percentile trigger derivation · `seed.mjs:6030` · **P** · S Src ·
`A9` **TARP levels 1–3** · `seed.mjs:2369` · C · S · `A10` Consecutive-window 12(c) · `seed.mjs:2320` · C · V S Src ·
`A11` Discharge limit DP01 · `seed.mjs:4076` · **L** · S · `A12` Entitlement + 90% flag · `seed.mjs:2403` · **L** · E S Src ·
`A13` Stygofauna verdict vocabulary · `seed.mjs:814` · **L/P** · S Src

### B · QA/QC acceptance limits (13)
`B1`–`B11` the ten DQO rows and the 5 × LOR applicability rule · `seed.mjs:1659–1732` · C · **V E S A Src on every one** —
field duplicate RPD, laboratory duplicate RPD, matrix spike recovery, MS/MSD RPD, LCS recovery, surrogate recovery,
method blank, field/trip/equipment blank, ionic balance, field-parameter stabilisation.
`B12` **Internal-consistency limits** (balance ±5%, TDS ratio 0.90–1.10, EC:TDS 0.55–0.75) · `seed.mjs:1451` · C · **no flags at all** ·
`B13` Stabilisation tolerances per parameter · `seed.mjs:4394` · C · S Src

### C · Other acceptance limits (5)
`C1` Hardness reported-vs-computed ±10% · `seed.mjs:5993` · **P** · — · `C2` Receipt acceptance checks · `seed.mjs:5312` · C · S ·
`C3` Logger-vs-dipper ±0.05 m · `seed.mjs:7833` · C · V E S · `C4` Planar-fit residual limit · `figures.mjs:1226` · **P** · — ·
`C5` Soil field-screen threshold 500 µS/cm · `seed.mjs:8329` · **L** · V S A Src

### D · Holding times and preservation (6) — *no register anywhere*
`D1` Nitrate 2 days · `seed.mjs:1918` · **L** · Src · `D2` PFAS 28 days · `seed.mjs:5450` · **L** · Src ·
`D3` Dissolved metals 6 months · `seed.mjs:6701` · **P** · — · `D4` Soil 1:5 extract 28 days · `seed.mjs:9094` · **L** · S ·
`D5` Soil total metals 180 days · `seed.mjs:9095` · **L** · S · `D6` Preservation, per bottle · free text per session · **L** · —

### E · Analytical methods (9) — all naked strings
`E1` USEPA 200.8 · `E2` USEPA 1633 · `E3` APHA 4500-NO₃⁻ · `E4` APHA 2340C · `E5` APHA 1030E · `E6` Rayment & Lyons 3A1/4A1 ·
`E7` USEPA 3050B/6010B · `E8` ICP-MS/MS alternative · `E9` NATA scope. All **L** or **P**; scope and source only.

### F · Sampling and field standards (6)
`F1` AS/NZS 5667.1 · `F2` AS/NZS 5667.11 · `F3` EPA subterranean-fauna guidance · `F5` GISTM 4.3 · `F6` MS 1184 condition 9 — all **L**, Src only.
`F4` Sampling and analysis plan rev 1 · `seed.mjs:8326` · **L** · V S A Src

### G · Units, conversion and exactness (7)
`G1` Canonical units · C · S · `G2` `unit-scale v1` · C · V S · `G3` `unit-identity v1` · C · V S ·
`G4` `datum-at-date v2` · C · V S Src · `G5` `speciation v1`, **not exact** · C · V S ·
`G6` CRS GDA2020/MGA50 · `screens.mjs:10541` · **L** · S Src · `G7` Integer kilolitres · **P** · S Src

### H · Derivation rules (8)
`H1` `sum-pfas-anzg v2.1` · **L** · V S Src · `H2` Non-detect treatment, **bound per criteria set** · C on the record, **L on the binding** (`screens.mjs:4772`) · V E S A Src ·
`H3` `hardness-modified-tv v3`, capped at 400 mg/L · **L** · V S Src · `H4` `consecutive-window v2` · **L** · V S Src ·
`H5` `baro-compensation-nonvented v1.3` · C · V E S · `H6` Mass load · **L** · E S Src ·
`H7` An estimated detect is a detect · **P** · S Src · `H8` Composite ceiling/floor arithmetic · C · S

### I · Detection and reporting limits (5)
`I1` **Analyte dictionary LOR/MDL defaults — hard-coded HTML rows at `screens.mjs:5441`** · **L** · S Src ·
`I2` PFAS LOR 2.0 / MDL 0.5 · **L** · S Src · `I3` Sensitivity objective LOR ≤ 0.5 × criterion · **L** · — ·
`I4` Reporting limit above criterion → indeterminate · **L** · V S Src · `I5` LOR/MDL/PQL/ODL kept distinct · **P** · S Src

### J · EDD formats and their code lists (12)
`J1` ESdat ELDF-4 · C · V S Src · `J2` Yarra Regional v2 · C · V S · `J3` ESdat legacy export · C · **version refused** ·
`J4` EQuIS EDD · C · **version refused** · `J5` Levelogic `.lvlx v4` · C · V S · `J6` Sentinels −999 / −997 · **L** · S Src ·
`J7` `Lab_Qualifier` named set · **L** · S Src · `J8` ELDF §5 sample-type codes · **L** · S Src · `J9` EQL ↔ LOR mapping · C · S Src ·
`J10` Qualifier scheme vocabulary · C · S Src · `J11` Qualifier origin vocabulary, **measurably too small** · C · S Src ·
`J12` **A controlled instance reason-code list — does not exist** · `seed.mjs:3803` · **P** · —

### K · Report templates, numbering, golden comparison (5)
`K1` Corporate template, 8 settings · C · V E S Src · `K2` DWER prescribed structure · C · V S Src ·
`K3` Golden comparison set — **gates issue** · C · S Src · `K4` Numeric rendering rule · C · S · `K5` Figure grammar at 180 mm · **P** · S A Src

### L · Completeness and DQA targets (4)
`L1` Six DQA dimensions · C · S · `L2` **Completeness ≥ 95%** · `seed.mjs:6091` · **L** · — ·
`L3` **Comparability — no method change without documented equivalence** · **L** · — · `L4` Field disposition closed list · C · S

### M · Statistical method choices and parameters (8)
`M1` Mann-Kendall vs seasonal — the *choice* · **P** · `M2` Sen's slope · **P** · `M3` Kaplan-Meier not substitution · **P** ·
`M4` Robust ROS · **P** · `M5` `n = 8` rule · **L** · `M6` Modified z-score threshold 3.5, **two independent instances** · C · S Src ·
`M7` Non-detects as ties · **P** · `M8` Planar least-squares fit, MW03B excluded · **P** · S

### N · Time, calendar and obligation windows (11)
`N1` Anchor month, quarterly, 21-day grace · **L** · S · `N2` Entitlement year · C · E S Src ·
`N3` Period resolved in Australia/Perth · **L** · S · `N4` "As soon as practicable" stored null · C · E S A Src ·
`N5` 30-day investigation window · **L** · V S Src · `N6` CS Act s11 duty · C · E S Src ·
`N7` **TARP stand-down: 4 consecutive rounds** · `screens.mjs:4108` · **L** · S ·
`N8` Alert escalation countdown · **L** · **no flags** · `N9` Calibration interval 12 months · **L** · S ·
`N10` Backup RPO/RTO · **L** · S · `N11` Sign-off capacities · **L** · S A

## The pattern in one sentence

**The standards the product is proudest of are governed; the standards that silently
remove data from the assessment are not.** A criterion has a version because somebody
argued about it. A holding time quarantines a result without argument, and got a string.

## Ranked — decides the most, governed the least

1. **Holding times (D1–D6).** D1 quarantines a result and removes it from evaluation
   with no judgement in it, and it lives as **six occurrences in four different
   spellings** across `#qc`, `#quarantine`, `#crosstab` and `#composite` — verified:
   `seed.mjs:1009`, `1915`, `1918`, `3453` (twice), `3857`. There is no register, no
   screen and no route that owns holding times in 75 screens. D3 — the six-month metals
   window that decides whether the whole certificate amendment is defensible — is one
   clause inside one narrative paragraph.
2. **Analyte dictionary LOR/MDL (I1).** Verified as hard-coded HTML table rows at
   `screens.mjs:5441-5446`. These numbers decide whether a value is censored, whether
   cadmium is *indeterminate* rather than a pass on seven results, which branch of the
   5 × LOR rule applies, and the width of the censored load interval on a statutory
   return. The screen shows no version at all, and `CONFIG_INVENTORY` does not list the
   dictionary as a configuration kind. **The most consequential unversioned artefact in
   the catalogue.**
3. **The TARP (A9).** It raises the statutory notification, it put monthly sampling in
   force at two bores, and it is *stricter than the licence* — Level 2 escalates on two
   consecutive rounds where condition 12(c) needs three. No version, no effective span,
   no source, no approver. Its stand-down condition (N7) is a literal in a blast-radius
   row and is the only mechanism that can end a monitoring burden.
4. **The non-detect binding as drawn (H2).** The record is governed; the table saying
   *which* rule each set is bound to is two literal rows. The screen's own text says a
   global setting "would make one of the two answers silently wrong" — and the binding
   that prevents that is the untyped half.
5. **Internal-consistency limits (B12).** Three numbers with no version, no date, no
   approver, no scope and a source for only one. They raise the MW05 review item.
6. **The hardness cap and cross-check (H3, C1).** The screen states the criterion moves
   by a factor of three between hardness 120 and 400. The 400 mg/L cap is a sentence,
   and the ±10% reconciliation that gates whether the criterion is trustworthy at all is
   two more.
7. **Statistical method choices (M1–M8).** Six of eight are prose. `#background` says
   outright that a substitution-based trigger "would sit lower and manufacture
   exceedances" — the method preventing that is one sentence with no version and no
   approver.
8. **The three DQA objectives that are not DQO rows (L2, L3, I3).** Bare strings beside
   three sibling dimensions that now read the versioned library, producing verdicts that
   go into report §3.
9. **Receipt acceptance checks (C2).** A failure here removed a result from the round.
10. **Preservation (D6).** Free text per session; it decides whether a PFAS result
    answers the question its sample was taken to ask.
11. **The 30-day, stand-down and escalation windows (N5, N7, N8).** Three deadlines that
    start or end obligations, none of them a record.

## The exemplar — the house pattern already exists

The DQO set (`seed.mjs:1639-1826`) is what everything else gets lifted to, and it is
worth copying whole rather than approximating:

**On the set** — `set`, `basis` (the standing rationale), `raisedAt` (the instant the
round's findings were computed, so *which version was in force* is decidable).

**On each version** — `version`; `effective` as a **closed span and an open span**, not
a single date; `state`; `by` + `approved` with a timestamp; `why`, a one-clause reason
the version exists. It is honest about its own gap: 2025.2 renders a dash for its
approver because it has none.

**On each limit row** — `check` (the closed glossary name, so a finding and a limit are
one string by identity), `matrix`, `limit`, `applies` (the population, kept separate
from the scope), `fallback` (what governs when the population test fails), `source`,
`matrixSays` (why this material, in the source's own terms), `silent` (where a rule
states a limit and **no consequence**, said out loud), `next`, and derived `since` /
`currentSince` / `carried`.

**Five mechanisms worth copying as much as the fields:** `limitFor()` so every quoting
surface reads the row instead of typing the number; `resolve(check, matrix)` which
returns the rule that *did* judge something plus the matrix that rule was written for,
and never invents a number; `wasStated(id)` so seven surfaces print one history;
`matrixNote.notAVersion`, an explicit statement of what is **not** a version change; and
`accounted`, a closure check printed rather than assumed.

Three secondary exemplars: `CONVERSIONS` for its **`exact: true|false`** field and the
note stating what an inexact rule assumes; `TEMPLATE` for the binding rule that makes
versioning load-bearing — an issued report regenerates under the version in its own
snapshot, never against what is current; and `CONFIG_INVENTORY` for its **`refused`
list**, where an artefact declaring no version is refused rather than defaulted. That
refusal is the enforcement mechanism the register needs.

## The awkward cases — standards that resist being configuration

**A method is a published document, not a value.** `USEPA 200.8` has no
operator-settable content, and making it a configuration record invites an operator to
edit USEPA's text. What is configurable is the **binding**: this analyte, on this
matrix, at this laboratory, is run by this method, from this date — with the derived
facts as fields. **That also solves the holding times**: a holding time is not an
independent standard, it is a field on a method-adoption record, and its homelessness
today is exactly why it has no register.

**A standard the format defines is the vendor's, not the operator's.** The ESdat named
qualifier set, ELDF §5's sample-type codes, the −999/−997 sentinels: the operator can
neither version nor approve these. Two records that look like one — the vendor's list,
read-only and sourced to the specification, and **this instance's decision about it**,
which is governed and approvable and which `seed.mjs:3803` already names as not yet
existing.

**A statistical method choice is a judgement, not a limit.** Some parameters are
configuration (3.5, n = 8, the 80th percentile); the choice above them is not.
`#narrative`'s pinned evidence set is the right shape — a recorded, attributed, dated
decision with its reason, and no score attached. Note also that `#statistics` reports
both trend tests deliberately, because "showing only the one with the smaller p-value
would be choosing the answer" — a configuration that let you pick one would break that.

**A standard that must be able to be absent.** `#composite` and `#qc-limits` render
computed zeroes with a searched-registers audit behind them. A configuration model that
requires a value cannot express *we looked, there is none, and here is where we looked*.

**A standard whose own field is deliberately null.** `PFAS_LIMITS.scheme`,
`NOTIFICATION.windowStored`, three null `protects` and two null `locationClass` values —
each a designed absence, each failing a schema that requires a value. "Undecided, and
here is what would settle it" has to be a state.

**A closed vocabulary that is measurably too small.** `QualifierOrigin` is two-valued
and this instance holds ten results neither word fits. Making vocabularies configurable
would let an operator invent the third word — which is precisely what the record filed
as the product owner's decision, not a configuration.

## Instance or project

Roughly **40 of the 112** genuinely need both: an instance default a project overrides —
the dictionary's limits, the criteria library, the DQO set, the consistency and
stabilisation tolerances, holding times through method adoption, the DQA objectives, the
prescribed report structures, and the statistical parameters. Only two override
relations are drawn today (criteria binding, and the non-detect rule bound to a set),
and **neither is drawn as an override with its inherited default shown** — they are
binary bindings. That override shape is the one genuinely missing interface primitive.

The inventory also surfaced a **third scope the catalogue already has and has not
named**: the investigation or plan scope. The soil field-screen threshold belongs to the
sampling and analysis plan, not to the project.

## What would break — twelve places, and they are the design

1. **Every activation becomes a candidate statutory-clock event.** The criteria screen
   already states it: condition 21 obliges notification on becoming aware, and *the
   moment of awareness would be this activation*. Became-aware is immutable at the
   database (G-44). Version the holding times, the LOR defaults, the QC limits and the
   TARP triggers, and **any** of them can raise an exceedance on activation and start an
   unmovable countdown. The catalogue already records the near-miss where one preview
   promised six statutory clocks over five results no laboratory had produced.
2. **The "this is not a version change" argument has to survive.** Adding a `matrix`
   field to a limit re-derived nothing and created no version, because the field was
   always true and had never been written down. A model that treats every field addition
   as a version would have re-evaluated the round. The register needs an explicit
   non-substantive-change class, and that paragraph is its specification.
3. **Numbers currently frozen onto records would move — or need a freeze that does not
   exist.** Exceedance factors, the window condition and the notification event freeze
   their criterion and rule. **Nothing freezes a holding time, an LOR, a QC limit or a
   stabilisation tolerance onto anything.**
4. **A snapshot records the template version and nothing else** — not the dictionary,
   DQO, conversion or criteria versions its numbers were computed under. Version the
   dictionary and the promise that the 2025 report regenerates byte-for-byte in 2029
   stops being true unless the snapshot's manifest widens.
5. **The crosstab's literal criterion values would visibly diverge** from a library that
   has gained dated values — the exact drift class four waves have already removed
   elsewhere.
6. **The 5 × LOR test parses a number out of a string** (`seed.mjs:8864`). Under a dated
   model that parse becomes a lookup with a time argument.
7. **Two of four EDD formats would stop being configuration** — they already declare no
   revision and are already refused by the package inventory.
8. **Deliberate nulls become required fields** (see the awkward cases).
9. **Computed zeroes acquire a date.** "No soil criteria set exists" becomes an *as-at*
   claim, and the six-register search behind it has to be re-runnable per date or its
   verdict goes stale silently.
10. **A withdrawn trigger line needs a state, not a deletion** — an effective period that
    ends, with the withdrawal decision and its evidence attached.
11. **The before/after mechanism multiplies.** Seven surfaces currently print one history
    from one place; extend versioning to 112 standards and that mechanism is needed
    everywhere or the catalogue loses a property it spent five waves acquiring.
12. **The DQA screen's asymmetry becomes a visible defect.** Three of six dimensions read
    the versioned library and three type their own objective. Date the first three and
    the table renders half dated and half not — which is either the fix landing or the
    screen becoming incoherent, depending on whether all six move in one change.
