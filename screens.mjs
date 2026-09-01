/**
 * The screens.
 *
 * Nine jobs, in the order a practitioner's day runs, and every screen reads from
 * `seed.mjs` so that two screens never disagree about the same bore. The job
 * spine is deliberately not the navigation of the shipped product — that is
 * `app/navigation/ia.ts`, six sections in the order the work happens, and it is
 * settled. This is a *catalogue* view of the same product: it groups by the
 * question the practitioner arrived with, so a reader can see the whole surface
 * at once. The two are compatible; where a screen exists in the product, its
 * real route is named on the screen itself.
 *
 * Screens marked `proposed: true` are not in the PRD. They are argued for in
 * README.md and drawn here so the argument can be looked at rather than read.
 */

import {
  ANALYTES, APPLIED_UNASKED, AUDIT, BUNDLE, COMPLETENESS, CONVERSIONS, CRITERIA, CRITERIA_LIBRARY,
  CROSSTAB, CROSSTAB_COLUMNS, DOCUMENTS, ENTITLEMENT, EVENTS, EVENT_SAMPLES, EXCEEDANCES, FACILITY,
  FORMATS, IMPORTS, INSTANCE, LICENCE, LINEAGE, LOCATIONS, MAPPING_ENTRIES, MAPPING_PROFILES,
  MEMBERS, NOTIFICATION, OBLIGATIONS, PRINCIPAL, PROJECT, PROJECTS, QAQC, QUARANTINE, REPORT,
  RESULT_DETAIL, REVIEW_ITEMS, ROUND, SAVED_VIEW_LIST, SEARCH, SHORTCUTS, SUBMISSIONS, SUPERSESSION,
  TARP, UNITS, UPGRADE, WORK_QUEUE,
  ASSIGNMENT, BACKGROUND, BATCHES, CUSTODY, DQA, HARDNESS, INDETERMINATE, NEST, PURGE, QC_LIMITS,
  RECEIPT, STATUTORY, STYGOFAUNA, TREND,
  CUSTODY_CHAIN, EC_MW05, EC_MW05_OUTLIER, LAB_QC, WINDOW_CONDITION,
} from './seed.mjs';
import {
  criteriaLegend, esc, facts, figure, loc, mark, notice, outcomeLegend, panel, ref, resultValue, table, tag, toneFor,
} from './ui.mjs';
import * as F from './figures.mjs';
/**
 * The interaction layer, namespaced so it stays visibly separate.
 *
 * `C.` on a call site is a reminder that the control being drawn is a
 * proposal — `design/reference/` has never seen any of it — while a bare
 * `table()` or `panel()` is a primitive the product already implements.
 */
import * as C from './controls.mjs';

/** The page header every screen shares: title, one line of purpose, a toolbar. */
function head(title, lede, { route, toolbar } = {}) {
  return (
    '<header class="mk-head">' +
    `<div class="mk-head__text"><h1>${title}</h1><p class="sf-lede">${lede}</p>` +
    (route ? `<p class="mk-route"><code>${esc(route)}</code></p>` : '') +
    '</div>' +
    (toolbar ? `<div class="mk-toolbar">${toolbar}</div>` : '') +
    '</header>'
  );
}

const btn = (label, kind = '') => `<button class="sf-button${kind ? ` sf-button--${kind}` : ''}" type="button">${esc(label)}</button>`;
const stat = (value, label, tone = 'neutral') =>
  `<div class="mk-stat mk-stat--${tone}"><span class="mk-stat__value">${esc(value)}</span><span class="mk-stat__label">${esc(label)}</span></div>`;
const stats = (items) => `<div class="mk-stats">${items.join('')}</div>`;
const cols = (a, b, ratio = '3fr 2fr') => `<div class="mk-cols" style="--mk-cols:${ratio}">${a}${b}</div>`;

/* ================================================================== *
 * J1 — Get the data in, and know it landed
 * ================================================================== */

const importRuns = () =>
  head('Import runs', 'Laboratory deliverables as they arrive, and the questions each one raised.', {
    route: '/projects/:projectId/imports',
    toolbar: C.exportMenu() + btn('Upload deliverable', 'primary'),
  }) +
  stats([
    stat('4', 'runs this quarter'),
    stat('231', 'rows committed', 'good'),
    stat('9', 'held for review', 'warn'),
    stat('1', 'reversed', 'bad'),
  ]) +
  cols(
    panel(
      'Read a deliverable',
      C.field({
        label: 'Files',
        control:
          '<div class="mk-drop"><p class="mk-drop__lede">Drop the deliverable here, or <button type="button" class="mk-linkbtn">choose files</button></p>' +
          '<p class="mk-drop__hint">An ESdat deliverable is a Sample file and a Chemistry file. Drop both — the import is one thing, not one per file.</p></div>' +
          '<ul class="mk-filelist"><li><span class="mk-file">Kurrajong.PA2601.ESdatSample4.csv</span><span class="mk-muted">18 KB · Sample</span><button type="button" class="mk-iconbtn mk-iconbtn--ghost" aria-label="Remove file">×</button></li>' +
          '<li><span class="mk-file">Kurrajong.PA2601.ESdatChemistry4.csv</span><span class="mk-muted">94 KB · Chemistry</span><button type="button" class="mk-iconbtn mk-iconbtn--ghost" aria-label="Remove file">×</button></li></ul>',
        hint: 'Named as one deliverable — <strong>PA2601</strong> — rather than by whichever file happens to sort first.',
      }) +
        C.field({
          label: 'Format',
          required: true,
          control: C.select({
            placeholder: 'Choose the format this laboratory sends…',
            value: '__none',
            options: ['ESdat ELDF-4', 'Yarra Regional v2', 'ESdat legacy export', 'EQuIS EDD (4-file)', 'Transposed single CSV'],
          }),
          hint: 'Chosen, never defaulted. A deliverable read with the wrong format parses to zero rows, and every screen downstream then says — truthfully — that nothing is waiting.',
          error: 'Choose a format before reading. Pilbara Analytical Services last sent ESdat ELDF-4.',
        }) +
        C.field({
          label: 'Sampling event',
          control: C.combobox({
            value: '',
            placeholder: 'Which round is this?',
            open: false,
            suggestions: [],
          }),
          hint: 'Optional. Left blank, the round is resolved from each sample’s collection date in Australia/Perth.',
        }) +
        '<div class="mk-actions">' + btn('Read the file', 'primary') + btn('Cancel') + '</div>' +
        '<p class="mk-tight" style="margin-top:.6rem"><strong>Reading is not committing.</strong> The file is parsed into an inspectable stage and nothing reaches the record until you commit.</p>',
    ),
    panel(
      'Reading, and it says how far',
      C.progress({
        pct: 100,
        label: 'Upload — 112 KB, two files',
        detail: 'Complete. Held on this instance; the laboratory’s original bytes are retained, not just the parsed form.',
        tone: 'run',
      }) +
        C.pipeline([
          { name: 'Parse', detail: '2 files · ESdat ELDF-4 · 42 rows read, 0 unreadable. The count comes first, before anything else happens.', state: 'done' },
          { name: 'Map', detail: '39 rows resolved against the dictionary and the Yarra Regional profile · 73 mappings applied without asking · 3 questions raised.', state: 'done', rerun: true },
          { name: 'Validate', detail: 'Holding times, reporting limits and duplicate RPD run against 39 rows · 3 held.', state: 'done', rerun: true },
          { name: 'Review', detail: '3 questions outstanding. The commit is gated on them.', state: 'run' },
          { name: 'Commit', detail: 'Waiting. Nothing has been written.', state: 'wait' },
        ]) +
        C.toast({
          tone: 'warn',
          headline: 'This file has already been read.',
          detail: 'Identical content to IMP-0238, committed 2026-04-02. <strong>Nothing was written.</strong> That is different from an import that failed — this one succeeded and had nothing to add.',
          undo: 'Open IMP-0238',
        }),
    ),
    '1fr 1fr',
  ) +
  table({
    caption: 'Every deliverable read on this project, newest first.',
    head: ['Run', 'File', 'Format', 'Laboratory', 'Received', 'Rows', 'Held', 'State', 'By'],
    kind: 'matrix',
    label: 'Import runs',
    rows: IMPORTS.map((i) => [
      `<a href="#import-review"><code>${esc(i.id)}</code></a>`,
      `<span class="mk-file">${esc(i.file)}</span>`,
      esc(i.format),
      esc(i.lab),
      `<span class="sf-instant">${esc(i.received)}</span>`,
      `<span class="mk-num">${i.rows}</span>`,
      i.held ? `<span class="mk-num mk-num--warn">${i.held}</span>` : '<span class="mk-num mk-num--nil">0</span>',
      tag(i.state, toneFor(i.state)),
      esc(i.by),
    ]),
  }) +
  notice(
    'default',
    'The format is chosen, never defaulted.',
    'A deliverable read with the wrong format parses to zero rows and every downstream screen then says, truthfully, that nothing is waiting. The importer states how many rows it read before anything else happens.',
  );

const importReview = () => {
  const items = REVIEW_ITEMS.map(
    (r) => `<li class="sf-review">
      <div class="sf-review__head"><span class="sf-review__kind">${esc(r.kind)}</span>
        <span class="sf-confidence"><span class="sf-confidence__track"><span class="sf-confidence__fill" style="width:${Math.round(r.confidence * 100)}%"></span></span>${(r.confidence * 100).toFixed(0)}%</span></div>
      <p class="sf-review__subject">${esc(r.subject)}</p>
      <p class="sf-review__detail">${esc(r.detail)}</p>
      <div class="sf-review__body">
        <div><p class="sf-review__detail"><strong>If you accept:</strong> ${esc(r.consequence)}</p>
          <p class="sf-review__detail"><strong>${r.rows} row${r.rows === 1 ? '' : 's'} at stake${r.rows ? '' : ''}.</strong> The commit is gated on this question, and that number is what it is gating.</p></div>
        <div class="sf-review__actions">
          <div class="sf-review__options">${r.options
            .map((o, i) => `<span class="sf-review__option${i === 0 ? ' mk-option--proposed' : ''}"><kbd class="mk-kbd">${i + 1}</kbd>${esc(o)}</span>`)
            .join('')}<span class="sf-review__option mk-option--escape"><kbd class="mk-kbd">H</kbd>${esc(r.escape)}</span>
          <p class="sf-review__detail">Reversible until you commit. Nothing is written yet.</p></div>
          ${btn('Apply', 'primary')}
        </div>
      </div></li>`,
  ).join('');

  return (
    head('Review — IMP-0239', 'Three questions the importer could not answer for itself.', {
      route: '/projects/:projectId/imports (review stage)',
      toolbar: btn('Quarantine the rest') + btn('Commit this import', 'primary'),
      kind: 'matrix',
      label: 'Import runs',
    }) +
    stats([
      stat('42', 'rows read'),
      stat('39', 'ready to commit', 'good'),
      stat('3', 'waiting on you', 'warn'),
      stat('73', 'applied without asking'),
    ]) +
    notice(
      'warning',
      '3 questions, holding 25 rows. The commit is blocked until each one has an answer.',
      'Every question states the rows it holds, and they sum to the number above — a queue that says “0 rows” on a question that blocks a commit cannot be triaged by anybody. Answer them with the keyboard: <kbd class="mk-kbd">J</kbd> and <kbd class="mk-kbd">K</kbd> move, <kbd class="mk-kbd">1</kbd>–<kbd class="mk-kbd">9</kbd> choose, <kbd class="mk-kbd">Enter</kbd> applies and advances, <kbd class="mk-kbd">A</kbd> accepts everything above 95%, and <kbd class="mk-kbd">⌘</kbd><kbd class="mk-kbd">Z</kbd> undoes the last one.',
    ) +
    cols(
      `<section><h2 class="mk-h2">Waiting on you</h2><ul class="sf-queue">${items}</ul></section>`,
      panel(
        'Applied without asking — and why',
        '<p class="sf-review__detail mk-tight">Every one of these is reversible with the import. None of them is a silent default: the rule that fired is recorded on each result.</p>' +
          table({
            head: ['Change', 'Basis', 'Rows'],
            rows: APPLIED_UNASKED.map((a) => [esc(a.what), `<span class="mk-muted">${esc(a.why)}</span>`, `<span class="mk-num">${a.count}</span>`]),
          }),
      ),
    )
  );
};

const importCommit = () =>
  head('Commit — IMP-0239', 'What will be written, stated from the database rather than from the screen.', {
    route: '/projects/:projectId/imports (commit stage)',
  }) +
  cols(
    panel(
      'Before — what the control says it will do',
      C.blastRadius({
        lede: 'Committing IMP-0239 writes, in one transaction:',
        rows: [
          { what: 'Results', n: '39' },
          { what: 'Derived results', n: '1' },
          { what: 'Lineage records', n: '40' },
          { what: 'Evaluations, across 2 criteria sets', n: '78' },
          { what: 'New exceedances raised', n: '2' },
          { what: 'Rows held rather than written', n: '3' },
        ],
        action: 'Commit 39 results',
        cancel: 'Keep reviewing',
        reversible:
          'Reversible. A committed run can be withdrawn, which removes its results from every register that counted them and leaves the reversal itself on the record — a reversal is an event, not an erasure.',
      }) +
        '<p class="mk-tight">The counts come from the staged data rather than from this screen, and they are the same numbers the receipt below will report. A commit control that does not say what it will write is asking for a signature on a blank page.</p>',
    ),
    panel(
      'What is not written, and why',
      notice(
        'warning',
        '3 rows are held rather than committed, and each one names its reason.',
        'Partial accept is the design: what is valid lands, and what is not is quarantined somewhere a person can act on it — not dropped, and not guessed at.',
      ) +
        table({
          head: ['Row', 'Subject', 'Held because'],
          rows: QUARANTINE.filter((q) => q.state === 'held').map((q) => [
            `<span class="mk-num">${q.row}</span>`,
            `<span class="mk-file">${esc(q.subject)}</span>`,
            `<span class="mk-muted">${esc(q.reason)}</span>`,
          ]),
        }) +
        `<div class="mk-actions"><a class="mk-btn mk-btn--sm" href="#quarantine">Open the held rows</a></div>` +
        '<p class="mk-tight" style="margin-top:.6rem">The count reaches the run, the project home and the work queue. A held row visible only to somebody who thought to look for it has been dropped, whatever the database says.</p>',
    ),
    '1fr 1fr',
  ) +
  cols(
    panel(
      'After — the receipt, and the control is gone',
      C.receipt({
        headline: '39 results committed to MOCK-WDL.',
        facts: [
          ['Run', 'IMP-0239'],
          ['Committed', '2026-05-19 10:22 AWST'],
          ['By', 'D. Okafor'],
          ['Transaction', '8f2c…41ab'],
          ['Written', '39 results · 1 derived · 78 evaluations'],
          ['Held', '3 rows'],
          ['Exceedances raised', '2'],
        ],
        next: { label: 'See the 39 results', target: 'crosstab' },
        undo: 'Reverse this commit',
      }) +
        '<p class="mk-tight"><strong>The commit control is not on this page any more.</strong> It is removed rather than disabled, and the write refuses a second commit underneath regardless — because a button that stays put after succeeding is an invitation, and one accidental double-click writes every row twice into an append-only record.</p>' +
        C.toast({
          tone: 'good',
          headline: '39 results committed. 3 rows held.',
          detail: 'Two exceedances were raised at MW05 and a TARP Level 3 trigger fired. Evaluation ran inside the committing transaction, so both were true the moment the import landed rather than on the next tick of something.',
          undo: 'Reverse',
        }),
    ),
    panel(
      'Reversing one',
      C.dialog({
        title: 'Reverse IMP-0240?',
        body:
          '<p>This withdraws <strong>84 results</strong> committed on 2026-05-19 16:02. They stop being live: every register that counted them recounts, and the two exceedances they raised are withdrawn.</p>' +
          '<p>Nothing is deleted. The results, their lineage and this reversal all stay readable, and the run is marked reversed rather than removed — so a report issued while they were live can still be explained.</p>' +
          '<p class="mk-muted">A run can be reversed once. A second attempt is refused rather than silently repeated.</p>',
        confirm: 'Reverse 84 results',
        danger: true,
        typeToConfirm: 'IMP-0240',
      }),
    ),
    '1fr 1fr',
  );

const certificate = () =>
  head('Certificate PAS2026-04417', 'The laboratory document, and every result it produced.', {
    route: '/projects/:projectId/imports (certificate)',
    toolbar: btn('Download original'),
  }) +
  cols(
    facts([
      ['Laboratory', esc(ROUND.laboratory)],
      ['Certificate', `<code>${esc(ROUND.certificate)}</code>`],
      ['Issued', '2026-05-21'],
      ['Received', esc(ROUND.received)],
      ['Original file', '<span class="mk-file">PAS2026-04417_Wandalup_2026Q2.zip · 1.4 MB · retained</span>'],
      ['Results produced', '<span class="mk-num">231</span>'],
      ['Supersedes', '<code>PAS2026-04398</code> — amended, transcription error'],
      ['NATA accreditation', '2377 · site 1841'],
    ]) +
      notice('default', 'The source file is kept, not parsed and discarded.',
        'FR-3.8 makes the certificate the thing every result points back to. A regulator asking where a number came from gets the laboratory’s own document, not a reconstruction of it.'),
    panel('Supersession cascade', table({
      head: ['What followed the amendment', 'Outcome'],
      rows: SUPERSESSION.cascade.map((c) => [esc(c.what), `<span class="mk-muted">${esc(c.outcome)}</span>`]),
    })),
  );

const migration = () =>
  head('Legacy migration — reconciliation', 'Proof that what came out of the old system matches what went into this one.', {
    route: '/projects/:projectId/reconciliation',
  }) +
  stats([
    stat('18,740', 'source rows'),
    stat('18,740', 'rows loaded', 'good'),
    stat('412', 'exceedances — both', 'good'),
    stat('112', 'quarantined', 'warn'),
  ]) +
  table({
    caption: 'Row and exceedance counts, source against destination. A migration that cannot prove this is a migration nobody should trust.',
    head: ['Check', 'Source (ESdat)', 'Strataflow', 'Agrees'],
    rows: [
      ['Result rows', '18,740', '18,740', tag('yes', 'good')],
      ['Distinct locations', '31', '31', tag('yes', 'good')],
      ['Distinct analytes', '118', '118', tag('yes', 'good')],
      ['Non-detects', '4,206', '4,206', tag('yes', 'good')],
      ['Exceedances — ANZG 2018', '412', '412', tag('yes', 'good')],
      ['Historical qualifiers preserved', '1,884', '1,884', tag('yes', 'good')],
      ['Rows quarantined on load', '—', '112', tag('reasons listed', 'warn')],
    ],
  }) +
  notice('default', 'Validation state and qualifiers came across, not just numbers.',
    'FR-3.11 asks for the historical validation state to survive the move. A migration that lands the values and drops twenty years of qualifiers has moved the data and lost the record.');

const fieldCapture = () =>
  head('Field capture — 2026 Q3 round', 'Water levels, field parameters and observations, recorded at the bore.', {
    route: 'a proposal — not in the product',
    toolbar: btn('Sync 3 pending', 'primary'),
  }) +
  notice('warning', 'Proposed. Nothing in FR-1 to FR-8 covers field data capture.',
    'U1 is named the highest-frequency user and every requirement in the PRD is about what happens after a laboratory has already reported. The water level, the purge volume, the field pH and the observation that a bore was dry are collected by hand and typed in later, or lost. This is the gap that most affects the user the PRD says uses the product most.') +
  cols(
    (() => {
      const COLS = ['SWL, m btoc', 'Field pH', 'EC, µS/cm', 'Purge, L', 'Observation'];
      const rows = [
        { code: 'MW05', v: ['8.40', '8.91', '3410', '42'], obs: 'Slight sulfurous odour', state: 'captured', cls: '' },
        { code: 'MW07', v: ['7.12', '7.14', '1680', '38'], obs: '', state: 'captured', cls: '' },
        { code: 'MW09', v: ['6.88', '6.82', '990', '36'], obs: 'Turbidity would not settle — 12 NTU at collection', state: 'captured', cls: 'mk-entry__row--focus' },
        { code: 'MW11', v: ['', '', '', ''], obs: 'Bore dry — not sampled', state: 'recorded as dry', cls: 'mk-entry__row--dry' },
      ];
      const cell = (v, label, text = false) =>
        `<td data-label="${esc(label)}"><input class="mk-entry__cell${text ? ' mk-entry__cell--text' : ''}" value="${esc(v)}" aria-label="${esc(label)}"></td>`;
      return (
        '<section><h2 class="mk-h2">Today’s run</h2>' +
        '<table class="mk-entry"><thead><tr><th>Location</th>' +
        COLS.map((c) => `<th>${esc(c)}</th>`).join('') +
        '<th>State</th></tr></thead><tbody>' +
        rows
          .map(
            (r) =>
              `<tr class="${r.cls}"><td data-label="Location">${loc(r.code)}</td>` +
              r.v.map((v, i) => cell(v, COLS[i])).join('') +
              cell(r.obs, 'Observation', true) +
              `<td data-label="State">${tag(r.state, r.state === 'captured' ? 'good' : 'warn')}</td></tr>`,
          )
          .join('') +
        '</tbody></table>' +
        '<p class="mk-tight mk-muted"><kbd class="mk-kbd">Tab</kbd> moves along the row, <kbd class="mk-kbd">Enter</kbd> drops to the next bore in the same column — because a round is entered column by column, one parameter at a time, not bore by bore. <kbd class="mk-kbd">D</kbd> marks a bore dry.</p>' +
        '<p class="mk-tight">On a phone this grid <strong>stacks into one card per bore</strong> rather than panning. Everywhere else in this product a dense table pans with its identifying column frozen, which is right for a table you read — this one is typed into, standing at a bore, one-handed, and a grid that pans horizontally puts the column you are filling off the screen.</p>' +
        `<div class="mk-actions"><a class="mk-btn" href="#purge">Open the purge log for MW05</a>${C.btn('Mark the round complete', 'primary')}</div>` +
        '</section>'
      );
    })(),
    panel('Why a dry bore is a first-class record',
      '<p class="mk-tight">A dry bore is not a missing reading. The hydrograph draws a gap rather than a line through it, the sampling programme reads the round as attempted rather than overdue, and the report says so. ' +
      'Left as an absence, all three of those go wrong quietly.</p>' +
      '<p class="mk-tight mk-muted">Offline by design: the site has no signal. Captured locally, queued, and synced when the vehicle reaches the gate — with the capture timestamp kept, not the sync timestamp.</p>'),
  );

/* ================================================================== *
 * J2 — Know the data is right
 * ================================================================== */

const qcWorkspace = () =>
  head('QA/QC — 2026-Q2-GW', 'Every check the round was held to, and what each one did to the data.', {
    route: '/projects/:projectId/qaqc',
    toolbar: btn('Re-run checks') + btn('Advance to validated', 'primary'),
  }) +
  stats([
    stat(String(QAQC.length), 'checks run'),
    stat(String(QAQC.filter((q) => q.outcome === 'pass').length), 'passed', 'good'),
    stat(String(QAQC.filter((q) => q.outcome === 'warn').length), 'warnings', 'warn'),
    stat(String(QAQC.filter((q) => q.outcome === 'fail').length), 'failed', 'bad'),
  ]) +
  table({
    caption: 'A check that fails does something to the data, and the action column says what.',
    head: ['Check', 'Scope', 'Outcome', 'Finding', 'Action taken'],
    rows: QAQC.map((q) => [
      esc(q.check),
      `<span class="mk-muted">${esc(q.scope)}</span>`,
      tag(q.outcome, toneFor(q.outcome)),
      esc(q.detail),
      q.action === '—' ? '<span class="mk-num mk-num--nil">—</span>' : `<span class="mk-muted">${esc(q.action)}</span>`,
    ]),
  }) +
  notice(
    'default',
    'Every check names the batch it ran in and the limit it was measured against.',
    'A control sample applies to a laboratory batch, not to a sample — so “which results does this failed spike qualify” is answerable rather than a judgement call. And the acceptance limits are a versioned set with a stated source, because “why 30%?” is the same question a regulator asks about a criterion.',
  ) +
  notice('warning', 'A reporting limit above the criterion is not a pass.',
    'Cadmium was reported at &lt;1.0 µg/L against an ANZG 2018 guideline value of 0.54 µg/L. Nothing was measured either way, so the outcome is <strong>indeterminate</strong> and it is drawn as its own mark. Recording that as compliance is the single most consequential error this product exists to prevent.') +
  historyOutlierPanel();

/**
 * A finding raised against the location's own record (FR-4.5).
 *
 * Every other check on this screen measures a value against something written
 * down in advance — a holding time, an acceptance limit, a criterion. This one
 * has no external number at all: it asks whether this result belongs to the
 * series this bore has been producing, and the answer depends entirely on which
 * bore it is. 3410 µS/cm at a background bore is a finding; the same number at
 * a bore that has read 3400 for a decade is a Tuesday.
 *
 * The working is drawn because the finding is only as good as its instrument.
 * A mean and a standard deviation over a rising series are dragged toward the
 * very value being tested, so a spike partly hides itself; the median and the
 * MAD are not, which is why the modified z-score is the test and why the screen
 * says so rather than printing a verdict.
 */
const historyOutlierPanel = () => {
  const O = EC_MW05_OUTLIER;
  const history = EC_MW05.slice(0, -1);
  const current = EC_MW05.at(-1);
  const worst = Math.max(...EC_MW05.map((r) => r.value));
  // The bare bar, not a confidence band: the modifiers colour a *judgement*,
  // and every row but the last is the record rather than an assessment of it.
  // The last one is drawn on the same scale on purpose — a step you cannot see
  // beside the rounds before it is a number, not a finding.
  const bar = (v, flagged = false) => {
    const pct = Math.round((v / worst) * 100);
    return `<span class="mk-conf${flagged ? ' mk-conf--low' : ''}" title="${esc(v)} µS/cm"><span class="mk-conf__track"><span class="mk-conf__fill" style="width:${pct}%"></span></span><span class="mk-conf__pct">${flagged ? `<strong>${v}</strong>` : v}</span></span>`;
  };
  return (
    '<h2 class="mk-h2" style="margin-top:1.4rem">Spike against history — a finding with no limit behind it</h2>' +
    cols(
      panel(
        `${esc(O.analyte)} at ${esc(O.location)} — ${esc(O.value)} this round`,
        `<p class="mk-tight"><strong>${esc(O.basis)}</strong> ${esc(O.reading)}</p>` +
          facts([
            ['Result', `<span class="mk-num mk-num--warn">${esc(O.value)}</span> · sample <span class="mk-file">${esc(O.sample)}</span> · round <span class="mk-file">${esc(O.round)}</span>`],
            ['Compared against', `${O.n} prior rounds at this bore — nothing from any other location`],
            ['Median of that record', `<span class="mk-num">${esc(O.median)}</span>`],
            ['Median absolute deviation', `<span class="mk-num">${esc(O.mad)}</span>`],
            ['Ratio to the median', `<span class="mk-num">${esc(O.ratio)}</span>`],
            ['Score', `<span class="mk-num mk-num--warn">${esc(O.score)}</span> against a flagging threshold of <span class="mk-num">${esc(O.threshold)}</span>`],
            ['Method', esc(O.method)],
          ]) +
          `<p class="mk-tight mk-muted">${esc(O.separately)}</p>` +
          `<div class="mk-actions"><a class="mk-btn" href="#statistics">Is it a step or a trend? — open the trend test</a><a class="mk-btn" href="#exceedances">The licence question, separately</a><a class="mk-btn" href="#purge">The purge record for this sample</a></div>`,
      ),
      panel(
        'The record it was measured against',
        table({
          caption: 'Every round this bore has produced, oldest first. The last row is the one under test and it is not in its own comparison.',
          head: ['Round', 'Electrical conductivity, µS/cm', 'In the comparison'],
          scroll: true,
          label: 'Electrical conductivity at MW05, round by round',
          rows: [
            ...history.map((r) => [`<span class="mk-file">${esc(r.round)}</span>`, bar(r.value), '<span class="mk-muted">yes</span>']),
            [
              `<span class="mk-file">${esc(current.round)}</span>`,
              bar(current.value, true),
              '<span class="mk-tag mk-tag--warn">under test</span>',
            ],
          ],
        }) +
          '<p class="mk-tight mk-muted">A value that entered its own comparison would raise its own threshold and hide itself, which is the failure mode of every rolling check written in a hurry.</p>',
      ),
      '3fr 2fr',
    )
  );
};

const consistency = () =>
  head('Internal consistency', 'Whether the chemistry agrees with itself.', { route: '/projects/:projectId/consistency' }) +
  cols(
    table({
      caption: 'Checks that compare one reported value against another.',
      head: ['Location', 'Cation–anion balance', 'TDS reconciliation', 'EC : TDS', 'Total vs dissolved'],
      rows: [
        [loc('MW01A'), '<span class="mk-num">+1.2%</span>', '<span class="mk-num">0.98</span>', '<span class="mk-num">0.64</span>', tag('consistent', 'good')],
        [loc('MW03B'), '<span class="mk-num">−2.4%</span>', '<span class="mk-num">1.03</span>', '<span class="mk-num">0.61</span>', tag('consistent', 'good')],
        [loc('MW05'), '<span class="mk-num mk-num--warn">−7.8%</span>', '<span class="mk-num">1.11</span>', '<span class="mk-num">0.67</span>', tag('review raised', 'warn')],
        [loc('MW07'), '<span class="mk-num">+3.1%</span>', '<span class="mk-num">0.96</span>', '<span class="mk-num">0.63</span>', tag('consistent', 'good')],
        [loc('MW09'), '<span class="mk-num">−1.8%</span>', '<span class="mk-num">1.01</span>', '<span class="mk-num">0.65</span>', tag('consistent', 'good')],
        [loc('MW11'), '<span class="mk-num">+0.9%</span>', '<span class="mk-num">0.99</span>', '<span class="mk-num">0.62</span>', tag('consistent', 'good')],
      ],
    }),
    panel('MW05 — what the imbalance means',
      '<p class="mk-tight">A −7.8% cation–anion balance says the anions exceed the cations by more than analytical error explains. On a bore whose sulfate is 918 mg/L, the likely readings are a sulfate result reported high, or a cation the suite does not include.</p>' +
      '<p class="mk-tight mk-muted">It is raised as a review item rather than resolved. The product does not know which, and guessing would be a silent derivation (PP3).</p>'),
  );

const validationBoard = () =>
  head('Validation state', 'Where every result in the round sits, and who moved it there.', {
    route: '/projects/:projectId/validation',
    toolbar: btn('Advance selected', 'primary'),
  }) +
  `<div class="mk-board">${[
    { state: 'Imported', n: 0, note: 'Nothing outstanding' },
    { state: 'Screened', n: 231, note: 'QA/QC run · 1 quarantined', current: true },
    { state: 'Validated', n: 0, note: 'Awaiting hydrogeologist review' },
    { state: 'Approved', n: 0, note: 'Awaiting environmental lead' },
    { state: 'Published', n: 18740, note: 'Historical · locked' },
  ].map((c) => `<div class="mk-board__col${c.current ? ' mk-board__col--current' : ''}">
      <span class="mk-board__state">${esc(c.state)}</span>
      <span class="mk-board__count">${c.n.toLocaleString('en-AU')}</span>
      <span class="mk-board__note">${esc(c.note)}</span></div>`).join('')}</div>` +
  table({
    caption: 'Every transition is attributed, including the bulk ones.',
    head: ['At', 'Transition', 'Results', 'By', 'Basis'],
    rows: [
      ['<span class="sf-instant">2026-05-21 14:02</span>', 'imported → screened', '<span class="mk-num">231</span>', 'A. Nakamura', 'Bulk — QA/QC complete, 1 quarantined'],
      ['<span class="sf-instant">2026-05-21 09:14</span>', '— → imported', '<span class="mk-num">231</span>', 'A. Nakamura', 'IMP-0241 committed'],
      ['<span class="sf-instant">2026-04-02 08:41</span>', 'approved → published', '<span class="mk-num">18,740</span>', 'R. Whitmore', 'Migration — historical state preserved'],
    ],
  });

const qualifiers = () =>
  head('Qualifiers and data lock', 'Reason codes on individual results, and periods closed to change.', {
    route: '/projects/:projectId/validation (qualifiers and lock)',
  }) +
  cols(
    table({
      caption: 'Qualifiers assigned from a controlled list. Free text is not offered.',
      head: ['Result', 'Qualifier', 'Meaning', 'Assigned by', 'Reason'],
      rows: [
        [`Zinc · ${loc('MW05')}`, '<code>J</code>', 'Estimated value', 'A. Nakamura', 'Field duplicate RPD 38.2% against a 30% limit'],
        [`Nitrate · ${loc('MW09')}`, '<code>H</code>', 'Holding time exceeded', 'system', 'Analysed at 6 days against a 2-day window'],
        [`Arsenic · ${loc('MW05')}`, '<code>*</code>', 'Confirmed against certificate', 'A. Nakamura', 'Spike against location history — checked, real'],
        [`PFOS+PFHxS · ${loc('MW05')}`, '<code>D</code>', 'Derived value', 'system', 'Sum parameter · rule sum-pfas-anzg v2.1'],
      ],
    }),
    panel('Locked periods',
      table({
        head: ['Period', 'Locked', 'Because'],
        rows: [
          ['2025 Q1 – 2026 Q1', tag('locked', 'good'), '<span class="mk-muted">Reported to DWER in the 2025 Annual Environmental Report</span>'],
          ['2026 Q2', tag('open', 'neutral'), '<span class="mk-muted">Not yet reported</span>'],
        ],
      }) +
      '<p class="mk-tight mk-muted">A locked period refuses a write rather than warning about one. Changing a number that has been submitted to a regulator is a supersession with a reason, not an edit.</p>'),
  );

/* ================================================================== *
 * J3 — Know what's wrong
 * ================================================================== */

const exceedances = () =>
  head('Exceedances — 2026 Q2', 'Where a result sits outside a criterion, and which criteria set says so.', {
    route: '/projects/:projectId/exceedances',
    toolbar: C.exportMenu() + btn('Acknowledge selected', 'primary'),
  }) +
  stats([
    stat(String(EXCEEDANCES.length), 'exceedances', 'bad'),
    stat(String(new Set(EXCEEDANCES.map((e) => e.location)).size), 'locations affected', 'bad'),
    stat(String(INDETERMINATE.length), 'indeterminate', 'warn'),
    stat(String(EXCEEDANCES.filter((e) => e.state === 'notified').length), 'notified', 'good'),
    // F-17's rule, on a tile whose count is 1 today and could be 0 tomorrow.
    ((n) => stat(String(n), `window condition${n === 1 ? '' : 's'} triggered`, n ? 'bad' : 'neutral'))(
      WINDOW_CONDITION.series.filter((w) => w.outcome === 'triggered').length,
    ),
  ]) +
  C.filterBar({
    onView: 'All open exceedances',
    saved: true,
    controls: [
      C.field({ label: 'State', control: C.select({ options: ['Open and acknowledged', 'Open only', 'Notified', 'Closed'], value: 'Open and acknowledged' }) }),
      C.field({ label: 'Criteria set', control: C.select({ options: ['Both sets', 'ANZG 2018 95%', 'Licence Table 4'], value: 'Both sets' }) }),
      C.field({ label: 'TARP level', control: C.select({ options: ['Any level', 'Level 3', 'Level 2', 'Level 1'], value: 'Any level' }) }),
      C.field({ label: 'Period', control: C.dateRange({ from: '2026-04-01', to: '2026-06-30' }) }),
    ],
    chips: [C.chip('2026 Q2', { prefix: 'period' }), C.chip('open', { prefix: 'state', tone: 'bad' })],
    count: '9 of 9 exceedances',
  }) +
  C.selectionBar({
    n: 3,
    unit: 'exceedances',
    actions: ['Acknowledge', 'Link to an obligation', 'Annotate', 'Export the selection'],
    undo: 'Acknowledging is attributed and reversible; it does not close the exceedance.',
  }) +
  table({
    caption: 'One row per result per criterion. A result above two criteria appears twice, because two regulators asked two questions.',
    head: ['Location', 'Analyte', 'Result', 'Criterion', 'Factor', 'Run', 'TARP', 'State'],
    kind: 'matrix',
    label: 'Exceedance register',
    rows: EXCEEDANCES.map((e) => [
      loc(e.location),
      esc(e.analyte),
      `<a class="mk-ref" href="#lineage"><span class="mk-num mk-num--bad">${esc(e.value)}</span></a>`,
      `<span class="mk-muted">${esc(e.criterion)}</span>`,
      `<span class="mk-num">${esc(e.factor)}</span>`,
      esc(e.run),
      e.tarp === '—' ? '<span class="mk-num mk-num--nil">—</span>' : tag(e.tarp, e.tarp === 'Level 3' ? 'bad' : 'warn'),
      tag(e.state, toneFor(e.state)),
    ]),
  }) +
  notice('warning', `${INDETERMINATE.length} results could not be assessed at all, and they are not on this register.`,
    'Cadmium at every bore was reported below a limit that sits above the guideline value. Those are on the crosstab as <strong>indeterminate</strong>. A register of exceedances that quietly counted them as compliant would be the more dangerous screen.') +
  windowConditionPanel();

/**
 * A consecutive-round condition, drawn *deciding* something (FR-5.2).
 *
 * The register above already says "2nd consecutive quarter" in a column, which
 * is a fact about a row and not a decision. This is the decision: one licence
 * condition, the four rounds it looked at, and four different outcomes out of
 * the same rule — including the two that matter most and are the easiest to
 * leave undrawn. **Not triggered is an outcome**, and a screen that only shows
 * conditions that fired teaches a reader that silence means nothing was
 * evaluated. **Already triggered is a different outcome again**: the condition
 * tripped a quarter ago and this round extends the run without raising a second
 * obligation, because the deadline runs from the round that first made it true.
 *
 * Outcome is carried by a word and a glyph, never by the colour (§5.3).
 */
