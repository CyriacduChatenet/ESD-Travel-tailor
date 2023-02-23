import { FC, FormEvent, useState } from "react";
import { useNavigate, useParams } from "@travel-manager/functions";

import { AuthService } from "@/setup/services/auth.service";
import { ROUTES } from "@/setup/constants";

export const ResetPasswordForm: FC = () => {
    const [password, setPassword] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    const authService = new AuthService();

    const credentials = {password, token: String(params.token)};

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        authService.resetPassword(credentials);
        navigate(ROUTES.AUTH.SIGNIN);
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">
                <span>Password</span>
                <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value={'Reset password'} />
        </form>
    );
};