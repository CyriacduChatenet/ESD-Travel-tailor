export class TokenService {
    public find() {
        return window.localStorage.getItem('access_token');
    };

    public create(value: string) {
        return window.localStorage.setItem('access_token', value);
    };

    public update(value: string) {
        return window.localStorage.setItem('access_token', value);
    };

    public delete() {
        return window.localStorage.removeItem('access_token');
    };
}