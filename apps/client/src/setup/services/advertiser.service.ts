import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateAdvertiserCredentials } from "@/setup/types/advertiser.type";
import { findAll, findOne, create, update, remove, selectAdvertisers } from "@/setup/redux/slices/advertiser/advertiser.slice";

export class AdvertiserService {
    dispatch = useDispatch();
    advertisers = useSelector(selectAdvertisers)

    public async findAll() {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advertiser`)
            const responseJSON = await response.json();
            this.dispatch(findAll(responseJSON));
            console.log(responseJSON);
        } catch (err) {
            console.error(err);
        }
    }
    
    public async findOne(id: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advertiser/${id}`)
            const responseJSON = await response.json();
            console.log(responseJSON);
            this.dispatch(findOne(id));
        } catch (err) {
            console.error(err);
        }
    }

    public async create(credentials: CreateAdvertiserCredentials) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advertiser`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(credentials)
            });
            const responseJSON = await response.json();
            console.log(responseJSON);
            this.dispatch(create(responseJSON));
        } catch (err) {
            console.error(err);
        }
    };

    public async update(id: string, credentials: CreateAdvertiserCredentials) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advertiser/${id}`, {
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
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advertiser/${id}`, {
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