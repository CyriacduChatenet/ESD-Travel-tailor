import { ROUTES } from '@travel-tailor/constants'
import { AdvertiserService, UserService } from '@travel-tailor/services'
import { CreateAdvertiserDTO } from '@travel-tailor/types'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, FormEvent, useState } from 'react'

interface IProps {
  api_url: string
}

export const WebCreateAdvertiserForm: FC<IProps> = ({ api_url }) => {
  const router = useRouter()

  const userId = router.query.id

  const [credentials, setCredentials] = useState<CreateAdvertiserDTO>({
    name: '',
    location: '',
    user: String(userId),
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const advertiser = await AdvertiserService.createAdvertiser(
      `${api_url}/advertiser`,
      credentials
    )
    await UserService.updateUser(`${api_url}`, String(userId), { advertiser: advertiser.id })
    return router.push(ROUTES.SIGNIN)
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">
        <span>Name</span>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="">
        <span>Location</span>
        <input
          type="text"
          placeholder="Location"
          name="location"
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Create advertiser" />
    </form>
  )
}
