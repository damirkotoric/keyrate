'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, FileText, Users, UserCog, Building2, ChevronDown } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function PortalLayout({ children, user }: { children: React.ReactNode, user: any }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const isAdmin = user?.user_metadata?.role === 'admin'

  const navigation = [
    { name: 'Dashboard', href: '/portal/dashboard', icon: Home },
    { name: 'Applications', href: '/portal/applications', icon: FileText },
    { name: 'Clients', href: '/portal/clients', icon: Users },
    { name: 'Lenders', href: '/portal/lenders', icon: Building2 },
    ...(isAdmin ? [{ name: 'Brokers', href: '/portal/brokers', icon: UserCog }] : []),
  ]

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/portal/login')
    router.refresh()
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="px-8 py-6 border-b">
          <h2 className="text-xl font-bold">Broker Portal</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-foreground text-background' 
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted">
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">{user?.user_metadata?.full_name || user?.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.user_metadata?.role || 'broker'}</p>
              </div>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/portal/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

