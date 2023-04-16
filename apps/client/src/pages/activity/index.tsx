import { NextPage } from "next";
import { ActivityService } from "@travel-tailor/services";
import { Activity } from "@travel-tailor/types";
import Link from "next/link";
import { ROUTES } from "@travel-tailor/constants";

import { Layout } from "@/layout";
import { useState } from "react";


interface IProps {
    activities: Activity[];
}

const ActivityListPage: NextPage<IProps> = ({ activities }) => {
    return (
        <Layout>
            <div>
                <h1>Activities</h1>
                <section>
                    {activities.map((activity: Activity, index) => <Link href={`${ROUTES.ADVERTISER.ACTIVITY.LIST}/${activity.slug}`} key={index}>
                        <div>
                            <p>{activity.name}</p>
                        </div>
                    </Link>)}
                </section>
            </div>
        </Layout>
    );
};

export default ActivityListPage;

export const getServerSideProps = async () => {
    const error = {}

    const activities = await ActivityService.findAllActivities(`${process.env.NEXT_PUBLIC_API_URL}`, error);
    return {
        props: {
            activities,
        },
    };
};