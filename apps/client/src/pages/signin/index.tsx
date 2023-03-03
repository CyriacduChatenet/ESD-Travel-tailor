import { NextPage } from "next";

import { Layout } from "@/layout";
import Link from "next/link";
import { WebSigninForm } from "@travel-tailor/ui";

const SigninPage: NextPage = () => {
    return (
        <Layout>
            <h1>Signin</h1>
            <br />
            <WebSigninForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
            <Link href={'/signup'}>Signup</Link>
            <br />
            <Link href={'/forgot-password'}>Forgot password</Link>
        </Layout>
    );
};

export default SigninPage;