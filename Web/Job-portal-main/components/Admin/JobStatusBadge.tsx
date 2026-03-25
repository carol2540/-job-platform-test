import type { JobStatus } from '@/types/job.types'

const statusConfig: Record<JobStatus, { label: string; className: string }> = {
  draft: {
    label: 'Draft',
    className: 'bg-gray-100 text-gray-600',
  },
  live: {
    label: 'Live',
    className: 'bg-green-100 text-green-700',
  },
  closed: {
    label: 'Closed',
    className: 'bg-red-100 text-red-700',
  },
}

export default function JobStatusBadge({ status }: { status: JobStatus }) {
  const config = statusConfig[status]
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${config.className}`}>
      {config.label}
    </span>
  )
}
