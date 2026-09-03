/**
 * Renders `index.html` — every screen, in one self-contained file.
 *
 * The product's own stylesheet is read from `apps/web/app/styles/app.css` and
 * inlined verbatim. That is the point of the exercise: the mockup is styled by
 * the thing that styles the product, so a colour or a density that looks wrong
 * here is wrong there too, and a token changed there changes this on the next
 * build. A parallel stylesheet written to look similar would drift within a
 * week and would make every judgement made from this file worthless.
 *
 * Everything the product does not implement yet lives in `chrome.mjs`, in the
 * `mk-` namespace, so what is approved and what is proposed can be told apart
 * at a glance.
 *
 * ## Two navigations, and they are both real
 *
 * The **rail** is the catalogue: eleven jobs, grouped by the question a
 * practitioner arrived with, so the whole surface can be seen at once. The
 * **top bar and section strip** are the product's own architecture — the six
 * sections of `app/navigation/ia.ts`, in the order the work happens.
 *
 * The first build had only the rail, and that turned out to hide something.
 * A catalogue reads as an information architecture if you do not look closely,
 * and the two are different claims: one says *here is everything*, the other
 * says *this is the order of the work*. Drawing both, and letting the rail
 * switch between them, is what makes the difference visible rather than
 * something a reader has to be told about.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CHROME_CSS } from './chrome.mjs';
import { JOBS, RELATED } from './screens.mjs';
import { HATCH_SPRITE, esc } from './ui.mjs';
import { slideOver } from './controls.mjs';
import { ANALYSES, EXPLORER, LINEAGE, PRINCIPAL, PROJECT, PROJECTS, VENDOR_BRIEF } from './seed.mjs';

const here = dirname(fileURLToPath(import.meta.url));
// Inside the app repo (as design/mockup/) the product stylesheet is read live,
// which is the claim in the header comment at full strength. In the standalone
// strataflow-mockup repo that path does not exist, so a vendored byte-identical
// copy (`app.css`, refreshed from the app repo — keep it diffable, no local
// edits) stands in, and the claim weakens to "styled by a dated snapshot of
// the thing that styles the product". The build says which one it used.
const APP_CSS = [
  resolve(here, '../../apps/web/app/styles/app.css'),
  resolve(here, 'app.css'),
].find(existsSync);
if (!APP_CSS) throw new Error('no product stylesheet: neither ../../apps/web/app/styles/app.css nor ./app.css exists');
const OUT = resolve(here, 'index.html');

const productCss = readFileSync(APP_CSS, 'utf8');

const STATE_TONE = {
  shipped: 'good',
  'shipped (CLI)': 'good',
  'engine-only': 'warn',
  'not built': 'bad',
  proposed: 'new',
};

const ALL = JOBS.flatMap((j) => j.screens.map((s) => ({ ...s, job: j })));
const labelOf = Object.fromEntries(ALL.map((s) => [s.id, s.label]));
/*
 * The banner said "backs 58 of the 66 screens" as two typed numbers. Both were
 * true when they were typed and one wave made both wrong — which is the same
 * failure the route lines had, in the one paragraph every visitor reads first.
 * Counted from the register instead, the way `stateSentence()` counts.
 */
const ROUTE_BACKED = ALL.filter((s) => (s.now ?? s.state) === 'shipped').length;

/**
 * The product's own architecture, and which drawn screens fall inside each
 * part of it — **rebuilt 1 September 2026** (pass 4, EXPANSION_BRIEF.md
 * Phase 3).
 *
 * The 23 August version of this view ended in a group called *"No section
 * owns these"* — eighteen screens with no home in an IA built around the
 * sequence of fieldwork. That was a real finding, and the product has since
 * answered it: `/config/*`, `/instance/*` and `/help/*` are real URL spaces
 * in `apps/web/lib/navigation/routes.ts`, and `navigation/ia.ts` gives every
 * one of its 33 workspaces a declared `reachedFrom` parent section. This
 * view now mirrors that architecture — each project section lists its
 * register screens first and then the workspaces the product hangs off it —
 * so the honest remainder is empty and the group is gone. Where a drawn
 * screen has no product counterpart (a `proposed` screen), it is filed under
 * the section whose question it serves, which is a proposal like the screen
 * itself.
 *
 * `checkSectionPartition()` below fails the build unless these ids exactly
 * partition the register: every screen in exactly one group, no id that is
 * not a screen. A view of the architecture that can silently drift from the
 * register is how the last one went stale.
 */
const SECTION_VIEW = [
  { label: 'Home and across projects', lede: 'Where a session starts — and /aggregate, the two questions that cross projects', ids: ['home', 'search', 'projects', 'project-home', 'obligations'] },
  // Wave 8 files the instrument register and the logger series here for the
  // same reason `water` is here rather than under its own job: the product
  // parents both questions off a bore. An instrument is a thing hanging in
  // one, and a logger series is that bore's own record at an hourly cadence.
  { label: 'Locations', lede: 'Step 1 — the bores, their survey history, and everything read while standing at one', ids: ['locations', 'location', 'facility', 'map', 'hydrograph', 'water', 'stygofauna', 'instruments', 'logger-series', 'project-settings'] },
  // Wave 9 files the composite record here rather than under Locations: a
  // composite is a sample, it is made during one round, and everything on its
  // screen — the increments, the scheme, the custody instruction, the
  // follow-up clock — belongs to the occasion the material was collected on
  // rather than to any one place. Two of its nine increments have no place on
  // the register at all, which settles it.
  { label: 'Sampling events', lede: 'Step 2 — each round of collection, and the field record around it', ids: ['events', 'programme', 'purge', 'ecoc', 'receipt', 'field-capture', 'composite'] },
  // Wave 10 files the exchange register here, and the lede gains a clause for
  // it. Every screen in this group faced inward — a deliverable arriving and
  // what it rests on — and the one register that holds *both* directions
  // belongs beside them rather than under Reports: a format is a format
  // whichever way the file is moving, and the detail behind four of its seven
  // rows is on `formats`, `mapping-profiles`, `migration` and `imports`, all
  // of which are in this group already.
  { label: 'Import runs', lede: 'Step 3 — deliverables as they arrive, what each one rests on, and every format that crosses the boundary in either direction', ids: ['imports', 'import-review', 'import-commit', 'quarantine', 'certificate', 'documents', 'migration', 'mapping-profiles', 'exchange'] },
  { label: 'Results', lede: 'Step 4 — every result, and every question asked while reading the numbers', ids: ['crosstab', 'explorer', 'analysis', 'result-detail', 'qc', 'batches', 'qc-limits', 'dqa', 'consistency', 'validation', 'qualifiers', 'hydrochem', 'statistics', 'audit', 'supersession', 'saved-views', 'lineage'] },
  { label: 'Exceedances', lede: 'Step 5 — where a result sits outside a criterion, and what that obliges', ids: ['exceedances', 'indeterminate', 'hardness', 'criteria', 'background', 'tarp', 'alerts', 'notification', 'licence'] },
  { label: 'Reports', lede: 'Step 6 — submission-quality documents, and the record of issuing them', ids: ['report', 'report-figures', 'narrative', 'snapshot', 'submissions', 'signoff'] },
  // Wave 12 files the configuration package here and the lede gains a clause
  // for it. Everything in this group is reference data in force; a package is
  // the same reference data *arriving*, and the two things it changes when it
  // is activated are the format registry in this group and the criteria
  // library, which sits under Exceedances because that is the question it
  // serves rather than where it is configured.
  { label: 'Configuration', lede: '/config — reference data the whole instance shares, and how a versioned set of it arrives', ids: ['formats', 'dictionary', 'units', 'package'] },
  // Wave 11 files the engagement here and the lede needs no clause for it:
  // "who may enter it" is already the question this group answers, and an
  // engagement is a record about one of the bindings `roles` lists. It would
  // be a child of `/instance/access` if it were built, which is the same
  // relationship `upgrade` and `diagnostics` have to `/instance`.
  { label: 'Instance', lede: '/instance — the deployment itself, and who may enter it', ids: ['instance', 'roles', 'engagement', 'upgrade', 'diagnostics', 'entitlement'] },
  /*
   * Wave 12, and the filing is part of the frame decision rather than a
   * housekeeping choice (recorded in full above `ESTATE` in `seed.mjs`).
   *
   * This view mirrors the product's URL spaces, and the estate screen is in
   * none of them: it is the **vendor's** surface, in the vendor's own place,
   * reachable by no principal in any customer's directory. Filing it under
   * `Instance` would have put it inside a group whose lede reads "the
   * deployment itself" — which is the precise claim the screen exists to
   * refuse — and filing it under `Conventions` would have made it the
   * viewer's, which it is not either. So it gets a group whose lede says what
   * it is.
   *
   * One screen in a group is a fair thing to question, and the answer is that
   * this group is not a topic, it is a frame. The partition is the one place
   * the catalogue can say that structurally instead of in prose somebody has
   * to read, and it sits between the customer's own deployment and the
   * viewer's own conventions because that is the order the frames widen in.
   */
  { label: 'Vendor operations', lede: 'Not a URL space on this deployment — Strataflow’s own surface, drawn because the catalogue holds the whole product', ids: ['estate'] },
  { label: 'Conventions', lede: '/help, and the viewer’s own audit of this catalogue', ids: ['data-states', 'assistance', 'coverage'] },
];

