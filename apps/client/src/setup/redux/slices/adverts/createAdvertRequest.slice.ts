import { createSlice } from "@travel-tailor/functions";
import { CreateAdvertDTO } from "@travel-tailor/types";
import { RootState } from "../../store";

const initialState: CreateAdvertDTO = {
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