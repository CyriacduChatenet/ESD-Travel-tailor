import { AuthChecker } from "@/components/auth/authChecker";
import { NextPage } from "next";

const AdvertiserDashboardPage: NextPage = () => {
    return (
        <AuthChecker>
            <main>
                <h1>Advertiser Dashboard</h1>
            </main>
        </AuthChecker>
    );
};

export default AdvertiserDashboardPage;