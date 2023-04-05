import {
  useProtectedRoute,
  useTravelerProtectedRoute,
} from '@travel-tailor/hooks'
import { TravelService } from '@travel-tailor/services'
import { Day, TimeSlot, Travel } from '@travel-tailor/types'
import { authUtil, formatDateUtil } from '@travel-tailor/utils'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Layout } from '@/layout'

const TravelPage: NextPage = () => {
  const [data, setData] = useState<Travel>({})

  const router = useRouter()
  useProtectedRoute(authUtil)
  useTravelerProtectedRoute(authUtil)

  const { id } = router.query

  const handleFetch = async () => {
    if (id) {
      const response = await TravelService.findTravelById(
        `${process.env.NEXT_PUBLIC_API_URL}`,
        `${id}`
      )
      setData(response)
    }
  }

  useEffect(() => {
    handleFetch()
  }, [])
  return (
    <Layout>
      <div>
        <h1>
          {data.destinationCity} - {data.departureDate} to{' '}
          {data.returnDate}
        </h1>
        <nav>
          {data.days?.map((day: Day) => (
            <div key={day.id}>
              <button>{day.date}</button> <br /> <br />
            </div>
          ))}
        </nav>
        <br />
      </div>
    </Layout>
  )
}

export default TravelPage
