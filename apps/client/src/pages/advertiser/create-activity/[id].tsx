import { NextPage } from 'next'
import { useState } from 'react'
import { WebCreateActivityForm } from '@travel-tailor/ui'
import { useProtectedRoute } from '@travel-tailor/hooks'

import { Layout } from '@/layout'
import { authUtil } from '@/utils/auth.utils'

const CreateActivity: NextPage = () => {
  useProtectedRoute(authUtil)

  const [tags, setTags] = useState<any[]>([])
  const [schedules, setSchedules] = useState<any[]>([])
  const [closingDays, setClosingDays] = useState<any[]>([])

  const handleTagDelete = (name: string) => {
    setTags(tags.filter((tag) => tag.name !== name))
  }

  const handleScheduleDelete = (id: string) => {
    setTags(schedules.filter((schedule) => schedule.id !== id))
  }

  const handleClosingDayDelete = (id: string) => {
    setTags(closingDays.filter((closingDay) => closingDay.id !== id))
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
            {closingDay.day} / {closingDay.month} / {closingDay.year}
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
