import { NextPage } from "next";
import { useState } from "react";
import { useUser } from "@travel-tailor/contexts";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import { TasteList } from "@/components/traveler/tastes/tasteList";
import { TasteToolBar } from "@/components/traveler/tastes/toolBar";

const TastesPage: NextPage = () => {
    const [editorMode, setEditorMode] = useState<boolean>(false);

    const { user } = useUser();

    return (
        <AuthChecker>
            <Layout title={"Traveler Tastes"} description={" Traveler Taste"}>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                        <h1 className="font-bold lg:text-2xl">Tastes</h1>
                        {user && <TasteToolBar setEditorMode={setEditorMode} editorMode={editorMode} />}
                        <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                            <div className="col-span-4 md:col-span-8 xl:col-span-12">
                                <TasteList editorMode={editorMode} />
                            </div>
                        </section>
                    </section>
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default TastesPage;