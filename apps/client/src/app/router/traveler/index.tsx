import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import { TravelerDashboardPage } from "@/app/pages/traveler/dashboard";
import { ROUTES } from "@/setup/constants";

export const TravelerRouter: FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.TRAVELER.DASHBOARD} element={<TravelerDashboardPage />} />
    </Routes>
  );
};
