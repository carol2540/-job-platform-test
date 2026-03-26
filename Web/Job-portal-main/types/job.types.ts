export type JobType = 'Full time' | 'Internship' | 'Contract'
export type JobStatus = 'draft' | 'live' | 'closed'

export interface Job {
  id: number | string
  title: string
  image: string
  salary: string
  location: string
  jobtype: JobType
  company: string
  description: string
  tags: string[]
  createdAt: string
  status: JobStatus
  startLiveDate?: string
  applicationDeadline?: string
}

export interface CreateJobDto {
  title: string
  company: string
  image?: string
  salary?: string
  location: string
  jobtype: JobType
  description: string
  tags: string[]
  status: JobStatus
  startLiveDate?: string
  applicationDeadline?: string
}
