import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface CreateAdvertiserRequestSlice {
    name: string;
    location: string;
};

const initialState: CreateAdvertiserRequestSlice = {
    name: "",
    location: "",
};

export const createAdvertiserRequestSlice = createSlice({
    name: 'createAdvertiserRequest',
    initialState,
    reducers: {
        changeName : (state, action) => {
            state.name = action.payload;
        },

        changeLocation : (state, action) => {
            state.location = action.payload;
        },
    }
})

export const {changeName, changeLocation} = createAdvertiserRequestSlice.actions;

export const selectName = (state: RootState) => state.createAdvertiserRequest.name;
export const selectLocation = (state: RootState) => state.createAdvertiserRequest.location;

export default createAdvertiserRequestSlice.reducer;