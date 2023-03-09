import { NextPage } from 'next'
import { WebCreateActivityForm } from '@travel-tailor/ui'
import { useProtectedRoute } from '@travel-tailor/hooks'

import { Layout } from '@/layout'
import { authUtil } from '@/utils/auth.utils'

const CreateActivity: NextPage = () => {
  useProtectedRoute(authUtil)

  return (
    <Layout>
      <h1>Create activity</h1>
      <WebCreateActivityForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
    </Layout>
  )
}

export default CreateActivity