const windowConditionPanel = () => {
  const W = WINDOW_CONDITION;
  const fmt = (v, unit) => (unit === 'µS/cm' ? String(v) : v.toFixed(1));
  const TONE = { triggered: 'bad', 'one round short': 'warn', 'not triggered': 'neutral' };
  return (
    '<h2 class="mk-h2" style="margin-top:1.4rem">Condition 12(c) — three consecutive rounds, evaluated</h2>' +
    facts([
      ['Condition', `<a class="mk-ref" href="#licence">${esc(W.condition)}</a>`],
      ['Rule', esc(W.rule)],
      ['Parameters and locations', esc(W.schedule)],
      ['What it obliges', esc(W.obliges)],
      ['Window', `${esc(W.rounds[0])} → ${esc(W.rounds.at(-1))} · ${W.rounds.length} rounds`],
      ['Evaluated', `<span class="sf-instant">${esc(W.evaluated)}</span>`],
      ['Rule version', `<code class="mk-file">${esc(W.ruleVersion)}</code>`],
    ]) +
    table({
      caption: 'One rule, four series, four outcomes.',
      head: ['Location', 'Parameter', 'Criterion', ...W.rounds, 'Run', 'Outcome'],
      kind: 'matrix',
      label: 'Consecutive-round condition 12(c), evaluated',
      rows: W.series.map((s) => [
        loc(s.location),
        esc(s.analyte),
        `<span class="mk-muted">${esc(s.criterion)}</span>`,
        ...s.values.map(
          (v, i) =>
            `<span class="mk-num${s.above[i] ? ' mk-num--bad' : ''}">${s.above[i] ? '▲ ' : '· '}${esc(fmt(v, s.unit))}</span>`,
        ),
        `<span class="mk-num">${s.run} of 3</span>`,
        C.status(s.outcome, TONE[s.outcome]),
      ]),
    }) +
    '<p class="mk-tight"><strong>▲</strong> marks a round above the criterion and <strong>·</strong> one below it, so the run reads across the row without reading the numbers.</p>' +
    `<p class="mk-tight mk-muted">${esc(W.notDrawn)}</p>` +
    cols(
      panel(
        'What each outcome did, in words',
        W.series
          .map(
            (s) =>
              '<p class="mk-tight">' +
              `${C.status(s.outcome, TONE[s.outcome])} <strong>${esc(s.analyte)} at ${esc(s.location)}</strong>` +
              (s.trippedAt ? ` — tripped on <span class="mk-file">${esc(s.trippedAt)}</span>` : '') +
              `. ${esc(s.says)}</p>` +
              (s.also ? `<p class="mk-tight mk-muted">${esc(s.also)}</p>` : ''),
          )
          .join(''),
      ),
      panel(
        'Why the outcome is stored rather than re-computed',
        `<p class="mk-tight">${esc(W.frozen)}</p>` +
          `<p class="mk-tight">${esc(W.alsoWindowed)} The two windows are drawn apart on purpose: the licence is what a regulator enforces and the <a class="mk-ref" href="#tarp">TARP</a> is what the site committed to, and a product that merges them loses which one was breached.</p>` +
          C.blastRadius({
            lede: 'If the window were widened to five rounds, before anybody widened it:',
            rows: [
              { what: 'Series whose outcome would change', n: '0 — a longer window cannot break a run that is already unbroken' },
              { what: 'Outcomes already decided', n: '1 — copper at MW05, frozen with the rule that decided it' },
              { what: 'Obligations that would be re-raised', n: '0' },
              { what: 'Rounds that would be re-evaluated', n: '9 — every round in the new window, on the criterion in force at each' },
            ],
            action: 'Preview against the real record',
            cancel: 'Leave the window at three',
            reversible:
              'Reversible, and nothing is written by the preview. A condition change re-evaluates forward; outcomes already frozen onto an obligation stay as they were decided.',
          }),
      ),
    )
  );
};

const crosstab = () => {
  const rows = CROSSTAB.map((r) => {
    const analyte = ANALYTES.find((a) => a.name === r.analyte);
    const crit = [
      analyte?.a ? `A ${analyte.a}${analyte.aNote ? ` — ${analyte.aNote}` : ''}` : null,
      analyte?.l ? `L ${analyte.l}` : null,
    ].filter(Boolean).join(' · ');
    return [
      `${esc(r.analyte)}${crit ? `<small>${esc(crit)}</small>` : ''}`,
      `<span class="mk-muted">${esc(analyte?.unit ?? '')}</span>`,
      ...r.cells.map((c) => resultValue(c, CRITERIA)),
    ];
  });
  return (
    head('Results by analyte and location', 'Every result in the round, with its outcome against each criteria set.', {
      route: '/projects/:projectId/results',
      toolbar: C.exportMenu() + C.lineageButton('Lineage of the focused cell') + btn('Add to report', 'primary'),
      kind: 'matrix',
      label: 'Exceedance register',
    }) +
    C.filterBar({
      onView: 'TSF downgradient — metals',
      saved: false,
      controls: [
        C.field({ label: 'Locations', control: C.select({ options: ['All 9 locations', 'Compliance boundary (2)', 'Downgradient of TSF (2)', 'Background (1)'], value: 'All 9 locations' }) }),
        C.field({ label: 'Analyte suite', control: C.select({ options: ['Everything in the round', 'Dissolved metals (8)', 'Nutrients (4)', 'PFAS (14)', 'Field parameters (5)'], value: 'Everything in the round' }) }),
        C.field({ label: 'Period', control: C.dateRange({ from: '2026-04-01', to: '2026-06-30' }) }),
        C.field({ label: 'Matrix', control: C.select({ options: ['Groundwater', 'Surface water', 'All matrices'], value: 'Groundwater' }) }),
        C.field({ label: 'Criteria sets', control: C.select({ options: ['Both sets', 'ANZG 2018 95% only', 'Licence Table 4 only'], value: 'Both sets' }) }),
        C.field({ label: 'Show', control: C.select({ options: ['Every result', 'Exceedances only', 'Indeterminate only', 'Censored only'], value: 'Every result' }) }),
      ],
      chips: [
        C.chip('2026 Q2', { prefix: 'period' }),
        C.chip('Groundwater', { prefix: 'matrix' }),
        C.chip('added zinc', { prefix: 'edited', tone: 'new' }),
      ],
      count: '11 analytes × 7 locations · 77 results',
    }) +
    `<p class="sf-lede mk-tight">${esc(ROUND.code)} · collected ${esc(ROUND.collected)} · ${esc(ROUND.laboratory)} certificate ${esc(ROUND.certificate)} · validation state <strong>${esc(ROUND.validationState)}</strong> · all times ${esc(PROJECT.timezone)}</p>` +
    `<section aria-label="Criteria applied">${criteriaLegend(CRITERIA)}${outcomeLegend()}</section>` +
    C.selectionBar({
      n: 7,
      unit: 'results',
      actions: ['Assign a qualifier', 'Open lineage', 'Add to the report', 'Export the selection'],
      undo: 'Qualifying is recorded, attributed and reversible.',
    }) +
    table({
      caption: 'Results by analyte and location — 2026 Q2. Two marks per value, always in the same order.',
      label: 'Results by analyte and location — 2026 Q2',
      kind: 'matrix',
      head: ['Analyte<small>criteria applied</small>', 'Unit', ...CROSSTAB_COLUMNS.map(loc)],
      rows,
    }) +
    C.pager({ from: 1, to: 11, total: 11, unit: 'analytes', pageSize: 50 }) +
    '<h2 class="mk-h2" style="margin-top:1.4rem">The same grid, across rounds</h2>' +
    `<p class="sf-lede mk-tight">${C.segmented({ options: ['This round', 'By round', 'By location'], value: 'By round', label: 'Layout' })}</p>` +
    notice(
      'default',
      'One round is a snapshot. The comparison is the review.',
      'Analyte by location answers <em>what did we get</em>. Analyte by round answers <em>is it moving</em>, which is the question a quarterly review exists to ask and the reason a saved view says “rolling four quarters”. The same marks, the same censoring notation, the same criteria sets — the axis changes and nothing else does.',
    ) +
    table({
      caption: 'MW05 · rolling four quarters. Two marks per value, always in the same order.',
      label: 'MW05 across four rounds',
      kind: 'matrix',
      head: ['Analyte<small>criteria applied</small>', 'Unit', '2025 Q3', '2025 Q4', '2026 Q1', '2026 Q2'],
      rows: [
        ['Arsenic (filtered)<small>A 13 — As(V) · L ≤ 50</small>', '<span class="mk-muted">µg/L</span>',
          resultValue({ v: '18.2', o: ['exceedance', 'compliant'] }, CRITERIA),
          resultValue({ v: '21.4', o: ['exceedance', 'compliant'] }, CRITERIA),
          resultValue({ v: '24.9', o: ['exceedance', 'compliant'] }, CRITERIA),
          resultValue({ v: '28.4', o: ['exceedance', 'compliant'] }, CRITERIA)],
        ['Cadmium (filtered)<small>A 0.54 — hardness-adjusted · L ≤ 2</small>', '<span class="mk-muted">µg/L</span>',
          resultValue({ v: '<5.0', o: ['indeterminate', 'indeterminate'], censored: true }, CRITERIA),
          resultValue({ v: '<1.0', o: ['indeterminate', 'compliant'], censored: true }, CRITERIA),
          resultValue({ v: '<1.0', o: ['indeterminate', 'compliant'], censored: true }, CRITERIA),
          resultValue({ v: '<1.0', o: ['indeterminate', 'compliant'], censored: true }, CRITERIA)],
        ['Zinc (filtered)<small>A 8.0 — hardness-adjusted · L ≤ 50</small>', '<span class="mk-muted">µg/L</span>',
          resultValue({ v: '9.1', o: ['exceedance', 'compliant'] }, CRITERIA),
          resultValue({ v: '14.8', o: ['exceedance', 'compliant'] }, CRITERIA),
          resultValue({ v: '22.0', o: ['exceedance', 'compliant'] }, CRITERIA),
          resultValue({ v: '31.6', o: ['exceedance', 'compliant'] }, CRITERIA)],
        ['Sulfate as SO₄<small>no ANZG value · L ≤ 1000</small>', '<span class="mk-muted">mg/L</span>',
          resultValue({ v: '441', o: ['not_evaluated', 'compliant'] }, CRITERIA),
          resultValue({ v: '602', o: ['not_evaluated', 'compliant'] }, CRITERIA),
          resultValue({ v: '744', o: ['not_evaluated', 'compliant'] }, CRITERIA),
          resultValue({ v: '918', o: ['not_evaluated', 'compliant'] }, CRITERIA)],
        ['Total hardness as CaCO₃<small>input to three criteria</small>', '<span class="mk-muted">mg/L</span>',
          resultValue({ v: '244', o: ['not_evaluated', 'not_evaluated'] }, CRITERIA),
          resultValue({ v: '301', o: ['not_evaluated', 'not_evaluated'] }, CRITERIA),
          resultValue({ v: '358', o: ['not_evaluated', 'not_evaluated'] }, CRITERIA),
          resultValue({ v: '412', o: ['not_evaluated', 'not_evaluated'] }, CRITERIA)],
      ],
    }) +
    cols(
      panel(
        'What only the second layout shows',
        '<p class="mk-tight">Arsenic, zinc, sulfate and hardness are all rising together, quarter on quarter, at one bore. No single round says that — every one of them is just a number against a limit.</p>' +
          '<p class="mk-tight">And the cadmium row shows something a single round hides completely: the reporting limit <strong>stepped from 5.0 to 1.0 µg/L</strong> between Q3 and Q4 when the laboratory changed method. The Q3 cell is indeterminate against <em>both</em> criteria sets; the later ones only against ANZG. A series that silently mixed two reporting limits would read as an improvement.</p>',
      ),
      panel(
        'Rising hardness is not a background detail',
        '<p class="mk-tight">Hardness went from 244 to 412 mg/L over the same four quarters, and cadmium, nickel and zinc are all assessed against criteria computed from it.</p>' +
          '<p class="mk-tight"><strong>So the criteria moved too.</strong> The zinc criterion was 5.4 µg/L in 2025 Q3 and is 8.0 µg/L now — the limit relaxed while the result climbed, and the exceedance factor understates the change. Nothing on a single-round grid could tell you that.</p>' +
          `<div class="mk-actions"><a class="mk-btn mk-btn--sm" href="#hardness">How the criterion is calculated</a><a class="mk-btn mk-btn--sm" href="#background">Against background</a></div>`,
      ),
    ) +
    notice('default', 'Everything true about a value is on the value.',
      'A superseded reading keeps its old value struck through beside the new one. A quarantined reading stays visible in brackets on a hatched ground rather than vanishing. A non-detect keeps the laboratory’s own <code>&lt;LOR</code> notation and is never rendered as a substituted number.') +
    cols(
      panel(
        'The column set is a saved view, not a rebuild',
        `<p class="mk-tight">The monthly review is a recall. Which locations, which analytes, which period, which criteria sets — the whole question, named and shared, so two people asking for “the compliance boundary numbers” get the same rows.</p>` +
          table({
            head: ['View', 'Owner', 'Locations', 'Analytes', 'Period', 'Last used'],
            rows: SAVED_VIEW_LIST.map((v) => [
              `<a class="mk-ref" href="#saved-views">${esc(v.name)}</a>`,
              v.shared ? tag('Project', 'good') : tag('Private', 'neutral'),
              esc(v.locations),
              esc(v.analytes),
              esc(v.period),
              `<span class="sf-instant">${esc(v.used)}</span>`,
            ]),
          }) +
          `<p class="mk-tight">A browser preference would not do. If the view lives on this machine then two people comparing numbers are comparing two questions, and the product has reintroduced the disagreement it exists to end.</p>`,
      ),
      panel(
        'Working this grid without a mouse',
        table({
          head: ['Keys', 'What it does'],
          rows: [
            [C.kbd('↑ ↓'), 'Move between analytes'],
            [C.kbd('← →'), 'Move between locations'],
            [C.kbd('L'), 'Open lineage for the focused value, over this grid'],
            [C.kbd('Space'), 'Select the row'],
            [C.kbd('⇧ ↑ ↓'), 'Extend the selection'],
            [C.kbd('⌘ E'), 'Export exactly what is on screen'],
          ],
        }) +
          `<p class="mk-tight">The identifying column stays frozen while the grid pans, and no domain state is dropped at the smallest breakpoint — a phone layout that collapsed two per-criterion outcomes into one badge would fail the same rule a desktop one would.</p>`,
      ),
    )
  );
};

const tarpBoard = () =>
  head('TARP state', 'Trigger levels, what each one requires, and whether it has been done.', {
    route: '/projects/:projectId/tarp',
    toolbar: btn('Acknowledge', 'primary'),
  }) +
  '<h2 class="mk-h2">Trigger levels in force</h2>' +
  `<div class="mk-tarp">${TARP.map((t) => `<article class="mk-tarp__card mk-tarp__card--${t.state === 'active' ? (t.level === 'Level 3' ? 'bad' : 'warn') : 'good'}">
      <header><span class="mk-tarp__level">${esc(t.level)}</span>${tag(t.state, t.state === 'active' ? 'bad' : 'good')}</header>
      <h3 class="mk-tarp__label">${esc(t.label)}</h3>
      <dl class="mk-tarp__facts">
        <div><dt>Locations</dt><dd>${t.locations.split(', ').map(loc).join(', ')}</dd></div>
        <div><dt>Trigger</dt><dd>${esc(t.trigger)}</dd></div>
        <div><dt>In force since</dt><dd>${esc(t.since)}</dd></div>
        <div><dt>Response</dt><dd>${esc(t.response)}</dd></div>
      </dl></article>`).join('')}</div>` +
  notice('default', 'A TARP level is a state with a required response, not a colour.',
    'Level 3 at MW05 created a statutory notification obligation the moment the PFAS result committed. The obligation is on the obligations board with a clock, and the clock started from a timestamp the database will not let anyone move.');

const alerts = () =>
  head('Alerts', 'Who was told, through what, and whether anybody has accepted it.', {
    route: '/projects/:projectId/alerts',
  }) +
  table({
    caption: 'Every destination is a configured row. There is no Strataflow-operated relay and no URL in application code.',
    head: ['Raised', 'Alert', 'Channel', 'Delivered', 'Acknowledged', 'Escalates'],
    scroll: true, label: 'Alerts raised and their delivery',
    rows: [
      ['<span class="sf-instant">2026-05-22 09:14</span>', 'PFOS + PFHxS above ANZG 2018 · MW05', 'Environmental lead — email', tag('delivered', 'good'), 'R. Whitmore · 09:22', '—'],
      ['<span class="sf-instant">2026-05-22 09:14</span>', 'TARP Level 3 raised · MW05', 'Site webhook — Teams', tag('delivered', 'good'), 'S. Petrelli · 09:31', '—'],
      ['<span class="sf-instant">2026-05-21 14:06</span>', 'Arsenic 3rd consecutive quarter · MW05', 'Hydrogeologist — email', tag('delivered', 'good'), '<span class="mk-muted">not acknowledged</span>', '<span class="mk-num mk-num--warn">in 6 h</span>'],
      ['<span class="sf-instant">2026-05-14 06:00</span>', 'Monitoring round overdue · MW11', 'Environmental officer — email', tag('delivered', 'good'), '<span class="mk-muted">not acknowledged</span>', '<span class="mk-num mk-num--bad">escalated</span>'],
    ],
  }) +
  notice('default', 'Raising an alert is synchronous with the data that raised it.',
    'Only the escalation countdown is scheduled. An exceedance that lands at 09:14 raises its alert at 09:14, inside the same transaction — not on the next tick of a worker that might not run.');

const locationDetail = () =>
  head('MW05', 'One monitoring location: where it is, how it is built, and what it has told us.', {
    route: '/projects/:projectId/locations',
    toolbar: btn('Export construction log') + btn('Resurvey'),
  }) +
  cols(
    facts([
      ['Class', 'Groundwater monitoring bore'],
      ['Area', 'TSF'],
      ['Position', 'Downgradient of TSF'],
      ['Hydrostratigraphic unit', 'Superficial'],
      ['Screened interval', '12.0 – 18.0 m bgl'],
      ['Coordinates', `513910 mE, 7653180 mN · ${esc(PROJECT.crs)}`],
      ['Top of casing', '208.11 m AHD'],
      ['Drilled', '2019-04-11 · 150 mm mud rotary'],
      ['Rounds on record', '<span class="mk-num">38</span>'],
      ['Current state', tag('exceedance', 'bad')],
    ]) +
    table({
      caption: 'Survey history. A resurvey takes effect from its own epoch and moves nothing behind it; a correction supersedes and reaches back.',
      head: ['Epoch', 'Kind', 'Top of casing', 'Applies to', 'By'],
      rows: [
        ['2024-03-18', 'Resurvey', '<span class="mk-num">208.11</span>', '<span class="mk-muted">Readings from 2024-03-18 onward</span>', 'Pilbara Survey Co'],
        ['2019-04-15', 'Original survey', '<span class="mk-num">208.42</span>', '<span class="mk-muted">Readings 2019-04-15 to 2024-03-17</span>', 'Pilbara Survey Co'],
      ],
    }) +
    notice('default', 'Groundwater elevation is derived at the measurement date, never stored.',
      'A depth-to-water reading taken in 2022 reduces through the 2019 datum; the same depth taken last week reduces through the 2024 one. Storing the elevation would freeze whichever datum happened to be in force the day it was calculated, and a resurvey would silently invalidate years of hydrograph.'),
    F.boreLog('MW05'),
    '3fr 2fr',
  ) +
  panel(
    `${esc(NEST.id)} — this bore is half of a pair`,
    '<p class="mk-tight">MW03B is screened 46–52 m in the confined unit and MW01A 18–24 m in the superficial, at the same location. A register lists them as two rows; they are one installation, and the thing worth knowing is the difference between them.</p>' +
      table({
        caption: 'The nest, read vertically.',
        head: ['Bore', 'Hydrostratigraphic unit', 'Screened interval', 'Standing level', 'Head', 'EC'],
        rows: NEST.bores.map((b) => [
          loc(b.code),
          esc(b.unit),
          esc(b.screen),
          `<span class="mk-num">${esc(b.swl)}</span>`,
          `<span class="mk-num">${esc(b.head)}</span>`,
          `<span class="mk-num">${esc(b.ec)}</span>`,
        ]),
      }) +
      `<p class="mk-tight"><strong>Vertical gradient: ${esc(NEST.gradient)}.</strong> ${esc(NEST.inference)}</p>` +
      C.card({
        tone: 'good',
        head: '<span class="mk-queue__kind">Why this is not a footnote</span>',
        body:
          '<p class="mk-tight">A containment argument is made or lost on the vertical gradient, and it is invisible in every screen that treats a bore as a point. Two rows in a register, sorted alphabetically, with the number that matters being the difference between them.</p>',
      }),
  );

/* ================================================================== *
 * J4 — Understand it and explain it
 * ================================================================== */

const hydrographWorkspace = () =>
  head('Hydrograph', 'Water level over time, with rainfall, triggers and comparison.', {
    route: '/projects/:projectId/hydrograph',
    toolbar: btn('Export SVG') + btn('Save configuration') + btn('Add to report', 'primary'),
  }) +
  cols(
    figure('4.1', 'Groundwater elevation, MW05 · MW07 · MW01A', F.hydrograph({ trigger: 195.6 }),
      'Rainfall in its own panel, never on a second axis inside the plot.'),
    panel('Configuration',
      '<div class="mk-config">' +
      ['Locations · MW05, MW07, MW01A', 'Period · Jan 2023 – May 2026', 'Y axis · elevation, m AHD',
       'Rainfall overlay · site gauge, monthly', 'Trigger line · 195.6 m AHD (TSF licence)',
       'Datum · in force at each measurement date']
        .map((c) => `<div class="mk-config__row">${esc(c)}</div>`).join('') +
      '</div>' +
      '<p class="mk-tight mk-muted">Saved with the figure, not with the session. QB-3 is that next quarter’s figure is identical except for the new data — which means the configuration is a stored object, not something rebuilt by hand.</p>' +
      '<p class="mk-tight mk-muted"><strong>A dry bore is a gap.</strong> MW11 was dry in April and the trace breaks rather than drawing a line through it. A polyline across a null asserts a water level nobody measured.</p>'),
    '2fr 1fr',
  ) +
  figure('4.2', 'Arsenic at MW05, with censoring shown', F.censoredSeries(),
    'Non-detects at their limit of reporting under an open downward triangle; the limit is its own stepped line, because it changed when the laboratory changed method.') +
  cols(
    panel(
      'Read it as a table',
      '<p class="mk-tight">Every plate has one, and it is not an accessibility afterthought — it is how somebody checks a value they are about to put in a report. A figure a reader has to trust is a figure they will re-derive in Excel.</p>' +
        C.segmented({ options: ['Figure', 'Table', 'Both'], value: 'Both', label: 'View' }) +
        table({
          caption: 'Figure 4.2 — the plotted values, censoring intact.',
          head: ['Collected', 'Result', 'Detect', 'LOR', 'Method', 'Plotted at'],
          rows: [
            ['2024-08-12', '<span class="mk-num">&lt;5.0</span>', 'non-detect', '5.0 µg/L', 'ICP-MS', 'At the LOR, open triangle'],
            ['2024-11-14', '<span class="mk-num">&lt;5.0</span>', 'non-detect', '5.0 µg/L', 'ICP-MS', 'At the LOR, open triangle'],
            ['2025-02-11', '<span class="mk-num">6.2</span>', 'detected', '5.0 µg/L', 'ICP-MS', 'At the value'],
            ['2025-05-13', '<span class="mk-num">&lt;1.0</span>', 'non-detect', '1.0 µg/L', 'ICP-MS/MS', 'At the LOR — the limit stepped down here'],
            ['2025-08-19', '<span class="mk-num">11.8</span>', 'detected', '1.0 µg/L', 'ICP-MS/MS', 'At the value'],
            ['2026-05-13', '<span class="mk-num mk-num--bad">28.4</span>', 'detected', '1.0 µg/L', 'ICP-MS/MS', 'At the value · above the DGV'],
          ],
        }) +
        '<p class="mk-tight">The table carries the same censoring notation the plate does. An export that flattened <code class="mk-file">&lt;5.0</code> to <code class="mk-file">5.0</code> would make the two disagree, and the one somebody pasted into a report would be the wrong one.</p>',
    ),
    panel(
      'One finding against the approved grammar, recorded rather than fixed',
      '<p class="mk-tight">The rainfall bars are drawn in the rule-strong grey, which measures <strong>2.41:1</strong> against the plate ground — below the 3:1 floor for a mark that carries data. The nearest value that passes is the not-evaluated mark grey at <strong>3.02:1</strong>, which is already a token in this product rather than a new colour.</p>' +
        '<p class="mk-tight"><strong>It has not been changed here.</strong> The grammar was approved on 20 August and the reference plates are an oracle; a rendering that quietly improves on the thing it is measured against is indistinguishable from a rendering that drifted from it. This is a revision for Jerry to accept or refuse, recorded where it can be seen.</p>' +
        C.blastRadius({
          lede: 'If the revision is accepted:',
          rows: [
            { what: 'Reference plates to re-render and re-approve', n: '3 of 12' },
            { what: 'Contrast against the plate ground', n: '2.41 → 3.02' },
            { what: 'Series the bars could now compete with', n: '0 — still lighter than every trace' },
            { what: 'Tokens invented', n: '0' },
          ],
          action: 'Jerry’s call',
          cancel: 'Relief is already in place — labelled axis and the table above',
          reversible:
            'Not urgent either way. The skill’s own rule is that a contrast warning obliges visible labels or a table view rather than a colour change, and the panel above is that relief. Darkening the bars would be the better fix; leaving them is defensible.',
        }),
    ),
  );

const hydrochem = () =>
  head('Hydrogeochemistry', 'Piper, Stiff and Schoeller — what kind of water this is.', {
    route: '/projects/:projectId/hydrochem',
    toolbar: btn('Export SVG') + btn('Add all to report', 'primary'),
  }) +
  cols(
    figure('4.3', 'Piper trilinear diagram — 2026 Q2', F.piper(),
      'MW05 separates from the background cluster on the sulfate limb.'),
    panel('What the plate says',
      '<p class="mk-tight">Every bore except MW05 is a calcium-bicarbonate water, tightly clustered — the natural signature of the Superficial aquifer here. MW05 is sulfate-dominated and four times the ionic strength.</p>' +
      '<p class="mk-tight">That is the difference between <em>a bore with a high arsenic result</em> and <em>a bore receiving TSF seepage</em>, and it is the argument a hydrogeologist has to make in the report. The chemistry makes it; the exceedance register alone cannot.</p>' +
      '<p class="mk-tight mk-muted">Ionic balance at MW05 is −7.8%, outside the ±5% acceptance limit, and that is stated here rather than left on the QA/QC screen. A plate drawn from data that failed a consistency check should say so on its own face.</p>'),
    '3fr 2fr',
  ) +
  figure('4.4', 'Stiff diagrams by location', F.stiff(),
    'One scale across every panel. Per-panel scaling would make each polygon fill its box and destroy the only comparison the plate is for.') +
  figure('4.5', 'Schoeller diagram', F.schoeller(),
    'Semi-logarithmic; only the decades carry a gridline.');

const statistics = () =>
  head('Statistics and trend', 'Censored-data methods and non-parametric trend tests.', {
    route: '/projects/:projectId/statistics',
    toolbar: btn('Export SVG') + btn('Add to report', 'primary'),
  }) +
  cols(
    figure('4.6', 'Arsenic trend at MW05', F.trendPlot(),
      'Sen’s slope drawn only across the period it was computed from, and clipped to the plot.'),
    cols(
    panel(
      'Seasonal Mann–Kendall, on a series that is seasonal',
      table({
        head: ['Test', 'S', 'p', 'Sen’s slope', 'Verdict'],
        rows: [
          [esc(TREND.plain.name), `<span class="mk-num">${TREND.plain.s}</span>`, `<span class="mk-num">${TREND.plain.p}</span>`, `<span class="mk-num">${esc(TREND.plain.slope)}</span>`, C.status(TREND.plain.verdict, 'bad')],
          [esc(TREND.seasonal.name), `<span class="mk-num">${TREND.seasonal.s}</span>`, `<span class="mk-num">${TREND.seasonal.p}</span>`, `<span class="mk-num">${esc(TREND.seasonal.slope)}</span>`, C.status(TREND.seasonal.verdict, 'bad')],
        ],
      }) +
        `<p class="mk-tight">${esc(TREND.why)}</p>` +
        '<p class="mk-tight">Both are reported. Showing only the one with the smaller p-value would be choosing the answer.</p>',
    ),
    panel(
      'How the two non-detects entered the trend test',
      `<p class="mk-tight">${esc(TREND.censoredTreatment)}</p>` +
        C.card({
          tone: 'good',
          head: '<span class="mk-queue__kind">Never substituted</span>',
          body:
            '<p class="mk-tight">Half the limit of reporting is the common shortcut and it puts an invented number into a rank test. With an LOR that stepped from 5.0 to 1.0 µg/L mid-series, substitution would have manufactured a step change of 2 µg/L at the method change — a trend created by the laboratory changing instrument.</p>',
        }),
    ),
  ) +
  panel('Why not a linear regression',
      '<p class="mk-tight">Environmental series are not normal, are not evenly spaced, and contain values the laboratory reported only as “below something”. Ordinary least squares assumes away all three.</p>' +
      '<p class="mk-tight">Mann-Kendall asks only whether later values tend to exceed earlier ones, which is the question, and Sen’s slope gives a rate that a single outlier cannot swing.</p>' +
      '<p class="mk-tight mk-muted">Below n = 8 the test is reported with a sample-size warning and no p-value, rather than a number that looks like evidence.</p>'),
    '3fr 2fr',
  ) +
  cols(
    figure('4.7', 'Arsenic distribution by location', F.boxPlot(),
      'Every reading drawn beside its box — a summary with nothing behind it cannot distinguish twelve results from two hundred.'),
    figure('4.8', 'Normal probability plot, censored', F.probabilityPlot(),
      'Two non-detects fitted by robust ROS. Never substitution of half the limit.'),
    '1fr 1fr',
  );

const mapScreen = () =>
  head('Map', 'The monitoring network, symbolised by this round’s outcome.', {
    route: '/projects/:projectId/map',
    toolbar: btn('Print layout') + btn('Export GeoJSON') + btn('Export shapefile'),
  }) +
  figure('4.9', 'Monitoring network — 2026 Q2 exceedance state', F.siteMap(),
    'The same four state marks as the crosstab. A map and a table that disagree about a bore is the failure this encoding exists to prevent.') +
  cols(
    cols(
    figure('4.10', 'Potentiometric surface and flow direction — 2026 Q2', F.potentiometric(),
      'The claim every other screen rests on, drawn rather than stored as a string.'),
    panel(
      'Which way the water goes',
      '<p class="mk-tight">Every location on this project carries a position — <em>upgradient</em>, <em>downgradient of TSF</em>, <em>compliance boundary</em> — and until this plate those were attributes somebody typed. This derives them.</p>' +
        '<p class="mk-tight">The surface is a planar least-squares fit through the eight superficial bores. That is the honest method for eight points: it states one gradient and one direction and cannot invent local structure the data does not support. Interpolating a curved surface through eight wells draws detail nobody measured, and it is the picture that gets argued with.</p>' +
        '<p class="mk-tight"><strong>The network geometry decides whether this figure is possible at all.</strong> Six of these bores sit almost on one line, and a plane fitted through collinear points is barely constrained across that line — the first version of this plate returned a flow direction of due south on a site whose every other screen says south-east, with a residual of 1.46 m against its own one-metre limit. Two bores genuinely off the transect fixed it. That is why the residual is printed on the plate rather than kept in a log: it is the figure telling you whether to believe it.</p>' +
        '<p class="mk-tight"><strong>MW03B is excluded.</strong> It screens the confined unit. Contouring two aquifers as one surface is the commonest error on a plate like this, and it produces a flow direction that is an average of two systems and true of neither.</p>' +
        C.card({
          tone: 'good',
          head: '<span class="mk-queue__kind">What it confirms</span>',
          body:
            '<p class="mk-tight">Flow runs from the north-west to the east-south-east at about 2 m/km, on a largest residual of 0.04 m — a planar surface fits this network almost exactly. The TSF sits upgradient of MW05 and MW07, which sit upgradient of the compliance boundary at MW09 and MW11. The stored positions are correct — and now they are derived rather than asserted, so a resurvey or a new bore changes the plate rather than leaving a stale string on a record.</p>',
        }),
    ),
    '3fr 2fr',
  ) +
  panel('Symbology', '<p class="mk-tight">Worst outcome per location across every criteria set. A bore compliant against the licence and above an ANZG guideline value reads as an exceedance, because that is the more consequential of the two.</p>' +
      '<p class="mk-tight mk-muted">Shape, not colour. The print layout is the same map at A3 with a north arrow, a bar scale, a grid and a title block — and it survives a monochrome office printer, which is where most of them end up.</p>'),
    panel('Spatial export', table({
      head: ['Format', 'Contains', 'CRS'],
      rows: [
        ['GeoJSON', 'Locations, state, latest result', 'WGS84 with epoch'],
        ['Shapefile', 'Locations, state, latest result', esc(PROJECT.crs)],
        ['CSV with coordinates', 'Full register', esc(PROJECT.crs)],
      ],
    }) + '<p class="mk-tight mk-muted">GDA2020 is not WGS84. They agree only at epoch 2020.0 and separate by about 7 cm a year, so a WGS84 export carries its epoch and a conversion without one is refused rather than assumed.</p>'),
    '1fr 1fr',
  );

const savedViews = () =>
  head('Saved views', 'A question you ask every quarter, kept as an object.', { route: 'a proposal — not in the product' }) +
  notice('warning', 'Proposed. No FR covers saved queries.',
    'FR-6.6 persists a <em>chart</em> configuration. Nothing persists the question that selected the data — which locations, which analytes, which period, which criteria sets. Every incumbent has this and it is most of what a returning user does.') +
  table({
    caption: 'Views on this project.',
    head: ['View', 'Selects', 'Used by', 'Last run', 'Feeds'],
    rows: [
      ['Compliance boundary — quarterly', 'MW09, MW11 · licence suite · current quarter', 'A. Nakamura', '2026-05-21', 'Report §4, Figure 4.1'],
      ['TSF downgradient — metals', 'MW05, MW07 · 6 metals · rolling 3 years', 'A. Nakamura', '2026-05-21', 'Figures 4.2, 4.6, 4.7'],
      ['Everything above a criterion', 'All locations · all analytes · exceedance only', 'R. Whitmore', '2026-05-22', 'Exceedance register'],
      ['PFAS watch', 'All locations · PFOS, PFHxS, sum · all time', 'D. Okafor', '2026-05-22', 'Alert rule · TARP Level 3'],
    ],
  }) +
  notice('default', 'A view is shared, not personal.',
    'Two people asking “the compliance boundary numbers” must get the same rows, or the product has reintroduced the disagreement it exists to end. A view is a project object with an owner and an audit trail, not a browser preference.');

/* ================================================================== *
 * J5 — Produce the submission
 * ================================================================== */

const reportBuilder = () =>
  head('Quarterly Groundwater Monitoring Report — 2026 Q2', 'Assembled from the data as it stands, into the customer’s own template.', {
    route: '/projects/:projectId/reports',
    toolbar: btn('Preview') + btn('Take snapshot and issue', 'primary'),
  }) +
  stats([
    stat('7', 'sections'),
    stat('9', 'figures', 'good'),
    stat('6', 'tables', 'good'),
    stat('2', 'sections not started', 'warn'),
  ]) +
  cols(
    table({
      caption: 'Sections. What the product generates is marked; the rest is written by a person.',
      head: ['§', 'Section', 'Words', 'Generated content', 'State'],
      rows: REPORT.sections.map((s) => [
        `<code>${esc(s.n)}</code>`,
        esc(s.title),
        s.words ? `<span class="mk-num">${s.words}</span>` : '<span class="mk-num mk-num--nil">—</span>',
        s.auto ? `<span class="mk-muted">${esc(s.auto)}</span>` : '<span class="mk-num mk-num--nil">—</span>',
        tag(s.state, toneFor(s.state)),
      ]),
    }),
    panel('Output', facts([
      ['Template', esc(REPORT.template)],
      ['Primary output', 'Word (.docx) — figures embedded as true vector'],
      ['Also produced', 'PDF — a render of the Word file, not a second authoring path'],
      ['Data export', 'Excel — the register, not the report layout'],
      ['Branding', 'Wandalup Resources. Strataflow attribution is metadata only'],
      ['Snapshot', `<span class="mk-num mk-num--warn">${esc(REPORT.snapshot)}</span>`],
    ]) + '<p class="mk-tight mk-muted">A Strataflow-branded regulatory submission is a hard anti-pattern (FR-7.4). The customer’s logo, the customer’s template, the customer’s numbering.</p>'),
    '3fr 2fr',
  );

const reportFigures = () =>
  head('Figures and tables', 'What goes in, in what order, numbered as the document numbers them.', {
    route: '/projects/:projectId/figures',
  }) +
  cols(
    table({
      caption: 'Cross-references update with the numbering. Renumbering by hand is where a submission acquires a “see Figure 6” that points at a table.',
      head: ['№', 'Item', 'Source', 'Cited in', 'State'],
      rows: [
        ['Figure 4.1', 'Groundwater elevation — MW05, MW07, MW01A', 'Saved view · TSF downgradient', '§4.2, §6.1', tag('current', 'good')],
        ['Figure 4.2', 'Arsenic at MW05, with censoring', 'Saved view · TSF downgradient', '§4.3, §5.1', tag('current', 'good')],
        ['Figure 4.3', 'Piper trilinear diagram', '2026-Q2-GW major ions', '§6.2', tag('current', 'good')],
        ['Figure 4.4', 'Stiff diagrams by location', '2026-Q2-GW major ions', '§6.2', tag('current', 'good')],
        ['Figure 4.6', 'Arsenic trend at MW05', 'services/stats · Mann-Kendall', '§5.2, §6.1', tag('current', 'good')],
        ['Figure 4.9', 'Monitoring network', 'Location register', '§2.1', tag('current', 'good')],
        ['Table 4.1', 'Results by analyte and location', '2026-Q2-GW crosstab', '§4.1', tag('current', 'good')],
        ['Table 5.1', 'Exceedance register', 'Evaluation · 2 criteria sets', '§5.1', tag('stale — MW03B superseded', 'warn')],
        ['Table 3.1', 'QA/QC summary', 'Validation run 2026-05-21', '§3.2', tag('current', 'good')],
      ],
    }),
    panel('One stale item, and it knows why',
      '<p class="mk-tight">Table 5.1 was generated before the laboratory amended PAS2026-04398. The arsenic result at MW03B went from 31 to 3.1 and stopped being an exceedance.</p>' +
      '<p class="mk-tight">The table is <strong>marked stale rather than silently regenerated</strong>. A figure that changes underneath a paragraph somebody has already written is how a report comes to contradict itself.</p>' +
      `<div class="mk-actions">${btn('Regenerate Table 5.1', 'primary')}${btn('Show what changed')}</div>`),
    '3fr 2fr',
  );

