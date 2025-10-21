import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.user_metadata?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Prevent admin from deactivating themselves
    if (user.id === id) {
      return NextResponse.json(
        { error: 'You cannot deactivate your own account' },
        { status: 400 }
      )
    }

    const serviceSupabase = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Ban the user for 100 years (effectively permanent until manually reactivated)
    // Note: This doesn't immediately invalidate existing JWT tokens in the user's browser.
    // The ban will be enforced when the middleware checks the user's ban status.
    const { data, error } = await serviceSupabase.auth.admin.updateUserById(
      id,
      {
        ban_duration: '876000h' // 100 years
      }
    )

    if (error) {
      throw error
    }

    return NextResponse.json({ 
      success: true,
      user: data.user 
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

