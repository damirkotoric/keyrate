'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { ClientSheet } from '@features/portal/components/sheets/client-sheet'

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [filteredClients, setFilteredClients] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isNewOpen, setIsNewOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    loadClients()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      setFilteredClients(
        clients.filter(client => 
          client.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.phone?.includes(searchQuery)
        )
      )
    } else {
      setFilteredClients(clients)
    }
  }, [searchQuery, clients])

  async function loadClients() {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    setClients(data || [])
  }

  return (
    <>
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Clients</h1>
          <Button onClick={() => setIsNewOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Client
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Clients Table */}
        <div className="bg-card rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Phone</th>
                <th className="text-left p-4">Region</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => setSelectedId(client.id)}
                  className="border-b hover:bg-muted/50 cursor-pointer"
                >
                  <td className="p-4">{client.full_name}</td>
                  <td className="p-4">{client.email || '-'}</td>
                  <td className="p-4">{client.phone || '-'}</td>
                  <td className="p-4">{client.region}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-muted capitalize">
                      {client.status}
                    </span>
                  </td>
                  <td className="p-4">{new Date(client.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View/Edit Sheet */}
      <ClientSheet
        clientId={selectedId}
        open={!!selectedId}
        onClose={() => {
          setSelectedId(null)
          loadClients()
        }}
      />

      {/* Create Sheet */}
      <ClientSheet
        open={isNewOpen}
        onClose={() => {
          setIsNewOpen(false)
          loadClients()
        }}
      />
    </>
  )
}

