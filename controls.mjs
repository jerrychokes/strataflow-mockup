/**
 * The interaction vocabulary — everything a practitioner touches.
 *
 * `ui.mjs` holds the product's own `sf-` primitives, which exist because
 * `apps/web/app/styles/app.css` implements them. This file holds the layer
 * above: navigation chrome, form controls, feedback surfaces and the
 * assistance features. All of it is `mk-`, and the separation is the point —
 * **nothing here is an approved primitive.** A control drawn in this file is a
 * proposal about interaction, and `design/reference/` has never seen it.
 *
 * ## Two rules bind every control below
 *
 * **Colour is never the carrying channel** (G-EXP-8, NFR-7). Every state
 * encoding here also carries a glyph, a shape, a border weight or a word, and
 * the test is a photocopier rather than a preference: a regulatory submission
 * gets printed, faxed and scanned, and a control that only says "bad" in red
 * says nothing at all by the time a regulator reads it.
 *
 * **A control states its consequence before it is used** (G-EXP-5, QB-7,
 * PP6). Reversibility is written on or beside the thing you press, not
 * discovered in a toast afterwards. Where an action is genuinely irreversible
 * the control says that instead, which is the only honest alternative.
 */

import { esc } from './ui.mjs';

/* ==================================================================== *
 * Navigation and structural framework
 * ==================================================================== */

/**
 * Where you are, as a path you can walk back up.
 *
 * The last crumb is the page and is not a link — a breadcrumb whose final
 * entry navigates to itself teaches the reader that the trail is decoration.
 */
export function breadcrumb(trail) {
  const items = trail
    .map((c, i) => {
      const last = i === trail.length - 1;
      const inner = last
        ? `<span class="mk-crumb__here" aria-current="page">${esc(c.label)}</span>`
        : `<a class="mk-crumb__link" href="#${c.target ?? ''}">${esc(c.label)}</a>`;
      return `<li class="mk-crumb__item">${inner}</li>`;
    })
    .join('<li class="mk-crumb__sep" aria-hidden="true">/</li>');
  return `<nav class="mk-crumb" aria-label="Breadcrumb"><ol class="mk-crumb__list">${items}</ol></nav>`;
}

/**
 * The tabs on an entity detail page.
 *
 * **Audit is always the last one** (G-EXP-11). The convention is the whole
 * design: there is no global log-viewer destination in this product, because
 * "who changed this, and when" is a question asked *about a thing* and an
 * answer that makes you leave the thing and re-find it in a firehose is not an
 * answer. Every detail page carries the tab; none of them links away to a log.
 */
export function tabs(items, { label = 'Sections' } = {}) {
  const body = items
    .map(
      (t) =>
        `<button type="button" class="mk-tab${t.current ? ' mk-tab--current' : ''}" ` +
        `aria-current="${t.current ? 'true' : 'false'}"${t.target ? ` data-target="${esc(t.target)}"` : ''}>` +
        `<span>${esc(t.label)}</span>` +
        (t.count !== undefined ? `<span class="mk-tab__count">${esc(t.count)}</span>` : '') +
        (t.dot ? `<span class="mk-tab__dot mk-tab__dot--${t.dot}" aria-hidden="true"></span>` : '') +
        '</button>',
    )
    .join('');
  return `<div class="mk-tabs" role="tablist" aria-label="${esc(label)}">${body}</div>`;
}

/** The product's own six sections, in the order the work happens (G-14). */
export function sectionNav(current) {
  const sections = [
    ['Locations', 'locations'],
    ['Sampling events', 'events'],
    ['Import runs', 'imports'],
    ['Results', 'crosstab'],
    ['Exceedances', 'exceedances'],
    ['Reports', 'report'],
  ];
  const body = sections
    .map(([label, target]) => {
      const here = label === current;
      return (
        `<a class="mk-section${here ? ' mk-section--current' : ''}" href="#${target}"` +
        `${here ? ' aria-current="page"' : ''}>${esc(label)}</a>`
      );
    })
    .join('');
  return `<nav class="mk-sections" aria-label="Project sections">${body}</nav>`;
}

