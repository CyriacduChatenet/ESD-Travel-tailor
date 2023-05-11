import { AuthChecker } from "@/components/auth/authChecker";
import { NextPage } from "next";

const AdvertiserCreateActivityPage: NextPage = () => {
    return (
        <AuthChecker>
            <main>
                <h1>Advertiser Create Activity</h1>
            </main>
        </AuthChecker>
    );
};

export default AdvertiserCreateActivityPage;