import { NextPage } from "next";

import { Layout } from "@/layout";
import { WebForgotPasswordForm } from "@travel-tailor/ui";
import Link from "next/link";

const ForgotPasswordPage: NextPage = () => {
    return (
        <Layout>
            <h1>Forgot password</h1>
            <br />
            <WebForgotPasswordForm />
            <Link href={'/signin'}>Signin</Link>
        </Layout>
    );
};

export default ForgotPasswordPage;