/**
 * Paging that says what it is paging through.
 *
 * "1–50 of 2,841" rather than "page 1 of 57", because the first tells a
 * practitioner whether their filter caught what they meant and the second
 * tells them only that there is more.
 */
export function pager({ from, to, total, unit = 'rows', pageSize = 50 }) {
  return (
    '<div class="mk-pager">' +
    `<span class="mk-pager__count">${esc(from)}–${esc(to)} of <strong>${esc(total)}</strong> ${esc(unit)}</span>` +
    '<div class="mk-pager__controls">' +
    '<button class="mk-iconbtn" type="button" disabled aria-label="Previous page">←</button>' +
    '<button class="mk-iconbtn" type="button" aria-label="Next page">→</button>' +
    `<label class="mk-pager__size">Rows <select class="mk-select mk-select--sm"><option>${pageSize}</option><option>100</option><option>250</option></select></label>` +
    '</div></div>'
  );
}

/* ==================================================================== *
 * Data entry and interactive controls
 * ==================================================================== */

/**
 * A labelled control with its hint and its error.
 *
 * The hint is always rendered when given, including alongside an error — an
 * error that replaces the hint takes away the instruction at the moment it is
 * most needed.
 */
/**
 * A counter, because a label is not unique and an id has to be.
 *
 * Deriving the id from the label reads well and is wrong in a document holding
 * every screen at once: two registers both have a "Find" field, both emit
 * `id="f-find"`, and the second `<label for>` focuses the *first* screen's
 * control. Silent, and exactly the kind of defect a single-screen review never
 * sees.
 */
let fieldSeq = 0;

export function field({ label, control, hint, error, required, id }) {
  const fid = id ?? `f-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${++fieldSeq}`;
  return (
    `<div class="mk-field${error ? ' mk-field--invalid' : ''}">` +
    `<label class="mk-field__label" for="${esc(fid)}">${esc(label)}` +
    (required ? '<span class="mk-field__req" title="Required">*</span>' : '') +
    '</label>' +
    control.replace('<<id>>', esc(fid)) +
    (hint ? `<p class="mk-field__hint">${hint}</p>` : '') +
    (error ? `<p class="mk-field__error"><span aria-hidden="true">▲</span> ${error}</p>` : '') +
    '</div>'
  );
}

export function input({ value = '', placeholder = '', mono = false, disabled = false, invalid = false } = {}) {
  return (
    `<input id="<<id>>" class="mk-input${mono ? ' mk-input--mono' : ''}" type="text" ` +
    `value="${esc(value)}" placeholder="${esc(placeholder)}"${disabled ? ' disabled' : ''}` +
    `${invalid ? ' aria-invalid="true"' : ''}>`
  );
}

export function textarea({ value = '', rows = 4, placeholder = '' } = {}) {
  return `<textarea id="<<id>>" class="mk-textarea" rows="${rows}" placeholder="${esc(placeholder)}">${esc(value)}</textarea>`;
}

/**
 * A number with its unit fixed to it (G-EXP-10).
 *
 * The unit is an adornment inside the control rather than a separate field,
 * because a number typed into this product without a unit is not a
 * measurement. Where the unit is itself a choice, pass `units` and it becomes
 * a select — but there is no state in which the box is a bare number.
 */
export function numberInput({ value = '', unit, units, placeholder = '', step, hintRight } = {}) {
  const tail = units
    ? `<select class="mk-adorn mk-adorn--select" aria-label="Unit">${units
        .map((u) => `<option${u === unit ? ' selected' : ''}>${esc(u)}</option>`)
        .join('')}</select>`
    : unit
      ? `<span class="mk-adorn" aria-hidden="true">${esc(unit)}</span>`
      : '';
  return (
    '<div class="mk-inputgroup">' +
    `<input id="<<id>>" class="mk-input mk-input--mono mk-input--num" type="text" inputmode="decimal" ` +
    `value="${esc(value)}" placeholder="${esc(placeholder)}"${step ? ` data-step="${esc(step)}"` : ''}>` +
    tail +
    (hintRight ? `<span class="mk-inputgroup__aside">${hintRight}</span>` : '') +
    '</div>'
  );
}

