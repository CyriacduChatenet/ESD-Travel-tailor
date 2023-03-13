import { ROLES, ROUTES } from '@travel-tailor/constants'
import {
  AuthService,
  TravelerService,
  UserService,
} from '@travel-tailor/services'
import { SignupDTO } from '@travel-tailor/types'
import { useRouter } from 'next/router'
import { FC, FormEvent, useState } from 'react'

interface IProps {
  api_url: string
}

export const WebSignupForm: FC<IProps> = ({ api_url }) => {
  const [credentials, setCredentials] = useState<SignupDTO>({
    username: '',
    email: '',
    password: '',
    roles: '',
  })

  const router = useRouter()

  const handleRedirect = async (user: any) => {
    if (credentials.roles === ROLES.TRAVELER) {
      const traveler = await TravelerService.createTraveler(api_url, {
        user: await user.id,
      })
      await UserService.updateUser(api_url, await user.id, { traveler: traveler.id })
      router.push(`${ROUTES.TRAVELER.TASTE.CREATE}/${traveler.id}`)
    }

    if (credentials.roles === ROLES.ADVERTISER) {
      router.push(`${ROUTES.ADVERTISER.CREATE_ADVERTISER}/${user.id}`)
    }

    if (credentials.roles === ROLES.ADMIN) {
      router.push(ROUTES.SIGNIN)
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = await AuthService.signup(`${api_url}/auth/signup`, credentials)
    handleRedirect(user)
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">
        <span>Username</span>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="">
        <span>Email</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="">
        <span>Password</span>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="">
        <span>Roles</span>
        <select name="roles" onChange={handleChange}>
          <option value="">select role</option>
          <option value="traveler">Traveler</option>
          <option value="advertiser">Advertiser</option>
        </select>
      </label>
      <input type="submit" value={'Signup'} />
    </form>
  )
}
