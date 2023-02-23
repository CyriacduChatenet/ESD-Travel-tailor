import { FC } from "react";
import { useNavigate } from "@travel-manager/functions";

import { TokenService } from "@/setup/services/token.service";
import { ROUTES, TOKENS } from "@/setup/constants";

export const TravelerDashboardPage: FC = () => {
  const navigate = useNavigate();
  const tokenService = new TokenService();

  const handleLogout = () => {
    tokenService.delete(TOKENS.ACCESS_TOKEN);
    navigate(ROUTES.AUTH.SIGNIN)
  };
  return (
    <div>
      <h1>Traveler Dashboard</h1>
      <br />
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};
