import { useEffect, RefObject } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref
 * @param ref - React ref object
 * @param handler - Function to call when clicking outside
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  refs: RefObject<T | null> | Array<RefObject<T | null>>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      const refArray = Array.isArray(refs) ? refs : [refs]
      for (const ref of refArray) {
        if (ref.current && ref.current.contains(event.target as Node)) {
          return
        }
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [refs, handler])
}
