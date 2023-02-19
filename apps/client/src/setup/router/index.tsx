import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "@/app/pages/home";
import { SigninPage } from "@/app/pages/auth/signin";
import { SignupPage } from "@/app/pages/auth/signup";
import { ForgotPasswordPage } from "@/app/pages/auth/forgotPassword";

import { AdminRouter } from "@/setup/router/admin";
import { AdvertiserRouter } from "@/setup/router/advertiser";
import { TravelerRouter } from "@/setup/router/traveler";
import { ROUTES } from "@/setup/constants";
import { ResetPasswordPage } from "@/app/pages/auth/resetPassword";

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.ROOT} element={<HomePage />} />
        <Route path={ROUTES.AUTH.SIGNIN} element={<SigninPage />} />
        <Route path={ROUTES.AUTH.SIGNUP} element={<SignupPage />} />
        <Route path={ROUTES.AUTH.FORGOT_PASWORD} element={<ForgotPasswordPage />} />
        <Route path={`${ROUTES.AUTH.RESET_PASWORD}/:token`} element={<ResetPasswordPage />} />
      </Routes>
      <AdminRouter />
      <AdvertiserRouter />
      <TravelerRouter />
    </BrowserRouter>
  );
};