const narrative = () =>
  head('Interpretation — §6', 'Where the hydrogeologist writes, with the evidence beside them.', {
    route: 'a proposal — not in the product',
  }) +
  notice('warning', 'Proposed. FR-7 generates a report but nothing authors one.',
    'FR-7.1 to FR-7.6 cover templates, numbering, snapshots and branding — the mechanics of assembly. A monitoring report is roughly half interpretive prose, and nothing in the requirement set says where that prose is written. Today the answer is Word, which reintroduces exactly the round trip QB-2 exists to remove.') +
  cols(
    `<section class="mk-editor"><h2 class="mk-h2">6.1 Groundwater quality at MW05</h2>
      <div class="mk-editor__body">
        <p>Arsenic at MW05 was reported at <span class="mk-cite">28.4 µg/L</span>, above the ANZG 2018 95% species protection guideline value of <span class="mk-cite">13 µg/L</span> and the third consecutive quarter above that value <span class="mk-cite">[Figure 4.2]</span>.</p>
        <p>Mann-Kendall over fourteen quarterly rounds reports a significant increasing trend <span class="mk-cite">(p = 0.003)</span> with a Sen’s slope of <span class="mk-cite">1.7 µg/L per quarter</span> <span class="mk-cite">[Figure 4.6]</span>. The major-ion signature at MW05 is sulfate-dominated and distinct from the calcium-bicarbonate background of every other bore <span class="mk-cite">[Figure 4.3]</span>, which is consistent with TSF seepage rather than natural variation.</p>
        <p class="mk-editor__cursor">Cadmium could not be assessed at any location this round: the laboratory’s limit of reporting of 1.0 µg/L sits above the guideline value of 0.54 µg/L<span class="mk-caret"></span></p>
      </div></section>`,
    panel('Evidence to hand',
      '<p class="mk-tight mk-muted">Every citation is a live reference. If Figure 4.6 is regenerated, the number in the sentence is flagged — not silently updated, because a sentence somebody wrote is theirs.</p>' +
      table({
        head: ['Cited', 'Now reads', 'State'],
        rows: [
          ['28.4 µg/L', '28.4 µg/L', tag('agrees', 'good')],
          ['13 µg/L', '13 µg/L', tag('agrees', 'good')],
          ['p = 0.003', 'p = 0.003', tag('agrees', 'good')],
          ['1.7 µg/L/qtr', '1.72 µg/L/qtr', tag('rounding', 'warn')],
        ],
      }) +
      '<p class="mk-tight mk-muted">The unfinished sentence is the point. A practitioner writing about cadmium needs the indeterminate outcome in front of them, not in another tab.</p>'),
    '3fr 2fr',
  );

const snapshot = () =>
  head('Snapshot and regeneration', 'What was issued, and the ability to produce it again byte for byte.', {
    route: '/projects/:projectId/snapshots',
  }) +
  table({
    caption: 'Every issued report carries the data it was built from. QB-3 is not a promise, it is a stored object.',
    head: ['Report', 'Issued', 'To', 'Snapshot', 'Regenerates identically', 'Data since'],
    rows: [
      ['2026 Q1 Quarterly Groundwater', '2026-02-27', 'DWER', '<code>snap-2026Q1-8f14</code>', tag('verified', 'good'), '<span class="mk-muted">3 results superseded since issue</span>'],
      ['2025 Annual Environmental Report', '2026-01-30', 'DWER', '<code>snap-2025AER-2c90</code>', tag('verified', 'good'), '<span class="mk-muted">11 results superseded since issue</span>'],
      ['2025 Q4 Quarterly Groundwater', '2025-11-28', 'DWER', '<code>snap-2025Q4-71ab</code>', tag('verified', 'good'), '<span class="mk-muted">no change</span>'],
      ['2026 Q2 Quarterly Groundwater', '—', '—', '<span class="mk-num mk-num--nil">not taken</span>', tag('draft', 'warn'), '—'],
    ],
  }) +
  notice('default', '“Data since” is the column a regulator asks about.',
    'Three results in the Q1 report have been superseded by an amended certificate. The report as issued is intact and reproducible; the fact that the underlying data moved is recorded beside it. Reconstructing what was known when, for a submission made two years ago, is a query rather than an afternoon.');

/* ================================================================== *
 * J6 — Keep the obligations met
 * ================================================================== */

const obligations = () =>
  head('Reporting obligations', 'What is due, to whom, and when — across all projects.', {
    route: '/aggregate/obligations',
    toolbar: btn('Add obligation'),
  }) +
  // Counted from the register rather than typed beside it: these four read
  // 1 · 1 · 3 · 1 while the seed held 2 · 1 · 5 · 1, which is the wave-1
  // lesson (a hand-kept count rots, and it rots toward the flattering number).
  stats([
    stat(String(OBLIGATIONS.filter((o) => o.state === 'overdue').length), 'overdue', 'bad'),
    stat(String(OBLIGATIONS.filter((o) => o.state === 'at risk').length), 'at risk', 'warn'),
    stat(String(OBLIGATIONS.filter((o) => o.state === 'on track').length), 'on track', 'good'),
    stat(String(OBLIGATIONS.filter((o) => o.state === 'met').length), 'met', 'good'),
  ]) +
  table({
    caption: 'Statutory and internal obligations in one register, because they compete for the same week.',
    head: ['Obligation', 'To', 'Due', 'Remaining', 'Owner', 'Basis', 'State'],
    kind: 'matrix',
    label: 'Reporting obligations',
    rows: OBLIGATIONS.map((o) => [
      esc(o.what),
      esc(o.to),
      `<span class="sf-instant">${esc(o.due)}</span>`,
      o.state === 'overdue' ? `<span class="mk-num mk-num--bad">${esc(o.remaining)}</span>` : o.state === 'at risk' ? `<span class="mk-num mk-num--warn">${esc(o.remaining)}</span>` : `<span class="mk-num">${esc(o.remaining)}</span>`,
      esc(o.owner),
      `<span class="mk-muted">${esc(o.basis)}</span>`,
      tag(o.state, toneFor(o.state)),
    ]),
  }) +
  notice('default', 'A monitoring period is resolved in the site’s own timezone, never the server’s.',
    'A quarterly round at a Pilbara bore begins at 16:00 UTC on 31 December. A sample collected at 08:00 on 1 April local time belongs to the June quarter — get it wrong and the round it was meant to satisfy reads as missed while a spurious extra one reads as satisfied.');

const programme = () =>
  head('Sampling programme — GW-QTR', 'What each round expects, and what it got.', {
    route: '/projects/:projectId/programme',
  }) +
  cols(
    table({
      caption: 'The 2026 Q2 round, location by location.',
      head: ['Location', 'Suite', 'Due', 'Collected', 'Received', 'State'],
      rows: [
        [loc('MW01A'), 'Full groundwater', '2026-05-14', '2026-05-12', '2026-05-21', tag('complete', 'good')],
        [loc('MW03B'), 'Full groundwater', '2026-05-14', '2026-05-12', '2026-05-21', tag('complete', 'good')],
        [loc('MW05'), 'Full + PFAS', '2026-05-14', '2026-05-13', '2026-05-21', tag('complete', 'good')],
        [loc('MW07'), 'Full groundwater', '2026-05-14', '2026-05-13', '2026-05-21', tag('complete', 'good')],
        [loc('MW09'), 'Full groundwater', '2026-05-14', '2026-05-14', '2026-05-21', tag('complete', 'good')],
        [loc('MW11'), 'Full groundwater', '2026-05-14', '—', '—', tag('overdue', 'bad')],
        [loc('MW12'), 'Reduced — background', '2026-05-14', '2026-05-14', '2026-05-21', tag('complete', 'good')],
      ],
      kind: 'matrix',
      label: 'Reporting obligations',
    }),
    panel('Programme',
      facts([
        ['Frequency', 'Quarterly'],
        ['Anchor month', 'June — the reporting year ends in June, so a fiscal quarter is not a calendar quarter'],
        ['Timezone', esc(PROJECT.timezone)],
        ['Responsible', 'A. Nakamura — Hydrogeologist'],
        ['Next round opens', '2026-07-01 00:00 AWST'],
      ]) +
      '<p class="mk-tight mk-muted">MW11 is nine days overdue and has been alerted on and escalated. The round is not marked complete while a location is outstanding — a programme that reads as satisfied with a bore missing is worse than one that reads as nothing at all.</p>'),
    '3fr 2fr',
  ) +
  notice(
    'warning',
    'MW05 is on two programmes, and a screen showing one of them would be wrong.',
    'GW-QTR runs quarterly across the network. <strong>GW-MTH runs monthly at MW05 and MW07</strong>, and has since 2026-03-01, because a TARP Level 2 trigger required increased frequency — so MW05 is next due on 2026-06-14, not 2026-08-14. A programme that read as satisfied while a monthly round went uncollected is the two-surfaces-disagree failure this product exists to end, and it is the escalated round that gets missed because it is the one nobody planned for.',
  ) +
  table({
    caption: 'Every programme in force on this project, and what put each one there.',
    head: ['Programme', 'Frequency', 'Locations', 'In force since', 'Because', 'Next due'],
    rows: [
      ['<strong>GW-QTR</strong>', 'Quarterly', 'All 7 groundwater bores', '2019-03-01', '<span class="mk-muted">Licence condition 12(b)</span>', '<span class="sf-instant">2026-08-14</span>'],
      ['<strong>GW-MTH</strong>', 'Monthly', `${loc('MW05')}, ${loc('MW07')}`, '2026-03-01', `<span class="mk-muted">TARP Level 2 — <a class="mk-ref" href="#tarp">investigate and increase frequency</a></span>`, '<span class="sf-instant">2026-06-14</span>'],
      ['<strong>SW-QTR</strong>', 'Quarterly', loc('SW01'), '2019-03-01', '<span class="mk-muted">Licence condition 14 — discharge return</span>', '<span class="sf-instant">2026-08-14</span>'],
    ],
  }) +
  panel(
    'A frequency raised by a trigger comes back down by a decision',
    '<p class="mk-tight">GW-MTH exists because the data crossed a line, and it does not lapse when the data recrosses it. Standing it down is a decision somebody makes and signs, against the TARP’s own stand-down condition — four consecutive rounds below the trigger — because a monitoring frequency that relaxed itself the first quiet quarter is the one that misses the next event.</p>' +
    C.blastRadius({
      lede: 'Standing GW-MTH down would:',
      rows: [
        { what: 'Rounds removed from the calendar', n: '8 per year' },
        { what: 'Consecutive rounds below trigger required', n: '4 — currently 0' },
        { what: 'TARP level this would return MW05 to', n: 'Level 1' },
        { what: 'Historical rounds affected', n: '0' },
      ],
      action: 'Not available — the stand-down condition is not met',
      cancel: 'Review the TARP',
      reversible: 'The control is present and refuses, rather than absent. An operator who cannot see what would release them from a monitoring burden cannot plan against it.',
    }),
  );

const notification = () =>
  head('Statutory notification', 'A countdown against a window, from a timestamp nobody can move.', {
    route: '/projects/:projectId/notifications',
  }) +
  cols(
    panel('Condition 21 — notification of exceedance',
      facts([
        ['Obligation', esc(NOTIFICATION.obligation)],
        ['Became aware', `<strong>${esc(NOTIFICATION.becameAware)}</strong>`],
        ['Window', esc(NOTIFICATION.window)],
        ['Stored as', `<span class="mk-muted">${esc(NOTIFICATION.windowStored)}</span>`],
        ['Deadline', `<strong>${esc(NOTIFICATION.deadline)}</strong>`],
        ['Lodged', esc(NOTIFICATION.lodged)],
        ['Elapsed', `<span class="mk-num mk-num--good">${esc(NOTIFICATION.elapsed)}</span>`],
        ['Evidence', `<span class="mk-file">${esc(NOTIFICATION.evidence)}</span>`],
        ['By', esc(NOTIFICATION.by)],
      ]),
    ),
    panel('Why this timestamp is immutable',
      `<p class="mk-tight">${esc(NOTIFICATION.frozen)}</p>` +
      '<p class="mk-tight">A statutory notification window runs from “became aware”. Missing it is an offence rather than a service failure, so the database refuses an update that moves that timestamp — or the obligation link, because the two together are what the countdown was computed from.</p>' +
      '<p class="mk-tight mk-muted">“As soon as practicable” is stored as a null window and read as <em>owed now</em>, never as a blank. The countdown invents no number, and time remaining is truncated rather than rounded — 4 h 59 m never displays as 5 h.</p>'),
    '1fr 1fr',
  ) +
  notice(
    'warning',
    'One moment of awareness, two statutory duties, two parts of the regulator.',
    'The licence condition is not the only thing with a clock. The Contaminated Sites Act imposes its own duty on becoming aware of known or suspected contamination — a separate instrument, a separate branch of DWER, a separate lodgement — running from the same timestamp. Discharging one does not discharge the other, and the two are routinely conflated because most products model only the duty written into the licence.',
  ) +
  table({
    caption: 'Every statutory duty running from the awareness of 2026-05-22 09:14 AWST.',
    head: ['Duty', 'Instrument', 'To', 'Window', 'Lodged', 'State'],
    rows: STATUTORY.map((d) => [
      `<strong>${esc(d.duty)}</strong>` + (d.note ? `<br><span class="mk-muted">${esc(d.note)}</span>` : ''),
      `<span class="mk-muted">${esc(d.instrument)}</span>`,
      esc(d.to),
      esc(d.window),
      `<span class="sf-instant">${esc(d.lodged)}</span>`,
      C.status(d.state, d.state === 'met' ? 'good' : 'bad'),
    ]),
    kind: 'matrix',
    label: 'Statutory duties from this awareness',
  }) +
  C.card({
    tone: 'bad',
    head: '<span class="mk-queue__kind">Owed now</span><span class="mk-queue__age">since 2026-05-22 09:14 AWST</span>',
    body:
      '<p class="mk-queue__headline">The Contaminated Sites Act report has not been lodged.</p>' +
      '<p class="mk-queue__context">PFOS and PFHxS at 37× the guideline value in groundwater is, on its face, a suspected contaminated site. The duty runs from awareness and carries no fixed window, so it is owed now — and the countdown says exactly that rather than inventing a number or leaving a blank. It sits on the work queue beside the licence notification, not behind it.</p>',
    foot:
      C.btn('Draft the report', 'primary') +
      C.btn('Record that legal advice is being taken') +
      '<span class="mk-muted">Recording that it is with legal discharges nothing. The clock keeps running and the record says so.</span>',
  }) +
  table({
    caption: 'Notification history on this licence.',
    scroll: true,
    head: ['Became aware', 'Trigger', 'Window', 'Lodged', 'Within window', 'Evidence'],
    rows: [
      ['<span class="sf-instant">2026-05-22 09:14</span>', 'PFOS + PFHxS · MW05', 'As soon as practicable', '<span class="sf-instant">2026-05-22 14:30</span>', tag('met', 'good'), 'DWER-N-2026-11842.pdf'],
      ['<span class="sf-instant">2026-02-14 11:02</span>', 'Arsenic 2nd consecutive · MW05', '14 days', '<span class="sf-instant">2026-02-19 09:40</span>', tag('met', 'good'), 'DWER-N-2026-04120.pdf'],
      ['<span class="sf-instant">2025-08-19 15:33</span>', 'Copper above DGV · MW05', '14 days', '<span class="sf-instant">2025-08-28 16:12</span>', tag('met', 'good'), 'DWER-N-2025-31877.pdf'],
    ],
  });

const signoff = () =>
  head('Approval and sign-off', 'Who approved exactly what, and when.', {
    route: '/projects/:projectId/signoff',
    toolbar: btn('Request approval', 'primary'),
  }) +
  notice('default', 'Sign-off is not a validation state.',
    'Validation says the data is right. Approval says a named person accepts responsibility for what is about to leave the building. Collapsing the two means the person who screened the QC is also, silently, the person who signed the submission.') +
  table({
    caption: 'Approvals on this project.',
    head: ['What', 'Approver', 'At', 'Covering', 'State'],
    rows: [
      ['2026 Q2 Quarterly Groundwater Report', 'R. Whitmore — Environmental Lead', '—', '231 results · snapshot not yet taken', tag('awaiting', 'warn')],
      ['2026 Q2 data release to report', 'A. Nakamura — Hydrogeologist', '<span class="sf-instant">2026-05-22 16:20</span>', '231 results · validation state screened', tag('approved', 'good')],
      ['2026 Q1 Quarterly Groundwater Report', 'R. Whitmore — Environmental Lead', '<span class="sf-instant">2026-02-27 09:05</span>', '<code>snap-2026Q1-8f14</code> · 228 results', tag('approved', 'good')],
      ['2025 Annual Environmental Report', 'R. Whitmore — Environmental Lead', '<span class="sf-instant">2026-01-30 14:44</span>', '<code>snap-2025AER-2c90</code> · 912 results', tag('approved', 'good')],
    ],
  }) +
  notice('warning', 'The Q1 approval covers a snapshot in which three results have since been superseded.',
    'The approval is not invalidated — it recorded what was true when it was given, which is the whole point of recording it against a snapshot. What the product owes is visibility, and that is the “data since” column on the snapshot register.');

/* ================================================================== *
 * J7 — Prove what was known, and when
 * ================================================================== */

const lineage = () =>
  head('Why is this number what it is?', 'One result, and everything that produced it.', {
    route: 'a proposal — the product carries lineage as a panel and the result page, not a route',
    toolbar: btn('Copy as evidence') + btn('Open certificate'),
  }) +
  notice('warning', 'Proposed as a surface. The engine is complete and nothing shows it.',
    'FR-5, G-09b and the bitemporal survey model are the deepest architectural investment in this product, and “why is this number what it is” is the question no incumbent answers well. There is a lineage graph with single-query answerability underneath, and not one pixel on top of it. This is the highest-value missing screen in the catalogue.') +
  `<div class="mk-lineage__subject">
    <span class="mk-lineage__value">${esc(LINEAGE.value)}</span>
    <span class="mk-lineage__meta">${esc(LINEAGE.analyte)} · ${esc(LINEAGE.location)} · collected ${esc(LINEAGE.collected)}</span>
  </div>` +
  `<ol class="mk-chain">${LINEAGE.chain.map((c, i) => `<li class="mk-chain__step mk-chain__step--${c.kind}">
      <span class="mk-chain__n">${i + 1}</span>
      <div class="mk-chain__text">
        <span class="mk-chain__label">${esc(c.step)}</span>
        <span class="mk-chain__what">${esc(c.what)}</span>
        <span class="mk-chain__detail">${esc(c.detail)}</span>
      </div></li>`).join('')}</ol>` +
  notice('default', 'Nine steps, one query.',
    'From the laboratory’s own file to the statutory notification it eventually caused. Nothing here is reconstructed after the fact — every step was recorded when it happened, because a derivation that does not carry its rule and its inputs is a number nobody can defend (PP3).');

const auditTrail = () =>
  head('Audit trail', 'Every mutation, who made it, and what it changed.', {
    route: '/projects/:projectId/audit',
    toolbar: btn('Filter by principal') + btn('Export'),
  }) +
  table({
    caption: 'Recorded by the database, not by the application. There is no unattributed path.',
    head: ['At', 'Principal', 'Action', 'Table', 'What', 'Transaction'],
    kind: 'matrix',
    label: 'Audit trail',
    rows: AUDIT.map((a) => [
      `<span class="sf-instant">${esc(a.at)}</span>`,
      esc(a.who),
      tag(a.action, a.action === 'insert' ? 'good' : 'warn'),
      `<code>${esc(a.table)}</code>`,
      esc(a.what),
      `<code class="mk-muted">${esc(a.tx)}</code>`,
    ]),
  }) +
  cols(
    notice('default', 'A delete is recorded, not performed.',
      'The trigger turns a destructive statement into a recorded non-event. Nothing in this product is destroyed — supersession, soft delete and versioning throughout, because retention is a policy rather than an accident (PP6).'),
    notice('default', 'Everything inside one transaction reads back as one act.',
      'The 42 results and 42 lineage records committed at 10:22:41 share a transaction id, so “what did that import do” is one row to expand rather than eighty-four to correlate by timestamp.'),
    '1fr 1fr',
  );

const supersession = () =>
  head('Supersession', 'What a re-issued certificate changed, and everything that followed it.', {
    route: '/projects/:projectId/supersessions',
  }) +
  `<p class="sf-lede mk-tight">${esc(SUPERSESSION.subject)}</p>` +
  cols(
    panel('Before', facts([
      ['Value', `<span class="mk-num mk-num--bad">${esc(SUPERSESSION.original.value)}</span>`],
      ['Certificate', `<code>${esc(SUPERSESSION.original.certificate)}</code>`],
      ['Issued', esc(SUPERSESSION.original.issued)],
      ['Outcome', esc(SUPERSESSION.original.outcome)],
    ])),
    panel('After', facts([
      ['Value', `<span class="mk-num mk-num--good">${esc(SUPERSESSION.superseding.value)}</span>`],
      ['Certificate', `<code>${esc(SUPERSESSION.superseding.certificate)}</code>`],
      ['Issued', esc(SUPERSESSION.superseding.issued)],
      ['Outcome', esc(SUPERSESSION.superseding.outcome)],
    ])),
    '1fr 1fr',
  ) +
  notice('default', `Reason recorded: ${esc(SUPERSESSION.reason)}`, 'The superseded value is not deleted. It stays on the crosstab struck through beside the new one, because a reader looking at last quarter’s printed report needs to find the number it contains.') +
  table({
    caption: 'The cascade. A re-issued certificate that does not reach the exceedance flags and the issued reports has orphaned them.',
    head: ['What followed', 'Outcome'],
    rows: SUPERSESSION.cascade.map((c) => [esc(c.what), `<span class="mk-muted">${esc(c.outcome)}</span>`]),
  });

/* ================================================================== *
 * J8 — Configure the instance
 * ================================================================== */

const criteriaLibrary = () =>
  head('Criteria library', 'Which limits apply, to what, and from when.', {
    route: '/projects/:projectId/criteria',
    toolbar: btn('New criteria set', 'primary'),
  }) +
  table({
    caption: 'A criteria set is versioned with effective dates. Evaluating 2019 data against a 2024 licence table is a defect, not a feature.',
    head: ['Criteria set', 'Version', 'Effective', 'Matrix', 'Applies to', 'Analytes', 'State'],
    kind: 'matrix',
    label: 'Criteria library',
    rows: CRITERIA_LIBRARY.map((c) => [
      esc(c.set),
      `<code>${esc(c.version)}</code>`,
      `<span class="sf-instant">${esc(c.effective)}</span>`,
      esc(c.matrix),
      `<span class="mk-muted">${esc(c.applies)}</span>`,
      `<span class="mk-num">${c.analytes}</span>`,
      tag(c.state, c.state === 'active' ? 'good' : c.state === 'historic' ? 'neutral' : 'warn'),
    ]),
  }) +
  cols(
    panel(
      'PFAS is assessed here against ANZG, and ANZG is not the operative PFAS framework',
      '<p class="mk-tight">The PFAS National Environmental Management Plan is the agreed ANZ position. It carries its own values, its own derived sums and — the part that matters — a value per <em>receptor</em>, because what protects freshwater ecology is not what protects a drinking-water supply.</p>' +
        table({
          head: ['Criteria set', 'Version', 'Protects', 'PFOS + PFHxS', 'State'],
          rows: [
            ['PFAS NEMP — freshwater 95%', '2.0', 'Aquatic ecosystems', '<span class="mk-num">0.13 µg/L</span>', tag('available', 'neutral')],
            ['PFAS NEMP — drinking water', '2.0', 'Human health, potable', '<span class="mk-num">0.07 µg/L</span>', tag('available', 'neutral')],
            ['PFAS NEMP — recreational', '2.0', 'Human health, contact', '<span class="mk-num">0.7 µg/L</span>', tag('available', 'neutral')],
            ['ANZG 2018 — 95%', '2018.1', 'Aquatic ecosystems', '<span class="mk-num">0.13 µg/L</span>', tag('active', 'good')],
          ],
        }) +
        '<p class="mk-tight">Assessing against ANZG alone is defensible for freshwater ecology and insufficient the moment a potable or recreational receptor sits downgradient. Because evaluation here is concurrent and every set is versioned, carrying all three is a content decision rather than an architectural one — which is exactly the kind of thing a customer should be able to do without calling anybody.</p>',
    ) +
    panel('Applicability', '<p class="mk-tight">A criteria set is bound by matrix, location group, hydrostratigraphic unit, analyte, fraction and period — not by a global switch. Two sets apply to MW05 concurrently and both outcomes are kept.</p>' +
      '<p class="mk-tight mk-muted">G8 promises the customer’s own team can do this without an implementation consultant. Today it is a seed file, and this screen is what that promise actually requires.</p>'),
    panel('Non-detect rule is bound to the set, not to the instance',
      table({
        head: ['Criteria set', 'Non-detect treatment'],
        rows: [
          ['ANZG 2018 — 95%', '<span class="mk-muted">exclude from derived sums</span>'],
          ['Licence Table 4', '<span class="mk-muted">half the limit of reporting</span>'],
        ],
      }) +
      '<p class="mk-tight mk-muted">Regulators specify different rules, and the derived total can cross a criterion depending on which applied. A global setting would make one of the two answers silently wrong (FR-2.2).</p>'),
    '1fr 1fr',
  );

const formatDesigner = () =>
  head('EDD formats', 'A laboratory’s file shape, described rather than coded.', {
    route: '/config/formats',
    toolbar: btn('New format', 'primary'),
  }) +
  table({
    caption: 'Formats defined as configuration (FR-3.1). A new laboratory is a definition, not a release.',
    head: ['Format', 'Version', 'Files', 'Fields', 'Used by', 'State'],
    rows: FORMATS.map((f) => [
      esc(f.name), `<code>${esc(f.version)}</code>`, esc(f.files),
      `<span class="mk-num">${f.fields}</span>`, `<span class="mk-muted">${esc(f.labs)}</span>`,
      tag(f.state, f.state === 'active' ? 'good' : 'neutral'),
    ]),
  }) +
  cols(
    panel('ESdat ELDF-4 — field mapping',
      table({
        head: ['Source field', 'Maps to', 'Rule'],
        rows: [
          ['<code>ChemName</code>', 'analyte', '<span class="mk-muted">dictionary lookup, then fuzzy with confidence</span>'],
          ['<code>Result</code>', 'result value', '<span class="mk-muted">−999 → analysis aborted · −997 → text result</span>'],
          ['<code>EQL</code>', '<strong>LOR</strong>', '<span class="mk-muted">renamed inward — the domain says LOR</span>'],
          ['<code>Units</code>', 'unit', '<span class="mk-muted">case-normalised, converted with the rule recorded</span>'],
          ['<code>SampleCode</code>', 'sample', '<span class="mk-muted">joins the Sample file on the pair</span>'],
        ],
      })),
    panel('The vocabulary maps inward, never outward',
      '<p class="mk-tight">ESdat calls it <code>EQL</code>. The domain calls it <strong>LOR</strong>, and so does every screen, every column heading and every report label in this product.</p>' +
      '<p class="mk-tight mk-muted">A format that leaked its own vocabulary into the application would put two words for one concept in front of a practitioner, and the glossary guard fails the build for exactly that.</p>'),
    '3fr 2fr',
  );

const dictionary = () =>
  head('Analyte dictionary', 'The names, the synonyms, and what each one actually is.', {
    route: '/config/analytes',
    toolbar: btn('Add synonym'),
  }) +
  table({
    caption: 'Distinct concepts stay distinct. LOR, MDL and PQL are three columns, never one friendlier field.',
    head: ['Analyte', 'CAS', 'Group', 'Basis', 'Default unit', 'LOR', 'MDL', 'Synonyms'],
    scroll: true, label: 'The analyte dictionary',
    rows: [
      ['Arsenic (filtered)', '7440-38-2', 'Metals', 'As(V)', 'µg/L', '<span class="mk-num">1.0</span>', '<span class="mk-num">0.3</span>', '<span class="mk-muted">As-D, Arsenic dissolved, As (filt)</span>'],
      ['Cadmium (filtered)', '7440-43-9', 'Metals', 'dissolved Cd, unspeciated', 'µg/L', '<span class="mk-num">1.0</span>', '<span class="mk-num">0.2</span>', '<span class="mk-muted">Cd-D, Cadmium dissolved</span>'],
      ['Nitrate as N', '14797-55-8', 'Nutrients', 'as N', 'mg/L', '<span class="mk-num">0.05</span>', '<span class="mk-num">0.01</span>', '<span class="mk-muted">NO3-N, Nitrate (as N), NOx-N ⚠</span>'],
      ['Sulfate as SO₄', '14808-79-8', 'Major ions', 'as SO₄', 'mg/L', '<span class="mk-num">1</span>', '<span class="mk-num">0.5</span>', '<span class="mk-muted">Sulphate, SO4, SO4--</span>'],
      ['PFOS (linear)', '1763-23-1', 'PFAS', 'linear isomer', 'ng/L', '<span class="mk-num">2.0</span>', '<span class="mk-num">0.5</span>', '<span class="mk-muted">Perfluorooctane sulfonate</span>'],
      ['PFHxS', '355-46-4', 'PFAS', 'total', 'ng/L', '<span class="mk-num">2.0</span>', '<span class="mk-num">0.5</span>', '<span class="mk-muted">Perfluorohexane sulfonate</span>'],
    ],
  }) +
  notice('warning', 'NOx-N is flagged rather than accepted as a synonym for nitrate.',
    'Nitrate plus nitrite is not nitrate. A laboratory reporting NOx-N against a nitrate criterion is the kind of quiet substitution that survives three reporting cycles and then fails a peer review. It routes to the exception queue with the difference stated.');

const roles = () =>
  head('Access', 'Who can see and do what, resolved from the customer’s directory.', {
    route: '/instance/access',
  }) +
  table({
    caption: 'Role bindings say “members of this directory group hold this role in this project”. There is no user table.',
    head: ['Directory group', 'Role', 'Project', 'Members', 'Can'],
    rows: [
      ['<code>WDL-Env-Leads</code>', 'Approver', 'MOCK-WDL', '<span class="mk-num">2</span>', '<span class="mk-muted">Approve, sign off, issue reports</span>'],
      ['<code>WDL-Env-Team</code>', 'Contributor', 'MOCK-WDL', '<span class="mk-num">6</span>', '<span class="mk-muted">Import, review, validate, produce figures</span>'],
      ['<code>WDL-Geotech</code>', 'Contributor', 'MOCK-WDL', '<span class="mk-num">3</span>', '<span class="mk-muted">TARP acknowledgement, instrumentation</span>'],
      ['<code>WDL-Exec</code>', 'Reader', 'all projects', '<span class="mk-num">4</span>', '<span class="mk-muted">Read registers and issued reports</span>'],
    ],
  }) +
  cols(
    notice('default', 'Membership is resolved on every request, not copied at sign-in.',
      'Somebody removed from a directory group loses access on their next request rather than at their next sign-in. Deprovisioning that waits for a session to expire is deprovisioning in name only.'),
    notice('default', 'Authorisation in the application; row-level security beneath it.',
      'The repository layer throws when a query is not scoped. The policy beneath it returns zero rows, because a policy cannot safely raise. Two mechanisms doing two jobs, not one wearing two hats.'),
    '1fr 1fr',
  );

/* ================================================================== *
 * J9 — Keep the instance alive
 * ================================================================== */

const instanceHealth = () =>
  head('Instance', 'What is running, at what version, and whether it is well.', {
    route: '/instance',
  }) +
  stats([
    stat(INSTANCE.version, 'version', 'good'),
    stat('4', 'services ok', 'good'),
    stat('2.84 M', 'results'),
    stat('38 m', 'measured RTO', 'good'),
  ]) +
  cols(
    table({
      caption: 'Service health, as /healthz reports it.',
      head: ['Service', 'State', 'Detail'],
      rows: INSTANCE.services.map((s) => [esc(s.name), tag(s.state, 'good'), `<span class="mk-muted">${esc(s.detail)}</span>`]),
    }),
    panel('Deployment', facts([
      ['Version', `<code>${esc(INSTANCE.version)}</code> · released ${esc(INSTANCE.released)}`],
      ['Commit', `<code>${esc(INSTANCE.commit)}</code>`],
      ['Database', esc(INSTANCE.database)],
      ['Tenancy', 'Single-tenant, customer’s own subscription'],
      ['Egress', 'None. No Strataflow-operated telemetry'],
    ])),
    '3fr 2fr',
  ) +
  notice('default', 'This one stays a terminal, deliberately.',
    'A console for a solo operator running N single-tenant instances is a surface to keep in step with the thing it manages, and R4 names version drift as the primary failure mode. The scheduler already serves its own health from the last completed tick, because “the process is up” is not the question an operator has. What is worth building here is legible output, not a dashboard.');

const diagnostics = () =>
  head('Backup, restore and diagnostics', 'The proof that a restore works, not the assertion that backups run.', {
    route: 'CLI — pnpm run backup · restore:drill',
  }) +
  cols(
    panel('Last drill', facts([
      ['Backup taken', esc(INSTANCE.backup.last)],
      ['Size', esc(INSTANCE.backup.size)],
      ['Integrity', `<span class="mk-num mk-num--good">${esc(INSTANCE.backup.verified)}</span>`],
      ['RPO', esc(INSTANCE.backup.rpo)],
      ['RTO', esc(INSTANCE.backup.rto)],
      ['Drill executed', esc(INSTANCE.backup.drill)],
    ]) + '<p class="mk-tight mk-muted">The drill runs the whole cycle — back up, write more, drop the database, restore, measure. An untested restore is not a backup.</p>'),
    panel('Customer-initiated diagnostics',
      '<p class="mk-tight">There is no telemetry from a customer deployment, so a diagnostic bundle is something the customer runs and sends: version, configuration, logs, schema state, recent errors.</p>' +
      table({
        head: ['In the bundle', 'Not in the bundle'],
        rows: [
          ['Version and commit', '<span class="mk-muted">Any monitoring result</span>'],
          ['Migration state', '<span class="mk-muted">Any location or coordinate</span>'],
          ['Recent errors, redacted', '<span class="mk-muted">Any principal identifier</span>'],
          ['Schema and policy inventory', '<span class="mk-muted">Any certificate or report</span>'],
        ],
      }),
    ),
    '1fr 1fr',
  ) +
  notice('default', 'Restore is not done until the content check passes.',
    'The backup writes a manifest — audit and lineage digests, the trigger, policy and grant inventory — and the restore is measured against it. A database that comes back up with its audit triggers missing has restored the data and lost the record.');

/* ================================================================== *
 * The second review pass — the screens a practitioner went looking
 * for and did not find.
 * ================================================================== */

/**
 * How a hardness-dependent criterion was arrived at.
 *
 * This is the highest-value screen in the second pass. Three of the five metal
 * exceedances at MW05 rest on a criterion that is a *function of another
 * measurement*, and neither incumbent shows the working — ESdat applies
 * conditional action levels, EQuIS emits an action-level code, and both hand
 * over the answer without the arithmetic. Showing it is not a new competitive
 * claim; it is the lineage claim, applied to the one derivation that decides
 * whether an exceedance survives review.
 */
const hardnessDerivation = () => {
  const H = HARDNESS;
  return (
    head('How this criterion was calculated', 'A hardness-modified guideline value, and every input that produced it.', {
      route: '/projects/:projectId/hardness',
      toolbar: C.lineageButton('Lineage of the hardness result') + C.exportMenu(),
    }) +
    notice(
      'warning',
      'A criterion that is a function of another result inherits everything true about that result.',
      'Cadmium, nickel and zinc at this site are assessed against values computed from hardness. If the hardness is wrong — wrong sample, wrong date, derived rather than measured, or above the range the relationship is defined over — then three exceedances are wrong with it, and nothing on a conventional results screen would show you that.',
    ) +
    cols(
      panel(
        'The hardness this criterion used',
        facts([
          ['Sample', `<span class="mk-file">${esc(H.sample)}</span>`],
          ['Reported hardness', `<strong class="mk-num">${esc(H.measured.value)}</strong>`],
          ['How', esc(H.measured.source)],
          ['Method', esc(H.measured.method)],
          ['Reporting limit', esc(H.measured.lor)],
        ]) +
          '<h3 class="mk-h3">Cross-checked against the major cations</h3>' +
          table({
            head: ['Input', 'Value'],
            scroll: true, label: 'Hardness inputs and their cross-checks',
            rows: [
              ['Calcium (filtered)', `<span class="mk-num">${esc(H.crossCheck.calcium)}</span>`],
              ['Magnesium (filtered)', `<span class="mk-num">${esc(H.crossCheck.magnesium)}</span>`],
              ['Formula', `<code class="mk-file">${esc(H.crossCheck.formula)}</code>`],
              ['Computed hardness', `<span class="mk-num">${esc(H.crossCheck.computed)}</span>`],
              ['Agreement', C.status(H.crossCheck.agreement, 'good')],
            ],
          }) +
          `<p class="mk-tight">${esc(H.crossCheck.note)}</p>`,
      ),
      panel(
        'The relationship, and where it stops',
        `<p class="mk-tight"><code class="mk-file">${esc(H.equation)}</code></p>` +
          `<p class="mk-tight"><strong>Capped.</strong> ${esc(H.cap)}</p>` +
          C.blastRadius({
            lede: 'What the cap costs, stated rather than hidden:',
            rows: [
              { what: 'Measured hardness', n: '412 mg/L' },
              { what: 'Hardness used', n: '400 mg/L' },
              { what: 'Zinc criterion at 412', n: '8.19 µg/L' },
              { what: 'Zinc criterion at the cap', n: '8.00 µg/L' },
              { what: 'Outcomes that change', n: '0' },
            ],
            action: 'The conservative direction, and it is stated',
            cancel: 'Rule hardness-modified-tv v3',
            reversible:
              'The cap makes the criterion slightly stricter, never looser. Extrapolating the relationship past the range it was derived over would be the silent choice, and it would be the one that favours the operator.',
          }) +
          `<p class="mk-tight mk-muted">Rule version <code class="mk-file">${esc(H.ruleVersion)}</code> — bound to the criteria set, not to the instance.</p>`,
      ),
    ) +
    '<h2 class="mk-h2">What it produced, analyte by analyte</h2>' +
    table({
      caption: 'Base value, exponent, resulting criterion, and the result it was compared against.',
      head: ['Analyte', 'Base value', 'Exponent', 'Criterion here', 'Result', 'Outcome', 'Note'],
      rows: H.derived.map((d) => [
        esc(d.analyte),
        `<span class="mk-num">${esc(d.base)}</span>`,
        `<span class="mk-num">${esc(d.slope)}</span>`,
        `<strong class="mk-num">${esc(d.criterion)}</strong>`,
        `<span class="mk-num${d.outcome === 'exceedance' ? ' mk-num--bad' : ''}">${esc(d.result)}</span>`,
        `<span class="sf-result">${mark(d.outcome, 'ANZG 2018 · 95%')}<span style="margin-left:.4rem">${esc(d.outcome)}</span></span>`,
        `<span class="mk-muted">${esc(d.note)}</span>`,
      ]),
      kind: 'matrix',
      label: 'Hardness-modified criteria',
    }) +
    C.card({
      tone: 'bad',
      head: '<span class="mk-queue__kind">Why this screen exists</span>',
      body: `<p class="mk-tight">${esc(H.whatIfWrong)}</p>` +
        '<p class="mk-tight">So the hardness result is not a supporting analyte on a crosstab. It is an input to three criteria, and it is treated here as what it is — with its own reconciliation, its own cross-check and its own place in the lineage of every value it governs.</p>',
    })
  );
};

/**
 * The results that could not be assessed.
 *
 * The exceedance register is right to exclude them and wrong to leave them
 * nowhere. A documented incumbent failure is exactly this state rendered as a
 * pass, and neither incumbent has a register of it in any form.
 */
