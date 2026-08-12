import { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";

import {
    connectWebSocket,
    disconnectWebSocket
} from "./services/websocket";

import ThemeProvider from "./context/ThemeContext";


function App() {

    useEffect(() => {

        connectWebSocket();

        return () => {

            disconnectWebSocket();

        };

    }, []);


    return (

        <ThemeProvider>

            <AppRoutes />

        </ThemeProvider>

    );

}


export default App;