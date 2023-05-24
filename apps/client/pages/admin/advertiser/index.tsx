import { NextPage } from "next";

import { Layout } from "@/components/layout";
import { AuthChecker } from "@/components/auth/authChecker";

const AdminDashboardAdvertiserPage: NextPage = () => {
    return (
        <AuthChecker>
        <Layout title={"About Us - Your Ultimate Travel Tailor for Tailored Adventures"} description={"Discover our innovative travel management platform that empowers you to curate personalized trips filled with activities based on your unique preferences. Explore the world like never before with our customizable journey planner."}>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                    <h1 className="font-bold lg:text-2xl">Advertiser</h1>
                </section>
            </main>
        </Layout>
        </AuthChecker>
    );
};

export default AdminDashboardAdvertiserPage;