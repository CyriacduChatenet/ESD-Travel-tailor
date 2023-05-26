import React, { PropsWithChildren } from 'react'

import { HistoryContextProvider } from './router.context'
import { UserContextProvider } from './user.context'

export const Context = ({ children }: PropsWithChildren) => {
  return (
    <>
      <UserContextProvider>
        <HistoryContextProvider>{children}</HistoryContextProvider>
      </UserContextProvider>
    </>
  )
}
