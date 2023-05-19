import Head from "next/head";
import { FC } from "react";

interface IProps {
    title: string;
    description: string;
}

export const PageHeadSeo: FC<IProps> = ({ title, description }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content="" />
            <meta name="author" content="Cyriac du Chatenet" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <meta name="google" content="notranslate" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="theme-color" content="#000000" />
            <meta name="msapplication-navbutton-color" content="#000000" />
            <meta name="apple-mobile-web-app-status-bar-style" content="#000000" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
        </Head>
    );
};