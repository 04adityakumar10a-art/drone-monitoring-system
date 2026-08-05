import api from "../api/axios";

const authService = {

    login(credentials) {

        return api.post("/api/auth/login", credentials);

    },

    register(data) {

        return api.post("/api/auth/register", data);

    },

    refresh(refreshToken) {

        return api.post("/api/auth/refresh", {

            refreshToken

        });

    },

    logout() {

        return api.post("/api/auth/logout");

    }

};

export default authService;