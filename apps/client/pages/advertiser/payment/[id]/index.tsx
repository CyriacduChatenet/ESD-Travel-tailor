/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { loadStripe } from '@stripe/stripe-js'
import { usePayment } from '@travel-tailor/hooks'
import { parse } from "cookie";
import { jwtDecode } from "@/../../packages/functions/src";
import { AccessToken, User } from "@/../../packages/types/src";

import { Layout } from "@/components/layout";
import { UserService } from "@/../../packages/services/src";

interface IProps {
    stripeCustomerId: string;
}

const AdvertiserPaymentPage: NextPage<IProps> = ({ stripeCustomerId }) => {
    const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`)

    const [apiErrors, setApiErrors] = useState<{ status?: number }>({});

    const handlePayed = async () => {
        usePayment(`${process.env.NEXT_PUBLIC_API_URL}`, stripeCustomerId, stripePromise, { location: `Bordeaux, Gironde, France`, amount: 10000 }, setApiErrors)
    };

    return (
        <Layout title={""} description={""}>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                <h1>Advertiser Payment</h1>
                <div className="max-w-md mx-auto mt-4 col-span-4 md:col-span-8 xl:col-span-12">
                    <p>amount : 1000€</p>
                    <button onClick={handlePayed} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Payer</button>
                </div>
            </main>
        </Layout>
    );
};

export default AdvertiserPaymentPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const cookies = req.headers.cookie;
    const parsedCookies = cookies ? parse(cookies) : {};
    const accessToken = parsedCookies.signinToken;
    const decodedToken = jwtDecode(accessToken) as AccessToken;

    let user = {} as User;
    let stripeCustomerId = "";
    let error = {}

    if (accessToken) {
        user = await UserService.getUserByToken(`${process.env.API_URL}`, decodedToken.email, error);
        stripeCustomerId = user.customer.stripeId;
    }

    return {
        props: {
            stripeCustomerId,
        },
    };
};