/**
 * Which of the six project sections a screen sits under, for the strip —
 * derived from SECTION_VIEW rather than maintained beside it, so the strip
 * and the by-section rail cannot disagree. Screens in the home, config,
 * instance and conventions groups highlight nothing, which is correct: the
 * strip is the project workspace’s navigation and they sit outside it.
 */
const PROJECT_SECTION_LABELS = new Set(['Locations', 'Sampling events', 'Import runs', 'Results', 'Exceedances', 'Reports']);
const SECTION_OF = Object.fromEntries(
  SECTION_VIEW.filter((sec) => PROJECT_SECTION_LABELS.has(sec.label)).flatMap((sec) => sec.ids.map((id) => [id, sec.label])),
);

/** The register screen each section crumb should land on. */
const SECTION_REGISTER = {
  Locations: 'locations',
  'Sampling events': 'events',
  'Import runs': 'imports',
  Results: 'crosstab',
  Exceedances: 'exceedances',
  Reports: 'report',
};

/*
 * Route lines carry no state claims — pass 4 found thirty-five of them still
 * asserting 23 August states ("engine-only", "not built") three routes and
 * one product rebuild later. The state lives in the register alone, rendered
 * by the rail dot; a route line is a path, a stage suffix, or an honest
 * "a proposal" for a screen the product does not have. Checked at the source
 * so the prose cannot rot separately from the register again.
 */
{
  const source = readFileSync(resolve(here, 'screens.mjs'), 'utf8');
  const banned = /engine-only|not built|no route|renders nowhere|no screen|nothing renders|CLI-only|shipped/i;
  const stale = [...source.matchAll(/route: '([^']*)'/g)].map((m) => m[1]).filter((r) => banned.test(r));
  if (stale.length) {
    for (const r of stale) console.error(`route line carries a state claim: “${r}”`);
    process.exit(1);
  }
}

/*
 * Wave 21 — the five readings of one population each name a marker, and the
 * marker has to still be there.
 *
 * `#statistics` draws a table of every place this catalogue describes *arsenic
 * at MW05*, because making that population inspectable was the first time
 * anybody asked all five the same question — and three of them give three
 * different answers about the censoring. Two of the five are literals inside
 * the module that draws a plate and one is a typed table under a caption
 * calling it "the plotted values"; those three cannot be derived from the
 * seed, so the row states them and this guard keeps the statement honest.
 *
 * The marker is chosen to carry the numbers the row reports wherever the row
 * is not derived: the substitution, the censored array and the typed table's
 * first row all include a value and a limit, so editing what the plate draws
 * fails the build rather than leaving a table describing a drawing that
 * changed underneath it. The two derived readings name their export, which is
 * all a derived row needs — its numbers are counted off the object.
 *
 * A file that cannot be read is an offence, not a skip: a guard that goes
 * quiet when its subject disappears is the shape wave 18 and wave 20 each
 * shipped once.
 */
{
  const offences = [];
  for (const r of ANALYSES.readings) {
    const file = resolve(here, r.where);
    if (!existsSync(file)) {
      offences.push(`population reading “${r.reading}”: names ${r.where}, which is not in this repository`);
      continue;
    }
    const text = readFileSync(file, 'utf8');
    if (!text.includes(r.marker)) {
      offences.push(`population reading “${r.reading}”: ${r.where} no longer contains ${JSON.stringify(r.marker)} — re-measure the row before the table describes something that has changed`);
      continue;
    }
    /*
     * W21-A-3. The marker proved a substring existed and nothing else, so a
     * value could be added to or deleted from the very array a row counts and
     * the build stayed green while the row went on declaring the old number.
     * That is the third time a guard here has checked the cheaper half of its
     * own claim — a whole-file match in wave 18, a nested bullet in wave 20,
     * and now presence standing in for arithmetic.
     *
     * Where a row names an array literal, the elements are counted at the
     * marker and compared with the number the row reports. `countAt` is the
     * source of truth the row is describing; a row that names no array **must**
     * say so with `counts: false`, and the guard refuses a row declaring
     * neither. The opt-out was described here before it existed, and a comment
     * asserting a check that is not written is how W21-A-7 passed in silence.
     */
    const lengthAt = (needle) => {
      const at = text.indexOf(needle);
      if (at < 0) return null;
      const open = text.indexOf('[', at);
      const close = text.indexOf(']', open);
      if (open < 0 || close < 0) return null;
      return text.slice(open + 1, close).split(',').filter((v) => v.trim() !== '').length;
    };
    /* The marker names the censored array on a figure-local reading, so it
     * carries a number the row reports and is counted too. Both halves of the
     * row are then measured rather than one. */
    if (!r.countAt && r.counts !== false) {
      offences.push(`population reading “${r.reading}”: declares neither an array to count nor counts: false — a reading that cannot be measured has to say so`);
    }
    if (r.countAt) {
      const detects = lengthAt(r.countAt);
      const censored = lengthAt(r.marker);
      if (detects === null) {
        offences.push(`population reading “${r.reading}”: ${JSON.stringify(r.countAt)} in ${r.where} is no longer an array literal`);
      } else if (censored === null) {
        offences.push(`population reading “${r.reading}”: ${JSON.stringify(r.marker)} in ${r.where} is no longer an array literal`);
      } else {
        if (censored !== r.censored) offences.push(`population reading “${r.reading}”: the array at ${JSON.stringify(r.marker)} holds ${censored} values, the row reports ${r.censored} censored`);
        if (detects + censored !== r.n) offences.push(`population reading “${r.reading}”: ${r.where} holds ${detects} detects and ${censored} censored, which is ${detects + censored}, and the row reports ${r.n}`);
      }
    }
  }
  if (offences.length) {
    for (const o of offences) console.error(o);
    process.exit(1);
  }
  console.log(`population readings: ${ANALYSES.readings.length} located, ${ANALYSES.counts.censoredAnswers} answers about the censoring`);
}

