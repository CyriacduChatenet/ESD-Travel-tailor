import { Layout } from "@/layout";
import { WebPaymentForm } from "@travel-tailor/ui";
import { NextPage } from "next";

const AdvertiserPaymentPage: NextPage = () => {
    return (
        <Layout>
            <h1>Payment</h1>
            <br />
            <WebPaymentForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
        </Layout>
    );
};

export default AdvertiserPaymentPage;