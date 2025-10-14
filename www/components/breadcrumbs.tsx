import Link from "next/link"
import { CaretRight } from "@/components/icons"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <div className={cn("mb-6 flex items-center gap-2 text-muted-foreground justify-start", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Link 
            href={item.href} 
            className="hover:text-foreground transition-colors"
          >
            {item.label}
          </Link>
          {index < items.length && (
            <CaretRight className="w-4 h-4" />
          )}
        </div>
      ))}
    </div>
  )
}

