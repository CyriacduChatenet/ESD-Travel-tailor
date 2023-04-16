import { GetServerSideProps } from 'next'
import { TravelService } from '@travel-tailor/services'
import { Day, TimeSlot, Travel } from '@travel-tailor/types'
import { FC, MouseEvent, useState } from 'react'
import { formatDateUtil, sortDatebyASC } from '@travel-tailor/utils'
import { WebMapbox } from '@travel-tailor/ui'
import { useRouter } from 'next/router'
import { ROUTES } from '@travel-tailor/constants'
import { useTravel } from '@travel-tailor/contexts'
import Link from 'next/link'

import { Layout } from '@/layout'

interface IProps {
  travel: Travel
}

const TravelPage: FC<IProps> = ({ travel }) => {
  const router = useRouter()
  const { setTravelId } = useTravel()

  const handlePayment = () => {
    router.push(`${ROUTES.TRAVELER.TRAVEL.PAYMENT}/${travel.id}`)
  }

  const handleRedirect = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setTravelId(`${router.query.id}`)
  }

  return (
    <Layout>
      <h1>
        {travel.destinationCity} - {formatDateUtil(travel.departureDate, false)}{' '}
        - {formatDateUtil(travel.returnDate, false)}
      </h1>
      <section>
        {travel.days?.sort(sortDatebyASC).map((day: Day, index: number) => (
          <div key={index}>
            <h3>
              {formatDateUtil(
                new Date(day.date ? new Date(day.date) : ''),
                false
              )}
            </h3>
            <section>
              {day?.timeSlots?.map((timeSlot: TimeSlot, index: number) => <div key={index} onClick={handleRedirect}>
                <Link
                  href={`${ROUTES.TRAVELER.TRAVEL.ACTIVITY}/${timeSlot.activity.id}`}
                >
                  <div>
                    <h4>{timeSlot.activity.name}</h4>
                    <p>{timeSlot.activity.mark}/10</p>
                  </div>
                </Link>
              </div>)}
            </section>
          </div>
        ))}
      </section>
      <section>
        <WebMapbox
          mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
          addresse={travel.destinationCity}
        />
        <br />
        <br />
        <button onClick={handlePayment}>Payer</button>
        <br />
        <br />
      </section>
    </Layout>
  )
}

export default TravelPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!

  const error = {}

  const response = await TravelService.findTravelById(
    `${process.env.NEXT_PUBLIC_API_URL}`,
    id as string,
    error
  )

  return {
    props: {
      travel: response,
    },
  }
}
