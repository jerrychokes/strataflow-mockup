/**
 * The viewer, and the interaction layer the product has not needed yet.
 *
 * `build.mjs` inlines `apps/web/app/styles/app.css` verbatim and then appends
 * this. The split is deliberate and it is the honest one: everything in that
 * file is implemented and approved, everything in this one is a proposal. A
 * single stylesheet would make the two indistinguishable in a screenshot,
 * which is exactly the confusion a mockup of mostly-unbuilt screens must not
 * create.
 *
 * Nothing here restates a token. Every colour, size and spacing resolves to a
 * `--sf-` custom property from the product's own `:root`, so a token changed
 * there moves this on the next build. The handful of literals below are the
 * viewer chrome — the dark rail, which is deliberately *not* the product.
 *
 * ## The chrome is dark on purpose
 *
 * The approved direction is a light near-monochrome instrument register and
 * the canvas renders exactly that. Framing it in a dark rail keeps the viewer
 * visibly distinct from the thing viewed: a screenshot of this file cannot be
 * mistaken for a screenshot of the product, which matters when most of the
 * screens shown do not exist.
 */

export const CHROME_CSS = `

/* ==================================================================== *
 * Viewer shell
 * ==================================================================== */

:root {
  --mk-chrome: #171b1f;
  --mk-chrome-2: #21272d;
  --mk-chrome-3: #2b3238;
  --mk-chrome-ink: #e6eaee;
  --mk-chrome-muted: #8d99a5;
  --mk-chrome-rule: #2e363d;
  --mk-good: #2f6b46;
  --mk-warn: #8a5a12;
  --mk-bad: #b3300c;
  --mk-new: #14607a;
  --mk-good-bg: #f1f7f3;
  --mk-warn-bg: #fdf7ea;
  --mk-bad-bg: #fdf1ee;
  --mk-new-bg: #eef4f6;
  --mk-good-line: #b9d3c3;
  --mk-warn-line: #e3cf9f;
  --mk-bad-line: #e0b3a6;
  --mk-new-line: #b6d3dc;
  --mk-focus: 0 0 0 2px var(--sf-ground), 0 0 0 4px var(--sf-accent);
  --mk-cols: 3fr 2fr;
}

html, body { background: var(--mk-chrome); }
* { scrollbar-color: #4a545e transparent; }

.mk-app { display: grid; grid-template-columns: 292px minmax(0, 1fr); min-height: 100vh; }
@media (max-width: 900px) { .mk-app { grid-template-columns: 1fr; } }

/* ---- rail ---- */
.mk-rail {
  background: var(--mk-chrome); color: var(--mk-chrome-ink);
  border-right: 1px solid var(--mk-chrome-rule);
  padding: 1rem 0 3rem; position: sticky; top: 0; height: 100vh;
  overflow-y: auto; overscroll-behavior: contain;
}
.mk-rail__brand { padding: 0 1rem .85rem; border-bottom: 1px solid var(--mk-chrome-rule); }
.mk-rail__name { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
.mk-rail__sub { font-size: 11px; color: var(--mk-chrome-muted); margin-top: 3px; line-height: 1.45; }
.mk-rail__tools { padding: .8rem 1rem .2rem; display: grid; gap: .5rem; }
.mk-rail__find {
  width: 100%; background: var(--mk-chrome-2); border: 1px solid var(--mk-chrome-rule);
  color: var(--mk-chrome-ink); font: inherit; font-size: 12px; padding: .35rem .55rem;
  border-radius: 3px;
}
.mk-rail__find::placeholder { color: #6f7b87; }
.mk-rail__find:focus-visible { outline: 2px solid var(--mk-new); outline-offset: 1px; }
.mk-rail__seg { display: flex; gap: 2px; background: var(--mk-chrome-2); padding: 2px; border-radius: 3px; }
.mk-rail__seg button {
  flex: 1; background: none; border: 0; color: var(--mk-chrome-muted); font: inherit;
  font-size: 10.5px; padding: .28rem .2rem; border-radius: 2px; cursor: pointer; line-height: 1.2;
}
.mk-rail__seg button[aria-pressed="true"] { background: var(--mk-chrome-3); color: #fff; font-weight: 600; }
.mk-rail__seg button:focus-visible { outline: 2px solid var(--mk-new); outline-offset: -1px; }
.mk-rail__job { margin-top: 1rem; padding: 0 1rem; }
.mk-rail__job[hidden] { display: none; }
.mk-rail__jobhead { display: flex; gap: .5em; align-items: baseline; }
.mk-rail__jobn { font-size: 10px; font-weight: 700; color: #4da3c2; font-family: var(--sf-font-data); }
.mk-rail__jobtitle { font-size: 11.5px; font-weight: 600; color: var(--mk-chrome-ink); line-height: 1.35; }
.mk-rail__who { font-size: 10px; color: var(--mk-chrome-muted); margin: 2px 0 .4rem 0; font-family: var(--sf-font-data); }
.mk-rail__list { list-style: none; margin: 0; padding: 0; }
.mk-rail__list li[hidden] { display: none; }
.mk-rail__screen {
  display: flex; align-items: center; gap: .5em; width: 100%; text-align: left;
  background: none; border: 0; cursor: pointer; color: var(--mk-chrome-muted);
  font: inherit; font-size: 12px; padding: .3rem .5rem; border-radius: 3px; line-height: 1.3;
}
.mk-rail__screen:hover { background: var(--mk-chrome-2); color: var(--mk-chrome-ink); }
.mk-rail__screen[aria-current="true"] { background: var(--mk-chrome-3); color: #fff; font-weight: 600; }
.mk-rail__screen:focus-visible { outline: 2px solid var(--mk-new); outline-offset: 1px; }
.mk-rail__new { font-size: 8.5px; font-weight: 700; letter-spacing: .06em; color: #4da3c2;
  border: 1px solid #2f5d6e; border-radius: 2px; padding: 0 3px; margin-left: auto; flex: 0 0 auto; }
.mk-dot { width: 7px; height: 7px; border-radius: 50%; flex: 0 0 auto; }
.mk-dot--good { background: #4c9a6c; }
.mk-dot--warn { background: #d59a2e; }
.mk-dot--bad { background: #d1553a; }
.mk-dot--new { background: #3f9dbd; }
.mk-rail__key { margin: 1.4rem 1rem 0; padding-top: .8rem; border-top: 1px solid var(--mk-chrome-rule); font-size: 10.5px; color: var(--mk-chrome-muted); }
.mk-rail__key div { display: flex; gap: .5em; align-items: center; margin-bottom: .35rem; line-height: 1.35; }
/* Two classes, and after: the entry rule above is (0,1,1) and would otherwise
   keep this sentence in a flex row with the dots. */
.mk-rail__key .mk-rail__keynote { display: block; margin-top: .7rem; padding-top: .5rem;
  border-top: 1px dotted var(--mk-chrome-rule); line-height: 1.4; }
.mk-rail__empty { padding: 1.5rem 1rem; font-size: 11.5px; color: var(--mk-chrome-muted); line-height: 1.5; }
.mk-rail__empty[hidden] { display: none; }

/* ---- app canvas ---- */
.mk-main { background: var(--sf-ground); min-width: 0; position: relative; }
.mk-canvas { padding: 0 0 4rem; }
.mk-banner {
  background: #fdf6e6; border-bottom: 1px solid #e6d5ab; color: #6b5416;
  font-size: 11.5px; padding: .5rem 1.6rem; line-height: 1.5;
}
.mk-screen { display: none; padding: 0 1.6rem; }
.mk-screen[data-active="true"] { display: block; }

/* ==================================================================== *
 * Product chrome — the top bar a real signed-in session would carry
 * ==================================================================== */

.mk-chrome-head { position: sticky; top: 0; z-index: 30; background: var(--sf-ground); }
.mk-top {
  display: flex; align-items: center; gap: .7rem; padding: .5rem 1.6rem;
  border-bottom: 1px solid var(--sf-rule); background: var(--sf-ground); flex-wrap: wrap;
}
.mk-top__mark { font-size: 13px; font-weight: 600; letter-spacing: -0.01em; white-space: nowrap; }
@media (max-width: 1150px) { .mk-top__mark { display: none; } }
.mk-top__spacer { flex: 1 1 auto; }

.mk-switch-proj {
  display: flex; align-items: center; gap: .45rem; background: var(--sf-surface);
  border: 1px solid var(--sf-rule); border-radius: var(--sf-radius-sm);
  padding: .22rem .5rem; font: inherit; font-size: 12px; cursor: pointer; color: var(--sf-ink);
}
.mk-switch-proj:hover { border-color: var(--sf-rule-strong); }
.mk-switch-proj:focus-visible { outline: none; box-shadow: var(--mk-focus); }
.mk-switch-proj__code { font-family: var(--sf-font-data); font-weight: 600; font-size: 11.5px; }
.mk-switch-proj__role {
  font-size: 9.5px; text-transform: uppercase; letter-spacing: .05em; font-weight: 700;
  color: var(--sf-ink-muted); border-left: 1px solid var(--sf-rule); padding-left: .45rem;
}
.mk-switch-proj__caret { color: var(--sf-ink-muted); font-size: 10px; }

.mk-search {
  display: flex; align-items: center; gap: .4rem; min-width: 150px; max-width: 380px; flex: 1 1 180px;
  background: var(--sf-surface); border: 1px solid var(--sf-rule);
  border-radius: var(--sf-radius-sm); padding: .2rem .5rem;
}
.mk-search:focus-within { border-color: var(--sf-accent); background: var(--sf-ground); }
.mk-search__glyph { color: var(--sf-ink-muted); font-size: 12px; }
.mk-search input { flex: 1; border: 0; background: none; font: inherit; font-size: 12px; padding: .15rem 0; color: var(--sf-ink); }
.mk-search input:focus { outline: none; }
.mk-search input::placeholder { color: #8b97a3; }
.mk-search__kbd { font-size: 9.5px; color: var(--sf-ink-muted); border: 1px solid var(--sf-rule);
  border-radius: 2px; padding: 0 3px; font-family: var(--sf-font-data); }

.mk-top__link { font-size: 12px; color: var(--sf-ink-muted); text-decoration: none; padding: .2rem .3rem; border-radius: 2px; }
.mk-top__link:hover { color: var(--sf-ink); background: var(--sf-surface); }
.mk-top__link:focus-visible { outline: none; box-shadow: var(--mk-focus); }
.mk-top__me { display: flex; align-items: center; gap: .4rem; font-size: 11.5px; color: var(--sf-ink-muted); }
.mk-top__avatar {
  width: 22px; height: 22px; border-radius: 50%; background: var(--sf-surface);
  box-shadow: inset 0 0 0 1px var(--sf-rule-strong); display: grid; place-items: center;
  font-size: 9.5px; font-weight: 700; font-family: var(--sf-font-data); color: var(--sf-ink);
}

.mk-sections { display: flex; gap: .1rem; padding: 0 1.6rem; border-bottom: 1px solid var(--sf-rule);
  background: var(--sf-ground); overflow-x: auto; }
.mk-section {
  font-size: 12.5px; text-decoration: none; color: var(--sf-ink-muted); white-space: nowrap;
  padding: .55rem .7rem; border-bottom: 2px solid transparent; min-height: 34px; display: flex; align-items: center;
}
.mk-section:hover { color: var(--sf-ink); background: var(--sf-surface); }
.mk-section--current { color: var(--sf-ink); border-bottom-color: var(--sf-ink); font-weight: 600; }
.mk-section:focus-visible { outline: none; box-shadow: var(--mk-focus); }
@media (pointer: coarse) { .mk-section { min-height: 44px; } }

.mk-crumb { padding: .5rem 0 .1rem; }
.mk-crumb__list { list-style: none; display: flex; flex-wrap: wrap; align-items: baseline; gap: .35rem; margin: 0; padding: 0; }
.mk-crumb__link { font-size: 11.5px; color: var(--sf-ink-muted); text-decoration: none; }
.mk-crumb__link:hover { color: var(--sf-accent); text-decoration: underline; }
.mk-crumb__here { font-size: 11.5px; color: var(--sf-ink); font-weight: 600; }
.mk-crumb__sep { color: #b6c0ca; font-size: 11px; }

/* ==================================================================== *
 * Page furniture
 * ==================================================================== */

.mk-head { display: flex; gap: 1.5rem; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; margin-bottom: .9rem; }
.mk-head h1 { font-size: 23px; font-weight: 600; letter-spacing: -0.015em; margin: 0 0 .2rem; }
.mk-head .sf-lede { margin: 0; font-size: 13px; max-width: 74ch; }
.mk-route { margin: .35rem 0 0; font-size: 11px; color: var(--sf-ink-muted); }
.mk-route code { font-family: var(--sf-font-data); font-size: 10.5px; background: var(--sf-surface); padding: .1rem .35rem; border-radius: 3px; }
.mk-toolbar { display: flex; gap: .4rem; flex-wrap: wrap; align-items: flex-start; }
.mk-h2 { font-size: 15px; font-weight: 600; margin: 0 0 .6rem; }
.mk-h3 { font-size: 12px; font-weight: 700; margin: 1.1rem 0 .45rem; text-transform: uppercase; letter-spacing: .05em; color: var(--sf-ink-muted); }

.mk-tabs { display: flex; gap: .1rem; border-bottom: 1px solid var(--sf-rule); margin-bottom: 1rem; overflow-x: auto; }
.mk-tab {
  display: flex; align-items: center; gap: .35rem; background: none; border: 0; cursor: pointer;
  font: inherit; font-size: 12.5px; color: var(--sf-ink-muted); padding: .45rem .7rem;
  border-bottom: 2px solid transparent; white-space: nowrap; min-height: 34px;
}
.mk-tab:hover { color: var(--sf-ink); background: var(--sf-surface); }
.mk-tab--current { color: var(--sf-ink); font-weight: 600; border-bottom-color: var(--sf-ink); }
.mk-tab:focus-visible { outline: none; box-shadow: var(--mk-focus); }
.mk-tab__count { font-family: var(--sf-font-data); font-size: 10.5px; background: var(--sf-surface);
  border-radius: 8px; padding: 0 .35rem; color: var(--sf-ink-muted); }
.mk-tab--current .mk-tab__count { background: var(--sf-ink); color: var(--sf-ground); }
.mk-tab__dot { width: 6px; height: 6px; border-radius: 50%; }
.mk-tab__dot--bad { background: var(--mk-bad); }
.mk-tab__dot--warn { background: var(--mk-warn); }
@media (pointer: coarse) { .mk-tab { min-height: 44px; } }

.mk-stats { display: flex; gap: .55rem; flex-wrap: wrap; margin-bottom: 1rem; }
.mk-stat {
  flex: 1 1 120px; padding: .6rem .8rem; border-radius: 4px;
  box-shadow: inset 0 0 0 1px var(--sf-rule); background: var(--sf-ground);
  border-left: 3px solid var(--sf-rule-strong);
}
.mk-stat--good { border-left-color: var(--mk-good); }
.mk-stat--warn { border-left-color: var(--mk-warn); }
.mk-stat--bad { border-left-color: var(--mk-bad); }
.mk-stat__value { display: block; font-family: var(--sf-font-data); font-size: 21px; font-weight: 500; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.mk-stat__label { display: block; font-size: 10.5px; color: var(--sf-ink-muted); margin-top: 1px; }

.mk-cols { display: grid; grid-template-columns: var(--mk-cols); gap: 1rem; align-items: start; margin-bottom: 1rem; }
@media (max-width: 1100px) { .mk-cols { grid-template-columns: 1fr; } }
/*
 * Pass 4, measured: a grid item's min-width is auto, so one unwrappable line
 * anywhere in a panel set the track wider than the viewport and every panel
 * in the pair overflowed the document by the same amount — ten screens at
 * 375px, two at 1280. min-width: 0 lets the track shrink to the column and
 * pushes the question down to the content, where the rules below answer it.
 */
.mk-cols > * { min-width: 0; }


.mk-tag { display: inline-block; font-size: 10.5px; font-weight: 600; padding: .1rem .4rem; border-radius: 3px; white-space: nowrap; border: 1px solid; }
.mk-tag--good { color: var(--mk-good); border-color: var(--mk-good-line); background: var(--mk-good-bg); }
.mk-tag--warn { color: var(--mk-warn); border-color: var(--mk-warn-line); background: var(--mk-warn-bg); }
.mk-tag--bad { color: var(--mk-bad); border-color: var(--mk-bad-line); background: var(--mk-bad-bg); }
.mk-tag--neutral { color: var(--sf-ink-muted); border-color: var(--sf-rule); background: var(--sf-surface); }
.mk-tag--new { color: var(--mk-new); border-color: var(--mk-new-line); background: var(--mk-new-bg); }

.mk-num { font-family: var(--sf-font-data); font-variant-numeric: tabular-nums; font-size: 12.5px; }
.mk-num--good { color: var(--mk-good); font-weight: 600; }
.mk-num--warn { color: var(--mk-warn); font-weight: 600; }
.mk-num--bad { color: var(--mk-bad); font-weight: 600; }
.mk-num--nil { color: #a9b4bf; }
.mk-muted { color: var(--sf-ink-muted); font-size: 12px; }
.mk-file { font-family: var(--sf-font-data); font-size: 11.5px; }
.mk-tight { margin: 0 0 .55rem; font-size: 12.5px; line-height: 1.55; }
.mk-tight:last-child { margin-bottom: 0; }
.mk-actions { display: flex; gap: .4rem; margin-top: .7rem; flex-wrap: wrap; }
.mk-option--proposed { border-color: var(--sf-ink) !important; font-weight: 600; }

.mk-ref { color: var(--sf-accent); text-decoration: none; border-bottom: 1px solid rgba(20,96,122,.32); }
.mk-ref:hover { border-bottom-color: var(--sf-accent); background: var(--mk-new-bg); }
.mk-ref:focus-visible { outline: 2px solid var(--sf-accent); outline-offset: 1px; }
.mk-ref--loc { font-family: var(--sf-font-data); font-size: 12.5px; }
.mk-related {
  display: flex; flex-wrap: wrap; gap: .45rem .7rem; align-items: baseline;
  margin-top: 2rem; padding-top: .75rem; border-top: 1px solid var(--sf-rule);
}
.mk-related__lede { font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--sf-ink-muted); }
.mk-related .mk-ref { font-size: 12px; }

.sf-facts--grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: .6rem 1.2rem; margin: 0; }
.sf-facts--grid dt { font-size: 10.5px; color: var(--sf-ink-muted); font-weight: 600; }
.sf-facts--grid dd { margin: 1px 0 0; font-size: 12.5px; }

/* ==================================================================== *
 * Buttons
 * ==================================================================== */

.mk-btn {
  font: inherit; font-size: 12px; padding: .3rem .65rem; min-height: 28px;
  border: 1px solid var(--sf-rule-strong); background: var(--sf-ground); color: var(--sf-ink);
  border-radius: var(--sf-radius-sm); cursor: pointer; text-decoration: none;
  display: inline-flex; align-items: center; gap: .35rem; white-space: nowrap;
}
.mk-btn:hover { background: var(--sf-surface); }
.mk-btn:focus-visible { outline: none; box-shadow: var(--mk-focus); }
.mk-btn[disabled] { opacity: .45; cursor: not-allowed; }
.mk-btn--primary { background: var(--sf-ink); border-color: var(--sf-ink); color: var(--sf-ground); font-weight: 600; }
.mk-btn--primary:hover { background: #23292f; }
.mk-btn--danger { background: var(--sf-ground); border-color: var(--mk-bad); color: var(--mk-bad); font-weight: 600; }
.mk-btn--danger:hover { background: var(--mk-bad-bg); }
.mk-btn--sm { font-size: 11px; padding: .18rem .45rem; min-height: 24px; }
@media (pointer: coarse) { .mk-btn { min-height: 44px; padding: .4rem .8rem; } }

.mk-iconbtn {
  font: inherit; font-size: 13px; width: 26px; height: 26px; display: grid; place-items: center;
  border: 1px solid var(--sf-rule); background: var(--sf-ground); color: var(--sf-ink);
  border-radius: var(--sf-radius-sm); cursor: pointer;
}
.mk-iconbtn:hover { background: var(--sf-surface); }
.mk-iconbtn:focus-visible { outline: none; box-shadow: var(--mk-focus); }
.mk-iconbtn[disabled] { opacity: .4; cursor: not-allowed; }
.mk-iconbtn--ghost { border-color: transparent; background: none; color: var(--sf-ink-muted); }
.mk-iconbtn--ghost:hover { background: var(--sf-surface); color: var(--sf-ink); }
@media (pointer: coarse) { .mk-iconbtn { width: 44px; height: 44px; } }

.mk-linkbtn {
  font: inherit; font-size: 11.5px; background: none; border: 0; padding: 0;
  color: var(--sf-accent); cursor: pointer; text-decoration: underline; text-underline-offset: 2px;
}
.mk-linkbtn:hover { color: var(--sf-ink); }
.mk-linkbtn:focus-visible { outline: 2px solid var(--sf-accent); outline-offset: 2px; }

/* ==================================================================== *
 * Form controls
 * ==================================================================== */

.mk-field { display: grid; gap: .2rem; margin-bottom: .8rem; }
.mk-field__label { font-size: 11px; font-weight: 600; color: var(--sf-ink); }
.mk-field__req { color: var(--mk-bad); margin-left: 2px; }
.mk-field__hint { margin: .1rem 0 0; font-size: 11px; color: var(--sf-ink-muted); line-height: 1.45; }
.mk-field__error { margin: .1rem 0 0; font-size: 11px; color: var(--mk-bad); font-weight: 600; line-height: 1.45; }
.mk-field--invalid .mk-input, .mk-field--invalid .mk-select { border-color: var(--mk-bad); background: var(--mk-bad-bg); }

.mk-input, .mk-select, .mk-textarea {
  font: inherit; font-size: 12.5px; padding: .3rem .5rem; min-height: 30px;
  border: 1px solid var(--sf-rule-strong); border-radius: var(--sf-radius-sm);
  background: var(--sf-ground); color: var(--sf-ink); width: 100%;
}
.mk-input:focus, .mk-select:focus, .mk-textarea:focus { outline: none; border-color: var(--sf-accent); box-shadow: 0 0 0 3px rgba(20,96,122,.14); }
.mk-input[disabled], .mk-select[disabled] { background: var(--sf-surface); color: var(--sf-ink-muted); cursor: not-allowed; }
.mk-input::placeholder { color: #97a2ad; }
.mk-input--mono { font-family: var(--sf-font-data); font-size: 12px; }
.mk-input--num { text-align: right; font-variant-numeric: tabular-nums; }
.mk-input--date { width: 8.5rem; }
.mk-textarea { line-height: 1.55; resize: vertical; }
.mk-select { appearance: none; padding-right: 1.5rem;
  background-image: linear-gradient(45deg, transparent 50%, var(--sf-ink-muted) 50%), linear-gradient(135deg, var(--sf-ink-muted) 50%, transparent 50%);
  background-position: calc(100% - 14px) 13px, calc(100% - 9px) 13px; background-size: 5px 5px, 5px 5px; background-repeat: no-repeat; }
.mk-select--sm { min-height: 24px; padding: .1rem 1.4rem .1rem .35rem; font-size: 11px; width: auto;
  background-position: calc(100% - 12px) 10px, calc(100% - 7px) 10px; }
@media (pointer: coarse) { .mk-input, .mk-select, .mk-textarea { min-height: 44px; } }
/* W1-A-5: check, radio and switch are form controls too, not inline links. */
@media (pointer: coarse) { label.mk-check, label.mk-radio, label.mk-switch { min-height: 44px; display: inline-flex; align-items: center; } }

.mk-inputgroup { display: flex; align-items: stretch; }
.mk-inputgroup .mk-input { border-radius: var(--sf-radius-sm) 0 0 var(--sf-radius-sm); border-right: 0; }
.mk-adorn {
  display: flex; align-items: center; padding: 0 .5rem; font-family: var(--sf-font-data); font-size: 11.5px;
  color: var(--sf-ink-muted); background: var(--sf-surface); border: 1px solid var(--sf-rule-strong);
  border-radius: 0 var(--sf-radius-sm) var(--sf-radius-sm) 0; white-space: nowrap;
}
.mk-adorn--select { appearance: none; cursor: pointer; padding-right: 1.3rem; color: var(--sf-ink); width: auto;
  background-image: linear-gradient(45deg, transparent 50%, var(--sf-ink-muted) 50%), linear-gradient(135deg, var(--sf-ink-muted) 50%, transparent 50%);
  background-position: calc(100% - 12px) calc(50% + 2px), calc(100% - 7px) calc(50% + 2px); background-size: 5px 5px, 5px 5px; background-repeat: no-repeat; }
.mk-inputgroup__aside { display: flex; align-items: center; padding-left: .5rem; font-size: 11px; color: var(--sf-ink-muted); white-space: nowrap; }

.mk-combo { position: relative; }
.mk-combo__caret { position: absolute; right: .5rem; top: 8px; color: var(--sf-ink-muted); font-size: 10px; pointer-events: none; }
.mk-combo__list {
  list-style: none; margin: 2px 0 0; padding: 3px; position: absolute; z-index: 20; left: 0; right: 0;
  background: var(--sf-ground); border: 1px solid var(--sf-rule-strong); border-radius: var(--sf-radius-sm);
  box-shadow: var(--sf-elevation-overlay); max-height: 260px; overflow-y: auto;
}
.mk-combo__opt { display: grid; grid-template-columns: 1fr auto; gap: .1rem .6rem; padding: .35rem .5rem; border-radius: 2px; cursor: pointer; align-items: center; }
.mk-combo__opt:hover { background: var(--sf-surface); }
.mk-combo__opt--active { background: var(--mk-new-bg); box-shadow: inset 2px 0 0 var(--sf-accent); }
.mk-combo__main { font-size: 12.5px; }
.mk-combo__detail { grid-column: 1 / -1; font-size: 11px; color: var(--sf-ink-muted); line-height: 1.4; }
.mk-combo__opt--escape { border-top: 1px solid var(--sf-rule); margin-top: 3px; padding-top: .45rem; }
.mk-combo__opt--escape .mk-combo__main { font-weight: 600; }

.mk-conf { display: inline-flex; align-items: center; gap: .35rem; }
.mk-conf__track { width: 46px; height: 5px; background: var(--sf-surface); box-shadow: inset 0 0 0 1px var(--sf-rule); border-radius: 3px; overflow: hidden; }
.mk-conf__fill { display: block; height: 100%; background: var(--sf-rule-strong); }
.mk-conf--high .mk-conf__fill { background: var(--mk-good); }
.mk-conf--mid .mk-conf__fill { background: var(--mk-warn); }
.mk-conf--low .mk-conf__fill { background: var(--mk-bad); }
.mk-conf__pct { font-family: var(--sf-font-data); font-size: 10.5px; color: var(--sf-ink-muted); font-variant-numeric: tabular-nums; }

.mk-check, .mk-radio { display: grid; grid-template-columns: auto 1fr; gap: .5rem; align-items: start; cursor: pointer; margin-bottom: .4rem; }
.mk-check__input, .mk-radio__input, .mk-switch__input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.mk-check__box {
  width: 15px; height: 15px; margin-top: 1px; border: 1px solid var(--sf-rule-strong); border-radius: 2px;
  background: var(--sf-ground); display: grid; place-items: center; font-size: 10px; line-height: 1;
  color: var(--sf-ground); font-weight: 700;
}
.mk-check__box--on { background: var(--sf-ink); border-color: var(--sf-ink); }
.mk-check__input:focus-visible + .mk-check__text { outline: 2px solid var(--sf-accent); outline-offset: 2px; }
.mk-check__text, .mk-radio__text { font-size: 12.5px; display: grid; gap: 1px; }
.mk-check__hint, .mk-radio__hint { font-size: 11px; color: var(--sf-ink-muted); line-height: 1.45; }
.mk-check--disabled { opacity: .5; cursor: not-allowed; }
.mk-radios { border: 0; margin: 0 0 .6rem; padding: 0; }
.mk-radios__legend { font-size: 11px; font-weight: 600; padding: 0; margin-bottom: .35rem; }
.mk-radio__dot {
  width: 15px; height: 15px; margin-top: 1px; border: 1px solid var(--sf-rule-strong); border-radius: 50%;
  background: var(--sf-ground); display: grid; place-items: center;
}
.mk-radio--on .mk-radio__dot { border-color: var(--sf-ink); border-width: 4px; }

.mk-switch { display: grid; grid-template-columns: auto 1fr; gap: .55rem; align-items: start; cursor: pointer; margin-bottom: .5rem; }
.mk-switch__track { width: 30px; height: 17px; border-radius: 9px; background: var(--sf-surface);
  box-shadow: inset 0 0 0 1px var(--sf-rule-strong); position: relative; margin-top: 1px; transition: background .1s; }
.mk-switch__thumb { position: absolute; top: 2px; left: 2px; width: 13px; height: 13px; border-radius: 50%;
  background: var(--sf-ground); box-shadow: 0 1px 2px rgba(18,22,26,.3); transition: left .1s; }
.mk-switch--on .mk-switch__track { background: var(--sf-ink); box-shadow: inset 0 0 0 1px var(--sf-ink); }
.mk-switch--on .mk-switch__thumb { left: 15px; }
.mk-switch__text { font-size: 12.5px; display: grid; gap: 1px; }
.mk-switch__state { font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--sf-ink-muted); }
.mk-switch__hint { font-size: 11px; color: var(--sf-ink-muted); line-height: 1.45; }

.mk-seg { display: inline-flex; background: var(--sf-surface); border: 1px solid var(--sf-rule); border-radius: var(--sf-radius-sm); padding: 2px; }
.mk-seg__btn { font: inherit; font-size: 11.5px; padding: .2rem .55rem; min-height: 24px; border: 0; background: none;
  color: var(--sf-ink-muted); border-radius: 2px; cursor: pointer; white-space: nowrap; }
.mk-seg__btn--on { background: var(--sf-ground); color: var(--sf-ink); font-weight: 600; box-shadow: 0 1px 2px rgba(18,22,26,.12); }
.mk-seg__btn:focus-visible { outline: none; box-shadow: var(--mk-focus); }
@media (pointer: coarse) { .mk-seg__btn { min-height: 44px; } }

.mk-daterange { display: flex; align-items: center; gap: .35rem; flex-wrap: wrap; }
.mk-daterange__dash { color: var(--sf-ink-muted); font-size: 11px; }
.mk-daterange__zone { font-size: 10.5px; color: var(--sf-ink-muted); font-family: var(--sf-font-data); }

.mk-chip { display: inline-flex; align-items: center; gap: .3rem; font-size: 11px; padding: .12rem .3rem .12rem .45rem;
  border: 1px solid var(--sf-rule); background: var(--sf-surface); border-radius: 3px; white-space: nowrap; }
.mk-chip--good { border-color: var(--mk-good-line); background: var(--mk-good-bg); }
.mk-chip--bad { border-color: var(--mk-bad-line); background: var(--mk-bad-bg); }
.mk-chip--new { border-color: var(--mk-new-line); background: var(--mk-new-bg); }
.mk-chip__prefix { font-size: 9.5px; text-transform: uppercase; letter-spacing: .05em; font-weight: 700; color: var(--sf-ink-muted); }
.mk-chip__x { border: 0; background: none; cursor: pointer; color: var(--sf-ink-muted); font-size: 13px; line-height: 1; padding: 0 1px; }
.mk-chip__x:hover { color: var(--mk-bad); }
.mk-chip__x:focus-visible { outline: 2px solid var(--sf-accent); outline-offset: 1px; }

.mk-filters { border: 1px solid var(--sf-rule); border-radius: var(--sf-radius-md); background: var(--sf-surface); margin-bottom: .9rem; }
.mk-filters__row { display: flex; flex-wrap: wrap; gap: .45rem; align-items: center; padding: .5rem .6rem; }
.mk-filters__row + .mk-filters__row { border-top: 1px solid var(--sf-rule); }
.mk-filters__row--chips { background: var(--sf-ground); border-radius: 0 0 var(--sf-radius-md) var(--sf-radius-md); }
.mk-filters__lede { font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--sf-ink-muted); }
.mk-filters__count { margin-left: auto; font-size: 11.5px; color: var(--sf-ink-muted); font-family: var(--sf-font-data); }
.mk-filters__view { font-size: 11.5px; color: var(--sf-ink-muted); }
.mk-filters__view em { color: var(--mk-warn); font-style: normal; font-weight: 600; }
.mk-filters .mk-field { margin-bottom: 0; }
.mk-filters .mk-input, .mk-filters .mk-select { width: auto; min-width: 8rem; }

.mk-selbar {
  display: flex; align-items: center; gap: .6rem; flex-wrap: wrap; padding: .45rem .7rem;
  background: var(--sf-ink); color: var(--sf-ground); border-radius: var(--sf-radius-md); margin-bottom: .7rem;
}
.mk-selbar__n { font-size: 12px; }
.mk-selbar .mk-linkbtn { color: #9dd0e2; }
.mk-selbar__actions { display: flex; gap: .35rem; margin-left: auto; flex-wrap: wrap; }
.mk-selbar .mk-btn { background: transparent; border-color: #4a545e; color: var(--sf-ground); }
.mk-selbar .mk-btn:hover { background: #2b3238; }
.mk-selbar__undo { font-size: 11px; color: #9aa6b2; }
.mk-selbar .mk-iconbtn--ghost { color: #9aa6b2; }
.mk-selbar .mk-iconbtn--ghost:hover { background: #2b3238; color: #fff; }

/* ---- file intake ---- */
.mk-drop { border: 1px dashed var(--sf-rule-strong); border-radius: var(--sf-radius-md);
  background: var(--sf-surface); padding: 1rem .9rem; text-align: center; }
.mk-drop__lede { margin: 0; font-size: 12.5px; }
.mk-drop__hint { margin: .25rem 0 0; font-size: 11px; color: var(--sf-ink-muted); line-height: 1.5; }
.mk-filelist { list-style: none; margin: .5rem 0 0; padding: 0; }
.mk-filelist li { display: flex; align-items: center; gap: .6rem; padding: .3rem .1rem;
  border-bottom: 1px solid var(--sf-rule); font-size: 12px; }
.mk-filelist li .mk-file { flex: 1; }
.mk-filelist li .mk-muted { white-space: nowrap; }

/* An escape hatch is an option, and it is deliberately not styled as a lesser one. */
.mk-option--escape { border-style: dashed !important; }

/* ==================================================================== *
 * Feedback
 * ==================================================================== */

.mk-state { padding: 1.4rem 1.2rem; border: 1px dashed var(--sf-rule-strong); border-radius: var(--sf-radius-md);
  background: var(--sf-ground); margin-bottom: 1rem; }
.mk-state--partial { border-style: solid; border-left: 3px solid var(--mk-warn); background: var(--mk-warn-bg); }
.mk-state--error { border-style: solid; border-left: 3px solid var(--mk-bad); background: var(--mk-bad-bg); }
.mk-state--loading { border-style: solid; border-color: var(--sf-rule); }
.mk-state__headline { margin: 0 0 .3rem; font-size: 13.5px; font-weight: 600; display: flex; align-items: center; gap: .45rem; }
.mk-state__glyph { color: var(--sf-ink-muted); font-size: 14px; }
.mk-state--error .mk-state__glyph { color: var(--mk-bad); }
.mk-state--partial .mk-state__glyph { color: var(--mk-warn); }
.mk-state__detail { margin: 0; font-size: 12.5px; color: var(--sf-ink-muted); line-height: 1.6; max-width: 72ch; }
.mk-state__actions { display: flex; gap: .4rem; margin-top: .8rem; flex-wrap: wrap; }

.mk-spinner { width: 12px; height: 12px; border: 2px solid var(--sf-rule); border-top-color: var(--sf-ink);
  border-radius: 50%; display: inline-block; animation: mk-spin .7s linear infinite; }
@keyframes mk-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .mk-spinner { animation-duration: 2.4s; } }

.mk-skel { display: grid; gap: .42rem; margin-top: .9rem; }
.mk-skel__row { display: block; height: var(--sf-row); display: flex; align-items: center; }
.mk-skel__bar { display: block; height: 9px; border-radius: 2px;
  background: linear-gradient(90deg, #eceff2 25%, #f5f7f9 50%, #eceff2 75%); background-size: 300% 100%;
  animation: mk-shimmer 1.6s ease-in-out infinite; }
@keyframes mk-shimmer { to { background-position: -300% 0; } }
@media (prefers-reduced-motion: reduce) { .mk-skel__bar { animation: none; background: #eceff2; } }

.mk-prog { margin-bottom: .8rem; }
.mk-prog__head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: .25rem; }
.mk-prog__label { font-size: 12px; font-weight: 600; }
.mk-prog__pct { font-family: var(--sf-font-data); font-size: 12px; font-variant-numeric: tabular-nums; }
.mk-prog__track { height: 6px; background: var(--sf-surface); box-shadow: inset 0 0 0 1px var(--sf-rule); border-radius: 3px; overflow: hidden; }
.mk-prog__fill { display: block; height: 100%; background: var(--sf-ink); }
.mk-prog--warn .mk-prog__fill { background: var(--mk-warn); }
.mk-prog__detail { margin: .25rem 0 0; font-size: 11px; color: var(--sf-ink-muted); line-height: 1.5; }
.mk-prog__detail--strong { color: var(--sf-ink); }

.mk-pipe { list-style: none; margin: 0 0 1rem; padding: 0; display: grid; gap: 0; }
.mk-pipe__stage { display: grid; grid-template-columns: auto 1fr; gap: .7rem; padding: .5rem 0; position: relative; }
.mk-pipe__stage + .mk-pipe__stage { border-top: 1px solid var(--sf-rule); }
.mk-pipe__n {
  width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; font-size: 11px;
  font-family: var(--sf-font-data); background: var(--sf-surface); box-shadow: inset 0 0 0 1px var(--sf-rule-strong);
  color: var(--sf-ink-muted);
}
.mk-pipe__stage--done .mk-pipe__n { background: var(--mk-good); color: #fff; box-shadow: none; }
.mk-pipe__stage--fail .mk-pipe__n { background: var(--mk-bad); color: #fff; box-shadow: none; }
.mk-pipe__stage--run .mk-pipe__n { box-shadow: inset 0 0 0 2px var(--sf-ink); color: var(--sf-ink); }
.mk-pipe__text { display: grid; gap: 1px; }
.mk-pipe__name { font-size: 12.5px; font-weight: 600; }
.mk-pipe__stage--wait .mk-pipe__name { color: var(--sf-ink-muted); font-weight: 500; }
.mk-pipe__detail { font-size: 11.5px; color: var(--sf-ink-muted); line-height: 1.5; }
.mk-pipe__text .mk-linkbtn { justify-self: start; margin-top: .2rem; }

.mk-toast { display: flex; align-items: flex-start; gap: .55rem; padding: .55rem .7rem; border-radius: var(--sf-radius-md);
  border: 1px solid var(--sf-rule-strong); background: var(--sf-ground); box-shadow: var(--sf-elevation-overlay); margin-bottom: .5rem; }
.mk-toast--good { border-left: 3px solid var(--mk-good); }
.mk-toast--warn { border-left: 3px solid var(--mk-warn); }
.mk-toast--bad { border-left: 3px solid var(--mk-bad); }
.mk-toast--info { border-left: 3px solid var(--sf-accent); }
.mk-toast__glyph { width: 17px; height: 17px; border-radius: 50%; display: grid; place-items: center; flex: 0 0 auto;
  font-size: 10px; font-weight: 700; margin-top: 1px; background: var(--sf-surface); color: var(--sf-ink-muted); }
.mk-toast--good .mk-toast__glyph { background: var(--mk-good); color: #fff; }
.mk-toast--warn .mk-toast__glyph { background: var(--mk-warn); color: #fff; }
.mk-toast--bad .mk-toast__glyph { background: var(--mk-bad); color: #fff; }
.mk-toast--info .mk-toast__glyph { background: var(--sf-accent); color: #fff; }
.mk-toast__text { flex: 1; }
.mk-toast__headline { margin: 0; font-size: 12.5px; font-weight: 600; }
.mk-toast__detail { margin: .1rem 0 0; font-size: 11.5px; color: var(--sf-ink-muted); line-height: 1.5; }

.mk-toaster { position: fixed; right: 1rem; bottom: 1rem; z-index: 60; width: min(380px, calc(100vw - 2rem)); }

.mk-conflict { border: 1px solid var(--mk-warn-line); border-left: 3px solid var(--mk-warn); background: var(--mk-warn-bg);
  border-radius: var(--sf-radius-md); padding: .8rem .9rem; margin-bottom: 1rem; }
.mk-conflict__headline { margin: 0 0 .25rem; font-size: 13px; font-weight: 600; }
.mk-conflict__detail { margin: 0 0 .6rem; font-size: 12px; line-height: 1.55; color: var(--sf-ink); max-width: 72ch; }
.mk-conflict__diff { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: .5rem; margin-bottom: .7rem; }
.mk-conflict__side { background: var(--sf-ground); border: 1px solid var(--sf-rule); border-radius: var(--sf-radius-sm); padding: .45rem .6rem; }
.mk-conflict__side--mine { border-style: dashed; }
.mk-conflict__who { display: block; font-size: 9.5px; text-transform: uppercase; letter-spacing: .05em; font-weight: 700; color: var(--sf-ink-muted); }
.mk-conflict__val { display: block; font-family: var(--sf-font-data); font-size: 14px; margin-top: 2px; }
.mk-conflict__actions { display: flex; gap: .4rem; flex-wrap: wrap; }

.mk-blast { border: 1px solid var(--sf-rule-strong); border-radius: var(--sf-radius-md); background: var(--sf-surface); padding: .8rem .9rem; margin-bottom: 1rem; }
.mk-blast__lede { margin: 0 0 .5rem; font-size: 12.5px; font-weight: 600; line-height: 1.5; }
.mk-blast__list { list-style: none; margin: 0 0 .6rem; padding: 0; border-top: 1px solid var(--sf-rule); }
.mk-blast__row { display: flex; justify-content: space-between; gap: 1rem; align-items: baseline; padding: .3rem 0; border-bottom: 1px solid var(--sf-rule); }
.mk-blast__what { font-size: 12px; }
.mk-blast__n { font-family: var(--sf-font-data); font-size: 12px; font-weight: 600; text-align: right; }
.mk-blast__n--nil { color: var(--sf-ink-muted); font-weight: 400; }
.mk-blast__rev { margin: 0 0 .7rem; font-size: 11.5px; color: var(--sf-ink-muted); line-height: 1.5; }
.mk-blast__actions { display: flex; gap: .4rem; flex-wrap: wrap; }

.mk-receipt { border: 1px solid var(--mk-good-line); border-left: 3px solid var(--mk-good); background: var(--mk-good-bg);
  border-radius: var(--sf-radius-md); padding: .8rem .9rem; margin-bottom: 1rem; }
.mk-receipt__headline { margin: 0 0 .5rem; font-size: 13.5px; font-weight: 600; }
.mk-receipt__facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: .5rem 1.2rem; margin: 0 0 .7rem; }
.mk-receipt__facts dt { font-size: 10px; text-transform: uppercase; letter-spacing: .05em; font-weight: 700; color: var(--sf-ink-muted); }
.mk-receipt__facts dd { margin: 1px 0 0; font-size: 12.5px; font-family: var(--sf-font-data); }
.mk-receipt__actions { display: flex; gap: .4rem; flex-wrap: wrap; }

.mk-status { display: inline-flex; align-items: baseline; gap: .3rem; font-size: 11.5px; white-space: nowrap; }
.mk-status__glyph { font-size: 9px; }
.mk-status--good { color: var(--mk-good); }
.mk-status--warn { color: var(--mk-warn); }
.mk-status--bad { color: var(--mk-bad); font-weight: 600; }
.mk-status--info { color: var(--mk-new); }
.mk-status--neutral { color: var(--sf-ink-muted); }

/* ==================================================================== *
 * Assistance
 * ==================================================================== */

.mk-kbd { font-family: var(--sf-font-data); font-size: 10.5px; border: 1px solid var(--sf-rule-strong);
  border-bottom-width: 2px; border-radius: 3px; padding: .05rem .28rem; background: var(--sf-ground);
  color: var(--sf-ink); margin-right: 2px; white-space: nowrap; }
.mk-kbd__then { font-size: 10px; color: var(--sf-ink-muted); margin: 0 .25rem; }

.mk-term { border-bottom: 1px dotted var(--sf-rule-strong); cursor: help; }
.mk-term:hover, .mk-term:focus-visible { border-bottom-color: var(--sf-accent); background: var(--mk-new-bg); outline: none; }

.mk-why { position: relative; display: inline-block; }
.mk-why__btn { width: 15px; height: 15px; border-radius: 50%; border: 1px solid var(--sf-rule-strong);
  background: var(--sf-ground); color: var(--sf-ink-muted); font: inherit; font-size: 10px; font-weight: 700;
  cursor: pointer; line-height: 1; padding: 0; vertical-align: 1px; }
.mk-why__btn:hover { border-color: var(--sf-accent); color: var(--sf-accent); }
.mk-why__btn:focus-visible { outline: none; box-shadow: var(--mk-focus); }
.mk-why__body { display: none; position: absolute; z-index: 25; left: 0; top: 20px; width: 300px;
  background: var(--sf-ink); color: var(--sf-ground); font-size: 11.5px; line-height: 1.55;
  padding: .5rem .6rem; border-radius: var(--sf-radius-sm); box-shadow: var(--sf-elevation-overlay); font-weight: 400; }
.mk-why:hover .mk-why__body, .mk-why:focus-within .mk-why__body { display: block; }

.mk-menu { position: relative; display: inline-block; }
.mk-menu__list { position: absolute; z-index: 25; right: 0; top: calc(100% + 3px); width: 330px;
  background: var(--sf-ground); border: 1px solid var(--sf-rule-strong); border-radius: var(--sf-radius-md);
  box-shadow: var(--sf-elevation-overlay); padding: 4px; }
.mk-menu__lede { margin: 0; padding: .4rem .5rem .5rem; font-size: 11px; color: var(--sf-ink-muted);
  border-bottom: 1px solid var(--sf-rule); line-height: 1.5; }
.mk-menu__item { display: grid; gap: 1px; width: 100%; text-align: left; background: none; border: 0;
  font: inherit; padding: .4rem .5rem; border-radius: 2px; cursor: pointer; }
.mk-menu__item:hover { background: var(--sf-surface); }
.mk-menu__item:focus-visible { outline: none; box-shadow: var(--mk-focus); }
.mk-menu__main { font-size: 12.5px; font-weight: 500; }
.mk-menu__detail { font-size: 11px; color: var(--sf-ink-muted); line-height: 1.45; }

.mk-lin { font: inherit; font-size: 11px; background: none; border: 1px solid var(--sf-rule);
  border-radius: 3px; padding: .05rem .3rem; color: var(--sf-accent); cursor: pointer;
  display: inline-flex; align-items: center; gap: .2rem; }
.mk-lin:hover { border-color: var(--sf-accent); background: var(--mk-new-bg); }
.mk-lin:focus-visible { outline: none; box-shadow: var(--mk-focus); }

/* ---- slide-over ---- */
.mk-slide {
  position: fixed; top: 0; right: 0; bottom: 0; width: min(560px, 100vw); z-index: 55;
  background: var(--sf-ground); border-left: 1px solid var(--sf-rule-strong);
  box-shadow: var(--sf-elevation-overlay); display: grid; grid-template-rows: auto 1fr auto;
  transform: translateX(100%); transition: transform .16s ease-out; visibility: hidden;
}
.mk-slide[data-open="true"] { transform: none; visibility: visible; }
@media (prefers-reduced-motion: reduce) { .mk-slide { transition: none; } }
.mk-slide__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem;
  padding: .8rem 1rem; border-bottom: 1px solid var(--sf-rule); }
.mk-slide__title { margin: 0; font-size: 15px; font-weight: 600; }
.mk-slide__sub { margin: .15rem 0 0; font-size: 11.5px; color: var(--sf-ink-muted); line-height: 1.5; }
.mk-slide__body { padding: 1rem; overflow-y: auto; }
.mk-slide__foot { padding: .7rem 1rem; border-top: 1px solid var(--sf-rule); background: var(--sf-surface);
  display: flex; gap: .4rem; flex-wrap: wrap; align-items: center; }
.mk-scrim { position: fixed; inset: 0; background: rgba(18,22,26,.28); z-index: 50; display: none; }
.mk-scrim[data-open="true"] { display: block; }

/* ---- dialog ---- */
.mk-dialog { width: min(520px, 100%); background: var(--sf-ground); border: 1px solid var(--sf-rule-strong);
  border-radius: var(--sf-radius-md); box-shadow: var(--sf-elevation-overlay); padding: 1rem 1.1rem; }
.mk-dialog__title { margin: 0 0 .5rem; font-size: 16px; font-weight: 600; }
.mk-dialog__body { font-size: 12.5px; line-height: 1.6; color: var(--sf-ink); }
.mk-dialog__body p { margin: 0 0 .6rem; max-width: 62ch; }
.mk-dialog__confirm { display: grid; gap: .25rem; font-size: 11.5px; margin: .7rem 0; }
.mk-dialog__confirm code { font-family: var(--sf-font-data); background: var(--sf-surface); padding: 0 .25rem; border-radius: 2px; }
.mk-dialog__actions { display: flex; gap: .4rem; justify-content: flex-end; margin-top: .8rem; flex-wrap: wrap; }

/* ---- command palette ---- */
.mk-palette {
  position: fixed; top: 12vh; left: 50%; transform: translateX(-50%); z-index: 70;
  width: min(600px, calc(100vw - 2rem)); background: var(--sf-ground);
  border: 1px solid var(--sf-rule-strong); border-radius: var(--sf-radius-md);
  box-shadow: var(--sf-elevation-overlay); overflow: hidden; display: none;
}
.mk-palette[data-open="true"] { display: block; }
.mk-palette__input { width: 100%; border: 0; border-bottom: 1px solid var(--sf-rule); font: inherit;
  font-size: 14px; padding: .7rem .9rem; color: var(--sf-ink); }
.mk-palette__input:focus { outline: none; }
.mk-palette__list { list-style: none; margin: 0; padding: 4px; max-height: 46vh; overflow-y: auto; }
.mk-palette__group { font-size: 9.5px; text-transform: uppercase; letter-spacing: .06em; font-weight: 700;
  color: var(--sf-ink-muted); padding: .5rem .6rem .25rem; }
.mk-palette__item { display: flex; align-items: baseline; gap: .5rem; width: 100%; text-align: left;
  background: none; border: 0; font: inherit; padding: .38rem .6rem; border-radius: 2px; cursor: pointer; }
.mk-palette__item:hover, .mk-palette__item[data-active="true"] { background: var(--sf-surface); }
.mk-palette__item[data-active="true"] { box-shadow: inset 2px 0 0 var(--sf-ink); }
.mk-palette__main { font-size: 12.5px; }
.mk-palette__ctx { font-size: 11px; color: var(--sf-ink-muted); margin-left: auto; }
.mk-palette__foot { border-top: 1px solid var(--sf-rule); padding: .4rem .7rem; background: var(--sf-surface);
  font-size: 10.5px; color: var(--sf-ink-muted); display: flex; gap: .8rem; flex-wrap: wrap; }
.mk-palette__none { padding: 1.2rem .9rem; font-size: 12px; color: var(--sf-ink-muted); line-height: 1.6; }

/* ==================================================================== *
 * Compositions
 * ==================================================================== */

.mk-card { border: 1px solid var(--sf-rule); border-radius: var(--sf-radius-md); background: var(--sf-ground);
  border-left: 3px solid var(--sf-rule-strong); padding: .7rem .85rem; }
.mk-card--bad { border-left-color: var(--mk-bad); }
.mk-card--warn { border-left-color: var(--mk-warn); }
.mk-card--good { border-left-color: var(--mk-good); }
.mk-card--new { border-left-color: var(--mk-new); }
.mk-card__head { display: flex; justify-content: space-between; align-items: baseline; gap: .7rem; flex-wrap: wrap; margin-bottom: .35rem; }
.mk-card__body { font-size: 12.5px; line-height: 1.55; }
.mk-card__foot { margin-top: .55rem; padding-top: .45rem; border-top: 1px solid var(--sf-rule);
  display: flex; gap: .4rem; align-items: center; flex-wrap: wrap; }

.mk-queue { display: grid; gap: .5rem; margin-bottom: 1rem; }
.mk-queue__kind { font-size: 9.5px; text-transform: uppercase; letter-spacing: .06em; font-weight: 700; color: var(--sf-ink-muted); }
.mk-queue__headline { font-size: 13px; font-weight: 600; margin: 0 0 .15rem; line-height: 1.4; }
.mk-queue__context { margin: 0; font-size: 11.5px; color: var(--sf-ink-muted); line-height: 1.5; }
.mk-queue__age { font-family: var(--sf-font-data); font-size: 11px; color: var(--sf-ink-muted); }
.mk-thread__item { padding: .5rem 0; border-bottom: 1px solid var(--sf-rule); }
.mk-thread__who { font-size: 12px; font-weight: 600; }
.mk-thread__at { font-family: var(--sf-font-data); font-size: 10.5px; color: var(--sf-ink-muted); margin-left: .5rem; }
.mk-thread__text { margin: .15rem 0 0; font-size: 12.5px; line-height: 1.55; }

.mk-grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: .7rem; margin-bottom: 1rem; }
.mk-grid3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: .7rem; margin-bottom: 1rem; }

.mk-board { display: flex; gap: .5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.mk-board__col { flex: 1 1 130px; padding: .7rem .8rem; border-radius: 4px; box-shadow: inset 0 0 0 1px var(--sf-rule); background: var(--sf-ground); }
.mk-board__col--current { box-shadow: inset 0 0 0 2px var(--sf-ink); }
.mk-board__state { display: block; font-size: 11px; font-weight: 600; }
.mk-board__count { display: block; font-family: var(--sf-font-data); font-size: 19px; margin: .1rem 0; }
.mk-board__note { display: block; font-size: 10.5px; color: var(--sf-ink-muted); line-height: 1.35; }

.mk-tarp { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: .7rem; margin-bottom: 1rem; }
.mk-tarp__card { padding: .8rem .9rem; border-radius: 4px; background: var(--sf-ground); box-shadow: inset 0 0 0 1px var(--sf-rule); border-left: 3px solid var(--sf-rule-strong); }
.mk-tarp__card--bad { border-left-color: var(--mk-bad); }
.mk-tarp__card--warn { border-left-color: var(--mk-warn); }
.mk-tarp__card--good { border-left-color: var(--mk-good); }
.mk-tarp__card header { display: flex; justify-content: space-between; align-items: baseline; }
.mk-tarp__level { font-family: var(--sf-font-data); font-size: 11px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; color: var(--sf-ink-muted); }
.mk-tarp__label { font-size: 14px; font-weight: 600; margin: .25rem 0 .5rem; }
.mk-tarp__facts { margin: 0; display: grid; gap: .35rem; }
.mk-tarp__facts dt { font-size: 10px; color: var(--sf-ink-muted); font-weight: 600; }
.mk-tarp__facts dd { margin: 0; font-size: 12px; line-height: 1.45; }

.mk-config { border-top: 1px solid var(--sf-rule); margin-bottom: .7rem; }
.mk-config__row { padding: .35rem 0; border-bottom: 1px solid var(--sf-rule); font-size: 12px; font-family: var(--sf-font-data); }

.mk-editor { background: var(--sf-ground); box-shadow: inset 0 0 0 1px var(--sf-rule); border-radius: 4px; padding: 1rem 1.2rem; }
.mk-editor__body p { font-size: 13.5px; line-height: 1.7; margin: 0 0 .8rem; max-width: 62ch; }
.mk-cite { background: var(--mk-new-bg); border-bottom: 1px solid var(--mk-new-line); padding: 0 .15em; font-family: var(--sf-font-data); font-size: 12.5px; }
.mk-caret { display: inline-block; width: 1.5px; height: 1em; background: var(--sf-ink); vertical-align: text-bottom; margin-left: 1px; }

.mk-lineage__subject { display: flex; gap: 1rem; align-items: baseline; flex-wrap: wrap; padding: .9rem 1rem; background: var(--sf-surface); border-radius: 4px; box-shadow: inset 0 0 0 1px var(--sf-rule); margin-bottom: 1rem; }
.mk-lineage__value { font-family: var(--sf-font-data); font-size: 27px; font-weight: 500; letter-spacing: -0.02em; }
.mk-lineage__meta { font-size: 12px; color: var(--sf-ink-muted); }
.mk-chain { list-style: none; margin: 0 0 1.1rem; padding: 0; position: relative; }
.mk-chain::before { content: ""; position: absolute; left: 11px; top: 12px; bottom: 12px; width: 1px; background: var(--sf-rule); }
.mk-chain__step { display: flex; gap: .8rem; padding: .5rem 0; position: relative; }
.mk-chain__n {
  flex: 0 0 auto; width: 23px; height: 23px; border-radius: 50%; background: var(--sf-ground);
  box-shadow: inset 0 0 0 1px var(--sf-rule-strong); font-family: var(--sf-font-data);
  font-size: 11px; display: grid; place-items: center; position: relative; z-index: 1;
}
.mk-chain__step--rule .mk-chain__n, .mk-chain__step--derived .mk-chain__n { box-shadow: inset 0 0 0 1.5px var(--mk-new); color: var(--mk-new); }
.mk-chain__step--evaluation .mk-chain__n, .mk-chain__step--consequence .mk-chain__n { background: var(--sf-exceedance); color: #fff; box-shadow: none; }
.mk-chain__text { display: grid; gap: 1px; padding-top: 2px; }
.mk-chain__label { font-size: 10px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; color: var(--sf-ink-muted); }
.mk-chain__what { font-size: 13px; font-weight: 500; }
.mk-chain__detail { font-size: 11.5px; color: var(--sf-ink-muted); line-height: 1.5; }

/* ---- an editable grid: the field round, typed in ---- */
.mk-entry { width: 100%; border-collapse: collapse; font-size: 12.5px; margin-bottom: .7rem; }
.mk-entry th { text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: .05em;
  color: var(--sf-ink-muted); font-weight: 700; padding: .3rem .4rem; border-bottom: 1px solid var(--sf-rule-strong); white-space: nowrap; }
.mk-entry td { padding: 2px 3px; border-bottom: 1px solid var(--sf-rule); }
.mk-entry td:first-child { font-family: var(--sf-font-data); font-weight: 600; padding-left: .4rem; }
.mk-entry__cell { width: 100%; border: 1px solid transparent; background: none; font: inherit;
  font-family: var(--sf-font-data); font-size: 12px; padding: .25rem .35rem; border-radius: 2px;
  text-align: right; font-variant-numeric: tabular-nums; min-height: 28px; }
.mk-entry__cell:hover { border-color: var(--sf-rule); }
.mk-entry__cell:focus { outline: none; border-color: var(--sf-accent); background: var(--sf-ground); box-shadow: 0 0 0 3px rgba(20,96,122,.14); }
.mk-entry__cell--text { text-align: left; font-family: var(--sf-font-ui); }
.mk-entry__row--dry td { background: var(--sf-surface); }
.mk-entry__row--focus td { background: var(--mk-new-bg); }
.mk-entry__unit { font-family: var(--sf-font-data); font-size: 10.5px; color: var(--sf-ink-muted); padding-left: .2rem; }
@media (pointer: coarse) { .mk-entry__cell { min-height: 44px; } }

/* ---- coverage matrix ---- */
.mk-cover { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 1.2rem; }
.mk-cover th { text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: .05em;
  color: var(--sf-ink-muted); font-weight: 700; padding: .35rem .5rem; border-bottom: 1px solid var(--sf-rule-strong);
  background: var(--sf-ground); }
.mk-cover td { padding: .32rem .5rem; border-bottom: 1px solid var(--sf-rule); vertical-align: top; line-height: 1.5; }
.mk-cover tr:hover td { background: var(--sf-surface); }
.mk-cover__id { font-family: var(--sf-font-data); font-size: 11px; font-weight: 600; white-space: nowrap; }
.mk-table-wrap { overflow-x: auto; margin-bottom: 1.2rem; }

/*
 * Pass 4, measured: at 375px the window scrolled 519px into blank space on
 * the crosstab. The scrollable void is generated inside the product's own
 * .sf-table-scroll regions (a Chromium containing-block escape: hiding the
 * wrap removes it, clipping any ancestor between it and .mk-main does not).
 * A focusable, labelled scroll region is an independent layout boundary, so
 * declaring the containment is the truthful fix, not a workaround — and it
 * belongs here rather than in app.css, which stays byte-identical to the
 * product. The wrap check in verify.mjs holds this at three widths.
 */
.sf-table-scroll, .mk-table-wrap { contain: layout; }
.mk-table-wrap .mk-cover { margin-bottom: 0; min-width: 640px; }

.mk-fig { display: block; max-width: 100%; height: auto; background: var(--sf-ground); }
/* A print mark is smaller than any reasonable pointer target; the hit area is not. */
.mk-hit { cursor: help; }
.mk-hit:hover rect[fill="transparent"], .mk-hit:hover circle[fill="transparent"] { fill: rgba(20,96,122,.10); }
.mk-fig text, .sf-map text { font-family: var(--sf-font-ui); }
.mk-axis { font-size: 10px; }
.mk-annot { font-size: 10px; }
.mk-axis-title { font-size: 10.5px; }
.mk-prov { font-size: 9px; font-family: var(--sf-font-data); }
.sf-figure { margin-bottom: 1.3rem; }

/* ==================================================================== *
 * Touch targets — the audit's F-23, which this layer reintroduced
 *
 * sf-button already complies; the controls added here did not. Navigation
 * and standalone controls are sized to 44 px under a coarse pointer.
 *
 * **An inline link inside a sentence is deliberately exempt**, and that is the
 * rule rather than an oversight: WCAG 2.5.5 excepts a target whose position is
 * determined by the flow of text, because growing it would either break the
 * line box or space paragraphs out to nothing. So .mk-ref in prose keeps its
 * size, and .mk-ref in the "From here" strip — which is navigation, not a
 * sentence — does not.
 * ==================================================================== */

@media (pointer: coarse) {
  .mk-crumb__link, .mk-crumb__here {
    display: inline-flex; align-items: center; min-height: 44px;
  }
  .mk-related { gap: 0 .7rem; }
  .mk-related .mk-ref { display: inline-flex; align-items: center; min-height: 44px; }
  .mk-lin { min-height: 44px; padding: 0 .5rem; }
  .mk-chip { min-height: 44px; }
  .mk-chip__x { width: 44px; height: 44px; display: grid; place-items: center; }
  .mk-tab, .mk-section { min-height: 44px; }
  .mk-rail__screen { min-height: 44px; }
  .mk-menu__item, .mk-palette__item { min-height: 44px; }
  /* Standalone text buttons — a stage re-run, a file picker — are controls, not
     prose, so the inline exception does not cover them. */
  .mk-pipe__text .mk-linkbtn, .mk-drop .mk-linkbtn, .mk-state__actions .mk-linkbtn {
    display: inline-flex; align-items: center; min-height: 44px;
  }
  /* The "why" trigger keeps its 15 px look and gains a 45 px hit area, because
     growing the glyph itself would push the sentence it sits in apart. */
  .mk-why__btn { position: relative; }
  .mk-why__btn::after { content: ''; position: absolute; inset: -15px; }
  .mk-filters .mk-linkbtn, .mk-selbar .mk-linkbtn {
    display: inline-flex; align-items: center; min-height: 44px;
  }
}

/* ==================================================================== *
 * The field grid on a phone
 *
 * It is a matrix and it panned, which is the right strategy for a crosstab a
 * practitioner *reads*. This one is typed into, standing at a bore, one-handed
 * — and a grid that pans horizontally while you type puts the column you are
 * entering off-screen. So it stacks: one card per location, every field
 * labelled, nothing removed.
 * ==================================================================== */

@media (max-width: 560px) {
  .mk-entry, .mk-entry tbody, .mk-entry tr, .mk-entry td { display: block; width: auto; }
  /* The product's own technique, not a variant of it: hidden from sight and
     kept in the accessibility tree, so every stacked cell still has a header. */
  .mk-entry thead {
    position: absolute; width: 1px; height: 1px; margin: -1px;
    padding: 0; border: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap;
  }
  .mk-entry tr {
    border: 1px solid var(--sf-rule); border-radius: var(--sf-radius-md);
    padding: .5rem .6rem; margin-bottom: .6rem; background: var(--sf-ground);
  }
  .mk-entry td { border: 0; padding: .2rem 0; display: grid; grid-template-columns: 8.5rem 1fr; align-items: center; gap: .5rem; }
  .mk-entry td::before { content: attr(data-label); font-size: 11px; color: var(--sf-ink-muted); font-weight: 600; }
  .mk-entry td:first-child { font-size: 14px; font-weight: 700; padding-bottom: .4rem; border-bottom: 1px solid var(--sf-rule); margin-bottom: .3rem; display: block; }
  .mk-entry td:first-child::before { content: none; }
  .mk-entry__cell { text-align: left; }
}

@media print {
  .mk-rail, .mk-top, .mk-banner, .mk-toolbar, .mk-filters, .mk-related { display: none; }
  .mk-app { grid-template-columns: 1fr; }
  .mk-screen { display: block !important; }
}

/* ==================================================================== *
 * Pass 4 — measured overflow fixes. Last in the file deliberately: these
 * override nowrap rules declared above, and the cascade decides ties by
 * order, which is exactly how the first attempt at them silently lost.
 * ==================================================================== */

/*
 * nowrap is right for a chip and wrong for a sentence inside one. Buttons
 * carry sentences in this product ("Not available — the stand-down
 * condition…"), so they wrap at every width; tags and link-buttons wrap only
 * on a narrow viewport, where the alternative is the document scrolling into
 * blank space. Identity chips (top bar, tabs, status glyphs) keep nowrap —
 * they never carry prose. Code phrases break anywhere rather than jutting.
 */
.mk-btn { white-space: normal; }
.mk-file { white-space: normal; overflow-wrap: anywhere; }
@media (max-width: 767px) {
  .mk-tag, .mk-linkbtn { white-space: normal; }
  /*
   * The stacked cell's ::before label is flex: 0 0 auto in app.css, which is
   * right until a label is a sentence — "Consequence for the assessment" made
   * three DQA cells 73px wider than their row, invisibly (a pseudo-element
   * shows up in no element query; found via td.scrollWidth). flex-shrink: 1
   * lets it wrap. The first version also set min-width: 0, and the wave-1
   * audit (W1-A-1) measured what that bought: 85 labels shrunk below their
   * longest word and overprinting their values, invisible to every overflow
   * meter. min-width stays at its flex default (auto), which floors the
   * shrink at min-content: the widest run of the label the browser cannot
   * break — "Consequence", but only "run" in "Re-run by", because a hyphen is
   * a break opportunity. verify.mjs measures that floor, not a word count.
   */
  .sf-table--records tbody td::before { flex-shrink: 1; }
}
`;