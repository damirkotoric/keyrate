import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PortalLayout } from '@/components/portal/portal-layout'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/portal/login')
  }

  return <PortalLayout user={user}>{children}</PortalLayout>
}

