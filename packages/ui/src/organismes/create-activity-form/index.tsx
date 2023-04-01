import { OBJECT_KEYS } from '@travel-tailor/constants';
import { ActivityClosingDayService, ActivityScheduleService, ActivityService } from '@travel-tailor/services';
import { ActivityClosingDay, ActivitySchedule, ActivityTag, CreateActivityClosingDayDTO, CreateActivityDetailDTO, CreateActivityImageDTO, CreateActivityScheduleDTO } from '@travel-tailor/types';
import { ROUTES } from '@travel-tailor/constants';
import { ChangeEvent, Dispatch, FC, FormEvent, MouseEvent, SetStateAction, useState, useRouter } from '@travel-tailor/functions'

import { WebLocationInput } from '../../atoms/location-input/react';
import { WebTagInput } from '../../atoms/tag-input/react';

interface IProps {
  api_url: string;
  tags: ActivityTag[];
  setTags: Dispatch<SetStateAction<ActivityTag[]>>;
  schedules: ActivitySchedule[];
  setSchedules: Dispatch<SetStateAction<ActivitySchedule[]>>;
  closingDays: ActivityClosingDay[];
  setClosingDays: Dispatch<SetStateAction<ActivityClosingDay[]>>;
  mapboxAccessToken: string;
}

export const WebCreateActivityForm: FC<IProps> = ({ api_url, tags, setTags, schedules, setSchedules, closingDays, setClosingDays, mapboxAccessToken }) => {
  const [activityCredentials, setActivityCredentials] = useState<{name: string}>({
    name: '',
  });
  const [activityDetailCredentials, setActivityDetailCredentials] = useState<CreateActivityDetailDTO>({
    location: '',
    duration: '',
  })
  const [activityImageCredentials, setActivityImageCredentials] = useState<CreateActivityImageDTO>({
    source: '',
  })
  const [activityScheduleCredentials, setActivityScheduleCredentials] = useState<CreateActivityScheduleDTO>({
    opening_at: '',
    closing_at: '',
  })
  const [activityClosingDayCredentials, setActivityClosingDayCredentials] = useState<CreateActivityClosingDayDTO>({
    date: '',
    recurrence: false,
  })

  const [errors, setErrors] = useState({
    name: '',
    location: '',
    duration: '',
    source: '',
    opening_at: '',
    closing_at: '',
    date: '',

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
    setActivityClosingDayCredentials({ date: '', recurrence: false});
  };

  const validate = (
    activityCredentials: { name: string; },
    activityDetailCredentials: { location: string; duration: string },
    activityImageCredentials: { source: string }
  ) => {
    if (!activityCredentials.name) {
      setErrors({ ...errors, name: 'Name is required' })
      return false
    }
    if (!activityDetailCredentials.location) {
      setErrors({ ...errors, location: 'Location is required' })
      return false
    }
    if (!activityDetailCredentials.duration) {
      setErrors({ ...errors, duration: 'Duration is required' })
      return false
    }
    if (!activityImageCredentials.source) {
      setErrors({ ...errors, source: 'Source is required' })
      return false
    }
    return true
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const error = validate(activityCredentials, activityDetailCredentials, activityImageCredentials)
    if (error) {
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
      
      await ActivityService.createActivityWithRelations(api_url, sendObject, tags);
  
      router.push(ROUTES.ADVERTISER.DASHBOARD)
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">
        <p>Name</p>
        <input type="text" name="name" placeholder="name" onChange={handleActivity} />
        {errors.name && <p>{errors.name}</p>}
      </label>
      <label htmlFor="">
        <p>Duration</p>
        <input type="text" name="duration" placeholder="duration" onChange={handleActivityDetail} />
        {errors.duration && <p>{errors.duration}</p>}
      </label>
      <label htmlFor="">
        <p>Location</p>
        <WebLocationInput mapboxAccessToken={mapboxAccessToken} setStateCredentials={setActivityDetailCredentials} stateCredentials={activityDetailCredentials} objectKey={OBJECT_KEYS.LOCATION} error={errors.location}/>
      </label>
      <label htmlFor="">
        <p>Image source</p>
        <input type="text" name="source" placeholder="Image source" onChange={handleActivityImage} />
        {errors.source && <p>{errors.source}</p>}
      </label>
      <WebTagInput api_url={api_url} tags={tags} setTags={setTags} />
      <label htmlFor="">
        <p>Schedules</p>
        <input type="time" name="opening_at" placeholder="opening at" value={activityScheduleCredentials.opening_at} onChange={handleActivitySchedule} />
        {errors.opening_at && <p>{errors.opening_at}</p>}
        <input type="time" name="closing_at" placeholder="closing at" value={activityScheduleCredentials.closing_at} onChange={handleActivitySchedule} />
        {errors.closing_at && <p>{errors.closing_at}</p>}
        <button onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          handleCreateSchedule();
          handleResetScheduleInput();
          }}>Create schedule</button>
      </label>
      <label htmlFor="">
        <p>Closing day</p>
        <input type="date" name="date" placeholder="date" value={activityClosingDayCredentials.date} onChange={handleActivityClosingDay} />
        {errors.date && <p>{errors.date}</p>}
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