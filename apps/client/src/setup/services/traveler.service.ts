import { useDispatch, useSelector } from "react-redux";

import { CreateAdvertiserCredentials } from "@/setup/types/advertiser.type";
import { findAll, findOne, create, update, remove, selectTravelers } from "@/setup/redux/slices/traveler/traveler.slice";

export class TravelerService {
    dispatch = useDispatch();
    advertisers = useSelector(selectTravelers)

    public async findAll() {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/traveler`)
            const responseJSON = await response.json();
            this.dispatch(findAll(responseJSON));
            console.log(responseJSON);
        } catch (err) {
            console.error(err);
        }
    }
    
    public async findOne(id: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/traveler/${id}`)
            const responseJSON = await response.json();
            console.log(responseJSON);
            this.dispatch(findOne(id));
        } catch (err) {
            console.error(err);
        }
    }

    public async create() {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/traveler`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
            const responseJSON = await response.json();
            console.log(responseJSON);
            this.dispatch(create(responseJSON));
            return responseJSON;
        } catch (err) {
            console.error(err);
        }
    };

    public async update(id: string, credentials: any) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/traveler/${id}`, {
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
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/traveler/${id}`, {
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