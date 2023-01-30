import { FC } from "react";

import { SignupForm } from "@/app/components/auth/signupFom";
import { Link } from "react-router-dom";

export const SignupPage: FC = () => {
    return (
        <div>
            <h1>Signup</h1>
            <SignupForm/>
            <p>i have an account <Link to={'/signin'}>Signin</Link></p>
        </div>
    );
};