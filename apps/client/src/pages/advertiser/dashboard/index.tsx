import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { ActivityService, AuthService, UserService } from '@travel-tailor/services'
import { useProtectedRoute } from '@travel-tailor/hooks'
import { authUtil } from '@travel-tailor/utils'
import { WebActivityCard } from '@travel-tailor/ui'
import { Activity, User } from '@travel-tailor/types'
import { useUser } from '@travel-tailor/contexts'


import { Layout } from '@/layout'
import { ROUTES } from '@travel-tailor/constants'

const AdvertiserDashboard: NextPage = () => {
  const { user, setUser } = useUser()
  const getData = async () => {
    const response = await UserService.getUserInfo(
      `${process.env.NEXT_PUBLIC_API_URL}`
    ) as User
    setUser(response)
  }

  useProtectedRoute(authUtil);

  const handleDelete = (id: string) => {
    ActivityService.deleteActivity(`${process.env.NEXT_PUBLIC_API_URL}`,id);
    const updatedData = { ...user, activities: user.activities?.filter((activity: Activity) => activity.id !== id) };
    setUser(updatedData);
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
        <Link href={`${ROUTES.ADVERTISER.ACTIVITY.CREATE_ACTIVITY}/${user.advertiser?.id}`}>
          <button>Create activty</button>
        </Link>
      </div>
      <br />
      <p>
        {user?.name}, {user?.location}
      </p>
      <br />
      <h2>Activities</h2>
      <br />
      <br />
      {user?.activities?.map((activity: Activity) => <WebActivityCard key={activity.id} data={activity} handleDelete={() => handleDelete(`${activity.id}`)} />)}
    </Layout>
  )
}

export default AdvertiserDashboard
