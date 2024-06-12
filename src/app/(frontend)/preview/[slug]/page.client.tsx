'use client'

import Richtext from '@/app/_components/richtext'
import { Page as PageType } from '@/payload-types'
import { useLivePreview } from '@payloadcms/live-preview-react'

export const PageTemplate: React.FC<{ page: PageType | null | undefined }> = ({ page }) => {
  const { data } = useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_CMS_URL || '',
    depth: 2,
    initialData: page,
  })

  if (!data) return null

  return (
    <main className="pt-10 pb-16">
      <h1 className="text-center text-3xl font-bold mb-10">{data.title}</h1>
      {data.subtitle && <h3 className="whitespace-pre-wrap">{data.subtitle}</h3>}
      {data.body && <Richtext content={data.body} />}
    </main>
  )
}
