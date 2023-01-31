import { Dispatch, SetStateAction } from "react";

export class ApiService {
    public async sayHello(setState: Dispatch<SetStateAction<string>>) {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}`);
        const responseJSON = await response.json();
        console.log(responseJSON.message);
        return setState(responseJSON.message);
    }
}