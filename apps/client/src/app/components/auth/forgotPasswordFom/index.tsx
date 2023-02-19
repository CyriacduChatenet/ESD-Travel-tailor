import { FC, FormEvent, useState } from "react";

import { AuthService } from "@/setup/services/auth.service";

export const ForgotPasswordForm: FC = () => {
    const [email, setEmail] = useState('');

    const authService = new AuthService();

    const credentials = {email};

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        authService.forgotPassword(credentials);
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">
                <span>Email</span>
                <input type="email" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <input type="submit" value={'Forgot password'} />
        </form>
    );
};