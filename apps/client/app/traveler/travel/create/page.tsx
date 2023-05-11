import { AuthChecker } from "@/components/auth/authChecker";
import { NextPage } from "next";

const TravelerCreateTravelPage: NextPage = () => {
    return (
        <AuthChecker>
            <main>
                <h1>Traveler Create Travel</h1>
            </main>
        </AuthChecker>
    );
};

export default TravelerCreateTravelPage;