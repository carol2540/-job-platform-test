"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { JobCard } from "@/paths"
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa"
import type { Job } from "@/types/job.types"

interface Props {
  jobs: Job[]
  initialSearch?: string
}

export default function JobsList({ jobs, initialSearch = "" }: Props) {
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [locationFilter, setLocationFilter] = useState("")
  const [tagFilter, setTagFilter] = useState("")

  const uniqueLocations = useMemo(() => {
    return Array.from(new Set(jobs.map((job) => job.location))).sort()
  }, [jobs])

  const uniqueTags = useMemo(() => {
    return Array.from(new Set(jobs.flatMap((job) => job.tags))).sort()
  }, [jobs])

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const keyword = searchQuery.toLowerCase().trim()
      const matchesKeyword =
        keyword === "" ||
        job.title.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword)

      const matchesLocation = locationFilter === "" || job.location === locationFilter
      const matchesTag = tagFilter === "" || job.tags.includes(tagFilter)

      return matchesKeyword && matchesLocation && matchesTag
    })
  }, [jobs, searchQuery, locationFilter, tagFilter])

  const clearFilters = () => {
    setSearchQuery("")
    setLocationFilter("")
    setTagFilter("")
  }

  const hasActiveFilters = searchQuery !== "" || locationFilter !== "" || tagFilter !== ""

  return (
    <div className="mt-12 w-[90%] md:w-[85%] lg:w-[80%] mx-auto mb-12">
      {/* Search and Filter Bar */}
      <div className="mt-10 mb-8 p-4 md:p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FaFilter className="text-blue-600" />
          <h2 className="text-base font-semibold text-gray-800">Filter Jobs</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              <FaTimes className="w-3 h-3" />
              Clear filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, description, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
            />
          </div>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white transition-all appearance-none cursor-pointer"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white transition-all appearance-none cursor-pointer"
          >
            <option value="">All Tags / Skills</option>
            {uniqueTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Show Result ({filteredJobs.length})
          {filteredJobs.length !== jobs.length && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              of {jobs.length} jobs
            </span>
          )}
        </h2>
      </div>

      {/* Grid Layout */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Link key={job.id} href={`/job/jobDetails/${job.id}`}>
              <JobCard job={job} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">
            <span role="img" aria-label="No results">🔍</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
