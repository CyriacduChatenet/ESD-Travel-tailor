import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface SigninSlice {
    email: string;
    password: string;
};

const initialState: SigninSlice = {
    email: "",
    password: "",
};

export const signupSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        changeEmail : (state, action) => {
            state.email = action.payload;
        },

        changePassword : (state, action) => {
            state.password = action.payload;
        },
    }
})

export const {changeEmail, changePassword} = signupSlice.actions;

export const selectEmail = (state: RootState) => state.signin.email;
export const selectPassword = (state: RootState) => state.signin.password;

export default signupSlice.reducer;