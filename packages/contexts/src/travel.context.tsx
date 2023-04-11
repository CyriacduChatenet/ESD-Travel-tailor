import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from 'react'

type Context = {
    travelId: string;
    setTravelId: Dispatch<SetStateAction<string>>;
}

const travelContext = createContext<Context>({
    travelId: '',
    setTravelId: () => {}
})

export const TravelContextProvider = ({ children }: PropsWithChildren) => {
    const [travelId, setTravelId] = useState('');
  return (
  <travelContext.Provider value={{travelId, setTravelId}}>{children}</travelContext.Provider>
  );
}

export const useTravel = () => useContext<Context>(travelContext);