import { NextPage } from "next";

import { Layout } from "@/components/layout";

const AboutPage: NextPage = () => {
    return (
        <Layout title={"About Us - Your Ultimate Travel Tailor for Tailored Adventures"} description={"Discover our innovative travel management platform that empowers you to curate personalized trips filled with activities based on your unique preferences. Explore the world like never before with our customizable journey planner."}>
        <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
            <h1>About Travel Tailor</h1>
        </main>
    </Layout>
    );
};

export default AboutPage;