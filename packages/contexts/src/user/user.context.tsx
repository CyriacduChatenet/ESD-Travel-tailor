import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { User } from '@travel-tailor/types'
import { UserService } from '@travel-tailor/services'
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
      window.location.pathname !== ROUTES.AUTH.SIGNIN &&
      window.location.pathname !== ROUTES.AUTH.SIGNUP &&
      window.location.pathname !== `${ROUTES.AUTH.RESET_PASSWORD}/*` &&
      window.location.pathname !== `${ROUTES.TRAVELER.TASTE.CREATE}/*` &&
      window.location.pathname !== `${ROUTES.ADVERTISER.CREATE_ADVERTISER}/*` &&
      window.location.pathname !== ROUTES.ROOT
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
