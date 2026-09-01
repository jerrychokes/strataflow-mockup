# `design/mockup/` — the complete UI, drawn

A clickable high-fidelity mockup of the whole Strataflow surface: **66 screens across
eleven jobs**, populated with one coherent fictional dataset, built on the approved
Instrument direction and the product's own stylesheet.

**Rendered 23 August 2026. This is not an oracle.** It sits outside `ORACLE_ROOTS`
(`fixtures/`, `docs/reference/`, `design/reference/`), so `scripts/check-fixture-guard.mjs`
does not hold it, nothing asserts against it, and no test will fail if it goes stale — which
it will. It documents a proposal on one day. If the product needs mocking again, rebuild it
and date the rebuild.

```sh
node build.mjs      # writes index.html; checks the link graph, the section partition,
                    # dead hrefs and the route-line contract — and fails, not warns
node verify.mjs     # the driven-browser sweep: overflow at 375/1000/1280, ids,
                    # accessible names, heading order, matrix panning (npm install first)
```

## The fourth pass — 1 September 2026

This repository became the working copy (`EXPANSION_BRIEF.md` governs it; the app
repo's `design/mockup/` is the dated snapshot it was cut from), and the fourth pass
ran under that brief. What it changed, in the order it found things:

**The repo could not build itself.** The export severed the one cross-repo
dependency — the product stylesheet. It is now vendored byte-identical (`app.css`),
`build.mjs` prefers the live product path and falls back to it, and the rebuild
showed the README's own claim working: the product stylesheet had gained classes
since 23 August and the mockup restyled itself on the next build.

**The states were re-derived, beside the record they replace.** Every screen now
carries `now:` (1 Sep) beside `state:` (23 Aug, untouched); the rail dot renders
today and hovers the history. The delta is the finding: **8 shipped / 35
engine-only / 15 not built became 58 shipped / 1 not built in nine days.** The
product built the catalogue out from under this mockup — almost everything the
third pass found "nothing under it" now has schema, rules and a route.

**The coverage matrix gained its three missing enumerations**: all 80 PRD rows,
all 24 incumbent-baseline rows with their evidence tiers, and the nine journeys
walked step by step — every step a link or a named hole (eCOC has no owner;
`/water` is a product route this catalogue never drew; the portfolio journey is
blocked on a one-site seed).

**The by-section view stopped describing a resolved finding.** "No section owns
these" was true on 23 August; the product has since landed `/config`, `/instance`
and `/help`, and `ia.ts` parents every workspace. The view now mirrors that
architecture — ten groups exactly partitioning the 66 screens — and the build
fails if the partition ever breaks.

**Fourteen screens measurably overflowed the document, in seventeen screen-width
instances** (eleven at 375 px, four at 1000, two at 1280 — the 1000 px cases found
only when `verify.mjs` made three widths permanent). "Sixteen" was a count of
instances that had missed `crosstab`'s 1000 px one; the numbers here are the
wave-1 audit's re-measurement of the pre-wave build, distinct screens and
instances stated separately because they are different numbers. Four distinct
mechanisms, none findable by reading: a containing-block escape inside the
product's own scroll regions (fixed with `contain: layout`, which a labelled
scroll region should declare anyway), grid tracks sized by nowrap sentences
(`min-width: 0`, and sentences now wrap), eight record lists wider than their
column (they pan now, in the same focusable region a matrix gets), and a
stacked cell's `::before` label that refused to shrink —
invisible to every element query, found through `td.scrollWidth`.

**The route lines stopped asserting states.** Thirty-five of them still said
"engine-only" or "not built" three routes and one product rebuild later. A route
line is now a path (or an honest "a proposal"), the state lives in the register
alone, and the build fails on a route line that carries a state claim.

**Two decisions were taken at the stop gate** (Jerry, 1 Sep): Wave 1 approved, and
the work queue stands as a deliberate proposal against `ia-rationale`'s
project-list home — drawn, argued, not silently built.

