import { FC, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { AuthService } from "@/setup/services/auth.service";
import { errorResponse } from "@/setup/types/errorApiResponse";
import { changeEmail, changePassword, selectEmail, selectPassword } from "@/setup/redux/slices/auth/signin.slice";

export const SigninForm: FC = () => {
    const [errorResponse, setErrorResponse] = useState<errorResponse>({ statusCode: 0, message:''});

    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const dispatch = useDispatch();

    const authService = new AuthService();
    const credentials = {email, password};

    const handleSubmit = (e: any) => {
        e.preventDefault();
        authService.signin(credentials, setErrorResponse);
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
            <input type="submit" value={'Signup'} />
        </form>
    );
};