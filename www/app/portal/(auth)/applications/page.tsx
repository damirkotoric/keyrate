'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { ApplicationSheet } from '@/components/portal/application-sheet'

const CURRENCY_MAP: Record<string, { prefix: string }> = {
  CA: { prefix: 'CAD $' },
  AE: { prefix: 'AED' },
  US: { prefix: 'USD $' },
}

const formatCurrency = (value: number, region: string) => {
  if (!value) return '-'
  const currencyInfo = CURRENCY_MAP[region] || CURRENCY_MAP['CA']
  return `${currencyInfo.prefix}${value.toLocaleString()}`
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [filteredApplications, setFilteredApplications] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isNewOpen, setIsNewOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    loadApplications()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      setFilteredApplications(
        applications.filter(app => 
          app.clients?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.property_address?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredApplications(applications)
    }
  }, [searchQuery, applications])

  async function loadApplications() {
    const { data } = await supabase
      .from('applications')
      .select(`
        *,
        clients (
          id,
          full_name,
          email,
          phone
        )
      `)
      .order('created_at', { ascending: false })
    
    setApplications(data || [])
  }

  return (
    <>
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Applications</h1>
          <Button onClick={() => setIsNewOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Application
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Applications Table */}
        <div className="bg-card rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Client</th>
                <th className="text-left p-4">Property Address</th>
                <th className="text-left p-4">Loan Amount</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Property Country</th>
                <th className="text-left p-4">Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => setSelectedId(app.id)}
                  className="border-b hover:bg-muted/50 cursor-pointer"
                >
                  <td className="p-4">{app.clients?.full_name}</td>
                  <td className="p-4">{app.property_address || '-'}</td>
                  <td className="p-4">{formatCurrency(app.loan_amount, app.region)}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-muted">
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {app.region === 'CA' && '🇨🇦 Canada'}
                    {app.region === 'AE' && '🇦🇪 UAE'}
                    {app.region === 'US' && '🇺🇸 USA'}
                    {!app.region && '-'}
                  </td>
                  <td className="p-4">
                    {new Date(app.created_at).toLocaleDateString('en-GB', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View/Edit Sheet */}
      <ApplicationSheet
        applicationId={selectedId}
        open={!!selectedId}
        onClose={() => {
          setSelectedId(null)
          loadApplications()
        }}
      />

      {/* Create Sheet */}
      <ApplicationSheet
        open={isNewOpen}
        onClose={() => {
          setIsNewOpen(false)
          loadApplications()
        }}
      />
    </>
  )
}

