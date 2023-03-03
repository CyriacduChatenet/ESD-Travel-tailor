import { API_USER_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";

const updateUser = (id: string, body: any) => {
    return useFetch.patch(`${API_USER_ROUTE}/${id}`, body)
};

export const UserService = {
    updateUser,
};