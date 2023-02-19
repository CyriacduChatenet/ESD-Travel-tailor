import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface advertSingleSlice {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
};

const initialState: advertSingleSlice = {
    id: '',
    name: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
};

export const advertSingleSlice = createSlice({
    name: 'advertSingle',
    initialState,
    reducers: {
        createSingle: (state, actions) => {
            state.id = actions.payload.id;
            state.name = actions.payload.name;
            state.id = actions.payload.id;
            state.createdAt = actions.payload.createdAt;
            state.updatedAt = actions.payload.updatedAt;
            state.deletedAt = actions.payload.deletedAt;
        },

        updateSingle: (state, actions) => {
            state.name = actions.payload;
        },
    },
});

export const { createSingle, updateSingle } = advertSingleSlice.actions;

export const selectName = (state: RootState) => state.advertSingle.name;
export const selectAdvertSingle = (state: RootState) => state.advertSingle;

export default advertSingleSlice.reducer;