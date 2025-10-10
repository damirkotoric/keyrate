"use client"

import React, { useMemo, useRef, useState, useEffect } from "react"
import { ChevronDown } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { ShineBorder } from "@/components/ui/shine-border"
import { track } from "@/lib/analytics"

type Region = "CANADA" | "UAE" | "USA" | "GLOBAL"

interface PreApprovalFormProps { className?: string; initialRegion?: Region }

const REGION_PLACEHOLDERS: Record<Region, { pv: string; dp: string; ai: string; symbol: "$" | "AED"; code: "CAD" | "AED" | "USD" | "" }> = {
  CANADA: { pv: "750,000", dp: "150,000", ai: "100,000", symbol: "$", code: "CAD" },
  UAE: { pv: "2,000,000", dp: "400,000", ai: "350,000", symbol: "AED", code: "AED" },
  USA: { pv: "600,000", dp: "120,000", ai: "90,000", symbol: "$", code: "USD" },
  GLOBAL: { pv: "600,000", dp: "120,000", ai: "90,000", symbol: "$", code: "" },
}

// No SSR detection helpers – region should be passed from parent when available

function cx(...args: Array<string | false | null | undefined>) { return args.filter(Boolean).join(" ") }

export default function PreApprovalForm({ className = "", initialRegion = "GLOBAL" }: PreApprovalFormProps) {
  const [started, setStarted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const [propertyValue, setPropertyValue] = useState("")
  const [downPayment, setDownPayment] = useState("")
  const [annualIncome, setAnnualIncome] = useState("")
  const [country, setCountry] = useState<"canada" | "uae" | "usa" | "">(
    initialRegion === "CANADA" ? "canada" : initialRegion === "UAE" ? "uae" : initialRegion === "USA" ? "usa" : ""
  )
  const [purpose, setPurpose] = useState<"purchase" | "refinance" | "renewal" | "">("purchase")
  const [mortgageType, setMortgageType] = useState<"fixed" | "variable" | "">("fixed")
  const defaultTermForRegion = (r: Region): string => {
    if (r === "CANADA") return "5-year"
    if (r === "USA") return "30-year"
    if (r === "UAE") return "5-year"
    return ""
  }
  const [term, setTerm] = useState<string>(defaultTermForRegion(initialRegion))

  const [region, setRegion] = useState<Region>(initialRegion)
  const { pv, dp, ai, symbol, code } = REGION_PLACEHOLDERS[region]

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showMore, setShowMore] = useState(false)
  const onFirstFocus = () => { if (!started) { setStarted(true); track("lead_started", { region, source: "pre_approval" }) } }
  const onlyDigitsAndComma = (s: string) => s.replace(/[^\d,]/g, "")
  const termOptions = useMemo(() => {
    if (region === "CANADA") return ["1-year","2-year","3-year","5-year"]
    if (region === "USA") return ["30-year","15-year"]
    if (region === "UAE") return ["3-year","5-year"]
    return ["3-year","5-year"]
  }, [region])
  const termDisabled = !country && region === "GLOBAL"

  // Keep region in sync when user selects a country
  useEffect(() => {
    if (country === "canada") setRegion("CANADA")
    else if (country === "uae") setRegion("UAE")
    else if (country === "usa") setRegion("USA")
  }, [country])

  // Ensure term has a sensible default when region changes
  useEffect(() => {
    const options = region === "CANADA" ? ["1-year","2-year","3-year","5-year"] : region === "USA" ? ["30-year","15-year"] : region === "UAE" ? ["3-year","5-year"] : []
    if (!options.includes(term)) {
      setTerm(defaultTermForRegion(region))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region])

  const validate = () => {
    const next: Record<string, string> = {}
    if (!propertyValue) next.propertyValue = "Enter property value."
    if (!downPayment) next.downPayment = "Enter down payment."
    if (!annualIncome) next.annualIncome = "Enter annual income."
    if (!purpose) next.purpose = "Select purpose."
    if (!mortgageType) next.mortgageType = "Choose preference."
    if (!term && !termDisabled) next.term = "Select term."
    // no email collection
    // If no detected region and no country chosen, require country
    if (region === "GLOBAL" && !country) next.country = "Choose country."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("idle"); setErrorMsg("")
    if (!validate()) return
    setSubmitting(true)
    try {
      const payload = {
        propertyValue,
        downPayment,
        annualIncome,
        country: country || (region !== "GLOBAL" ? region : ""),
        purpose,
        mortgageType,
        term,
        region,
      }
      const res = await fetch("/api/preapproval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      setStatus("success")
      track("lead_submitted", { region, purpose })
    } catch (err: any) {
      setStatus("error")
      const msg = err?.message || "Something went wrong."
      setErrorMsg(msg)
      track("lead_failed", { region, message: msg })
    } finally {
      setSubmitting(false)
    }
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
        {/* Property Value */}
        <div>
          <label className="block text-sm font-medium pb-2" htmlFor="property-value">Property Value</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground select-none text-sm">{code} {symbol === "$" ? "$" : "AED"}</span>
            <Input
              placeholder={pv}
              className="h-12 pl-14 pr-12"
              id="property-value"
              name="propertyValue"
              type="text"
              inputMode="numeric"
              pattern="[0-9,]*"
              value={propertyValue}
              onChange={(e) => setPropertyValue(onlyDigitsAndComma(e.target.value))}
              onFocus={onFirstFocus}
              aria-invalid={!!errors.propertyValue}
              aria-describedby={errors.propertyValue ? "error-propertyValue" : undefined}
              required
            />
          </div>
          {errors.propertyValue && (<p id="error-propertyValue" className="mt-1 text-xs text-destructive">{errors.propertyValue}</p>)}
        </div>

        {/* Down Payment */}
        <div>
          <label className="block text-sm font-medium pb-2" htmlFor="downpayment">Down Payment</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground select-none text-sm">{code} {symbol === "$" ? "$" : "AED"}</span>
            <Input
              placeholder={dp}
              className="h-12 pl-14 pr-12"
              id="downpayment"
              name="downPayment"
              type="text"
              inputMode="numeric"
              pattern="[0-9,]*"
              value={downPayment}
              onChange={(e) => setDownPayment(onlyDigitsAndComma(e.target.value))}
              onFocus={onFirstFocus}
              aria-invalid={!!errors.downPayment}
              aria-describedby={errors.downPayment ? "error-downPayment" : undefined}
              required
            />
          </div>
          {errors.downPayment && (<p id="error-downPayment" className="mt-1 text-xs text-destructive">{errors.downPayment}</p>)}
        </div>

        {/* Annual Income */}
        <div>
          <label className="block text-sm font-medium pb-2" htmlFor="annual-income">Annual Income</label>
          <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground select-none text-sm">{code} {symbol === "$" ? "$" : "AED"}</span>
            <Input
              placeholder={ai}
              className="h-12 pl-14 pr-12"
              id="annual-income"
              name="annualIncome"
              type="text"
              inputMode="numeric"
              pattern="[0-9,]*"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(onlyDigitsAndComma(e.target.value))}
              onFocus={onFirstFocus}
              aria-invalid={!!errors.annualIncome}
              aria-describedby={errors.annualIncome ? "error-annualIncome" : undefined}
              required
            />
          </div>
          {errors.annualIncome && (<p id="error-annualIncome" className="mt-1 text-xs text-destructive">{errors.annualIncome}</p>)}
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium pb-2">Property Location</label>
          <Select value={country} onValueChange={(v: any) => setCountry(v)}>
            <SelectTrigger className="w-full h-12" aria-invalid={!!errors.country}>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="uae">UAE</SelectItem>
              <SelectItem value="usa">USA</SelectItem>
            </SelectContent>
          </Select>
          {errors.country && <p className="mt-1 text-xs text-destructive">{errors.country}</p>}
        </div>

        {/* More Options Toggle */}
        <div>
          <button
            type="button"
            onClick={() => {
              setShowMore(!showMore)
              try {
                const evt = new Event("keyrate:layout-change")
                window.dispatchEvent(evt)
                // fire once more after transition to ensure final position
                setTimeout(() => window.dispatchEvent(evt), 200)
              } catch {}
            }}
            className="w-full h-10 rounded-md border border-border text-sm flex items-center justify-center gap-2"
            aria-expanded={showMore}
            aria-controls="more-options"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? "rotate-180" : ""}`} />
            {showMore ? "Hide options" : "More options"}
          </button>
        </div>

        {showMore && (
          <div id="more-options" className="space-y-4">
            {/* Purpose */}
            <div>
              <span className="block text-sm font-medium pb-2">Purpose</span>
              <div role="radiogroup" className="grid grid-cols-3 gap-2">
                {["purchase","refinance","renewal"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPurpose(p as any)}
                    className={cx("h-10 rounded-md border text-sm", purpose === p ? "bg-primary text-primary-foreground border-transparent" : "bg-transparent border-border")}
                    aria-pressed={purpose === p}
                  >
                    {p[0].toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
              {errors.purpose && <p className="mt-1 text-xs text-destructive">{errors.purpose}</p>}
            </div>

            {/* Mortgage Type */}
            <div>
              <span className="block text-sm font-medium pb-2">Preference</span>
              <div role="radiogroup" className="grid grid-cols-2 gap-2">
                {["fixed","variable"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setMortgageType(p as any)}
                    className={cx("h-10 rounded-md border text-sm", mortgageType === p ? "bg-primary text-primary-foreground border-transparent" : "bg-transparent border-border")}
                    aria-pressed={mortgageType === p}
                  >
                    {p[0].toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
              {errors.mortgageType && <p className="mt-1 text-xs text-destructive">{errors.mortgageType}</p>}
            </div>

            {/* Term */}
            <div>
              <label className="block text-sm font-medium pb-2">Term Length</label>
              <Select value={term} onValueChange={(v: any) => setTerm(v)} disabled={termDisabled}>
                <SelectTrigger className="w-full h-12" aria-invalid={!!errors.term}>
                  <SelectValue placeholder={termDisabled ? "Select location first" : "Select term"} />
                </SelectTrigger>
                <SelectContent>
                  {termOptions.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!termDisabled && errors.term && <p className="mt-1 text-xs text-destructive">{errors.term}</p>}
            </div>
          </div>
        )}

        {/* Email */}
        {/* Email removed intentionally */}

        {/* Hidden region field */}
        <input type="hidden" name="region" value={region} readOnly />

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-lg mt-2" disabled={submitting}>
          {submitting ? "Submitting..." : "Get My Pre-Approval →"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By continuing, you agree to our <a className="underline underline-offset-2" href="#">Terms</a> and <a className="underline underline-offset-2" href="#">Privacy Policy</a>. No credit check required.
        </p>

        {/* Post-submit UX */}
        <div aria-live="polite">
          {status === "success" && (
            <Alert className="mt-4">
              <AlertTitle>You’re all set!</AlertTitle>
              <AlertDescription>
                A mortgage specialist will review your details. Want a tailored rate quote now?
              </AlertDescription>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button asChild className="h-10"><a href="/get-quote">Get a tailored quote</a></Button>
                <Button variant="secondary" asChild className="h-10"><a href="/upload">Upload docs</a></Button>
              </div>
            </Alert>
          )}
          {status === "error" && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>{errorMsg || "Please try again."}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
      </form>
    </div>
  )
}

export { PreApprovalForm }
