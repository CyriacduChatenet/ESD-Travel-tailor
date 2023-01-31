export type Token = {
    email: string;
    password: string;
    exp: number;
    iat: number;
    roles: string;
}