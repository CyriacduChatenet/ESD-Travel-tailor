import { FC, FormEvent } from "react";
import { useDispatch, useSelector, useNavigate } from "@travel-manager/functions";

import { changeName, selectName } from "@/setup/redux/slices/adverts/createAdvertRequest.slice";
import { AdvertService } from "@/setup/services/advert.service";
import { ROUTES } from "@/setup/constants";

export const CreateAdvertForm: FC = () => {
    const name = useSelector(selectName);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const advertService = new AdvertService()

    const credentials = { name };

    const handleSubmit = () => {
        advertService.create(credentials);
        navigate(ROUTES.ADVERTISER.DASHBOARD);
    };
    
  return (
    <form action="" onSubmit={(e: FormEvent<HTMLFormElement>) => {
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
