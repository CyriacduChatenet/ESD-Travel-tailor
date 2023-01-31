import { Dispatch, SetStateAction } from "react";

export class ApiService {
    public async sayHello(setState: Dispatch<SetStateAction<string>>) {
        const response = await fetch(`https://travel-manager-api.vercel.app/api/v1/`);
        const responseJSON = await response.json();
        console.log(responseJSON.message);
        return setState(responseJSON.message);
    }
}