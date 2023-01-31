import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useIsAuthenticated } from "@travel-manager/hooks";
import { Role } from "@travel-manager/functions";

import { AdvertService } from "@/setup/services/advert.service";
import { TokenService } from "@/setup/services/token.service";
import { selectAdvertSingle, selectName, updateSingle} from "@/setup/redux/slices/adverts/advertSingle.slice";
import { ROUTES } from "@/setup/constants";

interface IProps {
    id: string | undefined;
}

export const EditAdvertForm: FC<IProps> = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = useSelector(selectName);
    const advert = useSelector(selectAdvertSingle);
    const advertService = new AdvertService();
    const tokenService = new TokenService();

    const handleSubmit = () => {
        advertService.update(String(id), advert);
        navigate(ROUTES.ADVERTISER.DASHBOARD);
    };

    useEffect(() => {
        advertService.findOne(String(id));
    }, [])

    useIsAuthenticated(tokenService.find(), ROUTES.AUTH.SIGNIN, Role.Advertiser);
    return (
        <form action="" onSubmit={(e) => {
            e.preventDefault();
            handleSubmit()
        }}>
        <label htmlFor="">
          <span>Name</span>
          <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => dispatch(updateSingle(e.target.value))} />
        </label>
        <input type="submit" value="Edit advert" />
      </form>
    )
};