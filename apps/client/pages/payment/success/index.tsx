import { NextPage } from "next";

import { Layout } from "@/components/layout";

const PaymentSuccessPage: NextPage = () => {
    return (
        <Layout>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                <h1>Payment Success</h1>
            </main>
        </Layout>
    );
};

export default PaymentSuccessPage;