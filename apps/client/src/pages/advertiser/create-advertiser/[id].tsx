import { NextPage } from 'next'
import { WebCreateAdvertiserForm } from '@travel-tailor/ui'
import { useProtectedRoute } from '@travel-tailor/hooks'
import { authUtil } from '@travel-tailor/utils'

import { Layout } from '@/layout'

const CreateAdvertiser: NextPage = () => {
  useProtectedRoute(authUtil)

  return (
    <Layout>
      <h1>Create advertiser</h1>
      <WebCreateAdvertiserForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
    </Layout>
  )
}

export default CreateAdvertiser
