import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AuthService, UserService } from '@travel-tailor/services'
import { useProtectedRoute } from '@travel-tailor/hooks'

import { Layout } from '@/layout'
import { authUtil } from '@/utils/auth.utils'

const AdvertiserDashboard: NextPage = () => {
  const [data, setData] = useState<any>({})
  const getData = async () => {
    const response = await UserService.getUserInfo(
      `${process.env.NEXT_PUBLIC_API_URL}`
    )
    setData(response)
  }

  useProtectedRoute(authUtil);

  useEffect(() => {
    getData()
  }, [])
  return (
    <Layout>
      <h1>Advertiser Dashboard</h1>
      <br />
      <div>
        <button onClick={() => AuthService.logout()}>logout</button>
        <br />
        <br />
        <Link href={`/advertiser/create-activity/${data.id}`}>
          <button>Create activty</button>
        </Link>
      </div>
      <br />
      <p>
        {data.name}, {data.location}
      </p>
      <h2>Activities</h2>
    </Layout>
  )
}

export default AdvertiserDashboard
