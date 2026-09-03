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

An inventory is running over every standard in the catalogue: what it is, where
it lives, whether it is configuration, a literal or prose, and whether it carries
a version, an effective period, a scope, an approver and a source citation — plus
the ranking that matters, *decides the most while governed the least*.

Designing the register before knowing what has to fit on it would be the mistake
this pipeline exists to avoid. **The inventory lands in this file.**

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
