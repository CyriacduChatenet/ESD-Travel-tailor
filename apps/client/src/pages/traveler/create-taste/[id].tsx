import { WebCreateTasteForm } from "@travel-tailor/ui";
import { NextPage } from "next";

const CreateTastePage: NextPage = () => {
    return (
        <div>
            <h1> Create Taste</h1>
            <WebCreateTasteForm/>
        </div>
    );
};

export default CreateTastePage;