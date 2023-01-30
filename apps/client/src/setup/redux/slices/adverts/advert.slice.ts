import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface advertSlice {
    id: string | undefined;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

const initialState: advertSlice[] = [];

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
            console.log(advert);
        },

        remove: (state, actions) => {
            state = state.filter(advert => advert.id !== actions.payload);
        },
    },
});

export const { findAll, create, update, remove, refreshFromAPI } = advertSlice.actions;

export const selectAdverts = (state: RootState) => state;

export default advertSlice.reducer;