export function select({ options, value, disabled = false, placeholder } = {}) {
  const opts = (placeholder ? [{ label: placeholder, value: '__none', placeholder: true }] : [])
    .concat(options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o)))
    .map(
      (o) =>
        `<option value="${esc(o.value)}"${o.value === value ? ' selected' : ''}` +
        `${o.placeholder ? ' disabled' : ''}>${esc(o.label)}</option>`,
    )
    .join('');
  return `<select id="<<id>>" class="mk-select"${disabled ? ' disabled' : ''}>${opts}</select>`;
}

/**
 * A typeahead whose suggestions carry their confidence.
 *
 * The confidence bar is not decoration and it is not a colour: it is the
 * number the matcher produced (G-18), shown because a practitioner accepting
 * a suggestion is accepting the matcher's judgement and is entitled to see how
 * sure it was. The last option is always an escape hatch — F-14 found a review
 * queue that offered only the site's existing bores, so a genuinely new bore
 * could be resolved *only* by mis-mapping it.
 */
export function combobox({ value = '', placeholder = '', suggestions = [], open = false, escape } = {}) {
  const rows = suggestions
    .map(
      (s, i) =>
        `<li class="mk-combo__opt${i === 0 ? ' mk-combo__opt--active' : ''}" role="option" aria-selected="${i === 0}">` +
        `<span class="mk-combo__main">${esc(s.label)}</span>` +
        (s.detail ? `<span class="mk-combo__detail">${esc(s.detail)}</span>` : '') +
        (s.confidence !== undefined ? confidence(s.confidence) : '') +
        '</li>',
    )
    .join('');
  const tail = escape
    ? `<li class="mk-combo__opt mk-combo__opt--escape" role="option" aria-selected="false">` +
      `<span class="mk-combo__main">${esc(escape)}</span>` +
      '<span class="mk-combo__detail">Nothing here fits — say so rather than choosing the nearest</span></li>'
    : '';
  return (
    '<div class="mk-combo">' +
    `<input id="<<id>>" class="mk-input" type="text" role="combobox" aria-expanded="${open}" ` +
    `aria-autocomplete="list" value="${esc(value)}" placeholder="${esc(placeholder)}">` +
    '<span class="mk-combo__caret" aria-hidden="true">▾</span>' +
    (open ? `<ul class="mk-combo__list" role="listbox">${rows}${tail}</ul>` : '') +
    '</div>'
  );
}

/** The matcher's own number, as a bar and as text. Never as a colour alone. */
export function confidence(v) {
  const pct = Math.round(v * 100);
  const band = v >= 0.95 ? 'high' : v >= 0.8 ? 'mid' : 'low';
  return (
    `<span class="mk-conf mk-conf--${band}" title="Match confidence ${pct}%">` +
    `<span class="mk-conf__track"><span class="mk-conf__fill" style="width:${pct}%"></span></span>` +
    `<span class="mk-conf__pct">${pct}%</span></span>`
  );
}

/**
 * `label` may be visually empty — in a table the column header is the label —
 * but it may never be *absent*. A checkbox with no accessible name is a control
 * a screen reader announces as "checkbox", which is no name at all, so an empty
 * label is required to pass `srLabel` instead.
 */
export function checkbox({ label, srLabel, checked = false, indeterminate = false, hint, disabled = false } = {}) {
  const glyph = indeterminate ? '–' : checked ? '✓' : '';
  const name = label || srLabel || '';
  if (!name) throw new Error('checkbox needs a label or an srLabel — an unnamed control is not a control');
  const text = label
    ? `<span class="mk-check__text">${esc(label)}${hint ? `<span class="mk-check__hint">${esc(hint)}</span>` : ''}</span>`
    : `<span class="sf-visually-hidden">${esc(srLabel)}</span>`;
  return (
    `<label class="mk-check${disabled ? ' mk-check--disabled' : ''}">` +
    `<span class="mk-check__box${checked || indeterminate ? ' mk-check__box--on' : ''}" aria-hidden="true">${glyph}</span>` +
    `<input type="checkbox" class="mk-check__input"${checked ? ' checked' : ''}${disabled ? ' disabled' : ''}>` +
    text +
    '</label>'
  );
}

