import { createSlice } from "@reduxjs/toolkit";
import { SigninDTO } from "@travel-manager/types";

import { RootState } from "../../store";

const initialState: SigninDTO = {
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