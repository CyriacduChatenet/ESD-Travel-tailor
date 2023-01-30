import {  reactRouter, jwtDecode, Role } from '@travel-manager/functions';
import { useEffect } from 'react';

import { Token } from '../types/token.type';

export const useIsAuthenticatedHook = (token: string | undefined | null, redirectUrl: string, role: Role) => {
    const navigate = reactRouter.useNavigate();

    const handleCheckIfTokenIsValid = () => {
        if(token == 'undefined' || token === null) {
            console.error('401: You must provide valid token');
            return navigate(redirectUrl);
        }
    
        const decodedToken = jwtDecode(String(token)) satisfies Token;
        
        if(decodedToken.exp < decodedToken.iat) {
            console.error('401: You must provide valid token');
            return navigate(redirectUrl);
        }

        if(decodedToken.roles !== role) {
            console.error('403: Forbidden access');
            return navigate(redirectUrl);
        }

        return null;
    }

    useEffect(() => {
        handleCheckIfTokenIsValid();
    }, [])
};