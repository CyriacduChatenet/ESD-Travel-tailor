import React, { useEffect, useMemo, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { AccessToken, Activity, User } from "@travel-tailor/types";
import { ActivityService, UserService } from "@travel-tailor/services";
import { jwtDecode } from "@travel-tailor/functions";
import { useHistory } from "@travel-tailor/contexts";
import { parse } from "cookie";
import { useRouter } from "next/router";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import { ActivityListPaginator } from "@/components/advertiser/activity/activityListPaginator";
import { AdvertiserToolBar } from "@/components/advertiser/toolBar";
import { Paginator } from "@/components/paginator";

interface IProps {
    res: {
        total: number;
        limit: number;
        page: number;
        data: Activity[];
    },
    user: User;
}

const AdvertiserDashboardPage: NextPage<IProps> = ({ res, user }) => {
    const [editorMode, setEditorMode] = useState(false);
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState(res);
    const [apiError, setApiError] = useState({});
    const { setPathname } = useHistory();
    const router = useRouter();

    const handleFetch = async () => {
        if (user) {
            const response = await ActivityService.findActivitiesByAdvertiserId(`${process.env.NEXT_PUBLIC_API_URL}`, String(user?.advertiser?.id), setApiError, page);
            if (response) {
                setResponse(response);
                return response;
            }
        }
    };

    useMemo(() => {
        if (user) {
            handleFetch();
        }
    }, [page, user]);

    useEffect(() => {
        setPathname(router.pathname);
    }, []);

    return (
        <AuthChecker>
            <Layout title={"Activity Creator Dashboard | Tailor Your Travel Experience"} description={"Discover the ultimate travel planning experience with our activity creator dashboard. Personalize your journey by curating activities based on your preferences and interests. Create the perfect trip that matches your unique tastes and embark on an unforgettable adventure."}>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                        <h1 className="font-bold lg:text-2xl">Advertiser Dashboard</h1>
                        <AdvertiserToolBar setEditorMode={setEditorMode} editorMode={editorMode} />
                        <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                            <div className="col-span-4 md:col-span-4 xl:col-span-8">
                                <ActivityListPaginator editorMode={editorMode} user={user} data={response} setData={setResponse} />
                                <Paginator pageCurrent={page} setPage={setPage} limit={response.limit} total={response.total} />
                            </div>
                            <div className="col-span-4 md:col-span-4 xl:col-span-4 hidden md:block">
                                <Image src="https://images.unsplash.com/photo-1493564738392-d148cfbd6eda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" alt="city" width={500} height={500} priority />
                            </div>
                        </section>
                    </section>
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default AdvertiserDashboardPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const error = {};

    let response = {}
    let user: Partial<User> = {}

    const cookies = req.headers.cookie;
    const parsedCookies = cookies ? parse(cookies) : {};
    const accessToken = parsedCookies.accessToken;
    const decodedToken = jwtDecode(accessToken) as AccessToken;

    if (accessToken) {
        const decodedToken = jwtDecode(accessToken) as AccessToken;

        user = await UserService.getUserByToken(`${process.env.API_URL}`, decodedToken.email, error);

        response = await ActivityService.findActivitiesByAdvertiserId(`${process.env.API_URL}`, String(user?.advertiser?.id), error, 1, 10);
    }
    return {
        props: {
            res: response !== undefined ? response : {},
            user,
        }
    };
};