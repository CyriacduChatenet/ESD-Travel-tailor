import { Action, configureStore, ThunkAction } from "@travel-manager/functions";

import signupSlice from "@/setup/redux/slices/auth/signup.slice";
import signinSlice from "@/setup/redux/slices/auth/signin.slice";
import createAdvertiserRequestSlice from "@/setup/redux/slices/advertiser/createAdvertiserRequest.slice";
import advertiserSlice from "@/setup/redux/slices/advertiser/advertiser.slice";
import createAdvertRequestSlice from "./slices/adverts/createAdvertRequest.slice";
import advertSlice from "@/setup/redux/slices/adverts/advert.slice";
import advertSingleSlice from "@/setup/redux/slices/adverts/advertSingle.slice";
import travelerSlice from "@/setup/redux/slices/traveler/traveler.slice";
import userSlice from "@/setup/redux/slices/user/user.slice";

export const store = configureStore({
    reducer: {
      signup: signupSlice,
      signin: signinSlice,
      traveler: travelerSlice,
      createAdvertiserRequest: createAdvertiserRequestSlice,
      advertiser: advertiserSlice,
      advert: advertSlice,
      advertSingle: advertSingleSlice,
      createAdvertRequest: createAdvertRequestSlice,
      user: userSlice
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