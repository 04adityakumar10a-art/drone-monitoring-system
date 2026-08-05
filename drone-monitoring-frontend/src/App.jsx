import { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";

import {
    connectWebSocket,
    disconnectWebSocket
} from "./services/websocket";

function App() {

    useEffect(() => {

        connectWebSocket();

        return () => {

            disconnectWebSocket();

        };

    }, []);

    return <AppRoutes />;

}

export default App;