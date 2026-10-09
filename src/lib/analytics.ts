type IntakeEvent = "intake_opened" | `intake_step_${number}` | "intake_submitted" | "intake_failed" | "intake_offline";

let ready: Promise<typeof import("posthog-js").default | null> | null = null;

export function initAnalytics(): void {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key || typeof window === "undefined" || ready) return;
  ready = import("posthog-js")
    .then(({ default: ph }) => {
      ph.init(key, {
        api_host: "https://eu.i.posthog.com",
        persistence: "memory",
        cookieless_mode: "always",
        autocapture: false,
        capture_pageview: true,
        disable_session_recording: true,
        ip: false,
        rageclick: false,
        capture_dead_clicks: false,
        capture_heatmaps: false,
        capture_exceptions: false,
        capture_performance: false,
        disable_surveys: true,
        advanced_disable_flags: true,
      });
      return ph;
    })
    .catch(() => null);
}

export function track(event: IntakeEvent): void {
  initAnalytics();
  ready?.then((ph) => ph?.capture(event));
}
