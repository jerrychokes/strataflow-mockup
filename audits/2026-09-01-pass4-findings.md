# Pass 4 findings — 1 September 2026

The fourth pass over the mockup, run under `EXPANSION_BRIEF.md` Phase 1. Nothing here was
read off the README; every claim below is a measurement, and the command that produced it
is named so it can be re-run rather than trusted.

## 1. The state re-derivation, and what it found

Method: `apps/web/lib/navigation/routes.ts` in the app repo (69 route entries, reconciled
against the filesystem by `scripts/check-route-manifest.mjs`); the CLAUDE.md engine-import
grep per module over `apps/web/lib/screens/routes` (figures 4, report 3, validation 10,
evaluation 1, derivation 1, calc 1, stats 2, config 5 — none zero); and a read of the
screen modules where a route's existence could not settle the question (`home`,
`results`, `validation`, `instance`, `documents`, `results/:resultId`).

| State | 23 Aug 2026 | 1 Sep 2026 |
|---|---|---|
| shipped | 8 | **58** |
| shipped (CLI) | 3 | 2 |
| engine-only | 35 | 0 |
| not built | 15 | 1 |
| proposed | 5 | 5 |

The product built the catalogue out from under the mockup in nine days. Every third-pass
"nothing under it" screen — purge, receipt, batches, objectives, DQA, hardness,
background, fauna, submissions — now has schema, rules and a route. `now:` in
`screens.mjs` carries the new derivation; `state:` keeps the 23 August record verbatim,
per the brief's convention, and the rail dot renders `now` with the old state on hover.

