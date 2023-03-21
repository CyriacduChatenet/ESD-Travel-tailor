import { NextPage } from 'next'
import { useEffect } from 'react'
import { AuthService, TravelService, UserService } from '@travel-tailor/services'
import { useProtectedRoute } from '@travel-tailor/hooks'
import { useUser } from '@travel-tailor/contexts'
import { Travel } from '@travel-tailor/types'

import { Layout } from '@/layout'
import { authUtil } from '@/utils/auth.utils'
import { formatDateUtil } from '@/utils/date.util'

const TravelerDashboard: NextPage = () => {
  const { user, setUser } = useUser()

  const getData = async () => {
    const response = await UserService.getUserInfo(
      `${process.env.NEXT_PUBLIC_API_URL}`
    )
    setUser(response)
  }

  useProtectedRoute(authUtil)

  const handleDelete = async (e: any, travelId: string) => {
    e.preventDefault();
    await TravelService.deleteTravel(`${process.env.NEXT_PUBLIC_API_URL}`, travelId);
    setUser({...user, travels: user.travels?.filter((travel: Travel) => travel.id !== travelId)});
  };

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
      {user.travels?.map((travel: Travel, index: number) => <div key={index}>
        <p>{travel.departureCity} - {travel.destinationCity} &nbsp; {formatDateUtil(travel.departureDate, false)} - {formatDateUtil(travel.returnDate, false)}</p>
        <button>Edit</button>
        &nbsp;
        &nbsp;
        <button onClick={(e) => handleDelete(e, travel.id)}>Delete</button>
      </div>)}
    </Layout>
  )
}

export default TravelerDashboard
