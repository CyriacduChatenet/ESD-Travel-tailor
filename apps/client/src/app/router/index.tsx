import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "@/app/pages/home";
import { SigninPage } from "@/app/pages/auth/signin";
import { SignupPage } from "@/app/pages/auth/signup";
import { CreateAdvertiserPage } from "@/app/pages/advertiser/createAdvertiser";
import { AdvertiserDashboardPage } from "@/app/pages/advertiser/advertiserDashboard";
import { CreateAdvertPage } from "@/app/pages/advert/createAdvert";
import { EditAdvertPage } from "@/app/pages/advert/editAdvert";

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"signin"} element={<SigninPage />} />
        <Route path={"signup"} element={<SignupPage />} />
        <Route path={"create-advertiser"} element={<CreateAdvertiserPage />} />
        <Route path={"advertiser/dashboard"} element={<AdvertiserDashboardPage />} />
        <Route path={"advertiser/create-advert"} element={<CreateAdvertPage />} />
        <Route path={"advertiser/edit-advert/:id"} element={<EditAdvertPage />} />
      </Routes>
    </BrowserRouter>
  );
};
