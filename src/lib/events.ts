import posthog from "posthog-js";
import { z } from "zod";

const eventSchema = z.object({
  name: z.enum([
    "copy_npm_command",
    "copy_code_block",
    "play_name_pronunciation",
    "open_command_menu",
    "command_menu_search",
    "command_menu_action",
    "blog_search",
  ]),
  properties: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))
    // .record(z.string(), z.number())
    .optional(),
});

export type Event = z.infer<typeof eventSchema>;

export function trackEvent(input: Event) {
  // Respect the visitor's analytics consent. `SiteConsent` is provided by the
  // consent manager; if it's absent (e.g. SSR) or analytics wasn't granted, do
  // nothing. (PostHog isn't initialized today, so this also future-proofs it.)
  if (typeof window === "undefined" || !window.SiteConsent?.hasAnalytics()) {
    return;
  }

  const event = eventSchema.parse(input);
  if (event) {
    posthog.capture(event.name, event.properties);
  }
}