export function radioGroup({ name, options, value, legend }) {
  const body = options
    .map((o) => {
      const opt = typeof o === 'string' ? { label: o, value: o } : o;
      const on = opt.value === value;
      return (
        `<label class="mk-radio${on ? ' mk-radio--on' : ''}">` +
        `<span class="mk-radio__dot" aria-hidden="true"></span>` +
        `<input type="radio" name="${esc(name)}" class="mk-radio__input"${on ? ' checked' : ''}>` +
        `<span class="mk-radio__text">${esc(opt.label)}` +
        (opt.hint ? `<span class="mk-radio__hint">${esc(opt.hint)}</span>` : '') +
        '</span></label>'
      );
    })
    .join('');
  return (
    `<fieldset class="mk-radios">${legend ? `<legend class="mk-radios__legend">${esc(legend)}</legend>` : ''}` +
    `${body}</fieldset>`
  );
}

/** A two-state control whose state is a word, not only a position. */
export function switchControl({ label, on = false, hint } = {}) {
  return (
    `<label class="mk-switch${on ? ' mk-switch--on' : ''}">` +
    '<span class="mk-switch__track" aria-hidden="true"><span class="mk-switch__thumb"></span></span>' +
    `<input type="checkbox" class="mk-switch__input"${on ? ' checked' : ''}>` +
    `<span class="mk-switch__text">${esc(label)}<span class="mk-switch__state">${on ? 'on' : 'off'}</span>` +
    (hint ? `<span class="mk-switch__hint">${esc(hint)}</span>` : '') +
    '</span></label>'
  );
}

export function segmented({ options, value, label = 'Mode' }) {
  const body = options
    .map((o) => {
      const opt = typeof o === 'string' ? { label: o, value: o } : o;
      const on = opt.value === value;
      return (
        `<button type="button" class="mk-seg__btn${on ? ' mk-seg__btn--on' : ''}" ` +
        `aria-pressed="${on}"${opt.target ? ` data-target="${esc(opt.target)}"` : ''}>${esc(opt.label)}</button>`
      );
    })
    .join('');
  return `<div class="mk-seg" role="group" aria-label="${esc(label)}">${body}</div>`;
}

/** A date range in the site's own zone, and it says which zone (G-EXP-10). */
export function dateRange({ from, to, zone = 'AWST (UTC+8)' } = {}) {
  return (
    '<div class="mk-daterange">' +
    `<input class="mk-input mk-input--mono mk-input--date" type="text" value="${esc(from)}" aria-label="From">` +
    '<span class="mk-daterange__dash" aria-hidden="true">→</span>' +
    `<input class="mk-input mk-input--mono mk-input--date" type="text" value="${esc(to)}" aria-label="To">` +
    `<span class="mk-daterange__zone">${esc(zone)}</span></div>`
  );
}

/** A removable chip. Filters are made of these, and so are multi-selects. */
export function chip(text, { removable = true, tone = 'neutral', prefix } = {}) {
  return (
    `<span class="mk-chip mk-chip--${tone}">` +
    (prefix ? `<span class="mk-chip__prefix">${esc(prefix)}</span>` : '') +
    `<span>${esc(text)}</span>` +
    (removable ? '<button type="button" class="mk-chip__x" aria-label="Remove filter">×</button>' : '') +
    '</span>'
  );
}

/**
 * The filter bar that sits over every register.
 *
 * It carries a result count and a save control because those are the two
 * things a filter is *for*: knowing whether it caught what you meant, and not
 * rebuilding it next month (EX-24). "Clear all" states how many filters it
 * would clear, since a bar with four chips and one hidden select is exactly
 * where a practitioner loses an hour.
 */
