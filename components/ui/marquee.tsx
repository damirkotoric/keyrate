"use client"

import React from "react"
import { cn } from "@/lib/utils"

type MarqueeProps = React.PropsWithChildren<{
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  vertical?: boolean
  repeat?: number
}>

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
}: MarqueeProps) {
  const repeated = Array.from({ length: repeat }).map((_, index) => (
    <div key={index} className="flex items-stretch gap-4">
      {children}
    </div>
  ))

  const trackClassName = cn(
    "flex w-max shrink-0 items-stretch gap-4",
    vertical ? "animate-marquee-vertical" : "animate-marquee",
    reverse && "animate-direction-reverse",
    pauseOnHover && "group-hover:[animation-play-state:paused]"
  )

  return (
    <div className={cn("group relative", className)}>
      <div className={trackClassName}>
        {repeated}
        {repeated}
      </div>
    </div>
  )
}

export default Marquee


