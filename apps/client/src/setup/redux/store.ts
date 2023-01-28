import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import signupSlice from "@/setup/redux/slices/auth/signup.slice";
import signinSlice from "@/setup/redux/slices/auth/signin.slice";

export const store = configureStore({
    reducer: {
      signup: signupSlice,
      signin: signinSlice
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