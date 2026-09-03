# Open decisions — 3 September 2026

Thirteen decisions stand between the vendor requirements response
(`2026-09-03-vendor-requirements-response.md`) and the programme it proposes.
Each is here because it is genuinely Jerry's: it reverses a recorded decision,
commits scope the PRD does not carry, needs a source this repository cannot
supply, or is a scientific judgement a mockup must not make on its own.

Each entry is written to be self-contained, so it can be answered directly,
handed to the advisor who wrote the brief, or put to a practitioner.

**Waves cite these by ID.** An answered decision gets its verdict and date
recorded here, and the wave that acts on it names the ID.

**A correction to the response memo.** It said the arbitration items block only
Waves 23, 24 and 30, and that the queue runs regardless. That was wrong in one
place that matters: **D1 gates Waves 19, 20 and 21** — the governed dataset, the
explorer and the analysis object are the same commitment, and building them
before D1 is answered would be committing the scope the decision is about. D1 is
therefore the first thing needed, not a later one.

---

## Now — these gate the next wave that runs

### D1 · Does Strataflow acquire an ad-hoc query capability?

**The question.** The brief's top P0 asks for a Data Explorer with saved,
governed datasets. Nothing in the PRD requires one. Do we accept it as scope?

**Why it is yours.** It adds a capability to the product, not just a drawing to
the catalogue. `EXPANSION_BRIEF.md` §3 puts `docs/PRD.md` above the brief and
above my judgement, and says material conflicts come to you.

**What the record says.** FR-6.3 requires a crosstab with per-criterion
exceedance shading; NFR-1 mentions "standard crosstab and trend queries". Neither
describes query construction. FR-6.6 persists a *chart* configuration. The
catalogue found the gap itself and wrote it down on `#saved-views`: *"No FR
covers saved queries … Nothing persists the question that selected the data —
which locations, which analytes, which period, which criteria sets. Every
incumbent has this and it is most of what a returning user does."*

**Options.**
- **Accept, and amend the PRD.** The mockup demonstrates a capability the product
  claims. Waves 19–21 run.
- **Accept for the mockup only.** The catalogue draws it labelled as unrequired,
  the way it already labels S8 domains. Cheaper, but the drawing then argues for
  scope nobody has agreed to.
- **Decline.** §4, §4.5, §5.6, §9.5 and §12.2 stay unmet, and the brief's single
  largest theme goes unanswered.

**Recommendation: accept and amend the PRD.** Seven separate requirements across
the brief are each asking for this one object from a different direction; it is
the keystone, and a capability this load-bearing should be in the requirement set
rather than only in a picture of the product.

**Unblocks:** Waves 19, 20, 21 — and indirectly 31.

---

### D2 · The three figure-family proposals

**The question.** FP-1 depth profile, FP-2 head contours, FP-3 Durov — approve,
defer, or reject each.

**Why it is yours.** GOALS §5 and the frozen grammar: a new figure family is a
design decision made by you, and an approved family's reference rendering is
authored as its own step before anything asserts against it.

**What the record says.**
- **FP-1 (depth profile)** — recommended for approval on 2 September. The need is
  recorded on `#composite`, the data exists (5 pits, 18 intervals, 45 results),
  and the grammar extension is two disciplined moves: a banded interval that
  spans its logged depth rather than plotting a midpoint nobody measured, and
  small multiples on a shared depth axis. Two screens are waiting on it.
- **FP-2 (head contours)** — recommended for deferral, on measured grounds: this
  seed holds seven control points, one dry. Contours over that network imply
  knowledge between bores that a plane states more honestly, and §9.2's gradient
  requirement is already satisfied by the plane fit with its residual printed.
- **FP-3 (Durov)** — **my recommendation has been superseded and I was wrong.**
  I advised deferring "until a practitioner asks". FR-6.5 already required it —
  the PRD names Piper, Stiff, Durov and Schoeller together — and the advisor's
  brief asks for it at §9.3. The condition is met.

**Recommendation: approve FP-1 and FP-3; confirm FP-2's deferral.**

**Carries in all cases:** G-76b. The grammar these extend has never been printed,
and drawing more of it does not close that gap.

**Unblocks:** the soil screens; figure work in Waves 21 and 24.

---

### D3 · Which soil and sediment assessment levels apply at this site?

**The question.** Name a citable source for soil and sediment criteria, or
confirm that soil results stay unevaluated.

**Why it is yours.** This is a source, not a design. The catalogue has three
times refused to invent a limit no record states — most recently in wave 16,
where six records were searched for a soil field-duplicate limit and all six said
no. I will not manufacture one here either.

**What the record says.** Zero of the five sets in the criteria library carry a
soil or sediment matrix. Every soil and sediment result in the catalogue is
`not evaluated`, and `#crosstab` offers ratio-to-background instead, explicitly
labelled as an interpretation rather than a criterion. Three screens state the
vacuum in words.

