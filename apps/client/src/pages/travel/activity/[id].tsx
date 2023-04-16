import { GetServerSideProps, NextPage } from 'next'
import { Activity, ActivityClosingDay, ActivitySchedule, Comment } from '@travel-tailor/types'
import { ActivityService } from '@travel-tailor/services'

import { Layout } from '@/layout'
import { WebCommentForm, WebMapbox } from '@travel-tailor/ui'
import Link from 'next/link'
import { formatDateUtil } from '@travel-tailor/utils'
import { ROUTES } from '@travel-tailor/constants'
import { useTravel } from '@travel-tailor/contexts'
import { useState } from 'react'
import { error } from 'console'

interface IProps {
    activity: Activity
}

const TravelActivityPage: NextPage<IProps> = ({ activity }) => {
  const { travelId, setTravelId } = useTravel();
  
  return (
    <Layout>
    <div>
      {activity.image.uploadFile ? <img src={activity.image?.uploadFile.Location} alt="" width={'100%'} /> : null}
      <h1>{activity.name}</h1>
      <br />
      <Link href={`${ROUTES.TRAVELER.TRAVEL.FIND}/${travelId}`}>Return</Link>
      <p>duration : {activity.detail?.duration}</p>
      <p>location : {activity.detail?.location}</p>
      <br />
      <h4>Schedules</h4>
      {activity.detail?.schedules?.map(
        (schedule: ActivitySchedule, index: number) => (
          <p key={index}>
            {schedule.opening_at} - {schedule.closing_at}
          </p>
        )
      )}
      <br />
      <h4>Closing days</h4>
      {activity.detail?.closingDays?.map(
        (closingDay: ActivityClosingDay, index: number) => (
          <p key={index}>
            {closingDay.date}
            {closingDay.recurrence}
          </p>
        )
      )}
      <br />
      <br />
      {activity.detail?.location ? (
        <WebMapbox
          mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
          addresse={activity.detail.location}
        />
      ) : null}
    </div>
  </Layout>
  )
}

export default TravelActivityPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!

    const error = {}
    
    const response = await ActivityService.findActivityById(
        `${process.env.NEXT_PUBLIC_API_URL}`,
        id as string,
        error
    )
    
    return {
        props: {
        activity: response,
        },
    }
    }