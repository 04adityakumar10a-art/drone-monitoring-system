import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";

import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <AuthProvider>

            <SidebarProvider>

                <App />

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            background: "#0f172a",
                            color: "#fff",
                            border: "1px solid #06b6d4",
                            zIndex: 999999,
                        },
                    }}
                    containerStyle={{
                        zIndex: 999999,
                    }}
                />

            </SidebarProvider>

        </AuthProvider>

    </React.StrictMode>
);