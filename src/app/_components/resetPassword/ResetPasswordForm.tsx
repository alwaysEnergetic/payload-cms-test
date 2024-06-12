'use client'

import { useCallback, useEffect } from 'react'
import { ResetPassword } from '@/payload-types'
import PayloadImage from '../global/Image'
import { FormStatus, useForm } from '@/app/_hooks/useForm'
import { useRouter } from 'next/navigation'

type ResetPasswordFunction = (args: { password: string }) => Promise<true | string>

export default function ResetPasswordForm({ data }: { data: ResetPassword }) {
  const { title, description, logo } = data
  const router = useRouter()

  const ResetPassword = useCallback<ResetPasswordFunction>(async (args) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/reset-password`, {
      method: 'POST',
      body: JSON.stringify(args),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      return true
    } else {
      return 'There was a problem while resetting your password. Please try again later.'
    }
  }, [])

  const handleSubmit = async (formData: FormData) => {
    const password = formData.get('password')

    if (!password) return 'Fill in all required fields'

    return await ResetPassword({
      password: password as string,
    })
  }

  const { state, submitAction, isPending } = useForm(handleSubmit)

  useEffect(() => {
    if (state.status === FormStatus.SUCCESS) router.push('/login')
  }, [state.status, router])

  return (
    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form className="space-y-4 md:space-y-6" action={submitAction}>
          <div className="flex items-center justify-center mb-6">
            {title && (
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                {title}
              </h1>
            )}
            {logo && <PayloadImage image={logo} width={120} height={50} />}
            {description && <p className="text-center">{description}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Reset your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="••••••••"
              required
            />
          </div>
          {state.error && <p className="text-red-500">{state.error}</p>}
          <button
            type="submit"
            className="w-full text-white bg-post-yellow focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400"
            disabled={isPending}
          >
            Reset password
          </button>
          <p className="text-center mt-10">{new Date().toLocaleDateString('ko-KR')} 1.0.0</p>
        </form>
      </div>
    </div>
  )
}
