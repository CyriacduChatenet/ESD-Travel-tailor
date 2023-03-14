import { AuthService, TokenService } from '@travel-tailor/services'
import { ResetPasswordDTO } from '@travel-tailor/types'
import { useRouter } from 'next/router'
import { FC, FormEvent, useState } from 'react'

interface IProps {
  api_url: string
}

export const WebResetPasswordForm: FC<IProps> = ({ api_url }) => {
  const [credentials, setCredentials] = useState<ResetPasswordDTO>({
    password: '',
  })

  const router = useRouter()

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const token = router.query.resetToken
    await AuthService.resetPassword(
      `${api_url}/auth/reset-password`,
      credentials,
      String(token)
    )
    TokenService.removeSigninToken();
    return router.push('/signin')
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">
        <span>Password</span>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
      </label>
      <input type="submit" value={'reset password'} />
    </form>
  )
}
