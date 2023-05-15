import React from "react";
import { NextPage } from "next";

import { ResetPasswordForm } from "@/app/components/auth/resetPasswordForm";

const ResetPasswordPage: NextPage = () => {
    return (
        <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
            <h1>Reset Password</h1>
            <ResetPasswordForm />
        </main>
    );
};

export default ResetPasswordPage;