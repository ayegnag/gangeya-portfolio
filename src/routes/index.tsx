// import { USER } from '@/features/portfolio/data/user';
import { lazy, Suspense } from 'react';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router'
// import type { ProfilePage as PageSchema, WithContext } from "schema-dts"

// Above-the-fold: keep eager so the initial paint (incl. the LCP avatar) isn't
// gated on extra chunks.
import { ProfileCover } from '@/features/portfolio/components/profile-cover';
import { ProfileHeader } from '@/features/portfolio/components/profile-header';
import { Overview } from '@/features/portfolio/components/overview';
import { SocialLinks } from '@/features/portfolio/components/social-links';

// Below-the-fold: code-split into their own chunks so their JS (post-item +
// date-fns, tooltip, collapsibles) isn't part of the homepage's initial bundle.
// These are still server-rendered/prerendered (Suspense resolves during SSR), so
// the content stays in the static HTML for SEO and there's no layout shift.
const About = lazy(() => import('@/features/portfolio/components/about').then((m) => ({ default: m.About })));
const TeckStack = lazy(() => import('@/features/portfolio/components/teck-stack').then((m) => ({ default: m.TeckStack })));
const Blog = lazy(() => import('@/features/portfolio/components/blog').then((m) => ({ default: m.Blog })));
const Experiences = lazy(() => import('@/features/portfolio/components/experiences').then((m) => ({ default: m.Experiences })));
const Projects = lazy(() => import('@/features/portfolio/components/projects').then((m) => ({ default: m.Projects })));
const Education = lazy(() => import('@/features/portfolio/components/education').then((m) => ({ default: m.Education })));

export const Route = createFileRoute('/')({
  staticData: {
    hideHeader: false,
    hideFooter: false,
  },
  component: App
})

function App() {

  return (
    <>
      {/* Analytics is loaded centrally & consent-gated in AppProviders. */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      ></script> */}
      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <ProfileCover />
        {/* <Separator /> */}

        <ProfileHeader />
        <Separator />

        <Overview />
        <Separator />

        <SocialLinks />
        <Separator />

        <Suspense fallback={<div className="min-h-screen" />}>
          <About />
          <Separator />

          {/* <TestimonialsMarquee />
          <Separator /> */}

          {/* <GitHubContributions />
        <Separator /> */}

          <TeckStack />
          <Separator />

          <Blog />
          <Separator />

          <Experiences />
          <Separator />

          <Projects />
          <Separator />

          {/* <Awards />
          <Separator />

          <Certifications />
          <Separator />

          <Bookmarks />
          <Separator /> */}

          {/* <Brand /> */}
          <Education />
          <Separator />
        </Suspense>
      </div>
    </>
  )
}


// function getPageJsonLd(): WithContext<PageSchema> {
//   return {
//     "@context": "https://schema.org",
//     "@type": "ProfilePage",
//     dateCreated: new Date(USER.dateCreated).toISOString(),
//     dateModified: new Date().toISOString(),
//     mainEntity: {
//       "@type": "Person",
//       name: USER.displayName,
//       identifier: USER.username,
//       image: USER.avatar,
//     },
//   };
// }

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    ></div>
  );
}
