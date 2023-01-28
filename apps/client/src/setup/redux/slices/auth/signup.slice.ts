import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface SignupSlice {
    username: string;
    email: string;
    password: string;
};

const initialState: SignupSlice = {
    username: "",
    email: "",
    password: "",
};

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        changeUsername : (state, action) => {
            state.username = action.payload;
        },

        changeEmail : (state, action) => {
            state.email = action.payload;
        },

        changePassword : (state, action) => {
            state.password = action.payload;
        },
    }
})

export const {changeEmail, changePassword, changeUsername} = signupSlice.actions;

export const selectUsername = (state: RootState) => state.signup.username;
export const selectEmail = (state: RootState) => state.signup.email;
export const selectPassword = (state: RootState) => state.signup.password;

export default signupSlice.reducer;