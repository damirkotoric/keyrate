'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { SheetWrapper, ViewField, SheetFormFooter } from './sheet-wrapper'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PasswordInput, isPasswordValid } from '@/components/ui/password-input'
import { Button } from '@/components/ui/button'
import { UserX, UserCheck } from 'lucide-react'

export function BrokerSheet({ brokerId, open, onClose }: {
  brokerId?: string | null
  open: boolean
  onClose: () => void
}) {
  const [isEditing, setIsEditing] = useState(!brokerId)
  const [broker, setBroker] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})
  const [initialFormData, setInitialFormData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const supabase = createClient()

  const hasChanges = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData)
  }, [formData, initialFormData])

  useEffect(() => {
    async function loadCurrentUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUserId(user?.id || null)
    }
    loadCurrentUser()
  }, [])

  useEffect(() => {
    if (open) {
      if (brokerId) {
        setIsEditing(false)
        loadBroker()
      } else {
        setIsEditing(true)
        setBroker(null)
        const emptyData = {}
        setFormData(emptyData)
        setInitialFormData(emptyData)
      }
    }
  }, [brokerId, open])

  async function loadBroker() {
    const response = await fetch(`/api/portal/brokers/${brokerId}`)
    if (response.ok) {
      const data = await response.json()
      setBroker(data.broker)
      const initialData = {
        full_name: data.broker.user_metadata?.full_name,
        role: data.broker.user_metadata?.role || 'broker'
      }
      setFormData(initialData)
      setInitialFormData(initialData)
    }
  }

  function handleCancel() {
    setFormData(initialFormData)
    setIsEditing(false)
  }

  async function handleSave() {
    // Validate password for new brokers
    if (!brokerId && !isPasswordValid(formData.password || '')) {
      setError('Please ensure password meets all requirements')
      return
    }

    setLoading(true)
    setError('')

    try {
      if (brokerId) {
        // Update
        const response = await fetch(`/api/portal/brokers/${brokerId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        
        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Failed to update broker')
        }
      } else {
        // Create
        const response = await fetch('/api/portal/brokers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        
        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Failed to create broker')
        }
      }
      
      setIsEditing(false)
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDeactivate() {
    if (!brokerId) return
    
    // Check if trying to deactivate self
    if (currentUserId === brokerId) {
      setError('You cannot deactivate your own account')
      return
    }
    
    const brokerName = broker?.user_metadata?.full_name || broker?.email
    if (!confirm(`Are you sure you want to deactivate ${brokerName}? This will immediately log them out and revoke their access.`)) {
      return
    }

    setActionLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/portal/brokers/${brokerId}/deactivate`, {
        method: 'POST',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to deactivate user')
      }

      // Reload broker data to show updated status
      await loadBroker()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setActionLoading(false)
    }
  }

  async function handleReactivate() {
    if (!brokerId) return
    
    const brokerName = broker?.user_metadata?.full_name || broker?.email
    if (!confirm(`Are you sure you want to reactivate ${brokerName}? They will be able to log in again.`)) {
      return
    }

    setActionLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/portal/brokers/${brokerId}/reactivate`, {
        method: 'POST',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to reactivate user')
      }

      // Reload broker data to show updated status
      await loadBroker()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const title = brokerId ? (isEditing ? 'Edit Broker' : 'Broker Details') : 'New Broker'
  const isUserBanned = broker?.banned_until && new Date(broker.banned_until) > new Date()
  const isSelfView = currentUserId === brokerId

  return (
    <SheetWrapper
      open={open}
      onClose={onClose}
      title={title}
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onCancel={handleCancel}
      showEdit={!!brokerId}
      error={error}
      footer={
        isEditing || !brokerId ? (
          <SheetFormFooter
            isEditMode={!!brokerId}
            onCancel={handleCancel}
            onSave={handleSave}
            loading={loading}
            hasChanges={hasChanges}
          />
        ) : undefined
      }
    >
      {!isEditing && broker ? (
        // View Mode
        <>
          <ViewField label="Full Name" value={broker.user_metadata?.full_name || '-'} />
          <ViewField label="Email" value={broker.email} />
          <ViewField label="Role" value={<span className="capitalize">{broker.user_metadata?.role || 'broker'}</span>} />
          <ViewField 
            label="Status" 
            value={
              <span className={`px-2 py-1 rounded-full text-xs ${isUserBanned ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                {isUserBanned ? 'Inactive' : 'Active'}
              </span>
            }
          />
          <ViewField label="Created" value={new Date(broker.created_at).toLocaleDateString()} />

          {/* Deactivate/Reactivate Button - Only show if not viewing self */}
          {!isSelfView && (
            <div className="pt-4 border-t">
              {isUserBanned ? (
                <Button
                  onClick={handleReactivate}
                  disabled={actionLoading}
                  variant="outline"
                  className="w-full"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  {actionLoading ? 'Reactivating...' : 'Reactivate User'}
                </Button>
              ) : (
                <Button
                  onClick={handleDeactivate}
                  disabled={actionLoading}
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                >
                  <UserX className="w-4 h-4 mr-2" />
                  {actionLoading ? 'Deactivating...' : 'Deactivate User'}
                </Button>
              )}
            </div>
          )}
        </>
      ) : (
        // Edit Mode
        <>
          {!brokerId && (
            <div>
              <label className="block text-sm font-medium pb-2" htmlFor="broker-email">Email *</label>
              <Input
                id="broker-email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          )}

          {!brokerId && (
            <PasswordInput
              id="broker-password"
              label="Password"
              value={formData.password || ''}
              onChange={(value) => setFormData({...formData, password: value})}
              required
              showGenerator
              showRequirements
            />
          )}

          <div>
            <label className="block text-sm font-medium pb-2" htmlFor="broker-full-name">Full Name *</label>
            <Input
              id="broker-full-name"
              type="text"
              value={formData.full_name || ''}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium pb-2" htmlFor="broker-role">Role</label>
            <Select value={formData.role} onValueChange={(v) => setFormData({...formData, role: v})}>
              <SelectTrigger id="broker-role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="broker">Broker</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </SheetWrapper>
  )
}