**What `shipped` claims here**: the route exists, loads, is scoped and renders (the
product's e2e suite walks all of them), and the module serves this screen's job. It does
**not** claim the product screen matches this drawing — that comparison is wave work —
and it says nothing about G-76b, which remains untouched.

## 2. Dispositions other than `retain`

- **`home` (Work queue) — decision needed, not mine to take.** The one remaining
  `not built`. The product's `/` is deliberately a project list: `ia-rationale.md` §2
  rejects an aggregating landing screen by name ("No dashboard… the novel metaphor QB-8
  forbids"), and §3 gives `/aggregate` exactly two cross-project questions. The mockup's
  J0 work queue is a considered counter-proposal (it answers the 23 Aug audit's F-08,
  "home is a dead end"), but it now conflicts with a *landed product decision*, which
  outranks it under the brief's authority order. Recorded for the stop gate.
- **`coverage` — enhance.** Phase 2 extends it with three new closed enumerations (PRD
  register, incumbent baseline, journey walk).
- **The by-section view — replace.** Its "No section owns these" group (18 screens)
  recorded a real 23 Aug finding that the product has since answered: `/config/*`,
  `/instance/*` and `/help/*` are now real URL spaces, and `ia.ts` gives all 33
  workspaces a named `reachedFrom` parent. Phase 3 rebuilds the view from today's
  `ia.ts`. The old grouping survives in git history; keeping it live would show visitors
  a finding that is no longer true.
- **Eleven screens — enhance (layout defect, wave 1).** Measured horizontal overflow of
  the *document* (not a panning container) at 375 px: `crosstab` +519 px, `qc-limits`
  +221, `hardness` +193, `hydrograph` +111, `imports` +97, `entitlement` +73,
  `programme` +70, `project-home` +31, `projects` +26, `dqa` +21, `submissions` +9; at
  1280 px: `hardness` +48, `hydrograph` +9. Identical on the pre-refresh build, so not
  the 1 Sep stylesheet update; most are third-pass screens, and the README already
  admits the 1280 sweep was never re-run after pass three. Method: activate each screen,
  compare `scrollWidth` to `clientWidth` on the document element, in a driven Chromium.
- **~40 screens — enhance (stale prose, wave 1).** Each screen prints a route line
  asserting its 23 Aug state ("register shipped, crosstab engine-only"). Those are now
  wrong on the page while right in the register. Refreshing them is per-screen body
  work, so it is wave work, not a Phase 1 edit.

## 3. Holes the register itself has

- **`water` is a product route with no mockup screen.** `/projects/:id/water` ("Water
  take against entitlement", `reachedFrom: locations`) ships today and the catalogue
  never drew it. The only case where the product is ahead of the mockup as a *surface*,
  and a P1 row in the Phase 2 matrix.
- Screens served by a sibling route rather than their own — `certificate` (by
  `documents` + `supersessions`), `qualifiers` (by `validation`), `indeterminate`
  (beside `exceedances`) — are retained as catalogue entries with ownership noted; none
  is a missing screen.

## 4. Reconciliation and graph integrity

Discovered inventory: 66 screens in `screens.mjs`; README says 66; build prints 66 — no
discrepancy. `build.mjs` link-graph checks green (no dangling targets, no dead ends, no
orphans); no duplicate DOM ids at 375 px in a driven browser.

## 5. Material conflicts for the stop gate

1. **Work queue vs `ia-rationale`** (§2 above) — does J0's `home` stand as a proposal
   Jerry wants built, or does the product's project-list-plus-thin-aggregate answer win?
2. **The README's "does not scroll horizontally at either width"** does not survive the
   §2 measurement. Either the third-pass sweep measured containers rather than the
   document, or the claim predates the screens that now fail. The fix list is bounded
   either way.
3. **One capture lesson for the audit loop**: Chromium's CLI `--screenshot` shoots
   before the viewer's script reveals the active screen and produces convincing blank
   frames. Every future sweep and every auditor must drive the browser (the sweep
   script from this pass is the seed of `EXPANSION_BRIEF.md` §10 tooling).

## 6. The target information architecture (Phase 3), and why

The 23 August by-section view ended in *"No section owns these"* — eighteen screens
with no home in a six-section, fieldwork-ordered IA. The product answered while the
view stood still: `/config/*`, `/instance/*` and `/help/*` are real URL spaces today,
and `ia.ts` gives every workspace a declared `reachedFrom` parent. So Phase 3 did not
invent a structure; it **adopted the product's own**, which the brief's authority
order requires (a landed product decision outranks a proposed improvement), and the
v1 prompt's twelve-section candidate list (Home/Plan/Field/Data/Quality/…) was not
needed — the domain-ordered six sections plus three admin spaces already satisfy
every §7 Phase 3 test, including "supports wider domains without restructuring":
telemetry lands as a Locations/Results workspace, external parties as Instance
growth, integration under Configuration.

The rebuilt view has ten groups that exactly partition the 66 screens — Home and
across projects (5, `/aggregate` owns the obligations board) · the six project
sections carrying their `reachedFrom` workspaces (7 · 5 · 8 · 15 · 9 · 6) ·
Configuration (3) · Instance (5, access included) · Conventions (3). Proposed
screens file under the section whose question they serve, marked as the proposals
they are. `build.mjs` now fails the build on a screen no group owns, a screen owned
twice, or a group id that is not a screen — the drift that made the old view stale
cannot recur silently. Two crumb fixes rode along: every section crumb used to land
on the crosstab regardless of section, and `/config` screens had a project trail
they do not have in the product.

**Not resolved here, deliberately:** whether the work queue (J0 `home`) should exist
at all is §5.1's conflict, and the by-section view files it under Home without
prejudging it.

## 7. Decisions taken at the stop gate — 1 September 2026, Jerry

1. **Wave 1 approved** as the first implementation wave.
2. **The work queue stands as a proposal.** §5.1's conflict is ruled, not erased:
   the product's `/` remains a project list per `ia-rationale`, and the J0 work
   queue is retained in the catalogue as a deliberate counter-proposal — its
   `now` state is `proposed`, the state's own definition. Journeys 2 and 5 hang
   their assignment step on it as a proposal; building it in the product would be
   a revision to `ia-rationale`, taken there, not here.
