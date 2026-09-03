# `design/mockup/` — the complete UI, drawn

A clickable high-fidelity mockup of the whole Strataflow surface: **75 screens across
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
| **J1** Get the data in, and know it landed | 18 | U1 · U5 |
| **J2** Know the data is right | 7 | U1 · U2 |
| **J3** Know what is wrong | 7 | U2 · U3 · U4 |
| **J4** Understand it and explain it | 7 | U2 |
| **J5** Produce the submission | 5 | U2 · U4 |
| **J6** Keep the obligations met | 6 | U4 · U1 |
| **J7** Prove what was known, and when | 4 | U2 · U4 |
| **J8** Configure the instance | 9 | U5 |
| **J9** Keep the instance alive | 5 | U6 |
| **J10** The conventions the whole product keeps | 3 | Every user |

The counts above were the second pass's and stood at 57 while the catalogue grew to 66;
they are re-derived here from the register at the wave-2 change (1 Sep 2026). Re-derive
them rather than reading them — `JOBS` in `screens.mjs` is the only thing that knows.

**And they rotted again, exactly as that sentence says they do.** Re-derived from the
register on 2 September 2026 (wave 12): **four of the eleven rows were wrong** — J1 read 14
against 18, J6 read 5 against 6, J8 read 7 against 9, J9 read 4 against 5 — and the headline
above read **72** against **75**. Waves 6 through 11 each added screens and none of them
came back here, which is what a hand-kept count of a generated register does. The numbers in
this section are as of 2 September 2026 and they will be wrong again; `node build.mjs`
prints the total on every run, green ones included.

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

**Wave 10 (2 September 2026) draws the boundary itself — what crosses it, in which direction,
and on whose terms.** The catalogue had drawn data exchange five times and never as one thing:
`#formats` owns a laboratory's file shape, `#mapping-profiles` what the importer learned from
one laboratory, `#imports` the runs, `#migration` one historical move, `#quarantine` the rows a
format could not resolve — and every one of them faces inward. FR-7.6's export had no surface
at all. `#exchange` is that register, `proposed`, because FR-7.6 is marked S8 in the PRD's own
sequencing and drawing a deferred requirement does not reschedule it. **Seven formats as
records** — five inbound, two outbound, each with an owner, a version, what it preserves and
**what it cannot carry**, which is the column no format registry ever has.

**One export is drawn all the way down rather than seven drawn shallowly**, because parity with
EQuIS across its full breadth is a stated non-goal (NG1) and a format zoo would be the wrong
answer to a contractual clause. The 2026 Q2 groundwater round, owed to a joint-venture
participant as an EQuIS-compatible EDD, in three parts:

- **The outward mapping is ADR-0009 rendered.** The domain says **LOR** and the file receives
  `EQL`, and the rename is a recorded table with a basis on every row rather than something the
  writer does silently. Twenty-three rows in three tiers, and the tiers are the app repo's own
  inbound table read the other way: **13 land** on a mapping this project already evidenced,
  **4 are refused** — a validation state is not written into a column the spec does not have,
  and a PQL is not written into `RDL` on the strength of the names, because the *importer*
  declined that trade on the same evidence — and **6 have nothing on the other side
  at all**. A mapping not evidenced enough to trust on the way in is not evidenced enough to
  write on the way out, and the table stops where the evidence does instead of continuing with
  plausible-looking columns nobody can cite.
- **The reconciliation is FR-3.11's proof read at the other end, and it is not symmetrical.**
  Ten checks, each naming the population it counted over, because the round's manifest (11
  samples, 155 results, 6 locations) and the results grid (11 analytes, 66 results, 14
  non-detects) are two true counts of the same round. **Five agree. Five cannot** — and that
  asymmetry is the finding rather than a shortfall in the drawing: an import can be complete,
  while an export into somebody else's vocabulary can only be honest about what it dropped.
- **The loss statement names six things and says what was checked before each claim.** *"The
  format cannot carry it"* is easy to write and easy to be wrong about, so every entry carries
  its verification and what the receiving system reads instead. **132 evaluation outcomes have
  no column** — an outcome is a result and a criterion together, and the criteria set does not
  cross. **11 of them are indeterminate**, and that is a missing *state* rather than a missing
  column, so no setting on the receiving side recovers it — the incumbent baseline records one
  of the two incumbents rendering exactly that case as a *pass* unless a non-default setting is
  enabled, and 11 outcomes that are explicitly not passes arrive as a number, a limit and
  nothing else. **`MW11` is simply absent**: it was visited twice, dipped and found dry, so it
  produced no sample and therefore no row — and a reader of the file cannot tell a dry bore
  from a bore whose results have not been sent, which is the keep-list's own distinction lost
  in translation. **Four of the five field QC samples have no sample-type code** in the
  published list, and they are exactly the controls that answer *did the sampling introduce
  this*. **Ten qualified results carry a propagation basis** the file has no field for.

**DR-2 is drawn where a reader would look for the thing it forbids.** An export is a file and
a manifest; this instance holds no destination for one; and the record names its two controls —
prepare, and write the file set — beside the one that does not exist. The alerting precedent is
cited rather than restated (every destination a configured row, no relay behind it), and so is
the way this project already lodges regulator returns: the DWER portal, by hand, with the
portal's receipt kept as the evidence.

