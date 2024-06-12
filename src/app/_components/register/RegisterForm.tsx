'use client'

import { useCallback, useEffect } from 'react'
import { Register } from '@/payload-types'
import Link from 'next/link'
import PayloadImage from '../global/Image'
import { useAuth } from '@/app/_providers/AuthProvider'
import { FormStatus, useForm } from '@/app/_hooks/useForm'
import { useRouter } from 'next/navigation'

type RegisterFunction = (args: {
  firstName: string
  lastName: string
  email: string
  password: string
}) => Promise<true | string>

export default function RegisterForm({ data }: { data: Register }) {
  const { title, description, logo } = data
  const { login } = useAuth()
  const router = useRouter()

  const register = useCallback<RegisterFunction>(
    async (args) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify(args),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        return await login({ email: args.email, password: args.password })
      } else {
        return 'There was a problem creating your account. Please try again later.'
      }
    },
    [login],
  )

  const handleSubmit = async (formData: FormData) => {
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    if (!email || !password || !firstName || !lastName) return 'Fill in all required fields'
    if (password !== confirmPassword) return 'Passwords do not match'

    return await register({
      firstName: firstName as string,
      lastName: lastName as string,
      email: email as string,
      password: password as string,
    })
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
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Doe"
              required
            />
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
          {state.error && <p className="text-red-500">{state.error}</p>}
          <button
            type="submit"
            className="w-full text-white bg-post-yellow focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400"
            disabled={isPending}
          >
            Create account
          </button>
          <p className="text-sm font-light text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:underline">
              Log in
            </Link>
          </p>
          <p className="text-center mt-10">{new Date().toLocaleDateString('ko-KR')} 1.0.0</p>
        </form>
      </div>
    </div>
  )
}