/*
 * The partition check the 23 August view never had, run before anything is
 * written: every screen in exactly one group, no id that is not a screen.
 */
{
  const seen = new Map();
  for (const sec of SECTION_VIEW) for (const id of sec.ids) seen.set(id, (seen.get(id) ?? 0) + 1);
  const dupes = [...seen].filter(([, n]) => n > 1).map(([id]) => id);
  const ghosts = [...seen.keys()].filter((id) => !labelOf[id]);
  const unowned = ALL.map((s) => s.id).filter((id) => !seen.has(id));
  if (dupes.length || ghosts.length || unowned.length) {
    if (dupes.length) console.error(`by-section: listed twice: ${dupes.join(', ')}`);
    if (ghosts.length) console.error(`by-section: not a screen: ${ghosts.join(', ')}`);
    if (unowned.length) console.error(`by-section: no section owns: ${unowned.join(', ')}`);
    process.exit(1);
  }
}

/* ==================================================================== *
 * The rail — the catalogue, and the switch to the product's own IA
 * ==================================================================== */

/**
 * The dot shows the *current* state (`now`, re-derived 1 Sep 2026); the title
 * carries the 23 Aug state where it differs, so the third pass's finding stays
 * one hover away rather than being erased by the fourth.
 *
 * A screen added *after* 23 August has no `state` at all, deliberately — the
 * field is that day's record and inventing one for a screen that did not exist
 * would be the retro-edit §5.2 forbids. Such a screen hovers "added <date>"
 * from its `added` field. Reading `s.state` blindly here printed
 * `was “undefined” on 23 Aug 2026`, which is the shape of the bug this whole
 * two-field arrangement exists to avoid.
 */