What pass 4 does **not** claim is unchanged from pass 3: `shipped` means the route
exists, loads, is scoped and renders — not that the product screen matches this
drawing; no practitioner has looked at any of it; and G-76b's print test is still
outstanding, so every figure here is drawn to a grammar that has never been on
paper. The audit trail for all of the above is in `audits/`.


## The second pass, and what drove it

The first build was 37 screens. That pass took it to 57, and the twenty that arrived were not
chosen — they are what fell out of running three closed enumerations against the first
build and writing down every row that had no owner:

| Enumeration | Where it lives | What it found missing |
|---|---|---|
| The fourteen global expectations | `UI_EXPECTATIONS.md` §0 | Nothing structural, but several were asserted rather than drawn |
| The surface register | `UI_EXPECTATIONS.md` §15 | **Fourteen surfaces with no owner**, the project itself among them |
| The 22–23 August UI/UX audit | `docs/audits/2026-08-23-uiux/` | Twenty-three of twenty-seven findings had no designed answer |

`#coverage` in the mockup is that reconciliation, as a screen. It is the only honest form
the claim "every gap is covered" can take: three closed lists, one row each, each row
naming the screen that answers it and four rows marked `n/a` with a reason rather than
quietly counted as covered.

**The register's own maintenance rule applies here too.** Exhaustive *relative to three
fixed enumerations* is the only kind of exhaustive available; the moment the glossary, the
schema or the register grows, the matrix has a hole. Re-run it, do not read it.

### What was missing, and why it mattered

**The project had no face** (§2). It is the authorisation scope and the primary URL space,
and there was no list, no switcher, no home, no settings and no membership screen. A user
cannot inhabit a scope they cannot see. Neither could they *arrive*: the catalogue opened
on a bore's detail page, which assumes somebody who already knows which project they are in
and what needs them.

**Nine more surfaces had no owner** — facility and area management, the location register
as distinct from the location, sampling events, result detail and annotation, mapping
profiles, held rows, the licence as an entity, units and conversions, and documents.

**The operating model had no persona and therefore no screens** (§13.3). Version and
entitlement, upgrade state and rollback, and the diagnostic bundle. The bundle's
*preview-before-export* is itself the trust feature: a support bundle a customer cannot
read before sending is a request to take the vendor's word for what is in it.

## The third pass — read as a practitioner, not as an author

The first two passes ran documents against the screens: the surface register, the audit,
the global expectations. This one had no document behind it. The screens were read the way
a hydrogeologist and a laboratory data manager would read them — *what would I look for
here, and is it there* — and nineteen things were not.

**That makes this the least defensible list in the file and the most valuable one.** Nothing
generated it and nothing guards it; re-running it means finding somebody who does the work
and watching them look.

| Area | What was missing |
|---|---|
| **Defensibility** | Purge and stabilisation records; sample receipt condition; custody as a chain rather than a scanned form |
| **QA/QC** | Laboratory duplicate, method blank, LCS, matrix spike, rinsate blank; the laboratory *batch* a QC result covers; acceptance limits as versioned configuration; a data quality assessment against objectives |
| **Evaluation** | How a hardness-dependent criterion was calculated; a register of what could not be assessed; background comparison and site-specific trigger derivation; seasonal Mann–Kendall and how censored values enter a rank test |
| **Hydrogeology** | Potentiometric surface and flow direction; the bore nest read vertically |
| **Statutory (WA)** | The Contaminated Sites Act duty; the Annual Audit Compliance Report; subterranean fauna monitoring |
| **Content** | PFAS assessed against the operative framework rather than ANZG alone |
| **Workflow** | A round on two programmes at once; assignment and hand-over |
| **Layout** | The results grid across rounds, not just across locations |

Three of those are worth calling out because they are where the product's own claims were
under-delivered rather than merely incomplete.

**The hardness derivation** decides three of the five metal exceedances at MW05, and no
screen showed the working. The criterion is a function of another result; if that result is
wrong, or measured on a different sample, or above the range the relationship is defined
over, three exceedances are wrong with it. Neither incumbent shows this — one applies
conditional action levels, the other emits an action-level code, and both hand over the
answer without the arithmetic. It is not a new claim; it is the lineage claim applied to the
one derivation that decides whether an exceedance survives review.

