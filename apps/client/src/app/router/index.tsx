import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "@/app/pages/home";
import { SigninPage } from "@/app/pages/signin";
import { SignupPage } from "@/app/pages/signup";

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"signin"} element={<SigninPage />} />
        <Route
          path={"signup"}
          element={
              <SignupPage />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
