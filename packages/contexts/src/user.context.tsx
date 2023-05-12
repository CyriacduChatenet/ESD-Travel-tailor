'use client'

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
import { ROUTES } from '@travel-tailor/constants'

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
      user: '',
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
      user: '',
    },
  })

  const [submitError, setSubmitError] = useState({});

  const findUserInfo = async (api_url: string) => {
    if (TokenService.getSigninToken() !== undefined || TokenService.getAccessToken() !== undefined) {
      const u = await UserService.getUserInfo(api_url, setSubmitError) as User
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