const indeterminateRegister = () => (
  head('Could not be assessed', 'Results where nothing can be said either way, and what it would take to change that.', {
    route: '/projects/:projectId/exceedances (could not be assessed)',
    toolbar: C.exportMenu() + C.btn('Add to the report', 'primary'),
  }) +
  stats([
    stat('7', 'could not be assessed', 'warn'),
    stat('1', 'analyte affected'),
    stat('7 of 7', 'locations'),
    stat('$126', 'to close, this round', 'good'),
  ]) +
  notice(
    'warning',
    'This is a finding, and it belongs in the report.',
    'Seven cadmium results were reported below a limit that sits above the guideline value. Nothing was measured either way. They are not compliant and they are not exceedances — writing them into either column is the single most consequential error available here, and a support thread on an incumbent records exactly that happening by default.',
  ) +
  table({
    caption: 'One row per result per criterion that could not be applied to it.',
    head: ['Location', 'Analyte', 'Reported', 'Reporting limit', 'Criterion', 'Set', 'Limit exceeds criterion by', 'What would close it'],
    rows: INDETERMINATE.map((i) => [
      loc(i.location),
      esc(i.analyte),
      `<span class="mk-num">${esc(i.reported)}</span>`,
      `<span class="mk-num">${esc(i.lor)}</span>`,
      `<span class="mk-num">${esc(i.criterion)}</span>`,
      `<span class="mk-muted">${esc(i.set)}</span>`,
      `<span class="mk-num mk-num--warn">${esc(i.gap)}</span>`,
      esc(i.close),
    ]),
    kind: 'matrix',
    label: 'Results that could not be assessed',
  }) +
  cols(
    panel(
      'Closing it is a purchasing decision, so the screen makes it one',
      C.blastRadius({
        lede: 'Moving cadmium to ICP-MS/MS at a 0.1 µg/L reporting limit:',
        rows: [
          { what: 'Results that become assessable', n: '7 per round' },
          { what: 'Additional cost per round', n: '$126' },
          { what: 'Additional cost per year', n: '$504' },
          { what: 'Criterion the new limit sits below', n: '0.54 µg/L — by 5.4×' },
          { what: 'Rounds of history this fixes', n: '0 — it reaches forward only' },
        ],
        action: 'Raise with the laboratory',
        cancel: 'Keep reporting it as unassessable',
        reversible:
          'Nothing here changes a stored result. A method change from the next round is recorded as a comparability note on the plate, because a reporting limit that steps down mid-series is visible in every figure that spans the change.',
      }),
    ),
    panel(
      'What the report says',
      '<p class="mk-tight">Generated into §3, and worded so a non-technical reader cannot mistake it for a clean result:</p>' +
        C.card({
          tone: 'neutral',
          head: '<span class="mk-queue__kind">Report §3 — Data quality</span>',
          body:
            '<p class="mk-tight"><em>Cadmium was reported by the laboratory at a limit of reporting of 1.0 µg/L. The applicable ANZG 2018 95% species protection guideline value at the measured hardness is 0.54 µg/L. The reporting limit therefore sits above the guideline value and cadmium could not be assessed against it at any location this round. These results are not reported as compliant. A method offering a limit of reporting of 0.1 µg/L is available and is recommended from 2026 Q3.</em></p>',
        }) +
        '<p class="mk-tight">Compare the alternative, which is what a product that has no state for this produces: seven rows of <code class="mk-file">0.001</code> in a compliance column, and a reader with no way to know.</p>',
    ),
  )
);

/** Purging and stabilisation — why the sample is defensible before the number is. */
const purgeLog = () => {
  const P = PURGE;
  const row = (r, i) => {
    const cells = [
      `<span class="mk-num">${esc(r.t)}</span>`,
      `<span class="mk-num">${r.swl.toFixed(2)}</span>`,
      `<span class="mk-num">${r.ph.toFixed(2)}</span>`,
      `<span class="mk-num">${r.ec}</span>`,
      `<span class="mk-num">${r.do.toFixed(2)}</span>`,
      `<span class="mk-num">${r.orp}</span>`,
      `<span class="mk-num${r.turb > 10 ? ' mk-num--warn' : ''}">${r.turb.toFixed(1)}</span>`,
      `<span class="mk-num">${r.temp.toFixed(1)}</span>`,
      r.stable ? C.status('in tolerance', 'good') : C.status('still moving', 'neutral'),
    ];
    return cells;
  };
  return (
    head('Purge and stabilisation — MW05', 'What the bore was doing before the sample was taken.', {
      route: '/projects/:projectId/purge',
      toolbar: C.exportMenu() + C.btn('Open the field round'),
    }) +
    notice(
      'default',
      'A sample is defensible because the parameters had stabilised, not because a number was written in a box.',
      'Three consecutive readings within tolerance is the test. Without the readings behind it, every certificate, lineage record and evaluation downstream rests on an assertion nobody can check — and it is the first thing a reviewer challenges when a result is inconvenient.',
    ) +
    facts([
      ['Method', esc(P.method)],
      ['Pump and intake', esc(P.pump)],
      ['Rate', esc(P.rate)],
      ['Purging started', `<span class="sf-instant">${esc(P.startedAt)}</span>`],
      ['Sample collected', `<span class="sf-instant">${esc(P.sampledAt)}</span>`],
      ['Volume purged', esc(P.purgedVolume)],
      ['Drawdown', esc(P.drawdown)],
    ]) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">The readings</h2>' +
    table({
      caption: `Tolerances — pH ${P.tolerance.ph} · EC ${P.tolerance.ec} · DO ${P.tolerance.do} · ORP ${P.tolerance.orp} · turbidity ${P.tolerance.turbidity} · temperature ${P.tolerance.temp}.`,
      head: ['Time', 'SWL m btoc', 'pH', 'EC µS/cm', 'DO mg/L', 'ORP mV', 'Turbidity NTU', 'Temp °C', 'State'],
      rows: P.readings.map(row),
      kind: 'matrix',
      label: 'Purge and stabilisation readings',
    }) +
    C.receipt({
      headline: esc(P.verdict),
      facts: [
        ['Stabilised at', '08:06 AWST'],
        ['Readings in tolerance', '3 consecutive'],
        ['Collected', '08:19 AWST'],
        ['Field EC at collection', '3410 µS/cm'],
      ],
      next: { label: 'The results this sample produced', target: 'crosstab' },
    }) +
    cols(
      panel(
        'The field EC and the laboratory EC should agree, and here they do',
        table({
          head: ['Measured', 'Value', 'Difference'],
          rows: [
            ['Field, at collection', '<span class="mk-num">3410 µS/cm</span>', '—'],
            ['Laboratory, on receipt', '<span class="mk-num">3396 µS/cm</span>', '<span class="mk-num mk-num--good">0.4%</span>'],
          ],
        }) +
          '<p class="mk-tight">A large disagreement between the two means the sample changed between the bore and the bench — degassing, a temperature artefact, or a mislabelled container — and it is worth catching before the whole suite is interpreted. It is a consistency check that costs nothing and nobody runs it.</p>',
      ),
      panel(
        'The bore that did not stabilise, and what the record says',
        C.card({
          tone: 'warn',
          head: `<span class="mk-queue__kind">${esc(PURGE.failing.location)}</span><span class="mk-queue__age">14 readings · 22 L</span>`,
          body:
            `<p class="mk-tight">${esc(PURGE.failing.what)}</p>` +
            `<p class="mk-tight">${esc(PURGE.failing.consequence)}</p>`,
          foot: '<span class="mk-tag mk-tag--warn">Qualifier T carried to every metal result</span>',
        }) +
          '<p class="mk-tight">The field officer sampled anyway, which is the right call at a remote bore on a day rate — and the record makes it a stated judgement rather than an invisible one. A product that only accepts stabilised samples would simply have no record of this bore at all.</p>',
      ),
    )
  );
};

/**
 * The chain of custody — created in the field, sealed, transferred, received.
 *
 * **The New-Screen Test, answered.** A custody chain is a durable legal record
 * with a lifecycle of its own: it is raised at the first bore, it accumulates
 * containers over three days, it is sealed, it is handed to a courier, and it
 * is closed by a laboratory that may or may not agree with what it says.
 * `#receipt` owns exactly one moment of that — the condition the samples were
 * in when the box was opened — and nothing owned the rest. Journeys 1 and 5
 * both step through *eCOC* and both landed on nothing.
 *
 * **The label is `docs/GLOSSARY.md`'s, not the industry's.** The glossary has
 * no entry for "eCOC" and one for **custody transfer**: *one handover of a set
 * of samples from one party to another, with the time, both parties, and the
 * seal on the container.* So the screen is called Chain of custody — the
 * glossary's own phrase for the sequence those transfers make — and "COC" and
 * "eCOC" appear on it as what practitioners say, marked as such, rather than
 * as a term the product invents (QB-9, §5.9).
 *
 * `state: 'proposed'` is not on the register entry for this screen and that is
 * deliberate: `state` records what was true on 23 August 2026 and this screen
 * did not exist then. `added` carries its date instead, and the rail renders
 * that rather than a fabricated history.
 */
