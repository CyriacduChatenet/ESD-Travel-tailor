import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { UserService } from '@travel-tailor/services';
import { useProtectedRoute } from '@travel-tailor/hooks';

import { Layout } from '@/layout'
import { authUtil } from '@/utils/auth.utils';

const TravelerDashboard: NextPage = () => {
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
      <h1>Traveler Dashboard</h1>
      <br />
      <h2>Travels</h2>
    </Layout>
  )
}

export default TravelerDashboard
