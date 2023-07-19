import React from "react";
import { NextPage } from "next";
import { ROUTES } from "@travel-tailor/constants";
import Link from "next/link";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import { EditTagForm } from "@/components/admin/tags/edit";

const AdminEditTagPage: NextPage = () => {
    return (
        <AuthChecker>
            <Layout title={""} description={""}>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <div className="col-span-4 md:col-span-8 xl:col-span-12 flex items-center justify-around">
                        <Link href={ROUTES.ADMIN.TAGS}>
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Return
                            </button>
                        </Link>
                        <h1>Edit Tag</h1>
                    </div>
                    <EditTagForm />
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default AdminEditTagPage;