**And it found one thing the export needs that the record does not hold.** A qualifier's
*scheme* — USEPA, ESdat or Strataflow — decides whether the code may be written into a
laboratory qualifier field at all, and the QA/QC register carries each qualifier's *propagation
basis* and not its scheme. Four codes are affected. Closing it means deciding the vocabulary of
each across four screens that already draw them, which is a decision rather than a column, so
it is recorded — dated, in the seed and on the screen — rather than guessed at in passing.
Guessing the vocabulary of a code is the same mistake as guessing a field mapping, and the
whole of that screen is about not doing that.

**Wave 11 (2 September 2026) draws the one dimension the PRD deliberately kept as a seam.**
External-party access is resolved **out of v1** — single operator, single organisation — with
project-scoped row-level security kept as the seam so the dimension is added at S8 when a
consultancy customer is real, and consultants named as people who execute much of this work
while being *not first-class users in v1*. The §7 test on the information architecture is that
it must accommodate that later **without route restructuring**, and this wave is that test run.
`#engagement` is `proposed`, and drawing a deferred decision does not reschedule it.

**One party, one engagement, one binding, and the arithmetic is the screen.** Coolibah
Environmental Pty Ltd — fictional twice over: an obviously invented name, and every identity on
`coolibah.example`, a reserved domain that can never resolve, as the operator's own
`wandalup.example` cannot — holds a **Contributor** binding on `MOCK-WDL` through a group of its
own, sponsored by the operator's Approver, from 2026-03-02 to 2026-06-19. Two dates are
literals and everything else is derived from them and from `AS_AT`: a **109-day** term, **83**
elapsed, **26 days of access left**, and the extension the agreement asks for 30 days out
**owed 4 days ago**. `Expiring` is not a stored state — it is `active` inside the notice
window, computed, because a stored state goes stale on the day it matters.

**Contributor rather than Reader, and the reason is drawn.** Validating a result is a write
with a principal on it. Reader would have been the smaller grant and would also have left the
trail with nothing to answer *what did the consultants touch* with, because the audit record is
a record of mutations and a principal who writes nothing appears in it not at all.

**The claim the screen makes is a negative one: nothing was built for this.** A read by the
engaged hydrogeologist goes through the same repository layer, narrows through the same single
predicate, and lands on the same row-level policy as a read by anyone in the operator's own
team — and the two mechanisms fail differently on purpose, one throwing and one returning zero
rows, because *you do not have access* and *this project has no data* are different sentences.
The two principal records are drawn side by side to make it structural: same fields, same
shape, **one binding instead of two**. There is no external principal type and no second code
path.

**Six refusals, each with the mechanism that refuses it**, because "they cannot see the other
project" is a claim and the mechanism is the evidence for it: the second project (one grant in
the list), the cross-project registers (which render what the bindings admit — two rows for
this principal, one for the engagement), sign-off (Approver is not in the binding, and a
control a binding does not carry is absent rather than refusing), *what any other principal did
across the instance* (an auditor binding, which is instance-wide by nature and cannot be
reached from a project), the audit table read directly (denied to the application role
outright), and the deployment surfaces (not a project binding at all).

**And one thing the trail cannot answer, said rather than discovered.** A sign-in is
deliberately not audited — it is the act that *establishes* the principal, so there is no
principal to attribute it to. *What did the consultants touch* is answerable; *what did the
consultants look at* is not, and no care with an engagement changes that.

**Four things v1 does not have, drawn as decisions with what was checked beside each.** A role
binding is **five columns** — `created_at`, `directory_group_id`, `id`, `project_id`, `role` —
and a test asserts none of them names a person, so there is nowhere on a binding to put a
party, a sponsor or an end date and the engagement record is what the S8 dimension would add.
Every token's tenant claim must equal the one pinned tenant, checked at configuration, at
discovery and on every token, so **a consultant working for three operators signs in to three
instances** and building the surface that joined them would be the opposite of what
single-tenancy is for. The **engagement window is named in the code as one of two extension
points and deliberately left undeclared**, on the stated ground that an unread field rots — so
the end date on this screen is a record with a clock beside it, and what actually ends the
access is the directory group emptying. And there is no user table: an external person needs an
identity in the *customer's* directory and membership of the group, and whether that is a guest
invitation, a contractor account or a federation the customer already runs is the customer's
process, which Strataflow neither performs nor records.

**Where it would live is the whole test, and the answer is nowhere new.** The engagement is a
child of `/instance/access`, a route the product already serves; the project manager's view of
it is a panel on a project home that already exists. **Routes that would move: 0. New
top-level sections: 0.** The authorisation model passes the same test on its own terms — a
scope is a set of grants rather than a list of project ids precisely so this dimension is a
field on a grant and a clause in one predicate, and the scope anchors already carry a facility
column that nothing reads yet, kept so the site-subset half has somewhere to land.

**And it found three things wrong in the register it was extending.** `#roles` carried four
hand-typed directory groups (`WDL-Env-Leads`, `WDL-Env-Team`, `WDL-Geotech`, `WDL-Exec`) that
appear nowhere else in this seed, while `#project-settings` resolved the same people through
three differently-named ones — **two registers of the instance's authorisation configuration,
disagreeing**, with a third screen pointing at `#roles` for a Reader binding that was on
neither. There is one list now and the membership register names its groups from it. One of
those rows, `WDL-Exec → Reader → all projects`, is a shape the **database refuses**: a binding
is instance-wide if and only if its role is `auditor`, as a check constraint, so a Reader over
"all projects" is not a configuration to be careful with — it is a row that will not insert.
It is drawn as the two things it was conflating, a Reader binding on the project and the
**Auditor** authority, which is the glossary's fourth role and the one behind the instance-wide
audit read. And the `Members: 2 · 6 · 3 · 4` column counted a **group roster this product never
reads** — Strataflow asks the directory which groups a principal is in, never who is in a
group — so the column now counts principals this instance has *seen*, from the membership
register, and the auditor binding correctly reads 0. Two sentences on `#projects` were
corrected the same way: bindings are re-read **on every request**, not at sign-in, and access
appears on the next request rather than the next sign-in — a snapshot taken at sign-in is
exactly what the product refuses, because it would leave somebody removed from a group working
for the rest of the day.

