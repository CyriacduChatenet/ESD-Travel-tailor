import React, { PropsWithChildren, useEffect } from "react";
import { checkJwtValidity } from "@travel-tailor/utils";

export const AuthChecker = ({ children }: PropsWithChildren) => {

    useEffect(() => {
        checkJwtValidity();
    }, []);

    return (
        <>
        {children}
        </>
    );
};