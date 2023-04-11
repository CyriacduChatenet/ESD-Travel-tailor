import { ActivityService } from '@travel-tailor/services'
import { OBJECT_KEYS, ROUTES } from '@travel-tailor/constants'
import {
  ChangeEvent,
  FC,
  FormEvent,
  useState,
  useRouter,
} from '@travel-tailor/functions'
import { WebLocationInput } from '../../atoms/location-input/react'

interface IProps {
  api_url: string
  mapboxAccessToken: string
}

export const WebUpdateActivityForm: FC<IProps> = ({ api_url, mapboxAccessToken }) => {
  const [activityCredentials, setActivityCredentials] = useState<{
    name: string
  }>({
    name: '',
  })
  const [activityDetailCredentials, setActivityDetailCredentials] = useState<{
    location: string
    duration: number
  }>({
    location: '',
    duration: 0,
  })
  const [activityImageFileCredentials, setActivityImageFileCredentials] = useState<any>({})

  const [errors, setErrors] = useState<{
    name: string
    location: string
    duration: string
    source: string
  }>({
    name: '',
    location: '',
    duration: '',
    source: '',
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
    setActivityDetailCredentials({
      ...activityDetailCredentials,
      [name]: value,
    })
  }

  const handleActivityImageUpload = (e: any) => {
    e.preventDefault()
    const file = e.target?.files[0];
  
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const error = validate(activityCredentials, activityDetailCredentials);
    if (error) {
      const formData = new FormData();

      formData.append('name', activityCredentials.name);
      formData.append('detail[location]', activityDetailCredentials.location);
      formData.append('detail[duration]', activityDetailCredentials.duration.toString());

      formData.append('image', activityImageFileCredentials);
      formData.append('advertiser', `${router.query.id}`);

      await ActivityService.updateActivityFormData(api_url,`${router.query.id}`, formData)
      router.push(ROUTES.ADVERTISER.DASHBOARD)
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">
        <p>Name</p>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleActivity}
        />
        {errors.name && <p>{errors.name}</p>}
      </label>
      <label htmlFor="">
        <p>Duration</p>
        <input
          type="text"
          name="duration"
          placeholder="duration"
          onChange={handleActivityDetail}
        />
        {errors.duration && <p>{errors.duration}</p>}
      </label>
      <label htmlFor="">
        <p>Location</p>
        <WebLocationInput mapboxAccessToken={mapboxAccessToken} setStateCredentials={setActivityDetailCredentials} stateCredentials={activityDetailCredentials} objectKey={OBJECT_KEYS.LOCATION} error={errors.location}/>
      </label>
      <label htmlFor="">
        <p>Image file</p>
        <input type="file" name="image" onChange={handleActivityImageUpload} />
        {errors.source && <p>{errors.source}</p>}
      </label>
      <input type="submit" value="Update activity" />
    </form>
  )
}
