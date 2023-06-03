import { NextPage } from "next";
import { useEffect, useState } from "react";
import { InvoiceService, UserService } from "@travel-tailor/services";
import { AccessToken, Invoice, User } from "@travel-tailor/types";
import { jwtDecode } from "@travel-tailor/functions";
import { parse } from "cookie";


import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import { InvoicesList } from "@/components/advertiser/invoices/invoicesList";
import { InvoicePreview } from "@/components/advertiser/invoices/invoicePreview";

const AdvertiserInvoicesPage: NextPage = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState("");

    const handleFetch = async () => {
        const errors = {};

        const cookies = document.cookie;
        const parsedCookies = cookies ? parse(cookies) : {};
        const accessToken = parsedCookies.accessToken;
        const decodedToken = jwtDecode(accessToken) as AccessToken;

        const user = await UserService.getUserByToken(`${process.env.NEXT_PUBLIC_API_URL}`, decodedToken.email, errors) as User;
        const customerId = user?.customer?.stripeId;
        const invoicesList = await InvoiceService.findAll(`${process.env.NEXT_PUBLIC_API_URL}`, customerId, errors);
        setInvoices(invoicesList);
    };

    useEffect(() => {
        handleFetch();
    }, [])
    return (
        <AuthChecker>
            <Layout title={"Activity Creator Dashboard | Tailor Your Travel Experience"} description={"Discover the ultimate travel planning experience with our activity creator dashboard. Personalize your journey by curating activities based on your preferences and interests. Create the perfect trip that matches your unique tastes and embark on an unforgettable adventure."}>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                        <h1 className="font-bold lg:text-2xl">Invoices Dashboard</h1>
                        <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                            <InvoicesList invoices={invoices} setSelectedInvoiceId={setSelectedInvoiceId} />
                            <InvoicePreview invoice_id={selectedInvoiceId} />
                        </section>
                    </section>
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default AdvertiserInvoicesPage;