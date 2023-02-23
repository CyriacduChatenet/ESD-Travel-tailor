import { useDispatch, useSelector } from "@travel-manager/functions";

import { findAll, findOne, create, update, remove, selectTravelers } from "@/setup/redux/slices/traveler/traveler.slice";

export class TravelerService {
    dispatch = useDispatch();
    advertisers = useSelector(selectTravelers)

    public async findAll() {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/traveler`)
            const responseJSON = await response.json();
            this.dispatch(findAll(responseJSON));
        } catch (err) {
            console.error(err);
        }
    }
    
    public async findOne(id: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/traveler/${id}`)
            const responseJSON = await response.json();
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
            this.dispatch(create(responseJSON));
            return responseJSON;
        } catch (err) {
            console.error(err);
        }
    };

    public async update(id: string, credentials: { user: string}) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/traveler/${id}`, {
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
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/traveler/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'DELETE'
            });
            const responseJSON = await response.json();
            this.dispatch(remove(id));

        } catch (err) {
            console.error(err);
        }
    }
}