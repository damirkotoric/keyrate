'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { X } from 'lucide-react'

export function LenderSheet({ lenderId, open, onClose }: {
  lenderId?: string | null
  open: boolean
  onClose: () => void
}) {
  const [isEditing, setIsEditing] = useState(!lenderId)
  const [lender, setLender] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})
  const supabase = createClient()

  useEffect(() => {
    if (open) {
      if (lenderId) {
        setIsEditing(false)
        loadLender()
      } else {
        setIsEditing(true)
        setLender(null)
        setFormData({ is_active: true })
      }
    }
  }, [lenderId, open])

  async function loadLender() {
    const { data } = await supabase
      .from('lenders')
      .select('*')
      .eq('id', lenderId)
      .single()
    
    setLender(data)
    setFormData(data)
  }

  async function handleSave() {
    if (lenderId) {
      // Update
      await supabase.from('lenders').update(formData).eq('id', lenderId)
    } else {
      // Create
      await supabase.from('lenders').insert(formData)
    }
    setIsEditing(false)
    onClose()
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {lenderId ? (isEditing ? 'Edit Lender' : 'Lender Details') : 'New Lender'}
          </SheetTitle>
          {!isEditing && lenderId && (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              Edit
            </Button>
          )}
          <SheetClose asChild>
            <Button variant="outline" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {!isEditing && lender ? (
            // View Mode
            <>
              <div>
                <p className="text-sm font-medium pb-2">Name</p>
                <p className="text-sm">{lender.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium pb-2">Type</p>
                <p className="text-sm capitalize">{lender.type || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium pb-2">Status</p>
                <p className="text-sm capitalize">{lender.is_active ? 'Active' : 'Inactive'}</p>
              </div>
              {lender.notes && (
                <div>
                  <p className="text-sm font-medium pb-2">Notes</p>
                  <p className="text-sm whitespace-pre-wrap">{lender.notes}</p>
                </div>
              )}
            </>
          ) : (
            // Edit Mode
            <>
              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="lender-name">Name *</label>
                <Input
                  id="lender-name"
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., TD Bank"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="lender-type">Type</label>
                <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                  <SelectTrigger id="lender-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank</SelectItem>
                    <SelectItem value="credit_union">Credit Union</SelectItem>
                    <SelectItem value="monoline">Monoline</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="lender-status">Status</label>
                <Select 
                  value={formData.is_active ? 'active' : 'inactive'} 
                  onValueChange={(v) => setFormData({...formData, is_active: v === 'active'})}
                >
                  <SelectTrigger id="lender-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="lender-notes">Notes</label>
                <Textarea
                  id="lender-notes"
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={4}
                  placeholder="Additional information about this lender"
                />
              </div>

              <div className="flex gap-2">
                {lenderId && (
                  <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
                )}
                <Button onClick={handleSave} className="flex-1">Save</Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

