import { createSlice } from "@travel-manager/functions";
import { CreateAdvertiserDTO } from "@travel-manager/types";

import { RootState } from "../../store";

const initialState: CreateAdvertiserDTO = {
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