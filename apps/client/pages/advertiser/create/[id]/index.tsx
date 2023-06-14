import React from "react";
import { GetServerSideProps, NextPage } from "next";

import { Layout } from "@/components/layout";
import { CreateAdvertiserForm } from "@/components/advertiser/createForm";
import { parse } from "cookie";

interface IProps {
    token : string
}

const CreateAdvertiserPage: NextPage<IProps> = ({ token }) => {
    return (
        <Layout title={""} description={""}>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                <h1 className="font-bold lg:text-2xl col-span-4 lg:col-span-8 xl:col-span-12 text-center">Create Advertiser</h1>
                <CreateAdvertiserForm token={token} />
            </main>
        </Layout>
    );
};

export default CreateAdvertiserPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const error = {};

    const cookies = req.headers.cookie;
    const parsedCookies = cookies ? parse(cookies) : {};
    const signinToken = parsedCookies.signinToken;
    return {
        props: {
            token: signinToken
        }
    };
};