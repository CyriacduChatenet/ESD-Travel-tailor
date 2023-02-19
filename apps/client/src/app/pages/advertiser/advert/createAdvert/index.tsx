import { FC } from "react";

import { CreateAdvertForm } from "@/app/components/advert/createAdvertForm";

export const CreateAdvertPage: FC = () => {
    return (
        <div>
            <h1>Create advert</h1>
            <CreateAdvertForm/>
        </div>
    );
};