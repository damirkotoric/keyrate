"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download } from "@/components/icons"

interface GuideDownloadFormProps {
  guideTitle: string
  pdfUrl: string
}

export function GuideDownloadForm({ guideTitle, pdfUrl }: GuideDownloadFormProps) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Here you can add logic to save the email to your database/CRM
    // For now, we'll just simulate a short delay
    await new Promise(resolve => setTimeout(resolve, 500))

    setIsSubmitted(true)
    setIsLoading(false)

    // Trigger download
    window.open(pdfUrl, '_blank')
  }

  if (isSubmitted) {
    return (
      <div className="bg-muted rounded-lg p-8 mb-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Download className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Download Started!</h2>
          <p className="text-muted-foreground mb-6">
            Your guide should start downloading automatically. If not, click the button below.
          </p>
          <Button size="lg" asChild>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
              <Download className="w-5 h-5 mr-2" />
              Download Again
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-muted rounded-lg p-8 mb-8">
      <h2 className="text-2xl font-bold mb-4">Get Your Free Guide</h2>
      <p className="text-muted-foreground mb-6">
        Enter your email to download this guide instantly. We'll also send you helpful mortgage tips.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <Input
          type="email"
          inputSize="lg"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" size="lg" disabled={isLoading}>
          <Download className="w-5 h-5 mr-2" />
          {isLoading ? "Processing..." : "Download Guide"}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-4">
        By downloading, you agree to receive occasional emails from KeyRate. Unsubscribe anytime.
      </p>
    </div>
  )
}

