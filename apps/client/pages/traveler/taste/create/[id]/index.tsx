import { NextPage } from "next";

import { CreateTasteForm } from "@/components/traveler/tastes/createTasteForm";
import { Layout } from "@/components/layout";

const CreateTastePage: NextPage = () => {
    return (
        <Layout>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                <h1>Create Taste Page</h1>
                <CreateTasteForm />
            </main>
        </Layout>
    );
}

export default CreateTastePage;