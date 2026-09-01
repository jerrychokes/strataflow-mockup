# Practitioner review — 1 September 2026

The review the brief gated Wave 6 on, and **the first practitioner evidence in the
project's history**: until this document, every screen, both design oracles and all
five closed waves rested on self-approved judgement, and said so. A senior
hydrogeologist reviewed the four invention-heavy screens and the workflows they
depend on, treating a **hesitation** as "the point where, as the hydrogeologist
accountable for the result, I would stop before entering, accepting, validating or
writing something because I needed another piece of information."

**Overall verdict, verbatim:** "unusually close to how environmental groundwater
work actually needs to be reasoned about" — with **four places to change the design
before implementation**, all P0. External anchors cited: WA EPA sampling-and-analysis
-plan field-record conventions (bore-organised, repeated stabilisation series) and
the NEPM principle that QA/QC must let practitioners evaluate precision and accuracy
rather than stamp datasets pass/fail.

## The four P0 findings

### PR-1 · Field capture is organised on the wrong axis — the review's strongest hesitation

The screen enters a round **column-by-column across bores**; real field work runs
**bore-by-bore**: at MW05 the practitioner stays in MW05's context — SWL → condition
→ pump/inlet depth → purge start → flow → repeated stabilisation measurements →
final parameters → sample time → sample IDs → filtration/preservation → QC sample →
observations → photos → move on. "I don't measure the SWL at seven bores, then
return conceptually to MW05 to enter its pH."

**Redesign around a bore session.** The round grid survives as a *summary*;
selecting a bore opens its session carrying the full sequence above. Also:

- **PR-1a** — "Dry" broadens to explicit disposition states: *Sampled · Dry ·
  Insufficient recharge · Inaccessible · Damaged/obstructed · Not located · Not
  sampled — reason required*. ("Dry is not missing" is exactly right — preserve it.)
- **PR-1b** — a **preflight before "Mark round complete"**: locations dispositioned
  / sampled / dry / duplicates collected / instruments calibrated / unsynced
  mandatory fields / CoC created, all counted.
- **PR-1c** — purge/stabilisation is "important enough that I wouldn't hide it one
  level below the principal field workflow": the series belongs inside the session,
  not behind a link.

### PR-2 · QA/QC decides pass/warn/fail when the question is "what is still mine to decide?"

The analytical logic was called one of the strongest parts of the mockup — but eyes
go from "10 passed · 6 warnings · 3 failed" to "Advance to validated" and stop.
Three concepts are mixed: automatic QC outcome, automatic consequence, and
**professional disposition**. A holding-time failure may quarantine automatically
and LOR>criterion is deterministic, but equipment-blank contamination and a
historical spike need a hydrogeologist.

**Add the decision layer as the primary surface**: *N checks — passed ·
automatically dispositioned · reviewed · NEED DECISION*, with the workflow
**Unresolved → Reviewed → Dispositioned → Ready for validation**.

- **PR-2a** — the counts above are the screen's headline, not the pass/warn/fail triad.
- **PR-2b** — **qualifier propagation must answer "why did this reach these
  results?"** The drawn matrix-spike rule (62% zinc recovery qualifies all nine
  batch results) must not be inferred automatically: the propagation basis is one of
  — laboratory qualifier applies batch-wide · project DQO rule X applies · a
  hydrogeologist's disposition · sample-specific only — stated on every propagated
  qualifier. "That is exactly the type of thing an auditor may ask five years later."
- **PR-2c** — **"Re-run checks" must say against what**: "Re-run using DQO 2025.2",
  and when a newer ruleset exists, "2025.2 used for this round · 2026.1 is current".

### PR-3 · Lineage starts too late — provenance begins at the bore, not the laboratory

"One result, and everything that produced it" opens on the laboratory CSV. For a
groundwater result the chain runs: location/version → bore/screen construction →
programme → field event → field measurements/stabilisation → sample ID →
filtration/preservation → custody transfer → laboratory receipt → analytical
batch/method/QC → laboratory result → import → transformation/derivation →
evaluation → downstream use. The other screens already hold most of this — **the
lineage should stitch it together**.

- **PR-3a** — extend the chain backwards through field and custody.
- **PR-3b** — **an analytical qualifier ambiguity, live today**: PFHxS is shown as
  *1.7 ng/L · detected · LOR 2.0 ng/L* — an unqualified detect below the LOR. Either
  the LOD is shown and the value is marked estimated (*LOD x · LOR 2.0 · 1.7
  J/estimated*) or the representation is wrong — and it feeds a sum-of-components
  with an explicit non-detect rule, where detect vs estimated vs <2 materially
  changes the reading. "That is precisely where lineage earns its keep."
- **PR-3c** — provenance is a small graph, not a line: keep the narrative
  (**Explain it**) and add a compact upstream/downstream view (**Trace it**). "Don't
  replace the narrative with a giant technical DAG."

### PR-4 · The interpretation panel proves the numbers, not the inference

The evidence panel answers "are my citations numerically correct?" — the harder
question is "does the evidence support what I'm claiming?" The TSF-seepage sentence
is a **hydrogeological inference**, and before signing it a practitioner wants
elevations and flow direction, spatial position, screened intervals, source and
background chemistry, temporal behaviour, major-ion plots, neighbouring bores,
rainfall/operational history, QA/QC status, and the competing explanations.

- **PR-4a** — an **evidence set** pinnable to a passage: hydrograph · head
  contours · Piper/Stiff · source chemistry · background comparison · trend ·
  QA/QC status · bore construction — "so the reviewer can see exactly what I saw
  when I made the interpretation." Not so the software judges the inference.
- **PR-4b** — distinguish **reference-number changes from content changes**: a
  structured token (*[Piper diagram]*) renders its current figure number without
  flagging the sentence; the *diagram itself* changing is what flags it.
- **PR-4c** — an explicit **numeric rendering rule** (e.g. two significant
  figures) so 1.7 vs 1.72 is formatting, not staleness noise.

## The keep-list — survives implementation intact, verbatim

Indeterminate as a first-class state · a QC failure says what it did to the data ·
historical anomaly ≠ regulatory exceedance · dry bore ≠ missing data · capture
timestamp ≠ sync timestamp · derived results retain components and rule · authored
interpretation never silently rewritten · "what was reported then" vs "what the
record says now".

## Disposition (orchestrator)

| Finding | Where it lands |
|---|---|
| PR-1 (a–c), PR-2 (a–c) | **Wave 6, rescoped** — the field/QA workflow half; PR-1 is a *replace*, not a deepen: the drawn entry model was judged wrong in axis |
| PR-3a, PR-3c, PR-4 (a–c) | **Wave 7, new** — the provenance/interpretation half |
| PR-3b (the PFHxS qualifier) | **Wave 6 rider** — wrong analytical representation visible today; fixed ahead of the full lineage work |
| Keep-list | Binding constraints in every future wave spec |

The closing judgement, recorded because it is the destination restated: with these
four changes "the product stops looking like an exceptionally thoughtful
environmental database and starts looking like something a senior hydrogeologist
could plausibly use as their primary technical workspace."
