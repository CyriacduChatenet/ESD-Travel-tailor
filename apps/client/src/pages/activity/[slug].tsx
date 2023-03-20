import { NextPage } from 'next'
import Link from 'next/link'
import {
  ActivityClosingDay,
  ActivitySchedule,
  Comment,
} from '@travel-tailor/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ActivityService } from '@travel-tailor/services'

import { Layout } from '@/layout'
import { WebCommentForm } from '@travel-tailor/ui'
import { useUser } from '@travel-tailor/contexts'
import { formatDateUtil } from '@/utils/date.util'

const ActivityPage: NextPage = () => {
  const [data, setData] = useState<any>({})
  const [comments, setComments] = useState<Comment[]>([]);

  const { user } = useUser();

  const router = useRouter()

  const handleFetch = async (slug: string) => {
    await ActivityService.findActivityBySlugWithRelations(`${process.env.NEXT_PUBLIC_API_URL}`, slug, setData, setComments);
  }

  useEffect(() => {
    if (router.query.slug) {
      handleFetch(router.query.slug as string)
    }
  }, [router.query.slug])

  return (
    <Layout>
      <div>
        <img src={data.image?.source} alt="" width={'100%'} />
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
        {comments.map((comment: Comment, index: number) => (
          <div key={index}>
            <p>
              <b>{comment.traveler?.user ? comment?.traveler?.user.username  : user.username ? user.username : 'Anonymous'}</b>
              &nbsp;
              created at : {formatDateUtil(comment.createdAt)}
              &nbsp;
              likes: {comment.likes}
            </p>
            <p>{comment.content}</p>
          </div>
        ))}
        <br />
        <WebCommentForm
          api_url={`${process.env.NEXT_PUBLIC_API_URL}`}
          activity_id={`${data.id}`}
          setComments={setComments}
        />
      </div>
    </Layout>
  )
}

export default ActivityPage
