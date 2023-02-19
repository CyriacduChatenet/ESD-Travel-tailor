import { FC, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AuthService } from "@/setup/services/auth.service";
import { errorResponse } from "@/setup/types/errorApiResponse";
import {
  changeEmail,
  changePassword,
  changeRoles,
  changeUsername,
  selectEmail,
  selectId,
  selectPassword,
  selectRoles,
  selectUsername,
} from "@/setup/redux/slices/auth/signup.slice";
import { ROLES, ROUTES } from "@/setup/constants";

export const SignupForm: FC = () => {
  const [errorResponse, setErrorResponse] = useState<errorResponse>({
    statusCode: 0,
    message: "",
  });

  const username = useSelector(selectUsername);
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const roles = useSelector(selectRoles);
  const id = useSelector(selectId);
  const navigate = useNavigate();

  const credentials = { username, email, password, roles };

  const dispatch = useDispatch();

  const authService = new AuthService();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authService.signup(credentials, setErrorResponse);
    if (roles[0] === ROLES.TRAVELER) {
        navigate(ROUTES.AUTH.SIGNIN);
    }

    if (roles[0] === ROLES.ADVERTISER) {
        if(id.length > 0) {
          navigate(`/create-advertiser/${id}`);
        }
    }
  };

  const handleErrorMessage = () => {
    if (Object.keys(errorResponse).length !== 0) {
      return <p>{errorResponse.message}</p>;
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      {handleErrorMessage()}
      <label htmlFor="">
        <span>Username</span>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => dispatch(changeUsername(e.target.value))}
        />
      </label>
      <label htmlFor="">
        <span>Email</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => dispatch(changeEmail(e.target.value))}
        />
      </label>
      <label htmlFor="">
        <span>Password</span>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => dispatch(changePassword(e.target.value))}
        />
      </label>
      <label htmlFor="">
        <span>Roles</span>
        <select
          name="roles"
          onChange={(e) => dispatch(changeRoles(e.target.value))}
        >
          <option value="">select role</option>
          <option value="traveler">Traveler</option>
          <option value="advertiser">Advertiser</option>
        </select>
      </label>
      <input type="submit" value={"Signup"} />
    </form>
  );
};
