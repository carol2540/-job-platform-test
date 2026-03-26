"use client"
import { Session } from "next-auth"
import Image from "next/image"
import { signOut } from "next-auth/react"
import { useState } from "react"

interface Props {
    session: Session
}
const User = ({ session }: Props) => {
    const [showMenu, setShowMenu] = useState(false)
    const hasImage = !!session?.user?.image

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors"
            >
                {hasImage ? (
                    <Image
                        src={session.user.image!}
                        alt="profile"
                        className="rounded-full"
                        width={32}
                        height={32}
                    />
                ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                        {(session?.user?.name || session?.user?.email || 'U').charAt(0).toUpperCase()}
                    </div>
                )}
                <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {session?.user?.name || session?.user?.email?.split('@')[0]}
                </span>
                <svg
                    className={`hidden sm:block w-4 h-4 text-gray-400 transition-transform ${showMenu ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-gray-200 bg-white shadow-lg py-1 z-50">
                    <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/signin' })}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default User
