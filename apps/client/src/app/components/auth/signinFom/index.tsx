import { FC, FormEvent, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { jwtDecode, Role } from "@travel-manager/functions";

import { AuthService } from "@/setup/services/auth.service";
import { errorResponse } from "@/setup/types/errorApiResponse";
import { changeEmail, changePassword, selectEmail, selectPassword } from "@/setup/redux/slices/auth/signin.slice";
import { TokenService } from "@/setup/services/token.service";
import { Token } from "@/setup/types/token.type";
import { ROUTES, TOKENS } from "@/setup/constants";

export const SigninForm: FC = () => {
    const [errorResponse, setErrorResponse] = useState<errorResponse>({ statusCode: 0, message:''});

    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authService = new AuthService();
    const tokenService = new TokenService();
    const credentials = {email, password};

    const handleFinduserRole = () => {
        const token = tokenService.find(TOKENS.ACCESS_TOKEN);
        const decodedToken = jwtDecode(String(token)) satisfies Token;
        return decodedToken.roles;
    };

    const handleRedirect = () => {
        const userRole = handleFinduserRole();

        if(userRole === Role.Advertiser) {
            navigate(ROUTES.ADVERTISER.DASHBOARD);
        } else {
            navigate(ROUTES.TRAVELER.DASHBOARD);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        authService.signin(credentials, setErrorResponse);
        handleRedirect();
    };

    const handleErrorMessage = () => {
        if(Object.keys(errorResponse).length !== 0) {
            return <p>{errorResponse.message}</p>
        }
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            {handleErrorMessage()}
            <label htmlFor="">
                <span>Email</span>
                <input type="email" placeholder="Email" name="email" onChange={(e) => dispatch(changeEmail(e.target.value))} />
            </label>
            <label htmlFor="">
                <span>Password</span>
                <input type="password" placeholder="Password" name="password" onChange={(e) => dispatch(changePassword(e.target.value))} />
            </label>
            <input type="submit" value={'Signin'} />
        </form>
    );
};