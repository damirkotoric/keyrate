'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { BrokerSheet } from '@/components/portal/broker-sheet'
import { useRouter } from 'next/navigation'

export default function BrokersPage() {
  const [brokers, setBrokers] = useState<any[]>([])
  const [filteredBrokers, setFilteredBrokers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isNewOpen, setIsNewOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    checkAdmin()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      setFilteredBrokers(
        brokers.filter(broker => 
          broker.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          broker.user_metadata?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredBrokers(brokers)
    }
  }, [searchQuery, brokers])

  async function checkAdmin() {
    const { data: { user } } = await supabase.auth.getUser()
    setCurrentUser(user)
    
    if (user?.user_metadata?.role !== 'admin') {
      router.push('/portal/applications')
      return
    }
    
    loadBrokers()
  }

  async function loadBrokers() {
    // Fetch all users from auth.users via a custom API endpoint
    const response = await fetch('/api/portal/brokers')
    if (response.ok) {
      const data = await response.json()
      setBrokers(data.brokers || [])
    }
  }

  if (!currentUser || currentUser.user_metadata?.role !== 'admin') {
    return (
      <div className="p-8">
        <p>Access denied. Admin only.</p>
      </div>
    )
  }

  return (
    <>
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Brokers</h1>
          <Button onClick={() => setIsNewOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Broker
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search brokers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Brokers Table */}
        <div className="bg-card rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrokers.map((broker) => (
                <tr
                  key={broker.id}
                  onClick={() => setSelectedId(broker.id)}
                  className="border-b hover:bg-muted/50 cursor-pointer"
                >
                  <td className="p-4">{broker.user_metadata?.full_name || '-'}</td>
                  <td className="p-4">{broker.email}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-muted capitalize">
                      {broker.user_metadata?.role || 'broker'}
                    </span>
                  </td>
                  <td className="p-4">{new Date(broker.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View/Edit Sheet */}
      <BrokerSheet
        brokerId={selectedId}
        open={!!selectedId}
        onClose={() => {
          setSelectedId(null)
          loadBrokers()
        }}
      />

      {/* Create Sheet */}
      <BrokerSheet
        open={isNewOpen}
        onClose={() => {
          setIsNewOpen(false)
          loadBrokers()
        }}
      />
    </>
  )
}