**And one thing it recorded rather than fixed.** This catalogue runs on **two clocks**. `AS_AT`
is 2026-05-24 and every countdown measures from it, but the membership register carries six
last-seen values in July and August 2026 — up to **91 days after** the as-at date — and the
entitlement's "130 days" is 2026-08-23 → 2026-12-31 rather than anything `AS_AT` produces. The
project and monitoring surfaces are dated 24 May; the instance and administration surfaces are
dated 23 August, the day they were first drawn. The engagement is on the `AS_AT` clock as this
wave requires, and states its own as-at date on its face so no reader has to infer which one it
is on. Closing it means either moving `AS_AT` — which re-derives every countdown on the
obligations board, the programme and the notification — or moving August literals on four
screens outside this wave. Dated, in the seed, beside the dates it affects.

**Wave 12 (2 September 2026) closes the two `partially` rows in the operations domain, and
one of them by shifting frame rather than by drawing harder.**

**`#package` — configuration portability, which is the half of OM-5 that had no surface.**
The requirement is that criteria libraries, report templates and EDD format definitions are
versioned independently of the application and deployed to every customer. The versions were
already drawn on `#criteria` and `#formats`; what had never been drawn is the thing that
moves them. `MOCK-CFG-2026.3` holds **three items across the three kinds the requirement
names** — each with its own version field (`revision` for a format, `artifact_version` for
the other two, left unnormalised because they are read by people who know one kind and not
the other) and its own SHA-256 — and it is read against what is in force as **1 new, 1
changed, 1 identical**. An identical item is drawn rather than dropped, because *this item is
the same* and *this item is not in the package* are different facts about a deployment.

**"Consequential" is defined on the screen and it is not "changed".** One of the three
reaches results already committed: the criteria item, which would re-evaluate **36** results
— counted off the grid as 6 analytes × 6 locations that returned water — of which **18** are
criteria produced by the hardness relationship. The other two reach nothing recorded: a
format definition decides how the *next* file is read, a template how the *next* document is
assembled. And the number the screen deliberately does **not** produce is how many outcomes
would move: that is the criteria library's own test, referenced by link rather than redrawn,
and it has not been run — which is the point, because *we expect nothing to move* is a
prediction rather than evidence.

**Arrival and activation are separate acts, and the package has been sitting inert for two
days.** Six steps: built, received, checksums recomputed, read against what is in force,
**inert**, and activation not yet. Nothing imports silently — a package arriving with a
changed criteria set and applying it because it was newer would be the largest silent default
this product could contain. Activating the criteria item is an approval rather than a save,
and activating a new criteria version **does not rewrite what past rounds were evaluated
against**: the version that produced an outcome is recorded on it, a locked period refuses
the write, and an issued report regenerates under the version it was issued with.

**Provenance names which of two plausible origins this one has.** It was built by the vendor
from the release line's own configuration directories, not exported from a sibling
deployment — and the field a sibling package would fill is named and left empty rather than
omitted. It carries a **checksum and not a signature**, said out loud because the absence
looks like an oversight: the release attaches signed build provenance to the two images it
publishes and to nothing else. And it is a file: there is no channel from the vendor into
this deployment to push one down, and nothing here holds an address to fetch one from.

**Two things a package must not overwrite, drawn because the fear is reasonable** — the
operator's own corporate template (the arriving one is the *regulator's* prescribed
structure; the branding and numbering stay where the document controller put them) and the
locally authored criteria version, which is this site's own decision on top of whichever
baseline is in force. **And three things a package does not carry**, of which the analyte
dictionary is the sharp case: it arrives with a release, on `#upgrade`, because it is not one
of the three kinds — and saying which things move on which path is the whole of what
portability buys.

**`#estate` — the vendor's surface, and the frame shift is the wave's judgement call.** OM-2's
row said *"the estate view is the vendor's, out of frame here"*. Half of that was right. Being
the vendor's is a reason to shift frame, not a reason to leave the row open — so the row gets
a **dated correction beside the original sentence** rather than a rewrite, and the screen is
drawn three ways at once: a bordered, hatched **frame** that survives a crop, with its label
repeated at both edges; the vendor's own **counter-chrome** drawn inside it carrying
M. Ferreira, a Strataflow operator, and deliberately no control at all, so the substitution
for `MOCK-WDL · Contributor · A. Nakamura` is visible in the same screenshot rather than
described; and one **statement** naming whose surface it is. The catalogue's own chrome is
left alone on purpose — it is drawn once for the whole document and it is honest about being
the product's, and making it lie differently on one screen would trade a stated frame shift
for a hidden one. The filing follows: a section group of its own whose lede says it is not a
URL space here, because filing it under *Instance* would put it in a group whose lede reads
"the deployment itself", which is the claim the screen exists to refuse. The persona is **U6**
and none is minted — the catalogue already records that §12's operating model has no PRD
persona and that the gap is the instance operator, and DT-3 settles who that is at estate
scale.

