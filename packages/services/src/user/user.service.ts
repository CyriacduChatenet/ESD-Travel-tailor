import { useFetch } from "@travel-tailor/hooks";

import { TokenService } from "../tokens/token.service";

const updateUser = (api_url: string, body: any) => {
    return useFetch.protectedPatch(`${api_url}`, body, String(TokenService.getAccessToken()))
};

export const UserService = {
    updateUser,
};