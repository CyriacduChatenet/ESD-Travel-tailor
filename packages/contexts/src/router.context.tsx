import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'

type Context = {
    pathname: string;
    setPathname: Dispatch<SetStateAction<string>>;
}

const historyContext = createContext<Context>({
    pathname: '',
    setPathname: () => {}
})

export const HistoryContextProvider = ({ children }: PropsWithChildren) => {
    const [pathname, setPathname] = useState('');
  return (
  <historyContext.Provider value={{ pathname, setPathname }}>{children}</historyContext.Provider>
  );
}

export const useHistory = () => useContext<Context>(historyContext);