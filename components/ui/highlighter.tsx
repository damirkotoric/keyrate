"use client"

import { useEffect, useRef } from "react"
import type React from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"
import { type RoughAnnotation } from "rough-notation/lib/model"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
  delayMs?: number
  finalTextColor?: string
  mode?: "rough" | "css"
}

export function Highlighter({
  children,
  action = "highlight",
  color = "var(--primary)",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  delayMs = 0,
  finalTextColor = "var(--primary-foreground)",
  mode = "rough",
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const annotationRef = useRef<RoughAnnotation | null>(null)
  const hasShownRef = useRef(false)

  // We still compute inView once, but we ALSO gate on first paint using session flag
  const isInView = useInView(elementRef, { once: true, margin: "-10%" })

  // If isView is false, always show. If isView is true, wait for inView
  // Only allow showing once per page load
  const shouldShow = (!isView || isInView) && !hasShownRef.current

  // CSS mode: paint a gradient highlight that auto-reflows with layout (no JS positioning)
  if (mode === "css") {
    // Resolve CSS var to actual color once at render; browsers keep it updated anyway
    let resolved = color
    try {
      const varMatch = color.match(/var\((--[^)]+)\)/)
      if (varMatch && typeof window !== "undefined") {
        const cssValue = getComputedStyle(document.documentElement).getPropertyValue(varMatch[1]).trim()
        if (cssValue) resolved = cssValue
      }
    } catch {}
    // Optional text color fade after delay
    useEffect(() => {
      if (!shouldShow) return
      const node = elementRef.current
      if (!node) return
      const apply = () => {
        try {
          node.style.transition = node.style.transition ? `${node.style.transition}, color ${animationDuration}ms ease-in-out` : `color ${animationDuration}ms ease-in-out`
          node.style.color = finalTextColor
        } catch {}
      }
      if (delayMs > 0) {
        const t = window.setTimeout(apply, delayMs)
        return () => window.clearTimeout(t)
      }
      apply()
    }, [shouldShow, animationDuration, delayMs, finalTextColor])

    return (
      <span
        ref={elementRef}
        className="relative inline"
        style={{
          backgroundImage: `linear-gradient(${resolved}, ${resolved})`,
          backgroundRepeat: "no-repeat",
          // cover bottom ~40% of the text box
          backgroundSize: "100% 0.45em",
          backgroundPosition: "0 85%",
          WebkitBoxDecorationBreak: "clone" as any,
          boxDecorationBreak: "clone" as any,
          padding: `0 ${Math.max(0, padding)}px`,
        }}
      >
        {children}
      </span>
    )
  }

  useEffect(() => {
    if (!shouldShow) return

    const element = elementRef.current
    if (!element) return

    // Resolve CSS variable colors like var(--primary) into actual color values
    let resolvedColor = color
    try {
      const varMatch = color.match(/var\((--[^)]+)\)/)
      if (varMatch && typeof window !== "undefined") {
        const cssValue = getComputedStyle(document.documentElement).getPropertyValue(varMatch[1]).trim()
        if (cssValue) {
          resolvedColor = cssValue
        }
      }
    } catch {
      // noop: fall back to provided color
    }

    const annotationConfig = {
      type: action,
      color: resolvedColor,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    }

    const annotation = annotate(element, annotationConfig)
    annotationRef.current = annotation

    let timer: number | null = null
    const show = () => {
      if (annotationRef.current) {
        annotationRef.current.show()
        hasShownRef.current = true
        // Fade text color after highlight animation completes
        try {
          if (element) {
            // Resolve CSS variable in finalTextColor if present
            let resolvedFinal = finalTextColor
            const finalVarMatch = finalTextColor.match(/var\((--[^)]+)\)/)
            if (finalVarMatch && typeof window !== "undefined") {
              const cssValue = getComputedStyle(document.documentElement).getPropertyValue(finalVarMatch[1]).trim()
              if (cssValue) {
                resolvedFinal = cssValue
              }
            }

            element.style.transition = element.style.transition
              ? `${element.style.transition}, color 400ms ease-in-out`
              : "color 400ms ease-in-out"
            // Start the text color transition immediately with the highlight
            requestAnimationFrame(() => {
              element.style.color = resolvedFinal
            })
          }
        } catch {
          // noop
        }
      }
    }
    if (delayMs > 0) timer = window.setTimeout(show, delayMs)
    else show()
    // Keep annotation positioned correctly on scroll/resize without re-animating
    let raf = 0
    let afterTimer: number | null = null
    const updatePosition = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        try {
          const a: any = annotationRef.current
          if (a && typeof a.position === "function") {
            a.position()
          }
        } catch {}
        raf = 0
      })
      // also re-run after transitions/relayouts settle
      if (afterTimer) window.clearTimeout(afterTimer)
      afterTimer = window.setTimeout(() => {
        try {
          const a: any = annotationRef.current
          if (a && typeof a.position === "function") a.position()
        } catch {}
      }, 250)
    }
    window.addEventListener("scroll", updatePosition, { passive: true })
    window.addEventListener("resize", updatePosition)
    window.addEventListener("keyrate:layout-change", updatePosition as any)

    // Reposition on container size/DOM changes as the form expands/collapses
    let ro: ResizeObserver | null = null
    let mo: MutationObserver | null = null
    try {
      ro = new ResizeObserver(() => updatePosition())
      if (element) {
        ro.observe(element)
        if (element.parentElement) ro.observe(element.parentElement)
      }
    } catch {}
    try {
      mo = new MutationObserver(() => updatePosition())
      const target = element?.parentElement || element
      if (target) mo.observe(target, { attributes: true, childList: true, subtree: true })
    } catch {}

    return () => {
      if (element) {
        annotate(element, { type: action }).remove()
      }
      if (timer) {
        window.clearTimeout(timer)
      }
      window.removeEventListener("scroll", updatePosition)
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("keyrate:layout-change", updatePosition as any)
      try { ro?.disconnect() } catch {}
      try { mo?.disconnect() } catch {}
      if (afterTimer) window.clearTimeout(afterTimer)
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    delayMs,
    finalTextColor,
  ])

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  )
}
