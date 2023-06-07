import React, { PropsWithChildren } from 'react'

import { HistoryContextProvider } from './router.context'
import { UserContextProvider } from './user.context'
import { TravelContextProvider } from './travel.context'

export const Context = ({ children }: PropsWithChildren) => {
  return (
    <>
      <UserContextProvider>
        <TravelContextProvider>
          <HistoryContextProvider>{children}</HistoryContextProvider>
        </TravelContextProvider>
      </UserContextProvider>
    </>
  )
}
