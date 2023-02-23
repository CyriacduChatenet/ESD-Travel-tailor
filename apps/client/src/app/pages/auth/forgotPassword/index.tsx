import { FC } from "react";
import { Link } from "@travel-manager/functions";

import { ROUTES } from "@/setup/constants";
import { ForgotPasswordForm } from "@/app/components/auth/forgotPasswordFom";

export const ForgotPasswordPage: FC = () => {
    return (
        <div>
            <h1>Forgot password page</h1>
            <ForgotPasswordForm/>
            <p><Link to={ROUTES.AUTH.SIGNIN}>Return</Link></p>
        </div>
    );
};