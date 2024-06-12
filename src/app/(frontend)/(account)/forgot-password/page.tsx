import { getPayload } from 'payload'
import promiseConfig from '@payload-config'
import ForgotPasswordForm from '@/app/_components/forgotPassword/ForgotPasswordForm'

const GET = async () => {
  const payload = await getPayload({
    config: promiseConfig,
  })

  const forgotPasswordPageData = await payload.findGlobal({
    slug: 'forgotPassword',
  })

  return {
    forgotPasswordPageData,
  }
}

export default async function Login() {
  const { forgotPasswordPageData } = await GET()

  const { background } = forgotPasswordPageData

  const backgroundUrl = typeof background === 'string' ? background : background.url

  return (
    <div
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
    >
      <ForgotPasswordForm data={forgotPasswordPageData} />
    </div>
  )
}