export function filterBar({ chips = [], controls = [], count, saved, onView } = {}) {
  return (
    '<div class="mk-filters">' +
    `<div class="mk-filters__row">${controls.join('')}</div>` +
    (chips.length || count !== undefined
      ? '<div class="mk-filters__row mk-filters__row--chips">' +
        (chips.length ? `<span class="mk-filters__lede">Filtered by</span>${chips.join('')}` : '') +
        (chips.length ? `<button type="button" class="mk-linkbtn">Clear ${chips.length} filters</button>` : '') +
        (count !== undefined ? `<span class="mk-filters__count">${count}</span>` : '') +
        (onView
          ? `<span class="mk-filters__view">View <strong>${esc(onView)}</strong>${saved ? '' : ' <em>· edited</em>'}</span>` +
            `<button type="button" class="mk-linkbtn">${saved ? 'Save as new view' : 'Save changes'}</button>`
          : '') +
        '</div>'
      : '') +
    '</div>'
  );
}

/**
 * The bar that appears when rows are selected.
 *
 * Every action on it names its scope — "Qualify 14 rows", never "Qualify" —
 * because a bulk action whose count is somewhere else on the screen is how
 * somebody qualifies two thousand results meaning to qualify two.
 */
export function selectionBar({ n, unit = 'rows', actions = [], undo }) {
  return (
    '<div class="mk-selbar" role="status">' +
    `<span class="mk-selbar__n"><strong>${esc(n)}</strong> ${esc(unit)} selected</span>` +
    '<button type="button" class="mk-linkbtn">Select all matching the filter</button>' +
    `<div class="mk-selbar__actions">${actions.map((a) => `<button type="button" class="mk-btn mk-btn--sm">${esc(a)}</button>`).join('')}</div>` +
    (undo ? `<span class="mk-selbar__undo">${esc(undo)}</span>` : '') +
    '<button type="button" class="mk-iconbtn mk-iconbtn--ghost" aria-label="Clear selection">×</button>' +
    '</div>'
  );
}

/* ==================================================================== *
 * Feedback and status indicators
 * ==================================================================== */

/**
 * The four states every surface owes (G-EXP-7, G-82).
 *
 * `empty` must teach the first action and must never read "No data". An empty
 * *queue* and an empty *register* are different sentences — *you are finished*
 * against *nothing has arrived* — and G-82's suite fails a screen that
 * confuses them. `partial` must quantify what is absent, because "some data"
 * is the state in which a practitioner most needs a number.
 */
export function stateBlock(kind, { headline, detail, action, secondary, rows = 4 }) {
  if (kind === 'loading') {
    const bars = Array.from({ length: rows }, (_, i) =>
      `<span class="mk-skel__row"><span class="mk-skel__bar" style="width:${[38, 92, 74, 88, 61, 80][i % 6]}%"></span></span>`,
    ).join('');
    return (
      '<div class="mk-state mk-state--loading" role="status" aria-live="polite">' +
      `<p class="mk-state__headline"><span class="mk-spinner" aria-hidden="true"></span> ${esc(headline)}</p>` +
      (detail ? `<p class="mk-state__detail">${detail}</p>` : '') +
      `<div class="mk-skel" aria-hidden="true">${bars}</div></div>`
    );
  }
  const glyph = { empty: '○', partial: '◐', error: '▲' }[kind] ?? '○';
  return (
    `<div class="mk-state mk-state--${kind}"${kind === 'error' ? ' role="alert"' : ''}>` +
    `<p class="mk-state__headline"><span class="mk-state__glyph" aria-hidden="true">${glyph}</span> ${esc(headline)}</p>` +
    (detail ? `<p class="mk-state__detail">${detail}</p>` : '') +
    (action || secondary
      ? '<div class="mk-state__actions">' +
        (action ? `<button type="button" class="mk-btn mk-btn--primary">${esc(action)}</button>` : '') +
        (secondary ? `<button type="button" class="mk-btn">${esc(secondary)}</button>` : '') +
        '</div>'
      : '') +
    '</div>'
  );
}

/**
 * Determinate progress, with bytes and a time (G-EXP-13, NFR-8).
 *
 * An indeterminate spinner on a 40 MB upload over a site link is a lie of
 * omission: the practitioner cannot tell a slow transfer from a dead one, and
 * on NFR-8's connections that distinction is most of the perceived product.
 * `resumable` is stated on the control because an interrupted upload that
 * silently restarts from zero is how an afternoon is lost.
 */
