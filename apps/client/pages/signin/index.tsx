import React from "react";
import { NextPage } from "next";

import { SigninForm } from "@/components/auth/signinForm";
import { Layout } from "@/components/layout";

const SigninPage: NextPage = () => {
    return (
        <Layout>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                <h1 className="col-span-4 md:col-span-8 xl:col-span-12 text-center">Signin</h1>
                <SigninForm />
            </main>
        </Layout>
    );
};

export default SigninPage;