import { NextPage } from "next";

import { Layout } from "@/components/layout";

const PaymentErrorPage: NextPage = () => {
    return (
        <Layout title={""} description={""}>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                <h1>Payment Error</h1>
            </main>
        </Layout>
    );
};

export default PaymentErrorPage;