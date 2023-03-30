import { Layout } from "@/layout";
import { AdvertiserService } from "@travel-tailor/services";
import { Advertiser } from "@travel-tailor/types";
import { WebPaymentForm } from "@travel-tailor/ui";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdvertiserPaymentPage: NextPage = () => {
    const [amount, setAmount] = useState(1000);
    const [advertiser, setAdvertiser] = useState<Advertiser>({
        id: "",
        name: "",
        customer: {
            id: "",
            email: "",
            name: "",
            stripeId: "",
        },
    });

    const router = useRouter();

    const { id } = router.query;

    const handleFetch = async () => {
        const ad = await AdvertiserService.findAdvertiserById(`${process.env.NEXT_PUBLIC_API_URL}`, `${id}`)
        setAdvertiser(ad);
    }

    useEffect(() => {
        handleFetch();
    }, [id]) 
    return (
        <Layout>
            <h1>Payment</h1>
            <p>{amount} €</p>
            <br />
            <WebPaymentForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} amount={amount} customerId={advertiser.customer.id} />
        </Layout>
    );
};

export default AdvertiserPaymentPage;