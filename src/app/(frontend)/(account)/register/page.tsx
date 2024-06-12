import { getPayload } from 'payload'
import promiseConfig from '@payload-config'
import RegisterForm from '@/app/_components/register/RegisterForm'

const GET = async () => {
  const payload = await getPayload({
    config: promiseConfig,
  })

  const registerPageData = await payload.findGlobal({
    slug: 'register',
  })

  return {
    registerPageData,
  }
}

export default async function Register() {
  const { registerPageData } = await GET()

  const { background } = registerPageData

  const backgroundUrl = typeof background === 'string' ? background : background.url

  return (
    <div
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
    >
      <RegisterForm data={registerPageData} />
    </div>
  )
}
