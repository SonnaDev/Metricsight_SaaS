'use client'

import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '▦' },
  { label: 'Users', href: '/dashboard/users', icon: '👥' },
  { label: 'Settings', href: '/dashboard/settings', icon: '⚙' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r flex flex-col fixed h-full">
        {/* Logo */}
        <div className="px-5 py-5 border-b">
          <h1 className="font-medium text-base">MetricSight</h1>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User info + sign out */}
        <div className="px-4 py-4 border-t">
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-700 truncate">
              {session?.user?.name ?? 'User'}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {session?.user?.email}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full text-sm text-gray-500 border rounded-lg px-3 py-1.5 hover:bg-gray-50 text-left"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-56 flex-1">
        {children}
      </div>
    </div>
  )
}