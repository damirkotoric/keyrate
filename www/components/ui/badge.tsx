import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"

// Defaults exported for easy editing in one place
export const badgeDefaultVariant = "default" as const
export const badgeDefaultSize = "sm" as const

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none gap-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-card border border-border text-foreground [a&]:hover:bg-background/90 transition-[color,box-shadow]",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 transition-[color,box-shadow]",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 transition-[color,box-shadow]",
        outline:
          "text-foreground border-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground transition-[color,box-shadow]",
        shiny:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
      },
      size: {
        sm: "px-2 py-0.5 text-xs [&>svg]:size-3",
        lg: "px-3 py-1.5 text-sm [&>svg]:size-4",
      },
    },
    defaultVariants: {
      variant: badgeDefaultVariant,
      size: badgeDefaultSize,
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {variant === "shiny" ? (
        <AnimatedShinyText className="text-inherit">
          {children}
        </AnimatedShinyText>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Badge, badgeVariants }
