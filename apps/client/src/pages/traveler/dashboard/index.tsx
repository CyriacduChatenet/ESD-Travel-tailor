import { NextPage } from 'next'
import { useEffect } from 'react'
import { AuthService, UserService } from '@travel-tailor/services'
import { useProtectedRoute } from '@travel-tailor/hooks'

import { Layout } from '@/layout'
import { authUtil } from '@/utils/auth.utils'
import { useUser } from '@travel-tailor/contexts'

const TravelerDashboard: NextPage = () => {
  const { setUser } = useUser()
  const getData = async () => {
    const response = await UserService.getUserInfo(
      `${process.env.NEXT_PUBLIC_API_URL}`
    )
    setUser(response)
  }

  useProtectedRoute(authUtil)

  useEffect(() => {
    getData()
  }, [])
  return (
    <Layout>
      <h1>Traveler Dashboard</h1>
      <button onClick={() => AuthService.logout()}>logout</button>
      <br />
      <br />
      <h2>Travels</h2>
    </Layout>
  )
}

export default TravelerDashboard