**Options.**
- **Supply a real source** — NEPM 2013 HILs/ESLs at the applicable land use, or
  the site's own approved assessment levels from an accepted document. Soil and
  sediment become evaluable everywhere, and §14's soil domain gets a criterion.
- **Confirm the vacuum.** Soil stays `not evaluated`; the catalogue keeps saying
  so, which is honest but leaves the brief's soil requirements structurally
  unmeetable.

**Recommendation: supply the source.** This is the largest single unlock in the
whole programme and it costs a citation rather than a wave.

**Unblocks:** the soil half of Wave 25; soil evaluation in Wave 24.

---

## Soon — these gate a specific later wave

### D4 · Does the map become a workspace, and does NG4 survive it?

**The question.** The brief asks P0 for thirteen layers, symbology across seven
dimensions, a temporal control and spatial selection. `docs/PRD.md` §3 says
**"NG4. Full GIS. Map display and spatial export only."**

**What the record says.** `#coverage` already answers the incumbent baseline
using NG4 by name — ESdat's ArcGIS/MapInfo/QGIS export recorded *defer*, EQuIS's
embedded ArcGIS *concede*. Today `#map` is two static plates with no layer list,
no toggle, no symbology control, no time control and no selection. One layer
already meets the brief's standard outright: the potentiometric surface, which
prints its method, control set, largest residual and the bore it excluded.

**Options.**
- **Accept, holding NG4 as "no GIS authoring".** The map consumes layers and
  never authors them — no digitising, no geoprocessing, no topology editing.
  §18's exclusion of GIS-server integration supports this reading.
- **Accept and retire NG4.** Honest if the product direction has genuinely
  changed, but it is a large scope commitment against R1.
- **Decline.** Scenarios D and E stay broken at the map, and §5 goes unmet.

**Recommendation: accept on the narrow reading, and restate NG4 as "no GIS
authoring"** — its current wording will otherwise keep reading as a refusal of
work you have approved.

**Unblocks:** Wave 23.

---

### D5 · May the catalogue draw S8 domains as an extension path?

**The question.** §14 asks the information architecture to accommodate seven
domains. Four of them are S8 widening on the PRD's own sequencing.

**What the record says.** `#coverage` records the breadth question as *defer* —
*"Wider than the slice; S8 widening, not a screen gap."* The soil, composite,
telemetry and exchange screens each state that drawing a deferred domain **does
not reschedule it**. PRD §14 OD-7 puts contaminated land, aquifer testing and
closure at S8. R1 names solo capacity against scope as the highest product risk.

**Options.**
- **Draw the common model and the extension path**, plus the two records that
  make Scenario E walkable (surface water, meteorology), everything labelled S8.
- **Draw nothing new.** §14.3 and §14.4 go unmet and Scenario E stays unwalkable.
- **Reschedule the domains.** Materially changes the roadmap and R1's exposure.

**Recommendation: the first.** It satisfies §14.3 and §14.4 without claiming a
schedule change, and it is two records rather than four modules.

**Unblocks:** Wave 24.

---

### D6 · Which period-aggregated domain proves the model — noise or dust?

**The question.** If one domain is drawn to prove the common model generalises
beyond concentration-versus-threshold, which?

**What the record says.** Noise has no PRD warrant at all. It appears once, at
**NG5, "Dispersion, noise, or radiological modelling"** — a non-goal. The brief
asks only for noise *monitoring data*: locations, measurement periods, acoustic
metrics, operating and meteorological context, limits. That is not modelling, so
the two are arguably compatible — but the gap is real and yours to close. Dust
has warrant (FR-1.1 names air locations) and is the safer choice.

**Options.**
- **Noise.** Its limit is itself period- and receptor-dependent, so it tests the
  common model hardest — which is the point of drawing one at all. Requires you
  to state that monitoring is not modelling, so NG5 stands.
- **Dust.** Warranted, uncontroversial, and a weaker test.

**Recommendation: noise, with the NG5 distinction stated on the screen.** A proof
that does not stress the model proves less.

**Unblocks:** Wave 24.

---

### D7 · Does the work queue become real, or do completeness items get owners elsewhere?

**The question.** §6.4 and §10.3 require owners, assignment, filters, dependency
and escalation. They land on `#home`, which is a proposal you deliberately kept.

**What the record says.** `#home` carries *"a proposal — the product's `/` is
deliberately a project list (ia-rationale §3); Jerry kept this drawn, 1 Sep
2026."* Its rows hold only kind, urgency, headline, context, project, age, target
and action — **seven of the brief's ten required filters have no data behind
them**. `#coverage` already records Journey 2 as *partially* for this reason.

**Options.**
- **Promote the queue.** `#home` becomes a real surface with the missing
  dimensions as data. Reverses a decision you took three days ago.
