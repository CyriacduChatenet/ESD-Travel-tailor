import { AuthChecker } from "@/components/auth/authChecker";
import { NextPage } from "next";

const AdvertiserEditActivityPage: NextPage = () => {
    return (
        <AuthChecker>
            <main>
                <h1>Advertiser Edit Activity</h1>
            </main>
        </AuthChecker>
    );
};

export default AdvertiserEditActivityPage;