**DR-2 decides the content model, not just a caveat on it.** There is no telemetry. The
instance reports itself — the health endpoint carries the version stamp and the schema state,
and the release refuses to publish an image whose reported version is not the version being
published — but it answers whoever asks it *from inside the customer's network*, and nothing
outside asks. So every value resolves to one of **three vendor-side records**: the releases
Strataflow cut (its own register, complete), the upgrades Strataflow performed (complete
because customers do not self-install, and the pre-flight refuses to proceed without a
content-verified backup under 24 hours old, so an install date is also the last time the
vendor saw a backup it could roll back to), and the diagnostic bundles customers chose to
send. Each source is drawn with **what it cannot say**, and four things no source gives are
listed where a reader would otherwise assume a live figure.

**The sentence the screen turns on: the vendor knows what it installed; only a bundle can
tell it that what it installed is still what is there.** So the ageing column is the date of
the last bundle and nothing else. Five deployments, as at 23 August 2026: **4 of 5 behind**
`v0.8.0`, the furthest **5 releases and 69 days** back with no standing upgrade window agreed
at all — while the deployment that is 3 releases behind inside an agreed change freeze with a
dated next window is *behind* rather than drifting, and a board that ranked those two the
same way would send the operator to the wrong one. **1 configuration drift confirmed**, found
in a bundle 3 days old — a format definition edited in place, which is the realistic case and
the one nobody mentions — and **3 where nobody has looked**. The five confirmation states
(confirmed, refuted, ageing, stale, never confirmed) are one per deployment, which the screen
says is the catalogue drawing each state once rather than a claim about how an estate
distributes; the 30- and 60-day thresholds are the screen's own convention and are stated as
such.

**Two enhancements, both closing the loop from the receiving end.** `#instance` gains a
**Configuration** row naming the package in force beside the version — two rows because the
two move on different paths — and says that this deployment is one row of a register kept
somewhere else, known to the vendor from its own act of installing it rather than from
anything this screen sends. `#criteria` gains an **Arrived in** row on the version pair: the
set in force arrived in `MOCK-CFG-2024.1` on 2024-02-19, the day the instance was stood up,
and has been carried unchanged by every package since. The criteria library was chosen over
the report composer for a stated reason — its `active.by` field already read *"loaded with
the shipped reference content"* with a date beside it, which is a package described without
being nameable, while the template versions carry no arrival provenance at all and would have
needed a structure invented for them. The draft cell reads *nothing — authored on this
instance*, because a version written here did not arrive in anything.

**And one thing it recorded rather than fixed.** The configuration column on `#estate` rests
on the bundle's configuration report — each configuration item's version *and its SHA-256* —
and **the catalogue describes the bundle twice without naming that field either time**:
`#diagnostics` lists four things in a bundle and the configuration category is not among
them, and `#entitlement` lists eight and calls the nearest one "reference-content versions".
No checksum appears on either. So two surfaces already describe one record with two different
lists, and this wave adds a third that depends on a field neither mentions. The claim about
the product is right — the bundle does carry it — and the catalogue's description is what is
short. Not fixed here because the honest repair is one derived contents list that both bundle
screens read, which is a redesign of two screens in a wave capped at two enhancements. Dated,
in the seed, and drawn on the estate as a warn card where it bites.

**Found while doing it.** The job-count table above had rotted in four of eleven rows and the
headline in the first line of this file read 72 against 75; both are re-derived and dated.
Three vocabulary decisions are recorded in the seed with their anchors: **package** is minted
because the code's own word is *bundle* and this catalogue spent *bundle* on the diagnostic
bundle on 23 August; **item** rather than *artifact* because the glossary's artifact is the
import stage artifact; and **estate** is the right word here rather than a borrowing, because
the sense wave 10 recorded it as spent on — a set of deployments — is exactly the sense OM-2
uses and exactly what this screen draws.

**Wave 13 (2 September 2026) spends no new screens and pays four debts, and every one of
them is the same move: a disagreement described in a comment becomes one source read N
times.** The deferral ledger this pipeline has been keeping since wave 7 stood at nine
records; it stands at **five** — four after wave 14, four after wave 15, which settled one and opened one, three after wave 16, and two after wave 17 — and the ones that closed are kept as
dated settled-notes rather than deleted, because a debt that vanishes when it is paid leaves
nobody able to tell it from one that was never noticed.

