'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { SheetWrapper, ViewField, SheetFormFooter } from './sheet-wrapper'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Check, X, Sparkles } from 'lucide-react'

interface PasswordRequirement {
  label: string
  met: boolean
}

function validatePassword(password: string): PasswordRequirement[] {
  return [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains number', met: /[0-9]/.test(password) },
    { label: 'Contains special character (!@#$%^&*)', met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) }
  ]
}

function generateStrongPassword(): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const special = '!@#$%^&*'
  
  // Ensure at least one of each required character type
  let password = ''
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += special[Math.floor(Math.random() * special.length)]
  
  // Fill the rest randomly (total 16 characters)
  const allChars = uppercase + lowercase + numbers + special
  for (let i = password.length; i < 16; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('')
}

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
  const [showPassword, setShowPassword] = useState(false)
  const supabase = createClient()

  const passwordRequirements = useMemo(() => {
    if (!formData.password) return []
    return validatePassword(formData.password)
  }, [formData.password])

  const isPasswordValid = useMemo(() => {
    return passwordRequirements.length > 0 && passwordRequirements.every(req => req.met)
  }, [passwordRequirements])

  function handleGeneratePassword() {
    const newPassword = generateStrongPassword()
    setFormData({...formData, password: newPassword})
    setShowPassword(true)
  }

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
    // Validate password for new brokers
    if (!brokerId && !isPasswordValid) {
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
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium" htmlFor="broker-password">Password *</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGeneratePassword}
                  className="h-7 text-xs"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Generate
                </Button>
              </div>
              <div className="relative">
                <Input
                  id="broker-password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password || ''}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  className={formData.password && !isPasswordValid ? 'border-destructive' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="space-y-1.5 pt-1">
                  {passwordRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      {req.met ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                      <span className={req.met ? 'text-green-600' : 'text-muted-foreground'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
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

