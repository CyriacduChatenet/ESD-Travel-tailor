import { AuthChecker } from "@/components/auth/authChecker";
import { NextPage } from "next";

const TravelerTravelPage: NextPage = () => {
    return (
        <AuthChecker>
            <main>
                <h1>Traveler Travel</h1>
            </main>
        </AuthChecker>
    );
};

export default TravelerTravelPage;