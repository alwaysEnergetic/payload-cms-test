'use client'

import { useEffect } from 'react'
import { Login } from '@/payload-types'
import Link from 'next/link'
import PayloadImage from '../global/Image'
import { useAuth } from '@/app/_providers/AuthProvider'
import { FormStatus, useForm } from '@/app/_hooks/useForm'
import { useRouter } from 'next/navigation'

export default function LoginForm({ data }: { data: Login }) {
  const { title, description, logo } = data
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password) return 'Fill in all required fields'

    return await login({ email: email as string, password: password as string })
  }

  const { state, submitAction, isPending } = useForm(handleSubmit)

  useEffect(() => {
    if (state.status === FormStatus.SUCCESS) router.push('/')
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
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          {state.error && <p className="text-red-500">{state.error}</p>}
          <button
            type="submit"
            className="w-full text-white bg-post-yellow focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400"
            disabled={isPending}
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500">
            Don’t have an account yet?{' '}
            <Link href="/register" className="font-medium text-primary-600 hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-center mt-10">{new Date().toLocaleDateString('ko-KR')} 1.0.0</p>
        </form>
      </div>
    </div>
  )
}
