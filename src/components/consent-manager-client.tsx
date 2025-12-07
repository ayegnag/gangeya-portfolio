// import { ClientSideOptionsProvider } from "@c15t/nextjs/client";
// import { posthog } from "posthog-js";

// export function ConsentManagerClient({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ClientSideOptionsProvider
//       callbacks={{
//         onConsentSet({ preferences }) {
//           if (preferences.measurement) {
//             posthog.opt_in_capturing();
//           } else {
//             posthog.opt_out_capturing();
//           }
//         },
//       }}
//     >
//       {children}
//     </ClientSideOptionsProvider>
//   );
// }

// consent-manager.tsx (or whatever your root wrapper is)
import {
  ConsentManagerProvider,
  CookieBanner,
  ConsentManagerDialog,
  type ConsentManagerOptions,
} from "@c15t/react";
import { posthog } from "posthog-js";

const consentOptions: ConsentManagerOptions = {
  mode: "c15t",                 // or "offline" etc.
  backendURL: "https://your-instance.c15t.dev", // if using hosted mode
  callbacks: {
    onConsentSet({ preferences }) {
      if (preferences.measurement) {
        posthog.opt_in_capturing();
      } else {
        posthog.opt_out_capturing();
      }
    },
  },
};

export function ConsentManagerClient({ children }: { children: React.ReactNode }) {
  return (
    <ConsentManagerProvider options={consentOptions}>
      {children}
      <CookieBanner />
      <ConsentManagerDialog />
    </ConsentManagerProvider>
  );
}
