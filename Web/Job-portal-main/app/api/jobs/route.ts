import { NextRequest, NextResponse } from 'next/server'
import { getJobs, createJob, updateJob, deleteJob } from '@/lib/jobs'
import type { CreateJobDto } from '@/types/job.types'

export async function GET() {
  try {
    const jobs = await getJobs()
    return NextResponse.json(jobs)
  } catch (err) {
    console.error('jobs API GET failed:', err)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateJobDto = await req.json()
    const job = await createJob(body)
    return NextResponse.json(job, { status: 201 })
  } catch (err) {
    console.error('jobs API POST failed:', err)
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...data } = body as { id: number } & Partial<CreateJobDto>
    const job = await updateJob(id, data)
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }
    return NextResponse.json(job)
  } catch (err) {
    console.error('jobs API PUT failed:', err)
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = parseInt(searchParams.get('id') || '0')
    const success = await deleteJob(id)
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('jobs API DELETE failed:', err)
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 })
  }
}
