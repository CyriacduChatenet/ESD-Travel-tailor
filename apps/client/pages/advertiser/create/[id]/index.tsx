import React from "react";
import { NextPage } from "next";

import { Layout } from "@/components/layout";
import { CreateAdvertiserForm } from "@/components/advertiser/createForm";

const CreateAdvertiserPage: NextPage = () => {
    return (
        <Layout title={""} description={""}>
            <main className="pt-20">
                <h1>Create Advertiser</h1>
                <CreateAdvertiserForm />
            </main>
        </Layout>
    );
};

export default CreateAdvertiserPage;