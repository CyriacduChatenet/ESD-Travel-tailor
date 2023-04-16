import { ChangeEvent, FC, useState, useRouter } from '@travel-tailor/functions'
import { AuthService } from '@travel-tailor/services'
import { SigninDTO } from '@travel-tailor/types'
import { API_SIGNIN_ROUTE, ROLES, ROUTES } from '@travel-tailor/constants'
import { testCityUtil } from '@travel-tailor/utils'
import { WebInputLabel } from '../../../atoms/input-label/react'

interface IProps {
  api_url: string
}

export const WebSigninForm: FC<IProps> = ({ api_url }) => {
  const [credentials, setCredentials] = useState<SigninDTO>({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<SigninDTO>({
    email: '',
    password: '',
  })

  const [submitError, setSubmitError] = useState({});

  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })
  }

  const handleRedirect = async (user: { email: string, password: string, roles: string, iat: number, exp: number}) => {
    if (user.roles === ROLES.ADMIN) {
      router.push(ROUTES.ADMIN.DASHBOARD)
    } else if (user.roles === ROLES.TRAVELER) {
      router.push(ROUTES.TRAVELER.DASHBOARD)
    } else if (user.roles === ROLES.ADVERTISER) {
      router.push(ROUTES.ADVERTISER.DASHBOARD)
    }
  }

  const validate = (credentials: SigninDTO) => {
    if (!credentials.email) {
      setErrors({ ...errors, email: 'Email is required' })
      return false
    }
    if (!credentials.password) {
      setErrors({ ...errors, password: 'Password is required' })
      return false
    }
    return true
  };

  const handleSubmit = async () => {
    const error = validate(credentials);
    if(error === true) {
      const user = await AuthService.signin(`${api_url}${API_SIGNIN_ROUTE}`, credentials, setSubmitError) as unknown as { email: string, password: string, roles: string, iat: number, exp: number}
      handleRedirect(user)
    }
  }

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
       <WebInputLabel type={'email'} label='Email' name={'email'} placeholder="Email" onChange={() => handleChange} error={errors.email}/>
       <WebInputLabel type={'password'} name={'password'} placeholder="Password" label='Password' onChange={() => handleChange} error={errors.password}/>
      <input type="submit" value={'Signin'} />
    </form>
  )
}
