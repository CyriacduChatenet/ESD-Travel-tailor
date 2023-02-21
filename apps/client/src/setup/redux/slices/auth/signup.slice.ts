import { createSlice } from "@reduxjs/toolkit";
import { SignupDTO } from "@travel-manager/types";

import { RootState } from "../../store";

const initialState: SignupDTO = {
    id: "",
    username: "",
    email: "",
    password: "",
    roles: [],
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

        changeRoles : (state, action) => {
            state.roles.push(action.payload);
        },

        changeId : (state, action) => {
            state.id = action.payload;
        },
    }
})

export const {changeEmail, changePassword, changeUsername, changeRoles, changeId} = signupSlice.actions;

export const selectUsername = (state: RootState) => state.signup.username;
export const selectEmail = (state: RootState) => state.signup.email;
export const selectPassword = (state: RootState) => state.signup.password;
export const selectRoles = (state: RootState) => state.signup.roles;
export const selectId = (state: RootState) => state.signup.id;

export default signupSlice.reducer;