import { NextPage } from "next";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";

const TastesPage: NextPage = () => {
    return (
        <AuthChecker>
            <Layout>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                        <h1 className="font-bold lg:text-2xl">Tastes</h1>
                    </section>
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default TastesPage;