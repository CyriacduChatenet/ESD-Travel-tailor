import { NextPage } from "next";

import { Layout } from "@/layout";
import Link from "next/link";
import { WebForgotPasswordForm } from "@travel-tailor/ui";

const ForgotPasswordPage: NextPage = () => {
    return (
        <Layout>
            <h1>Forgot password</h1>
            <br />
            <WebForgotPasswordForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
            <Link href={'/signin'}>Signin</Link>
        </Layout>
    );
};

export default ForgotPasswordPage;