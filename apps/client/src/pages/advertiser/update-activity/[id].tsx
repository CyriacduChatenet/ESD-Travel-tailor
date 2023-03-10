import { NextPage } from 'next'
import { WebUpdateActivityForm } from '@travel-tailor/ui'
import { useProtectedRoute } from '@travel-tailor/hooks'

import { Layout } from '@/layout'
import { authUtil } from '@/utils/auth.utils'

const UpdateActivity: NextPage = () => {
  useProtectedRoute(authUtil)

  return (
    <Layout>
      <h1>Update activity</h1>
      <WebUpdateActivityForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
    </Layout>
  )
}

export default UpdateActivity