**"Could not be assessed" was a footnote.** The exceedance register correctly excludes those
results and left them nowhere. It is now a register with a cost to close attached, because
the state is a *finding* rather than an absence — and a documented incumbent failure is
exactly this state rendered as a pass.

**The RPD rule was stated against the wrong bound.** A duplicate pair was judged against a
30% limit whenever both results cleared the reporting limit. RPD is meaningless that close
to the limit: `1.2` and `1.8` µg/L against a 1.0 limit gives 40% and means nothing. Above
5 × LOR the percentage applies; below it an absolute difference does. As written it would
have raised a failure on almost every near-limit duplicate, and a QC flag that is usually
noise is a QC flag people stop reading.

### The defects this pass found in the pass before it

Five, all in the interaction layer added in pass two, and all found by measurement rather
than by looking:

- **Duplicate DOM ids.** `field()` derived its id from the label, and two registers both had
  a "Find" field — so the second `<label for>` focused the first screen's control.
- **Two checkboxes with no accessible name.** `checkbox()` now throws rather than emitting
  one, which is why the next build failed loudly instead of shipping.
- **Heading order skipped h1 → h3** on eight screens. `panel()` emits `h2`.
- **Touch targets reintroduced the audit's F-23.** `sf-button` complied; breadcrumbs, "From
  here" links, lineage buttons and chip removes did not. The inline-link exception is now
  stated where it applies rather than assumed.
- **The field grid panned on a phone.** Everywhere else a dense table pans with its
  identifying column frozen, which is right for a table you *read*. That one is typed into,
  standing at a bore, one-handed — it stacks now.

And two in the figure added in this pass, both caught by the plate's own honesty check:
the potentiometric surface first returned **a flow direction of due south** on a site whose
every other screen says south-east, with a **largest residual of 1.46 m** against its own
stated limit of about a metre. Two faults. The heads had been invented rather than reduced
from the top-of-casing elevations and standing levels already in the seed; and six of the
bores sit almost on one line, where a planar fit is barely constrained across that line.
Adding points that were *also* on the line did not help. Two bores genuinely off the
transect did: bearing 120°, gradient 1.9 m/km, largest residual 0.04 m. **The residual is
printed on the plate for exactly this reason — it is the figure telling you whether to
believe it.**

## What it is drawn from

| Source | What it contributes |
|---|---|
| `apps/web/app/styles/app.css` | **Inlined verbatim at build time.** The mockup is styled by the thing that styles the product, so a token changed there changes this on the next build |
| `design/reference/tokens/tokens.json` | Direction **B — Instrument**, via that stylesheet |
| `design/reference/screens/results-crosstab.html` | The mark geometry, the result encoding, and the cast — MW01A/MW03B/MW05/MW07/MW09, `2026-Q2-GW`, `PAS2026-04417`, `L8842/2019/1` |
| `docs/design/figure-grammar.md` §3 | Grammar **A — Regulator**, executed by `figures.mjs` |
| `fixtures/partner/` | The `MOCK-` naming convention. The operator is fictional and unmistakably so |

One deliberate divergence from the oracle's markup: the indeterminate hatch pattern is
declared **once** in a document-level sprite rather than re-declared inside every mark. The
reference repeats the `<defs>` per mark, which is correct in isolation and would mean about
two hundred duplicate element ids in a document holding every screen at once. Same
rendering, valid document.

## Two navigations, and they are both real

The **rail** is the catalogue — eleven jobs grouped by the question a practitioner arrived
with, so the whole surface can be seen at once. The **top bar and section strip** are the
product's own architecture: the six sections of `app/navigation/ia.ts`, in the order the
work happens.

