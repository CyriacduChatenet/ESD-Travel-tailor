import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface CreateAdvertRequestSlice {
    name: string;
};

const initialState: CreateAdvertRequestSlice = {
    name: "",
};

export const createAdvertRequestSlice = createSlice({
    name: 'createAdvertiserRequest',
    initialState,
    reducers: {
        changeName : (state, action) => {
            state.name = action.payload;
        }
    }
})

export const {changeName} = createAdvertRequestSlice.actions;

export const selectName = (state: RootState) => state.createAdvertRequest.name;

export default createAdvertRequestSlice.reducer;