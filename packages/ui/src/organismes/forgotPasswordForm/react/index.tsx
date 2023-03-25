import { API_FORGOT_PASSWORD_ROUTE } from '@travel-tailor/constants'
import { AuthService } from '@travel-tailor/services'
import { ForgotPasswordDTO } from '@travel-tailor/types'
import { ChangeEvent, FC, FormEvent, useState } from '@travel-tailor/functions'

interface IProps {
  api_url: string
}

export const WebForgotPasswordForm: FC<IProps> = ({ api_url }) => {
  const [credentials, setCredentials] = useState<ForgotPasswordDTO>({
    email: '',
  })

  const [errors, setErrors] = useState<ForgotPasswordDTO>({
    email: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })
  }

  const validate = (credentials: ForgotPasswordDTO) => {
    if (!credentials.email) {
      setErrors({ ...errors, email: 'Email is required' })
      return false
    }
    return true
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const error = validate(credentials)
    if (error) {
      return AuthService.forgotPassword(
        `${api_url}${API_FORGOT_PASSWORD_ROUTE}`,
        credentials
      )
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">
        <span>Email</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </label>
      <input type="submit" value={'forgot password'} />
    </form>
  )
}
