import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import CTAs from './CTAs'
import PayloadImage from '../global/Image'

const GET = async () => {
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'settings' })

  return { settings }
}
export default async function Header() {
  const { settings } = await GET()

  return (
    <header className="fixed top-0 left-0 right-0">
      <div className="bg-post-yellow">
        <div className="cont mx-auto py-5 flex items-center justify-between">
          <Link href="/">
            <PayloadImage image={settings.logo} width={150} height={50} />
          </Link>
          <CTAs />
        </div>
      </div>
    </header>
  )
}
