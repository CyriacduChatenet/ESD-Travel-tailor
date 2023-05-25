import { GetServerSideProps, NextPage } from "next";
import { useMemo, useState } from "react";
import { AccessToken, Activity, User } from "@/../../packages/types/src";
import { ActivityService, UserService } from "@/../../packages/services/src";
import { jwtDecode } from "@/../../packages/functions/src";
import { parse } from "cookie";

import { Layout } from "@/components/layout";
import { AuthChecker } from "@/components/auth/authChecker";
import { ActivityTable } from "@/components/admin/activity-table";
import { Paginator } from "@/components/paginator";

interface IProps {
    data: {
        page: number;
        limit: number;
        total: number;
        data: Activity[];
    },
    user: User;
}

const AdminDashboardActivitiesPage: NextPage<IProps> = ({ data, user }) => {
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState<{
        page: number;
        limit: number;
        total: number;
        data: Activity[];
    }>(data);
    const error = {};

    const handleFetch = async () => {
        const res = await ActivityService.findAllActivities(`${process.env.NEXT_PUBLIC_API_URL}`, error, `?page=${page}&limit=10&sortedBy=DESC`);
        if (res) {
            setResponse(await res);
        }
    }

    useMemo(() => {
        if (page > 1) {
            handleFetch();
        }
    }, [page, user]);

    return (
        <AuthChecker>
            <Layout title={"About Us - Your Ultimate Travel Tailor for Tailored Adventures"} description={"Discover our innovative travel management platform that empowers you to curate personalized trips filled with activities based on your unique preferences. Explore the world like never before with our customizable journey planner."}>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                        <h1 className="font-bold lg:text-2xl">Activities</h1>
                        <section className="my-8">
                            <ActivityTable data={response.data} />
                        </section>
                        <Paginator pageCurrent={page} setPage={setPage} limit={10} total={response.total} />
                    </section>
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default AdminDashboardActivitiesPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    let error = {};
    let response = {};
    let user: Partial<User> = {}

    const cookies = req.headers.cookie;
    const parsedCookies = cookies ? parse(cookies) : {};
    const accessToken = parsedCookies.accessToken;
    const decodedToken = jwtDecode(accessToken) as AccessToken;

    if (accessToken) {
        user = await UserService.getUserByToken(`${process.env.API_URL}`, decodedToken.email, error);
        response = await ActivityService.findAllActivities(`${process.env.API_URL}`, error, `?page=1&limit=10&sortedBy=DESC`);
    }
    return {
        props: {
            data: response,
            user
        }
    };
};