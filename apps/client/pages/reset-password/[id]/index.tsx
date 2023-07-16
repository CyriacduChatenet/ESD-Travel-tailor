import React from "react";
import { NextPage } from "next";

import { ResetPasswordForm } from "@/components/auth/resetPasswordForm";
import { Layout } from "@/components/layout";

const ResetPasswordPage: NextPage = () => {
    return (
        <Layout title={"Personalized Travel Planner: Create Your Dream Trip"} description={"Forgot your password? Reset it now and regain access to your personalized travel planner. Create your perfect trip with customized activities tailored to your preferences. Start exploring the world your way!"}>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 xl:grid-rows-12 pt-20">
                <div className="xl:row-span-6"></div>
                <h1 className="font-bold lg:text-2xl col-span-4 lg:col-span-8 xl:col-span-12 row-span-1 text-center">Reset Password</h1>
                <ResetPasswordForm />
            </main>
        </Layout>
    );
};

export default ResetPasswordPage;