import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import {
  ActivityService,
  AuthService,
  UserService,
} from '@travel-tailor/services'
import {
  useAdvertiserProtectedRoute,
  useProtectedRoute,
} from '@travel-tailor/hooks'
import { authUtil } from '@travel-tailor/utils'
import { WebActivityCard, WebMapbox } from '@travel-tailor/ui'
import { Activity, User } from '@travel-tailor/types'
import { useUser } from '@travel-tailor/contexts'
import { ROUTES } from '@travel-tailor/constants'

import { Layout } from '@/layout'

const AdvertiserDashboard: NextPage = () => {
  const { user, setUser } = useUser()
  const getData = async () => {
    const response = await UserService.getUserInfo(
      `${process.env.NEXT_PUBLIC_API_URL}`
    ) as User
    setUser(response)
  }

  useProtectedRoute(authUtil)
  useAdvertiserProtectedRoute(authUtil)

  const handleDelete = (id: string) => {
    ActivityService.deleteActivity(`${process.env.NEXT_PUBLIC_API_URL}`, id)
    const updatedData = {
      ...user,
      activities: user.activities?.filter(
        (activity: Activity) => activity.id !== id
      ),
    }
    setUser(updatedData)
  }

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
        <Link
          href={`${ROUTES.ADVERTISER.ACTIVITY.CREATE_ACTIVITY}/${user.advertiser?.id}`}
        >
          <button>Create activty</button>
        </Link>
      </div>
      <br />
      <p>
        {user?.name}, {user?.location}
      </p>
      <br />
      <WebMapbox
        mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
        addresse={`${user.advertiser?.location}`}
      />
      <br />
      <h2>Activities</h2>
      <br />
      <br />
      {user?.activities?.map((activity: Activity) => (
        <WebActivityCard
          key={activity.id}
          data={activity}
          handleDelete={() => handleDelete(`${activity.id}`)}
        />
      ))}
    </Layout>
  )
}

export default AdvertiserDashboard