export function progress({ pct, label, detail, resumable = false, tone = 'run' }) {
  return (
    `<div class="mk-prog mk-prog--${tone}">` +
    '<div class="mk-prog__head">' +
    `<span class="mk-prog__label">${esc(label)}</span>` +
    `<span class="mk-prog__pct">${pct}%</span></div>` +
    `<div class="mk-prog__track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(label)}">` +
    `<span class="mk-prog__fill" style="width:${pct}%"></span></div>` +
    (detail ? `<p class="mk-prog__detail">${detail}</p>` : '') +
    (resumable
      ? '<p class="mk-prog__detail mk-prog__detail--strong">Interrupted transfers resume from where they stopped. Closing this tab does not lose the upload.</p>'
      : '') +
    '</div>'
  );
}

/**
 * The import pipeline, as stages you can re-run and inspect (G-17).
 *
 * Each stage is a place, not a step in an animation: the failed one names what
 * it read and what it could not, and the ones after it are explicitly
 * *waiting* rather than blank.
 */
export function pipeline(stages) {
  const body = stages
    .map(
      (s, i) =>
        `<li class="mk-pipe__stage mk-pipe__stage--${s.state}">` +
        `<span class="mk-pipe__n" aria-hidden="true">${s.state === 'done' ? '✓' : s.state === 'fail' ? '▲' : i + 1}</span>` +
        `<span class="mk-pipe__text"><span class="mk-pipe__name">${esc(s.name)}</span>` +
        `<span class="mk-pipe__detail">${esc(s.detail)}</span>` +
        (s.rerun ? '<button type="button" class="mk-linkbtn">Re-run this stage</button>' : '') +
        '</span></li>',
    )
    .join('');
  return `<ol class="mk-pipe">${body}</ol>`;
}

/**
 * A message about something that just happened, or is about to.
 *
 * `tone` carries a glyph as well as a colour, and `undo` is a real control
 * rather than a sentence: QB-7 says reversibility is visible, and the cheapest
 * place to make that true is the confirmation itself.
 */
export function toast({ tone = 'info', headline, detail, undo, dismissible = true }) {
  const glyph = { info: 'i', good: '✓', warn: '!', bad: '▲' }[tone];
  return (
    `<div class="mk-toast mk-toast--${tone}" role="${tone === 'bad' ? 'alert' : 'status'}">` +
    `<span class="mk-toast__glyph" aria-hidden="true">${glyph}</span>` +
    `<div class="mk-toast__text"><p class="mk-toast__headline">${headline}</p>` +
    (detail ? `<p class="mk-toast__detail">${detail}</p>` : '') +
    '</div>' +
    (undo ? `<button type="button" class="mk-btn mk-btn--sm">${esc(undo)}</button>` : '') +
    (dismissible ? '<button type="button" class="mk-iconbtn mk-iconbtn--ghost" aria-label="Dismiss">×</button>' : '') +
    '</div>'
  );
}

/**
 * Somebody else changed this while you were looking at it (G-EXP-12, EX-15).
 *
 * The rule is that a stale write is refused and shown, never merged and never
 * silently overwritten. The banner names *who* and *what*, because "this
 * record changed" leaves the reader to diff two screens from memory.
 */
export function conflictBanner({ who, at, what, mine, theirs }) {
  return (
    '<div class="mk-conflict" role="alert">' +
    `<p class="mk-conflict__headline"><span aria-hidden="true">⇄</span> ${esc(who)} changed this at ${esc(at)}, while you were editing.</p>` +
    `<p class="mk-conflict__detail">${esc(what)} Your change has <strong>not</strong> been written and nothing has been lost.</p>` +
    '<div class="mk-conflict__diff">' +
    `<div class="mk-conflict__side"><span class="mk-conflict__who">Now on the record</span><span class="mk-conflict__val">${esc(theirs)}</span></div>` +
    `<div class="mk-conflict__side mk-conflict__side--mine"><span class="mk-conflict__who">Yours, unsaved</span><span class="mk-conflict__val">${esc(mine)}</span></div>` +
    '</div>' +
    '<div class="mk-conflict__actions">' +
    '<button type="button" class="mk-btn mk-btn--primary">Keep mine and supersede theirs</button>' +
    '<button type="button" class="mk-btn">Take theirs and discard mine</button>' +
    '<button type="button" class="mk-btn">Open both in lineage</button>' +
    '</div></div>'
  );
}

