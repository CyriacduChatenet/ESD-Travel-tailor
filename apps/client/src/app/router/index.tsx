import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "@/app/pages/home";
import { SigninPage } from "@/app/pages/auth/signin";
import { SignupPage } from "@/app/pages/auth/signup";

import { AdminRouter } from "@/app/router/admin";
import { AdvertiserRouter } from "@/app/router/advertiser";
import { TravelerRouter } from "@/app/router/traveler";
import { ROUTES } from "@/setup/constants";

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.ROOT} element={<HomePage />} />
        <Route path={ROUTES.AUTH.SIGNIN} element={<SigninPage />} />
        <Route path={ROUTES.AUTH.SIGNUP} element={<SignupPage />} />
      </Routes>
      <AdminRouter />
      <AdvertiserRouter />
      <TravelerRouter />
    </BrowserRouter>
  );
};
