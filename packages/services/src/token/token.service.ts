const getToken = (tokenName: string) => {
    return localStorage.getItem(tokenName);
};

const createToken = (tokenName: string, tokenValue: string) => {
    return localStorage.setItem(tokenName, tokenValue);
};

const deleteToken = (tokenName: string) => {
    return localStorage.removeItem(tokenName);
};

export const TokenService = {
    getToken,
    createToken,
    deleteToken,
};