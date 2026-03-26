import Link from 'next/link'
import { getJobs } from '@/lib/jobs'
import JobStatusBadge from '@/components/Admin/JobStatusBadge'

export default async function AdminDashboardPage() {
  const jobs = await getJobs()

  const totalJobs = jobs.length
  const liveJobs = jobs.filter((j) => j.status == 'live').length
  const totalApplications = 0
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  const jobsThisMonth = jobs.filter((j) => {
    const d = new Date(j.createdAt)
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear
  }).length

  const jobsByType: Record<string, number> = {}
  for (const job of jobs) {
    jobsByType[job.jobtype] = (jobsByType[job.jobtype] ?? 0) + 1
  }

  const maxTypeCount = Math.max(...Object.values(jobsByType), 1)
  const typeEntries = Object.entries(jobsByType).sort((a, b) => b[1] - a[1])

  const allJobs = [...jobs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <Link
          href="/admin/jobs"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Post a Job
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard
          label="Total Jobs"
          value={totalJobs}
          color="blue"
          icon={<JobIcon />}
        />
        <KPICard
          label="Live Jobs"
          value={liveJobs}
          color="green"
          icon={<LiveIcon />}
        />
        <KPICard
          label="Total Applications"
          value={totalApplications}
          color="purple"
          icon={<ApplicationIcon />}
        />
        <KPICard
          label="Jobs This Month"
          value={jobsThisMonth}
          color="orange"
          icon={<MonthIcon />}
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">Jobs by Type</h2>
        <div className="space-y-4">
          {typeEntries.length === 0 ? (
            <p className="text-sm text-gray-500">No jobs yet.</p>
          ) : (
            typeEntries.map(([type, count]) => (
              <div key={type} className="flex items-center gap-4">
                <span className="w-28 shrink-0 text-sm font-medium text-gray-600">{type}</span>
                <div className="flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-5 rounded-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${(count / maxTypeCount) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-right text-sm font-semibold text-gray-700">{count}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">All Job Posts ({allJobs.length})</h2>
          <Link
            href="/admin/jobs"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Manage all
          </Link>
        </div>
        {allJobs.length === 0 ? (
          <p className="text-sm text-gray-500">No jobs yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="pb-3 font-medium text-gray-500">Title</th>
                  <th className="pb-3 font-medium text-gray-500">Company</th>
                  <th className="pb-3 font-medium text-gray-500">Location</th>
                  <th className="pb-3 font-medium text-gray-500">Status</th>
                  <th className="pb-3 font-medium text-gray-500">Posted</th>
                  <th className="pb-3 font-medium text-gray-500">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="py-3 pr-4 font-medium text-gray-900">{job.title}</td>
                    <td className="py-3 pr-4 text-gray-600">{job.company}</td>
                    <td className="py-3 pr-4 text-gray-600">{job.location}</td>
                    <td className="py-3 pr-4">
                      <JobStatusBadge status={job.status} />
                    </td>
                    <td className="py-3 pr-4 text-gray-500">{formatDate(job.createdAt)}</td>
                    <td className="py-3">
                      <Link
                        href={`/job/jobDetails/${job.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function KPICard({
  label,
  value,
  color,
  icon,
}: {
  label: string
  value: number
  color: 'blue' | 'green' | 'purple' | 'orange'
  icon: React.ReactNode
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-green-50 text-green-700 border-green-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
  }

  return (
    <div className={`rounded-xl border p-5 ${colors[color]}`}>
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
        {icon}
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm font-medium opacity-80">{label}</p>
    </div>
  )
}

function JobIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function LiveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  )
}

function ApplicationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  )
}

function MonthIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
