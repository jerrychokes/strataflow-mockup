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
import { LINEAGE, PRINCIPAL, PROJECT, PROJECTS } from './seed.mjs';

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

/**
 * The product's own six sections, and which drawn screens fall inside each.
 *
 * This mirrors `app/navigation/ia.ts` rather than restating it — that module
 * is the source of truth and this is a viewer affordance. The `—` group at the
 * end is the honest remainder: eighteen screens that belong to no section of
 * the shipped architecture, which is itself a finding. Configuration and
 * instance administration have no home in an IA built around the sequence of
 * fieldwork, and pretending otherwise by filing them under `Reports` would
 * hide exactly the gap this view exists to show.
 */
const SECTION_VIEW = [
  { label: 'Home and across projects', lede: 'Where a session starts', ids: ['home', 'search', 'projects', 'project-home'] },
  { label: 'Locations', lede: 'Step 1 — the bores and their survey history', ids: ['locations', 'location', 'facility'] },
  { label: 'Sampling events', lede: 'Step 2 — each round of collection', ids: ['events', 'field-capture', 'programme'] },
  { label: 'Import runs', lede: 'Step 3 — deliverables as they arrive', ids: ['imports', 'import-review', 'import-commit', 'quarantine', 'certificate', 'migration'] },
  { label: 'Results', lede: 'Step 4 — every result by analyte and location', ids: ['crosstab', 'result-detail', 'qc', 'consistency', 'validation', 'qualifiers', 'hydrograph', 'hydrochem', 'statistics', 'map', 'saved-views'] },
  { label: 'Exceedances', lede: 'Step 5 — where a result sits outside a criterion', ids: ['exceedances', 'tarp', 'alerts', 'notification'] },
  { label: 'Reports', lede: 'Step 6 — submission-quality documents', ids: ['report', 'report-figures', 'narrative', 'snapshot', 'submissions', 'signoff', 'obligations', 'licence'] },
  { label: 'No section owns these', lede: 'Configuration, provenance and the instance itself — the architecture has no place for any of it', ids: ['lineage', 'audit', 'supersession', 'documents', 'project-settings', 'criteria', 'formats', 'mapping-profiles', 'dictionary', 'units', 'roles', 'instance', 'upgrade', 'diagnostics', 'entitlement', 'data-states', 'assistance', 'coverage'] },
];

/** Which of the product's six sections a screen sits under, for the strip. */
const SECTION_OF = {
  locations: 'Locations', location: 'Locations', facility: 'Locations',
  events: 'Sampling events', 'field-capture': 'Sampling events', programme: 'Sampling events',
  imports: 'Import runs', 'import-review': 'Import runs', 'import-commit': 'Import runs',
  quarantine: 'Import runs', certificate: 'Import runs', migration: 'Import runs',
  crosstab: 'Results', 'result-detail': 'Results', qc: 'Results', consistency: 'Results',
  validation: 'Results', qualifiers: 'Results', hydrograph: 'Results', hydrochem: 'Results',
  statistics: 'Results', map: 'Results', 'saved-views': 'Results',
  exceedances: 'Exceedances', tarp: 'Exceedances', alerts: 'Exceedances', notification: 'Exceedances',
  report: 'Reports', 'report-figures': 'Reports', narrative: 'Reports', snapshot: 'Reports',
  submissions: 'Reports', signoff: 'Reports', obligations: 'Reports', licence: 'Reports',
};

/* ==================================================================== *
 * The rail — the catalogue, and the switch to the product's own IA
 * ==================================================================== */

/**
 * The dot shows the *current* state (`now`, re-derived 1 Sep 2026); the title
 * carries the 23 Aug state where it differs, so the third pass's finding stays
 * one hover away rather than being erased by the fourth.
 */