/**
 * What this change would touch, before it is made (G-EXP-5, PP6).
 *
 * The zero rows matter as much as the large ones — "0 historical evaluations"
 * is the fact that makes the change safe, and omitting it because it is not
 * alarming leaves the reader to assume the worst or, worse, to assume nothing.
 */
export function blastRadius({ lede, rows, action, cancel = 'Cancel', danger = false, reversible }) {
  const body = rows
    .map(
      (r) =>
        `<li class="mk-blast__row"><span class="mk-blast__what">${esc(r.what)}</span>` +
        `<span class="mk-blast__n${String(r.n).startsWith('0') ? ' mk-blast__n--nil' : ''}">${esc(r.n)}</span></li>`,
    )
    .join('');
  return (
    '<div class="mk-blast">' +
    `<p class="mk-blast__lede">${lede}</p>` +
    `<ul class="mk-blast__list">${body}</ul>` +
    `<p class="mk-blast__rev">${reversible ?? 'Reversible — this is recorded as a change, and the previous state stays readable.'}</p>` +
    '<div class="mk-blast__actions">' +
    `<button type="button" class="mk-btn ${danger ? 'mk-btn--danger' : 'mk-btn--primary'}">${esc(action)}</button>` +
    `<button type="button" class="mk-btn">${esc(cancel)}</button>` +
    '</div></div>'
  );
}

