'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function ClientsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Clients error:', error)
  }, [error])

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Clients</h1>
      
      <Alert variant="destructive">
        <AlertTitle>Failed to load clients</AlertTitle>
        <AlertDescription>
          {error.message || 'An error occurred while loading clients. Please try again.'}
        </AlertDescription>
      </Alert>

      <Button onClick={reset}>Retry</Button>
    </div>
  )
}