**The bundle-contents gap (wave 12's record) is closed by one derived list.** Two screens
described one archive with two different lists — `#diagnostics` enumerated **four** content
rows and named *configuration* only in the sentence above them, `#entitlement` previewed
**eight** and called the nearest one *"reference-content versions"* — and **no checksum
appeared on either**, which is the field `#estate`'s whole configuration column rests on.
Both read one record now: the **five** categories the bundle generator writes, in its own
manifest words, with the configuration category drawn all the way down to **three**
configuration items, each with the version field its own kind states and its SHA-256. The
estate's warn card came off and became the link it was waiting to be able to make. Two
numbers moved with the list and both are printed with what they said before: the bundle size
is the sum of its parts now (**3.6 MB → 3.1 MB**) and the exclusions are the generator's own
six rather than the old list's two.

**It found two things while doing it.** `#diagnostics` listed *"Any principal identifier"* as
absent from a bundle one panel away from `#entitlement` counting **~1,400** of them in log
attribution lines — and the product settles it: the log denylist is credentials, stacks and
the customer's own values, and `principal` is on none of them, because attribution is what a
log is for. What the bundle excludes is **session data**, which is a different fact. And the
format register holds **four** definitions of which **two declare no revision at all**: an
unversioned configuration artifact is refused rather than defaulted, so `#package`'s *held
here* column moves **4 → 2** and names the two that are absent and why.

**The two clocks are named on every face.** `ENTITLEMENT.remaining` was the string
`130 days`; it is 2026-12-31 less 2026-08-23 now, which is 130 days, so the number does not
move and the typing does. **Sixteen surfaces** state which clock a date is on, in one
sentence read from one record — and the rule for the other twelve screens carrying dates
after the project as-at is `#estate`'s own: *when something happened* and *when something is
due* are a source record's own and belong to no clock. **Moving `AS_AT` is still not this
wave**, for the reason wave 11 gave, and the 91-day disagreement between the two halves of
the membership table is still 91 days — what is settled is that both halves say which day
they are measured from.

**`#imports`' three literal tiles are derived, and two of them were wrong.** The decisions
wave 8 said the work needed are taken and printed on the screen: *this quarter* is the
calendar quarter the project as-at falls in, resolved in the site's own timezone, and *held*
is a row deliberately not written on a run that has not been reversed. **Results committed:
231 → 18,859**, because the old literal was one run and the April migration committed 18,628
into this project. **Held for review: 9 → 115**, because the old literal counted a
*reversed* run's six and left out a committed one's 112 — two errors in opposite directions.
Each tile's definition sentence is a field on the same object as its number, so the sentence
cannot end up one qualifier wider than the filter; and wave 8's *"the logger run contributes
0 to all three"* is arithmetic on the screen now rather than a protected assumption.

**The criteria library holds matrix words.** It held `Freshwater` — an ANZG **receptor** —
and `Groundwater`, a **location class**, and neither is one of the glossary's five, so
`#composite`'s *"0 soil criteria sets"* was a regular expression over strings that happened
to be right. Every set is a **water** set, the two dimensions the column was carrying at once
have columns of their own, each row prints what it used to read, and the zero is a match on
the field. What that does **not** close is the rest of FR-1.11 — location group,
hydrostratigraphic unit, fraction and period are still prose — and the note says so.

**One thing found and recorded rather than fixed**, because this wave moves no date literal:
**four** records sit after *both* as-at dates — the interpretation authored and pinned
`2026-08-24`, the criteria draft proposed the same day, the amended certificate issued
`2026-08-27`, and the golden comparison run `2026-09-01`. All four are event dates rather
than measurements, so the clock rule leaves them outside it; each is named on its own screen
beside the clock statement. The fourth is the one the first draft of the record missed,
which is why every rendered date after the administration as-at was enumerated and
classified rather than recalled.

**Wave 14 (2 September 2026) settles the largest standing lie in the seed and adds no
screen.** The monthly water-level series was shaped by `base = loc.toc − 12.5` — a spread
chosen to separate three traces on a plate — and had never been reconciled with the depths
the field round recorded. The deferral's own six-bore table showed the dip-derived and
fitted columns agreeing while the drawn series sat metres away; its record said the repair
"needs its own deliberate wave", and this is that wave. The deferral ledger stands at
**four**, and the record that closed keeps its original text with a dated settled-note
beneath it.

**The datum is corrected and the fiction is not.** The generator draws the same seasonal
structure — same seed, same wet-season term, same drift, same noise draws in the same order
— as a **depth to water** whose last month *is* the round's own dip, and derives each
month's elevation through the survey in force that month. So every bore's May 2026 value is
`LOCATIONS.toc` less the round's dip *because it is that subtraction*, and for every month
after the resurvey the new elevation is the old one plus that bore's constant offset —
which is what correcting a datum without touching a shape means arithmetically. The offsets
were derived, not typed: **MW05 +5.57**, MW07 +5.43, MW09 +4.77, MW03B +2.52, MW01A +0.29,
MW12 −1.21. The three traces spanned 10.52 m and now span 5.38 m, and **every one of the six
old values renders on the screen beside its correction** rather than only in the seed.

**Two things the wave-8 record estimated did not survive being measured**, and both are
recorded on `#hydrograph`: the re-anchored plate was expected to span 4.3 m (it spans 5.38),
and MW05 and MW07 were expected to overlap "where they are now clearly separate" — they
already overlapped, and re-anchoring moved them from 0.28 m apart in May to 0.41 m apart.

**The resurvey step is real now, and it is at the bore that was resurveyed.** The comment
above the generator had claimed a datum step at MW03B, which has no survey history at all.
MW05 does — 208.42 m AHD until `2024-03-18` and 208.11 m from it — so the plate steps 0.31 m
down at that epoch, ruled and named, because a step in an elevation series is either the
water moving or the datum moving and only one of those is a finding. The survey history is
one record now (`SURVEYS`, beside the location register), read by the construction log, the
monthly plate once a month and the logger plate once an hour.

**MW11 carries no monthly series, for the reason it carries no head.** The round dipped it
to 22.0 m btoc, the base of its screened interval, and found it dry; the old rule drew it
anyway at a water table ten metres above where the tape found nothing — the same assertion
wave 7 removed from the potentiometric fit at the same bore. Its row on the reconciliation
table carries the reason where a number would be.

**The trigger line was measured before anything was drawn, and it is withdrawn.** Figure 4.1
carried a dashed red line at 195.6 m AHD labelled *"Trigger line · 195.6 m AHD (TSF
licence)"*, and re-anchoring moved MW05 from 1.53 m **below** it to 4.04 m **above** — a
regulatory question, not a rendering one. Six registers that could carry a level criterion
were searched for one in the elevation unit the unit dictionary names: **0 citations**,
against a control search for `µS/cm` — a unit this site does hold criteria in — that finds
**2**. The number existed in exactly two places, both on that one screen, and the licence
its parenthesis named lists 6 of 24 conditions, the ones carrying a monitoring obligation,
which is the class a level trigger belongs to. Against the series it was typed beside it sat
0.32 m above the trace's first value and was reached only by the first wet season's four
months. So it is scenery, and the line is **withdrawn rather than re-valued**: there is
nothing on the record to re-derive it from, and writing a licence condition to justify a
number that never had one would leave this catalogue holding an obligation nobody imposed.
The configuration row keeps it struck through, the counterfactual is stated in full, and
*above* is the side of the line every other screen already puts this bore on — 8 of the
round's 9 exceedances, TARP Level 3, a seepage mound in the interpretation. **What replaces
it on the plate is the round's own dip at each bore**, drawn as the logger plate draws one,
landing on the trace it anchors.

