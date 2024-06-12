'use client'

import { useCallback } from 'react'
import { ForgotPassword } from '@/payload-types'
import PayloadImage from '@/app/_components/global/Image'
import { FormStatus, useForm } from '@/app/_hooks/useForm'

type ForgotPasswordFunction = (args: { email: string }) => Promise<true | string>

export default function ForgotPasswordForm({ data }: { data: ForgotPassword }) {
  const { title, description, logo } = data

  const forgotPassword = useCallback<ForgotPasswordFunction>(async (args) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/forgot-password`, {
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
      return 'There was a problem while attempting to send you a password reset email. Please try again later.'
    }
  }, [])

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email')

    if (!email) return 'Fill in all required fields'

    return await forgotPassword({
      email: email as string,
    })
  }

  const { state, submitAction, isPending } = useForm(handleSubmit)

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
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          {state.error && <p className="text-red-500">{state.error}</p>}
          <button
            type="submit"
            className="w-full text-white bg-post-yellow focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400"
            disabled={isPending}
          >
            Send reset email
          </button>
          {state.status === FormStatus.SUCCESS && (
            <p className="text-green-500">Check your email for a reset link</p>
          )}
          <p className="text-center mt-10">{new Date().toLocaleDateString('ko-KR')} 1.0.0</p>
        </form>
      </div>
    </div>
  )
}
