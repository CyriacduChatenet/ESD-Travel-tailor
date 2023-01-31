import { FC } from "react";
import { useParams } from "react-router-dom";
import { Role } from "@travel-manager/functions";
import { useIsAuthenticated } from "@travel-manager/hooks";

import { TokenService } from "@/setup/services/token.service";
import { EditAdvertForm } from "@/app/components/advert/editAdvertForm";

export const EditAdvertPage: FC = () => {
  const params = useParams();
  const tokenService = new TokenService();

  useIsAuthenticated(tokenService.find(), "/signin", Role.Advertiser);
  return (
    <div>
      <h1>Edit advert</h1>
      <EditAdvertForm id={params.id} />
    </div>
  );
};
