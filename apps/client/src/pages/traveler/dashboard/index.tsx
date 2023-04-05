import { NextPage } from 'next'
import { MouseEvent, useEffect } from 'react'
import {
  AuthService,
  TravelService,
  UserService,
} from '@travel-tailor/services'
import {
  useProtectedRoute,
  useTravelerProtectedRoute,
} from '@travel-tailor/hooks'
import { useUser } from '@travel-tailor/contexts'
import { Travel, User } from '@travel-tailor/types'
import { authUtil, formatDateUtil } from '@travel-tailor/utils'
import { useRouter } from 'next/router'

import { Layout } from '@/layout'
import { WebTravelCard } from '@travel-tailor/ui'

const TravelerDashboard: NextPage = () => {
  const { user, setUser } = useUser()
  const router = useRouter()

  const getData = async () => {
    const response = (await UserService.getUserInfo(
      `${process.env.NEXT_PUBLIC_API_URL}`
    )) as User
    setUser(response)
  }

  useProtectedRoute(authUtil)
  useTravelerProtectedRoute(authUtil)

  const handleRedirect = (travel_id: string) => {
    router.push(`/traveler/edit-travel/${travel_id}`)
  }

  const handleDelete = async (
    e: MouseEvent<HTMLButtonElement>,
    travel_id: string
  ) => {
    e.preventDefault()
    await TravelService.deleteTravel(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      travel_id
    )
    setUser({
      ...user,
      travels: user.travels?.filter(
        (travel: Travel) => travel.id !== travel_id
      ),
    })
  }

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
      {user.travels?.map((travel: Travel, index: number) => (
        <WebTravelCard
          key={index}
          id={travel.id}
          departureCity={`${travel.departureCity}`}
          destinationCity={`${travel.destinationCity}`}
          departureDate={travel.departureDate}
          returnDate={travel.returnDate}
          remove={(e) => handleDelete(e, `${travel.id}`)}
          redirect={() => handleRedirect(`${travel.id}`)}
        />
      ))}
    </Layout>
  )
}

export default TravelerDashboard
