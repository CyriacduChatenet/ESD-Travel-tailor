import { FC } from "react";
import { Link } from "@travel-manager/functions";

import { ROUTES } from "@/setup/constants";
import { ResetPasswordForm } from "@/app/components/auth/resetPasswordFom";

export const ResetPasswordPage: FC = () => {
    return (
        <div>
            <h1>Reset password page</h1>
            <ResetPasswordForm/>
            <p><Link to={ROUTES.AUTH.SIGNIN}>Return</Link></p>
        </div>
    );
};