import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "@/components/icons"

interface GuideCardProps {
  guide: {
    _id: string
    title: { en: string }
    subtitle: { en: string }
    slug: { current: string }
    coverImage?: {
      asset: {
        url: string
      }
      alt?: string
    }
    pdfFile?: {
      asset: {
        url?: string
        size?: number
      }
    }
  }
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link key={guide._id} href={`/guides/${guide.slug.current}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 h-full flex flex-col">
        {/* Cover Image */}
        {guide.coverImage?.asset?.url && (
          <div className="aspect-[4/3] relative">
            <img
              src={guide.coverImage.asset.url}
              alt={guide.coverImage.alt || guide.title.en}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex-grow">
            <div className="flex items-start gap-3 mb-4">
              <h3 className="text-xl font-bold text-black flex-1">{guide.title.en}</h3>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">{guide.subtitle.en}</p>
          </div>

          <Button variant="outline" size="sm" className="w-full">
            Get Guide
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}

