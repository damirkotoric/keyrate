import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShineBorder } from "@/components/ui/shine-border"

interface PreApprovalFormProps {
  className?: string
}

export default function PreApprovalForm({ className = "" }: PreApprovalFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Pre-approval form submitted")
  }

  return (
    <div className={`relative rounded-lg ${className}`}>
      <ShineBorder
        shineColor={["var(--primary)", "#FFFFFF", "var(--primary)"]}
        duration={12}
        borderWidth={2}
      />
      <form 
        onSubmit={handleSubmit}
        className="relative rounded-md p-8 pb-10 text-foreground bg-linear-130 from-card to-muted shadow-xl m-1 border border-border/20"
      >
      <h3 className="text-2xl font-bold mb-2 text-center">Quick Pre-Approval</h3>
      <p className="mb-6 text-muted-foreground text-center">No credit check required. Results in 2 minutes.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium pb-2" htmlFor="property-value">Property Value</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground select-none">$</span>
            <Input 
              placeholder="600,000" 
              className="h-12 pl-7" 
              id="property-value" 
              name="propertyValue"
              type="text"
              inputMode="numeric"
              pattern="[0-9,]*"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium pb-2" htmlFor="downpayment">Down Payment</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground select-none">$</span>
            <Input 
              placeholder="120,000" 
              className="h-12 pl-7" 
              id="downpayment" 
              name="downPayment"
              type="text"
              inputMode="numeric"
              pattern="[0-9,]*"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium pb-2" htmlFor="annual-income">Annual Income</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground select-none">$</span>
            <Input 
              placeholder="90,000" 
              className="h-12 pl-7" 
              id="annual-income" 
              name="annualIncome"
              type="text"
              inputMode="numeric"
              pattern="[0-9,]*"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium pb-2" htmlFor="email-address">Email Address</label>
          <Input 
            placeholder="your@email.com" 
            className="h-12" 
            id="email-address" 
            name="email"
            type="email"
            required
          />
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-lg mt-2">
          Get My Pre-Approval →
        </Button>
      </div>
      </form>
    </div>
  )
}

export { PreApprovalForm }
