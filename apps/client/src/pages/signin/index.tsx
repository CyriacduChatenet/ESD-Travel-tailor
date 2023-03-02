import { NextPage } from "next";

import { Layout } from "@/layout";
import { WebSigninForm } from "@travel-tailor/ui";

const SigninPage: NextPage = () => {
    return (
        <Layout>
            <h1>Signin</h1>
            <br />
            <WebSigninForm />
        </Layout>
    );
};

export default SigninPage;