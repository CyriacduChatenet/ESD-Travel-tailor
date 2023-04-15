import { NextPage } from 'next'
import { MouseEvent, useEffect, useState } from 'react'
import { TravelService, UserService } from '@travel-tailor/services'
import { useProtectedRoute, useTravelerProtectedRoute } from '@travel-tailor/hooks'
import { useUser } from '@travel-tailor/contexts'
import { Travel, User } from '@travel-tailor/types'
import { authUtil, formatDateUtil } from '@travel-tailor/utils'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ROUTES } from '@travel-tailor/constants'

import { Layout } from '@/layout'

const TravelerDashboard: NextPage = () => {
  const { user, setUser } = useUser()
  const router = useRouter()

  const [submitError, setSubmitError] = useState({});

  const getData = async () => {
    const response = await UserService.getUserInfo(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      setSubmitError
    ) as User
    setUser(response)
  }

  useProtectedRoute(authUtil)
  useTravelerProtectedRoute(authUtil)

  const handleRedirect = (travel_id: string) => {
    router.push(`/traveler/edit-travel/${travel_id}`)
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>, travel_id: string) => {
    e.preventDefault();
    await TravelService.deleteTravel(`${process.env.NEXT_PUBLIC_API_URL}`, travel_id, setSubmitError);
    setUser({...user, travels: user.travels?.filter((travel: Travel) => travel.id !== travel_id)});
  };

  useEffect(() => {
    getData()
  }, [])
  return (
    <Layout>
      <h1>Traveler Dashboard</h1>
      <br />
      <br />
      <h2>Travels</h2>
      {user.travels?.map((travel: Travel, index: number) => <Link href={`${ROUTES.TRAVELER.TRAVEL.FIND}/${travel.id}`} key={index}>
        <div>
        <p>{travel.departureCity} - {travel.destinationCity} &nbsp; {formatDateUtil(travel.departureDate, false)} - {formatDateUtil(travel.returnDate, false)}</p>
        <button onClick={() => handleRedirect(travel.id)}>Edit</button>
        &nbsp;
        &nbsp;
        <button onClick={(e) => handleDelete(e, travel.id)}>Delete</button>
      </div>
      </Link>)}
    </Layout>
  )
}

export default TravelerDashboard
