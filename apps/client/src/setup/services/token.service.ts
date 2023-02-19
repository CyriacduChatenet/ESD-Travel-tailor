export class TokenService {
    public find(name: string) {
        return window.localStorage.getItem(name);
    };

    public create(name: string, value: string) {
        return window.localStorage.setItem(name, value);
    };

    public update(name: string, value: string) {
        return window.localStorage.setItem(name, value);
    };

    public delete(name: string) {
        return window.localStorage.removeItem(name);
    };
}