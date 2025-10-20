'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function SettingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Settings error:', error)
  }, [error])

  return (
    <div className="p-8 max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Alert variant="destructive">
        <AlertTitle>Failed to load settings</AlertTitle>
        <AlertDescription>
          {error.message || 'An error occurred while loading settings. Please try again.'}
        </AlertDescription>
      </Alert>

      <Button onClick={reset}>Retry</Button>
    </div>
  )
}

