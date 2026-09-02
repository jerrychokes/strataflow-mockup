# `design/mockup/` — the complete UI, drawn

A clickable high-fidelity mockup of the whole Strataflow surface: **71 screens across
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
node verify.mjs     # the driven-browser sweep, nine families: overflow at
                    # 375/1000/1280, duplicate ids, accessible names, heading order,
                    # matrix panning, figure text collisions, coarse-pointer touch
                    # targets, stacked-label legibility and captions measured against
                    # the region they caption (npm install first;
                    # CHROMIUM=<binary> if playwright-core has no browser)
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

**Wave 2 — the chain of custody, and three findings drawn deciding something**
(1 Sep 2026). One screen was added, the only one this wave was allowed to create:
**Chain of custody**, which is `docs/GLOSSARY.md`'s phrase rather than the industry's
"eCOC" — the glossary has an entry for *custody transfer* and none for the acronym. It
owns what nothing owned: raising the record in the field, the containers it accumulates,
the seals, and every transfer up to the handover the laboratory signs for, where
`receipt` owns only what was found when the box was opened. It carries no `state` field,
because `state` is the 23 August record and this screen did not exist then; the rail
hovers "added 1 Sep 2026" and badges it `NEW·4`. Four screens were deepened: the round's
sample manifest with the QC taxonomy closed and split by where each control is made
(`events`), a licence condition evaluated over four rounds into three different outcomes
(`exceedances`), a spike raised against a bore's own eleven-round record with the median,
the MAD and the score shown (`qc`), and the rows-read statement on `imports` verified
where it already stood. The tooling items the wave-1 audit left open are closed: the
touch check measures **both axes at a true 44px**, and the viewer's own chrome is inside
its scope rather than excluded — which found the top-bar search at 24px, the project
switcher at 27px, the rail's filter box at 32px, an icon button shrinking to 42px wide
inside a flex row, and the eight bundle-contents checkboxes whose whole tap target was a 15px box.

**Wave 3 — one amendment, traced end to end** (1 Sep 2026). No new screens; six were
deepened and the seed gained the thing they all read. A laboratory re-issued a certificate
for a round that had **already gone to DWER** — `PAS2026-01884 rev B`, three results at MW05
in `2026-Q1-GW` — and the whole wave is that one amendment followed to its far end:
a hardness cross-check that had been failing since February reconciles, three
hardness-modified criteria recompute, two exceedances are withdrawn, two of the four
windowed series change outcome and the licence condition 12(c) trip is withdrawn with an
obligation already lodged against it, no TARP level moves and each says why, and one of
four issued submissions is affected. Nothing is written: `#qualifiers` records 2025 Q1 –
2026 Q1 as a **locked period**, so the amended values are staged and what is drawn is the
decision, not its result — which is why the exceedance register, the TARP board and the
licence still read exactly as they did. Every count in that chain is computed in
`seed.mjs` from the values either side of the amendment, re-running the evaluation's own
window function rather than a second copy of the rule.

Beside it, a **criteria version pair one field apart** — the non-detect rule, `exclude`
against `half the LOR` — run against the committed record: seven derived PFAS totals, six
of which change outcome, and the four treatments drawn side by side so the same seven
results can be read as indeterminate, compliant, 15× or 31× depending on a field that
belongs to the criteria set. `zero` is the column that turns six unassessable results into
passes, which is claim B5 arriving through a different door.

The wave also found a defect no existing check could see: **a `<caption>` lays out at the
table's width**, so inside a panning region the sentence is cut at the visible edge and the
rest is only reachable by scrolling the table sideways — 7 captions clipped at 1280px, 44
at 1000 and 41 at 375, the worst by 2397px. The document never overflowed and every element
query said the caption was exactly as wide as its table, which was true and was the defect.
It is fixed in `chrome.mjs` and the meter is now the ninth family in `verify.mjs`; deleting
the rule reproduces exactly 92 failures.

**Wave 4 — water and loads** (1 Sep 2026). One screen was added, and it is the one case in
the catalogue where the *product* was ahead of the drawing: `/projects/:projectId/water`
ships, `ia.ts` gives it a label and a parent, and this catalogue had never drawn it.
**Water take against entitlement** carries no `state` for the same reason the chain of
custody carries none — it was not drawn on 23 August — but unlike that one it is `shipped`
rather than a proposal, which is the first time the fourth pass's badge and census have had
to hold a stateless screen that exists in the product. It is filed under J6 because
everything on it is a licence obligation, and under **Locations** in the by-section view
because that is where the product parents it.

