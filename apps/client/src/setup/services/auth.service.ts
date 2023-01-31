import { Dispatch, SetStateAction } from "react";

import { TokenService } from "@/setup/services/token.service";
import { errorResponse } from "@/setup/types/errorApiResponse";

export class AuthService {
    tokenService = new TokenService;

    public async signup(credentials: Object, setErrorState: Dispatch<SetStateAction<errorResponse>>) {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/signup`, {
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
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/signin`, {
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