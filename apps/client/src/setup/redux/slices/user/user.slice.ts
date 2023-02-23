import { createSlice } from "@travel-manager/functions";
import { User } from "@travel-manager/types";

import { RootState } from "../../store";

const initialState: User[] = [];

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        findAll: (state, actions) => {
            state;
        },

        findOne: (state, actions) => {
            state.filter(user => user.id === actions.payload);
        },

        create: (state, actions) => {
            state.push(actions.payload);
        },

        update: (state, actions) => {
            let user = state.filter(user => user.id === actions.payload.id);
            user = actions.payload.value;
        },

        remove: (state, actions) => {
            state = state.filter(user => user.id !== actions.payload);
        },
    }
})

export const { findAll, findOne, create, update, remove } = userSlice.actions;

export const selectUsers = (state: RootState) => state.advert;

export default userSlice.reducer;