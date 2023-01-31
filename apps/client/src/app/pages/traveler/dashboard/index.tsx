import { Role } from "@travel-manager/functions";
import { useIsAuthenticated } from "@travel-manager/hooks";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { TokenService } from "@/setup/services/token.service";
import { ROUTES } from "@/setup/constants";

export const TravelerDashboardPage: FC = () => {
  const navigate = useNavigate();
  const tokenService = new TokenService();

  const handleLogout = () => {
    tokenService.delete();
    navigate(ROUTES.AUTH.SIGNIN)
  };

  useIsAuthenticated(tokenService.find(), ROUTES.AUTH.SIGNIN, Role.Traveler);
  return (
    <div>
      <h1>Traveler Dashboard</h1>
      <br />
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};
