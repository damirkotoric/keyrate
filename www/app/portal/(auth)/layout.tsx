import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PortalLayout } from '@features/portal/components/layout/portal-layout'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/portal/login')
  }

  // Check if user is banned
  if (user.banned_until) {
    const bannedUntil = new Date(user.banned_until)
    if (bannedUntil > new Date()) {
      redirect('/portal/login')
    }
  }

  return <PortalLayout user={user}>{children}</PortalLayout>
}

