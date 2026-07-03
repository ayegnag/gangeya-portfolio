/*
 * Recover from stale-deploy dynamic-import failures.
 *
 * Vite wraps every dynamic import (incl. React.lazy) so that when a chunk fails
 * to load it dispatches a `vite:preloadError` event. This mainly happens after a
 * new deploy: the build produces new hashed filenames (e.g.
 * brand-context-menu-<hash>.js) and Vercel serves only the current deployment's
 * assets, so a tab still running the previous build requests a chunk that now
 * 404s — surfacing as "Failed to fetch dynamically imported module".
 *
 * Reloading fetches the current HTML, which references the current chunk hashes,
 * and the import succeeds. A time-based guard prevents a reload loop if the asset
 * is genuinely unavailable (e.g. a real outage) rather than merely stale.
 */
if (typeof window !== 'undefined') {
  const RELOAD_TS_KEY = 'chunk-reload-ts'
  const MIN_RELOAD_INTERVAL_MS = 10_000

  window.addEventListener('vite:preloadError', (event) => {
    // Stop Vite from rethrowing globally; we handle recovery here.
    event.preventDefault()

    const last = Number(sessionStorage.getItem(RELOAD_TS_KEY) || '0')
    if (Date.now() - last > MIN_RELOAD_INTERVAL_MS) {
      sessionStorage.setItem(RELOAD_TS_KEY, String(Date.now()))
      window.location.reload()
    }
    // If we reloaded within the last interval, fall through: the nearest error
    // boundary / Suspense handles it instead of looping.
  })
}

export {}
