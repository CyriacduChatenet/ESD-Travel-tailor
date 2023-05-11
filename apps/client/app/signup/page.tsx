import React from "react";
import { NextPage } from "next";

import { SignupForm } from "../../components/auth/signupForm";

const SignupPage: NextPage = () => {
    return (
        <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
        <h1 className="col-span-4 md:col-span-8 xl:col-span-12 text-center">Signup</h1>
        <SignupForm />
    </main>
    );
};

export default SignupPage;