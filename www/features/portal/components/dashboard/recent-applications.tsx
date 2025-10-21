'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ApplicationSheet } from '../sheets/application-sheet'

interface RecentApplication {
  id: string
  status: string
  created_at: string
  clients: {
    full_name: string
  } | null
}

export function RecentApplications({ applications }: { applications: RecentApplication[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications?.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedId(app.id)}
                className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
              >
                <div>
                  <p className="font-medium">{app.clients?.full_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(app.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs bg-muted capitalize">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Application Sheet */}
      <ApplicationSheet
        applicationId={selectedId}
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
      />
    </>
  )
}

