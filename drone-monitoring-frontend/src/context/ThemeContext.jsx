import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


const ThemeContext = createContext(null);


export const THEMES = {

    "aerion-dark": {
        name: "AERION Dark",
        background: "#090B0D",
        surface: "#111315",
        elevated: "#17191B",
        border: "#292B2D",
        borderSoft: "#202224",
        primary: "#D4AF37",
        primarySoft: "rgba(212,175,55,0.10)",
        text: "#FFFFFF",
        textSecondary: "#A1A1AA",
        muted: "#6B7280"
    },

    "midnight": {
        name: "Midnight",
        background: "#070B12",
        surface: "#0D1420",
        elevated: "#121B29",
        border: "#243244",
        borderSoft: "#1A2736",
        primary: "#38BDF8",
        primarySoft: "rgba(56,189,248,0.10)",
        text: "#F8FAFC",
        textSecondary: "#CBD5E1",
        muted: "#64748B"
    },

    "high-contrast": {
        name: "High Contrast",
        background: "#050505",
        surface: "#0C0C0C",
        elevated: "#151515",
        border: "#4A4A4A",
        borderSoft: "#333333",
        primary: "#F5C542",
        primarySoft: "rgba(245,197,66,0.12)",
        text: "#FFFFFF",
        textSecondary: "#E5E5E5",
        muted: "#A3A3A3"
    }

};


function ThemeProvider({ children }) {

    const [theme, setThemeState] = useState(() => {

        const stored =
            localStorage.getItem("aerionTheme");

        return THEMES[stored]
            ? stored
            : "aerion-dark";

    });


    const [compactMode, setCompactModeState] =
        useState(() => {

            return (
                localStorage.getItem(
                    "aerionCompactMode"
                ) === "true"
            );

        });


    /* =====================================================
       THEME
    ===================================================== */

    function setTheme(themeName) {

        if (!THEMES[themeName]) {

            console.warn(
                `Unknown AERION theme: ${themeName}`
            );

            return;
        }

        setThemeState(themeName);
    }


    /* =====================================================
       COMPACT MODE
    ===================================================== */

    function setCompactMode(enabled) {

        setCompactModeState(Boolean(enabled));
    }


    /* =====================================================
       APPLY THEME TO DOCUMENT
    ===================================================== */

    useEffect(() => {

        document.documentElement.dataset.theme =
            theme;

        localStorage.setItem(
            "aerionTheme",
            theme
        );

    }, [theme]);


    /* =====================================================
       APPLY COMPACT MODE
    ===================================================== */

    useEffect(() => {

        document.documentElement.dataset.compact =
            compactMode
                ? "true"
                : "false";

        localStorage.setItem(
            "aerionCompactMode",
            String(compactMode)
        );

    }, [compactMode]);


    /* =====================================================
       RESET
    ===================================================== */

    function resetTheme() {

        setTheme("aerion-dark");

        setCompactMode(false);
    }


    const value = {

        theme,

        setTheme,

        compactMode,

        setCompactMode,

        resetTheme,

        themes: THEMES,

        currentTheme: THEMES[theme]

    };


    return (

        <ThemeContext.Provider value={value}>

            {children}

        </ThemeContext.Provider>

    );
}


export function useTheme() {

    const context =
        useContext(ThemeContext);


    if (!context) {

        throw new Error(
            "useTheme must be used inside ThemeProvider"
        );

    }


    return context;
}


export default ThemeProvider;