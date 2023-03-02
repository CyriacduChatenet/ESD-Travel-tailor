import { NextPage } from "next";
import { useProtectedRoute } from "@travel-tailor/hooks";
import { WebSignupForm } from "@travel-tailor/ui";

import { Layout } from "@/layout";

const SignupPage: NextPage = () => {
    useProtectedRoute();
    return (
        <Layout>
            <h1>Signup</h1>
            <br />
            <WebSignupForm/>
        </Layout>
    );
};

export default SignupPage;