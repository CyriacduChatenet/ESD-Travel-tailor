import { API_USER_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";

import { TokenService } from "../tokens/token.service";

const updateUser = (id: string, body: any) => {
    return useFetch.protectedPatch(`${API_USER_ROUTE}/${id}`, body, String(TokenService.getAccessToken()))
};

export const UserService = {
    updateUser,
};