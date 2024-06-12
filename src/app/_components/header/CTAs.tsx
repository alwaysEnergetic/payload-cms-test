'use client'

import { useAuth } from '@/app/_providers/AuthProvider'
import Link from 'next/link'
import { BiSolidBellRing } from 'react-icons/bi'
import UserMenu from './UserMenu'

export default function CTAs() {
  const { user } = useAuth()

  if (!user) {
    return (
      <>
        <Link href="/login" className="btn-default">
          Login
        </Link>
      </>
    )
  }

  return (
    <div className="flex items-center space-x-5">
      <BiSolidBellRing className="w-4 h-4" />
      <UserMenu />
    </div>
  )
}
