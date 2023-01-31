import { FC } from "react";
import { Link } from "react-router-dom";

import { SigninForm } from "@/app/components/auth/signinFom";
import { ROUTES } from "@/setup/constants";

export const SigninPage: FC = () => {
    return (
        <div>
            <h1>Signin page</h1>
            <SigninForm/>
            <p>no account <Link to={ROUTES.AUTH.SIGNUP}>Signup</Link></p>
        </div>
    );
};