const DAY = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m - 1]} ${y}`;
};

const screenButton = (s) => {
  const cur = s.now ?? s.state;
  const hist = !s.state
    ? `${cur} — added ${DAY(s.added)}`
    : s.now && s.now !== s.state
      ? `${cur} — was “${s.state}” on 23 Aug 2026`
      : cur;
  return (
    `<li data-label="${esc(s.label.toLowerCase())}" data-state="${esc(cur)}">` +
    `<button class="mk-rail__screen" type="button" data-target="${s.id}" aria-current="false">` +
    `<span class="mk-dot mk-dot--${STATE_TONE[cur]}" title="${esc(hist)}"></span>` +
    `<span>${esc(s.label)}</span>` +
    (s.isNew ? '<span class="mk-rail__new" title="Added in the third pass">NEW</span>' : '') +
    (s.added ? '<span class="mk-rail__new" title="Added in the fourth pass">NEW·4</span>' : '') +
    '</button></li>'
  );
};

function rail() {
  const byJob = JOBS.map(
    (job) =>
      `<div class="mk-rail__job" data-mode="job"><div class="mk-rail__jobhead">` +
      `<span class="mk-rail__jobn">${esc(job.n)}</span>` +
      `<span class="mk-rail__jobtitle">${esc(job.title)}</span></div>` +
      `<p class="mk-rail__who">${esc(job.who)} · ${job.screens.length} screens</p>` +
      `<ul class="mk-rail__list">${job.screens.map(screenButton).join('')}</ul></div>`,
  ).join('');

  const bySection = SECTION_VIEW.map((sec) => {
    const items = sec.ids.map((id) => ALL.find((s) => s.id === id)).filter(Boolean);
    return (
      `<div class="mk-rail__job" data-mode="section" hidden><div class="mk-rail__jobhead">` +
      `<span class="mk-rail__jobtitle">${esc(sec.label)}</span></div>` +
      `<p class="mk-rail__who">${esc(sec.lede)}</p>` +
      `<ul class="mk-rail__list">${items.map(screenButton).join('')}</ul></div>`
    );
  }).join('');

  const azItems = [...ALL].sort((a, b) => a.label.localeCompare(b.label));
  const byAz =
    '<div class="mk-rail__job" data-mode="az" hidden><div class="mk-rail__jobhead">' +
    `<span class="mk-rail__jobtitle">All screens, A to Z</span></div>` +
    `<p class="mk-rail__who">${azItems.length} screens</p>` +
    `<ul class="mk-rail__list">${azItems.map(screenButton).join('')}</ul></div>`;

  /*
   * The legend lists what the dots can currently show, and nothing else. It
   * was a hand-kept list of four states, two of which ("engine-only", "not
   * built") the dots stopped rendering when they moved to `now` on 1 Sep and
   * one of which ("shipped (CLI)") they render and it never listed (W1-A-8).
   * Derived from the register's own values, in STATE_MEANING's order, so a
   * state that appears or disappears in a later pass takes the legend with it;
   * a value with no meaning written for it fails the build rather than
   * rendering unexplained. The two historical states are one hover away, which
   * the closing line says.
   */
  const STATE_MEANING = {
    shipped: 'shipped — works in a browser today',
    'shipped (CLI)': 'shipped (CLI) — operated from a terminal today',
    'engine-only': 'engine-only — tested code, no screen',
    'not built': 'not built at all',
    proposed: 'proposed — not in the requirements',
  };
  const present = new Set(ALL.map((s) => s.now ?? s.state));
  const unexplained = [...present].filter((state) => !STATE_MEANING[state]);
  if (unexplained.length) {
    console.error(`rail legend: no meaning written for state(s): ${unexplained.join(', ')}`);
    process.exit(1);
  }
  const legendStates = Object.keys(STATE_MEANING).filter((state) => present.has(state));
  // Two states can wear one tone, and today two do: a legend that lists them
  // as separate keys while drawing the same dot is a legend that lies quietly.
  const shared = legendStates.filter((s) => legendStates.some((o) => o !== s && STATE_TONE[o] === STATE_TONE[s]));
  const hover = 'over any dot for its state, and for the 23 August state where that differs.';
  const note = shared.length > 1 ? `${shared.slice(0, -1).join(', ')} and ${shared.at(-1)} share a dot — h${hover}` : `H${hover}`;
  const key =
    legendStates
      .map((state) => `<div><span class="mk-dot mk-dot--${STATE_TONE[state]}"></span><span>${esc(STATE_MEANING[state])}</span></div>`)
      .join('') +
    `<div class="mk-rail__keynote">${esc(note)}</div>`;

  return (
    '<nav class="mk-rail" aria-label="Screens">' +
    '<div class="mk-rail__brand"><div class="mk-rail__name">Strataflow</div>' +
    `<div class="mk-rail__sub">Complete UI mockup · ${ALL.length} screens across ${JOBS.length} jobs<br>` +
    `${esc(PROJECT.code)} — ${esc(PROJECT.name)}</div></div>` +
    '<div class="mk-rail__tools">' +
    '<div class="mk-rail__seg" role="group" aria-label="Group screens by">' +
    '<button type="button" data-mode="job" aria-pressed="true">By job</button>' +
    '<button type="button" data-mode="section" aria-pressed="false">By section</button>' +
    '<button type="button" data-mode="az" aria-pressed="false">A–Z</button>' +
    '</div>' +
    '<input class="mk-rail__find" type="search" id="mk-find" placeholder="Filter screens…  press /" aria-label="Filter screens">' +
    '</div>' +
    byJob + bySection + byAz +
    '<p class="mk-rail__empty" id="mk-rail-empty" hidden>No screen matches that. The catalogue holds registers, detail pages and workspaces — try “licence”, “quarantine” or “lineage”.</p>' +
    `<div class="mk-rail__key">${key}` +
    '<div style="margin-top:.6rem"><span class="mk-rail__new">NEW</span><span>added in the third pass</span></div>' +
    '<div style="margin-top:.3rem"><span class="mk-rail__new">NEW·4</span><span>added in the fourth pass</span></div>' +
    '</div></nav>'
  );
}

/* ==================================================================== *
 * The product's own chrome
 * ==================================================================== */

function topBar() {
  return (
    '<div class="mk-top">' +
    '<span class="mk-top__mark">Strataflow</span>' +
    '<button class="mk-switch-proj" type="button" data-target="projects" aria-haspopup="menu">' +
    `<span class="mk-switch-proj__code">${esc(PROJECT.code)}</span>` +
    `<span class="mk-switch-proj__role">${esc(PRINCIPAL.roleBinding.split(' · ')[0])}</span>` +
    '<span class="mk-switch-proj__caret" aria-hidden="true">▾</span></button>' +
    '<div class="mk-search"><span class="mk-search__glyph" aria-hidden="true">⌕</span>' +
    '<input type="search" placeholder="Find a bore, certificate, licence…" aria-label="Search" data-target="search">' +
    '<span class="mk-search__kbd">/</span></div>' +
    '<span class="mk-top__spacer"></span>' +
    '<a class="mk-top__link" href="#home">What needs me</a>' +
    '<a class="mk-top__link" href="#coverage">Across projects</a>' +
    '<button class="mk-top__link" type="button" data-palette>⌘K</button>' +
    '<a class="mk-top__link" href="#assistance" title="Keyboard shortcuts and help">?</a>' +
    '<span class="mk-top__me">' +
    `<span class="mk-top__avatar" aria-hidden="true">AN</span>` +
    `<span>${esc(PRINCIPAL.name)}</span></span>` +
    '</div>'
  );
}

const sectionStrip = (current) => {
  const sections = [
    ['Locations', 'locations'],
    ['Sampling events', 'events'],
    ['Import runs', 'imports'],
    ['Results', 'crosstab'],
    ['Exceedances', 'exceedances'],
    ['Reports', 'report'],
  ];
  return (
    '<nav class="mk-sections" aria-label="Project sections">' +
    sections
      .map(([label, target]) => {
        const on = label === current;
        return `<a class="mk-section${on ? ' mk-section--current' : ''}" href="#${target}"${on ? ' aria-current="page"' : ''}>${esc(label)}</a>`;
      })
      .join('') +
    '</nav>'
  );
};

/**
 * Where this screen sits, as a path you can walk back up.
 *
 * The trail follows the product's URL spaces, not the catalogue's job
 * grouping. A job title is a heading in the rail — it is not somewhere a
 * practitioner can navigate to, and putting one in a breadcrumb makes the
 * trail a description of this document rather than of the application.
 *
 * Four spaces, and the fourth is the honest one. Project-scoped screens hang
 * off the project; instance administration hangs off the instance, which is
 * above every project; the orientation screens *are* the root and get no
 * parent at all; and `coverage`, `data-states` and `assistance` belong to the
 * viewer rather than to the product, so they say so.
 */
const ROOTS = {
  home: [],
  search: [],
  projects: [],
  'project-home': [{ label: 'Projects', target: 'projects' }],
  // Across projects (/aggregate). The space has no index screen drawn, so the
  // crumb names it without linking — an unlinked crumb is honest about a
  // parent that exists in the URL space and not as a page.
  obligations: [{ label: 'Across projects' }],
  /*
   * Wave 11. `INSTANCE_SPACE` below would have put this under `/instance`
   * alone, and the project trail would have put it under MOCK-WDL — which is
   * what it did until this entry existed, and it contradicted the screen's
   * own route line one heading away. An engagement is a record about a
   * binding, so its parent is the access register rather than the instance
   * root: two crumbs, matching `/instance/access/engagements/:engagementId`
   * exactly.
   */
  engagement: [
    { label: 'Instance', target: 'instance' },
    { label: 'Access', target: 'roles' },
  ],
  /*
   * Wave 12. The estate is the one screen in this catalogue whose parent is
   * not a space in this deployment at all, so its crumb names the vendor's
   * own space and does not link — the same honesty the `Across projects` and
   * `Configuration` crumbs already keep about a parent that exists as a place
   * and not as a page, applied to a place that is not even here. Without this
   * entry the trail would have read `Projects / MOCK-WDL — Wandalup
   * Operations / Deployment estate`, which is the exact sentence the screen
   * spends a framed notice refusing.
   */
  estate: [{ label: 'Strataflow — vendor operations' }],
};
const INSTANCE_SPACE = new Set(['instance', 'roles', 'upgrade', 'diagnostics', 'entitlement']);
// Wave 12 adds `package`: it would be a child of `/config`, which is exactly
// the relationship the other three have and exactly why they are here.
const CONFIG_SPACE = new Set(['formats', 'dictionary', 'units', 'package']);
const VIEWER_SPACE = new Set(['data-states', 'assistance', 'coverage']);

function crumbFor(s) {
  const section = SECTION_OF[s.id];
  let trail;
  if (ROOTS[s.id]) {
    trail = [...ROOTS[s.id]];
  } else if (VIEWER_SPACE.has(s.id)) {
    trail = [{ label: 'Conventions', target: 'coverage' }];
  } else if (INSTANCE_SPACE.has(s.id)) {
    trail = [{ label: 'Instance', target: 'instance' }];
  } else if (CONFIG_SPACE.has(s.id)) {
    // /config has no index route in the product, deliberately; same rule as
    // the aggregate crumb above.
    trail = [{ label: 'Configuration' }];
  } else {
    trail = [
      { label: 'Projects', target: 'projects' },
      { label: `${PROJECT.code} — ${PROJECT.name}`, target: 'project-home' },
    ];
    // The section crumb lands on that section's own register — it linked
    // every section to the crosstab until pass 4 measured the trails.
    if (section && s.id !== SECTION_REGISTER[section]) trail.push({ label: section, target: SECTION_REGISTER[section] });
  }
  trail.push({ label: s.label });
  const items = trail
    .map((c, i) =>
      i === trail.length - 1
        ? `<li class="mk-crumb__item"><span class="mk-crumb__here" aria-current="page">${esc(c.label)}</span></li>`
        : c.target
          ? `<li class="mk-crumb__item"><a class="mk-crumb__link" href="#${c.target}">${esc(c.label)}</a></li>`
          : `<li class="mk-crumb__item"><span>${esc(c.label)}</span></li>`,
    )
    .join('<li class="mk-crumb__sep" aria-hidden="true">/</li>');
  return `<nav class="mk-crumb" aria-label="Breadcrumb"><ol class="mk-crumb__list">${items}</ol></nav>`;
}

/* ==================================================================== *
 * Overlays — the lineage panel, the palette, the toaster
 * ==================================================================== */

/**
 * The lineage slide-over.
 *
 * Declared once and opened over whatever screen you are on, which is the whole
 * argument for a panel rather than a route: *why is this number what it is* is
 * asked while the number is being compared to its neighbours, and an answer
 * that costs you the comparison is a worse answer.
 */
function lineagePanel() {
  const steps = LINEAGE.chain
    .map(
      (c, i) =>
        `<li class="mk-chain__step mk-chain__step--${c.kind}">` +
        `<span class="mk-chain__n">${i + 1}</span>` +
        `<span class="mk-chain__text"><span class="mk-chain__label">${esc(c.step)}</span>` +
        `<span class="mk-chain__what">${esc(c.what)}</span>` +
        `<span class="mk-chain__detail">${esc(c.detail)}</span></span></li>`,
    )
    .join('');
  return slideOver({
    id: 'lineage-panel',
    title: `${LINEAGE.value} — ${LINEAGE.analyte}`,
    subtitle: `${esc(LINEAGE.location)} · collected ${esc(LINEAGE.collected)} · nine steps from a row in a file to a statutory notification`,
    body:
      '<p class="mk-tight" style="margin-bottom:.9rem">Every step below is a stored record rather than a reconstruction, and the whole chain answers in one query. This is the panel, and it opens over the screen you were on — you do not lose the row you were comparing it to.</p>' +
      `<ol class="mk-chain">${steps}</ol>`,
    footer:
      '<button type="button" class="mk-btn">Export this chain</button>' +
      '<a class="mk-btn" href="#lineage">Open the full page</a>' +
      '<span class="mk-muted">Read-only. Lineage is append-only at the database.</span>',
  });
}

function palette() {
  const groups = [
    {
      label: 'Go to',
      items: ALL.map((s) => ({ label: s.label, ctx: s.job.n, target: s.id })),
    },
    {
      label: 'Actions',
      items: [
        { label: 'Import a deliverable…', ctx: 'MOCK-WDL', target: 'imports' },
        { label: 'Answer outstanding review questions…', ctx: '3 on IMP-0239', target: 'import-review' },
        { label: 'Reverse a committed import…', ctx: 'opens the blast radius first', target: 'import-commit' },
        { label: 'Resolve held rows…', ctx: '3 held', target: 'quarantine' },
        { label: 'Export what is on screen…', ctx: '⌘E', target: 'crosstab' },
        // Counted from the register of bindings, not typed: it read "4" while
        // the seed held four rows, three of which had no project behind them.
        { label: 'Switch project…', ctx: `${PROJECTS.length} bindings`, target: 'projects' },
        { label: 'Show keyboard shortcuts', ctx: '?', target: 'assistance' },
      ],
    },
  ];
  const body = groups
    .map(
      (g) =>
        `<li class="mk-palette__group" data-group>${esc(g.label)}</li>` +
        g.items
          .map(
            (i) =>
              `<li data-item data-label="${esc(i.label.toLowerCase())}">` +
              `<button class="mk-palette__item" type="button" data-target="${esc(i.target)}">` +
              `<span class="mk-palette__main">${esc(i.label)}</span>` +
              `<span class="mk-palette__ctx">${esc(i.ctx)}</span></button></li>`,
          )
          .join(''),
    )
    .join('');
  return (
    '<div class="mk-palette" id="mk-palette" data-open="false" role="dialog" aria-modal="true" aria-label="Command palette">' +
    '<input class="mk-palette__input" id="mk-palette-input" type="text" placeholder="Go to a screen, or run something…" aria-label="Command">' +
    `<ul class="mk-palette__list" id="mk-palette-list">${body}</ul>` +
    '<p class="mk-palette__none" id="mk-palette-none" hidden>Nothing matches. The palette runs verbs and jumps to screens; a bore code or a certificate goes in the search box, which looks up records instead.</p>' +
    '<div class="mk-palette__foot"><span>↑↓ move</span><span>↵ open</span><span>esc close</span>' +
    '<span>Destructive verbs open their screen — they never run from here</span></div></div>'
  );
}

/* ==================================================================== *
 * Assembly
 * ==================================================================== */

function relatedStrip(id) {
  const targets = (RELATED[id] ?? []).filter((t) => labelOf[t]);
  if (targets.length === 0) return '';
  return (
    '<nav class="mk-related" aria-label="Related screens"><span class="mk-related__lede">From here</span>' +
    targets.map((t) => `<a class="mk-ref" href="#${t}">${esc(labelOf[t])}</a>`).join('') +
    '</nav>'
  );
}

const screens = ALL.map(
  (s) =>
    `<section class="mk-screen" id="${s.id}" data-active="false" aria-label="${esc(s.label)}">` +
    `<div class="sf-sheet">${crumbFor(s)}${s.body()}${relatedStrip(s.id)}</div></section>`,
).join('');

const first = ALL[0].id;

const html = `<meta charset="utf-8">
<title>Strataflow UI</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>${productCss}${CHROME_CSS}</style>
${HATCH_SPRITE}
<div class="mk-app">
${rail()}
<main class="mk-main">
<header class="mk-chrome-head">
${topBar()}
${sectionStrip('')}
</header>
<p class="mk-banner"><strong>Mockup.</strong> Drawn 23 August 2026; screen states re-derived 1 September 2026 (pass 4)
against the product's route table, which backs ${ROUTE_BACKED} of these ${ALL.length} screens. Styled by the product's own stylesheet on the
approved Instrument direction; every figure is drawn to the approved grammar. The data is fictional —
${PROJECTS.map((p) => `<code>${esc(p.code)}</code>`).join(' and ')}, on the <code>MOCK-</code> convention; the screens
draw <code>${esc(PROJECT.code)}</code>'s workspace and the cross-project surfaces draw both. The dot beside each screen in the rail is its state in the
product today (hover for the 23 August state), and <a class="mk-ref" href="#coverage">Coverage</a> says what this
catalogue is exhaustive against.</p>
<div class="mk-canvas">${screens}</div>
</main>
</div>
${lineagePanel()}
<div class="mk-scrim" id="mk-scrim" data-open="false"></div>
${palette()}
<script>
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const panels = $$('.mk-screen');
  const ids = new Set(panels.map((p) => p.id));
  const sectionOf = ${JSON.stringify(SECTION_OF)};

  /* ---- showing a screen ---- */
  function show(id) {
    panels.forEach((p) => p.setAttribute('data-active', String(p.id === id)));
    $$('.mk-rail__screen').forEach((b) => b.setAttribute('aria-current', String(b.dataset.target === id)));
    const sec = sectionOf[id];
    $$('.mk-section').forEach((a) => {
      const on = a.textContent === sec;
      a.classList.toggle('mk-section--current', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
    /*
     * Where the top of the document is depends on the layout. Above 900px the
     * rail is a column beside the canvas and scrollY 0 shows the screen. At or
     * below it the rail is a 100vh block stacked *above* the canvas, so
     * scrollY 0 shows the catalogue and the screen you asked for sits ~1185px
     * below the fold — every hop of the 375px journey walk landed on the rail
     * (W1-A-3). Narrow, scroll to the screen; wide, scroll to the top.
     *
     * Twice either way: once now, and once after the browser has finished its
     * own jump to the anchor, which runs after this handler on a cold load
     * with a hash and would otherwise undo this.
     */
    const narrow = window.matchMedia('(max-width: 900px)').matches;
    const bring = () => {
      if (!narrow) { window.scrollTo({ top: 0 }); return; }
      const panel = panels.find((p) => p.id === id);
      if (!panel) return;
      // Less the sticky chrome, or the screen's own title lands underneath it.
      const head = $('.mk-chrome-head');
      const under = head && getComputedStyle(head).position === 'sticky' ? head.getBoundingClientRect().height : 0;
      window.scrollTo({ top: window.scrollY + panel.getBoundingClientRect().top - under - 8 });
    };
    bring();
    requestAnimationFrame(bring);
    closeOverlays();
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-target]');
    if (b && ids.has(b.dataset.target)) { e.preventDefault(); show(b.dataset.target); return; }
    const a = e.target.closest('a[href^="#"]');
    if (a && ids.has(a.getAttribute('href').slice(1))) { e.preventDefault(); show(a.getAttribute('href').slice(1)); }
  });
  window.addEventListener('hashchange', () => { const id = location.hash.slice(1); if (ids.has(id)) show(id); });

  /* ---- rail: grouping mode and live filter ---- */
  const modeButtons = $$('.mk-rail__seg button');
  modeButtons.forEach((b) => b.addEventListener('click', () => {
    modeButtons.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    $$('.mk-rail__job').forEach((g) => { g.hidden = g.dataset.mode !== b.dataset.mode; });
    applyFilter();
  }));

  const find = $('#mk-find');
  const railEmpty = $('#mk-rail-empty');
  function applyFilter() {
    const q = (find.value || '').trim().toLowerCase();
    const mode = $('.mk-rail__seg button[aria-pressed="true"]').dataset.mode;
    let shown = 0;
    $$('.mk-rail__job').forEach((g) => {
      if (g.dataset.mode !== mode) { g.hidden = true; return; }
      let any = 0;
      $$('li[data-label]', g).forEach((li) => {
        const hit = !q || li.dataset.label.includes(q);
        li.hidden = !hit;
        if (hit) any++;
      });
      g.hidden = any === 0;
      shown += any;
    });
    railEmpty.hidden = shown > 0;
  }
  find.addEventListener('input', applyFilter);

  /* ---- slide-over ---- */
  const scrim = $('#mk-scrim');
  function openSlide(id) {
    const el = document.getElementById(id);
    if (!el) return;
    restoreFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    el.setAttribute('data-open', 'true');
    scrim.setAttribute('data-open', 'true');
    $('[data-slideclose]', el)?.focus();
  }
  /**
   * Close whatever is in front, and give focus back.
   *
   * The blur is not tidiness. Without it the palette's input keeps focus after
   * the palette is hidden, so every subsequent keystroke is read as typing and
   * the whole keyboard contract silently stops working — and focus is sitting
   * on an element nobody can see, which is the worse half of the bug.
   */
  let restoreFocusTo = null;
  function closeOverlays() {
    const wasOpen = $('#mk-palette').dataset.open === 'true' || $$('.mk-slide').some((s) => s.dataset.open === 'true');
    $$('.mk-slide').forEach((s) => s.setAttribute('data-open', 'false'));
    scrim.setAttribute('data-open', 'false');
    $('#mk-palette').setAttribute('data-open', 'false');
    if (!wasOpen) return;
    if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
    if (restoreFocusTo && document.contains(restoreFocusTo)) restoreFocusTo.focus();
    restoreFocusTo = null;
  }
  document.addEventListener('click', (e) => {
    const open = e.target.closest('[data-slideover]');
    if (open) { e.preventDefault(); openSlide(open.dataset.slideover); }
    if (e.target.closest('[data-slideclose]') || e.target === scrim) closeOverlays();
  });

  /* ---- command palette ---- */
  const pal = $('#mk-palette');
  const palInput = $('#mk-palette-input');
  const palNone = $('#mk-palette-none');
  function openPalette() {
    restoreFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    pal.setAttribute('data-open', 'true');
    scrim.setAttribute('data-open', 'true');
    palInput.value = '';
    filterPalette();
    palInput.focus();
  }
  function filterPalette() {
    const q = palInput.value.trim().toLowerCase();
    let shown = 0;
    $$('li[data-item]', pal).forEach((li) => {
      const hit = !q || li.dataset.label.includes(q);
      li.hidden = !hit;
      if (hit) shown++;
    });
    $$('li[data-group]', pal).forEach((g) => {
      let n = 0, el = g.nextElementSibling;
      while (el && el.hasAttribute('data-item')) { if (!el.hidden) n++; el = el.nextElementSibling; }
      g.hidden = n === 0;
    });
    palNone.hidden = shown > 0;
    markActive(0);
  }
  function visibleItems() { return $$('li[data-item]', pal).filter((li) => !li.hidden); }
  function markActive(i) {
    const items = visibleItems();
    items.forEach((li, n) => li.firstElementChild.setAttribute('data-active', String(n === i)));
    items[i]?.firstElementChild.scrollIntoView({ block: 'nearest' });
  }
  palInput.addEventListener('input', filterPalette);
  palInput.addEventListener('keydown', (e) => {
    const items = visibleItems();
    const at = items.findIndex((li) => li.firstElementChild.dataset.active === 'true');
    if (e.key === 'ArrowDown') { e.preventDefault(); markActive(Math.min(at + 1, items.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); markActive(Math.max(at - 1, 0)); }
    if (e.key === 'Enter') { e.preventDefault(); items[at]?.firstElementChild.click(); }
  });
  $$('[data-palette]').forEach((b) => b.addEventListener('click', openPalette));

  /* ---- the keyboard contract, as far as one document can honour it ---- */
  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? '');
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); return; }
    if (e.key === 'Escape') { closeOverlays(); return; }
    if (typing) return;
    if (e.key === '/') { e.preventDefault(); find.focus(); find.select(); }
    if (e.key === '?') { e.preventDefault(); show('assistance'); }
    if (e.key.toLowerCase() === 'l') openSlide('lineage-panel');
  });

  const initial = location.hash.slice(1);
  const initialId = ids.has(initial) ? initial : ${JSON.stringify(first)};
  show(initialId);
  /*
   * And once more when the document is done. Traced on a cold load at 375px:
   * both scrolls in show() run while readyState is "loading", and the
   * browser's own jump to the anchor lands at "complete" — after them — so it
   * is the last word and it puts the section's top under the sticky chrome.
   * A third pass, only for the screen the URL asked for, is what makes the
   * screen's own heading the first thing read.
   */
  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => { if (location.hash.slice(1) === initialId) show(initialId); }, { once: true });
  }
})();
</script>`;

/*
 * The same ban, applied to what a reader actually sees.
 *
 * The route-line check at the top of this file reads `screens.mjs` source, and
 * the wave-1 audit found the one sentence it could never reach: a present-tense
 * "most of what is drawn here is tested library code with no route" inside a
 * panel on `#coverage`, still being rendered eight days after the register
 * stopped saying it (W1-A-2). Prose rots exactly where the check is not.
 *
 * So the rendered document is split on screen boundaries and read as text.
 * Stripping the tags takes the attributes with them, which is the point: the
 * rail's dated hover titles — `title="shipped — was “engine-only” on 23 Aug
 * 2026"` — are the third pass's finding kept deliberately (§5.2) and are not
 * body prose. Each chunk is cut at its own closing tag, so the inline script is
 * out of scope; were something to close a `<section>` after the canvas, the cut
 * would over-include and this check would fail loudly rather than quietly stop
 * covering a screen.
 *
 * The list holds phrases that can only assert a *current* state. A dated
 * sentence about August is the record this project keeps on purpose, so
 * "engine-only" is banned bare and survives in a hover title; a phrase like
 * "no route" is banned only in the present-tense forms that make a claim.
 */
{
  /*
   * W3-A-2: "no route" is banned in every phrasing now, not only the three
   * present-tense forms the first version listed — the chain-of-custody
   * screen's "there is no route for one" slipped past on wording alone. A
   * `proposed` screen is exempt from the route phrases only: its argument
   * *requires* stating what the product lacks, and the exemption dissolves
   * the day the register flips the screen to shipped, which is exactly when
   * that sentence starts to rot.
   */
  const banned = [/engine-only/i, /renders nowhere/i, /tested library code with no route/i, /no (?:product )?route\b/i, /nothing renders/i];
  const routeOnly = new Set([3]);
  const proposed = new Set(ALL.filter((s) => (s.now ?? s.state) === 'proposed').map((s) => s.id));
  const chunks = html.split('<section class="mk-screen"').slice(1);
  const offences = [];
  for (const chunk of chunks) {
    const id = chunk.match(/^ id="([^"]+)"/)?.[1] ?? '(unidentified screen)';
    const body = chunk.slice(0, chunk.lastIndexOf('</section>'));
    const text = body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
    banned.forEach((re, i) => {
      if (routeOnly.has(i) && proposed.has(id)) return;
      const hit = text.match(re);
      if (hit) offences.push(`#${id}: body prose carries a state claim: “${hit[0]}”`);
    });
  }
  if (chunks.length !== ALL.length) offences.push(`screen prose check saw ${chunks.length} sections, not ${ALL.length}`);
  if (offences.length) {
    for (const o of offences) console.error(o);
    process.exit(1);
  }
}

