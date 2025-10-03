import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CaretRight } from "@/components/icons"
import type { IconProps } from "phosphor-react"
import { cn } from "@/lib/utils"

interface SolutionCardProps {
  icon: React.ComponentType<IconProps>
  title: string
  description: string
  features: string[]
  regions?: string[]
  buttonText?: string
  buttonAction?: () => void
  href?: string
  className?: string
}

export default function SolutionCard({
  icon: Icon,
  title,
  description,
  features,
  regions = [],
  buttonText = "Learn More",
  buttonAction,
  href,
  className
}: SolutionCardProps) {
  const handleClick = () => {
    if (href) {
      window.location.href = href
    } else if (buttonAction) {
      buttonAction()
    }
  }

  return (
    <Card className={cn("p-6 hover:shadow-lg transition-shadow border border-border/50 rounded-xl bg-card relative overflow-hidden h-full", className)}>
      <Icon weight="light" className="h-48 w-48 absolute -bottom-16 right-0 opacity-5 z-0" />
      <CardContent className="p-0 relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4 relative">
          <div className="dark rounded-lg p-2 bg-gradient-to-br from-background/50 to-background">
            <Icon weight="light" className="h-6 w-6 text-foreground" />
          </div>
          {regions.length > 0 && (
            <div className="flex gap-2">
              {regions.map((region) => (
                <Badge key={region} variant="default" className="bg-muted text-muted-foreground text-xs">
                  {region}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <h3 className="text-lg font-bold mb-1 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">
          {description}
        </p>
        <ul className="text-sm text-muted-foreground space-y-2 mb-6 list-disc list-inside">
          {features.map((feature, index) => (
            <li key={index} className="marker:text-primary">
              {feature}
            </li>
          ))}
        </ul>
        <Button
          variant="outlineBlur"
          size="default"
          className="mt-auto"
          onClick={handleClick}
        >
          {buttonText}
          <CaretRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

export { SolutionCard }
