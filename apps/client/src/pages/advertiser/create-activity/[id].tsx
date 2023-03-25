import { NextPage } from 'next'
import { useState } from 'react'
import { WebCreateActivityForm } from '@travel-tailor/ui'
import { useProtectedRoute } from '@travel-tailor/hooks'
import { authUtil } from '@travel-tailor/utils'
import { ActivityClosingDay, ActivitySchedule, ActivityTag } from '@travel-tailor/types'
import { FALSE_STRING_TYPE, TRUE_STRING_TYPE } from '@travel-tailor/constants'

import { Layout } from '@/layout'

const CreateActivity: NextPage = () => {
  useProtectedRoute(authUtil)

  const [tags, setTags] = useState<ActivityTag[]>([])
  const [schedules, setSchedules] = useState<ActivitySchedule[]>([])
  const [closingDays, setClosingDays] = useState<ActivityClosingDay[]>([])

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
          <p>recurrence : {closingDay.recurrence ? TRUE_STRING_TYPE : FALSE_STRING_TYPE}</p>
          <button onClick={() => handleClosingDayDelete(closingDay.id)}>
            Delete
          </button>
        </div>
      ))}
    </Layout>
  )
}

export default CreateActivity
