# Figure-family grammar proposals — 2 September 2026

The gated lane, opened on Jerry's instruction. The wave plan has said from the
start that a new figure family "needs a grammar proposal put to Jerry first",
and three candidates have accumulated in the record. This document is that
proposal set: each names the question it answers, the recorded need behind it,
why the twelve approved plates do not cover it, and the grammar it would add —
stated in the frozen grammar's own terms (`docs/design/figure-grammar.md`), so
that approving one is approving a specific set of drawing rules rather than a
mood.

**What approval is, and is not.** Approving a proposal here is a design
decision that lets a wave draw the family in the mockup; it is not the app
repo's grammar revised (that is §7 of the grammar document, Jerry's own
change, made when the family graduates), and it is not a printed validation —
**every family below inherits G-76b's caveat in full**: the grammar these
would extend has itself never been on paper, and drawing more of it does not
close that gap. The oracle discipline also binds: an approved family's
reference rendering is authored as its own step, fixed *before* any screen or
test asserts against it — the fixture and the assertion never land together
(GOALS §5, the fixture-guard rule).

The twelve approved plates, for reference: bore log · box plot · censored
series · crosstab · hydrograph · hydrograph comparison · hydrograph overlays ·
Piper · probability plot · Schoeller · Stiff · trend plot.

---

## FP-1 — The depth profile

**The question:** what does the ground hold, and at what depth — an analyte
against depth, one panel per pit, with the logged horizons visible and the
composite's coverage drawn where it sits.

**The recorded need:** wave 9's investigation seeded 5 test pits, 18 depth
intervals and 45 results, and recorded on `#composite` and beside
`figureProposal` in the seed that "a table of intervals is the least legible
way to show that the signal sits in the second and third horizons rather than
at the surface." The screens that would use it exist and are waiting; the
deferral notice on `#composite` is this proposal's standing citation.

**Why the twelve don't cover it:** two moves no plate makes. A **depth-down
quantitative pairing** — the bore log draws depth downward but carries no
value axis; the censored series carries values but runs on time — and the
**banded interval**: a soil result belongs to a depth *interval*, not a point,
and plotting it at the interval's midpoint would be a number nobody measured,
which is the same sin the censoring rules exist to refuse.

**The grammar, stated:**

- *Frame, ticks, gridlines, provenance, accessibility* — inherited unchanged.
  Depth on the vertical axis, increasing downward (the bore log's own
  convention), metres below ground on the 1-2-5 sequence; concentration on
  the horizontal, log where the data argues for it, decades-only gridlines
  as the grammar already rules.
- *The banded interval, the family's one new mark:* a result is drawn as a
  band spanning exactly its logged interval on the depth axis, positioned at
  its value — an open rectangle at series weight, never a point, never a
  midpoint. A band's vertical extent is data (the interval), not styling.
- *Horizon boundaries* as full-width dotted rules at gridline weight with the
  horizon named in the margin — a reading aid in the gridline's own register,
  because the horizons are why the profile is worth drawing.
- *The composite's coverage* as a bracketed span in the margin, the bore
  log's screen-interval convention reused — never as a hatched region inside
  the plot, because 45° hatch is the indeterminate state mark and a composite
  is not an outcome.