**Found while doing it — three, all measured.** The plate-relationship panel wave 8 wrote
said re-anchoring would move MW05 "from four metres above the licence trigger line to just
below it": **backwards on both ends**, and the seed record it summarised had the direction
right. The potentiometric heads claimed to be "reduced from the top-of-casing elevations and
standing levels already on the location register and the field round"; measured against that
record, three matched to a centimetre and **MW07 was 0.53 m out and MW12 1.41 m out**, on a
plate whose largest residual was 0.04 m — two heads had been adjusted until the plane fitted
them. The five dipped bores' heads are computed now and the fit moves with them: bearing
119° → 103°, gradient 1.93 → 1.74 m/km, **largest residual 0.04 → 0.55 m**, with the
before-values printed where they render and the two subterranean-fauna heads declared as the
estimates they are. And the bore nest's three literals — `11.42 m btoc`, `203.40 m AHD` and
`+0.86 m` — are derived; all three reproduce, so what moved is the typing.

**Wave 15 (2 September 2026) settles the oldest standing deferral and adds no screen.** Four
surfaces described one fact and gave four answers about how far the PFAS suite reached on
2026 Q2: the batch said **4 samples**, the manifest gave the two extra PFAS tests to **one**
sample, the results grid carried a PFOS + PFHxS total at **6** locations, and the
`2026-Q2-PFAS` event said **4 samples and 1 control**. Wave 7 recorded the disagreement and
did not settle it, because the cheapest reading empties cells of the one row `#criteria`
demonstrates the non-detect rule over. **The ledger goes four → three by settlement and
three → four by discovery**: the record that closed keeps its finding verbatim with a dated
settled-note beneath it, and this wave opened one of its own — the interpretation's case
against a laboratory artefact cites *"the field and equipment blanks clear"* on an analyte
the blanks were never tested for, and the fix is either editing an attributed professional
judgement or growing a way to challenge one, neither of which belongs in a wave about a
sample count. A ledger is a register of the truth rather than a target.

**The measurement came before the drawing, and it is physical.** A PFAS result requires a
bottle at the second laboratory, so the question is what material reached it. Three
independent records answer and they agree: the **subcontract chain** holds two transfers of
**one container**, names its sample, carries one seal through both hops and ends in a receipt
reconciled *1 of 1* by a named person; the **manifest** gives one sample of eleven 16 tests
and 5 containers where the other ten carry 14 and fewer; and the **container count is
closed** — per-sample containers sum to 38, the laboratory reconciled *38 of 38*, and five
more PFAS bottles would have made 43. Nothing contradicts them: the deliverable raises one
location question and it is MW-05, the lineage names two rows of one file for one bore, and
the snapshot lodged with the regulator holds *PFOS + PFHxS at MW05 and the eleven results
that framed it*.

**So the suite reached one sample, and five censored values are withdrawn rather than
re-valued.** `< 2.0` asserts that a laboratory looked and reported below its limit of
reporting; no laboratory did. There is no version of those cells that is nearly right, and
the alternative reading — that the analyses happened and the manifest, the chain and the
receipt all under-record them — would have to be drawn as three more bottles, a second
consignment and a receipt nobody signed, which is a fabricated chain of custody in a system
of record. It is the same trade the trigger line was refused on the day before.

**The grid gained a second kind of absence and every consumer had to choose.** A dry bore is
an absence of *material*; a bore that was purged, sampled, sealed and reconciled and never
tested for this suite is an absence of *analysis*. The cells carry a dotted glyph and the
words **not analysed**, no outcome marks, and a sentence composed from the manifest and the
custody chain. Every count that used to mean *the dry column* now says `notSampled` by name,
because a sentence about a dry bore over a number counting sixteen cells would have been the
old defect in a new place.

**Every moved value renders beside its before**: censored values **14 → 9**, results **66 →
61**, results that could not be assessed **11 → 6** (cadmium alone), evaluation outcomes
carried by the export **132 → 122**, the batch **4 → 1** samples, the event **4 → 1** samples
and **1 → 0** controls, and the non-detect demonstration **6 → 1** rows. None of them is
typed; the befores are written down once, on the decision record, and read from there.

