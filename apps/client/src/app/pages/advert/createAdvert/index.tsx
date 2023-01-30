import { FC } from "react";
import { useIsAuthenticated } from "@travel-manager/hooks";
import { Role } from "@travel-manager/functions";

import { CreateAdvertForm } from "@/app/components/advert/createAdvertForm";
import { TokenService } from "@/setup/services/token.service";

export const CreateAdvertPage: FC = () => {
    const tokenService = new TokenService();
    
    useIsAuthenticated(tokenService.find(), "/signin", Role.Advertiser);
    return (
        <div>
            <h1>Create advert</h1>
            <CreateAdvertForm/>
        </div>
    );
};