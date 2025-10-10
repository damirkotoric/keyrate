import { NextResponse } from "next/server"

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

    if (!accessToken) {
      // Return mock data for development
      return NextResponse.json({
        data: [
          {
            id: "1",
            media_type: "IMAGE",
            media_url: "/placeholder.svg?height=400&width=400",
            permalink: "https://www.instagram.com/keyratedubai/",
            caption:
              "🏠 Helping another family achieve their dream of homeownership in Dubai! Our expert team guided them through every step of the mortgage process. #DubaiMortgage #HomeOwnership #KeyRateDubai",
            like_count: 45,
            comments_count: 8,
            timestamp: "2024-08-15T10:00:00+0000",
          },
          {
            id: "2",
            media_type: "VIDEO",
            media_url: "/placeholder.svg?height=400&width=400",
            thumbnail_url: "/placeholder.svg?height=400&width=400",
            permalink: "https://www.instagram.com/keyratedubai/",
            caption:
              "📈 Dubai property market update: Interest rates remain competitive for qualified buyers. Contact us for the latest rates and pre-approval! #DubaiRealEstate #MortgageRates #PropertyInvestment",
            like_count: 62,
            comments_count: 12,
            timestamp: "2024-08-14T14:30:00+0000",
          },
          {
            id: "3",
            media_type: "IMAGE",
            media_url: "/placeholder.svg?height=400&width=400",
            permalink: "https://www.instagram.com/keyratedubai/",
            caption:
              "✨ First-time buyer success story! From application to keys in hand - we made their mortgage journey smooth and stress-free. Ready to start yours? #FirstTimeBuyer #MortgageBroker #DubaiHomes",
            like_count: 38,
            comments_count: 6,
            timestamp: "2024-08-13T09:15:00+0000",
          },
          {
            id: "4",
            media_type: "IMAGE",
            media_url: "/placeholder.svg?height=400&width=400",
            permalink: "https://www.instagram.com/keyratedubai/",
            caption:
              "💡 Mortgage Tip Tuesday: Did you know that a larger down payment can significantly reduce your monthly payments? Let us show you how to optimize your mortgage structure. #MortgageTips #FinancialPlanning",
            like_count: 29,
            comments_count: 4,
            timestamp: "2024-08-12T11:45:00+0000",
          },
        ],
      })
    }

    // Fetch real Instagram posts using Graph API
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,like_count,comments_count,timestamp&access_token=${accessToken}&limit=4`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      throw new Error("Failed to fetch Instagram posts")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Instagram API Error:", error)

    // Return fallback data on error
    return NextResponse.json({
      data: [
        {
          id: "1",
          media_type: "IMAGE",
          media_url: "/placeholder.svg?height=400&width=400",
          permalink: "https://www.instagram.com/keyratedubai/",
          caption: "Follow us @keyratedubai for the latest mortgage tips and success stories!",
          like_count: 0,
          comments_count: 0,
          timestamp: new Date().toISOString(),
        },
      ],
    })
  }
}
