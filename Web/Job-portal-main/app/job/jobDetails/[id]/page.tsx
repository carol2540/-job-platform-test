import JobData from '@/data'
import { authOptions } from '@/Auth'
import { ApplyButton, JobCard } from '@/paths'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { FaBuilding, FaCalendarAlt } from 'react-icons/fa'

const JobDeatils = async ({ params }: { params: { id: string } }) => {
  const getJobDetail = JobData?.find((job) => job.id.toString() === params.id)
  const session = await getServerSession(authOptions)
  const relatedJobs = JobData?.filter((job) => job.id.toString() !== params.id).slice(0, 4)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (!getJobDetail) {
    return (
      <div className="mt-20 mb-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Job not found</h2>
        <Link href="/job/alljobs" className="text-blue-600 hover:underline mt-4 inline-block">
          Browse all jobs
        </Link>
      </div>
    )
  }

  return (
    <div className='mt-20 mb-12'>
      {/* Header: JobCard + Apply/Signup */}
      <div className='block sm:flex items-center justify-between w-[80%] mx-auto'>
        <div className='flex-[0.7]'>
          <JobCard job={getJobDetail} />
        </div>
        {session && <ApplyButton />}
        {!session && (
          <Link href={'/signup'}>
            <button type='button' className='px-8 py-3 bg-emerald-600 rounded-lg text-white hover:bg-emerald-700 transition-colors'>
              Signup
            </button>
          </Link>
        )}
      </div>

      {/* Main Content */}
      <div className='mt-16 w-[80%] mx-auto'>

        {/* Company */}
        <div className='flex items-center gap-3 mb-6'>
          <FaBuilding className='w-5 h-5 text-blue-600' />
          <div>
            <p className='text-sm text-gray-500'>Company</p>
            <p className='text-lg font-semibold text-gray-800'>{getJobDetail.company}</p>
          </div>
        </div>

        {/* Posted Date */}
        <div className='flex items-center gap-3 mb-8'>
          <FaCalendarAlt className='w-5 h-5 text-blue-600' />
          <div>
            <p className='text-sm text-gray-500'>Posted On</p>
            <p className='text-base font-medium text-gray-700'>{formatDate(getJobDetail.createdAt)}</p>
          </div>
        </div>

        <hr className='border-gray-200 mb-8' />

        {/* Job Description */}
        <div className='mb-10'>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>Job Description</h2>
          <p className='text-gray-600 leading-relaxed'>{getJobDetail.description}</p>
        </div>

        {/* Tags */}
        <div className='mb-10'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>Skills & Technologies</h2>
          <div className='flex flex-wrap gap-2'>
            {getJobDetail.tags.map((tag) => (
              <span
                key={tag}
                className='px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Key Responsibilities */}
        <div className='mb-10'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>Key Responsibilities</h2>
          <ul className='space-y-2'>
            <li className='flex items-start gap-2 text-gray-600'>
              <span className='text-blue-600 mt-1'>•</span>
              Design, develop, and maintain high-quality software solutions.
            </li>
            <li className='flex items-start gap-2 text-gray-600'>
              <span className='text-blue-600 mt-1'>•</span>
              Collaborate with cross-functional teams to define and ship new features.
            </li>
            <li className='flex items-start gap-2 text-gray-600'>
              <span className='text-blue-600 mt-1'>•</span>
              Write clean, maintainable, and well-tested code.
            </li>
            <li className='flex items-start gap-2 text-gray-600'>
              <span className='text-blue-600 mt-1'>•</span>
              Participate in code reviews and mentor junior team members.
            </li>
          </ul>
        </div>

        {/* Related Jobs */}
        <div className='mt-14'>
          <h2 className='text-xl font-semibold text-gray-800 mb-6'>Related Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedJobs?.map((job) => (
              <Link key={job.id} href={`/job/jobDetails/${job.id}`}>
                <JobCard job={job} />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default JobDeatils