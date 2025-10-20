import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, CheckCircle, Clock } from 'lucide-react'
import { RecentApplications } from '@/components/portal/recent-applications'

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
  const { data: recentApplications } = await supabase
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

  const stats = [
    { title: 'Total Clients', value: totalClients || 0, icon: Users },
    { title: 'Total Applications', value: totalApplications || 0, icon: FileText },
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
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <RecentApplications applications={recentApplications || []} />
    </div>
  )
}

