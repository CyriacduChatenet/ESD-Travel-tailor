import React from "react";
import { NextPage } from "next";

import { CreateAdvertiserForm } from "@/components/advertiser/createForm";
import { Layout } from "@/components/layout";

const CreateAdvertiserPage: NextPage = () => {
    return (
        <Layout>
            <main>
                <h1>Create Advertiser</h1>
                <CreateAdvertiserForm />
            </main>
        </Layout>
    );
};

export default CreateAdvertiserPage;