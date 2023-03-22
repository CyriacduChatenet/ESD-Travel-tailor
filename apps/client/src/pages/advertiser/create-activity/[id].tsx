import { NextPage } from 'next'
import { useState } from 'react'
import { WebCreateActivityForm } from '@travel-tailor/ui'
import { useProtectedRoute } from '@travel-tailor/hooks'
import { authUtil } from '@travel-tailor/utils'
import { Activity } from '@travel-tailor/types'

import { Layout } from '@/layout'

type Tag = { activities: Activity[], deletedAt: Date | null, createdAt: Date, updatedAt: Date, id: string, name: string };
type Schedule = { opening_at: string, closing_at: string, id: string, deletedAt: Date | null, createdAt: Date, updatedAt: Date };
type ClosingDay = { date: string, recurrence: boolean, id: string, deletedAt: Date | null, createdAt: Date, updatedAt: Date }

const CreateActivity: NextPage = () => {
  useProtectedRoute(authUtil)

  const [tags, setTags] = useState<Tag[]>([])
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [closingDays, setClosingDays] = useState<ClosingDay[]>([])

  const handleTagDelete = (name: string) => {
    setTags(tags.filter((tag) => tag.name !== name))
  }

  const handleScheduleDelete = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id))
  }

  const handleClosingDayDelete = (id: string) => {
    setClosingDays(closingDays.filter((closingDay) => closingDay.id !== id))
  }

  return (
    <Layout>
      <h1>Create activity</h1>
      <WebCreateActivityForm
        api_url={`${process.env.NEXT_PUBLIC_API_URL}`}
        setTags={setTags}
        tags={tags}
        schedules={schedules}
        setSchedules={setSchedules}
        closingDays={closingDays}
        setClosingDays={setClosingDays}
        mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
      />
      <br />
      <br />
      <h3>Tags</h3>
      {tags.map((tag, index) => (
        <div key={index}>
          <p>{tag.name}</p>
          <button onClick={() => handleTagDelete(tag.name)}>Delete</button>
        </div>
      ))}
      <br />
      <br />
      <h3>Schedule</h3>
      {schedules.map((schedule, index) => (
        <div key={index}>
          <p>Opening at: {schedule.opening_at}</p>
          <p>Closing at: {schedule.closing_at}</p>
          <button onClick={() => handleScheduleDelete(schedule.id)}>
            Delete
          </button>
        </div>
      ))}
      <br />
      <br />
      <h3>Closing days</h3>
      {closingDays.map((closingDay, index) => (
        <div key={index}>
          <p>
            {closingDay.date}
          </p>
          <p>recurrence : {closingDay.recurrence ? 'true' : 'false'}</p>
          <button onClick={() => handleClosingDayDelete(closingDay.id)}>
            Delete
          </button>
        </div>
      ))}
    </Layout>
  )
}

export default CreateActivity
