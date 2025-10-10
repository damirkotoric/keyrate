import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const required = [
      "propertyValue",
      "downPayment",
      "annualIncome",
      "purpose",
      "mortgageType",
      "term",
      "region",
    ]
    for (const k of required) {
      if (!body?.[k]) {
        return NextResponse.json({ ok: false, error: `Missing ${k}` }, { status: 400 })
      }
    }
    // eslint-disable-next-line no-console
    console.log("[preapproval] lead", body)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Invalid request" }, { status: 400 })
  }
}