- **Keep it a proposal; put owners on the completeness workspace.** §6.4 is met
  on its own screen; §10.3's queue requirements stay partially met, and the
  response says why.

**Recommendation: the second**, unless the brief has changed your mind about the
product's front door. It answers the requirement where the work actually lives.

**Unblocks:** Wave 30.

---

### D8 · Is the portfolio tier a client, or a label?

**The question.** §10.2 and §11.2 want organisation and client above project.

**What the record says.** `seed.mjs`: *"the instance is single-tenant (DR-1), so
both projects belong to the same operator."* This is a deployment-model fact, not
a missing screen. PRD OD-2 puts external-party access at S8.

**Options.**
- **A client label on projects.** Cheap, honest, and enough for filtering and
  grouping. Does not pretend the deployment is multi-tenant.
- **A real client entity.** Implies multi-client operation and reopens DR-1.

**Recommendation: the label**, with the single-tenancy stated where the tier
would otherwise be.

**Unblocks:** Waves 26 and 30.

---

## Model questions — these may need the practitioner rather than you alone

### D9 · Does "criterion" generalise?

**The question.** Is a criterion a *threshold*, or *a rule that produces a
finding*?

**Why it matters.** Every domain the brief adds asserts differently. Groundwater
and soil compare a concentration to a value. Noise compares a period-aggregated
metric to a limit that varies by time of day and receptor. Dust compares a
deposition rate over an interval. Stygofauna compares a population to a reference
and returns *persisting*.

**What the record says.** The catalogue has already met this twice and answered
it **two incompatible ways**: soil and sediment get `not evaluated` with
ratio-to-background offered as an explicitly non-criterion interpretation, while
`#stygofauna` gets a bespoke verdict vocabulary that never touches the criteria
library at all. Those two answers cannot both be the common model.

**The risk in generalising.** The catalogue's entire defensibility argument rests
on a mark meaning one thing. Making the criterion general is the fastest route to
a mark meaning four. `#crosstab`'s existing refusal to conflate the two roads to
`not evaluated` is the right instinct and the right place to start.

**Recommendation: put this to the practitioner**, not to me. It is the single
hardest question in the brief and it decides §14.3.

**Unblocks:** Wave 24; constrains Wave 25.

---

### D10 · Is a proposed-but-unapplied qualifier inside or outside a figure's population?

**The question.** Nine zinc results carry qualifier `L` — proposed, basis not
chosen, not applied. When a figure draws that batch, are they in it?

**Why it matters.** It decides the shape of the analysis object: whether a
population carries each member's QA/QC state as at the moment of computation, and
what a plate must say about what it drew. Whichever way it goes, **the plate must
say which** — a figure that silently includes or silently excludes them is the
defect either answer exists to prevent.

**Recommendation: put this to the practitioner** alongside D9.

**Unblocks:** Wave 21.

---

### D11 · May `#crosstab` be demoted to one representation of a population?

**The question.** §4.4 requires moving between six representations without
rebuilding the query. That makes `#crosstab` one view of an explorer population,
keeping its cell grammar and losing its private filter bar.

**Why it is yours.** It is a real change to one of the four screens a
practitioner has actually read, and the practitioner has not seen the redesign.

**Recommendation: accept**, and put the changed screen into the second
practitioner walk (D13) rather than treating the change as settled.

**Unblocks:** Wave 20.

---

## Process

### D12 · Should the advisor's brief be committed to the public mockup repo?

The repository is public. The brief is your advisor's document and describes
Strataflow's gaps against incumbents. Committing it makes every wave's
requirement citations checkable; not committing it means the register cites
sections whose text is not in the repo. **Publication is yours, not mine** —
which is why it has not been committed. Nothing is blocked either way.

### D13 · The print test and the second practitioner walk

Two long-standing items that §20's completion criteria now depend on.

- **G-76b, the print test.** Both design oracles were self-approved and neither
  has ever been placed in a Word template and printed. Every figure family in
  this programme inherits that gap, and it grows with each one drawn.
- **The second practitioner walk.** A practitioner has read **four** of the 75
  screens, and the four that review corrected now carry more invention than they
  did before it. §20 asks that Scenarios A–E be followable "without relying on
  verbal explanation from the vendor" — that is untested for 71 screens, and no
  amount of drawing closes it.

**Recommendation: schedule the walk before Wave 24, not after the programme.**
The brief adds surfaces faster than they can be validated, and the gap between
what is drawn and what is known to be right is the one risk this pipeline cannot
measure itself.

---

## Answering

A verdict of a sentence is enough for most of these — "approve FP-1 and FP-3,
confirm FP-2", "accept D1 and amend the PRD", "noise, and NG5 stands". D3 needs a
citation. D9 and D10 want a practitioner rather than a quick answer, and the
programme is sequenced so they are not needed until Wave 21.

Nothing in the queue stalls on D4–D13. **D1 is the one that decides whether the
next wave runs at all.**
