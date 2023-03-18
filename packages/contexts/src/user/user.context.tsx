import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { User } from '@travel-tailor/types';

type Context = {
    user: User;
    setUser: Dispatch<SetStateAction<User>>
};

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
    setUser: () => {}
});

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
    });
    return (
        <userContext.Provider value={{ user, setUser}}>{children}</userContext.Provider>
    );
};

export const useUser = () => useContext<Context>(userContext);