import { createClient, SupabaseClient } from '@supabase/supabase-js'
import JobData from '@/data'
import type { CreateJobDto, Job } from '@/types/job.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let _supabase: SupabaseClient | null = null

function getSupabase(): SupabaseClient | null {
  if (!_supabase && supabaseUrl && supabaseAnonKey) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _supabase
}

// Map a raw DB row to a Job object
function toJob(row: Record<string, unknown>): Job {
  return {
    id: row.id as number,
    title: row.title as string,
    company: row.company as string,
    image: String(row.image ?? ''),
    salary: String(row.salary ?? ''),
    location: row.location as string,
    jobtype: row.jobtype as Job['jobtype'],
    description: String(row.description ?? ''),
    tags: Array.isArray(row.tags) ? row.tags as string[] : [],
    createdAt: String(row.created_at ?? new Date().toISOString()),
    status: (row.status as Job['status']) ?? 'draft',
    startLiveDate: row.start_live_date ? String(row.start_live_date) : undefined,
    applicationDeadline: row.application_deadline ? String(row.application_deadline) : undefined,
  }
}

// Map a DTO to snake_case DB fields, only including defined fields
const FIELD_MAP: Array<{ key: keyof CreateJobDto; db: string; fallback?: unknown }> = [
  { key: 'title', db: 'title' },
  { key: 'company', db: 'company' },
  { key: 'image', db: 'image', fallback: '' },
  { key: 'salary', db: 'salary', fallback: '' },
  { key: 'location', db: 'location' },
  { key: 'jobtype', db: 'jobtype' },
  { key: 'description', db: 'description' },
  { key: 'tags', db: 'tags' },
  { key: 'status', db: 'status' },
  { key: 'startLiveDate', db: 'start_live_date', fallback: null },
  { key: 'applicationDeadline', db: 'application_deadline', fallback: null },
]

function toDbFields(dto: Partial<CreateJobDto>): Record<string, unknown> {
  return FIELD_MAP.reduce((acc, { key, db, fallback }) => {
    const value = dto[key]
    if (value !== undefined) {
      acc[db] = fallback !== undefined ? (value || fallback) : value
    }
    return acc
  }, {} as Record<string, unknown>)
}

export async function getJobs(): Promise<Job[]> {
  const sb = getSupabase()
  if (!sb) return JobData

  const { data, error } = await sb
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.warn('getJobs fell back to mock data:', error.message)
    return JobData
  }

  return (data || []).map(toJob)
}

export async function getJob(id: number): Promise<Job | undefined> {
  const jobs = await getJobs()
  return jobs.find((j) => j.id === id)
}

export async function createJob(dto: CreateJobDto): Promise<Job> {
  const sb = getSupabase()
  if (!sb) {
    throw new Error('Database connection not available')
  }

  const { data, error } = await sb
    .from('jobs')
    .insert(toDbFields(dto))
    .select()
    .single()

  if (error) {
    console.error('createJob failed:', error.message)
    throw error
  }

  return toJob(data as Record<string, unknown>)
}

export async function updateJob(id: number, dto: Partial<CreateJobDto>): Promise<Job | null> {
  const sb = getSupabase()
  if (!sb) {
    console.error('updateJob skipped: database unavailable')
    return null
  }

  const { data, error } = await sb
    .from('jobs')
    .update(toDbFields(dto))
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('updateJob failed:', error.message)
    return null
  }

  return toJob(data as Record<string, unknown>)
}

export async function deleteJob(id: number): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return false

  const { error } = await sb.from('jobs').delete().eq('id', id)

  if (error) {
    console.error('deleteJob failed:', error.message)
    return false
  }

  return true
}
