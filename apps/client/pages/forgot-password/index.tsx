import React from "react";
import { NextPage } from "next";

import { ForgotPasswordForm } from "@/components/auth/forgotPasswordForm";
import { Layout } from "@/components/layout";

const ForgotPasswordPage: NextPage = () => {
    return (
        <Layout title={"Forgot Password? Reset Your Account Access - Travel Manager"} description={"Forgot your password? No worries! Reset your account access for Travel Manager, the ultimate travel planner that lets you create personalized trips based on your preferences. Regain access to your account and continue building unforgettable journeys."}>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                <h1>Forgot Password</h1>
                <ForgotPasswordForm />
            </main>
        </Layout>
    );
};

export default ForgotPasswordPage;