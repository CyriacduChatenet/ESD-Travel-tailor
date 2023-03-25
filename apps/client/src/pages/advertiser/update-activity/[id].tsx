import { NextPage } from 'next'
import { WebUpdateActivityForm } from '@travel-tailor/ui'
import { useProtectedRoute } from '@travel-tailor/hooks'
import { authUtil } from '@travel-tailor/utils'

import { Layout } from '@/layout'

const UpdateActivity: NextPage = () => {
  useProtectedRoute(authUtil)

  return (
    <Layout>
      <h1>Update activity</h1>
      <WebUpdateActivityForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`} />
    </Layout>
  )
}

export default UpdateActivity
