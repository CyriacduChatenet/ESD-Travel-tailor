import { NextPage } from "next";
import { useProtectedRoute } from "@travel-tailor/hooks";

import { Layout } from "@/layout";

const SignupPage: NextPage = () => {
    useProtectedRoute();
    return (
        <Layout>
            <h1>Signup</h1>
        </Layout>
    );
};

export default SignupPage;