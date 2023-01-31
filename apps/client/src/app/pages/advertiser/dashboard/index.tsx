import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Role } from "@travel-manager/functions";
import { useIsAuthenticated } from "@travel-manager/hooks";

import { TokenService } from "@/setup/services/token.service";
import { AdvertService } from "@/setup/services/advert.service";
import { selectAdverts } from "@/setup/redux/slices/adverts/advert.slice";
import { ROUTES } from "@/setup/constants";

import "./style.css";

export const AdvertiserDashboardPage: FC = () => {
  const adverts = useSelector(selectAdverts);
  const navigate = useNavigate();

  const tokenService = new TokenService();
  const advertService = new AdvertService();

  const handleRedirect = (id: string) => {
    navigate(ROUTES.ADVERTISER.ADVERT.UPDATE_WITHOUT_ID+id)
  };

  const handleDelete = (id: string) => {
    advertService.delete(id);
  };

  const handleLogout = () => {
    tokenService.delete();
    navigate(ROUTES.AUTH.SIGNIN)
  };

  useEffect(() => {
    advertService.findAll();
  }, []);

  useIsAuthenticated(tokenService.find(), ROUTES.AUTH.SIGNIN, Role.Advertiser);
  return (
    <div>
      <h1>Advertiser dashboard</h1>
      <Link to={ROUTES.ADVERTISER.ADVERT.CREATE}>Create advert</Link>
      <br />
      <br />
      <table className="tg">
        <thead>
          <tr>
            <th className="tg-0pky">id</th>
            <th className="tg-0pky">name</th>
            <th className="tg-0pky">update</th>
            <th className="tg-0pky">delete</th>
          </tr>
        </thead>
        <tbody>
          {adverts.advert.map((advert, index) => (
            <tr key={index}>
              <td className="tg-0pky">{index+1}</td>
              <td className="tg-0pky">{advert.name}</td>
              <td className="tg-0pky"><button onClick={() => handleRedirect(String(advert.id))}>Update</button></td>
              <td className="tg-0pky"><button onClick={() => handleDelete(String(advert.id))}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};
