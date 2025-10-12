"use client"

import { NumberTicker } from "@/components/ui/number-ticker"
import { LucideIcon } from "lucide-react"
import { DollarSign, Users, Star, Clock } from "@/components/icons"

export interface Stat {
  icon: LucideIcon
  value: number
  suffix?: string
  prefix?: string
  decimalPlaces?: number
  label: string
  description: string | React.ReactNode
  delay?: number
}

// Default stats configuration
export const defaultStats: Stat[] = [
  {
    icon: DollarSign,
    value: 2,
    prefix: "$",
    suffix: "B+",
    decimalPlaces: 1,
    label: "Mortgages Processed",
    description: "Helping clients invest in high-value property",
    delay: 1
  },
  {
    icon: Users,
    value: 10,
    suffix: "K+",
    decimalPlaces: 1,
    label: "Happy Clients",
    description: "Families we've helped achieve homeownership",
    delay: 2
  },
  {
    icon: Star,
    value: 1.1,
    suffix: "K",
    decimalPlaces: 1,
    label: "Likes",
    description: (
      <>
        From our followers on our <a href="https://www.facebook.com/keyrate" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">Facebook page</a>
      </>
    ),
    delay: 3
  },
  {
    icon: Clock,
    value: 2,
    suffix: " Min",
    decimalPlaces: 1,
    label: "Pre-Approval Time",
    description: "Get approved faster than anywhere else",
    delay: 4
  }
]

interface StatsSectionProps {
  title?: string
  subtitle?: string
  stats: Stat[]
  columns?: 2 | 3 | 4
}

export function StatsSection({ 
  title = "Trusted by Thousands", 
  subtitle = "Proven results, trusted by clients in Canada and the UAE.",
  stats,
  columns = 4
}: StatsSectionProps) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 md:grid-cols-3",
    4: "sm:grid-cols-2 md:grid-cols-4"
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
            )}
            {subtitle && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={`grid ${gridCols[columns]} gap-8 sm:text-center`}>
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const animationDelay = stat.delay || (index + 1)
            
            return (
              <div key={index} className="flex flex-row sm:flex-col items-center">
                <div className={`w-20 h-20 rounded-full flex aspect-square items-center justify-center mr-4 sm:mr-0 sm:mb-4 bg-gradient-to-br from-foreground/50 to-foreground animate-gradient-icon animate-gradient-icon-delay-${animationDelay}`}>
                  <Icon className="w-10 h-10 text-background" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-0 sm:mb-2 text-foreground flex sm:justify-center items-center">
                    {stat.prefix && stat.prefix}
                    <NumberTicker 
                      value={stat.value} 
                      decimalPlaces={stat.decimalPlaces ?? 0} 
                    />
                    {stat.suffix && stat.suffix}
                  </h3>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-sm text-muted-foreground/80">{stat.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

