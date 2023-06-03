import React, { FC, ReactNode } from "react";
import { Context } from "@travel-tailor/contexts";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeadSeo } from "@/components/head-seo";

interface IProps {
    children?: ReactNode;
    title: string;
    description: string;
}

export const Layout: FC<IProps> = ({ children, title, description }) => {
    return (
        <>
            <Context>
                <PageHeadSeo title={title} description={description} />
                <Navbar />
                <div>
                    {children}
                </div>
                <Footer />
            </Context>
        </>
    );
};