The first build had only the rail, and that turned out to be hiding something. A catalogue
reads as an information architecture if you do not look closely, and the two are different
claims — *here is everything* against *this is the order of the work*. The rail now switches
between them, and the switch makes the gap visible: under **By section**, eighteen screens
land in a group called *"No section owns these"*. Configuration, provenance and instance
administration have nowhere to live in an architecture built around the sequence of
fieldwork. Filing them under `Reports` to make the view tidy would have hidden exactly the
finding the view exists to produce.

## The nine — now eleven — jobs

| Job | Screens | Who |
|---|---|---|
| **J0** Arrive, and find out what needs you | 4 | U1 · U2 · U4 · U5 |
| **J1** Get the data in, and know it landed | 11 | U1 · U5 |
| **J2** Know the data is right | 4 | U1 · U2 |
| **J3** Know what is wrong | 5 | U2 · U3 · U4 |
| **J4** Understand it and explain it | 5 | U2 |
| **J5** Produce the submission | 5 | U2 · U4 |
| **J6** Keep the obligations met | 5 | U4 · U1 |
| **J7** Prove what was known, and when | 4 | U2 · U4 |
| **J8** Configure the instance | 7 | U5 |
| **J9** Keep the instance alive | 4 | U6 |
| **J10** The conventions the whole product keeps | 3 | Every user |

**J10 is not a job**, and it is labelled so. It holds the three cross-cutting claims — the
four data states, the keyboard contract, and the coverage matrix — drawn once each. Every
one of them is a promise made on thirty-odd other screens, and a promise repeated thirty
times is a promise nobody audits.

**U5 and U6 are not in the PRD.** §4.1 names four users. G8 promises the product is
*"configurable by the customer's own team without a specialist implementation consultant"* —
that is a **site administrator** (U5) nobody named. §12's operating model (OM-1…OM-5) has no
persona at all; that is the **instance operator** (U6). Both gaps are real and both are
tagged here so the promises become auditable screen by screen.

## State, and how to re-derive it

Each screen carries one of four values, shown as a dot in the rail:

| State | Meaning | Count |
|---|---|---|
| **shipped** | A signed-in practitioner can do this through a browser today | 8 |
| **shipped (CLI)** | Reachable, but only from a terminal | 3 |
| **engine-only** | Tested library code exists and no route renders it | 35 |
| **not built** | No implementation at all — not the data, not the rules, not the screen | 15 |
| **proposed** | Not in the PRD at all | 5 |

The `not built` count went from 6 to 15 in the third pass, and that is the finding rather
than a regression: almost everything the domain review turned up has no engine behind it
either. Purge records, custody, the laboratory batch, the hardness derivation and the
Contaminated Sites Act duty are not screens waiting on a route — there is nothing under
them.

**Do not trust that table — re-derive it.** It was true on 23 August 2026 and the method is
one line:

```sh
grep -rl "from '\.\./<module>/" apps/web/app/routes | wc -l
```

Run it per module against `app/figures`, `app/report`, `app/validation`, `app/evaluation`,
`app/derivation`, `app/calc`, `app/stats`, `app/config`. On the day this was written, every
one of those returned **0**. That single fact is what the mockup exists to make visible: the
engine is nearly complete and the application is a thin shell over it.

### Re-derived on 25 August 2026, and the answer has changed

The instruction above is to re-derive rather than trust, so here is the derivation. The same
one line, per module, against the same directories:

| Module | Routes reaching it, 23 Aug | 25 Aug |
|---|---|---|
| `app/figures` | 0 | 7 |
| `app/report` | 0 | 3 |
| `app/validation` | 0 | 8 |
| `app/evaluation` | 0 | 3 |
| `app/derivation` | 0 | 1 |
| `app/calc` | 0 | 1 |
| `app/stats` | 0 | 2 |
| `app/config` | 0 | 5 |

The route table went from 13 to 60. Every screen in the catalogue that had an engine now has
a route, and the ones that had none — purge and stabilisation, receipt and custody,
laboratory batches, data quality objectives, the submission archive, background comparison,
subterranean fauna — have schema, rules and a screen.

