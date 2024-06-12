'use client'

import { Locale } from 'payload/config'
import { createContext, useContext, useState } from 'react'

type Props = {
  localeConfig:
    | false
    | {
        defaultLocale: string
        fallback?: boolean | undefined
        locales: Locale[]
        localeCodes: string[]
      }
  children: React.ReactNode
}

type LocaleContext = {
  locales: Locale[]
  localeCode: string
  setLocaleCode: (localeCode: string) => void
}

const LocaleContext = createContext({} as LocaleContext)

const LocaleProvider = ({ localeConfig, children }: Props) => {
  if (!localeConfig) return <>{children}</>

  const { locales, defaultLocale } = localeConfig
  const [localeCode, setLocaleCode] = useState<string>(defaultLocale)

  return (
    <LocaleContext.Provider
      value={{
        locales,
        localeCode,
        setLocaleCode,
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

export default LocaleProvider

export const useLocale = () => useContext(LocaleContext)
