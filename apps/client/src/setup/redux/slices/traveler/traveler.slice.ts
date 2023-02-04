import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface travelerSlice {
        id: string;
        name: string;
        location: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
};

const initialState: travelerSlice[] = [];

export const travelerSlice = createSlice({
    name: 'traveler',
    initialState,
    reducers: {
        findAll: (state, actions) => {
            state;
        },

        findOne: (state, actions) => {
            state.filter(traveler => traveler.id === actions.payload);
        },

        create: (state, actions) => {
            state = [...state, actions.payload];
        },

        update: (state, actions) => {
            let traveler = state.filter(traveler => traveler.id === actions.payload.id);
            traveler = actions.payload.value;
        },

        remove: (state, actions) => {
            state = state.filter(traveler => traveler.id !== actions.payload);
        },
    }
})

export const { findAll, findOne, create, update, remove } = travelerSlice.actions;

export const selectTravelers = (state: RootState) => state.advert;

export default travelerSlice.reducer;