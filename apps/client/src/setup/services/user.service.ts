import { useDispatch, useSelector } from "react-redux";

import { CreateAdvertiserCredentials } from "@/setup/types/advertiser.type";
import { findAll, findOne, create, update, remove, selectUsers } from "@/setup/redux/slices/user/user.slice";

export class UserService {
    dispatch = useDispatch();
    userss = useSelector(selectUsers)

    public async findAll() {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user`)
            const responseJSON = await response.json();
            this.dispatch(findAll(responseJSON));
            console.log(responseJSON);
        } catch (err) {
            console.error(err);
        }
    }
    
    public async findOne(email: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/${email}`)
            const responseJSON = await response.json();
            console.log(responseJSON);
            this.dispatch(findOne(email));
            return responseJSON;
        } catch (err) {
            console.error(err);
        }
    }

    public async create(credentials: any) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(credentials)
            });
            const responseJSON = await response.json();
            this.dispatch(create(responseJSON));
        } catch (err) {
            console.error(err);
        }
    };

    public async update(id: string, credentials: any) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify(credentials)
            });
            const responseJSON = await response.json();
            this.dispatch(update({id, responseJSON}));
            console.log(responseJSON);
        } catch (err) {
            console.error(err);
        }
    }

    public async delete(id: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'DELETE'
            });
            const responseJSON = await response.json();
            this.dispatch(remove(id));
            console.log(responseJSON);
        } catch (err) {
            console.error(err);
        }
    }
}