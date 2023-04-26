import { API_SIGNUP_ROUTE, ROLES, ROUTES } from '@travel-tailor/constants'
import {
  AuthService,
  TravelerService,
  UserService,
} from '@travel-tailor/services'
import { SignupDTO, User } from '@travel-tailor/types'
import { ChangeEvent, FC, FormEvent, useState, useRouter } from '@travel-tailor/functions'
import { testCityUtil } from '@travel-tailor/utils'
import { WebInputLabel } from '../../../atoms/input-label/react'

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

  const [errors, setErrors] = useState<SignupDTO>({
    username: '',
    email: '',
    password: '',
    roles: '',
  });

  const [submitError, setSubmitError] = useState({});

  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })
  }

  const handleRedirect = async (user: User) => {
    if (credentials.roles === ROLES.TRAVELER) {
      const traveler = await TravelerService.createTraveler(api_url, {
        user: user.id,
      }, setSubmitError)
      await UserService.updateUser(api_url, await user.id, { traveler: traveler.id }, setSubmitError)
      router.push(`${ROUTES.TRAVELER.TASTE.CREATE}/${traveler.id}`)
    }

    if (credentials.roles === ROLES.ADVERTISER) {
      router.push(`${ROUTES.ADVERTISER.CREATE_ADVERTISER}/${user.id}`)
    }

    if (credentials.roles === ROLES.ADMIN) {
      router.push(ROUTES.AUTH.SIGNIN)
    }
  }

  const validate = (credentials: SignupDTO) => {
    if (!credentials.username) {
      setErrors({ ...errors, username: 'Username is required' })
      return false
    }
    if (!credentials.email) {
      setErrors({ ...errors, email: 'Email is required' })
      return false
    }
    if (!credentials.password) {
      setErrors({ ...errors, password: 'Password is required' })
      return false
    }
    if (!credentials.roles) {
      setErrors({ ...errors, roles: 'Role is required' })
      return false
    }
    return true
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const error = validate(credentials);
    if(error === true) {
      const user = await AuthService.signup(`${api_url}${API_SIGNUP_ROUTE}`, credentials, setSubmitError)
      handleRedirect(user)
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <WebInputLabel type={'text'} label='Username' name={'username'} placeholder="Username" onChange={() => handleChange} error={errors.username}/>
      <WebInputLabel type={'email'} label='Email' name={'email'} placeholder="Email" onChange={() => handleChange} error={errors.email}/>
       <WebInputLabel type={'password'} name={'password'} placeholder="Password" label='Password' onChange={() => handleChange} error={errors.password}/>
      <label htmlFor="">
        <span>Roles</span>
        <select name="roles" onChange={handleChange}>
          <option value="">select role</option>
          <option value="traveler">Traveler</option>
          <option value="advertiser">Advertiser</option>
        </select>
        {errors.roles && <p>{errors.roles}</p>}
      </label>
      <input type="submit" value={'Signup'} />
    </form>
  )
}