- *The field-screen threshold* (the plan's submit-above line) as its own
  labelled vertical rule, the LOR stepped-line convention turned through 90°.
- *Censoring rules 1–3* apply with interval semantics: a censored interval
  bands at its limit of reporting with the open downward triangle at the
  band's value edge; the LOR line steps by depth where method changed; detect
  and non-detect bands never join (bands do not join at all, which is the
  point).
- *Series identity:* the grammar holds four shapes, and the investigation has
  five pits — so the family is drawn as **small multiples on a shared depth
  axis, one panel per pit** (the hydrograph comparison's own layout), one
  analyte per plate, and the four-shape limit never bites because a panel
  holds one series. A plate that wanted five traces in one panel would be
  refused by the grammar rather than accommodated.
- *The `<desc>` is the finding:* "sulfate concentrates in the second and
  third horizons; the surface interval is at background."

**What it deliberately does not do:** interpolate between intervals (nothing
was measured between them), draw a continuous trace (same reason), or carry
state marks (soil results in this seed are `not_evaluated` and the plate says
so in provenance rather than stamping every band with the lightest mark).

**Data that backs it today:** `SOIL` — 18 abutting intervals across 5 pits,
sulfate/arsenic/zinc by interval, two composites with envelopes, the 500
screen threshold. Everything the plate needs, already deterministic.

**Recommendation: approve.** The need is recorded, the data exists, the
grammar extension is two disciplined moves, and two screens are waiting.

---

## FP-2 — The head-contour map

**The question:** where does the water sit and which way does it move, drawn
as a surface rather than a fitted plane.

**The recorded need:** wave 7's evidence workspace names *head contours* in
the practitioner's own evidence list (PR-4a) and draws the tile as an honest
gap — "no drawn family; the tile links the record that holds the underlying
data."

**Why the twelve don't cover it:** the potentiometric plate draws a plane fit
— bearing, gradient, residuals — not a surface; no plate draws labelled
isolines over a spatial frame.

**The grammar, stated (so a later approval is cheap):** contours as thin
solid rules labelled on the line at decade-friendly intervals; control bores
as the four series shapes with their residuals printed (the potentiometric
plate's own honesty); the region beyond the control-point hull dashed or
faded, because a contour outside the hull is an extrapolation; and the
interpolation rule named in the provenance line — PP3 applies to a picture,
and a contour map that cannot say *linear on the plane fit* or *natural
neighbour on seven points* is a drawing nobody can defend.

**The problem, stated honestly:** this seed holds **seven control points**
(one dry). Contours over seven points imply knowledge between bores that a
plane states more honestly — the existing plate's residual-printing *is* the
right instrument at this network density, and wave 8's logger work already
recorded how carefully this catalogue treats the difference between what was
measured and what is drawn. A contour family earns its place when a seed
carries a network dense enough that a surface says something a plane cannot.

**Recommendation: defer, with the grammar above banked.** Approve it in
principle if you wish, but the drawing wave should wait for a seed with a
denser network (a dozen or more control points), or it will produce a
handsome plate whose honest `<desc>` is "a plane, drawn expensively."

---

## FP-3 — The Durov diagram

**The question:** does the water type's shift track pH and salinity — the
Piper projection extended with pH and TDS panels.

**The recorded need:** the thinnest of the three. Durov has been named in the
deferred list since the original wave plan, and wave 9's seed comment refers
to "the Piper/Stiff/Durov proposals the catalogue already defers" — but no
practitioner hesitation, no screen and no coverage row demands it. The
hydrogeochemistry story already holds three families (Piper, Stiff,
Schoeller), and MW05's ionic evolution is currently told adequately across
them.

**Why the twelve don't cover it:** a Durov's central square and its two
appended axes are genuinely a new construction — none of the three existing
hydrochemical plates carries a value axis for pH or TDS.

**Recommendation: defer until a practitioner asks.** The September review
praised the analytical logic and asked for nothing here; the second
practitioner walk (yours to arrange, when you choose) is the natural forcing
function. A fourth hydrochemistry family without a practitioner question
behind it would be the catalogue drawing for its own pleasure — the
analysis-paralysis failure the brief was rewritten to avoid.

---

## The decision, in one table

| Proposal | Recommendation | If approved, the drawing wave needs |
|---|---|---|
| FP-1 depth profile | **Approve** | Reference rendering authored first (oracle rule), then `#composite` and the soil event assert against it; G-76b inherited |
| FP-2 head contours | **Defer, grammar banked** | A denser seeded network before drawing; same oracle rule when it comes |
| FP-3 Durov | **Defer until asked** | A practitioner question; nothing else changes |

Reply with any subset ("approve FP-1", "approve all", "reject FP-3 outright")
— an approved family becomes a planned wave under the standing pipeline rule;
a deferred one keeps its record here and on the screens that cite it; nothing
is drawn without the word.