/** A one-line receipt for something that was just written, with its way back. */
export function receipt({ headline, facts: pairs, undo, next }) {
  return (
    '<div class="mk-receipt" role="status">' +
    `<p class="mk-receipt__headline"><span aria-hidden="true">✓</span> ${headline}</p>` +
    `<dl class="mk-receipt__facts">${pairs
      .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`)
      .join('')}</dl>` +
    '<div class="mk-receipt__actions">' +
    (next ? `<a class="mk-btn mk-btn--primary" href="#${esc(next.target)}">${esc(next.label)}</a>` : '') +
    (undo ? `<button type="button" class="mk-btn">${esc(undo)}</button>` : '') +
    '</div></div>'
  );
}

/** A status word with a shape in front of it, so greyscale keeps the meaning. */
export function status(text, tone = 'neutral') {
  const glyph = { good: '●', warn: '◐', bad: '■', neutral: '○', info: '◇' }[tone];
  return `<span class="mk-status mk-status--${tone}"><span class="mk-status__glyph" aria-hidden="true">${glyph}</span>${esc(text)}</span>`;
}

/* ==================================================================== *
 * Utility and assistance
 * ==================================================================== */

/** A key, drawn as a key. */
export function kbd(keys) {
  return String(keys)
    .split(' then ')
    .map((seq) =>
      seq
        .split(' ')
        .map((k) => `<kbd class="mk-kbd">${esc(k)}</kbd>`)
        .join(''),
    )
    .join('<span class="mk-kbd__then">then</span>');
}

/**
 * A glossary term, marked as one.
 *
 * G-06 binds the vocabulary and `scripts/check-glossary.mjs` defends it, but a
 * bound vocabulary the reader has not learned yet is still jargon. The dotted
 * underline is the offer of a definition, and it is deliberately quiet —
 * marking every domain noun on a dense register would underline half the page.
 */
export function term(word, definition) {
  return `<span class="mk-term" title="${esc(definition)}" tabindex="0" role="button">${esc(word)}</span>`;
}

/** Why the product did that — the answer, next to the thing it did. */
export function why(text) {
  return (
    '<span class="mk-why">' +
    '<button type="button" class="mk-why__btn" aria-label="Why this happened">?</button>' +
    `<span class="mk-why__body">${text}</span></span>`
  );
}

/** Export exactly what is on screen, in the format asked for (G-EXP-14, G-40). */
export function exportMenu({ open = false } = {}) {
  const items = [
    ['Excel workbook (.xlsx)', 'Exactly these rows, these columns, this filter. Censored values keep their notation; numbers stay numbers.'],
    ['CSV (.csv)', 'The same rows, flat. Censoring survives as text; formatting does not.'],
    ['Word table (.docx)', 'Into the customer template, numbered as it would be in the report.'],
    ['Vector figure (.svg)', 'The figure beside this table, at 180 mm print width.'],
  ];
  return (
    '<div class="mk-menu">' +
    `<button type="button" class="mk-btn" aria-expanded="${open}" aria-haspopup="menu">Export ▾</button>` +
    (open
      ? '<div class="mk-menu__list" role="menu">' +
        '<p class="mk-menu__lede">Exports what is on screen — this filter, these columns, this sort.</p>' +
        items
          .map(
            ([label, detail]) =>
              `<button type="button" class="mk-menu__item" role="menuitem"><span class="mk-menu__main">${esc(label)}</span>` +
              `<span class="mk-menu__detail">${esc(detail)}</span></button>`,
          )
          .join('') +
        '</div>'
      : '') +
    '</div>'
  );
}

/**
 * The lineage affordance (G-EXP-3).
 *
 * Every displayed value opens its lineage without leaving the screen, which is
 * the reason this is a slide-over and not a route: the question "why is this
 * number what it is" is asked *while comparing it to its neighbours*, and an
 * answer that costs you the comparison is worth much less.
 */
export function lineageButton(label = 'Lineage') {
  return `<button type="button" class="mk-lin" data-slideover="lineage-panel"><span aria-hidden="true">⌥</span>${esc(label)}</button>`;
}

/** The panel that opens over the screen, and never replaces it. */
export function slideOver({ id, title, subtitle, body, footer, open = false }) {
  return (
    `<aside class="mk-slide" id="${esc(id)}" data-open="${open}" role="dialog" aria-modal="false" aria-label="${esc(title)}">` +
    '<header class="mk-slide__head">' +
    `<div><h2 class="mk-slide__title">${esc(title)}</h2>` +
    (subtitle ? `<p class="mk-slide__sub">${subtitle}</p>` : '') +
    '</div>' +
    '<button type="button" class="mk-iconbtn mk-iconbtn--ghost" data-slideclose aria-label="Close panel">×</button>' +
    '</header>' +
    `<div class="mk-slide__body">${body}</div>` +
    (footer ? `<footer class="mk-slide__foot">${footer}</footer>` : '') +
    '</aside>'
  );
}

/** A dialog for the decisions that genuinely stop the world. */
export function dialog({ title, body, confirm, cancel = 'Cancel', danger = false, typeToConfirm }) {
  return (
    '<div class="mk-dialog" role="dialog" aria-modal="true" aria-label="' + esc(title) + '">' +
    `<h2 class="mk-dialog__title">${esc(title)}</h2>` +
    `<div class="mk-dialog__body">${body}</div>` +
    (typeToConfirm
      ? `<label class="mk-dialog__confirm">Type <code>${esc(typeToConfirm)}</code> to confirm` +
        `<input class="mk-input mk-input--mono" type="text" placeholder="${esc(typeToConfirm)}"></label>`
      : '') +
    '<div class="mk-dialog__actions">' +
    `<button type="button" class="mk-btn">${esc(cancel)}</button>` +
    `<button type="button" class="mk-btn ${danger ? 'mk-btn--danger' : 'mk-btn--primary'}"${typeToConfirm ? ' disabled' : ''}>${esc(confirm)}</button>` +
    '</div></div>'
  );
}

/** A button, in the scaffolding namespace. */
export function btn(label, kind = '', { disabled = false, title } = {}) {
  return (
    `<button type="button" class="mk-btn${kind ? ` mk-btn--${kind}` : ''}"` +
    `${disabled ? ' disabled' : ''}${title ? ` title="${esc(title)}"` : ''}>${esc(label)}</button>`
  );
}

/** A card — the unit the queue, the board and the gallery are all made of. */
export function card({ tone = 'neutral', head, body, foot }) {
  return (
    `<article class="mk-card mk-card--${tone}">` +
    (head ? `<header class="mk-card__head">${head}</header>` : '') +
    `<div class="mk-card__body">${body}</div>` +
    (foot ? `<footer class="mk-card__foot">${foot}</footer>` : '') +
    '</article>'
  );
}
