import { createFileRoute } from '@tanstack/react-router'

import { Prose } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/privacy-policy')({
  staticData: {
    hideHeader: false,
    hideFooter: false,
  },
  head: () => ({
    meta: [
      { title: 'Privacy Policy | Gangeya' },
      {
        name: 'description',
        content:
          'How gangeya.dev handles your data: privacy-friendly, cookieless analytics, no tracking cookies, and nothing shared or sold.',
      },
    ],
  }),
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  return (
    <div className="mx-auto border-x border-edge md:max-w-3xl">
      <div
        className={cn(
          'h-8 px-2',
          'screen-line-after',
          'before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]',
          'before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56'
        )}
      />

      <div className="min-h-svh">
        <div className="screen-line-after px-4">
          <h1 className="text-3xl font-semibold">Privacy Policy</h1>
        </div>

        <div className="p-4">
          <p className="font-mono text-sm text-balance text-muted-foreground">
            Last updated: July 2026
          </p>
        </div>

        <div className="screen-line-before">
          <Prose className="px-4 py-6">
            <p>
              This is my personal site. It's built to respect your privacy, and
              this page explains plainly what it does and doesn't do.
            </p>

            <h2>What I collect</h2>
            <p>
              I use privacy-friendly, cookieless analytics to understand my
              traffic &mdash; roughly <strong>how many people visit</strong> and{' '}
              <strong>where visits come from</strong> (an approximate region and
              the site or link that referred you). That's it. No names, no
              accounts, no advertising profiles, no cross-site tracking.
            </p>

            <h2>Cookies</h2>
            <p>
              This site sets <strong>no tracking cookies</strong>. When you make
              a choice in the cookie banner, that choice is saved in your
              browser's local storage &mdash; on your device, not sent anywhere.
              Basic preferences like your light/dark theme are stored the same
              way.
            </p>

            <h2>Who sees it</h2>
            <p>
              The information stays with me and is only used to understand how
              the site is doing. <strong>Nothing is sold, and nothing is
              shared</strong> with advertisers or anyone else. The analytics is
              collected through privacy-focused tools (Vercel and Cloudflare)
              that don't build advertising profiles from it.
            </p>

            <h2>Your choice</h2>
            <p>
              Analytics only runs if you allow it. You can change your mind
              anytime with <strong>Cookie settings</strong> in the footer &mdash;
              choosing &ldquo;Essential only&rdquo; loads no analytics at all.
            </p>

            <h2>Contact</h2>
            <p>
              Questions? Email me at{' '}
              <a href="mailto:gangeya.u@gmail.com">gangeya.u@gmail.com</a>.
            </p>
          </Prose>
        </div>
      </div>
    </div>
  )
}