Three decisions are made on it rather than described. **The entitlement year runs when the
instrument says** — 1 October to 30 September, the anniversary of the water licence's own
grant, not the fiscal year a July boundary would have borrowed by habit — and it is named
by the month it *ends*. **The projection has a rule and the rule is printed**, because the
three defensible rules over the same volumes land on both sides of the flag: complete
months over every bore gives 93.1% and trips the 90% flag, counting the part month gives
89.2%, and dropping the bore that was decommissioned in November gives 89.6%. A flag that
moves with an unstated convention is not a flag, so the convention is stated and the
position is called marginal rather than forecast. **A censored concentration in a load is a
decision, not a number**: the quarter carries the interval its bounding substitutions give
— 0.0 – 7.2 g — with the four treatments beside it and the half-LOR column named as the one
FR-5.8 refuses as a default.

The seed gained the production bores the licence had always named and the register never
held (PB01, PB02, and PB03, decommissioned inside the year it still took water in), monthly
volumes in **kilolitres as integers** — an entitlement is a legal limit, and a rounding that
lands a kilolitre over it is an exceedance nobody caused — and two volumes nobody metered,
each carrying the arithmetic that produced it. Adding rows to the location register turned
up what a hand-kept count always turns up: `9 of 9 locations` had been wrong since the
stygofauna bores landed in pass 3, the facility's area counts read `3 · 3 · 2 · 1` against a
register holding four in two of them, and the licence's entitlement panel said *"65% of the
year has elapsed"* beside a July–June year that was 15% through — 65% was the share of the
*entitlement*, which is the number on the line above. All of them are counted from the seed
now.

**Wave 5 — the portfolio, honestly drawn** (1 Sep 2026). No new screens; the register
still holds 68. The work is in `seed.mjs`: **a second `MOCK-` project**, which
EXPANSION_BRIEF §5.6 named as a one-time workstream and which Journey 9 had been blocked
on since pass 4 — a portfolio cannot be drawn honestly from a one-site seed.

**MOCK-KRJ, Kurrajong Borefield** is the water supply for the Wandalup operation, 38 km
north-west of the mine, on its own licence to take water. It is deliberately small — four
bores, four rounds, eight chloride results, one criteria set — because a counterweight is
what makes the noisy first site legible, not a second Wandalup. The same customer, a
different site, and a **different binding**: A. Nakamura is a Contributor at Wandalup and
an Approver here, which is the first thing the project list has ever been able to
demonstrate rather than assert.

It carries two live facts and the second is the first one's consequence. **Chloride at
KRJ-MW03 is 1.5× the operating strategy's trigger value and nobody has acknowledged it** —
for 199 days. **The six-monthly round that would say whether that was a step or a spike is
24 days overdue.** They compound: the exceedance was never acknowledged, so the written
response it obliged was never lodged and is now 169 days past a deadline nobody set by
hand — the operating strategy gives thirty days from evaluation, so the date is arithmetic
on 2025-11-06. Wandalup is the noisy site and it is the well-run one; Kurrajong is quiet,
and the quiet is the finding. **A site nobody opens looks fine from inside itself**, which
is the whole argument for a surface that crosses projects.

