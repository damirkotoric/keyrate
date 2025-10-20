'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Dashboard error:', error)
  }, [error])

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <Alert variant="destructive">
        <AlertTitle>Failed to load dashboard</AlertTitle>
        <AlertDescription>
          {error.message || 'An error occurred while loading the dashboard. Please try again.'}
        </AlertDescription>
      </Alert>

      <Button onClick={reset}>Retry</Button>
    </div>
  )
}