/*
 * Wave 18 — the seventh enumeration, checked against the document it enumerates.
 *
 * `#coverage` claims the vendor requirements brief is reconciled row by row.
 * That claim is worth exactly as much as the check behind it, and the other six
 * enumerations are checked by hand against documents this repository does not
 * hold. This one is different: the brief is committed here (decision D12), so
 * the build reads it and fails on drift in either direction.
 *
 * Five things are checked, and each of them is a way the table could quietly
 * stop being closed:
 *
 *   1. Every `### N.M` heading from §4.2 to §14.4 has exactly one row, and
 *      every such row has a heading — with the heading's own title on it.
 *   2. Every `### Scenario X` heading has exactly one row.
 *   3. §15's, §17's and §20's bullet lists are the lineage, state and
 *      completion rows, in order and word for word.
 *   4. Every row's quoted `asks` appears verbatim in the brief. A paraphrase
 *      that drifted would otherwise read as the brief's own words.
 *   5. Every `items` count is the number of bullets that subsection actually
 *      lists, and §3's priority table is the priority map.
 *
 * Normalisation strips markdown emphasis, folds the apostrophe this catalogue
 * types to the one the brief types, and collapses whitespace. Nothing else:
 * a check that normalised harder would start passing paraphrases.
 */
{
  const BRIEF = [resolve(here, 'VENDOR_REQUIREMENTS.md'), resolve(here, '../../VENDOR_REQUIREMENTS.md')].find(existsSync);
  const offences = [];
  if (!BRIEF) {
    offences.push('VENDOR_REQUIREMENTS.md is not readable, so the seventh enumeration cannot be checked against its source');
  } else {
    const md = readFileSync(BRIEF, 'utf8');
    const norm = (v) => String(v).replace(/\*\*/g, '').replace(/’/g, "'").replace(/\s+/g, ' ').trim();
    const flat = norm(md);

    /* Heading and bullet inventory, taken from the file rather than described. */
    const lines = md.split('\n');
    const subsections = [];
    let cur = null;
    for (const line of lines) {
      const h = line.match(/^### (.+)$/);
      if (h) { cur = { heading: h[1].trim(), bullets: 0, lines: [] }; subsections.push(cur); continue; }
      if (/^## /.test(line)) cur = null;
      /* W20-A-2. This matched `^- ` only, so an indented bullet was invisible
       * to the count and to both closure limbs — which falsified the comment
       * below it, since a dimension the brief nested could go unmeasured. A
       * bullet is a bullet at any depth. */
      if (cur && /^\s*- /.test(line)) cur.bullets += 1;
      if (cur) cur.lines.push(line);
    }
    const numbered = subsections.filter((x) => /^\d+\.\d+ /.test(x.heading)).map((x) => ({
      id: x.heading.slice(0, x.heading.indexOf(' ')),
      title: x.heading.slice(x.heading.indexOf(' ') + 1),
      bullets: x.bullets,
      text: norm(x.lines.join(' ')),
      /* Wave 20 keeps the raw lines so §4.2's and §4.4's own bullet lists can
       * be compared item by item, not only counted. */
      lines: x.lines,
    }));
    const scenarios = subsections.filter((x) => x.heading.startsWith('Scenario '));

    /* Bullet lists that are rows in their own right. */
    const bulletsOf = (from, to) => {
      const start = lines.findIndex((l) => l.startsWith(from));
      const end = lines.findIndex((l, i) => i > start && l.startsWith(to));
      return lines.slice(start, end).filter((l) => /^\s*- /.test(l)).map((l) => norm(l.replace(/^\s*- /, '')));
    };

    const expectedRequirement = numbered.filter((x) => x.id !== '4.1');
    const rows = VENDOR_BRIEF.rows;
    const of = (g) => rows.filter((r) => r.group === g);

    const compare = (what, expected, actual) => {
      const missing = expected.filter((x) => !actual.includes(x));
      const extra = actual.filter((x) => !expected.includes(x));
      if (missing.length) offences.push(`${what}: no row for ${missing.join(', ')}`);
      if (extra.length) offences.push(`${what}: row with no source for ${extra.join(', ')}`);
    };

    compare('brief subsections', expectedRequirement.map((x) => x.id), of('requirement').map((r) => r.id));
    compare('brief scenarios', scenarios.map((x) => x.heading), of('scenario').map((r) => r.title));

    for (const r of of('requirement')) {
      const src = numbered.find((x) => x.id === r.id);
      if (!src) continue;
      if (src.title !== r.title) offences.push(`§${r.id}: title reads “${r.title}”, the brief’s heading reads “${src.title}”`);
      if ((r.items ?? 0) !== src.bullets) offences.push(`§${r.id}: enumerates ${src.bullets} items in the brief, the row says ${r.items ?? 0}`);
    }

    const listRows = [
      ['§15 lineage questions', bulletsOf('## 15.', '## 16.'), of('lineage')],
      ['§17 screen states', bulletsOf('## 17.', '## 18.'), of('state')],
      ['§20 completion criteria', bulletsOf('## 20.', '## 21.'), of('completion')],
    ];
    for (const [what, bullets, list] of listRows) {
      if (bullets.length !== list.length) offences.push(`${what}: the brief lists ${bullets.length}, the enumeration holds ${list.length}`);
      bullets.forEach((b, i) => {
        if (list[i] && norm(list[i].asks) !== b) offences.push(`${what} #${i + 1}: row reads “${norm(list[i].asks)}”, the brief reads “${b}”`);
      });
    }

    /*
     * Wave 20 — the explorer's two lists, closed against the brief in both
     * directions and **in order**.
     *
     * `#coverage` closes the brief section by section; `#explorer` is built on
     * two of the brief's own enumerations — §4.2's 43 dimensions and §4.4's
     * six representations — and a screen that measured 43 things against a
     * list of 43 things it typed itself would be checking its own homework.
     * So the names are compared word for word with the bullets they claim to
     * be, in sequence, and the group headings with §4.2's own subheadings.
     * A dimension the brief adds cannot go unmeasured, one it drops cannot
     * linger, and neither can be silently reordered into a different reading.
     */
    const linesIn = (id) => numbered.find((x) => x.id === id)?.lines ?? [];
    const inOrder = (what, expected, actual) => {
      compare(what, expected, actual);
      /* Only when the two hold the same members: a rename is a membership
       * failure and reporting it twice would make one defect look like two. */
      const sameMembers = expected.length === actual.length && expected.every((x) => actual.includes(x));
      if (sameMembers && expected.join(' | ') !== actual.join(' | ')) {
        offences.push(`${what}: same members, different order from the brief`);
      }
    };
    const bulletsIn = (id) => linesIn(id).filter((l) => /^\s*- /.test(l)).map((l) => norm(l.replace(/^\s*- /, '')));
    inOrder('§4.2 dimensions', bulletsIn('4.2'),
      EXPLORER.dimensions.map((d) => norm(d.name)));
    inOrder('§4.2 dimension groups', linesIn('4.2').filter((l) => /^#### /.test(l)).map((l) => norm(l.slice(5))),
      EXPLORER.GROUPS.map(norm));
    inOrder('§4.4 representations', bulletsIn('4.4'),
      EXPLORER.representations.map((r) => norm(r.name)));

    /*
     * Wave 21 — §9.3's seven forms and §9.4's ten measures, closed the same way.
     *
     * The two lists this wave is built on are enumerations in the brief exactly
     * as §4.2's dimensions are, and wave 20's audit made the finding that
     * matters here: **a guard that covers some of a wave's lists is a guard
     * whose gap is the interesting one**, because the uncovered list is the one
     * nobody thought of as a list. Both are compared with the brief's own
     * bullets word for word and in sequence, in both directions, so a form the
     * brief adds cannot go undrawn and a measure it drops cannot linger as a
     * statistic this catalogue supplies for nobody.
     *
     * `bulletsIn` matches `^\s*- ` (W20-A-2), so a nested bullet under either
     * heading is seen rather than skipped.
     */
    inOrder('§9.3 hydrochemical forms', bulletsIn('9.3'), ANALYSES.FORMS.map(norm));
    inOrder('§9.4 statistical measures', bulletsIn('9.4'), ANALYSES.MEASURES.map(norm));

    /*
     * W20-A-1. §4.2 and §4.4 were closed against the brief and §4.3's terms
     * were not, so deleting a term from the scenario left the build green and
     * every derived count re-read without a murmur — including the wave's own
     * headline, which would have dropped from one not-expressible term to
     * none. The scenario is a single sentence rather than a list, so it closes
     * by splitting the brief's own arrow-separated sentence, which is where
     * the terms came from in the first place.
     */
    const scenarioSentence = linesIn('4.3').find((l) => l.includes('→'));
    if (!scenarioSentence) {
      offences.push('§4.3: the brief no longer carries an arrow-separated scenario, and the walk is built on one');
    } else {
      const terms = norm(scenarioSentence.replace(/^>\s*\*\*|\*\*$/g, '')).split('→').map((t) => norm(t));
      inOrder('§4.3 scenario terms', terms, EXPLORER.scenario.terms.map((w) => norm(w.term)));
    }

    /*
     * W18-A-1. This asked whether the quoted words were anywhere in the brief,
     * which catches a paraphrase and misses a misattribution: a row could quote
     * a different section's sentence verbatim and pass, which is a matrix row
     * that has stopped tracing. The slice each row belongs to is already taken
     * above for the bullet counts, so the check narrows to it rather than
     * gaining a second mechanism. The §15/§17/§20 rows are matched word for
     * word against their own lists further up and fall back to the whole file.
     */
    const sliceFor = (r) =>
      r.group === 'requirement' ? numbered.find((x) => x.id === r.id)?.text
      : r.group === 'scenario' ? subsections.find((x) => x.heading === r.title)?.lines.join(' ') && norm(subsections.find((x) => x.heading === r.title).lines.join(' '))
      : null;

    for (const r of rows) {
      const slice = sliceFor(r);
      const where = slice ?? flat;
      if (!where.includes(norm(r.asks))) {
        offences.push(slice
          ? `row ${r.id}: its quoted words are not in §${r.id} of the brief — “${norm(r.asks)}”`
          : `row ${r.id}: its quoted words are not in the brief — “${norm(r.asks)}”`);
      }
      /* A note that kept its placeholder is a denominator that never arrived. */
      if (r.note.includes('{items}')) offences.push(`row ${r.id}: its note still carries an unfilled {items} placeholder`);
    }

    /* §3's ranking table, against the priority map the rows are keyed on. */
    const ranked = [...md.matchAll(/^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*(P0|P1|P2|P1\/P2|Strategic)\s*\|/gm)];
    if (ranked.length !== Object.keys(VENDOR_BRIEF.PRIORITY).length) {
      offences.push(`§3 ranks ${ranked.length} capability areas, the priority map holds ${Object.keys(VENDOR_BRIEF.PRIORITY).length}`);
    }
    for (const [, rank, area, priority] of ranked) {
      const section = Number(rank) + 3;
      if (VENDOR_BRIEF.PRIORITY[section] !== priority) offences.push(`§${section}: the brief ranks it ${priority}, the enumeration says ${VENDOR_BRIEF.PRIORITY[section]}`);
      if (VENDOR_BRIEF.AREAS[section] !== area) offences.push(`§${section}: the brief calls it “${area}”, the enumeration says “${VENDOR_BRIEF.AREAS[section]}”`);
    }
  }
  if (offences.length) {
    for (const o of offences) console.error(o);
    process.exit(1);
  }
  console.log(`vendor brief: ${VENDOR_BRIEF.rows.length} rows closed against ${VENDOR_BRIEF.source}`);
}

writeFileSync(OUT, html, 'utf8');

const byState = {};
const byNow = {};
for (const s of ALL) {
  // A screen added after 23 August is not in the 23 August derivation. It has
  // no `state` and counting it under `undefined` would put a screen that did
  // not exist into a census of what did.
  if (s.state) byState[s.state] = (byState[s.state] ?? 0) + 1;
  const cur = s.now ?? s.state;
  byNow[cur] = (byNow[cur] ?? 0) + 1;
}
const added = ALL.filter((s) => s.isNew).length;
const added4 = ALL.filter((s) => s.added).length;
const stated = ALL.filter((s) => s.state).length;
const anchors = (html.match(/href="#/g) ?? []).length;

console.log(`index.html · ${ALL.length} screens across ${JOBS.length} jobs · ${(html.length / 1024).toFixed(0)} KB`);
console.log(`23 Aug 2026 · ${Object.entries(byState).map(([k, v]) => `${k}: ${v}`).join(' · ')} · ${ALL.length - stated} drawn since`);
console.log(` 1 Sep 2026 · ${Object.entries(byNow).map(([k, v]) => `${k}: ${v}`).join(' · ')}`);
console.log(`${added} added in pass 3 · ${added4} added in pass 4 · ${anchors} anchors`);

/* The two invariants the first build got wrong, checked rather than claimed. */
const dangling = Object.entries(RELATED).flatMap(([from, tos]) => tos.filter((t) => !labelOf[t]).map((t) => `${from} → ${t}`));
/*
 * And a third, added by pass 4 after it caught two dead links the RELATED
 * check could never see: every in-document href must land on a screen. The
 * RELATED graph is the declared architecture; hrefs written inline in screen
 * bodies and tables are the undeclared one, and they rot separately.
 */
const knownAnchors = new Set([...Object.keys(labelOf), 'lineage-panel']);
const deadHrefs = [...new Set([...html.matchAll(/href="#([a-z0-9-]+)"/g)].map((m) => m[1]))].filter((t) => !knownAnchors.has(t));
const noExit = ALL.filter((s) => (RELATED[s.id] ?? []).length === 0).map((s) => s.id);
const pointedAt = new Set(Object.values(RELATED).flat());
const orphans = ALL.filter((s) => !pointedAt.has(s.id)).map((s) => s.id);
if (dangling.length) console.error(`dangling: ${dangling.join(', ')}`);
if (noExit.length) console.error(`no exit: ${noExit.join(', ')}`);
if (orphans.length) console.error(`nothing points at: ${orphans.join(', ')}`);
if (deadHrefs.length) console.error(`dead hrefs: ${deadHrefs.map((t) => `#${t}`).join(', ')}`);
if (dangling.length || noExit.length || orphans.length || deadHrefs.length) {
  process.exitCode = 1; // a failed check that exits 0 is a claim, not a check
} else {
  console.log('link graph: no dangling targets, no dead ends, no orphans, no dead hrefs');
}
