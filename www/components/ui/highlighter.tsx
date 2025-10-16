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
  // New refs: wrapper + bg (absolute) + text (above)
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const bgRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const annotationRef = useRef<RoughAnnotation | null>(null)
  const hasShownRef = useRef(false)

  const isInView = useInView(wrapperRef, { once: true, margin: "-10%" })
  const shouldShow = (!isView || isInView) && !hasShownRef.current

  // CSS mode remains supported (no change to public API)
  if (mode === "css") {
    let resolved = color
    try {
      const varMatch = color.match(/var\((--[^)]+)\)/)
      if (varMatch && typeof window !== "undefined") {
        const cssValue = getComputedStyle(document.documentElement).getPropertyValue(varMatch[1]).trim()
        if (cssValue) resolved = cssValue
      }
    } catch {}

    useEffect(() => {
      if (!shouldShow) return
      const node = wrapperRef.current
      if (!node) return
      const apply = () => {
        try {
          node.style.transition = node.style.transition
            ? `${node.style.transition}, color ${animationDuration}ms ease-in-out`
            : `color ${animationDuration}ms ease-in-out`
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
        ref={wrapperRef}
        className="relative inline"
        style={{
          backgroundImage: `linear-gradient(${resolved}, ${resolved})`,
          backgroundRepeat: "no-repeat",
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

  // Rough-notation mode rendered on an absolute bg surface sized to the text
  useEffect(() => {
    if (!shouldShow) return

    const wrapper = wrapperRef.current
    const bg = bgRef.current
    const text = textRef.current
    if (!wrapper || !bg || !text) return

    // Resolve CSS var color
    let resolvedColor = color
    try {
      const varMatch = color.match(/var\((--[^)]+)\)/)
      if (varMatch && typeof window !== "undefined") {
        const cssValue = getComputedStyle(document.documentElement).getPropertyValue(varMatch[1]).trim()
        if (cssValue) resolvedColor = cssValue
      }
    } catch {}

    const syncBox = () => {
      const w = Math.ceil(text.offsetWidth)
      const h = Math.ceil(text.offsetHeight)
      bg.style.width = `${w}px`
      bg.style.height = `${h}px`
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

    let showTimer: number | null = null
    let settle: number | null = null
    let cleanup: (() => void) | null = null

    // Initialize immediately - all instances wait for fonts together
    const initAnnotation = async () => {
      try {
        await document.fonts.ready
      } catch {
        // Fonts API not supported or failed, continue anyway
      }

      // Double RAF to ensure layout is fully settled
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          syncBox()
          const annotation = annotate(bg, annotationConfig)
          annotationRef.current = annotation

          // Set up update handlers immediately
          let raf = 0
          const update = () => {
            if (raf) return
            raf = window.requestAnimationFrame(() => {
              try {
                syncBox()
                const a: any = annotationRef.current
                if (a && typeof a.position === "function") a.position()
              } finally {
                raf = 0
              }
            })
            if (settle) window.clearTimeout(settle)
            settle = window.setTimeout(() => {
              try {
                syncBox()
                const a: any = annotationRef.current
                if (a && typeof a.position === "function") a.position()
              } catch {}
            }, 250)
          }

          const onLayoutEvt = () => update()
          window.addEventListener("resize", onLayoutEvt)
          window.addEventListener("scroll", onLayoutEvt, { passive: true })
          window.addEventListener("keyrate:layout-change", onLayoutEvt as any)

          const ro = new ResizeObserver(() => update())
          try {
            ro.observe(text)
            ro.observe(wrapper)
          } catch {}

          const mo = new MutationObserver(() => update())
          try {
            mo.observe(wrapper, { attributes: true, childList: true, subtree: true })
          } catch {}

          cleanup = () => {
            if (showTimer) window.clearTimeout(showTimer)
            if (settle) window.clearTimeout(settle)
            try { annotationRef.current?.remove() } catch {}
            window.removeEventListener("resize", onLayoutEvt)
            window.removeEventListener("scroll", onLayoutEvt)
            window.removeEventListener("keyrate:layout-change", onLayoutEvt as any)
            try { ro.disconnect() } catch {}
            try { mo.disconnect() } catch {}
          }

          // Delay ONLY the show animation, not the initialization
          const show = () => {
            annotationRef.current?.show()
            hasShownRef.current = true
            try {
              let resolvedFinal = finalTextColor
              const finalVarMatch = finalTextColor.match(/var\((--[^)]+)\)/)
              if (finalVarMatch && typeof window !== "undefined") {
                const cssValue = getComputedStyle(document.documentElement).getPropertyValue(finalVarMatch[1]).trim()
                if (cssValue) resolvedFinal = cssValue
              }
              text.style.transition = text.style.transition
                ? `${text.style.transition}, color 400ms ease-in-out`
                : "color 400ms ease-in-out"
              requestAnimationFrame(() => { text.style.color = resolvedFinal })
            } catch {}
          }

          if (delayMs > 0) showTimer = window.setTimeout(show, delayMs)
          else show()
        })
      })
    }

    initAnnotation()

    return () => {
      if (cleanup) cleanup()
      if (showTimer) window.clearTimeout(showTimer)
      if (settle) window.clearTimeout(settle)
      try { annotationRef.current?.remove() } catch {}
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
    <span ref={wrapperRef} className="relative inline-block">
      <span ref={bgRef} className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />
      <span ref={textRef} className="relative z-10">
        {children}
      </span>
    </span>
  )
}
