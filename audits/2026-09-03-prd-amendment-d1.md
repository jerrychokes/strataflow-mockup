# The PRD amendment D1 accepted — drafted for pasting

**Yours to apply.** D1's verdict was *"accept the query capability, **and amend
the PRD**"*, and this repository is read-only against the app repo, so the
amendment cannot be made here. Waves 19 and 20 draw the capability with the
amendment recorded as pending, on `#saved-views` and `#explorer`; both screens
stay proposals until it lands.

Drafted 3 September 2026 in the PRD's own voice and numbering, so it is a paste
rather than a writing job. Three measured gaps, three parts.

## What is actually missing, measured

1. **No functional requirement covers it.** FR-6.3 renders a crosstab; FR-6.6
   persists a **chart configuration**. NFR-1 mentions "standard crosstab and
   trend queries" as a performance target. Nothing describes constructing a
   query, naming what it selected, or citing it later. The catalogue found this
   before the brief did — `#saved-views` has said so since it was drawn:
   *"Nothing persists the question that selected the data."*
2. **The glossary carries neither term.** No `dataset`, no `saved query`, no
   `population`. `docs/PRD.md` uses *dataset* in prose and the vendor brief heads
   §4.5 with it, so wave 19 used the requirement's own word and said on the
   screen that the glossary entry is part of this amendment. Under the repo's own
   rule every term maps to an exported symbol in `packages/db/src/types.ts` and
   back, and `scripts/check-glossary.mjs` fails on drift in either direction — so
   the glossary half of this is not optional if the code half lands.
3. **FR-6.6 should not be widened to cover it.** A chart configuration and the
   question that selected the data are two objects with two lifetimes; wave 19
   drew the seam between a live definition and a frozen citation precisely
   because they diverge. Leave FR-6.6 alone.

## Part one — a new §7.9, appended rather than inserted

**Append, do not insert.** A query sits between validation and evaluation in
pipeline order, but inserting a subsection there renumbers FR-6.x and FR-7.x, and
`docs/GOALS.md` and the ADRs cite those numbers throughout. An out-of-order
subsection is cheaper than a broken citation graph; a sentence in the heading can
say so.

```markdown
### 7.9 Interrogation and governed datasets

Appended after §7.8 rather than inserted in pipeline order, because renumbering
§7.6 and §7.7 would break requirement citations in GOALS and the ADR register.

- **FR-9.1** Construct a dataset by composing filters across project, location,
  sample, analytical, data-quality, criteria and time dimensions, without those
  combinations having been anticipated when the project was configured.
- **FR-9.2** Report the resulting population, and report what each filter
  excluded **by kind** — a sample not collected, an analysis not run, an
  increment composited and a result not evaluated are four different absences
  and none of them is a pass. An exclusion is never silent (PP4).
- **FR-9.3** Treat a dataset as a governed object with a name, a stated purpose,
  an inspectable definition, an owner, a version, a lifecycle, and a variant
  relationship such that saving a variant never overwrites its parent.
- **FR-9.4** Bind a citation to the version of the definition it named, and
  freeze that version's dimensions as they resolved rather than as references
  that continue to move. An analysis, figure, interpretation or report citing a
  dataset retains lineage to the exact definition and version used.
- **FR-9.5** Move between tabular, crosstab, time-series, summary-statistic, map
  and exceedance representations of one population without rebuilding it, each
  representation naming the population and version it read.
- **FR-9.6** Record, with an analysis, the population as at the moment of
  computation, including each member's validation state and any qualifier —
  applied or proposed — so that a later supersession does not silently change
  what an issued output was computed from.
```

**FR-9.2 is the one to keep if the section is cut down.** It is the requirement
the mockup's whole grammar rests on, and the one an explorer is most likely to
violate by accident: a query narrowing to "validated results only" that quietly
drops the dry cells destroys the distinction between *no result* and *a result
that passed*.

## Part two — two glossary entries

```markdown
### Dataset

A named, versioned definition of the data a question selects — which locations,
which analytes, which period, which criteria sets, and which data-quality states.
It is the question, not the answer: the rows it resolves to change as the record
changes, and a citation is bound to the version of the definition rather than to
the rows.

Distinct from a [[snapshot]], which fixes the values an issued report stands on,
and from a persisted chart configuration (FR-6.6), which fixes how an output is
drawn rather than what it was drawn over.

**Code identifier:** `DatasetId`

### Population

The set of observations a dataset resolves to at a point in time, together with
what was excluded from it and why, counted by kind. A population is not a row
set: an absence carries which kind of absence it is.

**Code identifier:** `Population`
```

Both need their exported symbols in `packages/db/src/types.ts` in the same change,
or `scripts/check-glossary.mjs` fails the build in the other direction.

## Part three — what else moves, and what does not

- **§14, the decision register.** D1 is a scope decision taken outside the
  register's eight, and it reverses nothing there. Worth a row so the acceptance
  is findable next to the others.
- **NG4.** Unrelated to this amendment but decided in the same sitting: D4
  restated it as *"no GIS authoring"*. Its current wording — *"Full GIS. Map
  display and spatial export only"* — will otherwise keep reading as a refusal of
  work you have approved.
- **`docs/GOALS.md`.** These requirements have no goals. Whether they get any is
  a delivery-plan decision rather than a requirements one, and it is not part of
  the amendment.
- **NFR-1.** Its "standard crosstab and trend queries" phrasing predates any
  notion of an arbitrary one. Widening it is a real performance commitment
  against a real dataset, not a wording change, so it is left alone here.

## When it lands

Two mockup screens carry *"the amendment has not landed"* as a live statement and
both stay proposals until it does. Tell me when it is in and I will move them in
the wave that next touches either — the sentence is derived from the record, not
typed, so it moves in one place.
