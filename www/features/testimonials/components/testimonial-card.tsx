import { Card, CardContent } from "@/components/ui/card"
import { Star } from "@/components/icons"

interface TestimonialCardProps {
  testimonial: string
  author: string
  role: string
  rating?: number
}

export default function TestimonialCard({ 
  testimonial, 
  author, 
  role, 
  rating = 5 
}: TestimonialCardProps) {
  return (
    <Card className="p-6 bg-card border border-border/50 shadow-lg transition-shadow max-w-sm">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} weight="fill" className="w-5 h-5 text-primary" />
          ))}
        </div>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 italic flex-grow">
          {testimonial}
        </p>
        <div className="border-border/20 border-t pt-4 mt-auto">
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export { TestimonialCard }
