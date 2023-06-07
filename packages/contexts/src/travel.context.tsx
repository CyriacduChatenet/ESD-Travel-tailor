import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react'

type Context = {
    day_id: string;
    setDay_id: Dispatch<SetStateAction<string>>
    timeSlot_id: string;
    setTimeSlot_id: Dispatch<SetStateAction<string>>;
    travel_id: string;
    setTravel_id: Dispatch<SetStateAction<string>>;
}

const TravelContext = createContext<Context>({
    day_id: '',
    setDay_id: () => {},
    timeSlot_id: '',
    setTimeSlot_id: () => {},
    travel_id: '',
    setTravel_id: () => {},
});

export const TravelContextProvider = ({ children }: PropsWithChildren) => {
    const [day_id, setDay_id] = useState('');
    const [timeSlot_id, setTimeSlot_id] = useState('');
    const [travel_id, setTravel_id] = useState('');

    return (
        <TravelContext.Provider value={{ day_id, setDay_id, timeSlot_id, setTimeSlot_id, travel_id, setTravel_id }}>
        {children}
        </TravelContext.Provider>
    )
};

export const useTravel = () => useContext<Context>(TravelContext);