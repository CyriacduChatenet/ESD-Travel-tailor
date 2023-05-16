import React from "react";
import { NextPage } from "next";

import { SignupForm } from "@/components/auth/signupForm";
import { Layout } from "@/components/layout";

const SignupPage: NextPage = () => {
    return (
        <Layout>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                <h1 className="col-span-4 md:col-span-8 xl:col-span-12 text-center">Signup</h1>
                <SignupForm />
            </main>
        </Layout>
    );
};

export default SignupPage;