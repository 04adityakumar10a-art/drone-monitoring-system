const TOKEN_KEY = "aerion_token";
const REFRESH_KEY = "aerion_refresh";

export const tokenStorage = {

    getToken: () => localStorage.getItem(TOKEN_KEY),

    setToken: (token) => localStorage.setItem(TOKEN_KEY, token),

    removeToken: () => localStorage.removeItem(TOKEN_KEY),

    getRefresh: () => localStorage.getItem(REFRESH_KEY),

    setRefresh: (token) => localStorage.setItem(REFRESH_KEY, token),

    removeRefresh: () => localStorage.removeItem(REFRESH_KEY),

    clear() {

        localStorage.removeItem(TOKEN_KEY);

        localStorage.removeItem(REFRESH_KEY);

    }

};