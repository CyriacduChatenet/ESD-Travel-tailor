import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AdvertService } from "@/setup/services/advert.service";
import { selectAdvertSingle, selectName, updateSingle} from "@/setup/redux/slices/adverts/advertSingle.slice";

interface IProps {
    id: string | undefined;
}

export const EditAdvertForm: FC<IProps> = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = useSelector(selectName);
    const advert = useSelector(selectAdvertSingle);
    const advertService = new AdvertService();

    const handleSubmit = () => {
        advertService.update(String(id), advert);
        navigate('/advertiser/dashboard');
    };

    useEffect(() => {
        advertService.findOne(String(id));
    }, [])
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