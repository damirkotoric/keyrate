export type AnalyticsEvent = "lead_started" | "lead_submitted" | "lead_failed"

export function track(event: AnalyticsEvent | string, payload: Record<string, any> = {}) {
  // Stub for now; replace with real analytics later
  // eslint-disable-next-line no-console
  console.log(`[analytics] ${event}`, payload)
}


