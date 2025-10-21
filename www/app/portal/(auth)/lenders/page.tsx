'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { LenderSheet } from '@features/portal/components/sheets/lender-sheet'

export default function LendersPage() {
  const [lenders, setLenders] = useState<any[]>([])
  const [filteredLenders, setFilteredLenders] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isNewOpen, setIsNewOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    loadLenders()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      setFilteredLenders(
        lenders.filter(lender => 
          lender.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredLenders(lenders)
    }
  }, [searchQuery, lenders])

  async function loadLenders() {
    const { data } = await supabase
      .from('lenders')
      .select('*')
      .order('name', { ascending: true })
    
    setLenders(data || [])
  }

  return (
    <>
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Lenders</h1>
          <Button onClick={() => setIsNewOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Lender
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search lenders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Lenders Table */}
        <div className="bg-card rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredLenders.map((lender) => (
                <tr
                  key={lender.id}
                  onClick={() => setSelectedId(lender.id)}
                  className="border-b hover:bg-muted/50 cursor-pointer"
                >
                  <td className="p-4 font-medium">{lender.name}</td>
                  <td className="p-4 capitalize">{lender.type || '-'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                      lender.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {lender.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4">{new Date(lender.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View/Edit Sheet */}
      <LenderSheet
        lenderId={selectedId}
        open={!!selectedId}
        onClose={() => {
          setSelectedId(null)
          loadLenders()
        }}
      />

      {/* Create Sheet */}
      <LenderSheet
        open={isNewOpen}
        onClose={() => {
          setIsNewOpen(false)
          loadLenders()
        }}
      />
    </>
  )
}