The three other project rows are gone. They were scenery — `locations: 14` and `open: 0`
on sites with no data behind them, beside a Wandalup row reading `locations: 9` while the
register held fourteen — and a portfolio is exactly the screen where a hand-kept count
does its damage. Six surfaces were changed and every number on them is now counted: the
project list (two rows, nine columns, all derived), the obligations board (genuinely
`/aggregate` — 15 rows across 2 projects, ordered by when each falls due rather than
grouped by site, with the aggregate decomposed back into the two projects it was added up
from), search (both projects, both licences, and the second project's bores ranked *below*
the prefix matches because they carry a project prefix — the ranking claim finally has
something demonstrating it), the work queue (the project is a tag on every card rather
than the first clause of a sentence), the project home (unchanged in scope, and it now
says so: every count on it narrows to `MOCK-WDL` explicitly, so appending another
project's row cannot move a tile), and the coverage matrix, where **Journey 9 flips to
covered**.

Three counts that were typed were found wrong while doing it and are computed now: the
crosstab's `All 9 locations` filter option (seven groundwater bores), search's "nine
locations start with MW0" (five), and the command palette's "4 bindings". A fourth was
found by *looking* rather than by measuring — a `cols()` call took two panels as one
argument, so the literal string `3fr 2fr` rendered as body text on the obligations board.

What the second project deliberately does **not** have is a workspace. There is no
Kurrajong location register, crosstab or report here, and every cross-project row says so
and stops at the switch: crossing a project boundary is a scope change rather than a link,
which is the rule `#search` has always stated and now has a second project to state it
about.

What pass 4 does **not** claim is unchanged from pass 3: `shipped` means the route
exists, loads, is scoped and renders — not that the product screen matches this
drawing; no practitioner has looked at any of it (**true when written; corrected
1 September 2026, wave 6** — a senior hydrogeologist has now, and the review is
`audits/2026-09-01-practitioner-review.md`); and G-76b's print test is still
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

*(Those three numbers were the eight-bore fit. Wave 7 found a ninth fault of the same
kind: MW11 was contributing a head to a round in which the field record has it dipped to
the base of its screen and found dry. It is drawn on the plate and is no longer a control
point, and the fit through the seven bores that carry a head reads 119°, 1.93 m/km,
largest residual 0.04 m. The plate and the prose beside it now read those three from one
computation, which is what let them move together.)*

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
| **J1** Get the data in, and know it landed | 14 | U1 · U5 |
| **J2** Know the data is right | 7 | U1 · U2 |
| **J3** Know what is wrong | 7 | U2 · U3 · U4 |
| **J4** Understand it and explain it | 7 | U2 |
| **J5** Produce the submission | 5 | U2 · U4 |
| **J6** Keep the obligations met | 5 | U4 · U1 |
| **J7** Prove what was known, and when | 4 | U2 · U4 |
| **J8** Configure the instance | 7 | U5 |
| **J9** Keep the instance alive | 4 | U6 |
| **J10** The conventions the whole product keeps | 3 | Every user |

The counts above were the second pass's and stood at 57 while the catalogue grew to 66;
they are re-derived here from the register at the wave-2 change (1 Sep 2026). Re-derive
them rather than reading them — `JOBS` in `screens.mjs` is the only thing that knows.

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

**It had not been looked at by a practitioner** when that was written, and the screens that
mattered most here were exactly the ones with the most invention in them — the QA/QC
workspace, the lineage panel, the interpretation editor and the field-capture grid. Five
minutes of a hydrogeologist's attention on those is worth more than another day of drawing.

**Corrected 1 September 2026 (wave 6).** It has now: a senior hydrogeologist reviewed those
four screens (`audits/2026-09-01-practitioner-review.md`) and returned four P0 design
changes and a binding keep-list. The overall verdict was "unusually close to how
environmental groundwater work actually needs to be reasoned about" — and the field-capture
grid was judged **wrong on its axis**: it entered a round column by column across bores,
where field work runs bore by bore. Wave 6 answers two of the four — field capture rebuilt
around the bore session, QA/QC rebuilt around the decision layer — and wave 7 holds the
other two, provenance beginning at the bore and evidence for an inference rather than for
its citations. The estimate above was right: five minutes found what a day of re-reading
would not have, because the drawn version was internally consistent and wrong anyway.

**Wave 7 (2 September 2026) closes the other two, and adds a caveat of its own.** The
lineage chain now begins at the bore — location and version, construction, programme, field
event, stabilisation, sample, filtration and preservation, custody, receipt, subcontract and
batch, before the first laboratory number — with a narrative view and a compact
upstream/downstream one over the same structure; and `#narrative` became an evidence
workspace with a pinnable evidence set, cross-reference tokens that distinguish renumbering
from content change, and a stated numeric rendering rule. The caveat: **the same
practitioner has not seen any of it.** Answering a review is not the same as being right,
and the redesigned screens carry more invention than the ones the review corrected, not
less. The wave also blanked the crosstab's MW11 column, which had drawn eleven evaluated
results for a bore the field record has dipped twice and found dry (`W6-A-1`).

**Wave 8 (2 September 2026) walks the journey the brief defers, and both screens it needed
are proposals.** The telemetry exception — *Instrument → Raw series → Gap/anomaly →
Correction → Corrected series → Re-evaluation → Alert/TARP impact → Audit* — was the one
journey `#coverage` had never drawn, on the stated ground that "walking it would require
inventing the screens it defers". That sentence was right about the cost and is corrected
rather than deleted: the two screens exist now (`#instruments`, `#logger-series`), they are
`proposed` in the register, and the PRD's **S8** marking on FR-1.10 and FR-3.10 is
untouched. Drawing a deferred domain does not reschedule it.

What the pair holds: an instrument register that owns the three field probes
`#field-capture`'s completion preflight has been counting since wave 6 — no screen had ever
said which three — plus loggers as **interval records** (which instrument, in which bore,
over what span, at what sensor depth, checked for overlaps rather than asserted to have
none), and the barometric source named **per location group** as a record with a span,
which is FR-3.10's own phrase. And a raw-and-corrected pair at MW05: 1,536 hourly water
levels derived from a retained pressure record, a 14-day gap that is computed from the
service record rather than described beside it, an anomaly raised and **not smoothed**, a
correction with its reason and its reach (999 water levels re-derived after a deployment
depth was recorded 0.38 m wrong), and a re-evaluation panel that says what a corrected
*level* series actually reaches — the hydrograph trace and the derived elevations, and
**nothing** on an exceedance register whose nine rows are all chemistry.

**The rider it carried says something about the method.** `#consistency`'s five ionic
balances were typed strings sitting beside the ion table that refutes them, and wave 7 wrote
the debt down rather than paying it. Recomputed from `MAJOR_IONS`, **every one of them was
wrong** — including the −7.8% at MW05 that both that screen and `#hydrochem` reasoned from
at length; the ions balance to −0.04% there and to within 0.61% everywhere. The screen
follows the computation, MW12 has the row its results owed it, and the review item survives
on the check that can actually see the problem: a third of the dissolved mass at MW05 is not
in the reported suite. The superseded numbers are kept on the screen beside the derived
ones, because what a screen said in May is a different question from what the record says
now.

**And it found one it did not fix, recorded in the seed beside the series it describes.**
`WATER_LEVELS` — the monthly record the hydrograph draws — does not stand on the same
baseline as the field round's own dips. At MW05 it reads 194.07 m AHD where the round's dip
reduces to 199.64 and the fitted potentiometric surface holds 199.8. Two of the three agree;
the drawn one is the outlier. Re-anchoring is four lines of arithmetic and its consequences
are not — it moves MW05 from four metres above the licence trigger line on `#hydrograph` to
just below it, which is a question with a regulatory answer. So the logger plate is anchored
to the field record and drawn *beside* Figure 4.1 rather than on it, and `#hydrograph` says
so on its own face.

**Wave 9 (2 September 2026) draws the one sample structure this catalogue never had: a
sample made of other samples.** FR-1.7 asks for depth intervals on soil and sediment samples
and for composites with traceability to constituent increments, and one screen owns the step
in the middle — `#composite`, `proposed`, because additional matrices are S8 widening in the
PRD's own sequencing and drawing a deferred domain does not reschedule it. A small soil
investigation on the TSF seepage path sits in the seed beside the groundwater round: five
class-soil test pits, **18 logged depth intervals**, discrete samples chosen by a field-screen
rule fixed in advance, and two composites over **nine constituent increments** — one mixed in
a stainless bowl at the pit, one at a laboratory bench.

**The pair is the argument.** Both composites use the same equal-mass scheme, approved on the
same day by the same person, and where they were made decides everything afterwards: the field
composite's five increments were homogenised and no longer exist, while the laboratory
composite's four arrived as four samples and 750 g of each is still in a store. So "which
increment carried the sulfate" is *permanently unanswerable* for one and *purchasable until
2026-06-03* for the other — a decision with a clock on it, drawn as a decision.

**The honest limit is a first-class statement rather than a caveat.** Nine positions were
covered by two analyses and seven analyses were not run; that is what compositing buys.
What it costs is stated in units: a composite of four increments reading 1180 mg/kg is
consistent with any one of them reading up to **4720**, and an increment carrying less than
**80 mg/kg** — four times the reporting limit — disappears inside it entirely. Both numbers
are computed from the composite's own value and its increment count, and both are printed only
for the mass-conserved analytes, because pH and the conductivity of a 1:5 extract are
properties of the combined material rather than sums over it. Two positions — `TP04` and a grid
node that is deliberately *not* on the location register — have no number of their own at all,
and the register says so on their own rows.

**A composite is not a derived value, and the screens keep the words apart.** A derived result
is arithmetic over other results and keeps its components and a versioned rule; a composite is
a number the laboratory reported on physical material that was combined *before* anything was
measured. So the record carries a **compositing scheme** rather than a rule, and `#lineage`
draws a second chain in the same two builders as the first — where the PFAS total forks
downward into two components, the composite fans in upward from four increments, and the chain
ends in a question it answers with *cannot say* and a price.

**Every soil and sediment result reads `not evaluated`, and that is computed.** The criteria
library holds five sets and none of them carries a soil or sediment matrix, so nothing is
selectable and nothing is asserted — the glossary's own consequence. The screens keep two
roads to that state apart: *nobody stated the matrix* (which nobody can close) and *the
library holds no set for the matrix that was stated* (which somebody can, deliberately, with
an effective date and a version). No criteria set was invented on the way past. What a
practitioner says instead is a ratio to the site's own background, drawn as an interpretation
that gets no mark on the grid.

**And it found three things wrong in the record it was extending.** The sample manifest's
`matrix` column carried the **wrong word on all eleven rows** — eight read *Groundwater*,
which is the location class of the bore rather than the material in the bottle, and three read
*Field blank* / *Trip blank* / *Equipment blank*, which are sample types the column beside them
already held. All eleven are `Water`. The location register's *last sampled* column was a date
typed into a template (`2026-05-1${code === 'MW11' ? '4' : '3'}`) and was wrong in four places,
including printing a collection date for a bore the field record has dipped twice and found
**dry**; it reads the manifests now, and a location with no sample says which kind of
not-sampled it is. And the crosstab's matrix filter offered *Groundwater · Surface water · All
matrices* — a location class, a class with no samples, and a plural with nothing behind it; the
options are counted off the manifests now, in the glossary's five words.

**What it deliberately did not draw.** A depth profile is the plate this investigation wants
and it is a new figure family — a depth-down vertical axis and banded intervals are moves none
of the twelve approved renderings makes — so `#composite` carries the written record of why it
is absent and what it would need: a grammar proposal to Jerry, first. Vapour, the third matrix
FR-1.7 names, is not drawn either: there is no soil-gas programme on this seed to draw it
honestly, and the coverage row says so on its own face.

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
| `seed.mjs` | The dataset. Two `MOCK-` projects since wave 5 — one drawn in full, one carrying only what a portfolio asks of it. Deterministic, no `Math.random()`; a rebuild is byte-identical |
| `ui.mjs` | The `sf-` markup vocabulary: marks, the result encoding, tables, panels |
| `controls.mjs` | The `mk-` interaction vocabulary — navigation, forms, feedback, assistance. All of it a proposal |
| `chrome.mjs` | The stylesheet for that layer, and for the viewer. Nothing here restates a token |
| `figures.mjs` | Thirteen figure generators, drawn to the approved grammar. The hourly logger plate added in wave 8 is the same line-over-time family as the hydrograph — cadence is not a family — and introduces none |
| `screens.mjs` | The 71 screens, the job spine, and the link graph |
| `build.mjs` | Assembles `index.html`, inlining the product stylesheet; checks the link graph, section partition, dead hrefs and route-line contract |
| `verify.mjs` | The driven-browser sweep — overflow at three widths, duplicate ids, accessible names, heading order, matrix panning, figure text collisions, coarse-pointer touch targets on both axes, stacked-label legibility, captions against the region they caption. `npm install`, then `node verify.mjs` |
| `app.css` | The product stylesheet, vendored byte-identical so this repo builds standalone. Refresh from the app repo; never edit here |
| `EXPANSION_BRIEF.md` | What governs the expansion: authority order, conventions, phases, the audit loop |
| `audits/` | The dated passes: findings, wave plan, audit rounds |
| `index.html` | The output. Self-contained, no external requests |
