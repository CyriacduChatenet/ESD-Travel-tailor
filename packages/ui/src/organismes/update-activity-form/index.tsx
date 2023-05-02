import { ActivityClosingDayService, ActivityScheduleService, ActivityService } from '@travel-tailor/services'
import { OBJECT_KEYS, ROUTES } from '@travel-tailor/constants'
import {
  ChangeEvent,
  FC,
  FormEvent,
  useState,
  useRouter,
  Dispatch,
  SetStateAction,
} from '@travel-tailor/functions'
import { WebLocationInput } from '../../atoms/location-input/react'
import { Activity, ActivityClosingDay, ActivitySchedule, ActivityTag, CreateActivityClosingDayDTO, CreateActivityDetailDTO, CreateActivityScheduleDTO } from '@travel-tailor/types'
import { MouseEvent, useEffect } from 'react'
import { WebTagInput } from '../../atoms/tag-input/react'
import { WebInputLabel } from '../../atoms/input-label/react'
import { WebInput } from '../../atoms/input/react'

interface IProps {
  api_url: string
  mapboxAccessToken: string
  tags: ActivityTag[];
  setTags: Dispatch<SetStateAction<ActivityTag[]>>;
  schedules: ActivitySchedule[];
  setSchedules: Dispatch<SetStateAction<ActivitySchedule[]>>;
  closingDays: ActivityClosingDay[];
  setClosingDays: Dispatch<SetStateAction<ActivityClosingDay[]>>;
}

export const WebUpdateActivityForm: FC<IProps> = ({ api_url, mapboxAccessToken, tags, setTags, schedules, setSchedules, closingDays, setClosingDays, }) => {
  const [activity, setActivity] = useState<Activity | any>({})
  const [activityCredentials, setActivityCredentials] = useState<{name: string}>({
    name: '',
  });
  const [activityDetailCredentials, setActivityDetailCredentials] = useState<CreateActivityDetailDTO>({
    location: '',
    duration: 0,
  })
  const [activityImageFileCredentials, setActivityImageFileCredentials] = useState<any>({})
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

  const [submitError, setSubmitError] = useState({});

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

  const handleUpdateSchedule = async () => {
    return setSchedules([...schedules, await ActivityScheduleService.createActivitySchedule(api_url, activityScheduleCredentials, setSubmitError)])
  };

  const handleUpdateClosingDay = async () => {
    return setClosingDays([...closingDays, await ActivityClosingDayService.createActivityClosingDay(api_url, activityClosingDayCredentials, setSubmitError)])
  };

  const handleResetScheduleInput = () => {
    setActivityScheduleCredentials({ opening_at: '', closing_at: ''});
  };

  const handleResetClosingDayInput = () => {
    setActivityClosingDayCredentials({ date: '', recurrence: false});
  };

  const handleActivityImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target?.files?.[0] as File;
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setActivityImageFileCredentials(file);
    };
  };

  const validate = (
    activityCredentials: { name: string; },
    activityDetailCredentials: { location: string; duration: number },
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
    return true
  }

  const handleScheduleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleUpdateSchedule();
    handleResetScheduleInput();
  }

  const handleClosingDaysSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleUpdateClosingDay();
    handleResetClosingDayInput();
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const error = validate(activityCredentials, activityDetailCredentials)
    if (error) {
        const formData = new FormData();

        formData.append('name', activityCredentials.name);
        formData.append('detail[location]', activityDetailCredentials.location);
        formData.append('detail[duration]', activityDetailCredentials.duration.toString());

        schedules.forEach((schedule, index) => {
          formData.append(`detail[schedules][${index}][opening_at]`, schedules[index].opening_at);
          formData.append(`detail[schedules][${index}][closing_at]`, schedules[index].closing_at);
        });

        closingDays.forEach((closingDay, index) => {
          formData.append(`detail[closingDays][${index}][date]`, closingDays[index].date);
          formData.append(`detail[closingDays][${index}][recurrence]`, closingDays[index].recurrence.toString());
        });

        formData.append('image', activityImageFileCredentials);
        formData.append('advertiser', `${router.query.id}`);

        await ActivityService.updateActivityWithRelations(api_url, `${router.query.id}`, formData, tags, setSubmitError);
  
        router.push(ROUTES.ADVERTISER.DASHBOARD)
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
       <WebInputLabel type={'text'} name={'name'} onChange={handleActivity} label={'Name'} error={errors.name}/>
      <WebInputLabel type={'text'} name={'duration'} onChange={handleActivityDetail} label={'Duration'} error={errors.duration}/>
      <label htmlFor="">
        <p>Location</p>
        <WebLocationInput mapboxAccessToken={mapboxAccessToken} setStateCredentials={setActivityDetailCredentials} stateCredentials={activityDetailCredentials} objectKey={OBJECT_KEYS.LOCATION} error={errors.location}/>
      </label>
      <WebInputLabel type={'file'} name={'image'} onChange={() => handleActivityImageUpload} label={'Image file'} error={errors.source}/>
      <WebTagInput api_url={api_url} tags={tags} setTags={setTags} />
      <label htmlFor="">
        <p>Schedules</p>
        <WebInput type={'time'} name={'opening_at'} onChange={ handleActivitySchedule} value={activityScheduleCredentials.opening_at}/>
        {errors.opening_at && <p>{errors.opening_at}</p>}
        <WebInput type={'time'} name={'closing_at'} onChange={ handleActivitySchedule} value={activityScheduleCredentials.closing_at}/>
        {errors.closing_at && <p>{errors.closing_at}</p>}
        <button onClick={handleScheduleSubmit}>Create schedule</button>
      </label>
      <label htmlFor="">
        <p>Closing day</p>
        <WebInput type={'date'} name={'date'} onChange={ handleActivityClosingDay} value={activityClosingDayCredentials.date}/>
        {errors.date && <p>{errors.date}</p>}
        <WebInput type={'checkbox'} name={'recurrence'} onChange={ handleIsChecked} />
        <button onClick={handleClosingDaysSubmit}>Create closing day</button>
      </label>
      <br />
      <br />
      <input type="submit" value="update activity" />
    </form>
  )
}
