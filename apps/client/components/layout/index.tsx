import React from "react";
import { Context } from "@travel-tailor/contexts";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const Layout = ({ children }: any) => {
    return (
        <Context>
            <Navbar />
            <div>
                {children}
            </div>
            <Footer />
        </Context>
    );
};