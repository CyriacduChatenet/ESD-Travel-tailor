import { AuthChecker } from "@/components/auth/authChecker";
import { NextPage } from "next";

const TravelerEditTravelPage: NextPage = () => {
    return (
        <AuthChecker>
            <main>
                <h1>Traveler Edit Travel</h1>
            </main>
        </AuthChecker>
    );
};

export default TravelerEditTravelPage;