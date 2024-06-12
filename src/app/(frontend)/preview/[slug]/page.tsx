import { notFound } from 'next/navigation'

import { fetchPage } from '@/app/_api/fetchPage'
import { fetchPages } from '@/app/_api/fetchPages'
import { PageTemplate } from './page.client'

interface PageParams {
  params: { slug: string }
}

export default async function Page({ params: { slug = 'home' } }: PageParams) {
  const page = await fetchPage(slug)

  if (page === null) {
    return notFound()
  }

  return <PageTemplate page={page} />
}

export async function generateStaticParams() {
  const pages = await fetchPages()

  return pages.map(({ slug }) => ({ slug }))
}
