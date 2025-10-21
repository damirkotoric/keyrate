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
  const bannedUntil = (user as any).banned_until
  if (bannedUntil) {
    const banDate = new Date(bannedUntil)
    if (banDate > new Date()) {
      redirect('/portal/login')
    }
  }

  return <PortalLayout user={user}>{children}</PortalLayout>
}

