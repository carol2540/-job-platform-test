'use client'

import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/dashboard': 'Dashboard',
  '/admin/jobs': 'Job Posts',
}

export default function AdminTopNav() {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? 'Admin'

  return (
    <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Admin Panel</span>
      </div>
    </div>
  )
}
