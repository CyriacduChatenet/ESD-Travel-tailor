import { FC } from "react";

import { SigninForm } from "@/app/components/auth/signinFom";
import { Link } from "react-router-dom";

export const SigninPage: FC = () => {
    return (
        <div>
            <h1>Signin page</h1>
            <SigninForm/>
            <p>no account <Link to={'/signup'}>Signup</Link></p>
        </div>
    );
};