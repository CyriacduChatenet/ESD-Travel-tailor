import { StripeProvider } from "@travel-tailor/contexts";
import { NextPage } from "next";

const AdvertiserPaymentPage: NextPage = () => {
    return (
        <StripeProvider api_url={`${process.env.NEXT_PUBLIC_API_URL}`} stripe_api_key={`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`}/>
    );
};

export default AdvertiserPaymentPage;