const screenButton = (s) => {
  const cur = s.now ?? s.state;
  const hist = s.now && s.now !== s.state ? `${cur} — was “${s.state}” on 23 Aug 2026` : cur;
  return (
    `<li data-label="${esc(s.label.toLowerCase())}" data-state="${esc(cur)}">` +
    `<button class="mk-rail__screen" type="button" data-target="${s.id}" aria-current="false">` +
    `<span class="mk-dot mk-dot--${STATE_TONE[cur]}" title="${esc(hist)}"></span>` +
    `<span>${esc(s.label)}</span>` +
    (s.isNew ? '<span class="mk-rail__new" title="Added in the third pass">NEW</span>' : '') +
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

  const key = Object.entries({
    shipped: 'shipped — works in a browser today',
    'engine-only': 'engine-only — tested code, no screen',
    'not built': 'not built at all',
    proposed: 'proposed — not in the requirements',
  })
    .map(([state, label]) => `<div><span class="mk-dot mk-dot--${STATE_TONE[state]}"></span><span>${esc(label)}</span></div>`)
    .join('');

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
    `<div class="mk-rail__key">${key}<div style="margin-top:.6rem"><span class="mk-rail__new">NEW</span><span>added in this pass</span></div></div></nav>`
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
const ROOTS = { home: [], search: [], projects: [], 'project-home': [{ label: 'Projects', target: 'projects' }] };
const INSTANCE_SPACE = new Set(['instance', 'upgrade', 'diagnostics', 'entitlement']);
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
  } else {
    trail = [
      { label: 'Projects', target: 'projects' },
      { label: `${PROJECT.code} — ${PROJECT.name}`, target: 'project-home' },
    ];
    if (section && section !== s.label) trail.push({ label: section, target: 'crosstab' });
  }
  trail.push({ label: s.label });
  const items = trail
    .map((c, i) =>
      i === trail.length - 1
        ? `<li class="mk-crumb__item"><span class="mk-crumb__here" aria-current="page">${esc(c.label)}</span></li>`
        : `<li class="mk-crumb__item"><a class="mk-crumb__link" href="#${c.target}">${esc(c.label)}</a></li>`,
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
        { label: 'Switch project…', ctx: '4 bindings', target: 'projects' },
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
against the product's route table, which now backs 58 of the 66 screens. Styled by the product's own stylesheet on the
approved Instrument direction; every figure is drawn to the approved grammar. The data is fictional —
<code>MOCK-WDL</code>, on the <code>MOCK-</code> convention. The dot beside each screen in the rail is its state in the
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
    // Twice: once now, and once after the browser has finished its own jump to
    // the anchor, which runs after this handler on a cold load with a hash.
    window.scrollTo({ top: 0 });
    requestAnimationFrame(() => window.scrollTo({ top: 0 }));
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
  show(ids.has(initial) ? initial : ${JSON.stringify(first)});
})();
</script>`;

writeFileSync(OUT, html, 'utf8');

const byState = {};
const byNow = {};
for (const s of ALL) {
  byState[s.state] = (byState[s.state] ?? 0) + 1;
  const cur = s.now ?? s.state;
  byNow[cur] = (byNow[cur] ?? 0) + 1;
}
const added = ALL.filter((s) => s.isNew).length;
const anchors = (html.match(/href="#/g) ?? []).length;

console.log(`index.html · ${ALL.length} screens across ${JOBS.length} jobs · ${(html.length / 1024).toFixed(0)} KB`);
console.log(`23 Aug 2026 · ${Object.entries(byState).map(([k, v]) => `${k}: ${v}`).join(' · ')}`);
console.log(` 1 Sep 2026 · ${Object.entries(byNow).map(([k, v]) => `${k}: ${v}`).join(' · ')}`);
console.log(`${added} added in pass 3 · ${anchors} anchors`);

/* The two invariants the first build got wrong, checked rather than claimed. */
const dangling = Object.entries(RELATED).flatMap(([from, tos]) => tos.filter((t) => !labelOf[t]).map((t) => `${from} → ${t}`));
const noExit = ALL.filter((s) => (RELATED[s.id] ?? []).length === 0).map((s) => s.id);
const pointedAt = new Set(Object.values(RELATED).flat());
const orphans = ALL.filter((s) => !pointedAt.has(s.id)).map((s) => s.id);
if (dangling.length) console.error(`dangling: ${dangling.join(', ')}`);
if (noExit.length) console.error(`no exit: ${noExit.join(', ')}`);
if (orphans.length) console.error(`nothing points at: ${orphans.join(', ')}`);
if (!dangling.length && !noExit.length && !orphans.length) console.log('link graph: no dangling targets, no dead ends, no orphans');
