/*
 * Framework-agnostic cookie / analytics consent manager.
 * ------------------------------------------------------------------
 * Zero dependencies, no framework. Renders a single non-modal banner into
 * <body>, persists the choice to localStorage (so a cookieless site stays
 * cookieless), and exposes a small developer API for gating analytics.
 *
 * Usage:
 *   - Plain HTML / Astro / anything:
 *       import { mountConsentManager } from './consent-manager';
 *       mountConsentManager();            // or pass a config
 *   - React/Next: call mountConsentManager() inside a client effect
 *     (see cookie-consent.tsx in this repo).
 *
 * Developer API (available synchronously after mount, before the banner shows):
 *   window.SiteConsent.get()          -> ConsentRecord | null
 *   window.SiteConsent.hasAnalytics() -> boolean
 *   window.SiteConsent.open()         -> re-open the manager with controls shown
 *
 * On every save a `site:consent` CustomEvent is dispatched on `document` with
 * the record as `event.detail`. Analytics loaders should:
 *   if (window.SiteConsent?.hasAnalytics()) load();
 *   document.addEventListener('site:consent', (e) => { if (e.detail.analytics) load(); });
 */

export interface ConsentRecord {
  v: 1;
  necessary: true;
  analytics: boolean;
  /** ISO timestamp of the decision. */
  date: string;
}

export interface ConsentConfig {
  /** Versioned localStorage key. Bump the version to re-ask everyone. */
  storageKey: string;
  /** Where the footer link / "Privacy Policy" link points when JS is off. */
  privacyPolicyHref: string;
}

const DEFAULT_CONFIG: ConsentConfig = {
  storageKey: 'gangeya-cookie-consent-v1',
  privacyPolicyHref: '/privacy-policy',
};

const CONSENT_EVENT = 'site:consent';

declare global {
  interface Window {
    SiteConsent?: {
      get(): ConsentRecord | null;
      hasAnalytics(): boolean;
      open(): void;
    };
  }
  interface DocumentEventMap {
    'site:consent': CustomEvent<ConsentRecord>;
  }
}

let config: ConsentConfig = DEFAULT_CONFIG;
let mounted = false;

// DOM refs (built lazily the first time the banner is shown).
let root: HTMLDivElement | null = null;
let controls: HTMLDivElement | null = null;
let analyticsToggle: HTMLInputElement | null = null;
let primaryBtn: HTMLButtonElement | null = null;
let customizeBtn: HTMLButtonElement | null = null;
let controlsVisible = false;

const isBrowser = () =>
  typeof window !== 'undefined' && typeof document !== 'undefined';

function readConsent(): ConsentRecord | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(config.storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    // Validate shape/version; anything off -> treat as "no decision" (re-ask).
    if (parsed && parsed.v === 1 && typeof parsed.analytics === 'boolean') {
      return {
        v: 1,
        necessary: true,
        analytics: parsed.analytics,
        date: typeof parsed.date === 'string' ? parsed.date : new Date().toISOString(),
      };
    }
    return null;
  } catch {
    return null;
  }
}

function persist(analytics: boolean): ConsentRecord {
  const record: ConsentRecord = {
    v: 1,
    necessary: true,
    analytics,
    date: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(config.storageKey, JSON.stringify(record));
  } catch {
    /* storage may be unavailable (private mode, quota) — still fire the event */
  }
  document.dispatchEvent(
    new CustomEvent<ConsentRecord>(CONSENT_EVENT, { detail: record }),
  );
  return record;
}

/** Commit a decision and dismiss the banner. */
function commit(analytics: boolean) {
  persist(analytics);
  hideBanner();
}

