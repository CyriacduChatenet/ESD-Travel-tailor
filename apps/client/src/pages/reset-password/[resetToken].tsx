import { NextPage } from "next";

import { Layout } from "@/layout";
import { WebResetPasswordForm } from "@travel-tailor/ui";

const ResetPasswordPage: NextPage = () => {
    return (
        <Layout>
            <h1>Reset password</h1>
            <br />
            <WebResetPasswordForm />
        </Layout>
    );
};

export default ResetPasswordPage;