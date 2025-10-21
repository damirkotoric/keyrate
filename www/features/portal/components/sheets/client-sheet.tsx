'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { SheetWrapper, ViewField, SheetFormFooter } from './sheet-wrapper'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { detectRegionFromAddress } from '@features/portal/lib/region-utils'

export function ClientSheet({ clientId, open, onClose }: {
  clientId?: string | null
  open: boolean
  onClose: () => void
}) {
  const [isEditing, setIsEditing] = useState(!clientId)
  const [client, setClient] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})
  const [initialFormData, setInitialFormData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  // Detect region from address in real-time
  const detectedRegion = useMemo(() => {
    return detectRegionFromAddress(formData.address)
  }, [formData.address])

  const hasChanges = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData)
  }, [formData, initialFormData])

  useEffect(() => {
    if (open) {
      if (clientId) {
        setIsEditing(false)
        loadClient()
      } else {
        setIsEditing(true)
        setClient(null)
        const emptyData = {}
        setFormData(emptyData)
        setInitialFormData(emptyData)
      }
    }
  }, [clientId, open])

  async function loadClient() {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .eq('id', clientId)
      .single()
    
    setClient(data)
    setFormData(data)
    setInitialFormData(data)
  }

  function handleCancel() {
    setFormData(initialFormData)
    setIsEditing(false)
  }

  async function handleSave() {
    setLoading(true)
    try {
      // Detect region from address if not already set
      const region = formData.region || detectRegionFromAddress(formData.address)
      const dataToSave = {
        ...formData,
        region
      }

      if (clientId) {
        // Update
        await supabase.from('clients').update(dataToSave).eq('id', clientId)
      } else {
        // Create
        const { data: { user } } = await supabase.auth.getUser()
        await supabase.from('clients').insert({
          ...dataToSave,
          broker_id: user?.id
        })
      }
      setIsEditing(false)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  const title = clientId ? (isEditing ? 'Edit Client' : 'Client Details') : 'New Client'

  return (
    <SheetWrapper
      open={open}
      onClose={onClose}
      title={title}
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onCancel={handleCancel}
      showEdit={!!clientId}
      footer={
        isEditing || !clientId ? (
          <SheetFormFooter
            isEditMode={!!clientId}
            onCancel={handleCancel}
            onSave={handleSave}
            loading={loading}
            hasChanges={hasChanges}
          />
        ) : undefined
      }
    >
      {!isEditing && client ? (
        // View Mode
        <>
          <ViewField label="Full Name" value={client.full_name} />
          <ViewField label="Email" value={client.email || '-'} />
          <ViewField label="Phone" value={client.phone || '-'} />
          <ViewField label="Address" value={client.address || '-'} />
          <ViewField label="Region" value={client.region} />
          <ViewField label="Status" value={<span className="capitalize">{client.status}</span>} />
          {client.notes && (
            <ViewField label="Notes" value={<span className="whitespace-pre-wrap">{client.notes}</span>} />
          )}
        </>
      ) : (
        // Edit Mode
        <>
          <div>
            <label className="block text-sm font-medium pb-2" htmlFor="client-full-name">Full Name *</label>
            <Input
              id="client-full-name"
              type="text"
              value={formData.full_name || ''}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium pb-2" htmlFor="client-email">Email</label>
            <Input
              id="client-email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium pb-2" htmlFor="client-phone">Phone</label>
            <Input
              id="client-phone"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium pb-2" htmlFor="client-address">Address</label>
            <Textarea
              id="client-address"
              value={formData.address || ''}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              rows={3}
              placeholder="Enter full address"
            />
            {detectedRegion && (
              <p className="text-xs text-muted-foreground mt-1">
                Detected region: <span className="font-medium">{detectedRegion === 'CA' ? 'Canada' : detectedRegion === 'AE' ? 'UAE' : 'United States'}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium pb-2" htmlFor="client-notes">Notes</label>
            <Textarea
              id="client-notes"
              value={formData.notes || ''}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={4}
            />
          </div>
        </>
      )}
    </SheetWrapper>
  )
}

