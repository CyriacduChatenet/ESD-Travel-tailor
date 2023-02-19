import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { findAll, findOne, create, update, remove, selectAdvertisers } from "@/setup/redux/slices/advertiser/advertiser.slice";
import { UserService } from "@/setup/services/user.service";
import { CreateAdvertiserCredentials } from "@/setup/types/advertiser.type";

export class AdvertiserService {
    dispatch = useDispatch();
    params = useParams();
    advertisers = useSelector(selectAdvertisers)
    userService = new UserService;

    public async findAll() {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advertiser`)
            const responseJSON = await response.json();
            this.dispatch(findAll(responseJSON));
        } catch (err) {
            console.error(err);
        }
    }
    
    public async findOne(id: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advertiser/${id}`)
            const responseJSON = await response.json();
            this.dispatch(findOne(id));
            return responseJSON;
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
            const responseAdvertiserJSON = await response.json();
            this.dispatch(create(responseAdvertiserJSON));

            const advertiserId = responseAdvertiserJSON.id;
            const userId = this.params.id;

            const advertiserQuery = {
                user: userId!,
            }

            this.userService.update(String(userId), advertiserId);
            this.update(advertiserId, advertiserQuery);
        } catch (err) {
            console.error(err);
        }
    };

    public async update(id: string, credentials: {user: string}) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advertiser/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'PATCH',
                body: JSON.stringify(credentials)
            });
            const responseJSON = await response.json();
            this.dispatch(update({id, responseJSON}));
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
            return responseJSON;
        } catch (err) {
            console.error(err);
        }
    }
}