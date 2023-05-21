import { NextPage } from "next";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";

const TastesPage: NextPage = () => {
    return (
        <AuthChecker>
            <Layout>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <h1>Taste Dashboard</h1>
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default TastesPage;