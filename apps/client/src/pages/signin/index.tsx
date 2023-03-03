import { NextPage } from "next";

import { Layout } from "@/layout";
import { WebSigninForm } from "@travel-tailor/ui";
import Link from "next/link";

const SigninPage: NextPage = () => {
    return (
        <Layout>
            <h1>Signin</h1>
            <br />
            <WebSigninForm />
            <Link href={'/signup'}>Signup</Link>
            <br />
            <Link href={'/forgot-password'}>Forgot password</Link>
        </Layout>
    );
};

export default SigninPage;