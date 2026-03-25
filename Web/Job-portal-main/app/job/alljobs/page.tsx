import { getJobs } from '@/lib/jobs'
import { Heading } from '@/paths'
import JobsList from '@/components/Job/JobsList'

interface Props {
  searchParams: Promise<{ search?: string }>
}

export default async function AllJobsPage({ searchParams }: Props) {
  const jobs = await getJobs()
  const { search: searchQuery } = await searchParams

  const filteredJobs = searchQuery
    ? jobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : jobs

  return (
    <div>
      <Heading
        mainHeading="Find Your Dream Job"
        subHeading="Search and filter through hundreds of job opportunities"
      />
      <JobsList jobs={filteredJobs} initialSearch={searchQuery || ''} />
    </div>
  )
}
