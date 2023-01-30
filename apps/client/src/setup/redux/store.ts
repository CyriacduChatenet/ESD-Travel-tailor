import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import signupSlice from "@/setup/redux/slices/auth/signup.slice";
import signinSlice from "@/setup/redux/slices/auth/signin.slice";
import createAdvertiserRequestSlice from "@/setup/redux/slices/advertiser/createAdvertiserRequest.slice";
import advertiserSlice from "@/setup/redux/slices/advertiser/advertiser.slice";
import createAdvertRequestSlice from "./slices/adverts/createAdvertRequest.slice";
import advertSlice from "@/setup/redux/slices/adverts/advert.slice";
import advertSingleSlice from "@/setup/redux/slices/adverts/advertSingle.slice";

export const store = configureStore({
    reducer: {
      signup: signupSlice,
      signin: signinSlice,
      advertiser: advertiserSlice,
      createAdvertiserRequest: createAdvertiserRequestSlice,
      advert: advertSlice,
      advertSingle: advertSingleSlice,
      createAdvertRequest: createAdvertRequestSlice,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;