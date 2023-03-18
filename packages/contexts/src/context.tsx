import React, { PropsWithChildren } from 'react'
import { UserContextProvider } from './user/user.context'

export const Context = ({ children }: PropsWithChildren) => {
  return (
    <>
      <UserContextProvider>{children}</UserContextProvider>
    </>
  )
}
