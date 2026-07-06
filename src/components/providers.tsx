// import { AppProgressProvider } from "@bprogress/next";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider } from "next-themes";
import { Analytics } from '@vercel/analytics/react'

import { Toaster } from "./ui/sonner";
import { GlobalProgress } from "./ui/global-loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAnalyticsConsent } from "./cookie-consent";

/**
 * Vercel's analytics are privacy-friendly and cookieless, but we still only load
 * them once the visitor has opted in via the consent banner — so "Essential
 * only" genuinely loads zero analytics. Re-renders live when consent changes.
 */
function ConsentedAnalytics() {
  const allowed = useAnalyticsConsent();
  if (!allowed) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <JotaiProvider>
      <ThemeProvider
        enableSystem
        disableTransitionOnChange
        enableColorScheme
        storageKey="theme"
        defaultTheme="system"
        attribute="class"
      >
        <GlobalProgress />
        {/* <AppProgressProvider
          color="var(--foreground)"
          height="2px"
          delay={500}
          options={{ showSpinner: false }}
        >
          {children}
        </AppProgressProvider> */}
        
          {children}

        <Toaster position="top-center" />
        <ConsentedAnalytics />
      </ThemeProvider>
    </JotaiProvider>
    </QueryClientProvider>
  );
}
