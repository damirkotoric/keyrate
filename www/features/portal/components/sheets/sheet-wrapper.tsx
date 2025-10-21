'use client'

import { ReactNode } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { X, ArrowLeft } from 'lucide-react'

interface SheetWrapperProps {
  open: boolean
  onClose: () => void
  title: string
  isEditing: boolean
  onEdit?: () => void
  onCancel?: () => void
  showEdit?: boolean
  error?: string
  footer?: ReactNode
  children: ReactNode
}

export function SheetWrapper({ 
  open, 
  onClose, 
  title, 
  isEditing, 
  onEdit,
  onCancel, 
  showEdit = false,
  error,
  footer,
  children 
}: SheetWrapperProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {isEditing && showEdit && onCancel && (
              <Button onClick={onCancel} variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {title}
          </SheetTitle>
          {!isEditing && showEdit && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
          <SheetClose asChild>
            <Button variant="outline" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="mt-6 mb-6 space-y-4">
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}
          {children}
        </div>

        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  )
}

export function ViewField({ label, value }: { label: string; value: string | ReactNode }) {
  return (
    <div>
      <p className="text-sm font-medium pb-2">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  )
}

export function SheetFormFooter({
  isEditMode,
  onCancel,
  onSave,
  loading,
  hasChanges,
}: {
  isEditMode: boolean
  onCancel: () => void
  onSave: () => void
  loading: boolean
  hasChanges: boolean
}) {
  return (
    <>
      {isEditMode && (
        <Button onClick={onCancel} variant="outline" disabled={loading}>
          Cancel
        </Button>
      )}
      <Button onClick={onSave} className="flex-1" disabled={loading || !hasChanges}>
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </>
  )
}

