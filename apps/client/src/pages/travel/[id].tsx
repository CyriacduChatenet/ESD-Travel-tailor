import { GetServerSideProps } from 'next'
import { TravelService } from '@travel-tailor/services'
import { Day, TimeSlot, Travel } from '@travel-tailor/types'
import { FC } from 'react'

import { Layout } from '@/layout'
import { formatDateUtil, sortDatebyASC } from '@travel-tailor/utils'
import Image from 'next/image'
import { WebMapbox } from '@travel-tailor/ui'

interface IProps {
  travel: Travel
}

const TravelPage: FC<IProps> = ({ travel }) => {
  return (
    <Layout>
      <h1>
        {travel.destinationCity} - {formatDateUtil(travel.departureDate, false)}{' '}
        - {formatDateUtil(travel.returnDate, false)}
      </h1>
      <section>
        {travel.days?.sort(sortDatebyASC).map((day: Day, index: number) => <div key={index}>
            <h3>{formatDateUtil(new Date(day.date ? new Date(day.date) : ''), false)}</h3>
            <section>{day?.timeSlots?.map((timeSlot: TimeSlot, index: number) => <div key={index}>
                <h4>{timeSlot.activity.name}</h4>
                <p>{timeSlot.activity.mark}/10</p>
                <Image src={timeSlot.activity.image.source} alt='activity image'/>
            </div>)}</section>
        </div>)}
      </section>
      <section>
        <WebMapbox mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`} addresse={travel.destinationCity}/>
      </section>
    </Layout>
  )
}

export default TravelPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!

  const response = await TravelService.findTravelById(
    `${process.env.NEXT_PUBLIC_API_URL}`,
    id as string
  )

  return {
    props: {
      travel: response,
    },
  }
}
