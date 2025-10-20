'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { SheetWrapper, ViewField, SheetFormFooter } from './sheet-wrapper'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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
  const supabase = createClient()

  const hasChanges = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData)
  }, [formData, initialFormData])

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

  const title = brokerId ? (isEditing ? 'Edit Broker' : 'Broker Details') : 'New Broker'

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
          <ViewField label="Created" value={new Date(broker.created_at).toLocaleDateString()} />
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
            <div>
              <label className="block text-sm font-medium pb-2" htmlFor="broker-password">Password *</label>
              <Input
                id="broker-password"
                type="password"
                value={formData.password || ''}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                minLength={6}
                placeholder="Minimum 6 characters"
              />
            </div>
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

