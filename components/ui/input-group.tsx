"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn("relative w-full min-w-0", className)}
      {...props}
    />
  )
}

type Align = "inline-start" | "inline-end" | "block-start" | "block-end"

function InputGroupAddon({ align = "inline-start", className, ...props }: React.ComponentProps<"div"> & { align?: Align }) {
  const pos =
    align === "inline-end"
      ? "right-3 top-1/2 -translate-y-1/2"
      : align === "block-start"
      ? "top-3 left-3"
      : align === "block-end"
      ? "bottom-3 left-3"
      : "left-3 top-1/2 -translate-y-1/2"
  return (
    <div
      data-slot="input-group-addon"
      className={cn(
        "pointer-events-none absolute z-10 flex items-center gap-1 text-sm text-muted-foreground",
        pos,
        className
      )}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn("select-none", className)}
      {...props}
    />
  )
}

function InputGroupButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return <Button data-slot="input-group-button" className={cn("pointer-events-auto", className)} {...props} />
}

function InputGroupInput({ className, ...props }: React.ComponentProps<"input">) {
  // Consumers should pass appropriate padding (e.g., pl-14) when using a leading addon.
  return (
    <input
      data-slot="input-group-control"
      className={cn(
        "dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] shadow-xs md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="input-group-control"
      className={cn(
        "dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] shadow-xs md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
}


