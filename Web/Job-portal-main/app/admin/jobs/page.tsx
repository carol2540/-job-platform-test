'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { CreateJobDto, Job, JobStatus } from '@/types/job.types'
import JobFormModal from '@/components/Admin/JobFormModal'
import JobStatusBadge from '@/components/Admin/JobStatusBadge'

const API = '/api/jobs'

const STATUS_FILTER_OPTIONS: Array<{ value: string; label: string }> = [
  { value: '', label: 'All Status' },
  { value: 'live', label: 'Live' },
  { value: 'draft', label: 'Draft' },
  { value: 'closed', label: 'Closed' },
]

const TYPE_FILTER_OPTIONS: Array<{ value: string; label: string }> = [
  { value: '', label: 'All Types' },
  { value: 'Full time', label: 'Full time' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Contract', label: 'Contract' },
]

export default function AdminJobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

  const loadJobs = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(API)
      const data = await res.json()
      setJobs(data)
    } catch (err) {
      console.error('Failed to load jobs:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadJobs()
  }, [loadJobs])

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        !search.trim() ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())
      const matchStatus = !statusFilter || job.status === statusFilter
      const matchType = !typeFilter || job.jobtype === typeFilter
      return matchSearch && matchStatus && matchType
    })
  }, [jobs, search, statusFilter, typeFilter])

  const handleSave = async (dto: CreateJobDto) => {
    if (editingJob) {
      await fetch(API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingJob.id, ...dto }),
      })
    } else {
      await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      })
    }
    await loadJobs()
    router.refresh()
  }

  const handleDelete = async (id: number) => {
    await fetch(`${API}?id=${id}`, { method: 'DELETE' })
    setDeleteConfirm(null)
    await loadJobs()
    router.refresh()
  }

  const openEdit = (job: Job) => {
    setEditingJob(job)
    setShowModal(true)
  }

  const openCreate = () => {
    setEditingJob(null)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingJob(null)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Job Posts</h2>
          <p className="mt-1 text-sm text-gray-500">{filteredJobs.length} lowongan ditemukan</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Job
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
        <div className="relative flex-1 min-w-48">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by title, company, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {STATUS_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {TYPE_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-500 text-sm">
            <svg className="mr-2 h-5 w-5 animate-spin text-gray-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm">
            {jobs.length === 0 ? 'Belum ada lowongan. Klik "Tambah Job Baru" untuk membuat.' : 'Tidak ada lowongan yang sesuai dengan filter.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-500">
                  <th className="px-5 py-3.5 font-medium">Title</th>
                  <th className="px-5 py-3.5 font-medium">Company</th>
                  <th className="px-5 py-3.5 font-medium">Location</th>
                  <th className="px-5 py-3.5 font-medium">Type</th>
                  <th className="px-5 py-3.5 font-medium">Status</th>
                  <th className="px-5 py-3.5 font-medium">Start Date</th>
                  <th className="px-5 py-3.5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3.5 font-medium text-gray-900">{job.title}</td>
                    <td className="px-5 py-3.5 text-gray-600">{job.company}</td>
                    <td className="px-5 py-3.5 text-gray-600">{job.location}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                        {job.jobtype}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <JobStatusBadge status={job.status as JobStatus} />
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">{formatDate(job.startLiveDate)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(job)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(job.id)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteConfirm !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteConfirm(null) }}
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Hapus Lowongan?</h3>
            <p className="mt-2 text-sm text-gray-500">
              Apakah kamu yakin ingin menghapus lowongan ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <JobFormModal
          job={editingJob}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