**The non-detect demonstration survives and demonstrates more than it did.** MW05's analysis
is the one every reading agreed happened, and nothing about it moves — 3.1 + 1.7 J = 4.8
ng/L, 37×, TARP Level 3, the notification lodged. The five withdrawn rows are drawn beside
the live table, run through the *same evaluator*, as the before they are: under `zero` they
read **compliant**. A rule that turns a non-detect into a pass was the failure that screen
was drawn to refuse; a table that turned an analysis nobody ran into five passes is the same
failure one door further back, and it was sitting inside the demonstration.

**Found while doing it — three.** Wave 7's own record said *three surfaces* and then named a
fourth in its last paragraph, and the cheapest reading it anticipated (*PFAS on MW05 and
MW07 only*) empties four cells where the evidence supports five. And the criteria-version
activation preview typed **7 totals re-evaluated, 6 outcomes changing, 6 exceedances, 6
statutory clocks** against a record that supported 6 / 5 / 5 / 5 — already one out before
this wave, because it was written while MW11 was still a row and never re-derived when wave 7
blanked that column. It is computed now, and it writes **1 total, 0 outcomes, 0 clocks**:
half-limit substitution has something to substitute only where a non-detect exists, and the
only PFAS result on this round is a detect.

**What was verified, and how.** All 66 screens were driven in a real browser at 1000 px and
375 px and checked for horizontal overflow against the canvas edge, duplicate ids, controls
with no accessible name, heading order, empty panels and degenerate SVG geometry — all
clean, and the document does not scroll horizontally at either width. All 11 figures were
laid out and every `<text>` compared against every other for overlap. Touch targets were
measured under an emulated coarse pointer, including the expanded hit area on the inline
help trigger, which was probed by hit-testing rather than by reading the rule.

**Wave 16 (2 September 2026) gives the data quality objectives a matrix and adds no screen.**
Wave 9 measured a **soil** field duplicate against the round's single field-duplicate limit,
which was written for water, and recorded the mismatch rather than fixing it: the repair
"belongs to a wave that redesigns `#qc-limits`", and this is that wave. Every limit in the
set now states the material it was written for, in the glossary's five words, with its
version and the date it took effect — and all **ten** read **water**, which is a measurement
rather than a default. The ledger goes **four → three**; the record that closed keeps its
finding verbatim with a dated settled-note beneath it, and the three that stand are
byte-identical.

**Stating a matrix is not changing a limit, and the screen says so.** A version governs a
limit's number, its population and its consequence, and none of the three moved — no verdict
re-derives, no finding is re-judged, no version was created. What moved is what a reader can
see: a soil duplicate is now visibly held to a water limit, where before the library was
silent about matrix and the mismatch could only be read in a comment. The moment it *would*
become a version change is the moment a limit is written for a second matrix, and this set
has not been. The `since` column is derived rather than typed: the **2** rows that moved in
2026.1 carry **2026-05-21** under it and the **8** carried forward unchanged still carry
**2025-07-01**, so "which limits, for which matrix, under which version, since when" is
answered row by row.

**The soil answer was measured before it was drawn, and the number was refused.** Six records
could have carried a soil field-duplicate limit — the investigation's own sampling and
analysis plan, this objective set, the laboratory's quality plan, the soil certificate and
work order, the water-quality standard the field duplicate rule cites, and the criteria
library — and each was read and each says no. The plan fixes a compositing scheme and a
500 µS/cm field screen and states no acceptance limit of any kind; the two batches drawn with
their own quality control are both water. So the honest state is a **counted absence**: the
library holds **0** soil limits of **10**, the resolver hands back the water row with
`held: false` and a sentence saying so, and the verdict names both the limit and the material
it was written for. A conventional wider soil RPD is the number a practitioner would reach
for and nothing in the record states one — writing it would add a limit to a set with a named
approver and an effective date, on nobody's authority, which is the trade the licence trigger
line was refused on the day before. Which way the error runs is still argued and labelled as
reasoning: soil is heterogeneous at the scale of a trowel, so a soil limit would be wider,
which makes the water limit the stricter test.

**One source, and the closure is checkable.** The ten limits live on `DQO` now — a
matrix-scoped limit is a version's content the way an analyte is a criteria set's — and
`QC_LIMITS.rules` **is** that array rather than a copy, so the row a finding names and the row
the library prints are the same object. The limit judging the soil duplicate is
`QC_LIMITS.resolve('Field duplicate RPD', 'Soil')`, and its `rule` is identically the row
`#qc-limits` renders.

**Found while doing it — two.** Applying the library's own applicability rule rather than
quoting it moves **arsenic** out of the percentage test: 8.2 and 7.9 mg/kg against a reporting
limit of 2 do not reach 5 × LOR, so the pair is judged by absolute difference — 0.3 against an
allowance of 4 — and the percentage printed for it was arithmetic on noise, which is the exact
defect `#qc-limits` has a panel about. No outcome moves; the sentence says **three** pairs
where it said four and names the test that reached the fourth, and the worst RPD is still
zinc's **7.1%**. And **thirteen** sentences across the workspace typed a number this set holds —
**five** figures, two already drifting from the library's spelling (`80–120%` against
`80 – 120%`, and the same for the spike range). All thirteen read the row now, one before is
printed per limit rather than per sentence, and the ionic balance is the fourteenth citation
that needed nothing: it already read the constant its own arithmetic is done with, so the library
row quotes that string instead of restating it.

