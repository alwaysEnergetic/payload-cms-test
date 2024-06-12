import AuthProvider from '../_providers/AuthProvider'
import configPromise from '@payload-config'
import './globals.css'
import LocaleProvider from '../_providers/LocaleProvider'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const localeConfig = (await configPromise).localization

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LocaleProvider
            localeConfig={
              localeConfig
                ? {
                    defaultLocale: localeConfig.defaultLocale,
                    fallback: localeConfig.fallback,
                    locales: localeConfig.locales.map((locale) => ({
                      label: locale.label,
                      code: locale.code,
                    })),
                    localeCodes: localeConfig.localeCodes,
                  }
                : false
            }
          >
            {children}
          </LocaleProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
