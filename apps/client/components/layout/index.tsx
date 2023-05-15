import React, { PropsWithChildren } from "react";
import { Context } from "@travel-tailor/contexts";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const Layout = ({ children }: PropsWithChildren) => {
    return (
        <Context>
            <Navbar />
            { children }
            <Footer />
        </Context>
    );
};