// ---------------------------------------------------------------------------
// Styles (scoped under .sc-* classes; themed via the host site's CSS variables
// so it automatically matches light/dark and the site's radii/fonts/shadows).
// ---------------------------------------------------------------------------
const STYLE_ID = 'sc-consent-styles';
const STYLES = `
.sc-root{position:fixed;z-index:2147483000;left:50%;bottom:max(1rem,env(safe-area-inset-bottom,0px));
  transform:translateX(-50%);width:calc(100vw - 2rem);max-width:400px;
  font-family:var(--font-sans,ui-sans-serif,system-ui,sans-serif);
  opacity:1;transition:opacity .28s ease,transform .28s ease;}
.sc-root[hidden]{display:none;}
.sc-root.sc-enter{opacity:0;transform:translateX(-50%) translateY(.5rem);}
.sc-card{background:var(--popover,#fff);color:var(--popover-foreground,var(--foreground,#111));
  border:1px solid var(--border,rgba(0,0,0,.1));border-radius:calc(var(--radius,.625rem) + 4px);
  box-shadow:var(--shadow-popover,0 12px 40px rgba(0,0,0,.18));padding:1rem 1.1rem 1.1rem;}
.sc-title{font-size:.95rem;font-weight:600;line-height:1.3;margin:0 0 .35rem;}
.sc-desc{font-size:.8rem;line-height:1.55;color:var(--muted-foreground,#666);margin:0 0 .85rem;}
.sc-desc a{color:var(--foreground,#111);text-decoration:underline;text-underline-offset:2px;}
.sc-controls{display:grid;gap:.7rem;margin:.25rem 0 .95rem;padding-top:.85rem;
  border-top:1px solid var(--border,rgba(0,0,0,.08));}
.sc-controls[hidden]{display:none;}
.sc-row{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;}
.sc-row-title{font-size:.8rem;font-weight:600;}
.sc-row-sub{font-size:.72rem;color:var(--muted-foreground,#666);line-height:1.45;margin-top:.15rem;}
.sc-actions{display:flex;gap:.5rem;align-items:center;}
@media (max-width:28rem){.sc-actions{flex-direction:column;align-items:stretch;}}
.sc-btn{appearance:none;-webkit-appearance:none;cursor:pointer;border:1px solid transparent;
  border-radius:var(--radius,.5rem);font:inherit;font-size:.8rem;font-weight:500;line-height:1.2;
  padding:.55rem .8rem;flex:1 1 0;text-align:center;transition:opacity .15s ease,background-color .15s ease;}
.sc-btn:focus-visible{outline:2px solid var(--ring,#888);outline-offset:2px;}
.sc-btn:hover{opacity:.9;}
.sc-btn--primary{background:var(--primary,#111);color:var(--primary-foreground,#fff);}
.sc-btn--secondary{background:var(--secondary,#f4f4f5);color:var(--secondary-foreground,#111);
  border-color:var(--border,rgba(0,0,0,.12));}
.sc-btn--ghost{background:transparent;color:var(--muted-foreground,#666);flex:0 0 auto;}
.sc-btn--ghost:hover{color:var(--foreground,#111);background:var(--accent,rgba(0,0,0,.04));}
.sc-switch{position:relative;display:inline-flex;flex:0 0 auto;width:2.25rem;height:1.35rem;margin-top:.1rem;}
.sc-switch input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer;}
.sc-switch input:disabled{cursor:not-allowed;}
.sc-switch-track{pointer-events:none;width:100%;height:100%;border-radius:999px;position:relative;
  background:var(--border,#ccc);transition:background-color .2s ease;}
.sc-switch input:checked ~ .sc-switch-track{background:var(--primary,#111);}
.sc-switch input:disabled ~ .sc-switch-track{opacity:.5;}
.sc-switch input:focus-visible ~ .sc-switch-track{outline:2px solid var(--ring,#888);outline-offset:2px;}
.sc-switch-thumb{position:absolute;top:50%;left:2px;width:1.05rem;height:1.05rem;border-radius:50%;
  background:var(--background,#fff);transform:translateY(-50%);transition:transform .2s ease;
  box-shadow:0 1px 2px rgba(0,0,0,.25);}
.sc-switch input:checked ~ .sc-switch-track .sc-switch-thumb{transform:translate(.9rem,-50%);}
@media (prefers-reduced-motion:reduce){
  .sc-root,.sc-switch-track,.sc-switch-thumb,.sc-btn{transition:none !important;}
}
`;

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = STYLES;
  document.head.appendChild(style);
}

