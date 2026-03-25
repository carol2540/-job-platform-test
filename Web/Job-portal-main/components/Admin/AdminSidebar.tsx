'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import {
  FaTh,
  FaBriefcase,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaUserCircle,
} from 'react-icons/fa'

const navSections = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: FaTh,
  },
  {
    label: 'Job Posts',
    href: '/admin/jobs',
    icon: FaBriefcase,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-56'
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-3">
        {!collapsed && (
          <Link href="/" className="truncate text-base font-bold text-blue-700">
            Banu Job Platform
          </Link>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <FaChevronRight size={16} /> : <FaChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {navSections.map((section) => {
          const Icon = section.icon
          const isActive =
            section.href === '/admin/dashboard'
              ? pathname === '/admin/dashboard' || pathname === '/admin'
              : pathname.startsWith(section.href)

          return (
            <Link
              key={section.href}
              href={section.href}
              className={`mx-2 mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              title={collapsed ? section.label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span className="truncate">{section.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gray-200">
        <Link
          href="/"
          className="mx-2 mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          title={collapsed ? 'Back to Site' : undefined}
        >
          <FaSignOutAlt size={18} className="shrink-0 rotate-180" />
          {!collapsed && <span className="truncate">Back to Site</span>}
        </Link>

        <button
          onClick={() => setUserMenuOpen((o) => !o)}
          className="mx-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          title={collapsed ? 'Admin' : undefined}
        >
          <FaUserCircle size={18} className="shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 truncate text-left">Admin</span>
              <FaChevronDown size={14} className={`shrink-0 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
            </>
          )}
        </button>

        {userMenuOpen && !collapsed && (
          <div className="mx-2 mb-2 rounded-lg border border-gray-100 bg-gray-50 py-1">
            <button
              onClick={() => signOut({ callbackUrl: '/signup' })}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <FaSignOutAlt size={14} />
              Sign Out
            </button>
          </div>
        )}

        {collapsed && (
          <button
            onClick={() => signOut({ callbackUrl: '/signup' })}
            className="mx-2 mb-2 flex items-center justify-center rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
            title="Sign Out"
          >
            <FaSignOutAlt size={18} />
          </button>
        )}
      </div>
    </aside>
  )
}
