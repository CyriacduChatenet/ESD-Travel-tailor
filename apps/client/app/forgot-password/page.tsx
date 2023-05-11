import React from "react";
import { NextPage } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgotPasswordForm";

const ForgotPasswordPage: NextPage = () => {
    return (
        <main>
            <h1>Forgot Password</h1>
            <ForgotPasswordForm/>
        </main>
    );
};

export default ForgotPasswordPage;