function buildBanner() {
  injectStyles();

  root = document.createElement('div');
  root.className = 'sc-root';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'false'); // non-modal: never traps focus
  root.setAttribute('aria-labelledby', 'sc-title');
  root.setAttribute('aria-describedby', 'sc-desc');
  root.tabIndex = -1;
  root.hidden = true;

  root.innerHTML = `
    <div class="sc-card">
      <h2 class="sc-title" id="sc-title">Cookies &amp; analytics</h2>
      <p class="sc-desc" id="sc-desc">
        This site doesn't use tracking cookies. With your OK it loads
        privacy-friendly, <strong>cookieless</strong> analytics (Vercel) to count
        visits &mdash; no personal profiles, no cross-site tracking, no ads.
        Choose &ldquo;Essential only&rdquo; to load none of it. Your choice is
        stored locally on this device, not in a cookie.
      </p>

      <div class="sc-controls" id="sc-controls" hidden>
        <div class="sc-row">
          <div>
            <div class="sc-row-title">Essential</div>
            <div class="sc-row-sub">Required for the site to work (theme, navigation). Always on.</div>
          </div>
          <label class="sc-switch">
            <input type="checkbox" checked disabled aria-label="Essential — always on" />
            <span class="sc-switch-track"><span class="sc-switch-thumb"></span></span>
          </label>
        </div>
        <div class="sc-row">
          <div>
            <div class="sc-row-title">Analytics</div>
            <div class="sc-row-sub">Cookieless visit measurement (Vercel), and gates any future analytics.</div>
          </div>
          <label class="sc-switch">
            <input type="checkbox" id="sc-analytics" aria-label="Analytics" />
            <span class="sc-switch-track"><span class="sc-switch-thumb"></span></span>
          </label>
        </div>
      </div>

      <div class="sc-actions">
        <button type="button" class="sc-btn sc-btn--primary" data-sc="primary">Accept</button>
        <button type="button" class="sc-btn sc-btn--secondary" data-sc="essential">Essential only</button>
        <button type="button" class="sc-btn sc-btn--ghost" data-sc="customize">Customize</button>
      </div>
    </div>
  `;

  controls = root.querySelector('#sc-controls');
  analyticsToggle = root.querySelector('#sc-analytics');
  primaryBtn = root.querySelector('[data-sc="primary"]');
  customizeBtn = root.querySelector('[data-sc="customize"]');
  const essentialBtn = root.querySelector<HTMLButtonElement>('[data-sc="essential"]');

  // Primary button: "Accept" collapses to analytics:true; when controls are
  // shown it becomes "Save preferences" and commits the toggle value.
  primaryBtn?.addEventListener('click', () => {
    commit(controlsVisible ? Boolean(analyticsToggle?.checked) : true);
  });

  // Essential only: ALWAYS analytics:false. Never reads the toggle — this is the
  // classic bug this component is built to avoid.
  essentialBtn?.addEventListener('click', () => {
    commit(false);
  });

  // Customize: reveal granular controls and switch the primary button to Save.
  customizeBtn?.addEventListener('click', () => {
    setControlsVisible(true);
    analyticsToggle?.focus();
  });

  root.addEventListener('keydown', (e) => {
    // Non-modal: allow Escape to dismiss only once a decision already exists
    // (i.e. re-opened via footer). On first visit a choice must be made.
    if (e.key === 'Escape' && readConsent()) hideBanner();
  });

  document.body.appendChild(root);
}

function setControlsVisible(visible: boolean) {
  controlsVisible = visible;
  if (controls) controls.hidden = !visible;
  if (customizeBtn) customizeBtn.hidden = visible;
  if (primaryBtn) primaryBtn.textContent = visible ? 'Save preferences' : 'Accept';
}

function showBanner(expandControls: boolean) {
  if (!root) buildBanner();
  if (!root) return;

  // Reflect any stored choice into the toggle when re-opening.
  const current = readConsent();
  if (analyticsToggle) analyticsToggle.checked = current ? current.analytics : false;

  setControlsVisible(expandControls);

  root.hidden = false;
  // enter animation (respects prefers-reduced-motion via CSS)
  root.classList.add('sc-enter');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => root?.classList.remove('sc-enter'));
  });
  // Move focus to the labelled dialog without trapping it.
  root.focus();
}

function hideBanner() {
  if (root) root.hidden = true;
}

/** Public: open (or re-open) the manager with the granular controls shown. */
function openManager() {
  showBanner(true);
}

/**
 * Mount the consent manager. Safe to call multiple times (no-ops after first).
 * Sets up window.SiteConsent immediately, wires [data-cookie-settings] links,
 * and — only on first visit — defers showing the banner until the browser is
 * idle so it never competes with first paint / LCP.
 */
export function mountConsentManager(userConfig: Partial<ConsentConfig> = {}) {
  if (!isBrowser() || mounted) return;
  mounted = true;
  config = { ...DEFAULT_CONFIG, ...userConfig };

  window.SiteConsent = {
    get: readConsent,
    hasAnalytics: () => readConsent()?.analytics === true,
    open: openManager,
  };

  // Withdrawal: any [data-cookie-settings] element re-opens the manager.
  // Delegated so it works for links rendered before or after mount.
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement | null)?.closest?.(
      '[data-cookie-settings]',
    );
    if (target) {
      e.preventDefault();
      openManager();
    }
  });

  // First visit only: show the banner, deferred so it never blocks first paint.
  if (!readConsent()) {
    const show = () => showBanner(false);
    if ('requestIdleCallback' in window) {
      (window as Window & {
        requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback(show, { timeout: 2500 });
    } else {
      window.setTimeout(show, 1200);
    }
  }
}
