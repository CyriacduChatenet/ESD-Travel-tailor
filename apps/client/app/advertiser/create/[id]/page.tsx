'use client'
import React from "react";
import { NextPage } from "next";
import { CreateAdvertiserForm } from "@/components/advertiser/createForm";

const CreateAdvertiserPage: NextPage = () => {
    return (
        <main>
            <h1>Create Advertiser</h1>
            <CreateAdvertiserForm />
        </main>
    );
};

export default CreateAdvertiserPage;