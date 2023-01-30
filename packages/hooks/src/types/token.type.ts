export type Token = {
    username: string;
    email: string;
    password: string;
    roles: string;
    exp: number;
    iat: number;
}