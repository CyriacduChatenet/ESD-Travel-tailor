import React from "react";
import { NextPage } from "next";

import { SigninForm } from "@/components/auth/signinForm";
import { Layout } from "@/components/layout";

const SigninPage: NextPage = () => {
    return (
        <Layout title={"Log in to Your Personalized Travel Manager | Create Your Perfect Itinerary"} description={"Welcome to our travel management platform! Log in to unlock a world of personalized travel experiences tailored to your preferences. Create your dream itinerary with activities that match your unique tastes and embark on unforgettable journeys."}>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                <h1 className="font-bold lg:text-2xl col-span-4 lg:col-span-8 xl:col-span-12 text-center">Signin</h1>
                <SigninForm />
            </main>
        </Layout>
    );
};

export default SigninPage;