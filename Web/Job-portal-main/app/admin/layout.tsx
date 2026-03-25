import AdminSidebar from '@/components/Admin/AdminSidebar'
import AdminTopNav from '@/components/Admin/AdminTopNav'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-56">
        <AdminTopNav />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
