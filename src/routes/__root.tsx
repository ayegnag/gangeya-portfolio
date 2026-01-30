import { HeadContent, Scripts, createRootRouteWithContext, useRouterState } from '@tanstack/react-router'
// import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
// import { TanStackDevtools } from '@tanstack/react-devtools'


// import appCss from '@/styles/styles.css?url'
import appCss from "@/styles/globals.css?url";

import NotFound from '@/components/not-found'
import { RouterContext } from '../routerContext'
// import { META_THEME_COLORS, SITE_INFO } from "@/config/site";
import { AppProviders } from '@/components/providers'
import { SiteHeader } from '@/components/site-header'
import { Analytics } from '@vercel/analytics/react'
import { SiteFooter } from '@/components/site-footer';

// import { USER } from "@/features/portfolio/data/user";
// import { WebSite, WithContext } from 'schema-dts';

function getTitle(match: any) {
  return match.globalNotFound ? '404 – Page not found | Gangeya' : 'Gangeya'
}
// function getWebSiteJsonLd(): WithContext<WebSite> {
//   return {
//     "@context": "https://schema.org",
//     "@type": "WebSite",
//     name: SITE_INFO.name,
//     url: SITE_INFO.url,
//     alternateName: [USER.username],
//   };
// }

// Thanks @shadcn-ui, @tailwindcss
// const darkModeScript = String.raw`
//   try {
//     if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//       document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
//     }
//   } catch (_) {}

//   try {
//     if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
//       document.documentElement.classList.add('os-macos')
//     }
//   } catch (_) {}
// `;

export const Route = createRootRouteWithContext<RouterContext>()({
  head: ({match}) => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: getTitle(match),
      }
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <h1>Root error component</h1>,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const hideHeader = useRouterState({
    select: (s) => {
      const matches = s.matches
      const active = matches[matches.length - 1]

      const hasHideHeaderFlag = matches.some(
        (m) => (m.context as RouterContext | undefined)?.hideHeader,
      )

      const isNotFound = (active as any)?.globalNotFound === true

      return hasHideHeaderFlag || isNotFound
    },
  })

  
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: darkModeScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()).replace(/</g, "\\u003c"),
          }}
        /> */}
      </head>
      <body>
        <AppProviders>
        {!hideHeader && <SiteHeader />}
        <main className="max-w-screen overflow-x-hidden px-2">{children}</main>
        {/* {children} */}
        <SiteFooter></SiteFooter>
        </AppProviders>
        <Analytics />
        {/* <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            StoreDevtools,
          ]}
        /> */}
        <Scripts />
      </body>
    </html>
  )
}
