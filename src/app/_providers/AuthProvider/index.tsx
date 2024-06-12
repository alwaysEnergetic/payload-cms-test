'use client'

import { User } from '@/payload-types'
import { createContext, useCallback, useContext, useState, useEffect } from 'react'

export type LoginFormData = {
  email: string
  password: string
}

type Login = (args: { email: string; password: string }) => Promise<true | string>

type Logout = () => Promise<void>

type FetchMe = () => Promise<void>

type AuthContext = {
  user?: User | null
  setUser: (user: User | null) => void
  logout: Logout
  login: Login
}

const AuthContext = createContext({} as AuthContext)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>()

  const login = useCallback<Login>(async (args) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/login`, {
      method: 'POST',
      body: JSON.stringify(args),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      const json = await res.json()
      setUser(json.user)
      return true
    } else {
      return 'Email or password is incorrect.'
    }
  }, [])

  const logout = useCallback<Logout>(async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/logout`, {
      method: 'POST',
      credentials: 'include',
    })

    if (res.ok) {
      setUser(null)
    } else {
      throw new Error('There was a problem while logging out.')
    }
  }, [])

  // On mount, get user and set
  useEffect(() => {
    const fetechMe = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/me`, {
          method: 'GET',
          credentials: 'include',
        })
        if (res.ok) {
          const json = await res.json()
          setUser(json.user)
        }
    }
    fetechMe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
