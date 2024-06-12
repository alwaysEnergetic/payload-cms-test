import { getPayload } from 'payload'
import promiseConfig from '@payload-config'
import LoginForm from '@/app/_components/login/LoginForm'

const GET = async () => {
  const payload = await getPayload({
    config: promiseConfig,
  })

  const loginPageData = await payload.findGlobal({
    slug: 'login',
  })

  return {
    loginPageData,
  }
}

export default async function Login() {
  const { loginPageData } = await GET()

  const { background } = loginPageData

  const backgroundUrl = typeof background === 'string' ? background : background.url

  return (
    <div
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
    >
      <LoginForm data={loginPageData} />
    </div>
  )
}
