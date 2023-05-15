import React from "react";
import { NextPage } from "next";
import { ForgotPasswordForm } from "@/app/components/auth/forgotPasswordForm";

const ForgotPasswordPage: NextPage = () => {
    return (
        <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
            <h1>Forgot Password</h1>
            <ForgotPasswordForm/>
        </main>
    );
};

export default ForgotPasswordPage;