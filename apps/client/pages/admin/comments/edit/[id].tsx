import React from "react";
import { NextPage } from "next";
import { ROUTES } from "@travel-tailor/constants";
import Link from "next/link";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import { EditCommentForm } from "@/components/admin/comments/editForm";

const AdvertiserEditCommentPage: NextPage = () => {
    return (
        <AuthChecker>
            <Layout title={""} description={""}>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <div className="col-span-4 md:col-span-8 xl:col-span-12 flex items-center justify-around">
                        <Link href={ROUTES.ADMIN.COMMENTS.INDEX}>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Return
                            </button>
                        </Link>
                        <h1>Edit Comment</h1>
                    </div>
                    <EditCommentForm />
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default AdvertiserEditCommentPage;