import { ActivityClosingDayService, ActivityScheduleService, ActivityService, ActivityTagService } from '@travel-tailor/services';
import { CreateActivityClosingDayDTO, CreateActivityDetailDTO, CreateActivityImageDTO, CreateActivityScheduleDTO } from '@travel-tailor/types';
import { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, FC, FormEvent, MouseEvent, SetStateAction, useState } from 'react'
import { WebLocationInput } from '../../../../atoms/location-input/react';

interface IProps {
  api_url: string;
  tags: any[];
  setTags: Dispatch<SetStateAction<any[]>>;
  schedules: any[];
  setSchedules: Dispatch<SetStateAction<any[]>>;
  closingDays: any[];
  setClosingDays: Dispatch<SetStateAction<any[]>>;
  mapboxAccessToken: string;
}

export const WebCreateActivityForm: FC<IProps> = ({ api_url, tags, setTags, schedules, setSchedules, closingDays, setClosingDays, mapboxAccessToken }) => {
  const [activityCredentials, setActivityCredentials] = useState<{name: string, mark: number}>({
    name: '',
    mark: 0,
  });
  const [activityDetailCredentials, setActivityDetailCredentials] = useState<CreateActivityDetailDTO>({
    location: '',
    duration: '',
  })
  const [activityImageCredentials, setActivityImageCredentials] = useState<CreateActivityImageDTO>({
    source: '',
  })
  const [activityTagCredentials, setActivityTagCredentials] = useState<{name: string, activities: any[]}>({
    name: '',
    activities: []
  })
  const [activityScheduleCredentials, setActivityScheduleCredentials] = useState<CreateActivityScheduleDTO>({
    opening_at: '',
    closing_at: '',
  })
  const [activityClosingDayCredentials, setActivityClosingDayCredentials] = useState<CreateActivityClosingDayDTO>({
    day: 0,
    month: '',
    year: 0,
    recurrence: false,
  })

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

  const handleResetScheduleInput = () => {
    setActivityScheduleCredentials({ opening_at: '', closing_at: ''});
  };

  const handleResetClosingDayInput = () => {
    setActivityClosingDayCredentials({ day: 0, month: '', year: 0, recurrence: false});
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        <WebLocationInput mapboxAccessToken={mapboxAccessToken} setActivityDetailCredentials={setActivityDetailCredentials} activityDetailCredentials={activityDetailCredentials}/>
      </label>
      <label htmlFor="">
        <p>Image source</p>
        <input type="text" name="source" placeholder="Image source" onChange={handleActivityImage} />
      </label>
      <label htmlFor="">
        <p>Tags</p>
        <input type="text" name="name" placeholder="tag name" onChange={handleActivityTag} />
        <button onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          handleCreateTag();
          }}>Create tag</button>
      </label>
      <label htmlFor="">
        <p>Schedules</p>
        <input type="text" name="opening_at" placeholder="opening at" value={activityScheduleCredentials.opening_at} onChange={handleActivitySchedule} />
        <input type="text" name="closing_at" placeholder="closing at" value={activityScheduleCredentials.closing_at} onChange={handleActivitySchedule} />
        <button onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          handleCreateSchedule();
          handleResetScheduleInput();
          }}>Create schedule</button>
      </label>
      <label htmlFor="">
        <p>Closing day</p>
        <input type="number" name="day" placeholder="day" value={activityClosingDayCredentials.day} onChange={handleActivityClosingDay} />
        <input type="text" name="month" placeholder="month" value={activityClosingDayCredentials.month} onChange={handleActivityClosingDay} />
        <input type="number" name="year" placeholder="year" value={activityClosingDayCredentials.year} onChange={handleActivityClosingDay} />
        <input type="checkbox" name="recurrence" onChange={handleIsChecked} />
        <button onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          handleCreateClosingDay();
          handleResetClosingDayInput();
          }}>Create closing day</button>
      </label>
      <br />
      <br />
      <input type="submit" value="Create activity" />
    </form>
  )
}
