import React from "react";
import { NextPage } from "next";

import { Layout } from "@/components/layout";
import { EditAdvertiserForm } from "@/components/advertiser/editForm";

const EditAdvertiserPage: NextPage = () => {
    return (
        <Layout title={""} description={""}>
            <main className="pt-20">
                <h1>Edit Advertiser</h1>
                <EditAdvertiserForm />
            </main>
        </Layout>
    );
};

export default EditAdvertiserPage;