**The state labels in `screens.mjs` are not updated, deliberately.** They record what was
true on 23 August, which is what the third pass found and why it was worth doing. Rewriting
them would erase the finding and leave a document that had always been right — which is the
failure the section below is about. Re-derive; do not read.

What that does *not* say, and is worth being equally plain about: the screens exist and are
walked by `test/e2e/every-screen.spec.ts` on a project with no results. That proves each one
loads, is scoped, resolves its bundle and renders. It does not prove any of them is *right*,
and it says nothing about G-76b — an incumbent figure has still never been placed in a Word
template and printed.

### The state column was wrong on its first build, and that is worth keeping written down

The first render marked **five** screens `not built`. Four of them had implementations —
`Legacy reconciliation`, `Criteria library`, `EDD formats` and `Analyte dictionary`. They
were labelled from the screen inventory rather than from the code, which is precisely the
failure this paragraph warns about, committed by the person who wrote it.

**The lesson is the one already in `CLAUDE.md`: a hand-maintained summary rots, and it rots
fastest in the direction that flatters whoever is writing it.** "Not built" is a more
interesting claim than "built but unreachable", and it was the wrong one four times out of
five.

## The interaction layer is a proposal, and it is namespaced so you can tell

`ui.mjs` holds the product's own `sf-` primitives, which exist because `app/styles/app.css`
implements them. `controls.mjs` holds everything above that — navigation chrome, form
controls, feedback surfaces, assistance — and all of it is `mk-`. **Nothing in that file is
an approved primitive.** A `C.` prefix on a call site is the reminder.

Two rules bind every control in it. **Colour is never the carrying channel**: every state
encoding also carries a glyph, a shape, a border weight or a word, and the test is a
photocopier rather than a preference. And **a control states its consequence before it is
used**: reversibility is written on or beside the thing you press, or — where an action
genuinely cannot be undone — the control says that instead, which is the only honest
alternative.

## The figures, and one finding against the approved grammar

The ten generators execute grammar A. The grammar already satisfies almost everything a
general charting discipline would ask for, and in two places it is ahead: **rainfall is a
separate panel rather than a second y-axis** (a dual-axis chart being the single commonest
charting error), and **series identity is shape plus dash rather than hue**, so the plates
survive greyscale by construction rather than by luck.

Two things were added, both screen-only, because the approved grammar is a *print* grammar
and paper does not hover:

- **A hover layer.** Every data mark carries a `<title>` and a transparent hit target. It
  renders nothing, so the plate is unchanged pixel for pixel and the print artifact is
  untouched — and a reader who can see a point can now read its value without going to find
  the crosstab. 84 of them.
- **A table view** beside the plate, carrying the same censoring notation. A figure a reader
  has to trust is a figure they will re-derive in Excel.

**Three label collisions were found by rendering the plates and measuring them**, not by
reading the geometry: the hydrograph legend sat on the rainfall panel's label, the bore log
title sat on its depth-axis label and its screen annotation sat on the lithology it passes
through, and the box plot's sample counts sat on the bore codes' descenders. Moving the
hydrograph legend up to clear the rainfall label put it into the x-axis labels instead,
which is why the depths under that plot are now measured against the 10 px type rather than
chosen. The check is worth keeping: parse `index.html`, lay out every `svg.mk-fig`, and
compare the bounding box of every `<text>` against every other.

**And one finding is recorded rather than fixed.** The rainfall bars are drawn in the
rule-strong grey, which measures **2.41:1** against the plate ground — below the 3:1 floor
for a mark that carries data. The nearest passing value is the not-evaluated mark grey at
**3.02:1**, already a token in this product rather than a new colour. It has not been
changed: the grammar was approved on 20 August, the reference plates are an oracle, and a
rendering that quietly improves on the thing it is measured against is indistinguishable
from one that drifted from it. The relief that a contrast finding actually obliges — a
labelled axis and a table view — is in place. The revision is Jerry's to accept or refuse,
and it is written on the hydrograph screen so it is not lost in this file.

## How the screens link up

