"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import HeroIllustrator from '@/public/images/hero_illustrator.png'

export default function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/job/alljobs?search=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/job/alljobs')
    }
  }

  return (
    <div className='pt-16 md:pt-20 pb-8 md:pb-12'>
      <div className='w-full min-h-[60vh] flex flex-col items-center justify-center'>
        <div className='w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-[2rem]'>
          <div>
            <h1 className='text-[28px] sm:text-[35px] lg:text-[45px] xl:text-[60px] text-[#05264e] leading-normal lg:leading-relaxed font-extrabold'>
              The <span className='text-blue-500'>Easiest Way</span> <br /> To Get Your Dream jobs
            </h1>
            <p className='text-[#4f5e6f] text-[16px] md:text-[18px] mt-[1rem]'>
              Browse thousands of job opportunities that match your skills and career goals. Our platform connects you with top companies actively hiring — no recruiters, no spam, just real jobs.
            </p>
            <form onSubmit={handleSearch} className='mt-[1.5rem]'>
              <input
                className='w-[60%] md:w-[70%] lg:w-[75%] px-5 py-4 outline-none rounded-l-md bg-gray-200'
                placeholder='eg: Frontend developer'
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type='submit'
                className='px-5 py-4 outline-none rounded-r-md bg-blue-500 hover:bg-blue-600 text-white transition-colors'
              >
                Search
              </button>
            </form>
          </div>
          <div className='hidden lg:flex justify-center'>
            <Image src={HeroIllustrator} alt='hero illustration' width={480} height={300} className='object-contain' />
          </div>
        </div>
      </div>
    </div>
  )
}
