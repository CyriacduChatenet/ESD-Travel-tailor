import React, { PropsWithChildren } from 'react'
import { UserContextProvider } from './user.context'
import { TravelContextProvider } from './travel.context'

export const Context = ({ children }: PropsWithChildren) => {
  return (
    <>
      <UserContextProvider>
        <TravelContextProvider>{children}</TravelContextProvider>
      </UserContextProvider>
    </>
  )
}
