import { Card, CardContent } from "@/components/ui/card"
import { Star } from "@/components/icons"

interface TestimonialBlockProps {
  quote: string
  author: string
  role: string
  rating?: number
}

export function TestimonialBlock({ 
  quote, 
  author, 
  role, 
  rating = 5 
}: TestimonialBlockProps) {
  return (
    <Card className="p-8 border">
      <CardContent className="p-0 text-center">
        <div className="flex items-center justify-center gap-1 mb-6">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} weight="fill" className="size-6 text-primary" />
          ))}
        </div>
        <blockquote className="text-xl text-muted-foreground italic mb-6 leading-relaxed">
          "{quote}"
        </blockquote>
        <div className="border-t pt-6">
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}