**Every moved statement renders beside its before.** The soil duplicate's note, the manifest's
copy of it, the two finding rule texts that gained the word *water*, the three data quality
assessment dimensions that cite a limit and had typed its numbers beside the library that
holds them, and the five limits whose spelling settled. What did **not** move is
stated as loudly: the water round's field-duplicate findings were raised under 2025.2 on
2026-05-19 and are untouched, and the exportable configuration count is still **7**, because
data quality objectives are not one of OM-5's three kinds and never were.

**Two gaps in that.** The 1280 px sweep was run in the second pass and not repeated in the
third — the tables converted to panning matrices since then were verified at 1000 px, which
is the harder case, but 1280 was not re-measured. And **nobody has looked at the pixels of
all 66**; the last visual check covered a handful of screens before the browser pane stopped
compositing.

**Wave 17 (3 September 2026) gives every qualifier a scheme and an origin, and adds no
screen.** Wave 10 found, while drawing the export, that the QA/QC register recorded each
qualifier's *basis* and not its *scheme*, and deferred it as "a seed change with four screens
on the other end of it and a judgement in the middle". The register is one record now —
`QUALIFIERS`, **six** assertions on **five** letters — and `#qc`, `#qualifiers`, `#lineage`,
`#result-detail` and `#exchange` all read it. The ledger goes **three → two**; the record that
closed keeps its finding verbatim under a dated settled-note, and the two that stand are
byte-identical.

**The measurement moved the wave, three times.** The gap is **two** fields and the deferral
named one: `docs/GLOSSARY.md` carries *qualifier scheme* and *qualifier origin* as separate
first-class terms, and the export rule the deferral quoted — a reason code of ours "must not
be exported as though a laboratory had said it" — turns on **origin**, which the record never
named. Origin then turns out to answer the export question completely and the scheme question
not at all: **four** of the six were raised by checks of this instance and are refused before
their letter is read, **two** were asserted by a laboratory, and one of those laboratory codes
is the same **J** a rule of ours puts on the field duplicate. Same character, two assertions,
two fates, and nothing on any screen told them apart.

**Scheme is settled where the record settles it, which is once.** The cadmium `U` is USEPA on
the glossary's own sentence about the format it arrived in. The other five are undecided in
two different ways and both are drawn as decisions with their two readings, the consequence
each way and a count — the four raised here have no vocabulary on the record at all, and the
laboratory `J` arrived on a deliverable that declares none. No vocabulary is picked silently,
and no letter's meaning is invented: nothing in this instance states what **T** means, so the
register prints the absence.

**Three corrections, each with its before on the face that changed.** Wave 10 expected `J` and
`B` to read as USEPA; the ESdat specification names **six** codes for `Lab_Qualifier` and `B`
is not among them. `PFAS_LIMITS` asserted `scheme: 'USEPA'` on a qualifier that came in on a
laboratory's own single-CSV dialect, where the glossary's warrant names one format and it is
not that one — the nearest thing to a citation was the *method*, USEPA 1633, which is not a
vocabulary. And `RESULT_DETAIL` said `source` where the glossary says **origin**.

**Found while doing it.** `#qualifiers` carried **four** typed rows since 23 August and
**three** of them asserted a code this instance has never applied: `H` is half of a held row's
way out that nobody took, `*` contradicts the disposition it came from — which says in as many
words that no qualifier reached the result — and `D` is a derivation flag drawn as a
qualifier, on a total that actually carries `J`. The fourth attributed an automatic qualifier
to a person. All four are kept on the screen with the record that refutes each, and every
verdict recomputes off that record.

**What was refused.** A third origin word for the two rule-raised codes, which the glossary's
two-valued field does not offer — so the register says the words do not reach them and counts
it, rather than minting one. A meaning for `T`, which nothing in this instance states. And the sentence
*forbidden by the schema*: the specification says `Lab_Qualifier` **may carry** six codes and
does not say it rejects a seventh, so what is drawn is "not among the codes the specification
names".

## Files

| File | Holds |
|---|---|
| `seed.mjs` | The dataset. Two `MOCK-` projects since wave 5 — one drawn in full, one carrying only what a portfolio asks of it. Deterministic, no `Math.random()`; a rebuild is byte-identical |
| `ui.mjs` | The `sf-` markup vocabulary: marks, the result encoding, tables, panels |
| `controls.mjs` | The `mk-` interaction vocabulary — navigation, forms, feedback, assistance. All of it a proposal |
| `chrome.mjs` | The stylesheet for that layer, and for the viewer. Nothing here restates a token |
| `figures.mjs` | Thirteen figure generators, drawn to the approved grammar. The hourly logger plate added in wave 8 is the same line-over-time family as the hydrograph — cadence is not a family — and introduces none |
| `screens.mjs` | The 75 screens, the job spine, and the link graph |
| `build.mjs` | Assembles `index.html`, inlining the product stylesheet; checks the link graph, section partition, dead hrefs and route-line contract |
| `verify.mjs` | The driven-browser sweep — overflow at three widths, duplicate ids, accessible names, heading order, matrix panning, figure text collisions, coarse-pointer touch targets on both axes, stacked-label legibility, captions against the region they caption. `npm install`, then `node verify.mjs` |
| `app.css` | The product stylesheet, vendored byte-identical so this repo builds standalone. Refresh from the app repo; never edit here |
| `EXPANSION_BRIEF.md` | What governs the expansion: authority order, conventions, phases, the audit loop |
| `audits/` | The dated passes: findings, wave plan, audit rounds |
| `index.html` | The output. Self-contained, no external requests |
