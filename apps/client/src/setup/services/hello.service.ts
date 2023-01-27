export class ApiService {
    public async sayHello() {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}`);
        console.log(response);
    }
}