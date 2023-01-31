import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "@travel-manager/hooks";
import { Role } from "@travel-manager/functions";

import { changeName, selectName } from "@/setup/redux/slices/adverts/createAdvertRequest.slice";
import { AdvertService } from "@/setup/services/advert.service";
import { TokenService } from "@/setup/services/token.service";
import { ROUTES } from "@/setup/constants";

export const CreateAdvertForm: FC = () => {
    const name = useSelector(selectName);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const advertService = new AdvertService();
    const tokenService = new TokenService();

    const credentials = { name };

    const handleSubmit = () => {
        advertService.create(credentials);
        navigate(ROUTES.ADVERTISER.DASHBOARD);
    };

    useIsAuthenticated(tokenService.find(), ROUTES.AUTH.SIGNIN, Role.Advertiser);
  return (
    <form action="" onSubmit={(e: any) => {
        e.preventDefault();
        handleSubmit()}}>
      <label htmlFor="">
        <span>Name</span>
        <input type="text" placeholder="Name" value={name} onChange={(e) => dispatch(changeName(e.target.value))} />
      </label>
      <input type="submit" value="Create advert" />
    </form>
  );
};
