import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {

    const [collapsed, setCollapsed] = useState(() => {

        return localStorage.getItem("sidebar") === "collapsed";

    });

    function toggleSidebar() {

        const next = !collapsed;

        setCollapsed(next);

        localStorage.setItem(
            "sidebar",
            next ? "collapsed" : "expanded"
        );

    }

    return (

        <SidebarContext.Provider
            value={{
                collapsed,
                toggleSidebar
            }}
        >

            {children}

        </SidebarContext.Provider>

    );

}

export function useSidebar() {

    return useContext(SidebarContext);

}