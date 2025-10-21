import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CaretRight } from "@/components/icons"
import * as PhosphorIcons from "phosphor-react"
import type { IconProps } from "phosphor-react"
import { cn } from "@/lib/utils"

interface SolutionCardProps {
  icon?: React.ComponentType<IconProps> | string
  title: string
  description: string
  features: string[]
  regions?: string[]
  buttonText?: string
  buttonAction?: () => void
  href?: string
  className?: string
  locale?: string
}

export default function SolutionCard({
  icon,
  title,
  description,
  features,
  regions = [],
  buttonText = "Learn More",
  buttonAction,
  href,
  className,
  locale
}: SolutionCardProps) {
  // Helper to get icon component dynamically
  const getIconComponent = (iconInput?: React.ComponentType<IconProps> | string) => {
    if (!iconInput) return PhosphorIcons.FileText
    if (typeof iconInput === 'string') {
      const IconComponent = (PhosphorIcons as any)[iconInput]
      return IconComponent || PhosphorIcons.FileText
    }
    return iconInput
  }

  const Icon = getIconComponent(icon)
  
  const getFlagCode = (region: string) => {
    if (region === "Canada") return "ca"
    if (region === "UAE") return "ae"
    if (region === "USA") return "us"
    return null
  }

  // Only show region badges on global locale
  const showRegions = locale === 'global' || !locale

  const CardWrapper = href ? 'a' : 'div'
  const wrapperProps = href 
    ? { href, className: "block group" } 
    : { className: "group", onClick: buttonAction }

  return (
    <CardWrapper {...wrapperProps}>
      <Card className={cn("p-6 hover:shadow-lg active:shadow-xs transition-shadow border border-border/50 rounded-xl bg-card relative overflow-hidden h-full cursor-pointer", className)}>
        <Icon weight="light" className="h-48 w-48 absolute -bottom-16 right-0 opacity-5 z-0" />
        <CardContent className="p-0 relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4 relative">
          <div className="dark rounded-lg p-2 bg-gradient-to-br from-background/50 to-background">
            <Icon weight="light" className="h-6 w-6 text-foreground" />
          </div>
          {showRegions && regions.length > 0 && (
            <div className="flex gap-1.5">
              {regions.map((region) => {
                const flagCode = getFlagCode(region)
                return (
                  <Badge key={region} variant="default" className="bg-muted text-muted-foreground text-xs flex items-center gap-1.5 px-2">
                    {flagCode && (
                      <img
                        src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/flags/1x1/${flagCode}.svg`}
                        alt={`${region} flag`}
                        className="w-4 h-4 rounded-full border border-border -ml-1"
                      />
                    )}
                    {region}
                  </Badge>
                )
              })}
            </div>
          )}
        </div>
        <h3 className="text-lg font-bold mb-1 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm mb-6">
          {description}
        </p>
        <div className="mt-auto flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
          {buttonText}
          <CaretRight className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
    </CardWrapper>
  )
}

export { SolutionCard }
