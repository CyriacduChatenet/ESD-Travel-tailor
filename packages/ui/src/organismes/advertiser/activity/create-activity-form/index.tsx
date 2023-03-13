import { ActivityService, ActivityTagService } from '@travel-tailor/services';
import { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'

interface IProps {
  api_url: string;
  tags: any[];
  setTags: Dispatch<SetStateAction<any[]>>;
}

export const WebCreateActivityForm: FC<IProps> = ({ api_url, tags, setTags }) => {
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

  const handleCreateTag = async () => {
    return setTags([...tags, await ActivityTagService.createActivityTag(api_url, activityTagCredentials)])
  };

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
      advertiser: `${router.query.id}`,
      tags: [],
    }
    
    ActivityService.createActivityWithTagRelation(api_url, sendObject, tags)
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
      <br />
      <br />
      <input type="submit" value="Create activity" />
    </form>
  )
}
