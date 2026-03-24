import Link from 'next/link'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/Auth'
import User from '../Helpers/User'

const Nav = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div className='h-[13vh] shadow-md'>
            <div className='w-[90%] md-[80%] h-full mx-auto flex items-center justify-between'>
                {/* Brand name */}
                <div>
                    <Link href='/'>
                        <span className='text-xl md:text-2xl font-bold text-blue-700 hover:text-blue-900 transition-colors'>
                            Banu Job Platform
                        </span>
                    </Link>
                </div>
                <div className='flex space-x-2 items-center'>
                    {/* <Image src={''} alt='user logo' /> */}
                    {!session && <Link href={'/signup'}><button className='px-4 py-1.5 text-[14px] sm:text-[16px] sm:px-6 sm:py-2 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-800 transition-colors duration-300'>Sign up</button></Link>}
                    {session && <User session={session} />}

                    {session && <button className='px-4 py-1.5 text-[14px] h-[3em] sm:text-[16px] sm:px-6 sm:py-2 bg-orange-600 hover:bg-orange-800  font-semibold text-white rounded-lg transition-colors duration-300'>Post a job</button>}
                </div>
            </div>
        </div>
    )
}

export default Nav