import React from "react";
import { NextPage } from "next";

import { ResetPasswordForm } from "@/components/auth/resetPasswordForm";
import { Layout } from "@/components/layout";

const ResetPasswordPage: NextPage = () => {
    return (
        <Layout>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                <h1>Reset Password</h1>
                <ResetPasswordForm />
            </main>
        </Layout>
    );
};

export default ResetPasswordPage;