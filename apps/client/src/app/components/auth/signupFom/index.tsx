import { FC, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { AuthService } from "@/setup/services/auth.service";
import { errorResponse } from "@/setup/types/errorApiResponse";
import { changeEmail, changePassword, changeUsername, selectEmail, selectPassword, selectUsername } from "@/setup/redux/slices/auth/signup.slice";

export const SignupForm: FC = () => {
    const [errorResponse, setErrorResponse] = useState<errorResponse>({ statusCode: 0, message:''})

    const username = useSelector(selectUsername);
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);

    const credentials = {username, email, password};

    const dispatch = useDispatch();

    const authService = new AuthService();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        authService.signup(credentials, setErrorResponse);
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
                <span>Username</span>
                <input type="text" placeholder="Username" name="username"  value={username} onChange={(e) => dispatch(changeUsername(e.target.value))} />
            </label>
            <label htmlFor="">
                <span>Email</span>
                <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => dispatch(changeEmail(e.target.value))} />
            </label>
            <label htmlFor="">
                <span>Password</span>
                <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => dispatch(changePassword(e.target.value))} />
            </label>
            <input type="submit" value={'Signup'} />
        </form>
    );
};