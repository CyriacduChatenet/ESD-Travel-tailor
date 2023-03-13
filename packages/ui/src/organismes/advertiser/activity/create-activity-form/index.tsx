import { ActivityClosingDayService, ActivityDetailService, ActivityScheduleService, ActivityService, ActivityTagService } from '@travel-tailor/services';
import { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'

interface IProps {
  api_url: string;
  tags: any[];
  setTags: Dispatch<SetStateAction<any[]>>;
  schedules: any[];
  setSchedules: Dispatch<SetStateAction<any[]>>;
  closingDays: any[];
  setClosingDays: Dispatch<SetStateAction<any[]>>;
}

export const WebCreateActivityForm: FC<IProps> = ({ api_url, tags, setTags, schedules, setSchedules, closingDays, setClosingDays }) => {
  const [activityCredentials, setActivityCredentials] = useState<{name: string, mark: number}>({
    name: '',
    mark: 0,
  });
  const [activityDetailCredentials, setActivityDetailCredentials] = useState<{ location: string, duration: string}>({
    location: '',
    duration: '',
  })
  const [activityImageCredentials, setActivityImageCredentials] = useState<{source: string}>({
    source: '',
  })
  const [activityTagCredentials, setActivityTagCredentials] = useState<{name: string, activities: any[]}>({
    name: '',
    activities: []
  })
  const [activityScheduleCredentials, setActivityScheduleCredentials] = useState<{ opening_at: string, closing_at: string}>({
    opening_at: '',
    closing_at: '',
  })
  const [activityClosingDayCredentials, setActivityClosingDayCredentials] = useState<{ day: number, moth: string, year: number, recurrence: boolean}>({
    day: 0,
    moth: '',
    year: 0,
    recurrence: false,
  })
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter()

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
    setActivityTagCredentials({ ...activityTagCredentials, [name]: value })
  }

  const handleActivitySchedule = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setActivityScheduleCredentials({ ...activityScheduleCredentials, [name]: value })
  }

  const handleIsChecked = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, checked } = e.target
    setActivityClosingDayCredentials({ ...activityClosingDayCredentials, [name]: checked })
  };

  const handleActivityClosingDay = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setActivityClosingDayCredentials({ ...activityClosingDayCredentials, [name]: value })
  }

  const handleCreateTag = async () => {
    return setTags([...tags, await ActivityTagService.createActivityTag(api_url, activityTagCredentials)])
  };

  const handleCreateSchedule = async () => {
    return setSchedules([...schedules, await ActivityScheduleService.createActivitySchedule(api_url, activityScheduleCredentials)])
  };

  const handleCreateClosingDay = async () => {
    return setClosingDays([...closingDays, await ActivityClosingDayService.createActivityClosingDay(api_url, activityClosingDayCredentials)])
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const sendObject = {
      ...activityCredentials,
      detail: {
        ...activityDetailCredentials,
        schedules: [...schedules],
        closingDays: [...closingDays],
      },
      image: {
        ...activityImageCredentials,
      },
      advertiser: `${router.query.id}`,
      tags: [],
    }
    
    const activity = await ActivityService.createActivityWithRelations(api_url, sendObject, tags);
    console.log('activity',activity);
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
      <label htmlFor="">
        <p>Tags</p>
        <input type="text" name="name" placeholder="tag name" onChange={handleActivityTag} />
        <button onClick={(e: any) => {
          e.preventDefault();
          handleCreateTag();
          }}>Create tag</button>
      </label>
      <label htmlFor="">
        <p>Schedules</p>
        <input type="text" name="opening_at" placeholder="opening at" onChange={handleActivitySchedule} />
        <input type="text" name="closing_at" placeholder="closing at" onChange={handleActivitySchedule} />
        <button onClick={(e: any) => {
          e.preventDefault();
          handleCreateSchedule();
          }}>Create schedule</button>
      </label>
      <label htmlFor="">
        <p>Closing day</p>
        <input type="number" name="day" placeholder="day" onChange={handleActivityClosingDay} />
        <input type="text" name="month" placeholder="month" onChange={handleActivityClosingDay} />
        <input type="number" name="year" placeholder="year" onChange={handleActivityClosingDay} />
        <input type="checkbox" name="recurrence" onChange={handleIsChecked} />
        <button onClick={(e: any) => {
          e.preventDefault();
          handleCreateClosingDay();
          }}>Create closing day</button>
      </label>
      <br />
      <br />
      <input type="submit" value="Create activity" />
    </form>
  )
}
