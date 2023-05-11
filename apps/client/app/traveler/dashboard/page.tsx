import { AuthChecker } from "@/components/auth/authChecker";
import { NextPage } from "next";

const TravelerDashboardPage: NextPage = () => {
    return (
        <AuthChecker>
            <main>
                <h1>Traveler Dashboard</h1>
            </main>
        </AuthChecker>
    );
};

export default TravelerDashboardPage;