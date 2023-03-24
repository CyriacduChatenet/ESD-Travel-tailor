import { ActivityService } from '@travel-tailor/services';
import { ROUTES } from '@travel-tailor/constants';
import { ChangeEvent, FC, FormEvent, useState, useRouter } from '@travel-tailor/functions'

interface IProps {
  api_url: string
}

export const WebUpdateActivityForm: FC<IProps> = ({ api_url }) => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const sendObject = {
      ...activityCredentials,
      detail: {
        ...activityDetailCredentials,
      },
      image: {
        ...activityImageCredentials,
      },
    }
    await ActivityService.updateActivity(api_url, `${router.query.id}`, sendObject)
    router.push(ROUTES.ADVERTISER.DASHBOARD)
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
      <input type="submit" value="Update activity" />
    </form>
  )
}
