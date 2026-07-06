import { useEffect, useSyncExternalStore } from 'react';

import {
  mountConsentManager,
  type ConsentRecord,
} from '@/lib/cookie-consent/consent-manager';

/**
 * Mounts the framework-agnostic consent manager once, on the client only.
 * Render it once in the root layout (after the main content). It renders no
 * React output itself — the manager injects its own non-modal banner into
 * <body>.
 */
export function CookieConsent() {
  useEffect(() => {
    mountConsentManager();
  }, []);

  return null;
}

// --- Reactive hook so React can gate analytics on the current consent ---------

function subscribe(onChange: () => void) {
  const handler = () => onChange();
  document.addEventListener('site:consent', handler);
  // also react to changes from other tabs
  window.addEventListener('storage', handler);
  return () => {
    document.removeEventListener('site:consent', handler);
    window.removeEventListener('storage', handler);
  };
}

function getAnalyticsSnapshot(): boolean {
  return typeof window !== 'undefined'
    ? window.SiteConsent?.hasAnalytics() === true
    : false;
}

/**
 * `true` once the visitor has consented to analytics. Updates live when the
 * choice changes (same tab via the `site:consent` event, other tabs via
 * `storage`). Server snapshot is always `false` so nothing analytics-related is
 * server-rendered before a choice exists.
 */
export function useAnalyticsConsent(): boolean {
  return useSyncExternalStore(subscribe, getAnalyticsSnapshot, () => false);
}

export type { ConsentRecord };
