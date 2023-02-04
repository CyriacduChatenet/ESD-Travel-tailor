import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";

import { TokenService } from "@/setup/services/token.service";
import { errorResponse } from "@/setup/types/errorApiResponse";
import { TravelerService } from "@/setup/services/traveler.service";
import { UserService } from "@/setup/services/user.service";
import { ROLES } from "@/setup/constants";
import { create } from "@/setup/redux/slices/user/user.slice";
import { changeId } from "../redux/slices/auth/signup.slice";

export class AuthService {
  tokenService = new TokenService();
  travelerService = new TravelerService();
  userService = new UserService();
  dispatch = useDispatch();

  public async signup(
    credentials: Object,
    setErrorState: Dispatch<SetStateAction<errorResponse>>
  ) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/auth/signup`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(credentials),
      }
    );
    const responseUserJSON = await response.json();

    if (responseUserJSON.status >= 400) {
      setErrorState(responseUserJSON);
    }

    console.log(responseUserJSON)
    this.dispatch(changeId(responseUserJSON.id));
    this.dispatch(create(responseUserJSON));

    if (responseUserJSON.roles === ROLES.TRAVELER) {
      const responseTravelerJSON = await this.travelerService.create();

      const userId = responseUserJSON.id;
      const travelerId = responseTravelerJSON.id;
      console.log("userId", userId);
      console.log("travelerId", travelerId);

      const userQuery = {
        traveler: travelerId,
      };

      const travelerQuery = {
        user: userId,
      };

      console.log("userQuery", userQuery);
      console.log("travelerQuery", travelerQuery);

      this.userService.update(userId, userQuery);
      this.travelerService.update(travelerId, travelerQuery);
    }
  }

  public async signin(
    credentials: Object,
    setErrorState: Dispatch<SetStateAction<errorResponse>>
  ) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/auth/signin`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(credentials),
      }
    );
    const responseJSON = await response.json();

    if (!responseJSON.access_token) {
      setErrorState(responseJSON);
    }

    if (responseJSON.statusCode !== 401) {
      this.tokenService.create(responseJSON.access_token);
    }
  }
}