The rail is a table of contents. The **link graph** is the information architecture, and it
is declared once as `RELATED` in `screens.mjs`, for the same reason `app/navigation/ia.ts`
holds the section order as data: an ordering is a claim about the work, and a claim belongs
somewhere a person can read it and disagree with it.

Three rules produce it, and the third is new.

**A bore code is a link where it identifies the row's subject, not wherever it is
mentioned.** MW05 is named on most of these screens; linking every occurrence makes a page
of blue noise and teaches a reader to stop seeing links.

**The sequence runs one way** — imports → review → commit → crosstab → exceedances → report
— because that is the order the work happens in. A link backwards is a deliberate exception.

**Every screen reaches an orientation surface.** The first build did not: thirty-seven
screens pointed at each other in a closed loop with no exit to the place a session starts.

`build.mjs` checks all three properties it can check — no dangling target, no screen without
an exit, no screen nothing points at — and prints the result on every run, including green
ones. The first build's link graph was asserted in prose and had been wrong twice.

## What this mockup is evidence of, and what it is not

**It is** a proposal about shape, vocabulary and information density, drawn rather than
described, so it can be disagreed with specifically.

**It is not** a design approval. Both design oracles it builds on were self-approved on
Jerry's instruction and **neither has been printed** — `design/reference/README.md` and
`docs/design/figure-grammar.md` §6 record what that rests on, and GOALS §7.4's "do not
commit S5 effort on B3 until an incumbent figure has been placed in a Word template unedited
and printed" is still outstanding. A mockup drawn to an unprinted grammar inherits that gap;
it does not close it.

**A green row in the coverage matrix means an expectation has been *drawn*.** It does not
mean it is built and it does not mean it is right.

**It has not been looked at by a practitioner**, and the screens that matter most here are
exactly the ones with the most invention in them — the QA/QC workspace, the lineage panel,
the interpretation editor and the field-capture grid. Five minutes of a hydrogeologist's
attention on those is worth more than another day of drawing.

**What was verified, and how.** All 66 screens were driven in a real browser at 1000 px and
375 px and checked for horizontal overflow against the canvas edge, duplicate ids, controls
with no accessible name, heading order, empty panels and degenerate SVG geometry — all
clean, and the document does not scroll horizontally at either width. All 11 figures were
laid out and every `<text>` compared against every other for overlap. Touch targets were
measured under an emulated coarse pointer, including the expanded hit area on the inline
help trigger, which was probed by hit-testing rather than by reading the rule.

**Two gaps in that.** The 1280 px sweep was run in the second pass and not repeated in the
third — the tables converted to panning matrices since then were verified at 1000 px, which
is the harder case, but 1280 was not re-measured. And **nobody has looked at the pixels of
all 66**; the last visual check covered a handful of screens before the browser pane stopped
compositing.

## Files

| File | Holds |
|---|---|
| `seed.mjs` | The dataset. One site, deterministic, no `Math.random()` — a rebuild is byte-identical |
| `ui.mjs` | The `sf-` markup vocabulary: marks, the result encoding, tables, panels |
| `controls.mjs` | The `mk-` interaction vocabulary — navigation, forms, feedback, assistance. All of it a proposal |
| `chrome.mjs` | The stylesheet for that layer, and for the viewer. Nothing here restates a token |
| `figures.mjs` | Eleven figure generators, drawn to the approved grammar |
| `screens.mjs` | The 66 screens, the job spine, and the link graph |
| `build.mjs` | Assembles `index.html`, inlining the product stylesheet; checks the link graph, section partition, dead hrefs and route-line contract |
| `verify.mjs` | The driven-browser sweep — overflow at three widths, duplicate ids, accessible names, heading order, matrix panning. `npm install`, then `node verify.mjs` |
| `app.css` | The product stylesheet, vendored byte-identical so this repo builds standalone. Refresh from the app repo; never edit here |
| `EXPANSION_BRIEF.md` | What governs the expansion: authority order, conventions, phases, the audit loop |
| `audits/` | The dated passes: findings, wave plan, audit rounds |
| `index.html` | The output. Self-contained, no external requests |
