import { NextPage } from 'next'
import Link from 'next/link'
import {
  Activity,
  ActivityClosingDay,
  ActivitySchedule,
  Comment,
} from '@travel-tailor/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ActivityService } from '@travel-tailor/services'

import { Layout } from '@/layout'

const ActivityPage: NextPage = () => {
  const [data, setData] = useState<Activity>({})

  const router = useRouter()

  const handleFetch = async (slug: string) => {
    const activity = await ActivityService.findActivityBySlugWithRelations(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      slug
    )
    setData(activity)
  }

  useEffect(() => {
    if (router.query.slug) {
      handleFetch(router.query.slug as string)
    }
  }, [router.query.slug])

  return (
    <Layout>
      <div>
        <img src={data.image?.source} alt="" />
        <h1>{data.name}</h1>
        <br />
        <Link href={'/activity'}>Return</Link>
        <p>duration : {data.detail?.duration}</p>
        <p>location : {data.detail?.location}</p>
        <br />
        <h4>Schedules</h4>
        {data.detail?.schedules?.map(
          (schedule: ActivitySchedule, index: number) => (
            <p key={index}>
              {schedule.opening_at} - {schedule.closing_at}
            </p>
          )
        )}
        <br />
        <h4>Closing days</h4>
        {data.detail?.closingDays?.map(
          (closingDay: ActivityClosingDay, index: number) => (
            <p key={index}>
              {closingDay.day} {closingDay.month}{' '}
              {!closingDay.recurrence ? closingDay.year : null}
            </p>
          )
        )}
        <br />
        <br />
        <h3>Comments</h3>
        {data.comments?.map((comment: Comment, index: number) => <div>
            <p><b>{comment.traveler?.user.username}</b></p>
            <p>{comment.content}</p>
        </div>)}
      </div>
    </Layout>
  )
}

export default ActivityPage