const chainOfCustody = () => {
  const C_ = CUSTODY_CHAIN;
  const D = C_.discrepancy;
  const covered = EVENT_SAMPLES;
  const containers = covered.reduce((n, s) => n + s.containers, 0);
  const sealed = C_.transfers.find((t) => t.seal !== '—');
  return (
    head('Chain of custody — 2026-Q2-GW', 'Every hand that held these samples, from the bore to the laboratory bench.', {
      route: 'a proposal — not in the product',
      toolbar: C.exportMenu() + C.btn('Print the custody form'),
    }) +
    notice(
      'warning',
      'Proposed. The PRD names no chain-of-custody surface, and there is no route for one.',
      'FR-1.6 gets the samples as far as the event and FR-3.8 picks them up at the certificate; the days in between are where a defensibility argument is actually won or lost. <a class="mk-ref" href="#receipt">Receipt and custody</a> draws the laboratory end of the chain because that is where the record used to start — which is the tell. A chain reconstructed afterwards from a scanned form proves that a form was signed; it does not answer the question a challenge asks, which is whether these samples were ever unaccounted for. This screen argues for itself and is filed under Sampling events on that argument. It is called <em>Chain of custody</em> rather than <em>eCOC</em> because the glossary has an entry for <strong>custody transfer</strong> and none for the acronym: practitioners call the paper form a COC and the electronic one an eCOC, and both words are named here once rather than becoming the product’s (QB-9).',
    ) +
    facts([
      ['Custody record', `<span class="mk-file">${esc(C_.id)}</span>`],
      ['Round', `<a class="mk-ref" href="#events">${esc(C_.round)}</a>`],
      ['Raised', `${esc(C_.raisedBy)} · <span class="sf-instant">${esc(C_.raisedAt)}</span>`],
      ['Consigned to', esc(C_.laboratory)],
      ['Work order', `<a class="mk-ref" href="#batches">${esc(C_.workOrder)}</a>`],
      ['Containers', `<span class="mk-num">${C_.containers}</span> · seals ${esc(C_.seals)}`],
      ['State', C.status(C_.state, 'good')],
    ]) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">The transfers</h2>' +
    table({
      caption: 'One row per handover: both parties, the time in the site’s own zone, and the seal in force.',
      head: ['#', 'When · AWST', 'From', 'To', 'Containers', 'Seal', 'State'],
      kind: 'matrix',
      label: 'Custody transfers for 2026-Q2-GW',
      rows: C_.transfers.map((t) => [
        `<span class="mk-num">${t.seq}</span>`,
        `<span class="sf-instant">${esc(t.at.replace(' AWST', ''))}</span>`,
        esc(t.from),
        esc(t.to),
        `<span class="mk-num">${t.containers}</span>`,
        t.seal === '—' ? '<span class="mk-num mk-num--nil">—</span>' : `<span class="mk-file">${esc(t.seal)}</span>`,
        t.state === 'exception' ? C.status('exception', 'bad') : C.status('signed', 'good'),
      ]),
    }) +
    `<p class="mk-tight">The rows are ordered by <strong>sequence</strong> rather than by time — two handovers can share a recorded minute, and a chain ordered only by the clock closes silently over a missing link. Here they run 1 to ${C_.transfers.length} with nothing missing between them, and that is the property worth having: a gap in the sequence is a hole somebody has to explain, where a gap in a list of timestamps is invisible. The last four rows are the ones <a class="mk-ref" href="#receipt">Receipt and custody</a> has always drawn — they are the same four rows, read from the same record, not a second copy of them.</p>` +
    C.blastRadius({
      lede: 'Sealing a cooler and handing it over — what that writes, before you do it:',
      rows: [
        { what: 'Transfers appended', n: '1 — appended, never edited' },
        { what: 'Containers committed to the consignment', n: `${containers} across ${covered.length} samples` },
        { what: 'Seal numbers frozen onto the transfer', n: `${sealed ? esc(sealed.seal) : '—'}` },
        { what: 'Samples that can still be added to this chain', n: '0 — a sealed cooler is closed' },
        { what: 'Rows that can be corrected afterwards', n: '0 — a correction supersedes and both entries stay readable' },
      ],
      action: 'Seal and hand over',
      cancel: 'Not yet — keep the chain open',
      reversible:
        'Not reversible in the ordinary sense. A transfer cannot be edited or deleted; a mistake is corrected by a superseding entry that names what it corrects, and both stay on the record. That is what makes the chain evidence rather than a document.',
      danger: true,
    }) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">One seal number, written down twice, differently</h2>' +
    notice(
      'warning',
      `${esc(D.what)} — the field record says ${esc(C_.seals.split(', ')[1])} and the laboratory’s receiving form says 4427.`,
      `${esc(D.affects)} Both seals were found <em>intact</em>, which is a different check and it passed. The product has not chosen between the two numbers and will not: a transposition is the likeliest reading, and the likeliest reading is exactly what a custody challenge attacks.`,
    ) +
    cols(
      panel(
        'The two entries, side by side',
        facts([
          ['Field record', `<span class="mk-file">${esc(D.field)}</span>`],
          ['Laboratory receiving form', `<span class="mk-file">${esc(D.laboratory)}</span>`],
          ['Raised', `${esc(D.raisedBy)} · <span class="sf-instant">${esc(D.raisedAt)}</span>`],
          ['Assigned to', esc(D.assignedTo)],
          ['State', C.status(D.state, 'warn')],
        ]) +
          `<p class="mk-tight mk-muted"><strong>Refused:</strong> ${esc(D.refused)}</p>`,
      ),
      panel(
        'The ways out, each with what it does',
        table({
          caption: 'Every option says what it writes before it is taken (QB-7). None of them deletes anything.',
          head: ['Option', 'What it does', ''],
          scroll: true,
          label: 'Ways to resolve the seal discrepancy',
          rows: D.ways.map((w) => [esc(w.label), `<span class="mk-muted">${esc(w.detail)}</span>`, C.btn('Take this')]),
        }),
      ),
      // The consequence column is the wide one. A table whose "what it does"
      // reads four words to a line is a form, and the whole point of this panel
      // is that the consequence is easier to read than the button beside it.
      '2fr 3fr',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">What this chain covers</h2>' +
    cols(
      table({
        caption: `The samples in the consignment, and the containers each contributed. They add to ${containers}, which is what the seal covered and what the laboratory reconciled on arrival.`,
        head: ['Sample', 'Location or role', 'Containers'],
        scroll: true,
        label: 'Samples covered by this chain of custody',
        rows: [
          ...covered.map((s) => [
            `<span class="mk-file">${esc(s.id)}</span>`,
            s.qc === '—' ? loc(s.location) : `<span class="mk-tag mk-tag--new">${esc(s.qc)}</span>`,
            `<span class="mk-num">${s.containers}</span>`,
          ]),
          ['<strong>Total</strong>', `<span class="mk-muted">${covered.length} samples · <a class="mk-ref" href="#events">the manifest</a></span>`, `<span class="mk-num"><strong>${containers}</strong></span>`],
        ],
      }),
      panel(
        'Where this record stops, and what picks it up',
        '<p class="mk-tight"><strong>This screen owns</strong> the chain: raising it in the field, the containers it accumulates, the seals, and every transfer up to and including the handover the laboratory signs for. It owns the discrepancy above, because a disagreement about a seal is a custody question.</p>' +
          '<p class="mk-tight"><strong><a class="mk-ref" href="#receipt">Receipt and custody</a> owns</strong> what the laboratory found when it opened the box — cooler temperature, preservation, breakages, holding time on arrival — and the results those explain. The cracked sulfate bottle is its finding, not this one’s.</p>' +
          '<p class="mk-tight">After that the round leaves custody altogether and becomes a deliverable: the certificate and the rows that come back are <a class="mk-ref" href="#imports">Import runs</a>. Three screens, one seam each, and each seam named on both sides of it.</p>' +
          `<div class="mk-actions"><a class="mk-btn" href="#receipt">What arrived, and in what condition</a><a class="mk-btn" href="#field-capture">The field round that filled it</a></div>`,
      ),
      '3fr 2fr',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">A round with no chain yet</h2>' +
    C.stateBlock('empty', {
      headline: '2026-Q3-GW has no chain of custody, because it has not been collected.',
      detail:
        `There are ${EVENTS.length} rounds on this project and ${EVENTS.filter((e) => e.state !== 'planned').length} of them have one. This is the other: planned, with a window, a location list and an analyte suite, and no samples yet. That is a different sentence from <em>no rounds have ever been sampled</em>, and a screen printing “No data” for both would have said nothing in either case. The chain is raised at the first bore, on the device, before the first container is filled — not typed up afterwards from a notebook. Raising one writes an empty record attributed to you, and it can be discarded until the first transfer is signed.`,
      action: 'Raise the chain for 2026-Q3-GW',
      secondary: 'Open the planned round',
      // Raising is the one control here that is not irreversible, and it says
      // so rather than leaving the reader to infer it from the two above.
    })
  );
};

/** What arrived at the laboratory, in what condition, and who had held it. */
const sampleReceipt = () => (
  head('Receipt and custody', 'The condition the samples arrived in, and everyone who held them.', {
    route: '/projects/:projectId/receipt',
    toolbar: C.exportMenu() + C.btn('Print the custody form'),
  }) +
  facts([
    ['Work order', `<span class="mk-file">${esc(RECEIPT.batch)}</span>`],
    ['Courier', esc(RECEIPT.courier)],
    ['Dispatched', `<span class="sf-instant">${esc(RECEIPT.dispatched)}</span>`],
    ['Received', `<span class="sf-instant">${esc(RECEIPT.received)}</span>`],
    ['In transit', esc(RECEIPT.transit)],
  ]) +
  '<h2 class="mk-h2" style="margin-top:1.2rem">Condition on arrival</h2>' +
  table({
    caption: 'The cooler receipt, as a record rather than as a scanned page.',
    head: ['Check', 'Found', 'Acceptance', 'Outcome'],
    rows: RECEIPT.checks.map((c) => [
      esc(c.what),
      `<strong>${esc(c.found)}</strong>`,
      `<span class="mk-muted">${esc(c.limit)}</span>`,
      c.outcome === 'n/a'
        ? '<span class="mk-num mk-num--nil">n/a</span>'
        : C.status(c.outcome, c.outcome === 'pass' ? 'good' : c.outcome === 'warn' ? 'warn' : 'bad'),
    ]),
  }) +
  notice(
    'warning',
    'This is why MW09 is one result short.',
    esc(RECEIPT.consequence),
  ) +
  '<h2 class="mk-h2" style="margin-top:1.2rem">Chain of custody</h2>' +
  C.pipeline(
    CUSTODY.map((c) => ({
      name: `${c.from} → ${c.to}`,
      detail: `${c.at} · ${c.what}`,
      state: c.state === 'exception' ? 'fail' : 'done',
    })),
  ) +
  cols(
    panel(
      'Custody is a chain, not a PDF',
      '<p class="mk-tight">A signed form scanned into a folder proves a form was signed. It does not answer the question a challenge actually asks: <em>was this sample ever unaccounted for</em>.</p>' +
        '<p class="mk-tight">Every transfer above is a row with a time, two parties and a seal number, so an unbroken chain is a query rather than somebody reading four pages of handwriting. The one exception in it is marked as an exception and carries forward to the result it affected.</p>',
    ),
    panel(
      'Holding time starts here, not at the laboratory bench',
      table({
        head: ['Analyte', 'Window', 'Collected', 'Analysed', 'Used', 'Outcome'],
        scroll: true, label: 'Holding-time windows',
        rows: [
          ['Nitrate as N', '2 days', '2026-05-14 07:30', '2026-05-20 11:04', '<span class="mk-num mk-num--bad">6 d</span>', C.status('exceeded', 'bad')],
          ['Dissolved metals', '180 days', '2026-05-13 08:40', '2026-05-17 14:22', '<span class="mk-num">4 d</span>', C.status('within', 'good')],
          ['Sulfate as SO₄', '28 days', '2026-05-14 07:30', '2026-05-18 09:11', '<span class="mk-num">4 d</span>', C.status('within', 'good')],
          ['PFAS', '28 days', '2026-05-13 08:40', '2026-05-17 09:50', '<span class="mk-num">4 d</span>', C.status('within', 'good')],
        ],
      }) +
        '<p class="mk-tight">The clock runs from collection, through transport and receipt, to analysis — and the transit above consumed one of nitrate’s two days before the laboratory had touched it. A holding time measured from receipt would have called this compliant.</p>',
    ),
  )
);

/** QC acceptance criteria, versioned exactly as guideline values are. */
const qcLimits = () => (
  head('Data quality objectives', 'The acceptance limits every QC check is measured against, and where each one comes from.', {
    route: '/projects/:projectId/objectives',
    toolbar: C.exportMenu() + C.btn('New version'),
  }) +
  notice(
    'default',
    'A guideline value gets a version, an effective date and a source. A QC limit is the same kind of object and was not treated as one.',
    'A regulator asking “why 30%?” is asking exactly the question they ask about a criterion. Hard-coding the answer means the product cannot say, and means a customer whose own data quality objectives are tighter has no way to apply them without a release.',
  ) +
  facts([
    ['Set', `<strong>${esc(QC_LIMITS.set)}</strong>`],
    ['Version', esc(QC_LIMITS.version)],
    ['Effective', esc(QC_LIMITS.effective)],
    ['Basis', esc(QC_LIMITS.basis)],
  ]) +
  table({
    caption: 'Each limit with the population it applies to, and what happens where it does not apply.',
    head: ['Check', 'Acceptance limit', 'Applies when', 'Otherwise', 'Source'],
    rows: QC_LIMITS.rules.map((r) => [
      `<strong>${esc(r.check)}</strong>`,
      `<span class="mk-num">${esc(r.limit)}</span>`,
      esc(r.applies),
      r.fallback && r.fallback !== '—' ? `<span class="mk-muted">${esc(r.fallback)}</span>` : '<span class="mk-num mk-num--nil">—</span>',
      `<span class="mk-muted">${esc(r.source)}</span>`,
    ]),
    kind: 'matrix',
    label: 'Data quality objectives',
  }) +
  cols(
    panel(
      'The applicability rule is the part that was wrong',
      C.card({
        tone: 'bad',
        head: '<span class="mk-queue__kind">Relative percent difference near the limit of reporting</span>',
        body:
          '<p class="mk-tight">RPD is only meaningful when both results sit well above the reporting limit. A duplicate pair of <code class="mk-file">1.2</code> and <code class="mk-file">1.8</code> µg/L against a 1.0 µg/L limit gives an RPD of 40% and means nothing at all — the two numbers are the same measurement inside its own uncertainty.</p>' +
          '<p class="mk-tight">Applying the 30% limit to every pair raises a failure on almost every near-limit duplicate, and a QC flag that is usually noise is a QC flag people stop reading. Above 5 × LOR the percentage applies; below it, an absolute difference of 2 × LOR does.</p>',
        foot: '<span class="mk-tag mk-tag--good">Zinc at MW05: 21.4 and 31.6 µg/L, both above 5 × LOR — the 38.2% failure is real</span>',
      }),
    ),
    panel(
      'Changing a limit reaches forward only',
      `<p class="mk-tight">${esc(QC_LIMITS.changed)}</p>` +
        C.blastRadius({
          lede: 'Tightening the field duplicate limit from 30% to 25% would:',
          rows: [
            { what: 'Future pairs newly failing, on last year’s data', n: '4' },
            { what: 'Historical QC outcomes rewritten', n: '0' },
            { what: 'Reports already issued that would change', n: '0' },
            { what: 'New version created', n: '1 — 2026.1, effective on a date you choose' },
          ],
          action: 'Create version 2026.1',
          reversible:
            'A limit is versioned with an effective date, exactly as a criteria set is. A result evaluated under 2025.2 keeps that verdict, and the version that produced it is on the result.',
        }),
    ),
  )
);

/** The laboratory batch — what a QC result actually covers. */
const labBatches = () => (
  head('Laboratory batches', 'The unit QC is actually run on, and everything it qualifies.', {
    route: '/projects/:projectId/batches',
    toolbar: C.exportMenu(),
  }) +
  notice(
    'warning',
    'A control sample applies to a batch, not to a sample.',
    'Laboratories work in batches — a work order, prepared and analysed together — and one method blank, one control sample and one matrix spike cover all of them. Without the batch, “which results does this failed spike qualify?” has no answer, and a single failure either qualifies nothing or is applied to everything out of caution. Both are wrong.',
  ) +
  BATCHES.map(
    (b) =>
      panel(
        `${esc(b.id)} — ${esc(b.method)}`,
        facts([
          ['Laboratory', esc(b.lab)],
          ['Samples in the batch', `<span class="mk-num">${b.samples}</span>`],
          ['Prepared', esc(b.prepared)],
          ['Analysed', esc(b.analysed)],
          ['Accreditation', esc(b.nata)],
        ]) +
          table({
            head: ['QC sample', 'Identifier', 'Result', 'Outcome'],
            rows: b.qc.map((q) => [
              `<strong>${esc(q.kind)}</strong>`,
              `<span class="mk-file">${esc(q.id)}</span>`,
              esc(q.result),
              C.status(q.outcome, q.outcome === 'pass' ? 'good' : 'bad'),
            ]),
          }) +
          `<p class="mk-tight">${esc(b.consequence)}</p>`,
      ),
  ).join('') +
  cols(
    panel(
      'A recovery below 100% is not simply “bad data”',
      '<p class="mk-tight">The zinc spike recovered 62% of what was added, reproducibly across the duplicate. That is matrix interference — something in this water suppresses the measurement — and it means the reported zinc is <strong>biased low</strong>.</p>' +
        '<p class="mk-tight">Which direction the bias runs is the whole finding. A result already above the guideline value, biased low, exceeds by <em>at least</em> the factor shown. The exceedance is strengthened, not weakened, and a screen that reported only “QC failed” would have left a practitioner to argue the opposite.</p>' +
        C.card({
          tone: 'bad',
          head: '<span class="mk-queue__kind">Zinc · MW05</span>',
          body: '<p class="mk-tight">Reported <span class="mk-num mk-num--bad">31.6 µg/L</span> against a criterion of 8.0 µg/L — 4.0×. Corrected for 62% recovery the true value is nearer <span class="mk-num mk-num--bad">51 µg/L</span>, or 6.4×. <strong>The reported value is used</strong>; the correction is stated and never silently applied, because a recovery-corrected number is an estimate and the certificate is a measurement.</p>',
        }),
    ),
    panel(
      'What the batch qualifies',
      table({
        head: ['Result', 'Location', 'Qualifier', 'Because'],
        rows: [
          ['Zinc (filtered)', loc('MW01A'), tag('L', 'warn'), 'Batch matrix spike below limit — biased low'],
          ['Zinc (filtered)', loc('MW03B'), tag('L', 'warn'), 'Batch matrix spike below limit — biased low'],
          ['Zinc (filtered)', loc('MW05'), tag('L', 'warn'), 'Batch matrix spike below limit — biased low'],
          ['Zinc (filtered)', loc('MW07'), tag('L', 'warn'), 'Batch matrix spike below limit — biased low'],
          ['Zinc (filtered)', loc('MW09'), tag('L', 'warn'), 'Batch matrix spike below limit — biased low'],
        ],
      }) +
        '<p class="mk-tight">Nine results carry it, applied by the batch rather than by a person deciding case by case — which is how five of them get missed.</p>',
    ),
  )
);

/** Background comparison, and the derivation of a site-specific trigger value. */
const backgroundComparison = () => (
  head('Background comparison', 'Downgradient against reference, and where a site-specific trigger value comes from.', {
    route: '/projects/:projectId/background',
    toolbar: C.exportMenu() + C.btn('Adopt as a criteria set', 'primary'),
  }) +
  notice(
    'default',
    'At a mine this is the assessment, and a guideline value alone does not make it.',
    'A default guideline value answers “is this water safe”. Background answers “did we cause it”, which is the question a licence condition and a closure argument both turn on. Where no default exists — sulfate has none — background is the only criterion available.',
  ) +
  facts([
    ['Reference population', esc(BACKGROUND.reference)],
    ['Method', esc(BACKGROUND.method)],
  ]) +
  table({
    caption: 'Reference distribution against the downgradient bore, per analyte.',
    head: ['Analyte', 'Background median', '80th percentile', 'Default guideline', 'Trigger adopted', 'MW05', 'Verdict', 'Basis'],
    rows: BACKGROUND.rows.map((r) => [
      esc(r.analyte),
      `<span class="mk-num">${esc(r.bg)}</span>`,
      `<span class="mk-num">${esc(r.p80)}</span>`,
      `<span class="mk-muted">${esc(r.dg)}</span>`,
      `<span class="mk-num">${esc(r.stv)}</span>`,
      `<span class="mk-num mk-num--bad">${esc(r.mw05)}</span>`,
      `<strong>${esc(r.verdict)}</strong>`,
      `<span class="mk-muted">${esc(r.basis)}</span>`,
    ]),
    kind: 'matrix',
    label: 'Background comparison',
  }) +
  cols(
    panel(
      'What the pattern says',
      `<p class="mk-tight">${esc(BACKGROUND.inference)}</p>` +
        C.card({
          tone: 'bad',
          head: '<span class="mk-queue__kind">The signature</span>',
          body:
            '<p class="mk-tight">Sulfate 6.2×, electrical conductivity 3.0× and hardness 2.5× above background, together, at one bore in a line of seven. Two bores upgradient in the same hydrostratigraphic unit show none of it, and the nested confined bore is at higher head so it is not coming from below.</p>' +
            '<p class="mk-tight">Any one of those numbers is arguable. The four together, with the flow direction, are not.</p>',
          foot: `<a class="mk-btn mk-btn--sm" href="#hydrochem">See it on the Piper plate</a><a class="mk-btn mk-btn--sm" href="#map">Flow direction</a>`,
        }),
    ),
    panel(
      'Deriving the trigger honestly',
      `<p class="mk-tight">${esc(BACKGROUND.caution)}</p>` +
        C.blastRadius({
          lede: 'Adopting the sulfate trigger at 148 mg/L as a criteria set:',
          rows: [
            { what: 'Reference results behind it', n: '42' },
            { what: 'Censored, carried by Kaplan–Meier', n: '2' },
            { what: 'Locations it would apply to', n: '4 downgradient' },
            { what: 'New exceedances this round', n: '1 — MW05' },
            { what: 'Historical evaluations rewritten', n: '0' },
          ],
          action: 'Create the criteria set',
          reversible:
            'It becomes a versioned criteria set like any other, with the reference population and the date it was derived recorded on it — so a regulator can see which fourteen rounds of which three bores produced the number, years later.',
        }),
    ),
  )
);

/** Data quality assessment, against objectives set before the round. */
const dataQuality = () => (
  head('Data quality assessment', 'Whether this round met the objectives it was designed against.', {
    route: '/projects/:projectId/dqa',
    toolbar: C.exportMenu() + C.btn('Generate report §3', 'primary'),
  }) +
  stats([
    stat('3 of 6', 'objectives met', 'warn'),
    stat('2', 'met with exception', 'warn'),
    stat('3', 'not met', 'bad'),
    stat('87%', 'usable completeness', 'bad'),
  ]) +
  notice(
    'warning',
    'Three objectives were not met, and the report has to say which and what follows.',
    'A QA/QC table lists checks. An assessment says whether the data is fit for the purpose it was collected for — which is a judgement made against objectives written down beforehand, not a verdict assembled afterwards from whatever passed.',
  ) +
  table({
    caption: 'Each dimension against the objective set for this programme.',
    head: ['Dimension', 'Measured by', 'Objective', 'Achieved', 'Verdict'],
    rows: DQA.map((d) => [
      `<strong>${esc(d.dim)}</strong>`,
      `<span class="mk-muted">${esc(d.measure)}</span>`,
      esc(d.objective),
      esc(d.achieved),
      C.status(d.verdict, d.verdict === 'met' ? 'good' : d.verdict === 'met with exception' ? 'warn' : 'bad'),
    ]),
    kind: 'matrix',
    label: 'Data quality assessment',
  }) +
  cols(
    panel(
      'What “not met” actually costs',
      table({
        head: ['Not met', 'Consequence for the assessment'],
        rows: [
          ['Sensitivity — cadmium', 'Cadmium cannot be assessed at any location. Seven results are reported as unassessable rather than compliant, and the recommendation is a method change from Q3.'],
          ['Accuracy — zinc', 'Nine zinc results are qualified biased low. The MW05 exceedance stands and is understated; no result is corrected.'],
          ['Completeness — 87%', 'Below the 95% objective. MW11 was not sampled and MW09 is two results short — one cracked container, one holding time. The round is reported as incomplete rather than as a clean 58 results.'],
        ],
      }),
    ),
    panel(
      'Written before the round, not after it',
      '<p class="mk-tight">The objectives on this page were set when the programme was designed. That ordering is the whole point: an assessment written after the results are in is an argument, and every practitioner who has read one knows the difference.</p>' +
        '<p class="mk-tight">Where an objective was not met the product does not soften it, and does not quietly drop the dimension from the report. It states the shortfall, its consequence and the remedy — which is what makes the rest of the report credible.</p>' +
        C.card({
          tone: 'good',
          head: '<span class="mk-queue__kind">Comparability — met</span>',
          body: '<p class="mk-tight">Arsenic’s reporting limit stepped from 5.0 to 1.0 µg/L in May 2025 on a method change. It is recorded, it is drawn as a stepped line on every plate that spans it, and the trend test treats the earlier censored values as censored rather than as measurements. A series whose limit changed silently mid-way is a trend nobody can defend.</p>',
        }),
    ),
  )
);

/** The receptor the water-quality numbers are ultimately about. */
const stygofaunaScreen = () => (
  head('Subterranean fauna', 'The receptor downgradient of the TSF, assessed on whether a population persists.', {
    route: '/projects/:projectId/fauna',
    toolbar: C.exportMenu() + C.btn('Record a survey event'),
  }) +
  notice(
    'default',
    'These results are not chemistry, and forcing them into a concentration model would lose them.',
    'A stygofauna survey produces counts of taxa against a reference site, on a net-haul method, assessed for whether a population persists — not a value against a limit. The EPA conditions mining approvals in this state on exactly this, and a groundwater platform for WA mining with nowhere to put it is visibly not built for WA.',
  ) +
  facts([
    ['Condition', esc(STYGOFAUNA.condition)],
    ['Method', esc(STYGOFAUNA.method)],
    ['Frequency', esc(STYGOFAUNA.frequency)],
    ['Reference bore', loc('STY01')],
    ['Downgradient bore', loc('STY02')],
  ]) +
  table({
    caption: 'Survey events, reference against downgradient.',
    head: ['Bore', 'Role', 'Event', 'Taxa', 'Individuals', 'Notable', 'Verdict'],
    rows: STYGOFAUNA.rows.map((r) => [
      loc(r.bore),
      esc(r.role),
      esc(r.event),
      `<span class="mk-num">${r.taxa}</span>`,
      `<span class="mk-num">${r.individuals}</span>`,
      esc(r.notable),
      C.status(r.verdict, r.verdict === 'persisting' ? 'good' : 'warn'),
    ]),
    kind: 'matrix',
    label: 'Subterranean fauna survey events',
  }) +
  cols(
    panel(
      'What it appears to say',
      `<p class="mk-tight">${esc(STYGOFAUNA.finding)}</p>` +
        C.card({
          tone: 'warn',
          head: '<span class="mk-queue__kind">Two bores, two events</span>',
          body:
            '<p class="mk-tight">Taxa richness at the downgradient bore has fallen while the reference held steady, and the salinity and sulfate rise at MW05 sits geographically between them. That is a coherent story and it is not yet evidence.</p>',
          foot: `<a class="mk-btn mk-btn--sm" href="#background">Background comparison</a><a class="mk-btn mk-btn--sm" href="#map">Flow direction</a>`,
        }),
    ),
    panel(
      'And why the product will not draw a trend through it',
      `<p class="mk-tight">${esc(STYGOFAUNA.caution)}</p>` +
        '<p class="mk-tight">Everywhere else in this product a series of numbers gets a trend test. Here it does not, and the refusal is the design: counts that vary by an order of magnitude with season, haul effort and operator do not support one, and a Mann–Kendall drawn across four points would look exactly as authoritative as the arsenic plate that is built on fourteen.</p>' +
        C.stateBlock('partial', {
          headline: 'Two events. A trend needs more, and the product says so instead of drawing one.',
          detail:
            'The screen states what changed and recommends a targeted survey. It does not compute a rate, because a rate here would be a number with a confidence interval that nothing in the sampling design supports — and it would be quoted back for years.',
          action: 'Commission a targeted survey',
          secondary: 'Add to the report as an observation',
        }),
    ),
  )
);

/* ================================================================== *
 * The catalogue
 * ================================================================== */

/* ================================================================== *
 * J0 — Arrive, and find out what needs you
 *
 * None of this existed in the first build, and the omission was
 * structural rather than incidental: the project is the authorisation
 * scope (§11.2, G-10) and the primary URL space, and it had no face. A
 * user cannot inhabit a scope they cannot see, create or leave.
 * ================================================================== */

const workQueue = () => {
  const byUrgency = (u) => WORK_QUEUE.filter((w) => w.urgency === u);
  const cardFor = (w) => C.card({
    tone: w.urgency === 'now' ? 'bad' : w.urgency === 'soon' ? 'warn' : 'neutral',
    head:
      `<span class="mk-queue__kind">${esc(w.kind)}</span>` +
      `<span class="mk-queue__age">${esc(w.age)}</span>`,
    body:
      `<p class="mk-queue__headline">${esc(w.headline)}</p>` +
      `<p class="mk-queue__context">${esc(w.context)}</p>`,
    foot: `<a class="mk-btn mk-btn--sm mk-btn--primary" href="#${w.target}">${esc(w.action)}</a>` +
      `<span class="mk-muted">Opens where it is resolved, not a list to search again</span>`,
  });

  const completeness = C.card({
    tone: 'warn',
    head: '<span class="mk-queue__kind">Programme completeness</span>' +
      `<span class="mk-queue__age">${esc(COMPLETENESS.period)}</span>`,
    body:
      C.progress({
        pct: Math.round((COMPLETENESS.received / COMPLETENESS.planned) * 100),
        label: `${COMPLETENESS.received} of ${COMPLETENESS.planned} planned results received`,
        detail: `${COMPLETENESS.held} held in quarantine · <strong>${COMPLETENESS.missing} never collected</strong>. Planned means what the sampling programme said, resolved in ${esc(PROJECT.timezone)} — a sample taken at 08:00 on 1 April local time belongs to the June quarter, not this one.`,
      }) +
      table({
        head: ['Location', 'Planned', 'Received', 'State'],
        rows: COMPLETENESS.rows.map((r) => [
          loc(r.location),
          `<span class="mk-num">${r.planned}</span>`,
          `<span class="mk-num${r.received < r.planned ? ' mk-num--warn' : ''}">${r.received}</span>`,
          C.status(r.state, r.state === 'complete' ? 'good' : r.state === 'partial' ? 'warn' : 'bad'),
        ]),
      }),
    foot: `<a class="mk-btn mk-btn--sm" href="#programme">Open the programme</a>`,
  });

  return (
    head('What needs you', 'Everything waiting on you, across every project you hold a binding in — before you navigate anywhere.', {
      route: 'a proposal — the product’s / is deliberately a project list (ia-rationale §3); Jerry kept this drawn, 1 Sep 2026',
      toolbar: C.segmented({ options: ['Mine', 'My team', 'Everything'], value: 'Mine', label: 'Scope' }) + C.btn('Snooze rules'),
    }) +
    stats([
      stat('3', 'need you now', 'bad'),
      stat('4', 'this week', 'warn'),
      stat('1', 'awaiting your approval'),
      stat('2', 'projects with open items'),
    ]) +
    notice(
      'default',
      'Ordering is driven by the role you hold, not by a setting.',
      'You are a Contributor here, so exceptions and review sort above approvals. An Approver signing in to the same data sees the approval queue first. Nothing is configurable, because a work queue somebody has to tune is a work queue they stop trusting.',
    ) +
    cols(
      '<section><h2 class="mk-h2">Needs you now</h2>' +
        `<div class="mk-queue">${byUrgency('now').map(cardFor).join('')}</div>` +
        '<h2 class="mk-h2">This week</h2>' +
        `<div class="mk-queue">${byUrgency('soon').map(cardFor).join('')}</div>` +
        '<h2 class="mk-h2">When you get to it</h2>' +
        `<div class="mk-queue">${byUrgency('later').map(cardFor).join('')}</div>` +
        '</section>',
      completeness +
          panel(
          'Handing one over',
          '<p class="mk-tight">The queue shows an owner. It could not <em>change</em> one, and coordination is where a multi-user product is actually judged.</p>' +
            C.card({
              tone: 'bad',
              head: `<span class="mk-queue__kind">Assigned</span><span class="mk-queue__age">${esc(ASSIGNMENT.at)}</span>`,
              body:
                `<p class="mk-queue__headline">${esc(ASSIGNMENT.subject)}</p>` +
                `<p class="mk-queue__context">${esc(ASSIGNMENT.assignedBy)} → <strong>${esc(ASSIGNMENT.assignedTo)}</strong> · due ${esc(ASSIGNMENT.due)}</p>`,
            }) +
            ASSIGNMENT.thread
              .map(
                (t) =>
                  `<div class="mk-thread__item"><span class="mk-thread__who">${esc(t.who)}</span>` +
                  `<span class="mk-thread__at">${esc(t.at)}</span>` +
                  `<p class="mk-thread__text">${esc(t.text)}</p></div>`,
              )
              .join('') +
            C.field({
              label: 'Reply',
              control: C.textarea({ placeholder: 'What the next person needs to know…', rows: 2 }),
              hint: 'The thread hangs off the exceedance rather than off a chat channel, so it is still attached in two years when somebody asks why the notification was worded the way it was.',
            }) +
            '<div class="mk-actions">' + C.btn('Reply', 'primary') + C.btn('Reassign') + C.btn('Attach the lineage export') + '</div>',
        ) +
        panel(
          'When there is nothing',
          '<p class="mk-tight">The zero state is the one that matters most, because it is the claim the product makes every morning. It is not blank.</p>' +
            C.stateBlock('empty', {
              headline: 'Nothing needs you.',
              detail:
                'Every exception is dispositioned, every round in the open period is collected or explained, and no obligation is inside its warning window. Last checked 2026-08-23 07:41 AWST.',
              action: 'Open the 2026 Q3 programme',
              secondary: 'Review what closed this week',
            }),
        ),
      '5fr 4fr',
    )
  );
};

const globalSearch = () => {
  const group = (g) =>
    `<h2 class="mk-h2" style="margin-top:1.2rem">${esc(g.label)}</h2>` +
    table({
      head: ['Identifier', 'What it is', 'Project', ''],
      rows: g.rows.map((r) => [
        `<a class="mk-ref mk-ref--loc" href="#${r.target}">${esc(r.code)}</a>`,
        esc(r.what),
        r.project === PROJECT.code
          ? `<span class="mk-muted">${esc(r.project)} · current scope</span>`
          : `<span class="mk-tag mk-tag--warn">${esc(r.project)} — switches scope</span>`,
        r.badge ? tag(r.badge, toneFor(r.badge)) : '',
      ]),
    });

  return (
    head('Search', 'One box over every identifier in every project you can see.', {
      route: '/search',
      toolbar: C.exportMenu(),
    }) +
    C.filterBar({
      controls: [
        C.field({ label: 'Query', control: C.input({ value: 'MW0', mono: true }), hint: 'Identifier prefixes rank first — a practitioner searches by code, not by name.' }),
        C.field({ label: 'Entity type', control: C.select({ options: ['Everything', 'Locations', 'Sampling events', 'Certificates', 'Import runs', 'Criteria sets', 'Licences', 'Reports'], value: 'Everything' }) }),
        C.field({ label: 'Scope', control: C.select({ options: ['Every project I can see', 'MOCK-WDL only'], value: 'Every project I can see' }) }),
      ],
      chips: [C.chip('MW0', { prefix: 'starts with' })],
      count: '9 matches across 2 projects',
    }) +
    notice(
      'warning',
      'Opening a result in another project switches your scope, and says so before it does.',
      'Row-level security is fail-closed: you see MOCK-KRJ here because you hold a binding on it. Following that row moves the whole application into that project — the header changes, and so does what every other screen is about. A scope that changes silently is how somebody reads the wrong site’s numbers into a report.',
    ) +
    SEARCH.groups.map(group).join('') +
    panel(
      'When nothing matches',
      C.stateBlock('empty', {
        headline: 'No identifier, name or certificate matches “MW0X”.',
        detail:
          'Search covers identifiers and names, not result values — a number is found through the crosstab’s filters, where the criteria set and period that make it meaningful are also chosen. Nine locations start with “MW0”; the nearest is MW05.',
        action: 'Search MW05 instead',
        secondary: 'Open the location register',
      }),
    )
  );
};

const projectList = () => {
  const rows = PROJECTS.map((p) => [
    p.current
      ? `<strong class="mk-num">${esc(p.code)}</strong> <span class="mk-tag mk-tag--neutral">current</span>`
      : `<a class="mk-ref mk-ref--loc" href="#project-home">${esc(p.code)}</a>`,
    esc(p.name),
    `<span class="mk-tag mk-tag--${p.role === 'Approver' ? 'new' : p.role === 'Viewer' ? 'neutral' : 'good'}">${esc(p.role)}</span>`,
    esc(p.facility),
    `<span class="mk-num">${p.locations}</span>`,
    p.open ? `<span class="mk-num mk-num--bad">${p.open}</span>` : '<span class="mk-num mk-num--nil">0</span>',
    `<span class="sf-instant">${esc(p.due)}</span>`,
    p.current ? '' : `<button class="mk-btn mk-btn--sm" type="button">Switch to this project</button>`,
  ]);

  return (
    head('Projects', 'Every project you hold a role binding in, and what you are acting as on each one.', {
      route: '/projects',
      toolbar: C.btn('New project', 'primary'),
    }) +
    notice(
      'default',
      'The role is on the row because “as what” is the first thing scope decides.',
      'You hold Viewer on MOCK-YRA: you can read every result and export them, and you cannot commit an import, answer a review question or sign anything off. The controls that would do those things are absent on that project rather than present and refusing.',
    ) +
    table({
      caption: 'Bindings resolve from Entra group membership and are re-read at sign-in.',
      head: ['Code', 'Project', 'Your role', 'Facility', 'Locations', 'Open items', 'Next due', ''],
      rows,
      kind: 'matrix',
      label: 'Projects you hold a binding in',
    }) +
    cols(
      panel(
        'When you hold no bindings at all',
        '<p class="mk-tight">Fail-closed row-level security means real users meet this state — on their first day, and again the morning after a group membership is revoked. It cannot dead-end.</p>' +
          C.stateBlock('empty', {
            headline: 'You are signed in, and you hold no project bindings.',
            detail:
              'Strataflow reads your access from your organisation’s directory groups, not from a list kept here — so nobody at Strataflow can grant it, and neither can this screen. Your administrator adds you to a group like SG-Strataflow-&lt;project&gt;-Contributors; access appears the next time you sign in. You are signed in as anakamura@wandalup.example on tenant wandalup.example.',
            action: 'Copy the request for your administrator',
            secondary: 'Check my identity',
          }),
      ),
      panel(
        'A single-project customer never sees any of this',
        '<p class="mk-tight">Most customers run one project. The switcher in the header collapses to the project name with no control on it, this screen is not linked from anywhere, and <code>/</code> lands on the project rather than here.</p>' +
          '<p class="mk-tight">Switcher ceremony for a user with one thing to switch between is the kind of scaffolding that makes an internal tool feel like one. The URL still exists and still resolves; nothing in the architecture is special-cased, only what is shown.</p>' +
          C.card({
            tone: 'neutral',
            head: '<span class="mk-queue__kind">Header, single-project customer</span>',
            body: '<span class="mk-switch-proj" style="pointer-events:none"><span class="mk-switch-proj__code">MOCK-WDL</span><span class="mk-switch-proj__role">Contributor</span></span>',
          }),
      ),
    )
  );
};

const projectHome = () => (
  head(`${esc(PROJECT.code)} — ${esc(PROJECT.name)}`, 'Where this project is up to, and what it owes.', {
    route: '/projects/:projectId — the landing after switching',
    toolbar: C.exportMenu() + C.btn('Project settings'),
  }) +
  C.tabs([
    { label: 'Overview', current: true },
    { label: 'Network', count: 9 },
    { label: 'Programme' },
    { label: 'Obligations', count: OBLIGATIONS.length, dot: 'bad' },
    { label: 'Documents', count: 34 },
    { label: 'Settings' },
    { label: 'Audit' },
  ]) +
  stats([
    stat('9', 'monitoring locations'),
    stat('9', 'open exceedances', 'bad'),
    stat('1', 'round overdue', 'warn'),
    stat('58 / 63', 'results this period', 'warn'),
    stat('2026-08-14', 'next round due'),
  ]) +
  cols(
    '<section>' +
      panel(
        'Where the data is up to',
        facts([
          ['Facility', `${esc(FACILITY.name)} · ${FACILITY.areas.length} areas`],
          ['Open period', esc(COMPLETENESS.period)],
          ['Last import', `IMP-0241 · 231 rows committed · 2026-05-21 09:14 AWST`],
          ['Latest certificate', `${esc(ROUND.certificate)} · Pilbara Analytical Services`],
          ['Criteria in force', 'ANZG 2018 95% · Licence Table 4 · site-specific TSF triggers'],
          ['Reporting calendar', 'Quarterly, year ends June — a fiscal quarter, not a calendar one'],
          ['Timezone', `${esc(PROJECT.timezone)} — every period boundary resolves here, never on the server`],
          ['Licence', `<a class="mk-ref" href="#licence">${esc(PROJECT.licence)}</a> · expires 2029-02-28`],
        ]),
      ) +
      panel(
        'What is open',
        table({
          head: ['What', 'Where', 'Since', ''],
          rows: [
            ['PFOS + PFHxS 37× the DGV', loc('MW05'), '2026-05-19', `<a class="mk-ref" href="#exceedances">Exceedance register</a>`],
            ['Round not collected', loc('MW11'), 'overdue 9 days', `<a class="mk-ref" href="#programme">Programme</a>`],
            ['3 questions block a commit', 'IMP-0239', '2026-05-18', `<a class="mk-ref" href="#import-review">Review</a>`],
            ['3 rows held after commit', 'IMP-0239', '2026-05-19', `<a class="mk-ref" href="#quarantine">Quarantine</a>`],
            ['Instrument silent 41 h', loc('TSF-VWP-03'), '2026-08-21', `<a class="mk-ref" href="#tarp">TARP board</a>`],
          ],
        }),
      ) +
      '</section>',
    panel(
      'This is not a dashboard',
      '<p class="mk-tight">Every number here is a question somebody actually arrives with, and every one of them is a link to where it is answered. Nothing on this page exists to be looked at.</p>' +
        '<p class="mk-tight">The distinction is load-bearing rather than stylistic: a decorative tile becomes stale without anybody noticing, because nobody was going to act on it. A tile that is the entrance to a queue is corrected the first morning it is wrong.</p>' +
        C.blastRadius({
          lede: 'What a practitioner does from here, measured over the last quarter:',
          rows: [
            { what: 'Opened an exceedance from the open list', n: '61%' },
            { what: 'Went straight to the import runs', n: '22%' },
            { what: 'Opened the programme', n: '11%' },
            { what: 'Read a number and did nothing', n: '6%' },
            { what: 'Tiles with no destination', n: '0' },
          ],
          action: 'This is a design claim, not a measurement',
          cancel: 'It has not been observed with a practitioner',
          reversible: 'Recorded here so it can be checked against a real session rather than assumed. QB-8’s finish line is an unassisted practitioner, and no transcript shows one.',
        }),
    ),
    '3fr 2fr',
  )
);

/* ================================================================== *
 * J1 additions — the network, the round, and the rows that were held
 * ================================================================== */

const locationRegistry = () => {
  const rows = LOCATIONS.map((l) => [
    loc(l.code),
    esc(l.klass.replace(/_/g, ' ')),
    esc(l.area),
    esc(l.position),
    `<span class="mk-num">${l.toc.toFixed(2)}</span> <span class="mk-entry__unit">m AHD</span>`,
    esc(l.screen),
    `<span class="sf-instant">2026-05-1${l.code === 'MW11' ? '4' : '3'}</span>`,
    l.code === 'MW11'
      ? C.status('overdue 9 days', 'bad')
      : l.code === 'MW12'
        ? C.status('no criteria selectable', 'neutral')
        : C.status(l.state.replace(/_/g, ' '), toneFor(l.state)),
    l.code === 'MW05' ? '<span class="mk-num mk-num--bad">8</span>' : l.code === 'MW07' ? '<span class="mk-num mk-num--bad">1</span>' : '<span class="mk-num mk-num--nil">0</span>',
  ]);

  return (
    head('Locations', 'Every monitoring location on this project, and what each one is telling you.', {
      route: '/projects/:projectId/locations/:locationId',
      toolbar: C.exportMenu() + C.btn('Add location') + C.btn('Manage groups'),
    }) +
    C.filterBar({
      onView: 'All locations',
      saved: true,
      controls: [
        C.field({ label: 'Find', control: C.input({ placeholder: 'Code or name…', mono: true }) }),
        C.field({ label: 'Area', control: C.select({ options: ['All areas', 'Borefield', 'TSF', 'Compliance boundary', 'Wandalup Creek'], value: 'All areas' }) }),
        C.field({ label: 'Class', control: C.select({ options: ['All classes', 'groundwater', 'surface_water', 'tsf_instrumentation'], value: 'All classes' }) }),
        C.field({ label: 'Group', control: C.select({ options: ['Any group', 'Downgradient of TSF', 'Compliance boundary', 'Background'], value: 'Any group' }) }),
        C.field({ label: 'Network health', control: C.select({ options: ['Any', 'Unsampled in 6 months', 'Missing survey data', 'Decommissioned but still in a programme'], value: 'Any' }) }),
      ],
      count: '9 of 9 locations',
    }) +
    notice(
      'default',
      'Hierarchy is a filter here, not the spine.',
      'The facility → area tree is real and it is edited on the network screen, but a practitioner looking for a bore knows its code and not its branch. A register that makes you expand three levels to reach MW05 is a file browser wearing a domain’s clothes.',
    ) +
    C.selectionBar({
      n: 2,
      unit: 'locations',
      actions: ['Add to group', 'Assign a programme', 'Export construction logs', 'Plot together'],
      undo: 'Group changes are reversible and recorded against each location.',
    }) +
    table({
      caption: 'Sorted by area, then by position along the flow path — not alphabetically, because that is how the network is read.',
      head: ['Code', 'Class', 'Area', 'Position', 'Top of casing', 'Screened interval', 'Last sampled', 'Current state', 'Open items'],
      rows,
      kind: 'matrix',
      label: 'Location register',
    }) +
    C.pager({ from: 1, to: 9, total: 9, unit: 'locations' }) +
    cols(
      panel(
        'Questions this register answers without leaving it',
        table({
          head: ['Question', 'Answer here', 'Rows'],
          rows: [
            ['Which bores have not been sampled in six months?', 'Network health filter', '<span class="mk-num">0</span>'],
            ['Which have no survey epoch, so elevation cannot be derived?', 'Network health filter', '<span class="mk-num">0</span>'],
            ['Which are decommissioned but still named in a programme?', 'Network health filter', '<span class="mk-num mk-num--warn">1</span> — PB03, in GW-QTR'],
            ['Which sit on the compliance boundary?', 'Area filter', '<span class="mk-num">2</span>'],
            ['What are the numbers at each?', '<em>Not here.</em> That is the crosstab.', '—'],
          ],
        }) +
          '<p class="mk-tight">The last row is the boundary and it is absolute. A register that starts growing result columns becomes a second crosstab that disagrees with the first, which is the failure this product exists to end.</p>',
      ),
      panel(
        'Groups, and what changing one touches',
        '<p class="mk-tight">Groups drive criteria applicability, programme membership and figure series, so a membership change is never only a label.</p>' +
          C.blastRadius({
            lede: 'Adding MW07 to “Compliance boundary” would change:',
            rows: FACILITY.blastRadius,
            action: 'Add MW07 to the group',
            reversible: 'Reversible. Group membership is audited with before and after state, and applicability is resolved at evaluation date — so nothing already evaluated moves.',
          }),
      ),
    )
  );
};

const facilityScreen = () => (
  head('Facility and areas', 'The hierarchy every location hangs from, and what an edit to it would touch.', {
    route: '/projects/:projectId/facility',
    toolbar: C.btn('Add area') + C.btn('Reorganise', 'primary'),
  }) +
  C.tabs([
    { label: 'Hierarchy', current: true },
    { label: 'Locations', count: 9 },
    { label: 'Programmes', count: 3 },
    { label: 'Documents', count: 6 },
    { label: 'Audit' },
  ]) +
  facts([
    ['Facility', esc(FACILITY.name)],
    ['Operator', esc(FACILITY.operator)],
    ['Tenement', esc(FACILITY.tenement)],
    ['Areas', String(FACILITY.areas.length)],
    ['Locations', '9'],
    ['Licence', `<a class="mk-ref" href="#licence">${esc(LICENCE.id)}</a>`],
  ]) +
  '<h2 class="mk-h2" style="margin-top:1.2rem">Areas</h2>' +
  table({
    caption: 'An area is a place on the site, not a folder. Criteria and programmes bind to them, which is why moving one is consequential.',
    head: ['Area', 'Kind', 'Locations', 'Programmes', 'What it is', ''],
    rows: FACILITY.areas.map((a) => [
      `<strong>${esc(a.name)}</strong>`,
      esc(a.kind),
      `<span class="mk-num">${a.locations}</span>`,
      `<span class="mk-file">${esc(a.programme)}</span>`,
      `<span class="mk-muted">${esc(a.note)}</span>`,
      C.btn('Edit', '', {}) + ' ' + C.btn('Move'),
    ]),
  }) +
  cols(
    panel(
      'Reorganising the hierarchy — the preview is the feature',
      C.blastRadius({
        lede: 'Moving MW05, MW07 and MW09 from <strong>TSF</strong> into <strong>Compliance boundary</strong> would change:',
        rows: FACILITY.blastRadius,
        action: 'Move 3 locations',
        cancel: 'Leave the hierarchy alone',
        reversible:
          'Reversible, and it reaches forward only. Criteria applicability is resolved at evaluation date, so no historical outcome is recomputed and no report already issued changes — which is the whole reason the count above reads zero.',
      }),
    ),
    panel(
      'The four states this screen has',
      '<p class="mk-tight">A facility with one area, a facility still loading its counts, a facility whose location counts are partly stale, and a hierarchy the query could not read.</p>' +
        C.stateBlock('empty', {
          headline: 'This facility has no areas yet.',
          detail: 'Every location currently hangs directly off the facility, which works. Areas earn their place when criteria or programmes need to apply to some locations and not others — add one when that is true, not before.',
          action: 'Add the first area',
        }) +
        C.stateBlock('partial', {
          headline: 'Location counts are 4 minutes old for 2 of 4 areas.',
          detail: 'Borefield and TSF are current. Compliance boundary and Wandalup Creek are being recounted after an import committed; the hierarchy itself is correct and safe to edit.',
        }),
    ),
  )
);

const samplingEvents = () => (
  head('Sampling events', 'Each round of collection — when it happened, who collected it, and where it is up to.', {
    route: '/projects/:projectId/sampling-events',
    toolbar: C.exportMenu() + C.btn('Plan a round') + C.btn('Record a round', 'primary'),
  }) +
  stats([
    stat(String(EVENTS.filter((e) => e.state !== 'planned').length), 'rounds collected this period'),
    stat(String(EVENTS.filter((e) => e.state === 'planned').length), 'planned, not yet collected'),
    stat(String(EVENTS.filter((e) => e.state === 'results-partial').length), 'results partial', 'warn'),
    stat(String(EVENTS.reduce((n, e) => n + e.qc, 0)), 'QC samples linked'),
  ]) +
  C.filterBar({
    controls: [
      C.field({ label: 'Period', control: C.dateRange({ from: '2026-04-01', to: '2026-06-30' }) }),
      C.field({ label: 'State', control: C.select({ options: ['Any state', 'planned', 'sampled', 'results-partial', 'results-complete', 'evaluated'], value: 'Any state' }) }),
      C.field({ label: 'Collected by', control: C.select({ options: ['Anyone', 'A. Nakamura', 'D. Okafor'], value: 'Anyone' }) }),
    ],
    chips: [C.chip('2026 Q2', { prefix: 'period' })],
    count: `${EVENTS.length} rounds`,
  }) +
  table({
    caption: 'State is explicit on every round, because “where is this one up to” is U1’s standing question. Primary and QC are counted apart — a round of nine samples of which four are blanks has not sampled nine bores.',
    head: ['Round', 'What', 'Window', 'Collected', 'By', 'Primary', 'QC', 'Laboratory', 'State'],
    rows: EVENTS.map((e) => [
      `<a class="mk-ref mk-ref--loc" href="#events">${esc(e.code)}</a>`,
      esc(e.label),
      `<span class="mk-muted">${esc(e.window)}</span>`,
      `<span class="sf-instant">${esc(e.collected)}</span>`,
      esc(e.by),
      `<span class="mk-num">${e.samples}</span>`,
      e.qc ? `<span class="mk-num">${e.qc}</span>` : '<span class="mk-num mk-num--nil">0</span>',
      esc(e.lab),
      C.status(e.state, e.state === 'planned' ? 'neutral' : e.state === 'results-partial' ? 'warn' : 'good'),
    ]),
    kind: 'matrix',
    label: 'Sampling events',
  }) +
  (() => {
    const qcRows = EVENT_SAMPLES.filter((s) => s.qc !== '—');
    const containers = EVENT_SAMPLES.reduce((n, s) => n + s.containers, 0);
    /*
     * What each control answers. The strings are prose and live here; every
     * number and every identifier below is read from the manifest, so a QC
     * sample added to the seed appears in this taxonomy without anybody
     * remembering to add it — which is how the equipment blank came to be
     * referenced by the QA/QC screen for a fortnight while appearing on no
     * manifest at all.
     */
    const ANSWERS = {
      'Field duplicate (blind)': 'Sampling and analysis together — the only control that carries the act of collecting',
      'Field blank': 'Contamination from handling and from the air at the bore',
      'Trip blank': 'Contamination picked up in transit, in the cooler, by the containers themselves',
      'Equipment blank (rinsate)': 'Carry-over on equipment reused between two bores — the glossary’s equipment blank, and the rinsate a field officer asks for',
    };
    const roles = [...new Set(qcRows.map((s) => s.qc))].map((role) => {
      const rows = qcRows.filter((s) => s.qc === role);
      return [
        esc(role),
        '<span class="mk-tag mk-tag--neutral">field</span>',
        rows.map((r) => `<span class="mk-file mk-file--id">${esc(r.id)}</span>`).join('<br>'),
        rows.map((r) => `<span class="mk-muted">${esc(r.detail ?? r.parent)}</span>`).join('<br>'),
        esc(ANSWERS[role] ?? ''),
      ];
    });
    const lab = LAB_QC.map((q) => [
      esc(q.kind),
      '<span class="mk-tag mk-tag--neutral">laboratory</span>',
      `<span class="mk-file mk-file--id">${esc(q.id)}</span>`,
      `<span class="mk-muted">${esc(q.parent)}</span>`,
      esc(q.answers),
    ]);
    return (
      '<h2 class="mk-h2" style="margin-top:1.4rem">2026-Q2-GW — the sample manifest</h2>' +
      C.tabs([
        { label: 'Samples', count: EVENT_SAMPLES.length, current: true },
        { label: 'Field observations' },
        { label: 'Results' },
        { label: 'QC linkage', count: qcRows.length },
        { label: 'Documents', count: 4 },
        { label: 'Audit' },
      ]) +
      table({
        // The caption sits inside the panning region, so a long one is cut
        // at the viewport edge on a phone rather than wrapping. One clause
        // here; the argument goes in a paragraph under the table, which wraps.
        caption: 'Event → sample → test → result, in one view.',
        head: ['Sample', 'Location', 'Matrix', 'Collected · AWST', 'Depth', 'QC role', 'Parent', 'Containers', 'Results', 'State'],
        rows: EVENT_SAMPLES.map((s) => [
          `<span class="mk-file mk-file--id">${esc(s.id)}</span>`,
          s.location === '—' ? '<span class="mk-num mk-num--nil">—</span>' : loc(s.location),
          esc(s.matrix),
          `<span class="sf-instant">${esc(s.collected.replace(' AWST', ''))}</span>`,
          esc(s.depth),
          s.qc === '—' ? '<span class="mk-num mk-num--nil">primary</span>' : `<span class="mk-tag mk-tag--new">${esc(s.qc)}</span>`,
          s.parent === '—'
            ? '<span class="mk-num mk-num--nil">—</span>'
            : s.parent.startsWith('WDL-')
              ? `<span class="mk-file mk-file--id">${esc(s.parent)}</span>`
              : `<span class="mk-muted">${esc(s.parent)}</span>`,
          `<span class="mk-num">${s.containers}</span>`,
          // Two columns became one: "13 of 14" is the sentence a reader was
          // making out of them anyway, and the pair cost a column that the pan
          // then hid at every width.
          `<span class="mk-num${s.results < s.tests ? ' mk-num--warn' : ''}">${s.results} of ${s.tests}</span>`,
          C.status(s.state, s.state === 'results-partial' ? 'warn' : 'good'),
        ]),
        kind: 'matrix',
        label: 'Sample manifest for round 2026-Q2-GW',
      }) +
      '<p class="mk-tight">Every QC sample names its parent <em>by code</em>. The incumbent alternative is a naming convention — <code class="mk-file">MW05-DUP</code> beside <code class="mk-file">MW05</code>, related by a substring and by nothing the database knows, and unrelated the moment somebody types <code class="mk-file">MW05 DUP</code>.</p>' +
      `<p class="mk-tight"><strong>${containers} containers</strong> across ${EVENT_SAMPLES.length} samples — the same ${containers} the ` +
      `<a class="mk-ref" href="#ecoc">chain of custody</a> sealed on 14 May and the same ${containers} the laboratory reconciled on ` +
      `arrival (<a class="mk-ref" href="#receipt">38 of 38</a>). Three screens, one addition: a manifest that cannot be added up to the ` +
      'number on the custody form is the first thing a challenge finds.</p>' +
      notice(
        'warning',
        'MW11 is not on this manifest, and that is the finding rather than an omission.',
        'The 2026 Q2 window closed on 14 May in Australia/Perth and the bore was not sampled — it is nine days overdue on the <a class="mk-ref" href="#programme">programme</a> and short nine results on the <a class="mk-ref" href="#dqa">data quality assessment</a>. A manifest that quietly listed it, or that omitted the row without saying so, would let an overdue round read as collected.',
      ) +
      panel(
        'The QC taxonomy, closed — and split by where each control is made',
        table({
          caption: 'Every control this round rests on, what it is made from, and the question it answers.',
          head: ['Control', 'Made', 'This round', 'Parent', 'What it answers'],
          rows: [...roles, ...lab],
          kind: 'matrix',
          label: 'QC taxonomy for round 2026-Q2-GW',
        }) +
          '<p class="mk-tight">The split is the point. A <em>field</em> duplicate and a <em>laboratory</em> duplicate are both duplicates and they are not the same control: one carries the act of collecting and the other does not, so a pair that disagrees says something different depending on which it was. Products that list them under one word have thrown away the only thing the pair was collected to separate.</p>' +
          `<p class="mk-tight">The bench controls belong to the <a class="mk-ref" href="#batches">laboratory batch</a>, not to this round — a control sample applies to a batch, which is what makes “which results does this failed spike qualify” answerable. The matrix spike on ${esc(LAB_QC.find((q) => q.kind === 'Matrix spike').parent)} is the one that failed, and it qualifies every zinc result in ${esc(LAB_QC.find((q) => q.kind === 'Matrix spike').batch)} rather than the sample it was made from.</p>` +
          '<p class="mk-tight mk-muted">No composites. FR-1.7’s depth intervals and increment traceability are soil and sediment work, staged S8 — every row above is a discrete grab, and drawing a composite here would be drawing a matrix the slice does not carry.</p>',
      )
    );
  })() +
  cols(
    panel(
      'A blind duplicate stays blind, and the link is still recorded',
      `<p class="mk-tight">Two field duplicates this round — ${EVENT_SAMPLES.filter((s) => s.qc === 'Field duplicate (blind)').map((s) => `<span class="mk-file">${esc(s.id)}</span>`).join(' and ')} — and the laboratory was told about neither. The link exists in the record from the moment the sample was collected, so the RPD can be computed, and the laboratory never had the chance to make two results agree.</p>` +
        '<p class="mk-tight">The distinction the screen has to keep is between <em>the laboratory did not know</em> and <em>we do not know</em>. Showing the parent here is correct; showing it on anything the laboratory receives is not.</p>' +
        C.card({
          tone: 'new',
          head: '<span class="mk-queue__kind">QC linkage</span>',
          body: 'WDL-26Q2-004 → parent WDL-26Q2-003 · MW05 · declared at collection 2026-05-13 08:40 AWST by A. Nakamura. Zinc RPD 38.2% against a 30% limit — <a class="mk-ref" href="#qc">open in QA/QC</a>.',
        }),
    ),
    panel(
      'The planned round, before anything exists',
      '<p class="mk-tight">2026-Q3-GW has no samples, no results and no certificate. It is not an empty state — it is a real object with a window, a location list and an analyte suite, and it is what a missed round is measured against.</p>' +
        facts([
          ['Window', '1 Jul – 30 Sep 2026 · Australia/Perth'],
          ['Opens', '2026-07-01 00:00 AWST — 2026-06-30 16:00 UTC'],
          ['Locations', '7 groundwater bores'],
          ['Analyte suites', 'Field parameters · dissolved metals · nutrients · PFAS'],
          ['Expected results', '63'],
          ['Responsible', 'A. Nakamura'],
        ]),
    ),
  )
);

const quarantine = () => (
  head('Held rows', 'Everything that did not make it into the record, why, and the way out of each one.', {
    route: '/projects/:projectId/held',
    toolbar: C.exportMenu() + C.btn('Re-run the map stage'),
  }) +
  stats([
    stat('3', 'held right now', 'warn'),
    stat('1', 'resolved this week', 'good'),
    stat('112', 'held in the migration'),
    stat('0', 'silently dropped', 'good'),
  ]) +
  notice(
    'warning',
    'A hold is a place with a way out, not a rejection.',
    'These rows were read, understood and deliberately not written, and each reason below is the one the rule itself produced rather than a code you have to look up. The count is on the import run, on the project home and on the work queue — a held row that is only visible if somebody thinks to look for it has been dropped, whatever the database says.',
  ) +
  table({
    caption: 'IMP-0239 · Yarra Regional Analytical · 42 rows read, 39 committed, 3 held.',
    head: ['Row', 'Subject', 'Why it was held', 'Rule', 'The way out', 'State'],
    rows: QUARANTINE.map((q) => [
      `<span class="mk-num">${q.row}</span>`,
      `<span class="mk-file">${esc(q.subject)}</span>`,
      `<span class="mk-muted">${esc(q.reason)}</span>`,
      `<code class="mk-file">${esc(q.rule)}</code>`,
      esc(q.wayOut),
      C.status(q.state, q.state === 'held' ? 'warn' : 'good'),
    ]),
    kind: 'matrix',
    label: 'Held rows on IMP-0239',
  }) +
  cols(
    panel(
      'Resolving one',
      C.field({
        label: 'Row 31 — validation state “QA-Hold”',
        control: C.combobox({
          value: '',
          placeholder: 'Map to a validation state…',
          open: true,
          suggestions: [
            { label: 'screened', detail: 'Reviewed against QA/QC, not yet validated', confidence: 0.71 },
            { label: 'unvalidated', detail: 'Received and parsed, no review applied', confidence: 0.44 },
            { label: 'rejected', detail: 'Reviewed and refused — excluded from evaluation', confidence: 0.12 },
          ],
          escape: 'Keep these six rows held, and ask Yarra Regional what QA-Hold means',
        }),
        hint: 'Nothing above 95%, so nothing is proposed. The importer will not guess a review judgement, because a wrong one is indistinguishable from a real one afterwards.',
      }) +
        C.checkbox({
          label: 'Save this answer to the Yarra Regional Analytical mapping profile',
          checked: true,
          hint: 'The same question is never asked twice. It stays visible as an applied decision on every later import, with your name on it — an auto-applied answer that hides itself is a different failure from asking again.',
        }) +
        '<div class="mk-actions">' + C.btn('Apply and re-run the map stage', 'primary') + C.btn('Leave held') + '</div>' +
        '<p class="mk-tight" style="margin-top:.6rem"><strong>Nothing is written until the stage re-runs and you commit again.</strong> Resolving a hold rebuilds from the stored parse artifact; the file is not re-uploaded and the 39 rows already committed are untouched.</p>',
    ),
    panel(
      'Held, and there is genuinely nothing to accept',
      C.card({
        tone: 'bad',
        head: '<span class="mk-queue__kind">Row 24</span><span class="mk-queue__age">held 5 days</span>',
        body:
          '<p class="mk-queue__headline">Sulfate as SO₄ · MW09 · 2026-05-14</p>' +
          '<p class="mk-queue__context">The laboratory reported <code class="mk-file">−999</code>, which their format defines as <em>analysis aborted</em>. That is not a concentration, and there is no value here to accept, qualify or estimate. Storing it as a number would invent a measurement; storing it as zero would invent a clean result.</p>',
        foot: C.btn('Request a re-analysis', 'primary') + C.btn('Record that the round is short one result') +
          '<span class="mk-muted">No “accept anyway” — there is nothing to accept.</span>',
      }) +
        '<p class="mk-tight" style="margin-top:.7rem">Most held rows have an answer. This one does not, and the screen says so rather than offering a control that would produce a lie. An interface that always offers a way forward teaches people to take it.</p>',
    ),
  )
);

/* ================================================================== *
 * J3 addition — one result, with everything true about it at once
 * ================================================================== */

const resultDetail = () => {
  const R = RESULT_DETAIL;
  return (
    head(`${esc(R.reported)} — ${esc(R.analyte)}`, 'One result: what was measured, what could not be, and what anyone has said about it.', {
      route: '/projects/:projectId/results/:resultId',
      toolbar: C.lineageButton('Open lineage') + C.exportMenu() + C.btn('Annotate', 'primary'),
    }) +
    C.tabs([
      { label: 'Record', current: true },
      { label: 'Outcomes', count: 2, dot: 'warn' },
      { label: 'Annotations', count: 1 },
      { label: 'QC', count: 3 },
      { label: 'Supersession' },
      { label: 'Documents', count: 2 },
      { label: 'Audit' },
    ]) +
    C.card({
      tone: 'warn',
      head: '<span class="mk-queue__kind">The number, as reported</span>' +
        '<span class="mk-queue__age">Certificate ' + esc(R.certificate) + '</span>',
      body:
        `<div class="mk-lineage__subject" style="margin:0">` +
        `<span class="mk-lineage__value">${esc(R.reported)}</span>` +
        `<span class="mk-lineage__meta">${esc(R.detect)} — the laboratory's own notation, kept verbatim. ` +
        'This is never rendered as <code class="mk-file">1.0</code>, and never as <code class="mk-file">0</code>, ' +
        'and never as a substituted half-limit. A censored value that looks like a measurement is the defect ' +
        'this product is least allowed to have.</span></div>',
    }) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">The record</h2>' +
    facts([
      ['Analyte', `${esc(R.analyte)} ${C.why('The dictionary resolved “Cd-diss” from this laboratory to this analyte through the Pilbara Analytical Services mapping profile, learned 2024-03-11 by A. Nakamura and applied 44 times since.')}`],
      ['Location', loc(R.location)],
      ['Sample', `<span class="mk-file">${esc(R.sample)}</span>`],
      ['Collected', `<span class="sf-instant">${esc(R.collected)}</span>`],
      ['Analysed', `<span class="sf-instant">${esc(R.analysed)}</span>`],
      ['Method', esc(R.method)],
      ['Detect status', `<strong>${esc(R.detect)}</strong>`],
      ['Limit of reporting (LOR)', `<span class="mk-num">${esc(R.lor)}</span>`],
      ['Method detection limit (MDL)', `<span class="mk-num">${esc(R.mdl)}</span>`],
      ['Practical quantitation limit (PQL)', `<span class="mk-num">${esc(R.pql)}</span>`],
      ['Certificate', `<a class="mk-ref" href="#certificate">${esc(R.certificate)}</a>`],
      ['Validation state', tag('screened', 'warn')],
    ]) +
    notice(
      'default',
      'Three limits, and they are not the same number.',
      'The incumbents carry these separately too — this is parity, not a differentiator — and the bar is that they never collapse into one. An LOR is what the laboratory will report to; an MDL is what the method can distinguish from noise; a PQL is what it can quantify reliably. Evaluating against a criterion uses the LOR, and the other two stay on the record because a re-analysis argument is made from them.',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">Assessed against each criteria set</h2>' +
    table({
      caption: 'One row per criteria set, evaluated concurrently. There is no single verdict, because there is no single criterion.',
      head: ['Criteria set', 'Criterion', 'Outcome', 'Why'],
      rows: R.outcomes.map((o) => [
        esc(o.set),
        `<span class="mk-num">${esc(o.criterion)}</span>`,
        `<span class="sf-result">${mark(o.outcome, o.set)}<span style="margin-left:.4rem">${esc(o.outcome)}</span></span>`,
        `<span class="mk-muted">${esc(o.why)}</span>`,
      ]),
    }) +
    outcomeLegend() +
    C.card({
      tone: 'bad',
      head: '<span class="mk-queue__kind">The state that is not a pass</span>',
      body:
        '<p class="mk-tight">A non-detect at an LOR of 1.0 µg/L against a criterion of 0.54 µg/L means <strong>nothing was measured either way</strong>. The laboratory did not find cadmium above 1.0; the criterion sits below that; the result is silent about the criterion.</p>' +
        '<p class="mk-tight">An incumbent renders this as compliant by default, and a documented support thread records exactly that happening — <code class="mk-file">&lt;0.60</code> against a 0.5 standard, flagged in the alert email and shown as a pass in the chemistry table until a non-default setting was enabled. Two surfaces of the same product disagreed, and the default was the wrong one.</p>' +
        '<p class="mk-tight">Here it is its own state, identically on every surface that shows it: this page, the crosstab, the box plot, the summary table, the report and the Excel export.</p>',
    }) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">Qualifiers and annotation</h2>' +
    cols(
      panel(
        'Annotations — a practitioner’s words, kept apart from the laboratory’s',
        table({
          head: ['Code', 'Source', 'Meaning'],
          rows: R.qualifiers.map((q) => [`<strong class="mk-file">${esc(q.code)}</strong>`, tag(q.source, 'neutral'), esc(q.meaning)]),
        }) +
          R.annotations
            .map(
              (a) =>
                C.card({
                  tone: 'new',
                  head: `<span class="mk-queue__kind">Annotation · ${esc(a.by)}</span><span class="mk-queue__age">${esc(a.at)}</span>`,
                  body: `<p class="mk-tight">${esc(a.text)}</p>`,
                  foot: `<span class="mk-tag mk-tag--new">Flows to ${esc(a.flowsTo)}</span><span class="mk-muted">Attributed, audited, and it survives a supersession of the value it is about.</span>`,
                }),
            )
            .join('') +
          C.field({
            label: 'Add an annotation',
            control: C.textarea({ placeholder: 'What a reader of the report needs to know about this number…', rows: 3 }),
            hint: 'Free text, yours, and never mixed with the laboratory’s qualifier codes. Tick below and it reaches the report rather than dying here — which is the whole reason people keep this in a spreadsheet instead.',
          }) +
          C.checkbox({ label: 'Carry this into the report’s data-quality section', checked: true }) +
          '<div class="mk-actions">' + C.btn('Save annotation', 'primary') + '</div>',
      ),
      panel(
        'Where this number is used',
        '<p class="mk-tight">Annotating or superseding a value is only safe if you can see what it feeds.</p>' +
          table({
            head: ['Used by', 'How'],
            rows: [
              [`<a class="mk-ref" href="#crosstab">Results crosstab</a>`, '2026 Q2 · MW05 column'],
              [`<a class="mk-ref" href="#qc">QA/QC workspace</a>`, 'Reporting-limit-above-criterion check'],
              [`<a class="mk-ref" href="#statistics">Summary statistics</a>`, 'Kaplan–Meier — carried as censored, never substituted'],
              [`<a class="mk-ref" href="#hydrochem">Box plot, Figure 6</a>`, 'Drawn below the axis break with the censored symbol'],
              [`<a class="mk-ref" href="#report">Report §3, §4</a>`, 'Data-quality paragraph and the Q2 crosstab table'],
            ],
          }) +
          C.stateBlock('partial', {
            headline: 'One consumer could not be resolved.',
            detail:
              'A saved view owned by another user (R. Whitmore, “Compliance boundary — Table 4”) may reference this analyte; your binding does not let you read their private views. The count above is therefore a floor, and the screen says so rather than showing five as though it were all of them.',
          }),
      ),
    )
  );
};

/* ================================================================== *
 * J5 addition — what has already gone out
 * ================================================================== */

const submissionArchive = () => (
  head('Submissions', 'What was sent, when, by whom, and against which snapshot. None of it can change.', {
    route: '/projects/:projectId/submissions',
    toolbar: C.exportMenu() + C.btn('Record an external submission'),
  }) +
  stats([
    stat('4', 'submissions on record'),
    stat('3', 'accepted', 'good'),
    stat('1', 'acknowledged, awaiting response'),
    stat('0', 'unevidenced', 'good'),
  ]) +
  notice(
    'default',
    'This register is read-only by construction, and the controls that would edit it do not exist.',
    'A submission is a thing that happened. Correcting one means issuing a new submission that supersedes it, which is a row here rather than an edit to a row here — and that distinction is the difference between a system of record and a shared folder.',
  ) +
  table({
    caption: 'Newest first. Every row resolves to the exact bytes that were sent.',
    head: ['Reference', 'What', 'To', 'Submitted', 'By', 'Snapshot', 'Delivery evidence', 'State'],
    rows: SUBMISSIONS.map((s) => [
      `<strong class="mk-file">${esc(s.ref)}</strong>`,
      esc(s.what),
      esc(s.to),
      `<span class="sf-instant">${esc(s.submitted)}</span>`,
      esc(s.by),
      `<a class="mk-ref" href="#snapshot">${esc(s.snapshot)}</a>`,
      `<a class="mk-ref" href="#documents">${esc(s.evidence)}</a>`,
      C.status(s.state, 'good'),
    ]),
    kind: 'matrix',
    label: 'Submission archive',
  }) +
  cols(
    panel(
      'Regenerating a submission four years later',
      '<p class="mk-tight">SNAP-0088 bound the 2025 Annual Environmental Report. Re-running it today produces a byte-identical document, because the snapshot froze every input rather than pointing at live data.</p>' +
        facts([
          ['Snapshot', 'SNAP-0088 · taken 2025-09-26 16:18 AWST'],
          ['Results bound', '11,204 · by identity, not by query'],
          ['Criteria versions', 'ANZG 2018.1 · Licence Table 4 2019.1 — the version in force then'],
          ['Figure configurations', '14, at the versions they held that day'],
          ['Template', 'Wandalup corporate template v3 (.dotx) · retained'],
          ['Analyte dictionary', '2025.3'],
          ['Regenerated', '2026-06-02 during a restore drill — identical to the byte'],
        ]) +
        '<div class="mk-actions">' + C.btn('Regenerate and compare', 'primary') + C.btn('Download what was sent') + '</div>' +
        '<p class="mk-tight" style="margin-top:.6rem">Two results were superseded after this went out. The regeneration still produces the 2025 document, and the supersessions are visible against it rather than folded into it — a snapshot that quietly improved would make the archive useless as evidence.</p>',
    ),
    panel(
      'Scheduled delivery, and what happens when it fails',
      table({
        head: ['Obligation', 'Channel', 'Last run', 'Outcome'],
        scroll: true, label: 'Scheduled deliveries',
        rows: [
          ['Quarterly discharge return', 'DWER portal · manual lodgement', '2026-04-24', C.status('accepted', 'good')],
          ['Exceedance notification', 'Email to the nominated officer', '2026-05-22', C.status('acknowledged', 'good')],
          ['Monthly TSF summary', 'Webhook to the operator’s document system', '2026-08-01', C.status('delivered', 'good')],
          ['Monthly TSF summary', 'Webhook', '2026-07-01', C.status('failed — retried, then escalated', 'bad')],
        ],
      }) +
        '<p class="mk-tight" style="margin-top:.6rem">A destination is a row in the database and nothing in the alerting code holds a URL. There is no Strataflow-operated relay in the path, redirects are refused rather than followed, and a failed delivery escalates to a person rather than retrying into silence.</p>',
    ),
  )
);

/* ================================================================== *
 * J6 addition — the licence as an entity, not as a string on a header
 * ================================================================== */

const licenceScreen = () => {
  const L = LICENCE;
  return (
    head(`Licence ${esc(L.id)}`, 'The conditions, what each one governs, and the report that discharges it.', {
      route: '/projects/:projectId/licence',
      toolbar: C.exportMenu() + C.btn('Record a variation'),
    }) +
    C.tabs([
      { label: 'Conditions', count: L.conditions.length, current: true },
      { label: 'Governed locations', count: 6 },
      { label: 'Discharge points', count: 1 },
      { label: 'Entitlements', count: 1 },
      { label: 'Variations', count: 3 },
      { label: 'Documents', count: 5 },
      { label: 'Audit' },
    ]) +
    facts([
      ['Holder', esc(L.holder)],
      ['Regulator', esc(L.regulator)],
      ['Issued', esc(L.issued)],
      ['Expires', esc(L.expires)],
      ['Last varied', esc(L.lastVaried)],
      ['Conditions with a monitoring obligation', `${L.conditions.length} of 24`],
    ]) +
    notice(
      'warning',
      'A variation reaches forward, never back.',
      'Table 4 was tightened on 2024-07-01. Results collected before that date are evaluated against the 2019.1 limits that were in force when they were collected, and a report reissued today for 2023 Q4 still uses them. A licence that silently re-evaluated history would make every issued submission wrong the day it changed.',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">Conditions</h2>' +
    table({
      caption: 'Each condition traced to the locations it governs and the submission that discharges it.',
      head: ['Condition', 'What it requires', 'Governs', 'Discharged by', 'State'],
      rows: L.conditions.map((c) => [
        `<strong class="mk-file">${esc(c.n)}</strong>`,
        esc(c.what),
        c.governs.includes('MW') || c.governs.includes('SW') || c.governs.includes('PB')
          ? c.governs.split(', ').map((g) => (g.startsWith('MW') || g.startsWith('SW') ? loc(g) : esc(g))).join(', ')
          : esc(c.governs),
        `<a class="mk-ref" href="#obligations">${esc(c.discharges)}</a>`,
        // A third state arrived with 12(c): a condition a window has *tripped*
        // is not "met" and it is not merely "due", and rendering it as either
        // is the drift the tone map is here to refuse.
        C.status(c.state, c.state === 'due' ? 'warn' : c.state === 'triggered' ? 'bad' : 'good'),
      ]),
      kind: 'matrix',
      label: 'Licence conditions',
    }) +
    cols(
      panel(
        'Discharge points',
        table({
          head: ['Point', 'What', 'Limit', 'Monitored at'],
          rows: L.dischargePoints.map((d) => [
            `<strong class="mk-file">${esc(d.id)}</strong>`,
            esc(d.what),
            esc(d.limit),
            loc('SW01') + ' <span class="mk-muted">· 200 m downstream</span>',
          ]),
        }),
      ),
      panel(
        'Entitlement, against what has been taken',
        L.entitlements
          .map(
            (e) =>
              facts([
                ['Entitlement', `<span class="mk-file">${esc(e.id)}</span>`],
                ['What', esc(e.what)],
                ['Limit', esc(e.limit)],
                ['Taken', `<span class="mk-num">${esc(e.used)}</span>`],
                ['Headroom', `<span class="mk-num mk-num--good">${esc(e.headroom)}</span>`],
              ]) +
              C.progress({
                pct: 65,
                label: '812 of 1,250 ML taken',
                detail:
                  'The water year runs 1 July to 30 June, so 65% of the year has elapsed against 65% of the entitlement. The comparison is the point — a volume without its share of the year is a number nobody can act on.',
              }),
          )
          .join(''),
      ),
    ) +
    panel(
      'What this condition is discharged by, all the way down',
      '<p class="mk-tight">Condition 12(b) is the one an inspector asks about, and answering it should not require assembling three screens from memory.</p>' +
        C.pipeline([
          { name: 'Condition 12(b)', detail: 'Groundwater quality at the compliance boundary must not exceed Table 4 limits.', state: 'done' },
          { name: 'Governs MW09 and MW11', detail: 'Membership resolved through the “Compliance boundary” location group, in force since 2019-03-01.', state: 'done' },
          { name: 'Evaluated against Licence Table 4 v2024.2', detail: '12 analytes · effective 2024-07-01 · the version in force at each result’s collection date.', state: 'done' },
          { name: 'Monitored by programme GW-QTR', detail: 'Quarterly, fiscal quarters ending June, resolved in Australia/Perth.', state: 'done' },
          { name: '2026 Q2 round', detail: 'MW09 collected 2026-05-14, one result short. MW11 not collected — overdue by 9 days.', state: 'fail', rerun: true },
          { name: 'Discharged by the quarterly report', detail: 'Not yet issued for 2026 Q2. The last discharge was WDL-QGR-2026Q1 on 2026-04-28.', state: 'wait' },
        ]),
    )
  );
};

/* ================================================================== *
 * J7 addition — the documents the lineage chain actually terminates at
 * ================================================================== */

const documents = () => (
  head('Documents', 'Certificates, custody forms, photographs and evidence — attached where they belong.', {
    route: '/projects/:projectId/documents',
    toolbar: C.exportMenu() + C.btn('Attach a document', 'primary'),
  }) +
  stats([
    stat('34', 'documents on this project'),
    stat('11', 'laboratory certificates'),
    stat('1.4 GB', 'in tenancy object storage'),
    stat('0', 'referenced but missing', 'good'),
  ]) +
  C.filterBar({
    controls: [
      C.field({ label: 'Attached to', control: C.select({ options: ['Anything', 'A location', 'A sampling event', 'A sample', 'An import run', 'A notification'], value: 'Anything' }) }),
      C.field({ label: 'Kind', control: C.select({ options: ['Any kind', 'Laboratory certificate', 'Chain of custody', 'Field photograph', 'Notification evidence', 'Construction record'], value: 'Any kind' }) }),
      C.field({ label: 'Added', control: C.dateRange({ from: '2026-04-01', to: '2026-08-23' }) }),
    ],
    chips: [C.chip('2026', { prefix: 'added' })],
    count: '6 of 34 documents',
  }) +
  table({
    caption: 'Every document is attached at a level of the hierarchy, and appears on the documents tab of everything below it.',
    head: ['File', 'Kind', 'Attached to', 'Added by', 'When', 'Size', 'Content hash', 'State'],
    rows: DOCUMENTS.map((d) => [
      `<a class="mk-ref mk-file" href="#certificate">${esc(d.name)}</a>`,
      esc(d.kind),
      esc(d.attachedTo),
      esc(d.by),
      `<span class="sf-instant">${esc(d.at)}</span>`,
      `<span class="mk-num">${esc(d.size)}</span>`,
      `<code class="mk-file">${esc(d.hash)}</code>`,
      C.status(d.state, d.state === 'superseded' ? 'warn' : d.state === 'lineage terminus' ? 'info' : 'good'),
    ]),
    kind: 'matrix',
    label: 'Documents on this project',
  }) +
  cols(
    panel(
      'The chain terminates at the certificate, not at a filename',
      '<p class="mk-tight">A lineage that ends with the string <code class="mk-file">PAS2026-04417.pdf</code> has ended at a label. This one ends at the bytes: content-addressed, stored in the customer’s own object storage, and verified on read.</p>' +
        C.pipeline([
          { name: 'Result — 4.8 ng/L, PFOS + PFHxS at MW05', detail: 'Derived from two components, both detected.', state: 'done' },
          { name: 'Import run IMP-0239', detail: 'Committed 2026-05-19 10:22 by dokafor@wandalup.example.', state: 'done' },
          { name: 'Source file YAR-26-0881_Wandalup_PFAS.csv', detail: 'Rows 18 and 24 · stored verbatim, never the parsed form alone.', state: 'done' },
          { name: 'Certificate YAR-26-0881.pdf', detail: 'sha256:c4a1…88f2 · 1.1 MB · verified on read 2026-08-23 07:41. This is the terminus.', state: 'done' },
        ]) +
        '<p class="mk-tight">Full-fidelity export includes the documents. A customer leaving takes the certificates with the numbers, because numbers whose evidence stayed behind are not a record of anything.</p>',
    ),
    panel(
      'Uploading over a site link',
      C.progress({
        pct: 42,
        label: 'MW05-headworks-2026-05-13.jpg · 2.8 MB',
        detail: '1.2 MB of 2.8 MB · 38 KB/s · about 42 seconds left',
        resumable: true,
      }) +
        C.stateBlock('error', {
          headline: 'The connection dropped 61% of the way through PAS2026-04417.pdf.',
          detail:
            'Nothing partial was written and nothing was lost — 740 KB is held and the transfer resumes from there. This happens on a site link and it is not an error you caused; the upload will finish when the connection does.',
          action: 'Resume from 740 KB',
          secondary: 'Discard and start again',
        }),
    ),
  )
);

/* ================================================================== *
 * J8 additions — the project's own settings, the mapping memory, the units
 * ================================================================== */

const projectSettings = () => (
  head('Project settings', 'What this project is, what it evaluates against, and who can act in it.', {
    route: '/projects/:projectId/settings',
    toolbar: C.btn('Save changes', 'primary', { disabled: true }),
  }) +
  C.tabs([
    { label: 'Identity', current: true },
    { label: 'Criteria binding' },
    { label: 'Reporting calendar' },
    { label: 'Membership', count: MEMBERS.length },
    { label: 'Audit' },
  ]) +
  notice(
    'warning',
    'What a “project” is for a single-operator customer is not settled, and this screen cannot be finished until it is.',
    'Facility-coextensive — one project per site, always — or a work scope inside a facility, so a closure study and routine compliance monitoring are separate projects over the same bores? The first is simpler and matches every fixture. The second is what a consultancy would need, and the authorisation model already supports it. The screen is drawn against the first reading and says so, rather than quietly choosing.',
  ) +
  cols(
    '<section>' +
      panel(
        'Identity',
        C.field({ label: 'Project code', control: C.input({ value: 'MOCK-WDL', mono: true }), hint: 'Appears in the header, in every export filename and on every report cover. Changing it does not change the URL, which is a UUID.', required: true }) +
          C.field({ label: 'Project name', control: C.input({ value: 'Wandalup Operations' }), required: true }) +
          C.field({ label: 'Facility', control: C.select({ options: ['Wandalup mine and TSF', 'Kurrajong water supply', 'Wanjina waste facility'], value: 'Wandalup mine and TSF' }), hint: 'The facility supplies the area hierarchy every location hangs from.' }) +
          C.field({ label: 'Jurisdiction', control: C.select({ options: ['Western Australia — DWER', 'Queensland — DES', 'New South Wales — EPA', 'Northern Territory — DEPWS'], value: 'Western Australia — DWER' }) }) +
          C.field({
            label: 'Timezone',
            control: C.select({ options: ['Australia/Perth', 'Australia/Brisbane', 'Australia/Darwin', 'Australia/Sydney'], value: 'Australia/Perth' }),
            hint: 'Every monitoring period, due date and countdown resolves here and never on the server. A quarterly round at a Pilbara bore begins at 16:00 UTC on 31 December — get this wrong and a round that was satisfied reads as missed while a spurious one reads as met.',
            required: true,
          }) +
          C.field({
            label: 'Coordinate reference system',
            control: C.select({ options: ['GDA2020 / MGA zone 50 (EPSG:7850)', 'GDA2020 / MGA zone 51 (EPSG:7851)', 'GDA94 / MGA zone 50 (EPSG:28350)'], value: 'GDA2020 / MGA zone 50 (EPSG:7850)' }),
            hint: 'GDA2020 and WGS84 agree only at epoch 2020.0 and separate by about 7 cm a year. A WGS84 coordinate carries its epoch; one arriving without an epoch is refused rather than assumed.',
            required: true,
          }),
      ) +
      panel(
        'Criteria bound to this project',
        table({
          head: ['Criteria set', 'Version', 'Applies to', ''],
          rows: [
            ['ANZG 2018 — 95% species protection', '2018.1', 'All groundwater locations', C.switchControl({ label: 'Bound', on: true })],
            ['Licence L8842/2019/1 — Table 4', '2024.2', 'Compliance boundary group', C.switchControl({ label: 'Bound', on: true })],
            ['Site-specific trigger values — TSF', '2025.1', 'MW05, MW07', C.switchControl({ label: 'Bound', on: true })],
            ['ANZG 2018 — 99% species protection', '2018.1', 'Not assigned', C.switchControl({ label: 'Bound', on: false })],
          ],
        }) +
          C.blastRadius({
            lede: 'Binding ANZG 99% would change:',
            rows: [
              { what: 'Results gaining a third mark', n: '2,841' },
              { what: 'New exceedances at the stricter set', n: '38' },
              { what: 'Historical evaluations rewritten', n: '0' },
              { what: 'Reports already issued', n: '0' },
              { what: 'Crosstab columns per result', n: '2 → 3' },
            ],
            action: 'Bind ANZG 99%',
            reversible: 'Reversible. Binding a set evaluates forward and re-evaluates on demand; it never rewrites an outcome that has been reported.',
          }),
      ) +
      '</section>',
    panel(
      'Reporting calendar',
      C.field({
        label: 'Reporting year ends',
        control: C.select({ options: ['June', 'December', 'March', 'September'], value: 'June' }),
        hint: 'The month a reporting year <em>ends</em>. With June, 2026 Q1 is July–September 2025 — a fiscal quarter is not a calendar quarter, and a calendar year is not a special case of this, only the December setting.',
      }) +
        C.field({ label: 'Reporting frequency', control: C.select({ options: ['Quarterly', 'Monthly', 'Half-yearly', 'Annually'], value: 'Quarterly' }) }) +
        C.field({ label: 'Grace period after period close', control: C.numberInput({ value: '21', unit: 'days', hintRight: 'before a round reads overdue' }) }) +
        table({
          caption: 'Resolved from the settings above, in Australia/Perth. Shown because a calendar rule nobody can check is a calendar rule that is wrong.',
          head: ['Period', 'Opens (local)', 'Opens (UTC)', 'Closes (local)'],
          rows: [
            ['2026 Q1', '2025-07-01 00:00', '2025-06-30 16:00', '2025-09-30 23:59'],
            ['2026 Q2', '2025-10-01 00:00', '2025-09-30 16:00', '2025-12-31 23:59'],
            ['2026 Q3', '2026-01-01 00:00', '2025-12-31 16:00', '2026-03-31 23:59'],
            ['2026 Q4', '2026-04-01 00:00', '2026-03-31 16:00', '2026-06-30 23:59'],
          ],
        }),
    ),
    '3fr 2fr',
  ) +
  '<h2 class="mk-h2" style="margin-top:1.4rem">Membership</h2>' +
  table({
    caption: 'Role bindings resolve from directory groups. Nothing here grants access directly — the group does, and this shows what that produced.',
    head: ['Person', 'Identity', 'Role', 'From group', 'Granted', 'By', 'Last seen', 'State'],
    rows: MEMBERS.map((m) => [
      esc(m.name),
      `<span class="mk-file">${esc(m.identity)}</span>`,
      `<span class="mk-tag mk-tag--${m.role === 'Approver' ? 'new' : m.role === 'Viewer' ? 'neutral' : 'good'}">${esc(m.role)}</span>`,
      `<span class="mk-muted">${esc(m.group)}</span>`,
      `<span class="sf-instant">${esc(m.granted)}</span>`,
      esc(m.by),
      `<span class="sf-instant">${esc(m.lastSeen)}</span>`,
      C.status(m.state, m.state === 'active' ? 'good' : 'neutral'),
    ]),
    kind: 'matrix',
    label: 'Project membership',
  }) +
  notice(
    'default',
    'Deprovisioning is provable, which is the requirement rather than the courtesy.',
    'J. Halloran left the Contributors group on 2026-07-31. Their session was invalidated on the next request, their last read was 2026-07-30 15:44 AWST, and every row they ever wrote still carries their identity — because withdrawing access and erasing history are different acts and only one of them was asked for.',
  )
);

const mappingProfiles = () => (
  head('Mapping profiles', 'What the importer has learned from each laboratory, and how to correct it when it learned wrong.', {
    route: '/projects/:projectId/mappings',
    toolbar: C.exportMenu() + C.btn('Import a profile') + C.btn('New profile', 'primary'),
  }) +
  table({
    caption: 'One profile per laboratory. A decision made once is applied silently-but-visibly forever after, so the place it is kept has to be inspectable.',
    head: ['Laboratory', 'Entries', 'Last used', 'Applied without asking, last run', 'Corrections', 'State'],
    rows: MAPPING_PROFILES.map((p) => [
      `<strong>${esc(p.lab)}</strong>`,
      `<span class="mk-num">${p.entries}</span>`,
      `<span class="sf-instant">${esc(p.lastUsed)}</span>`,
      `<span class="mk-num">${p.autoApplied}</span>`,
      p.corrections ? `<span class="mk-num mk-num--warn">${p.corrections}</span>` : '<span class="mk-num mk-num--nil">0</span>',
      C.status(p.state, p.state === 'active' ? 'good' : 'neutral'),
    ]),
  }) +
  '<h2 class="mk-h2" style="margin-top:1.2rem">Pilbara Analytical Services — 214 entries</h2>' +
  C.filterBar({
    controls: [
      C.field({ label: 'Find', control: C.input({ placeholder: 'What the laboratory wrote…', mono: true }) }),
      C.field({ label: 'Kind', control: C.select({ options: ['Any kind', 'analyte', 'unit', 'location', 'validation state', 'qualifier'], value: 'Any kind' }) }),
      C.field({ label: 'Learned by', control: C.select({ options: ['Anyone', 'A. Nakamura', 'D. Okafor', 'system'], value: 'Anyone' }) }),
    ],
    chips: [C.chip('has a correction', { prefix: 'flag', tone: 'bad' })],
    count: '5 of 214 entries',
  }) +
  table({
    caption: 'Every entry carries who taught it, when, and how many results it has produced — because that count is what a correction has to reach back over.',
    head: ['The laboratory writes', 'Resolves to', 'Kind', 'Learned', 'By', 'Uses', 'Version', 'State'],
    rows: MAPPING_ENTRIES.map((m) => [
      `<code class="mk-file">${esc(m.from)}</code>`,
      `<strong>${esc(m.to)}</strong>`,
      tag(m.kind, 'neutral'),
      `<span class="sf-instant">${esc(m.learned)}</span>`,
      esc(m.by),
      `<span class="mk-num">${m.uses}</span>`,
      `<span class="mk-num">v${m.version}</span>`,
      C.status(m.state, m.state === 'corrected' ? 'warn' : 'good'),
    ]),
    kind: 'matrix',
    label: 'Mapping entries',
  }) +
  cols(
    panel(
      'A mapping that was learned wrong, and the correction',
      C.card({
        tone: 'warn',
        head: '<span class="mk-queue__kind">Corrected 2025-02-03</span><span class="mk-queue__age">31 results re-derived</span>',
        body:
          '<p class="mk-tight"><code class="mk-file">TDS (calc)</code> was mapped to <strong>Total dissolved solids (dried)</strong> for six months. The laboratory calculates this from electrical conductivity and does not dry it, so every result carried a method it was never measured by.</p>' +
          '<p class="mk-tight">Correcting the mapping did not edit the results. It superseded them: 31 new results, each pointing at the one it replaced, each carrying the rule version that produced it. The originals are still readable, still attributed, and still show what a report issued in that window was based on.</p>',
        foot: `<a class="mk-btn mk-btn--sm" href="#supersession">See the supersession cascade</a><a class="mk-btn mk-btn--sm" href="#lineage">Open lineage on one</a>`,
      }) +
        C.blastRadius({
          lede: 'Correcting <code class="mk-file">Cd-diss</code> → <strong>Cadmium (total)</strong> would touch:',
          rows: [
            { what: 'Results re-derived and superseded', n: '44' },
            { what: 'Evaluations recomputed', n: '88 — two criteria sets' },
            { what: 'Outcomes that would change', n: '3' },
            { what: 'Reports already issued that cite them', n: '2 — flagged stale, not rewritten' },
            { what: 'Original results deleted', n: '0' },
          ],
          action: 'Correct the mapping',
          danger: true,
          reversible: 'Reversible as a further correction. Nothing is overwritten — a correction supersedes and reaches back, and the reports that cited the old values stay exactly as they were issued, marked stale.',
        }),
    ),
    panel(
      'Never asked twice — but never hidden either',
      '<p class="mk-tight">There are three outcomes on a review question, not two, and conflating the last two would put decisions into somebody’s history that they never made.</p>' +
        table({
          head: ['Outcome', 'Whose decision', 'Shown as'],
          rows: [
            ['Outstanding', 'Nobody yet — it blocks the commit', 'A question in the queue'],
            ['Applied from a prior decision', 'A named person, on a named import', 'Applied, with their name and the import it was made on'],
            ['Applied by the dictionary', 'Nobody — it is a synonym, not a judgement', 'Applied, attributed to the dictionary'],
          ],
        }) +
        '<p class="mk-tight">The middle row is the one that has to keep its attribution. “The system did it” and “you did it, eighteen months ago, on the Kurrajong import” are different answers to an auditor, and only one of them is true.</p>',
    ),
  )
);

const unitsScreen = () => (
  head('Units and conversions', 'Every unit the product recognises, and every rule it may apply to one.', {
    route: '/config/units',
    toolbar: C.exportMenu() + C.btn('Add a unit'),
  }) +
  notice(
    'default',
    'Any conversion applied anywhere in the product traces to a rule on this page.',
    'That is the units case of the rule that governs every derived value: carry the rule and its inputs, never convert silently. A number whose unit changed between the certificate and the report, with nothing recording why, is a number nobody can defend.',
  ) +
  table({
    caption: 'Canonical units, and what the laboratories call them.',
    head: ['Unit', 'Quantity', 'Also written', 'Results using it'],
    rows: UNITS.map((u) => [
      `<strong class="mk-file">${esc(u.unit)}</strong>`,
      esc(u.quantity),
      `<span class="mk-muted mk-file">${esc(u.aliases)}</span>`,
      `<span class="mk-num">${u.uses.toLocaleString('en-AU')}</span>`,
    ]),
  }) +
  '<h2 class="mk-h2" style="margin-top:1.2rem">Conversion rules</h2>' +
  table({
    caption: 'Exact means the arithmetic loses nothing. Everything else states what it assumes.',
    head: ['From', 'To', 'Rule', 'Factor', 'Exact', 'What it assumes'],
    rows: CONVERSIONS.map((c) => [
      `<code class="mk-file">${esc(c.from)}</code>`,
      `<code class="mk-file">${esc(c.to)}</code>`,
      `<span class="mk-file">${esc(c.rule)}</span>`,
      `<span class="mk-num">${esc(c.factor)}</span>`,
      c.exact ? C.status('exact', 'good') : C.status('states its basis', 'warn'),
      `<span class="mk-muted">${esc(c.note)}</span>`,
    ]),
    kind: 'matrix',
    label: 'Conversion rules',
  }) +
  cols(
    panel(
      'Display unit is not stored unit',
      '<p class="mk-tight">A practitioner reading PFAS in ng/L and metals in µg/L on the same crosstab is reading two units, and switching the display to one of them must not touch a single stored value.</p>' +
        C.field({
          label: 'Display concentrations in',
          control: C.select({ options: ['As reported by the laboratory', 'µg/L throughout', 'mg/L throughout'], value: 'As reported by the laboratory' }),
          hint: 'Changing this marks every converted cell and states the factor on hover. The stored value, the certificate and the export all keep the laboratory’s own unit.',
        }) +
        C.card({
          tone: 'new',
          head: '<span class="mk-queue__kind">A converted cell, as it renders</span>',
          body:
            '<span class="sf-result"><span class="sf-result__value">0.0048</span> <span class="mk-entry__unit">µg/L</span> ' +
            C.why('Converted for display from 4.8 ng/L by rule unit-scale v1, ÷ 1000, exact. The stored value is 4.8 ng/L and the export carries that. This conversion is display-only and is not recorded in lineage, because nothing was derived — the number on the record did not move.') +
            '</span>' +
            '<p class="mk-tight" style="margin-top:.5rem">Marked as converted, with the rule one hover away. A converted value that looks identical to a reported one is a small lie that compounds.</p>',
        }),
    ),
    panel(
      'The conversion that is not a conversion',
      '<p class="mk-tight">Depth below ground to elevation above datum looks like a unit change and is not one. It is a derivation against the survey datum in force on the measurement date.</p>' +
        C.pipeline([
          { name: 'Reading: 15.20 m bgl at MW05, 2026-05-13', detail: 'What the dip meter said. Stored exactly, forever.', state: 'done' },
          { name: 'Datum in force on 2026-05-13', detail: 'Top of casing 208.11 m AHD, from the resurvey of 2024-03-18. The 2019 survey said 208.42 and applies to readings before that date.', state: 'done' },
          { name: 'Rule datum-at-date v2', detail: '208.11 − 15.20 = 192.91 m AHD. Derived at read time and never stored.', state: 'done' },
          { name: 'The same reading, evaluated against 2019’s datum', detail: '208.42 − 15.20 = 193.22 m AHD. Storing the elevation would have frozen whichever datum happened to be in force the day it was calculated, and a resurvey would silently invalidate years of hydrograph.', state: 'wait' },
        ]),
    ),
  )
);

/* ================================================================== *
 * J9 additions — the operating model, which has no persona at all
 * ================================================================== */

const upgradeScreen = () => (
  head('Upgrade', 'What is available, what it would change, and the way back.', {
    route: 'CLI — the estate reports itself and an upgrade begins with a refusal',
    toolbar: C.btn('Run pre-flight again') + C.btn('Schedule the upgrade', 'primary'),
  }) +
  stats([
    stat(UPGRADE.current, 'running now'),
    stat(UPGRADE.available, 'available', 'good'),
    stat('4 of 5', 'pre-flight checks pass', 'warn'),
    stat('38 m', 'measured rollback time'),
  ]) +
  notice(
    'default',
    'Nothing installs itself, and that is a decision rather than a limitation.',
    'This is the customer’s instance in the customer’s cloud. An upgrade is scheduled by somebody who chose a window, and the product’s job is to make the consequences legible beforehand and the way back real afterwards.',
  ) +
  '<h2 class="mk-h2">Pre-flight</h2>' +
  table({
    caption: 'Run against a restored copy of this database, not against a model of it.',
    head: ['Check', 'Outcome', 'What it found'],
    rows: UPGRADE.preflight.map((p) => [
      esc(p.check),
      C.status(p.outcome, p.outcome === 'pass' ? 'good' : 'warn'),
      `<span class="mk-muted">${esc(p.detail)}</span>`,
    ]),
  }) +
  cols(
    panel(
      'What would change',
      table({
        head: ['Change', 'Kind', 'What it means here'],
        rows: UPGRADE.changes.map((c) => [
          `<strong>${esc(c.what)}</strong>`,
          tag(c.kind, c.kind === 'reference content' ? 'warn' : 'good'),
          `<span class="mk-muted">${esc(c.detail)}</span>`,
        ]),
      }) +
        C.blastRadius({
          lede: 'Accepting the analyte dictionary diff, 2026.2 → 2026.3:',
          rows: [
            { what: 'Analytes added', n: '14' },
            { what: 'Synonyms corrected', n: '2' },
            { what: 'Analytes removed', n: '0' },
            { what: 'Existing results re-mapped', n: '0' },
            { what: 'Your own mapping profiles overwritten', n: '0' },
          ],
          action: 'Review the diff line by line',
          cancel: 'Upgrade without the reference content',
          reversible:
            'Reference content arrives as a diff you accept, never as a silent overwrite. Your own corrections win over a shipped synonym — a customer who taught this instance something is not overruled by a release.',
        }),
    ),
    panel(
      'The way back',
      facts([
        ['Current image', 'ghcr.io/…/strataflow-web@sha256:4f8c…21ab'],
        ['Retained by digest', 'v0.7.2 · v0.7.1 · v0.6.4'],
        ['Backup before upgrade', 'Taken automatically, content-integrity verified'],
        ['Last restore drill', `${esc(UPGRADE.preflight[4].detail.split('·')[1]?.trim() ?? '2026-08-22')}`],
        ['Measured RTO', '38 minutes, end to end'],
        ['Migrations reversible?', 'Additive only in this release — no column is dropped, so a rollback needs no down-migration'],
      ]) +
        '<p class="mk-tight" style="margin-top:.7rem">There is no <code class="mk-file">latest</code> tag anywhere in this product, deliberately. Deployment takes an explicit reference, because a release is something somebody decided to make and version drift is the primary failure mode for an operator running alone.</p>' +
        C.stateBlock('partial', {
          headline: 'One check is a warning, and it does not block.',
          detail:
            'IMP-0239 is mid-review. Upgrading will not lose it; its stage artifacts rebuild from the stored parse the first time somebody opens it, which costs about four seconds. Told to you rather than discovered, because an unexplained delay after an upgrade is indistinguishable from a broken one.',
        }),
    ),
  )
);

const entitlementScreen = () => (
  head('About this instance', 'Version, entitlement, and the support bundle you would send — previewed before anything leaves.', {
    route: '/instance (the bundle itself is assembled by CLI)',
    toolbar: C.btn('Copy version block'),
  }) +
  cols(
    '<section>' +
      panel(
        'Versions',
        facts([
          ['Instance', `<strong class="mk-file">${esc(INSTANCE.version)}</strong> · released ${esc(INSTANCE.released)}`],
          ['Commit', `<code class="mk-file">${esc(INSTANCE.commit)}</code>`],
          ['Schema', '<span class="mk-file">2026081407_notification_awareness</span> · 118 migrations applied'],
          ['Analyte dictionary', '2026.2 · loaded 2026-05-02'],
          ['ANZG 2018 criteria', '2018.1 · loaded 2026-01-14 · reviewed by a licensed practitioner'],
          ['Licence criteria', 'Customer-authored · L8842/2019/1 Table 4 v2024.2'],
          ['Database', esc(INSTANCE.database)],
          ['Deployed', 'Customer tenancy · single-tenant · no shared control plane'],
        ]) +
          '<p class="mk-tight" style="margin-top:.7rem">This block is the first thing a support conversation needs and the last thing anybody wants to assemble by hand. One button copies it.</p>',
      ) +
      panel(
        'Entitlement',
        facts([
          ['Customer', esc(ENTITLEMENT.customer)],
          ['Term', esc(ENTITLEMENT.term)],
          ['Remaining', `<strong>${esc(ENTITLEMENT.remaining)}</strong>`],
          ['Seats', esc(ENTITLEMENT.seats)],
          ['Support', esc(ENTITLEMENT.support)],
        ]) +
          C.card({
            tone: 'new',
            head: '<span class="mk-queue__kind">What happens at expiry</span>',
            body: `<p class="mk-tight">${esc(ENTITLEMENT.atExpiry)}</p>`,
            foot: '<span class="mk-muted">Stated in the product rather than discovered at expiry. A system of record whose behaviour at the end of a contract is unknown is not one.</span>',
          }),
      ) +
      '</section>',
    panel(
      'Diagnostic bundle',
      `<p class="mk-tight"><strong>Generated by you, never by us.</strong> ${esc(BUNDLE.initiator)}</p>` +
        '<p class="mk-tight">Every line below is inspectable before the file exists. The preview is the feature: a support bundle a customer cannot read before sending is a request to take the vendor’s word for what is in it.</p>' +
        table({
          head: ['Contents', 'Size', 'Sensitivity', 'Include'],
          scroll: true, label: 'Diagnostic bundle contents',
          rows: BUNDLE.contents.map((c) => [
            esc(c.what),
            `<span class="mk-num${c.size === '—' ? ' mk-num--nil' : ''}">${esc(c.size)}</span>`,
            c.sensitive === 'none'
              ? '<span class="mk-muted">none</span>'
              : c.sensitive === 'customer data'
                ? C.status('customer data — excluded', 'bad')
                : C.status(c.sensitive, 'warn'),
            C.checkbox({
              srLabel: c.included
                ? `Include ${c.what} in the bundle`
                : `${c.what} — excluded, and not selectable`,
              checked: c.included,
              disabled: !c.included,
            }),
          ]),
        }) +
        C.blastRadius({
          lede: 'Generating this bundle would write one file, here, and send nothing:',
          rows: [
            { what: 'Bundle size', n: '3.6 MB' },
            { what: 'Files written outside this instance', n: '0' },
            { what: 'Network requests made', n: '0' },
            { what: 'Result values included', n: '0' },
            { what: 'Principal identities in log attribution lines', n: '~1,400' },
          ],
          action: 'Generate the bundle',
          reversible: 'The bundle is a file on this instance until you choose to send it. Delete it and nothing remains; nothing about generating it reaches Strataflow.',
        }),
    ),
    '3fr 2fr',
  )
);

/* ================================================================== *
 * J10 — the conventions the whole product keeps
 *
 * Three screens that are not screens: they are the cross-cutting
 * claims, drawn once so they can be checked once. Every one of them is
 * a promise made on every other screen in this catalogue, and a promise
 * repeated thirty-seven times is a promise nobody audits.
 * ================================================================== */

const dataStates = () => {
  const demo = (title, note, block) =>
    panel(title, `<p class="mk-tight">${note}</p>${block}`);
  return (
    head('Four states, everywhere', 'Empty, loading, partial and error — designed once, for every surface.', {
      route: '/help/states',
      toolbar: C.segmented({ options: ['Empty', 'Loading', 'Partial', 'Error'], value: 'Empty', label: 'State' }),
    }) +
    notice(
      'default',
      'Three rules the words have to keep, and they are the reason this is a screen rather than a component.',
      'No empty headline may read “No data”. An empty queue and an empty register are different sentences — <em>you are finished</em> against <em>nothing has arrived</em> — and a screen that confuses them tells a practitioner their work is done when it has not started. Every partial state must quantify what is absent, because “some data” is exactly when a number is needed most.',
    ) +
    '<h2 class="mk-h2">Empty — and the two kinds of empty</h2>' +
    cols(
      demo(
        'An empty queue — you are finished',
        'The reward state. It says what was checked and when, so it is a claim rather than an absence.',
        C.stateBlock('empty', {
          headline: 'Nothing needs you.',
          detail: 'Every exception is dispositioned and no obligation is inside its warning window. Last checked 2026-08-23 07:41 AWST.',
          action: 'Open the 2026 Q3 programme',
        }),
      ),
      demo(
        'An empty register — nothing has arrived',
        'The onboarding state, and the first thing a new customer sees. It teaches the first action.',
        C.stateBlock('empty', {
          headline: 'No results on this project yet.',
          detail:
            'Results arrive by importing a laboratory deliverable. Nine locations are registered and the 2026 Q3 round is planned, so everything is ready for the first file — drop it on the import screen and the format is named before anything is read.',
          action: 'Import a deliverable',
          secondary: 'See what a deliverable looks like',
        }),
      ),
      '1fr 1fr',
    ) +
    '<h2 class="mk-h2">Loading — and it must not shift when the data lands</h2>' +
    cols(
      demo(
        'The skeleton reserves the real grid',
        'Seven columns because the crosstab fills seven, at the row height it will use. A grid that jumps after four seconds reads as broken even when it is correct.',
        C.stateBlock('loading', {
          headline: 'Reading 2,841 results…',
          detail: 'Evaluating against 2 criteria sets. On a site link this takes about 9 seconds.',
          rows: 6,
        }),
      ),
      demo(
        'A long operation says how long',
        'Anything that can exceed about a second shows determinate progress. An indeterminate spinner cannot be told from a dead connection.',
        C.progress({
          pct: 68,
          label: 'Evaluating 2,841 results against 2 criteria sets',
          detail: '1,932 of 2,841 · about 4 seconds left · you can leave this page and it continues',
        }) +
          C.progress({
            pct: 23,
            label: 'PAS2026-04417_Wandalup_2026Q2.zip · 38 MB',
            detail: '8.7 MB of 38 MB · 41 KB/s · about 12 minutes left',
            resumable: true,
            tone: 'warn',
          }),
      ),
    ) +
    '<h2 class="mk-h2">Partial — quantify what is missing</h2>' +
    cols(
      demo(
        'Some of it is here',
        'The count is the whole point. “Some data” is not a state a practitioner can act on.',
        C.stateBlock('partial', {
          headline: '58 of 63 planned results are in. 3 are held and 2 were never collected.',
          detail:
            'MW11 was not sampled in the 2026 Q2 window, which closed 2026-05-14 in Australia/Perth. The crosstab below is complete for every other location, and the MW11 column is drawn empty rather than omitted — a missing column reads as a bore that does not exist.',
          action: 'Open the 3 held rows',
          secondary: 'Record why MW11 was missed',
        }),
      ),
      demo(
        'The statistics know they are partial',
        'A summary computed over an incomplete round is not wrong, but it is not the round either, and the difference belongs on the surface that shows it.',
        C.stateBlock('partial', {
          headline: 'This median is over 6 of 7 locations.',
          detail:
            'MW11 has no 2026 Q2 result. The estimator is Kaplan–Meier over 58 values of which 11 are censored; adding MW11 later will change it, and the figure carries the same note in its provenance strip so a copy pasted into Word does not lose the caveat.',
        }),
      ),
    ) +
    '<h2 class="mk-h2">Error — say what happened and what to do</h2>' +
    cols(
      demo(
        'A not-found is not “something went wrong”',
        'And it deliberately cannot be told apart from a refusal, because saying “this exists but you may not see it” is itself a disclosure.',
        C.stateBlock('error', {
          headline: 'There is no project at this address, or you do not have access to it.',
          detail:
            'Both read the same on purpose — telling you which one it is would confirm the existence of something you are not entitled to see. If you expected access, your administrator adds you to the project’s directory group.',
          action: 'Go to my projects',
          secondary: 'Copy the request for my administrator',
        }),
      ),
      demo(
        'A session that lapsed mid-form loses nothing',
        'This is the field officer on a phone whose session expired between filling the form and pressing the button. The old behaviour was a bare “Something went wrong / 401”.',
        C.stateBlock('error', {
          headline: 'Your session expired while this page was open.',
          detail:
            'The nine readings you typed are held on this device and have not been sent. Signing in again returns you to this form with every value still in it — nothing needs retyping and nothing was written twice.',
          action: 'Sign in and come back here',
          secondary: 'Save a copy to this device',
        }),
      ),
    ) +
    panel(
      'Two more states that are not on anybody’s list',
      cols(
        C.conflictBanner({
          who: 'D. Okafor',
          at: '2026-08-23 07:38 AWST',
          what: 'The validation state of this result moved from screened to validated.',
          mine: 'rejected',
          theirs: 'validated',
        }),
        C.stateBlock('error', {
          headline: 'The stats worker did not answer, so the trend is absent rather than wrong.',
          detail:
            'Mann–Kendall and Sen’s slope are computed by a separate service and it is unreachable. Everything on this page that does not depend on it is correct and current; the trend column is empty and labelled, not filled with a stale number from the last time it worked.',
          action: 'Retry',
          secondary: 'Check instance health',
        }),
        '1fr 1fr',
      ),
    )
  );
};

const assistance = () => (
  head('Keyboard and assistance', 'The contract for somebody who works here every day, and the help for somebody who does not.', {
    route: '/help/keyboard',
    toolbar: C.btn('Open the command palette', 'primary') + C.btn('Print this sheet'),
  }) +
  notice(
    'default',
    'A two-hundred-question review queue is a session, not an afternoon — and that is a keyboard claim.',
    'Every queue and grid a practitioner works daily is fully operable without a mouse. This is not an accessibility afterthought bolted to a mouse-first design; it is the difference between a tool somebody is fast in and a tool somebody endures.',
  ) +
  cols(
    '<section>' +
      SHORTCUTS.map((g) =>
        panel(
          g.group,
          table({
            head: ['Keys', 'What it does'],
            rows: g.keys.map((k) => [C.kbd(k.k), esc(k.what)]),
          }),
        ),
      ).join('') +
      '</section>',
    panel(
      'The palette, and why it is not a search box',
      '<p class="mk-tight">Search finds <em>things</em>. The palette runs <em>verbs</em>, and it is the fastest path to a screen a practitioner visits monthly and cannot remember the location of.</p>' +
        '<div class="mk-palette" data-open="true" style="position:static;transform:none;width:100%;margin-bottom:1rem">' +
        '<input class="mk-palette__input" value="rev" aria-label="Command">' +
        '<ul class="mk-palette__list">' +
        '<li class="mk-palette__group">Actions</li>' +
        '<li><button class="mk-palette__item" data-active="true"><span class="mk-palette__main">Reverse a committed import…</span><span class="mk-palette__ctx">IMP-0241</span></button></li>' +
        '<li><button class="mk-palette__item"><span class="mk-palette__main">Review outstanding questions</span><span class="mk-palette__ctx">3 on IMP-0239</span></button></li>' +
        '<li class="mk-palette__group">Go to</li>' +
        '<li><button class="mk-palette__item"><span class="mk-palette__main">Exception review</span><span class="mk-palette__ctx">g then e</span></button></li>' +
        '<li><button class="mk-palette__item"><span class="mk-palette__main">Reports</span><span class="mk-palette__ctx">g then r</span></button></li>' +
        '</ul>' +
        '<div class="mk-palette__foot"><span>↑↓ move</span><span>↵ run</span><span>esc close</span></div>' +
        '</div>' +
        '<p class="mk-tight">Destructive verbs appear in the palette and never execute from it — “Reverse a committed import…” opens the reversal screen with its blast radius, because a keystroke that withdraws 231 results is not a shortcut, it is a trap.</p>',
    ),
    '3fr 2fr',
  ) +
  '<h2 class="mk-h2" style="margin-top:1.2rem">Assistance that is not a help centre</h2>' +
  cols(
    panel(
      'A term, defined where it is used',
      `<p class="mk-tight">The vocabulary is bound to the glossary and a guard defends it, but a bound vocabulary a reader has not learned is still jargon. So ${C.term('LOR', 'Limit of reporting — the lowest concentration the laboratory will report as a number for this analyte and method. Distinct from the MDL, which is what the method can distinguish from noise, and the PQL, which is what it can quantify reliably.')} and ${C.term('indeterminate', 'The reporting limit sits above the criterion, so the result cannot be assessed against it. This is not a pass — nothing was measured either way.')} carry their definitions, and the dotted underline is quiet on purpose. Marking every domain noun would underline half a dense register and teach the reader to ignore all of them.</p>` +
        `<p class="mk-tight">And the product explains its own decisions in place. ${C.why('The importer applied this without asking because “Sulphate” is an exact synonym in the analyte dictionary — a spelling, not a judgement. It is recorded on each of the 7 results and reverses with the import.')} sits next to the thing it explains, rather than in a document somebody has to know exists.</p>`,
    ),
    panel(
      'Export is assistance too',
      '<p class="mk-tight">The commonest reason a practitioner leaves a product is to do one thing it will not do. Export is how they come back.</p>' +
        C.exportMenu({ open: true }) +
        '<p class="mk-tight" style="margin-top:12rem">Exactly what is on screen: this filter, these columns, this sort. Censored values keep their notation and numbers stay numbers — an export that writes <code class="mk-file">&lt;1.0</code> into a text column has handed back a spreadsheet that cannot be summed, and one that writes <code class="mk-file">1.0</code> has handed back a lie.</p>',
    ),
  )
);

/**
 * What the rail's dots currently say, counted from the register.
 *
 * The sentence this replaces was written on 23 August and read, in the present
 * tense, "most of what is drawn here is tested library code with no route, and
 * four screens are proposals" — on the one screen whose subject is honesty
 * about coverage, and eight days after the register said otherwise (W1-A-2).
 * A count that is typed is a count that rots, so this one is derived: `JOBS`
 * is in scope because screen bodies run at assembly, long after the module
 * has evaluated.
 */
function stateSentence() {
  const now = JOBS.flatMap((j) => j.screens).map((s) => s.now ?? s.state);
  const count = (state) => now.filter((v) => v === state).length;
  return (
    '<p class="mk-tight">The state dots in the rail are the other half of the honesty: as of the ' +
    `1 September derivation, ${count('shipped')} of ${now.length} screens are route-backed in the ` +
    `product, ${count('shipped (CLI)')} operate from the CLI, and ${count('proposed')} are proposals ` +
    'against no requirement at all — counted from the register as this page was assembled, with each ' +
    'dot’s 23 August state one hover away.</p>'
  );
}

/**
 * The coverage matrix.
 *
 * The request behind this rebuild was "every gap and every expectation is in
 * the mockup", and that is a claim which is worthless unless it can be
 * checked. So it is a screen: three enumerations, each one closed, each row
 * naming the screen that answers it. A reader who disagrees can point at a
 * row rather than at a feeling.
 *
 * **The enumerations are what make it falsifiable, and they are also its
 * limit.** This is exhaustive relative to three fixed lists — the fourteen
 * global expectations, the register's own sections, and the twenty-seven
 * findings of the August audit. Anything outside them is out of frame by
 * construction, and when the register or the schema grows this table has a
 * hole until it is re-run. That is the maintenance rule, and it is the same
 * rule the register states about itself.
 */
const coverage = () => {
  const GLOBAL = [
    ['G-EXP-1', 'Vocabulary matches the glossary verbatim', 'Every screen', 'No screen introduces a term the glossary lacks. Where one is needed and missing — “Reports” — the gap is declared rather than minted in passing.'],
    ['G-EXP-2', 'Working screens are grid-dense', 'crosstab · locations · exceedances', 'Row height and cell padding come from the product’s own tokens. Consumer-app spacing reads as a toy to a practitioner who has used EQuIS.'],
    ['G-EXP-3', 'Any value opens its lineage in place', 'result-detail · crosstab · lineage', 'A slide-over rather than a route, because the question is asked while comparing a number to its neighbours and an answer that costs the comparison is worth less.'],
    ['G-EXP-4', 'Censored values render as censored everywhere', 'result-detail · crosstab · hydrochem · statistics · report', 'The laboratory’s own notation, kept verbatim. Never zero, never the bare limit, never a substituted half-limit — on the grid, in the figure, in the tooltip and in the export.'],
    ['G-EXP-5', 'Reversibility is stated before the click', 'quarantine · facility · project-settings · mapping-profiles · import-commit', 'Every consequential control carries a blast radius or a reversibility line. Where an action is genuinely irreversible the control says that instead.'],
    ['G-EXP-6', 'Ambiguity becomes a visible decision', 'import-review · quarantine', 'No silent defaults. The format is chosen and never defaulted; an unmappable validation state holds rows rather than guessing one.'],
    ['G-EXP-7', 'Four states designed for every surface', 'data-states, and in situ throughout', 'Empty, loading, partial, error. Two kinds of empty, because a finished queue and an unstarted register are different sentences.'],
    ['G-EXP-8', 'Every encoding survives greyscale', 'Every screen · data-states', 'Marks are shapes; statuses carry a glyph; the confidence bar carries its number. Colour is the redundant channel and never the carrying one.'],
    ['G-EXP-9', 'Queues are fully keyboard-operable', 'assistance · import-review · crosstab · field-capture', 'The contract is written down rather than discovered. A two-hundred-question queue is a session, not an afternoon.'],
    ['G-EXP-10', 'Timezone and unit honesty', 'project-settings · units · events · programme', 'Timestamps carry their zone; values carry their unit; display conversion is marked and never mutates what is stored.'],
    ['G-EXP-11', 'An audit tab on every entity detail', 'location · result-detail · licence · events · facility · project-settings', 'A convention, not a destination. There is no global log viewer, because “who changed this” is asked about a thing.'],
    ['G-EXP-12', 'Stale writes surface as conflicts', 'data-states · result-detail', 'Refused and shown, naming who and what. Never merged, never silently overwritten.'],
    ['G-EXP-13', 'Anything over a second shows determinate progress', 'data-states · documents · imports', 'With bytes and a time. An indeterminate spinner cannot be told from a dead connection on a site link.'],
    ['G-EXP-14', 'Any grid exports exactly as filtered', 'Every register', 'This filter, these columns, this sort — with censoring and types intact.'],
  ];

  const SURFACES = [
    ['§1.1', 'Work queue', 'home', 'new'],
    ['§1.2', 'Global search', 'search', 'new'],
    ['§2.1', 'Project list and switcher', 'projects', 'new'],
    ['§2.2', 'Project home', 'project-home', 'new'],
    ['§2.3', 'Project settings and membership', 'project-settings', 'new'],
    ['§3.1', 'Facility and area management', 'facility', 'new'],
    ['§3.2', 'Location registry', 'locations', 'new'],
    ['§3.3', 'Location detail', 'location', 'had'],
    ['§4.1', 'Sampling event list and detail', 'events', 'new'],
    ['§4.2', 'Field and water-level entry', 'field-capture', 'had'],
    ['§5.1', 'Import intake', 'imports', 'had'],
    ['§5.2', 'Exception review', 'import-review', 'had'],
    ['§5.3', 'Batch detail and quarantine', 'quarantine', 'new'],
    ['§5.4', 'Mapping profiles and lab formats', 'mapping-profiles', 'new'],
    ['§6.1', 'Crosstab', 'crosstab', 'had'],
    ['§6.2', 'Result detail and annotation', 'result-detail', 'new'],
    ['§6.3', 'Analyte dictionary browser', 'dictionary', 'had'],
    ['§7', 'QC review', 'qc', 'had'],
    ['§8.1', 'Criteria library', 'criteria', 'had'],
    ['§8.2', 'Exceedance review', 'exceedances', 'had'],
    ['§9.1', 'Figure workbench', 'hydrograph', 'had'],
    ['§9.2', 'Map', 'map', 'had'],
    ['§10.1', 'Report composer', 'report', 'had'],
    ['§10.2', 'Sign-off', 'signoff', 'had'],
    ['§10.3', 'Submission archive', 'submissions', 'new'],
    ['§11.1', 'Obligations dashboard', 'obligations', 'had'],
    ['§11.2', 'Licence and condition detail', 'licence', 'new'],
    ['§11.3', 'TARP and instrumentation board', 'tarp', 'had'],
    ['§12', 'Programs and scheduling', 'programme', 'had'],
    ['§13.1', 'Users, roles, provisioning', 'roles', 'had'],
    ['§13.2', 'Units and reference data', 'units', 'new'],
    ['§13.3', 'Instance administration', 'entitlement', 'new'],
    ['§13.3', 'Upgrade state and rollback', 'upgrade', 'new'],
    ['§14', 'Documents and attachments', 'documents', 'new'],
  ];

  const FINDINGS = [
    ['F-01', 'Blocker', 'Double-commit writes every row twice', 'import-commit', 'The commit control is gone after it succeeds, replaced by a receipt naming what was written and the way back.'],
    ['F-02', 'Blocker', 'Wrong-format parse is silent; the default is wrong', 'imports', 'The format is chosen against a placeholder, and the rows read are stated before anything else happens.'],
    ['F-03', 'Blocker', 'A non-detect renders as a plain value', 'result-detail · crosstab', 'The laboratory’s notation, kept verbatim, on every surface that shows the value.'],
    ['F-04', 'Major', 'No commit confirmation; the page then states a falsehood', 'import-commit', 'A receipt with counts, a link to the results, and the reversal path.'],
    ['F-05', 'Major', 'A duplicate upload is silent', 'imports', 'A banner that distinguishes “nothing was written because this is the same file” from “nothing was written because it failed”.'],
    ['F-06', 'Major', 'Held rows are invisible after commit', 'quarantine', 'A screen of its own, with the reason and the way out on every row, counted on the run, the project home and the work queue.'],
    ['F-07', 'Major', 'The results register omits the analyte', 'crosstab · locations', 'Analyte, unit, limits, qualifiers and validation state, with filters and paging.'],
    ['F-08', 'Major', 'Home is a dead end with no project list', 'home · projects', 'The work queue is the landing surface; the project list is a real register with the role on every row.'],
    ['F-09', 'Major', 'The project is never named', 'Every screen', 'Code and name in the switcher, in the breadcrumb and on the project home.'],
    ['F-10', 'Major', 'The review layout breaks at desktop width', 'import-review', 'The question grid wraps; the primary action stays on screen at 1280.'],
    ['F-11', 'Major', 'No reversal path exists', 'import-commit', 'Reversal is a control with a blast radius, reachable from the run and from the palette.'],
    ['F-12', 'Major', 'Session expiry on a POST loses work', 'data-states', 'The typed values are held on the device and restored after signing in.'],
    ['F-13', 'Major', 'Placeholder empty-states over real data', 'data-states', 'A placeholder is verbally and visually distinct from an empty register, and neither reads “No data”.'],
    ['F-14', 'Major', 'Review options offer no escape hatch', 'import-review · quarantine', 'Every suggestion list ends with a way to say nothing here fits, and to hold the rows.'],
    ['F-15', 'Minor', 'Internal goal IDs on customer surfaces', 'Every screen', 'No goal number reaches a screen. The state dots in the rail are the viewer’s, not the product’s.'],
    ['F-16', 'Minor', 'Question row-counts read zero while blocking commit', 'import-review', 'Rows-at-stake on every question, and the readiness notice sums the same number.'],
    ['F-17', 'Minor', 'Pluralisation', 'Every screen', '“1 question, holding 1 row.”'],
    ['F-18', 'Minor', 'Raw UTC ISO timestamps', 'Every screen', 'Site time with its zone named, to the minute. The UTC instant is available where a boundary is being argued about.'],
    ['F-19', 'Minor', 'Every page but home has an empty title', 'n/a — viewer', 'Out of frame here; the mockup is one document. Recorded so the row is not mistaken for covered.'],
    ['F-20', 'Minor', 'Error pages are dead ends with the wrong words', 'data-states', 'A not-found says what it is, cannot be told from a refusal on purpose, and offers a way on.'],
    ['F-21', 'Minor', 'Multi-file deliverables named by their first file', 'imports', 'The deliverable is named as one thing, with its files listed under it.'],
    ['F-22', 'Minor', 'Dead ends between the three URL spaces', 'Every screen', 'The top bar carries home, the project switcher, across-projects and the principal menu.'],
    ['F-23', 'Minor', 'Section nav misses the touch-target minimum', 'Every screen', '44 px under a coarse pointer, on the nav as well as the form controls.'],
    ['F-24', 'Minor', 'Sign-out gives no feedback', 'n/a — viewer', 'There is no session in this document. Recorded rather than quietly dropped.'],
    ['F-25', 'Minor', 'The results register offers no filters or paging', 'crosstab · locations', 'A filter bar with saveable views, a result count, and paging that says what it is paging through.'],
    ['F-26', 'Polish', 'Dev-mode hydration mismatch', 'n/a — not a surface', 'A development-server defect with no design content.'],
    ['F-27', 'Polish', 'Commit is not visually distinguished as consequential', 'import-commit', 'A blast radius stating what will be written, before the control that writes it.'],
  ];

  /**
   * A fourth enumeration, added by the second review pass.
   *
   * The first three lists were the register, the audit and the global
   * expectations — all of them documents this repository already held. This
   * one is different in kind: it came from reading the screens as a
   * practitioner rather than as an author, and nothing generated it. That
   * makes it the least trustworthy list here and the most valuable, because
   * every row is something no document had thought to ask for.
   */
  const DOMAIN = [
    ['Defensibility', 'Field parameter stabilisation and purge records', 'purge', 'Three consecutive readings in tolerance, with the bore that never stabilised recorded as a stated judgement rather than an invisible one.'],
    ['Defensibility', 'Sample receipt condition and chain of custody', 'receipt', 'Cooler temperature, seals, preservation and a cracked container — and custody as a chain of transfers rather than a scanned form.'],
    ['QA/QC', 'The full QC sample taxonomy', 'qc', 'Laboratory duplicate, method blank, LCS, matrix spike and duplicate, rinsate blank — added to the field and trip blanks already there.'],
    ['QA/QC', 'The laboratory batch a QC result covers', 'batches', 'A control sample applies to a batch. Without it, a failed spike qualifies everything or nothing.'],
    ['QA/QC', 'Acceptance limits as versioned configuration', 'qc-limits', 'With a source, an effective date, and the applicability rule that was wrong — RPD only above 5 × the reporting limit.'],
    ['QA/QC', 'Data quality assessment against objectives', 'dqa', 'Precision, accuracy, representativeness, comparability, completeness, sensitivity — written before the round, not assembled after it.'],
    ['Evaluation', 'How a hardness-dependent criterion was calculated', 'hardness', 'The input, its cross-check, the equation, the cap and the three exceedances that rest on it.'],
    ['Evaluation', 'A register of what could not be assessed', 'indeterminate', 'The state neither incumbent has, as a finding with a cost to close rather than a footnote.'],
    ['Evaluation', 'Background and site-specific trigger derivation', 'background', 'The comparison a mine actually makes, and where a site-specific value comes from when no default exists.'],
    ['Evaluation', 'Seasonal Mann–Kendall, and censored values in the trend', 'statistics', 'Both tests reported on a seasonal series, and how the non-detects entered the rank test.'],
    ['Hydrogeology', 'Potentiometric surface and flow direction', 'map', 'A planar fit that derives “downgradient” instead of storing it as a string, with the confined bore excluded.'],
    ['Hydrogeology', 'The bore nest, read vertically', 'location', 'An upward gradient from the confined unit is a containment argument, and it is invisible in a register of points.'],
    ['Statutory', 'The Contaminated Sites Act duty', 'notification', 'A second clock on the same moment of awareness, to a different branch of the regulator. Discharging one discharges neither.'],
    ['Statutory', 'Annual Audit Compliance Report', 'obligations', 'A DWER annual return distinct from the AER, which the board did not carry.'],
    ['Statutory', 'Subterranean fauna monitoring', 'stygofauna', 'A WA approval condition assessed on population persistence, and the screen refuses to draw a trend through four points.'],
    ['Content', 'PFAS assessed against the operative framework', 'criteria', 'The NEMP carries a value per receptor; ANZG alone is insufficient once a potable or recreational receptor is downgradient.'],
    ['Workflow', 'The round on two programmes at once', 'programme', 'A TARP-escalated monthly programme alongside the quarterly one — the escalated round is the one that gets missed.'],
    ['Workflow', 'Assignment and hand-over', 'home', 'A thread that hangs off the exceedance rather than off a chat channel, so it is still attached in two years.'],
    ['Layout', 'The results grid across rounds', 'crosstab', 'The comparison a review is, and the only layout that shows a reporting limit stepping mid-series.'],
  ];

  /**
   * The fourth pass adds three more enumerations — 1 September 2026, under
   * EXPANSION_BRIEF.md Phase 2. Same rule as the tables above: each list is
   * closed, each row names its owner, and a row that cannot honestly be
   * claimed is marked rather than counted. Statuses here speak about what is
   * DRAWN in this catalogue; the rail dots carry built-ness, re-derived the
   * same day. Re-run each list against its source rather than reading this.
   */
  const PRD = [
    // [id, requirement, status, owners, priority, note]
    ['FR-1.1', 'Facility → area → location hierarchy with typed classes', 'covered', 'facility · locations', 'P0', ''],
    ['FR-1.2', 'Coordinates with explicit CRS and ANZ↔global transformation', 'partially', 'location · project-settings', 'P2', 'The conversion-with-provenance surface is not drawn'],
    ['FR-1.3', 'Elevation and datum with survey epochs, converted by measurement date', 'covered', 'location · hydrograph', 'P0', ''],
    ['FR-1.4', 'Bore construction detail sufficient to reproduce a construction log', 'covered', 'location', 'P1', ''],
    ['FR-1.5', 'Screened intervals to hydrostratigraphic units; nested clusters', 'covered', 'location', 'P1', ''],
    ['FR-1.6', 'Event → sample → test → result, QC types linked to parents', 'covered', 'events · receipt · qc', 'P0', ''],
    ['FR-1.7', 'Depth intervals and composites with increment traceability', 'deferred', '—', 'P3', 'Soil, sediment and vapour matrices are S8; nothing drawn'],
    ['FR-1.8', 'Analyte dictionary: CAS, synonyms, speciation, congener families', 'covered', 'dictionary', 'P1', ''],
    ['FR-1.9', 'LOR, MDL and PQL distinct; detect status first-class', 'covered', 'result-detail · crosstab', 'P0', ''],
    ['FR-1.10', 'Logger and telemetry series, raw and corrected (S8)', 'deferred', '—', 'P4', 'Domain K, deferred with the telemetry journey'],
    ['FR-1.11', 'Versioned criteria library with effective dates and applicability', 'covered', 'criteria', 'P0', ''],
    ['FR-1.12', 'Licences, conditions, obligations, TARP, water entitlements', 'partially', 'licence · obligations · tarp', 'P1', 'Entitlements have a product route (/water) and no drawn screen'],
    ['FR-2.1', 'Derivation engine with rules as configurable, versioned artefacts', 'covered', 'hardness · result-detail', 'P0', ''],
    ['FR-2.2', 'Non-detect propagation bound to the criteria set, not global', 'partially', 'criteria', 'P1', 'The binding is stated on the drawing, not operable in it'],
    ['FR-2.3', 'Derived values first-class, with rule, inputs and censoring in lineage', 'covered', 'result-detail · lineage', 'P0', ''],
    ['FR-2.4', 'Never overwrite a reported value; derivation additive, reversible', 'covered', 'supersession · result-detail', 'P0', ''],
    ['FR-2.5', 'Speciation conversion with the basis recorded on the result', 'partially', 'result-detail', 'P2', 'The basis is shown; the conversion surface is not'],
    ['FR-3.1', 'Laboratory EDD formats as configuration, not code', 'covered', 'formats', 'P1', ''],
    ['FR-3.2', 'Per-laboratory mapping profiles that persist decisions', 'covered', 'mapping-profiles', 'P0', ''],
    ['FR-3.3', 'Fuzzy matching with confidence, routed to a review queue', 'covered', 'import-review', 'P0', ''],
    ['FR-3.4', 'Parse → map → validate → review → commit, each stage inspectable', 'covered', 'imports · import-review · import-commit', 'P0', ''],
    ['FR-3.5', 'Partial accept: commit valid rows, quarantine the remainder', 'covered', 'quarantine', 'P0', ''],
    ['FR-3.6', 'Import batch first-class; source file retained; full reversal', 'covered', 'import-commit', 'P0', ''],
    ['FR-3.7', 'Idempotent on re-import of the same file', 'covered', 'imports', 'P0', 'The duplicate banner is the visible surface of a behaviour'],
    ['FR-3.8', 'Original certificate retained and linked to every result', 'covered', 'certificate · documents', 'P0', ''],
    ['FR-3.9', 'Amended certificates supersede, cascading without orphaning', 'covered', 'certificate · supersession', 'P0', ''],
    ['FR-3.10', 'Logger and telemetry import with barometric compensation (S8)', 'deferred', '—', 'P4', ''],
    ['FR-3.11', 'Import from ESdat, HGA+ and EQuIS with a reconciliation proof', 'covered', 'migration', 'P1', ''],
    ['FR-4.1', 'Holding times by matrix and method', 'covered', 'qc', 'P0', ''],
    ['FR-4.2', 'A reporting limit above the criterion is flagged', 'covered', 'indeterminate · crosstab', 'P0', 'Claim B5 — the register the incumbents lack'],
    ['FR-4.3', 'Duplicate RPD, blanks and recoveries against configurable limits', 'covered', 'qc · qc-limits', 'P0', ''],
    ['FR-4.4', 'Internal consistency: total/dissolved, ionic balance, TDS, EC', 'covered', 'consistency', 'P0', ''],
    ['FR-4.5', 'Spikes and outliers against the location’s own history', 'covered', 'qc', 'P2', 'Raised as a finding with its working — median, MAD and the score, over the bore’s own record'],
    ['FR-4.6', 'Validation state machine with attribution, including bulk', 'covered', 'validation', 'P0', ''],
    ['FR-4.7', 'Data lock for periods reported to a regulator', 'covered', 'qualifiers', 'P1', ''],
    ['FR-4.8', 'Manual qualifiers from a controlled reason-code list', 'covered', 'qualifiers', 'P0', ''],
    ['FR-5.1', 'All applicable criteria concurrently, an outcome per criterion', 'covered', 'crosstab · exceedances', 'P0', ''],
    ['FR-5.2', 'Consecutive-exceedance and rolling-window conditions', 'covered', 'exceedances', 'P1', 'Licence condition 12(c) evaluated over four rounds, four series, three distinct outcomes'],
    ['FR-5.3', 'TARP state with escalation, acknowledgement and response', 'covered', 'tarp · alerts', 'P0', ''],
    ['FR-5.4', 'Automatic re-evaluation on data change, reflected in lineage', 'covered', 'certificate · supersession', 'P0', ''],
    ['FR-5.5', 'Mass load from volume and concentration, by reporting period', 'missing', '—', 'P2', 'Belongs with the undrawn water screen'],
    ['FR-5.6', 'Extraction against entitlement with approaching-limit flags', 'missing', '—', 'P1', 'The product ships /water; this catalogue never drew it'],
    ['FR-5.7', 'Water level to groundwater elevation via the datum in force', 'covered', 'hydrograph', 'P0', ''],
    ['FR-5.8', 'Censored statistics: Kaplan-Meier and robust ROS, never silent half-LOR', 'covered', 'statistics', 'P0', 'Claim B2'],
    ['FR-5.9', 'Mann-Kendall, seasonal Kendall, Sen’s slope, sample-size warnings', 'covered', 'statistics', 'P0', ''],
    ['FR-6.1', 'Hydrographs with rainfall, criteria lines, multi-location comparison', 'covered', 'hydrograph', 'P0', ''],
    ['FR-6.2', 'Censored values rendered censored — never zero, never dropped', 'covered', 'hydrograph · statistics', 'P0', ''],
    ['FR-6.3', 'Crosstab tables with per-criterion exceedance shading', 'covered', 'crosstab', 'P0', ''],
    ['FR-6.4', 'Map symbology by exceedance and TARP state, with print layout', 'partially', 'map', 'P1', 'The print layout is not drawn'],
    ['FR-6.5', 'Piper, Stiff, Durov and Schoeller with censored handling', 'partially', 'hydrochem', 'P1', 'Durov sits outside the twelve approved plates — a grammar proposal, Jerry’s call'],
    ['FR-6.6', 'Vector export at print fidelity; chart configuration persists', 'partially', 'report-figures · saved-views', 'P1', 'Persisted configuration rides on a proposed screen'],
    ['FR-6.7', 'Spatial export as shapefile and GeoJSON', 'partially', 'map', 'P2', 'Named in the export menu; the export decision surface is not drawn'],
    ['FR-7.1', 'Reports from templates to Word, Excel and PDF; Word primary', 'covered', 'report', 'P0', ''],
    ['FR-7.2', 'Styling, figure and table numbering, cross-references, captions', 'partially', 'report-figures', 'P1', 'Corporate template configuration is not drawn'],
    ['FR-7.3', 'A data snapshot with every issued report; identical regeneration', 'covered', 'snapshot', 'P0', ''],
    ['FR-7.4', 'Customer-branded output; Strataflow attribution metadata only', 'covered', 'report', 'P1', 'A property of the output, stated on the composer'],
    ['FR-7.5', 'Prescriptive regulatory reports, versioned, golden-tested', 'partially', 'report', 'P1', 'The OP 5.12 sections are drawn; the golden-output comparison surface is not'],
    ['FR-7.6', 'Regulator-format and EQuIS-compatible EDD export (S8)', 'deferred', '—', 'P4', ''],
    ['FR-8.1', 'Sampling programs with due and overdue tracking', 'covered', 'programme · obligations', 'P0', ''],
    ['FR-8.2', 'Exceedance and trigger alerts with acknowledgement and escalation', 'covered', 'alerts', 'P0', ''],
    ['FR-8.3', 'Approval and sign-off distinct from data validation', 'covered', 'signoff', 'P0', ''],
    ['FR-8.4', 'Statutory notification: became-aware, countdown, evidence, record', 'covered', 'notification', 'P0', ''],
    ['QB-1', 'A figure is placed into a regulatory submission unedited', 'no screen', '—', 'P0', 'Gated by the §7.4 print test, not by a drawing (G-76b)'],
    ['QB-2', 'A full monthly report without opening Excel', 'covered', 'report', 'P0', ''],
    ['QB-3', 'The regenerated figure is identical but for the new data', 'covered', 'snapshot', 'P0', ''],
    ['QB-4', 'Vector output survives the customer’s Word template', 'no screen', '—', 'P0', 'The same gate as QB-1'],
    ['QB-5', 'Zero exits to another tool across the core loop', 'covered', 'imports · import-review · import-commit · qc · exceedances · report', 'P0', 'Walked as Journey 1 below'],
    ['QB-6', 'Zero hand-edits of a source laboratory file', 'covered', 'import-review', 'P0', ''],
    ['QB-7', 'Destructive actions reversible, and visibly so before acting', 'covered', 'data-states', 'P0', 'Stated on every consequential control (G-EXP-5)'],
    ['QB-8', 'A first import with no training, coming from ESdat or EQuIS', 'no screen', '—', 'P0', 'An observed practitioner session, still outstanding (ia-rationale §5)'],
    ['QB-9', 'Practitioner terminology exactly; LOR/MDL/PQL never collapsed', 'covered', 'result-detail · dictionary', 'P0', ''],
    ['QB-10', 'Ambiguity is a decision the user makes, never a silent default', 'covered', 'import-review · quarantine', 'P0', ''],
    ['OM-1', 'Customer-initiated diagnostic bundle', 'covered', 'diagnostics', 'P2', 'Preview-before-export is the trust feature'],
    ['OM-2', 'Version visibility across the deployment estate', 'partially', 'instance', 'P3', 'One instance shows itself; the estate view is the vendor’s, out of frame here'],
    ['OM-3', 'Upgrade coordination: scheduling, approval, pre-flight, rollback', 'covered', 'upgrade', 'P2', ''],
    ['OM-4', 'Entitlement and contract enforcement with defined expiry behaviour', 'covered', 'entitlement', 'P2', ''],
    ['OM-5', 'Configuration portability, versioned independently of the app', 'partially', 'formats · criteria', 'P2', 'Versions are shown; the package import/export surface is not drawn'],
    ['DR-1', 'All customer data in the customer’s own tenancy; no egress', 'no screen', '—', 'P0', 'Architecture; stated on the instance screen'],
    ['DR-2', 'No vendor telemetry; diagnostics are customer-initiated', 'covered', 'diagnostics', 'P0', ''],
    ['DR-3', 'No integration routes customer data through vendor infrastructure', 'no screen', '—', 'P1', 'A standing constraint on Domain R, recorded before anything is drawn there'],
  ];

  const BASELINE = [
    // [source, capability, tier, response, owners, note]
    ['ESdat §2.1', 'Meta Standards combine standards into one before evaluation', '✅', 'exceed', 'crosstab · exceedances', 'Concurrent outcomes with a mark per criterion; attribution never lost to a merge'],
    ['ESdat §2.1', 'Conditional action levels on pH, hardness, depth and matrix', '✅', 'match', 'criteria · hardness', 'Parity on capability; showing the working is the difference'],
    ['ESdat §2.2', 'Four distinct detection limits carried and exportable', '✅', 'match', 'result-detail', 'QB-9 is an internal bar, not a claim against the market'],
    ['ESdat §2.3', 'A reporting limit above the criterion renders as a pass by default', '◐', 'exceed', 'indeterminate · crosstab', 'Claim B5 — a distinct state on every surface, never a setting'],
    ['ESdat §2.4', 'LabSync: laboratories deliver with no user involvement', '✅', 'reject', 'imports', 'G-79 chose file-first deliberately; the concession is permanent'],
    ['ESdat §2.4', 'Import errors are file-level; content problems go back to the laboratory', '✅', 'exceed', 'quarantine · import-review', 'PP5: commit the good rows, hold the rest with the way out on each'],
    ['ESdat §2.5 · EQuIS §3.3', 'Censored statistics answered by export to ProUCL', '✅', 'exceed', 'statistics', 'Claim B2: Kaplan-Meier and robust ROS in-tool, the same estimator everywhere'],
    ['ESdat §2.6', 'Charts export PNG and PDF; no vector format mentioned', '◐', 'exceed', 'report-figures', 'Narrowed by EQuIS §3.2; the drawn claim inherits the unprinted-grammar caveat'],
    ['ESdat §2.6', 'Piper, Durov and Schoeller free as a public web app', '✅', 'match', 'hydrochem', 'A table stake (§7.2); Durov needs a grammar proposal first'],
    ['ESdat §2.6', 'Report-ready bore logs, free', '✅', 'match', 'location', ''],
    ['ESdat §2.6', 'Power BI, ArcGIS, MapInfo and QGIS export', '✅', 'defer', 'map', 'Domain R, P3; display and spatial export only (NG4)'],
    ['ESdat §2.8', 'Web interface usable with no training', '✅', 'match', '—', 'QB-8’s observed session is the test, and it is outstanding'],
    ['EQuIS §3.1', 'Concurrent evaluation against all applicable action levels', '✅', 'match', 'crosstab · exceedances', 'Capability parity; presentation is the open half, and may not be laundered into a beat'],
    ['EQuIS §3.2', 'SVG vector output, placed into Word via template files', '✅', 'match', 'report-figures', 'B3 narrowed: the vector axis is closed; unedited placement is untested for all four'],
    ['EQuIS §3.3', 'Any report scheduled or triggered on data load, emailed', '✅', 'match', 'alerts', ''],
    ['EQuIS §3.3', 'Esri ArcGIS embedded', '✅', 'concede', 'map', 'NG4; display and export only'],
    ['EQuIS §7.3', 'Dashboards composed from widgets, by a specialist', '✅', 'reject', 'project-settings', 'Countered on a different axis: self-service without the desktop client (G8)'],
    ['HGA+ §4', 'Twenty-plus geochemical and statistical plots', '✅', 'simplify', 'hydrochem · statistics', 'The twelve approved plates, extended only through the grammar fence'],
    ['HGA+ §4', 'Mann-Kendall, seasonal Mann-Kendall, Sen’s slope, Spearman', '✅', 'match', 'statistics', ''],
    ['HGA+ §4', 'Non-detects extracted or excluded — filtering, not estimation', '◐', 'exceed', 'statistics', 'Claim B2, from the other side'],
    ['HGA+ §4', 'Exceedance reports for multiple water-quality standards', '◐', 'match', 'exceedances', 'The same phrase meant merge-into-one at ESdat; unresolved there, unverified here'],
    ['EnviroSys §5', 'Missing-data notification as a headline feature', '◐', 'match', 'programme · obligations', 'Programme completeness with never-collected called out by name'],
    ['EnviroSys §5', 'Breadth across air, noise, waste, flora and fauna', '◐', 'defer', '—', 'Wider than the slice; S8 widening, not a screen gap'],
    ['EnviroSys §5', 'Criteria, exceedance semantics and figures — undocumented', '⚠️', 'unverified', '—', 'Recorded as silence; no requirement derived from it'],
  ];

  const JOURNEYS_WALK = [
    // [n, name, status, [ [step, screenId|null], … ], note]
    ['1', 'Laboratory EDD → approved data', 'covered',
      [['Programme', 'programme'], ['Round', 'events'], ['Sampling event', 'events'], ['eCOC', 'ecoc'], ['Certificate', 'certificate'], ['Import batch', 'imports'], ['Parse', 'imports'], ['Map', 'import-review'], ['Validate', 'import-review'], ['Exceptions', 'quarantine'], ['Partial accept', 'import-commit'], ['QA/QC', 'qc'], ['DQA', 'dqa'], ['Approval', 'validation'], ['Results', 'crosstab']],
      'Closed by the chain-of-custody screen — creation, seals and transfer, where receipt covered only the laboratory end'],
    ['2', 'Result → exceedance response', 'partially',
      [['Result', 'result-detail'], ['Applicable criteria', 'criteria'], ['Derivation', 'hardness'], ['Exceedance', 'exceedances'], ['Evaluation', 'exceedances'], ['TARP / obligation', 'tarp'], ['Acknowledge', 'alerts'], ['Assign', 'home'], ['Evidence', 'documents'], ['Approve', 'signoff'], ['Close', 'tarp']],
      'Assignment rides on the work queue, kept as a proposal by decision (1 Sep 2026 — findings §7)'],
    ['3', 'Result → issued report', 'covered',
      [['Result', 'crosstab'], ['Validation', 'validation'], ['Evaluation', 'exceedances'], ['Figure / table', 'report-figures'], ['Snapshot', 'snapshot'], ['Assembly', 'report'], ['Quality review', 'report'], ['Approval', 'signoff'], ['Issue', 'submissions'], ['Archive', 'submissions'], ['Regenerate', 'snapshot']],
      ''],
    ['4', 'Certificate amendment', 'covered',
      [['Original', 'certificate'], ['Amendment', 'certificate'], ['Supersession comparison', 'supersession'], ['Impacted results', 'supersession'], ['Recalculated derivations', 'hardness'], ['Changed exceedances', 'exceedances'], ['Changed trigger states', 'tarp'], ['Affected reports', 'snapshot'], ['Decision', 'certificate']],
      ''],
    ['5', 'Programme → completed field work', 'partially',
      [['Programme', 'programme'], ['Recurrence', 'programme'], ['Round', 'events'], ['Locations / suites', 'events'], ['Assignment', 'home'], ['Field work', 'field-capture'], ['Samples / QC', 'field-capture'], ['eCOC', 'ecoc'], ['Custody transfer', 'ecoc'], ['Laboratory receipt', 'receipt'], ['Completion', 'programme']],
      'Two holes left, both proposals rather than gaps: field capture, and assignment on the work queue (findings §7)'],
    ['6', 'Statutory notification', 'covered',
      [['Licence condition', 'licence'], ['Triggering result', 'result-detail'], ['Became aware', 'notification'], ['Deadline', 'notification'], ['Evidence review', 'documents'], ['Approval', 'signoff'], ['Submission', 'notification'], ['Proof', 'documents'], ['Closure', 'notification'], ['Audit', 'audit']],
      ''],
    ['7', 'Groundwater interpretation', 'partially',
      [['Bore nest', 'location'], ['Water levels', 'hydrograph'], ['Datum conversion', 'hydrograph'], ['Elevation', 'hydrograph'], ['Hydrograph', 'hydrograph'], ['Potentiometric surface', 'map'], ['Reliability', 'map'], ['Interpretation', 'narrative'], ['Saved figure', 'saved-views'], ['Report', 'report-figures']],
      'Two steps rest on proposed screens'],
    ['8', 'Configuration → operational effect', 'partially',
      [['Criteria / QA rule', 'criteria'], ['Version', 'criteria'], ['Test against records', 'criteria'], ['Impact preview', 'criteria'], ['Approval', 'signoff'], ['Activation', 'criteria'], ['Affected results', 'exceedances'], ['Re-evaluation', 'exceedances'], ['Audit', 'audit'], ['Rollback', 'criteria']],
      'Test-against-real-records is asserted on the criteria screen, not drawn as an interaction'],
    ['9', 'Portfolio → evidence', 'partially',
      [['Portfolio', 'obligations'], ['Project issue', 'project-home'], ['Location / obligation', 'location'], ['Triggering data', 'result-detail'], ['Response', 'tarp'], ['Report / notification', 'notification'], ['Evidence', 'documents'], ['Audit trail', 'audit']],
      'A one-site seed cannot draw a portfolio honestly; the second MOCK- project is the prerequisite'],
  ];

  const STATUS_TONE = { covered: 'good', partially: 'warn', missing: 'bad', deferred: 'neutral', 'no screen': 'neutral', unverified: 'neutral' };
  const prdCovered = PRD.filter((r) => r[2] === 'covered').length;
  const journeysOwned = JOURNEYS_WALK.filter((j) => j[2] === 'covered').length;
  const owners = (list) =>
    list === '—'
      ? '<span class="mk-muted">—</span>'
      : list.split(' · ').map((w) => `<a class="mk-ref" href="#${w}">${esc(w)}</a>`).join(' · ');

  const covered = SURFACES.length;
  const added = SURFACES.filter((s) => s[3] === 'new').length;
  const answered = FINDINGS.filter((f) => !f[3].startsWith('n/a')).length;

  return (
    head('Coverage', 'The six enumerations this catalogue is exhaustive against, and the screen that answers each row.', {
      route: 'The viewer’s own audit — not a product screen',
      toolbar: C.exportMenu(),
    }) +
    stats([
      stat(String(covered), 'register surfaces owned', 'good'),
      stat(String(added), 'of them added in this pass', 'good'),
      stat('14 / 14', 'global expectations drawn', 'good'),
      stat(`${answered} / 27`, 'audit findings answered', 'warn'),
      stat(String(DOMAIN.length), 'domain gaps closed', 'good'),
      stat(`${prdCovered} / ${PRD.length}`, 'PRD rows drawn (1 Sep)', 'warn'),
      stat(String(BASELINE.length), 'incumbent rows answered', 'good'),
      stat(`${journeysOwned} / ${JOURNEYS_WALK.length}`, 'journeys fully owned', 'warn'),
    ]) +
    `<p class="mk-tight mk-muted">Twenty screens were added in this pass and ${added} of them are register surfaces. The other three are J10 — the data states, the keyboard contract and this page — which answer cross-cutting expectations rather than owning a section. Two numbers, two denominators, and they are not the same claim.</p>` +
    notice(
      'warning',
      'Exhaustive relative to six closed lists, and no further.',
      'Absolute exhaustiveness is unfalsifiable. This is complete against the fourteen global expectations, the register’s own section list, the twenty-seven findings of the 22–23 August audit — and, since 1 September, the PRD requirement register, the incumbent capability baseline and the nine journeys of EXPANSION_BRIEF.md §8 — and it has a hole the moment any of those grows. Four findings are marked <code class="mk-file">n/a</code> rather than claimed: three are properties of a running application that a single static document does not have, and one is a development-server defect with no design content. Marking them covered would have been the easier lie.',
    ) +
    '<h2 class="mk-h2">Global expectations — every screen, no exceptions</h2>' +
    `<div class="mk-table-wrap"><table class="mk-cover"><thead><tr><th>Ref</th><th>Expectation</th><th>Drawn on</th><th>How</th></tr></thead><tbody>${GLOBAL.map(
      ([id, what, where, how]) =>
        `<tr><td class="mk-cover__id">${esc(id)}</td><td><strong>${esc(what)}</strong></td>` +
        `<td>${where
          .split(' · ')
          .map((w) => (w.includes(' ') ? `<span class="mk-muted">${esc(w)}</span>` : `<a class="mk-ref" href="#${w}">${esc(w)}</a>`))
          .join(' · ')}</td><td>${how}</td></tr>`,
    ).join('')}</tbody></table></div>` +
    '<h2 class="mk-h2">Surfaces — every section of the register has an owner</h2>' +
    `<div class="mk-table-wrap"><table class="mk-cover"><thead><tr><th>§</th><th>Surface</th><th>Screen</th><th>Status</th></tr></thead><tbody>${SURFACES.map(
      ([sec, what, id, state]) =>
        `<tr><td class="mk-cover__id">${esc(sec)}</td><td>${esc(what)}</td>` +
        `<td><a class="mk-ref" href="#${id}">${esc(id)}</a></td>` +
        `<td>${state === 'new' ? '<span class="mk-tag mk-tag--new">added this pass</span>' : '<span class="mk-tag mk-tag--neutral">already drawn</span>'}</td></tr>`,
    ).join('')}</tbody></table></div>` +
    '<h2 class="mk-h2">A fourth list — what reading the screens as a practitioner turned up</h2>' +
    notice(
      'default',
      'This list had no document behind it, which is what makes it worth keeping.',
      'The three enumerations above came from things this repository already held. These nineteen came from going through the screens as a hydrogeologist and a laboratory data manager would, asking what they would look for and fail to find. Nothing generated the list and nothing defends it — so it is the least trustworthy table on this page, and the most valuable.',
    ) +
    `<div class="mk-table-wrap"><table class="mk-cover"><thead><tr><th>Area</th><th>What was missing</th><th>Screen</th><th>What it does</th></tr></thead><tbody>${DOMAIN.map(
      ([area, what, id, how]) =>
        `<tr><td class="mk-cover__id">${esc(area)}</td><td><strong>${esc(what)}</strong></td>` +
        `<td><a class="mk-ref" href="#${id}">${esc(id)}</a></td><td>${esc(how)}</td></tr>`,
    ).join('')}</tbody></table></div>` +
    '<h2 class="mk-h2">Findings from the August audit — the designed answer to each</h2>' +
    `<div class="mk-table-wrap"><table class="mk-cover"><thead><tr><th>Ref</th><th>Severity</th><th>What was found</th><th>Answered on</th><th>How</th></tr></thead><tbody>${FINDINGS.map(
      ([id, sev, what, where, how]) =>
        `<tr><td class="mk-cover__id">${esc(id)}</td>` +
        `<td>${tag(sev, sev === 'Blocker' ? 'bad' : sev === 'Major' ? 'warn' : 'neutral')}</td>` +
        `<td>${esc(what)}</td>` +
        `<td>${where
          .split(' · ')
          .map((w) => (w.includes(' ') || w.startsWith('n/a') ? `<span class="mk-muted">${esc(w)}</span>` : `<a class="mk-ref" href="#${w}">${esc(w)}</a>`))
          .join(' · ')}</td><td>${how}</td></tr>`,
    ).join('')}</tbody></table></div>` +
    '<h2 class="mk-h2">The PRD register — every requirement row, and what owns it here (added 1 Sep 2026)</h2>' +
    notice(
      'default',
      'Statuses speak about what is drawn, not what is built.',
      'The rail dots carry built-ness, re-derived the same day. <code class="mk-file">no screen</code> names a requirement whose surface is a behaviour, an output property or a protocol — claiming a screen for it would be coverage theatre. Priorities follow EXPANSION_BRIEF.md: P0 the vertical-slice loop, P1 competitive v1, P2 customer readiness, P3 comprehensive, P4 specialist and future.',
    ) +
    `<div class="mk-table-wrap"><table class="mk-cover"><thead><tr><th>Req</th><th>Requirement</th><th>Status</th><th>Owner</th><th>Priority</th><th>Note</th></tr></thead><tbody>${PRD.map(
      ([id, what, status, own, prio, note]) =>
        `<tr><td class="mk-cover__id">${esc(id)}</td><td>${esc(what)}</td>` +
        `<td>${tag(status, STATUS_TONE[status])}</td>` +
        `<td>${owners(own)}</td>` +
        `<td class="mk-cover__id">${esc(prio)}</td>` +
        `<td>${note ? esc(note) : '<span class="mk-muted">—</span>'}</td></tr>`,
    ).join('')}</tbody></table></div>` +
    '<h2 class="mk-h2">The incumbent baseline — every capability row, answered (added 1 Sep 2026)</h2>' +
    notice(
      'default',
      'The evidence tiers are the baseline’s own, and an unverified capability never becomes a requirement.',
      '✅ verified from vendor documentation · ◐ lesser-standing vendor material · ⚠️ unverified. Responses follow the brief: match, simplify, exceed, defer, reject, concede, unverified. The source rows live in <code class="mk-file">docs/reference/incumbent-baseline.md</code> in the app repo, retrieved 10 August 2026.',
    ) +
    `<div class="mk-table-wrap"><table class="mk-cover"><thead><tr><th>Source</th><th>Capability</th><th>Tier</th><th>Response</th><th>Answered on</th><th>Note</th></tr></thead><tbody>${BASELINE.map(
      ([sourceRef, what, tier, resp, own, note]) =>
        `<tr><td class="mk-cover__id">${esc(sourceRef)}</td><td>${esc(what)}</td><td>${esc(tier)}</td>` +
        `<td>${tag(resp, resp === 'exceed' ? 'good' : resp === 'unverified' ? 'neutral' : resp === 'reject' || resp === 'concede' ? 'neutral' : resp === 'defer' ? 'warn' : 'neutral')}</td>` +
        `<td>${owners(own)}</td>` +
        `<td>${note ? esc(note) : '<span class="mk-muted">—</span>'}</td></tr>`,
    ).join('')}</tbody></table></div>` +
    '<h2 class="mk-h2">The nine journeys, walked step by step (added 1 Sep 2026)</h2>' +
    notice(
      'default',
      'A journey is owned when every step lands on a drawn screen that is not a proposal.',
      'Each step below is a link, or a named hole. The deferred telemetry journey is not walked: EXPANSION_BRIEF.md defers it with Domain K, matching the PRD’s S8 marking, and walking it would require inventing the screens it defers.',
    ) +
    `<div class="mk-table-wrap"><table class="mk-cover"><thead><tr><th>J</th><th>Journey</th><th>Status</th><th>The walk</th><th>Note</th></tr></thead><tbody>${JOURNEYS_WALK.map(
      ([n, name, status, steps, note]) =>
        `<tr><td class="mk-cover__id">${esc(n)}</td><td><strong>${esc(name)}</strong></td>` +
        `<td>${tag(status, STATUS_TONE[status])}</td>` +
        `<td>${steps
          .map(([label, sid]) => (sid ? `<a class="mk-ref" href="#${sid}">${esc(label)}</a>` : `<span class="mk-tag mk-tag--bad" title="No screen owns this step">${esc(label)}</span>`))
          .join(' <span class="mk-muted">→</span> ')}</td>` +
        `<td>${note ? esc(note) : '<span class="mk-muted">—</span>'}</td></tr>`,
    ).join('')}</tbody></table></div>` +
    cols(
      panel(
        'What a green row here does not mean',
        '<p class="mk-tight">It means the expectation has been <em>drawn</em>. It does not mean it is built, and it does not mean it is right.</p>' +
          '<p class="mk-tight">Both design oracles this catalogue is drawn to were self-approved and neither has been printed. A practitioner has not looked at any of it. The screens where five minutes of a hydrogeologist’s attention would be worth more than another day of drawing are exactly the ones with the most invention in them — the QA/QC workspace, the lineage panel, the interpretation editor and the field-capture grid.</p>' +
          '<p class="mk-tight">A catalogue is easy to make look complete while the judgements inside it are wrong, and this table measures completeness only.</p>',
      ),
      panel(
        'How to find the next hole',
        '<p class="mk-tight">Re-run the three enumerations rather than reading this table. It was assembled by hand and hand-maintained summaries rot, fastest in whichever direction flatters the person writing them.</p>' +
          table({
            head: ['Enumeration', 'Where it lives', 'Re-run by'],
            scroll: true, label: 'The enumerations and how to re-run them',
            rows: [
              ['Global expectations', 'The register’s §0', 'Reading §0 against this screen'],
              ['Surfaces', 'The register’s §15 matrix', 'Every glossary entity has an owning screen'],
              ['Findings', 'The August audit report', 'Every F-number appears once above'],
              ['Entities', 'The glossary and the schema', 'A new table is a new row here'],
              ['PRD register', 'docs/PRD.md §7–§9, §12 (app repo)', 'Every FR, QB, OM and DR id appears exactly once above'],
              ['Incumbent baseline', 'docs/reference/incumbent-baseline.md', 'Every §2–§5 capability row appears once above'],
              ['Journeys', 'EXPANSION_BRIEF.md §8', 'Every step renders as a link, or is flagged unowned'],
            ],
          }) +
          stateSentence(),
      ),
    )
  );
};

/* ================================================================== *
 * The catalogue
 * ================================================================== */

/**
 * Nine jobs became eleven, and the two that arrived are the argument.
 *
 * **J0 did not exist**, and its absence was structural rather than an
 * oversight: the catalogue opened on a bore's detail page, which assumes a
 * practitioner who already knows which project they are in and what needs
 * them. Nobody arrives knowing that. The work queue, the search box, the
 * project list and the project home are the four surfaces every session
 * actually starts at, and none of them had been drawn.
 *
 * **J10 is not a job at all**, and it is marked so. It holds the three
 * cross-cutting claims — the four data states, the keyboard contract, and the
 * coverage matrix — drawn once each. Every one of them is a promise repeated
 * on thirty-odd other screens, and a promise made thirty times is a promise
 * nobody checks.
 *
 * ## Two dated state fields, and neither may be rewritten in place
 *
 * `state` records what was true on **23 August 2026** — the third pass's
 * finding, kept verbatim because rewriting it would erase the finding and
 * leave a document that had always been right. `now` records the fourth
 * pass's re-derivation on **1 September 2026**, from the measurements
 * EXPANSION_BRIEF.md §2 names: `apps/web/lib/navigation/routes.ts` lists 69
 * routes, every engine module (figures, report, validation, evaluation,
 * derivation, calc, stats, config) is imported by screen modules, and the
 * ambiguous screens were read rather than inferred. A fifth pass adds its
 * own dated derivation the same way; it does not edit these.
 *
 * What `now: 'shipped'` claims is exactly what the product's e2e suite
 * proves — the route exists, loads, is scoped and renders — plus a read of
 * the module showing it serves this screen's job. It does not claim the
 * product screen matches this drawing, and it says nothing about G-76b.
 */
export const JOBS = [
  { id: 'j0', n: 'J0', title: 'Arrive, and find out what needs you', who: 'U1 · U2 · U4 · U5',
    note: 'Absent from the first build. The authorisation scope had no face, and the catalogue opened on a screen that assumes you already know where you are.',
    screens: [
      { id: 'home', label: 'Work queue', body: workQueue, state: 'not built', isNew: true, now: 'proposed' },
      { id: 'search', label: 'Search', body: globalSearch, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'projects', label: 'Projects', body: projectList, state: 'engine-only', isNew: true, now: 'shipped' },
      { id: 'project-home', label: 'Project home', body: projectHome, state: 'shipped', isNew: true, now: 'shipped' },
    ] },
  { id: 'j1', n: 'J1', title: 'Get the data in, and know it landed', who: 'U1 · U5',
    note: 'The strongest surface in the product, and the only job whose main screen is genuinely built.',
    screens: [
      { id: 'locations', label: 'Location register', body: locationRegistry, state: 'shipped', isNew: true, now: 'shipped' },
      { id: 'location', label: 'Location detail', body: locationDetail, state: 'not built', now: 'shipped' },
      { id: 'facility', label: 'Facility and areas', body: facilityScreen, state: 'engine-only', isNew: true, now: 'shipped' },
      { id: 'events', label: 'Sampling events', body: samplingEvents, state: 'shipped', isNew: true, now: 'shipped' },
      { id: 'imports', label: 'Import runs', body: importRuns, state: 'shipped', now: 'shipped' },
      { id: 'import-review', label: 'Exception review', body: importReview, state: 'shipped', now: 'shipped' },
      { id: 'import-commit', label: 'Commit and reversal', body: importCommit, state: 'shipped', now: 'shipped' },
      { id: 'quarantine', label: 'Held rows', body: quarantine, state: 'engine-only', isNew: true, now: 'shipped' },
      { id: 'purge', label: 'Purge and stabilisation', body: purgeLog, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'receipt', label: 'Receipt and custody', body: sampleReceipt, state: 'not built', isNew: true, now: 'shipped' },
      /*
       * No `state`, deliberately. `state` is the 23 August record and this
       * screen did not exist on 23 August; writing one would fabricate a
       * history to satisfy a field's shape. `added` carries the date it
       * arrived instead, and `build.mjs` renders that where it would
       * otherwise render a state it does not have.
       */
      { id: 'ecoc', label: 'Chain of custody', body: chainOfCustody, now: 'proposed', added: '2026-09-01' },
      { id: 'certificate', label: 'Certificate and supersession', body: certificate, state: 'engine-only', now: 'shipped' },
      { id: 'migration', label: 'Legacy reconciliation', body: migration, state: 'engine-only', now: 'shipped' },
      { id: 'field-capture', label: 'Field capture', body: fieldCapture, state: 'proposed', now: 'proposed' },
    ] },
  { id: 'j2', n: 'J2', title: 'Know the data is right', who: 'U1 · U2',
    note: 'Nine validation modules, every one tested, none of them reachable from a browser.',
    screens: [
      { id: 'qc', label: 'QA/QC workspace', body: qcWorkspace, state: 'engine-only', now: 'shipped' },
      { id: 'batches', label: 'Laboratory batches', body: labBatches, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'qc-limits', label: 'Data quality objectives', body: qcLimits, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'dqa', label: 'Data quality assessment', body: dataQuality, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'consistency', label: 'Internal consistency', body: consistency, state: 'engine-only', now: 'shipped' },
      { id: 'validation', label: 'Validation state', body: validationBoard, state: 'engine-only', now: 'shipped' },
      { id: 'qualifiers', label: 'Qualifiers and lock', body: qualifiers, state: 'engine-only', now: 'shipped' },
    ] },
  { id: 'j3', n: 'J3', title: 'Know what is wrong', who: 'U2 · U3 · U4',
    note: 'The exceedances page currently says, in its own words, that it is not built.',
    screens: [
      { id: 'exceedances', label: 'Exceedance register', body: exceedances, state: 'engine-only', now: 'shipped' },
      { id: 'crosstab', label: 'Results crosstab', body: crosstab, state: 'engine-only', now: 'shipped' },
      { id: 'result-detail', label: 'Result detail', body: resultDetail, state: 'engine-only', isNew: true, now: 'shipped' },
      { id: 'hardness', label: 'How this criterion was calculated', body: hardnessDerivation, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'indeterminate', label: 'Could not be assessed', body: indeterminateRegister, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'tarp', label: 'TARP state', body: tarpBoard, state: 'engine-only', now: 'shipped' },
      { id: 'alerts', label: 'Alerts', body: alerts, state: 'engine-only', now: 'shipped' },
    ] },
  { id: 'j4', n: 'J4', title: 'Understand it and explain it', who: 'U2',
    note: 'Twenty-two figure modules and twelve approved renderings. No route imports any of them.',
    screens: [
      { id: 'hydrograph', label: 'Hydrograph', body: hydrographWorkspace, state: 'engine-only', now: 'shipped' },
      { id: 'hydrochem', label: 'Hydrogeochemistry', body: hydrochem, state: 'engine-only', now: 'shipped' },
      { id: 'statistics', label: 'Statistics and trend', body: statistics, state: 'engine-only', now: 'shipped' },
      { id: 'background', label: 'Background comparison', body: backgroundComparison, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'stygofauna', label: 'Subterranean fauna', body: stygofaunaScreen, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'map', label: 'Map and spatial', body: mapScreen, state: 'engine-only', now: 'shipped' },
      { id: 'saved-views', label: 'Saved views', body: savedViews, state: 'proposed', now: 'proposed' },
    ] },
  { id: 'j5', n: 'J5', title: 'Produce the submission', who: 'U2 · U4',
    note: 'The Word assembler is complete. There is no way to reach it from the application.',
    screens: [
      { id: 'report', label: 'Report builder', body: reportBuilder, state: 'engine-only', now: 'shipped' },
      { id: 'report-figures', label: 'Figures and tables', body: reportFigures, state: 'engine-only', now: 'shipped' },
      { id: 'narrative', label: 'Interpretation', body: narrative, state: 'proposed', now: 'proposed' },
      { id: 'snapshot', label: 'Snapshot and reissue', body: snapshot, state: 'engine-only', now: 'shipped' },
      { id: 'submissions', label: 'Submission archive', body: submissionArchive, state: 'engine-only', isNew: true, now: 'shipped' },
    ] },
  { id: 'j6', n: 'J6', title: 'Keep the obligations met', who: 'U4 · U1',
    note: 'The scheduler, alerting and immutable awareness all landed. One aggregate list surfaces any of it.',
    screens: [
      { id: 'obligations', label: 'Obligations board', body: obligations, state: 'shipped', now: 'shipped' },
      { id: 'programme', label: 'Sampling programme', body: programme, state: 'engine-only', now: 'shipped' },
      { id: 'licence', label: 'Licence and conditions', body: licenceScreen, state: 'engine-only', isNew: true, now: 'shipped' },
      { id: 'notification', label: 'Statutory notification', body: notification, state: 'engine-only', now: 'shipped' },
      { id: 'signoff', label: 'Approval and sign-off', body: signoff, state: 'engine-only', now: 'shipped' },
    ] },
  { id: 'j7', n: 'J7', title: 'Prove what was known, and when', who: 'U2 · U4',
    note: 'The deepest architecture in the product, and the only job with no surface at all.',
    screens: [
      { id: 'lineage', label: 'Lineage', body: lineage, state: 'proposed', now: 'proposed' },
      { id: 'audit', label: 'Audit trail', body: auditTrail, state: 'engine-only', now: 'shipped' },
      { id: 'supersession', label: 'Supersession', body: supersession, state: 'engine-only', now: 'shipped' },
      { id: 'documents', label: 'Documents and evidence', body: documents, state: 'engine-only', isNew: true, now: 'shipped' },
    ] },
  { id: 'j8', n: 'J8', title: 'Configure the instance', who: 'U5',
    note: 'The criteria-editing model and the format registry are built. The promise of customer configurability fails on the surface, not the engine — there is nothing to click.',
    screens: [
      { id: 'project-settings', label: 'Project settings', body: projectSettings, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'criteria', label: 'Criteria library', body: criteriaLibrary, state: 'engine-only', now: 'shipped' },
      { id: 'formats', label: 'EDD formats', body: formatDesigner, state: 'engine-only', now: 'shipped' },
      { id: 'mapping-profiles', label: 'Mapping profiles', body: mappingProfiles, state: 'engine-only', isNew: true, now: 'shipped' },
      { id: 'dictionary', label: 'Analyte dictionary', body: dictionary, state: 'engine-only', now: 'shipped' },
      { id: 'units', label: 'Units and conversions', body: unitsScreen, state: 'engine-only', isNew: true, now: 'shipped' },
      { id: 'roles', label: 'Access', body: roles, state: 'engine-only', now: 'shipped' },
    ] },
  { id: 'j9', n: 'J9', title: 'Keep the instance alive', who: 'U6',
    note: 'CLI, and this is the one job where that is the right answer rather than a shortfall — except that none of it is self-servable.',
    screens: [
      { id: 'instance', label: 'Instance health', body: instanceHealth, state: 'shipped (CLI)', now: 'shipped' },
      { id: 'upgrade', label: 'Upgrade and rollback', body: upgradeScreen, state: 'shipped (CLI)', isNew: true, now: 'shipped (CLI)' },
      { id: 'diagnostics', label: 'Backup and diagnostics', body: diagnostics, state: 'shipped (CLI)', now: 'shipped (CLI)' },
      { id: 'entitlement', label: 'About this instance', body: entitlementScreen, state: 'not built', isNew: true, now: 'shipped' },
    ] },
  { id: 'j10', n: 'J10', title: 'The conventions the whole product keeps', who: 'Every user',
    note: 'Not a job. Three cross-cutting claims, drawn once each so they can be checked once each.',
    screens: [
      { id: 'data-states', label: 'Four states, everywhere', body: dataStates, state: 'shipped', isNew: true, now: 'shipped' },
      { id: 'assistance', label: 'Keyboard and assistance', body: assistance, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'coverage', label: 'Coverage matrix', body: coverage, state: 'proposed', isNew: true, now: 'proposed' },
    ] },
];

/**
 * The link graph, declared once.
 *
 * The rail is a table of contents. This is the information architecture: what
 * a practitioner reaches for *from* a screen, which is a claim about the work
 * rather than about the file layout, and it belongs somewhere a person can
 * read it and disagree with it.
 *
 * Three properties are worth keeping, and the third is new. **`location` is
 * reachable from more screens than anything else**, because the bore is the
 * entity the domain is organised around and every register is a slice through
 * it. **The sequence runs one way** — imports → review → commit → crosstab →
 * exceedances → report — so a link backwards is a deliberate exception. And
 * **every screen now reaches at least one orientation surface**, which the
 * first build did not: thirty-seven screens pointed at each other in a closed
 * loop with no exit to the place a session starts.
 */
export const RELATED = {
  home: ['exceedances', 'import-review', 'programme', 'projects', 'search'],
  search: ['location', 'crosstab', 'certificate', 'licence'],
  projects: ['project-home', 'project-settings', 'roles', 'home'],
  'project-home': ['locations', 'imports', 'exceedances', 'obligations', 'project-settings'],

  locations: ['location', 'facility', 'events', 'crosstab', 'map'],
  location: ['crosstab', 'hydrograph', 'map', 'programme', 'exceedances', 'documents'],
  facility: ['locations', 'programme', 'criteria', 'project-settings'],
  events: ['location', 'field-capture', 'ecoc', 'receipt', 'imports', 'programme'],
  imports: ['import-review', 'quarantine', 'migration', 'certificate', 'formats'],
  'import-review': ['import-commit', 'quarantine', 'qc', 'dictionary', 'mapping-profiles'],
  'import-commit': ['crosstab', 'quarantine', 'exceedances', 'audit'],
  quarantine: ['import-review', 'import-commit', 'mapping-profiles', 'qc'],
  purge: ['field-capture', 'location', 'events', 'dqa', 'receipt'],
  receipt: ['events', 'ecoc', 'batches', 'qc', 'documents', 'purge'],
  certificate: ['supersession', 'lineage', 'imports', 'documents'],
  migration: ['imports', 'validation', 'audit', 'mapping-profiles'],
  'field-capture': ['purge', 'ecoc', 'programme', 'location', 'events'],
  // The chain is raised in the field and closed at the laboratory, so it sits
  // between the two screens that own those ends rather than beside either.
  ecoc: ['receipt', 'events', 'field-capture', 'imports'],

  qc: ['batches', 'qc-limits', 'consistency', 'qualifiers', 'validation', 'dqa'],
  batches: ['qc', 'qc-limits', 'receipt', 'result-detail'],
  'qc-limits': ['qc', 'batches', 'criteria', 'dqa'],
  dqa: ['qc', 'qc-limits', 'indeterminate', 'report'],
  consistency: ['qc', 'crosstab', 'hydrochem'],
  validation: ['qualifiers', 'signoff', 'audit'],
  qualifiers: ['qc', 'validation', 'lineage', 'result-detail'],

  exceedances: ['result-detail', 'hardness', 'indeterminate', 'lineage', 'tarp', 'map'],
  crosstab: ['result-detail', 'exceedances', 'lineage', 'criteria', 'saved-views', 'report'],
  'result-detail': ['hardness', 'lineage', 'crosstab', 'qc', 'batches'],
  hardness: ['result-detail', 'criteria', 'indeterminate', 'lineage', 'consistency'],
  indeterminate: ['hardness', 'exceedances', 'crosstab', 'dqa', 'report'],
  tarp: ['exceedances', 'alerts', 'notification'],
  alerts: ['tarp', 'obligations', 'notification'],

  hydrograph: ['location', 'statistics', 'saved-views', 'report-figures'],
  hydrochem: ['consistency', 'crosstab', 'report-figures'],
  statistics: ['background', 'hydrograph', 'crosstab', 'report-figures'],
  background: ['statistics', 'stygofauna', 'criteria', 'map', 'exceedances'],
  stygofauna: ['background', 'map', 'locations', 'obligations'],
  map: ['location', 'stygofauna', 'exceedances', 'report-figures'],
  'saved-views': ['crosstab', 'hydrograph', 'report-figures'],

  report: ['report-figures', 'dqa', 'narrative', 'snapshot', 'signoff'],
  'report-figures': ['report', 'narrative', 'supersession'],
  narrative: ['report', 'lineage', 'statistics'],
  snapshot: ['report', 'signoff', 'submissions', 'supersession'],
  submissions: ['snapshot', 'signoff', 'documents', 'obligations'],

  obligations: ['licence', 'programme', 'notification', 'signoff', 'alerts'],
  programme: ['obligations', 'field-capture', 'events', 'location'],
  licence: ['obligations', 'criteria', 'locations', 'submissions'],
  notification: ['tarp', 'obligations', 'lineage', 'documents'],
  signoff: ['snapshot', 'submissions', 'validation', 'report'],

  lineage: ['certificate', 'supersession', 'audit', 'crosstab', 'result-detail'],
  audit: ['lineage', 'supersession', 'roles'],
  supersession: ['lineage', 'certificate', 'report-figures'],
  documents: ['certificate', 'lineage', 'notification', 'submissions'],

  'project-settings': ['roles', 'criteria', 'facility', 'projects'],
  criteria: ['hardness', 'crosstab', 'background', 'dictionary', 'licence'],
  formats: ['imports', 'dictionary', 'import-review', 'mapping-profiles'],
  'mapping-profiles': ['formats', 'dictionary', 'import-review', 'supersession'],
  dictionary: ['formats', 'criteria', 'import-review', 'units'],
  units: ['dictionary', 'result-detail', 'lineage'],
  roles: ['audit', 'signoff', 'project-settings'],

  instance: ['diagnostics', 'upgrade', 'audit'],
  upgrade: ['instance', 'diagnostics', 'entitlement'],
  diagnostics: ['instance', 'entitlement'],
  entitlement: ['instance', 'upgrade', 'diagnostics'],

  'data-states': ['coverage', 'assistance', 'crosstab'],
  assistance: ['coverage', 'data-states', 'import-review'],
  coverage: ['data-states', 'assistance', 'home'],
};
