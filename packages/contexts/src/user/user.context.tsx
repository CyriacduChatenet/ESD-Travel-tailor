import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { User } from '@travel-tailor/types'
import { TokenService, UserService } from '@travel-tailor/services'

type Context = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
  findUserInfo: (api_url: string) => void
}

const userContext = createContext<Context>({
  user: {
    id: '',
    username: '',
    email: '',
    password: '',
    roles: '',
    resetPasswordToken: {
      id: '',
      token: '',
      user: {},
    },
  },
  setUser: () => {},
  findUserInfo: () => {},
})

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({
    id: '',
    username: '',
    email: '',
    password: '',
    roles: '',
    resetPasswordToken: {
      id: '',
      token: '',
      user: {},
    },
  })

  const findUserInfo = async (api_url: string) => {
    if (
      window.location.pathname !== '/signin' &&
      window.location.pathname !== '/signup' &&
      window.location.pathname !== '/reset-password/*' &&
      window.location.pathname !== '/create-tastes/*' &&
      window.location.pathname !== '/create-advertiser/*' &&
      window.location.pathname !== '/'
    ) {
      const u = await UserService.getUserInfo(api_url)
      setUser(u)
    }
  }

  return (
    <userContext.Provider value={{ user, setUser, findUserInfo }}>
      {children}
    </userContext.Provider>
  )
}

export const useUser = () => useContext<Context>(userContext)
