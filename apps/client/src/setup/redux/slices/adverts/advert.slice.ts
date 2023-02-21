import { createSlice } from "@reduxjs/toolkit";
import { Advert } from "@travel-manager/types";

import { RootState } from "../../store";

const initialState: Advert[] = [];

export const advertSlice = createSlice({
    name: 'advert',
    initialState,
    reducers: {
        findAll: (state, actions) => {
            state;
        },

        create: (state, actions) => {
            state.push(actions.payload);
        },

        refreshFromAPI: (state, actions) => {
            state.push(...actions.payload);
        },

        update: (state, actions) => {
            let advert = state.filter(advert => advert.id === actions.payload.id);
        },

        remove: (state, actions) => {
            state = state.filter(advert => advert.id !== actions.payload);
        },
    },
});

export const { findAll, create, update, remove, refreshFromAPI } = advertSlice.actions;

export const selectAdverts = (state: RootState) => state;

export default advertSlice.reducer;