'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { SheetWrapper, ViewField, SheetFormFooter } from './sheet-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Upload, File, X } from 'lucide-react'

const CURRENCY_MAP: Record<string, { symbol: string; code: string; prefix: string }> = {
  CA: { symbol: '$', code: 'CAD', prefix: 'CAD $' },
  AE: { symbol: 'AED', code: 'AED', prefix: 'AED ' },
  US: { symbol: '$', code: 'USD', prefix: 'USD $' },
}

export function ApplicationSheet({ applicationId, open, onClose }: {
  applicationId?: string | null
  open: boolean
  onClose: () => void
}) {
  const [isEditing, setIsEditing] = useState(!applicationId)
  const [application, setApplication] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})
  const [initialFormData, setInitialFormData] = useState<any>({})
  const [clients, setClients] = useState<any[]>([])
  const [lenders, setLenders] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const hasChanges = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData)
  }, [formData, initialFormData])

  // Get currency info based on selected region
  const selectedRegion = isEditing ? formData.region : application?.region
  const currencyInfo = CURRENCY_MAP[selectedRegion] || CURRENCY_MAP['CA']
  const formatCurrency = (value: number) => {
    if (!value) return '-'
    return `${currencyInfo.prefix}${value.toLocaleString()}`
  }

  useEffect(() => {
    if (open) {
      loadClients()
      loadLenders()
      if (applicationId) {
        setIsEditing(false)
        loadApplication()
      } else {
        setIsEditing(true)
        setApplication(null)
        const emptyData = {}
        setFormData(emptyData)
        setInitialFormData(emptyData)
      }
    }
  }, [applicationId, open])

  async function loadClients() {
    const { data } = await supabase.from('clients').select('id, full_name').order('full_name')
    setClients(data || [])
  }

  async function loadLenders() {
    const { data } = await supabase.from('lenders').select('id, name').eq('is_active', true).order('name')
    setLenders(data || [])
  }

  async function loadApplication() {
    const { data } = await supabase
      .from('applications')
      .select('*, clients(*), lenders(*)')
      .eq('id', applicationId)
      .single()
    
    setApplication(data)
    setFormData(data)
    setInitialFormData(data)
    loadDocuments()
  }

  function handleCancel() {
    setFormData(initialFormData)
    setIsEditing(false)
  }

  async function loadDocuments() {
    if (!applicationId) return
    
    const { data } = await supabase
      .from('documents')
      .select('*')
      .eq('application_id', applicationId)
      .order('uploaded_at', { ascending: false })
    
    setDocuments(data || [])
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!applicationId || !e.target.files || e.target.files.length === 0) {
      return
    }

    setUploading(true)
    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${applicationId}/${fileName}`

    try {
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('application-documents')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Save metadata to database
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          application_id: applicationId,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size
        })

      if (dbError) throw dbError

      loadDocuments()
      e.target.value = '' // Reset input
    } catch (error: any) {
      console.error('Error uploading file:', error)
      alert('Failed to upload file: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  async function handleDeleteDocument(docId: string, filePath: string) {
    if (!confirm('Are you sure you want to delete this document?')) return

    try {
      // Delete from storage
      await supabase.storage
        .from('application-documents')
        .remove([filePath])

      // Delete from database
      await supabase
        .from('documents')
        .delete()
        .eq('id', docId)

      loadDocuments()
    } catch (error: any) {
      console.error('Error deleting file:', error)
      alert('Failed to delete file: ' + error.message)
    }
  }

  async function downloadDocument(filePath: string, fileName: string) {
    try {
      const { data, error } = await supabase.storage
        .from('application-documents')
        .download(filePath)

      if (error) throw error

      // Create download link
      const url = URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error: any) {
      console.error('Error downloading file:', error)
      alert('Failed to download file: ' + error.message)
    }
  }

  async function handleSave() {
    setLoading(true)
    try {
      if (applicationId) {
        // Update
        const { error } = await supabase.from('applications').update(formData).eq('id', applicationId)
        if (error) throw error
      } else {
        // Create
        const { data: { user } } = await supabase.auth.getUser()
        const { error } = await supabase.from('applications').insert({
          ...formData,
          broker_id: user?.id
        })
        if (error) throw error
      }
      setIsEditing(false)
      onClose()
    } catch (error: any) {
      console.error('Error saving application:', error)
      alert('Failed to save application: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const title = applicationId ? (isEditing ? 'Edit Application' : 'Application Details') : 'New Application'

  return (
    <SheetWrapper
      open={open}
      onClose={onClose}
      title={title}
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onCancel={handleCancel}
      showEdit={!!applicationId}
      footer={
        isEditing || !applicationId ? (
          <SheetFormFooter
            isEditMode={!!applicationId}
            onCancel={handleCancel}
            onSave={handleSave}
            loading={loading}
            hasChanges={hasChanges}
          />
        ) : undefined
      }
    >
      {!isEditing && application ? (
            // View Mode
            <>
              <ViewField label="Client" value={application.clients?.full_name} />
              <ViewField label="Property Value" value={formatCurrency(application.property_value)} />
              <ViewField label="Loan Amount" value={formatCurrency(application.loan_amount)} />
              <ViewField label="Down Payment" value={formatCurrency(application.down_payment)} />
              <ViewField label="Annual Income" value={formatCurrency(application.annual_income)} />
              <ViewField label="Property Address" value={application.property_address || '-'} />
              <ViewField 
                label="Property Country" 
                value={
                  application.region === 'CA' ? '🇨🇦 Canada' :
                  application.region === 'AE' ? '🇦🇪 UAE' :
                  application.region === 'US' ? '🇺🇸 USA' : '-'
                } 
              />
              <ViewField label="Status" value={<span className="capitalize">{application.status}</span>} />
              {application.lenders && <ViewField label="Lender" value={application.lenders.name} />}
              {application.rate && <ViewField label="Rate" value={`${application.rate}%`} />}
              {application.notes && (
                <ViewField label="Notes" value={<span className="whitespace-pre-wrap">{application.notes}</span>} />
              )}
              
              {/* Documents Section */}
              <div className="pt-4 border-t">
                <p className="text-sm font-medium pb-2">Documents</p>
                <div className="mt-2 space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <button
                        onClick={() => downloadDocument(doc.file_path, doc.file_name)}
                        className="flex items-center gap-2 flex-1 text-left hover:underline"
                      >
                        <File className="w-4 h-4" />
                        <span className="text-sm">{doc.file_name}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(doc.id, doc.file_path)}
                        className="p-1 hover:bg-destructive/10 rounded"
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  ))}
                  
                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                    <label htmlFor="file-upload">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full"
                        disabled={uploading}
                        onClick={(e) => {
                          e.preventDefault()
                          document.getElementById('file-upload')?.click()
                        }}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading ? 'Uploading...' : 'Upload Document'}
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Edit Mode
            <>
              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="app-client">Client</label>
                <Select value={formData.client_id} onValueChange={(v) => setFormData({...formData, client_id: v})}>
                  <SelectTrigger id="app-client">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.full_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="app-property-value">Property Value</label>
                <Input
                  id="app-property-value"
                  type="number"
                  value={formData.property_value || ''}
                  onChange={(e) => setFormData({...formData, property_value: parseFloat(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="app-loan-amount">Loan Amount</label>
                <Input
                  id="app-loan-amount"
                  type="number"
                  value={formData.loan_amount || ''}
                  onChange={(e) => setFormData({...formData, loan_amount: parseFloat(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="app-down-payment">Down Payment</label>
                <Input
                  id="app-down-payment"
                  type="number"
                  value={formData.down_payment || ''}
                  onChange={(e) => setFormData({...formData, down_payment: parseFloat(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="app-annual-income">Annual Income</label>
                <Input
                  id="app-annual-income"
                  type="number"
                  value={formData.annual_income || ''}
                  onChange={(e) => setFormData({...formData, annual_income: parseFloat(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="app-property-address">Property Address</label>
                <Input
                  id="app-property-address"
                  type="text"
                  value={formData.property_address || ''}
                  onChange={(e) => setFormData({...formData, property_address: e.target.value})}
                  placeholder="Enter property address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="app-region">Property Country</label>
                <Select value={formData.region} onValueChange={(v) => setFormData({...formData, region: v})}>
                  <SelectTrigger id="app-region">
                    <SelectValue placeholder="Select country">
                      {formData.region === 'CA' && '🇨🇦 Canada'}
                      {formData.region === 'AE' && '🇦🇪 UAE'}
                      {formData.region === 'US' && '🇺🇸 USA'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CA" textValue="Canada">🇨🇦 Canada</SelectItem>
                    <SelectItem value="AE" textValue="UAE">🇦🇪 UAE</SelectItem>
                    <SelectItem value="US" textValue="USA">🇺🇸 USA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="app-purpose">Purpose</label>
                <Select value={formData.purpose} onValueChange={(v) => setFormData({...formData, purpose: v})}>
                  <SelectTrigger id="app-purpose">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">Purchase</SelectItem>
                    <SelectItem value="refinance">Refinance</SelectItem>
                    <SelectItem value="renewal">Renewal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="app-mortgage-type">Mortgage Type</label>
                <Select value={formData.mortgage_type} onValueChange={(v) => setFormData({...formData, mortgage_type: v})}>
                  <SelectTrigger id="app-mortgage-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed</SelectItem>
                    <SelectItem value="variable">Variable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="app-term">Term</label>
                <Select value={formData.term} onValueChange={(v) => setFormData({...formData, term: v})}>
                  <SelectTrigger id="app-term">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1yr">1 Year</SelectItem>
                    <SelectItem value="3yr">3 Years</SelectItem>
                    <SelectItem value="5yr">5 Years</SelectItem>
                    <SelectItem value="10yr">10 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="app-status">Status</label>
                <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v})}>
                  <SelectTrigger id="app-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="funded">Funded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="app-lender">Lender</label>
                <Select value={formData.lender_id} onValueChange={(v) => setFormData({...formData, lender_id: v})}>
                  <SelectTrigger id="app-lender">
                    <SelectValue placeholder="Select lender" />
                  </SelectTrigger>
                  <SelectContent>
                    {lenders.map(l => (
                      <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="app-rate">Rate (%)</label>
                <Input
                  id="app-rate"
                  type="number"
                  step="0.001"
                  value={formData.rate || ''}
                  onChange={(e) => setFormData({...formData, rate: parseFloat(e.target.value)})}
                  placeholder="e.g., 5.25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium pb-2" htmlFor="app-notes">Notes</label>
                <Textarea
                  id="app-notes"
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

