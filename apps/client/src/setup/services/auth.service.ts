import { Dispatch, SetStateAction } from "react";

import { TokenService } from "@/setup/services/token.service";
import { errorResponse } from "@/setup/types/errorApiResponse";

export class AuthService {
    tokenService = new TokenService;

    public async signup(credentials: Object, setErrorState: Dispatch<SetStateAction<errorResponse>>) {
        const response = await fetch(`https://travel-manager-api.vercel.app/api/v1/auth/signup`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        const responseJSON = await response.json();
        
        if(responseJSON.status >= 400) {
            setErrorState(responseJSON);
        }
    };

    public async signin(credentials: Object, setErrorState: Dispatch<SetStateAction<errorResponse>>) {
        const response = await fetch(`https://travel-manager-api.vercel.app/api/v1/auth/signin`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        const responseJSON = await response.json();
        
        if(!responseJSON.access_token) {
            setErrorState(responseJSON);
        }

        if(responseJSON.statusCode !== 401) {
            this.tokenService.create(responseJSON.access_token);
        }
    };
};