import { GetServerSideProps, NextPage } from "next";
import { InvoiceService, UserService } from "@/../../packages/services/src";
import { AccessToken, Invoice, User } from "@/../../packages/types/src";
import { jwtDecode } from "@/../../packages/functions/src";
import { parse } from "cookie";


import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import { InvoicesList } from "@/components/advertiser/invoices/invoicesList";
import { InvoicePreview } from "@/components/advertiser/invoices/invoicePreview";
interface IProps {
    invoices: Invoice[];
}

const AdvertiserInvoicesPage: NextPage<IProps> = ({ invoices }) => {
    return (
        <AuthChecker>
            <Layout title={"Activity Creator Dashboard | Tailor Your Travel Experience"} description={"Discover the ultimate travel planning experience with our activity creator dashboard. Personalize your journey by curating activities based on your preferences and interests. Create the perfect trip that matches your unique tastes and embark on an unforgettable adventure."}>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                        <h1 className="font-bold lg:text-2xl">Invoices Dashboard</h1>
                        <section>
                            <InvoicesList invoices={invoices} />
                            <InvoicePreview />
                        </section>
                    </section>
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default AdvertiserInvoicesPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const errors = {};

    const cookies = req.headers.cookie;
    const parsedCookies = cookies ? parse(cookies) : {};
    const accessToken = parsedCookies.accessToken;
    const decodedToken = jwtDecode(accessToken) as AccessToken;

    const user = await UserService.getUserByToken(`${process.env.API_URL}`, decodedToken.email, errors) as User;
    console.log(user);

    const customerId = user?.customer?.stripeId;
    console.log(customerId);

    const invoices = await InvoiceService.findAll(`${process.env.API_URL}`, customerId, errors);
    console.log(invoices);
    return {
        props: {}
    }
}