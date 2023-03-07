import { ChangeEvent, FC, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthService } from '@travel-tailor/services'
import { SigninDTO } from '@travel-tailor/types'
import { ROLES, ROUTES } from '@travel-tailor/constants'

interface IProps {
  api_url: string
}

export const WebSigninForm: FC<IProps> = ({ api_url }) => {
  const [credentials, setCredentials] = useState<SigninDTO>({
    email: '',
    password: '',
  })

  const router = useRouter()

  const handleRedirect = async (user: any) => {
    if (user.roles === ROLES.ADMIN) {
      router.push(ROUTES.ADMIN.DASHBOARD)
    } else if (user.roles === ROLES.TRAVELER) {
      router.push(ROUTES.TRAVELER.DASHBOARD)
    } else if (user.roles === ROLES.ADVERTISER) {
      router.push(ROUTES.ADVERTISER.DASHBOARD)
    }
  }

  const handleSubmit = async () => {
    const user = await AuthService.signin(`${api_url}/auth/signin`, credentials)
    handleRedirect(user)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })
  }

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
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
      <input type="submit" value={'Signin'} />
    </form>
  )
}
