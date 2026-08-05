import {

    createContext,

    useContext,

    useState,

    useEffect

} from "react";

import { tokenStorage } from "../utils/tokenStorage";
const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(tokenStorage.getToken());

    useEffect(() => {

        if (token) {

            tokenStorage.setToken(token);

        } else {

            tokenStorage.clear();

        }

    }, [token]);

    function logout() {

        setUser(null);

        setToken(null);

        tokenStorage.clear();

    }

    return (

        <AuthContext.Provider value={{

            user,

            setUser,

            token,

            setToken,

            logout,

            isAuthenticated: !!token

        }}>

            {children}

        </AuthContext.Provider>

    );

}

export const useAuth = () => useContext(AuthContext);