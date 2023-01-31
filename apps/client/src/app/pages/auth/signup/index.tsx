import { FC } from "react";
import { Link } from "react-router-dom";

import { SignupForm } from "@/app/components/auth/signupFom";
import { ROUTES } from "@/setup/constants";

export const SignupPage: FC = () => {
    return (
        <div>
            <h1>Signup</h1>
            <SignupForm/>
            <p>i have an account <Link to={ROUTES.AUTH.SIGNIN}>Signin</Link></p>
        </div>
    );
};