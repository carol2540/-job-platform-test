import JobData from '@/data'
import { getPrisma } from '@/lib/prisma'
import type { CreateJobDto, Job } from '@/types/job.types'

const isDatabaseConfigured = (): boolean => {
  const url = process.env.DATABASE_URL || ''
  if (url.includes('[YOUR_PROJECT_REF]')) return false
  if (url.includes('[PASSWORD]')) return false
  if (url.includes('[YOUR_PASSWORD]')) return false
  if (url.includes('johndoe')) return false
  if (url.includes('placeholder')) return false
  if (!url.trim()) return false
  return true
}

function toJob(row: {
  id: number
  title: string
  company: string
  image: string
  salary: string
  location: string
  jobtype: string
  description: string
  tags: string[]
  status: string
  startLiveDate: Date | null
  applicationDeadline: Date | null
  createdAt: Date
}): Job {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    image: row.image,
    salary: row.salary,
    location: row.location,
    jobtype: row.jobtype as Job['jobtype'],
    description: row.description,
    tags: row.tags,
    createdAt: row.createdAt.toISOString(),
    status: (row.status as Job['status']) || 'draft',
    startLiveDate: row.startLiveDate?.toISOString(),
    applicationDeadline: row.applicationDeadline?.toISOString(),
  }
}

export async function getJobs(): Promise<Job[]> {
  if (!isDatabaseConfigured()) {
    return JobData
  }

  const jobs = await getPrisma().job.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return jobs.map(toJob)
}

export async function getJob(id: number): Promise<Job | undefined> {
  const jobs = await getJobs()
  return jobs.find((j) => j.id === id)
}

export async function createJob(dto: CreateJobDto): Promise<Job> {
  if (!isDatabaseConfigured()) {
    const newJob: Job = {
      ...dto,
      image: dto.image ?? '',
      salary: dto.salary ?? '',
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }
    return newJob
  }

  const job = await getPrisma().job.create({
    data: {
      title: dto.title,
      company: dto.company,
      image: dto.image || '',
      salary: dto.salary || '',
      location: dto.location,
      jobtype: dto.jobtype,
      description: dto.description,
      tags: dto.tags,
      status: dto.status,
      startLiveDate: dto.startLiveDate ? new Date(dto.startLiveDate) : null,
      applicationDeadline: dto.applicationDeadline ? new Date(dto.applicationDeadline) : null,
    },
  })

  return toJob(job)
}

export async function updateJob(id: number, dto: Partial<CreateJobDto>): Promise<Job | null> {
  if (!isDatabaseConfigured()) {
    const idx = JobData.findIndex((j) => j.id === id)
    if (idx === -1) return null
    return { ...JobData[idx], ...dto }
  }

  const job = await getPrisma().job.update({
    where: { id },
    data: {
      title: dto.title,
      company: dto.company,
      image: dto.image || '',
      salary: dto.salary || '',
      location: dto.location,
      jobtype: dto.jobtype,
      description: dto.description,
      tags: dto.tags,
      status: dto.status,
      startLiveDate: dto.startLiveDate ? new Date(dto.startLiveDate) : null,
      applicationDeadline: dto.applicationDeadline ? new Date(dto.applicationDeadline) : null,
    },
  })

  return toJob(job)
}

export async function deleteJob(id: number): Promise<boolean> {
  if (!isDatabaseConfigured()) {
    return false
  }

  await getPrisma().job.delete({ where: { id } })
  return true
}
