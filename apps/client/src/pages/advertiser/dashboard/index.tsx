import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ActivityService, AuthService, UserService } from '@travel-tailor/services'
import { useProtectedRoute } from '@travel-tailor/hooks'
import { Activity } from '@travel-tailor/types'

import { Layout } from '@/layout'
import { authUtil } from '@/utils/auth.utils'
import { WebActivityCard } from '@travel-tailor/ui'

const AdvertiserDashboard: NextPage = () => {
  const [data, setData] = useState<any>({})
  const getData = async () => {
    const response = await UserService.getUserInfo(
      `${process.env.NEXT_PUBLIC_API_URL}`
    )
    setData(response)
  }

  useProtectedRoute(authUtil);

  const handleDelete = (id: string) => {
    ActivityService.deleteActivity(`${process.env.NEXT_PUBLIC_API_URL}`,id);
    data.activities.filter((activity: Activity) => activity.id !== id);
  };

  useEffect(() => {
    getData()
  }, []);

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
      <br />
      <h2>Activities</h2>
      <br />
      <br />
      {data.activities?.map((activity: Activity) => <WebActivityCard key={activity.id} data={activity} handleDelete={handleDelete} />)}
    </Layout>
  )
}

export default AdvertiserDashboard
