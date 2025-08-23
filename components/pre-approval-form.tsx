import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PreApprovalFormProps {
  className?: string
}

export default function PreApprovalForm({ className = "" }: PreApprovalFormProps) {
  return (
    <div className={`rounded-lg p-8 text-gray-900 bg-linear-130 from-white to-gray-100 shadow-xl border border-border/40 ${className}`}>
      <h3 className="text-2xl font-bold mb-2 text-center">Quick Pre-Approval</h3>
      <p className="mb-6 text-gray-500 text-center">No credit check required. Results in 2 minutes.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium pb-2" htmlFor="property-value">Property Value</label>
          <Input placeholder="$600,000" className="h-12" id="property-value" />
        </div>
        <div>
          <label className="block text-sm font-medium pb-2" htmlFor="downpayment">Down Payment</label>
          <Input placeholder="$120,000" className="h-12" id="downpayment" />
        </div>
        <div>
          <label className="block text-sm font-medium pb-2" htmlFor="annual-income">Annual Income</label>
          <Input placeholder="$90,000" className="h-12" id="annual-income" />
        </div>
        <div>
          <label className="block text-sm font-medium pb-2" htmlFor="email-address">Email Address</label>
          <Input placeholder="your@email.com" className="h-12" id="email-address" />
        </div>
        <Button className="w-full bg-primary hover:bg-primary/90 h-12 text-lg mt-2">Get My Pre-Approval →</Button>
      </div>
    </div>
  )
}

export { PreApprovalForm }
