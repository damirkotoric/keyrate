"use client"

import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type FlickeringGridProps = {
  className?: string
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  maxOpacity?: number
  /**
   * Speed multiplier for the animation tempo. 1 = default.
   * Lower values slow the flicker and decay; higher values speed it up.
   */
  speed?: number
}

export function FlickeringGrid({
  className,
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  maxOpacity = 0.2,
  speed = 1,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const [autoSize, setAutoSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  // Observe parent size when width/height are not provided
  useEffect(() => {
    if (typeof window === "undefined") return
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    if (width && height) {
      // If explicit width/height passed, no need to observe
      setAutoSize({ width, height })
      return
    }

    const resize = () => {
      setAutoSize({ width: parent.clientWidth, height: parent.clientHeight })
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    window.addEventListener("resize", resize)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", resize)
    }
  }, [width, height])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resolvedWidth = width ?? autoSize.width
    const resolvedHeight = height ?? autoSize.height
    if (!resolvedWidth || !resolvedHeight) return

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
    canvas.width = Math.floor(resolvedWidth * dpr)
    canvas.height = Math.floor(resolvedHeight * dpr)
    canvas.style.width = `${resolvedWidth}px`
    canvas.style.height = `${resolvedHeight}px`

    const maybeCtx = canvas.getContext("2d")
    if (!maybeCtx) return
    const ctx: CanvasRenderingContext2D = maybeCtx
    ctx.scale(dpr, dpr)

    const cellSize = squareSize + gridGap
    const cols = Math.ceil(resolvedWidth / cellSize)
    const rows = Math.ceil(resolvedHeight / cellSize)
    const opacities = new Float32Array(cols * rows)

    // Initialize with a little noise so it's visible immediately
    for (let i = 0; i < opacities.length; i++) {
      opacities[i] = Math.random() * (maxOpacity / 2)
    }

    // Speed scaling (0.05 floor to avoid freezing)
    const speedScale = Math.max(0.05, speed)
    const decay = (maxOpacity / 40) * speedScale // scale fade speed
    const chancePerFrame = Math.min(1, (flickerChance * speedScale) / 12) // scale spawn rate

    function render() {
      ctx.clearRect(0, 0, resolvedWidth, resolvedHeight)
      let idx = 0
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Randomly spike some cells
          if (Math.random() < chancePerFrame) {
            opacities[idx] = Math.min(maxOpacity, opacities[idx] + Math.random() * maxOpacity)
          }
          // Decay
          opacities[idx] = Math.max(0, opacities[idx] - decay)

          const alpha = opacities[idx]
          if (alpha > 0.001) {
            ctx.globalAlpha = alpha
            ctx.fillStyle = color
            ctx.fillRect(x * cellSize, y * cellSize, squareSize, squareSize)
            ctx.globalAlpha = 1
          }
          idx++
        }
      }
      animationRef.current = requestAnimationFrame(render)
    }

    animationRef.current = requestAnimationFrame(render)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [squareSize, gridGap, flickerChance, color, width, height, autoSize.width, autoSize.height, maxOpacity, speed])

  return <canvas ref={canvasRef} className={cn("w-full h-full", className)} />
}

export default FlickeringGrid


