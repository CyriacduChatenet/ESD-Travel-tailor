import { loadStripe } from "@stripe/stripe-js";
import { usePayment } from "@travel-tailor/hooks";
import { NextPage } from "next";
import { useState } from "react";

import { Layout } from "@/layout";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`)


const TravelPaymentPage: NextPage = () => {
    const [amount, setAmount] = useState(400);
    const [submitError, setSubmitError] = useState({});

    const handlePayed = async () => {
        usePayment(`${process.env.NEXT_PUBLIC_API_URL}`,stripePromise, { amount, location: `Bordeaux, Gironde, France`}, setSubmitError)
     };

    return (
        <Layout>
            <div>
                <h1>Travel Payment Page</h1>
                <p>{amount} €</p>
                <button onClick={handlePayed} id="travel-recap-pay-btn">Payer</button>
            </div>
        </Layout>
    );
};

export default TravelPaymentPage;