import { ActivityService } from '@travel-tailor/services';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useState } from 'react'

interface IProps {
  api_url: string
}

export const WebCreateActivityForm: FC<IProps> = ({ api_url }) => {
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

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const sendObject = {
      ...activityCredentials,
      detail: {
        ...activityDetailCredentials,
      },
      image: {
        ...activityImageCredentials,
      },
      advertiser: `${router.query.id}`
    }
    
    ActivityService.createActivity(api_url, sendObject)
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
      <input type="submit" value="Create activity" />
    </form>
  )
}
