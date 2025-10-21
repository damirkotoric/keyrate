import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, CheckCircle, Clock, ChevronRight } from 'lucide-react'
import { RecentApplications } from '@features/portal/components/dashboard/recent-applications'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get stats
  const { count: totalClients } = await supabase
    .from('clients')
    .select('*', { count: 'exact', head: true })

  const { count: totalApplications } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })

  const { count: newApplications } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new')

  const { count: approvedApplications } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved')

  // Get recent activity
  const { data: recentApplicationsData } = await supabase
    .from('applications')
    .select(`
      id,
      status,
      created_at,
      clients (
        full_name
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  // Transform the data to match the expected type (clients is a single object, not an array)
  const recentApplications = recentApplicationsData?.map(app => ({
    ...app,
    clients: Array.isArray(app.clients) ? app.clients[0] : app.clients
  }))

  const stats = [
    { title: 'Total Clients', value: totalClients || 0, icon: Users, href: '/portal/clients' },
    { title: 'Total Applications', value: totalApplications || 0, icon: FileText, href: '/portal/applications' },
    { title: 'New Applications', value: newApplications || 0, icon: Clock },
    { title: 'Approved', value: approvedApplications || 0, icon: CheckCircle },
  ]

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.user_metadata?.full_name || 'Broker'}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const cardContent = (
            <Card className={stat.href ? 'cursor-pointer hover:bg-muted/50 transition-colors h-full' : ''}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-1">
                  {stat.title}
                  {stat.href && <ChevronRight className="h-4 w-4" />}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
          
          return stat.href ? (
            <Link key={stat.title} href={stat.href} className="block">
              {cardContent}
            </Link>
          ) : (
            <div key={stat.title}>
              {cardContent}
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <RecentApplications applications={recentApplications || []} />
    </div>
  )
}

