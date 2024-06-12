import { getPayload } from 'payload'
import promiseConfig from '@payload-config'
import ResetPasswordForm from '@/app/_components/resetPassword/ResetPasswordForm'

const GET = async () => {
  const payload = await getPayload({
    config: promiseConfig,
  })

  const resetPasswordPageData = await payload.findGlobal({
    slug: 'resetPassword',
  })

  return {
    resetPasswordPageData,
  }
}

export default async function Login() {
  const { resetPasswordPageData } = await GET()

  const { background } = resetPasswordPageData

  const backgroundUrl = typeof background === 'string' ? background : background.url

  return (
    <div
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
    >
      <ResetPasswordForm data={resetPasswordPageData} />
    </div>
  )
}
