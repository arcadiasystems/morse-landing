import { useSyncExternalStore } from 'react'

const DAY_MS = 86_400_000

/* The count only changes at midnight UTC, so there is nothing to subscribe to. */
const subscribe = () => () => {}

/* The prerendered HTML is built on another day, so it carries no count. */
const getServerSnapshot = () => null

/**
 * Whole days elapsed since an ISO date (UTC midnight), read in the browser.
 * Null in the prerendered HTML and before the date.
 */
export function useDaysSince(isoDate: string): number | null {
  return useSyncExternalStore(
    subscribe,
    () => {
      const days = Math.floor((Date.now() - Date.parse(`${isoDate}T00:00:00Z`)) / DAY_MS)
      return days >= 0 ? days : null
    },
    getServerSnapshot,
  )
}
