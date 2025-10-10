import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { ShineBorder } from "@/components/ui/shine-border"

const alertVariants = cva(
  "relative max-w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type AlertBaseProps = React.ComponentProps<"div"> & VariantProps<typeof alertVariants>

interface AlertProps extends AlertBaseProps {
  shine?: boolean
  shineColors?: [string, string, string]
  shineDuration?: number
  shineBorderWidth?: number
}

function Alert({
  className,
  variant,
  shine = false,
  shineColors = ["var(--primary)", "#FFFFFF", "var(--primary)"],
  shineDuration = 12,
  shineBorderWidth = 2,
  ...props
}: AlertProps) {
  if (!shine) {
    return (
      <div
        data-slot="alert"
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      />
    )
  }

  return (
    <div className="relative rounded-xl">
      <ShineBorder shineColor={shineColors} duration={shineDuration} borderWidth={shineBorderWidth} className="absolute z-10" />
      <div
        data-slot="alert"
        role="alert"
        className={cn(alertVariants({ variant }), "border border-border/30", className)}
        {...props}
      />
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
