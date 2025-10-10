"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type GridPatternProps = {
  width?: number
  height?: number
  x?: number
  y?: number
  squares?: Array<[number, number]>
  strokeDasharray?: string | number
  strokeOpacity?: number
  strokeWidth?: number
  className?: string
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  squares = [],
  strokeDasharray = 0,
  strokeOpacity = 0.25,
  strokeWidth = 1,
  className,
}: GridPatternProps) {
  const patternId = React.useId()

  return (
    <svg aria-hidden="true" className={cn("pointer-events-none", className)}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth as any}
            strokeDasharray={strokeDasharray as any}
            opacity={strokeOpacity as any}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      {squares.length > 0 && (
        <svg x={x} y={y} className="fill-current opacity-20">
          {squares.map(([sx, sy], i) => (
            <rect key={i} width={width} height={height} x={sx * width} y={sy * height} />
          ))}
        </svg>
      )}
    </svg>
  )
}

export default GridPattern


