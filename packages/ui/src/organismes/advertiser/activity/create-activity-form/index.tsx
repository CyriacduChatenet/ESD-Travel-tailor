import { ChangeEvent, FC, useState } from 'react'

interface IProps {
  api_url: string
}

export const WebCreateActivityForm: FC<IProps> = ({ api_url }) => {
  const [activityCredentials, setActivityCredentials] = useState({})
  const [activityDetailCredentials, setActivityDetailCredentials] = useState({})
  const [activityImageCredentials, setActivityImageCredentials] = useState({})
  const [activityTagsCredentials, setActivityTagsCredentials] = useState({})
  const [activityScheduleCredentials, setActivityScheduleCredentials] = useState({})
  const [activityClosingDayCredentials, setActivityClosingDayCredentials] = useState({})

  const handleActivity = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setActivityCredentials({ ...activityCredentials, [name]: value })
  }

  const handleActivityDetail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setActivityDetailCredentials({ ...activityDetailCredentials, [name]: value })
  }

  const handleActivityImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setActivityImageCredentials({ ...activityImageCredentials, [name]: value })
  }

  const handleActivityTag = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setActivityTagsCredentials({ ...activityTagsCredentials, [name]: value })
  }

  const handleActivitySchedule = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setActivityScheduleCredentials({ ...activityScheduleCredentials, [name]: value })
  }

  const handleActivityClosingDay = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setActivityClosingDayCredentials({ ...activityClosingDayCredentials, [name]: value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    window.location.pathname = '/advertiser/dashboard'
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">
        <p>Name</p>
        <input type="text" name="name" placeholder="name" onChange={handleActivity} />
      </label>
      <label htmlFor="">
        <p>Duration</p>
        <input type="text" name="duration" placeholder="duration" onChange={handleActivityDetail} />
      </label>
      <label htmlFor="">
        <p>Location</p>
        <input type="text" name="location" placeholder="location" onChange={handleActivityDetail} />
      </label>
      <label htmlFor="">
        <p>Image source</p>
        <input type="text" name="source" placeholder="Image source" onChange={handleActivityImage} />
      </label>
      <div>
        <label htmlFor="">
          <p>Opening at</p>
          <input type="text" name="opening_at" placeholder="Opening at" onChange={handleActivitySchedule} />
        </label>
        <label htmlFor="">
          <p>Closing at</p>
          <input type="text" name="closing_at" placeholder="Closing at" onChange={handleActivitySchedule} />
        </label>
      </div>
      <div>
        <label htmlFor="">
          <p>Day</p>
          <input type="text" name="day" placeholder="Day" onChange={handleActivityClosingDay} />
        </label>
        <label htmlFor="">
          <p>Month</p>
          <input type="text" name="month" placeholder="Month" onChange={handleActivityClosingDay} />
        </label>
        <label htmlFor="">
          <p>Year</p>
          <input type="text" name="year" placeholder="Year" onChange={handleActivityClosingDay} />
        </label>
        <label htmlFor="">
          <p>Recurrence</p>
          <input type="checkbox" name="recurrence" onChange={handleActivityClosingDay} />
        </label>
      </div>
      <label htmlFor="">
        <p>Tags</p>
        <input type="text" name="name" placeholder="Tag name" onChange={handleActivityTag} />
      </label>
      <input type="submit" value="Create activity" />
    </form>
  )
}
