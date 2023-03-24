import React, { PropsWithChildren } from 'react'
import { UserContextProvider } from './user.context'

export const Context = ({ children }: PropsWithChildren) => {
  return (
    <>
      <UserContextProvider>{children}</UserContextProvider>
    </>
  )
}
