import { useEffect, useState } from "react";

import {
    User,
    Palette,
    Radio,
    Bell,
    Shield,
    Server,
    ChevronRight,
    Save,
    LogOut,
    CheckCircle2,
    Wifi,
    Activity,
    RotateCcw,
    Lock,
    Gauge,
    Zap,
    Database,
    Globe,
    Cpu,
    AlertTriangle,
    Clock3,
    Eye,
    SlidersHorizontal
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

import { useTheme } from "../../context/ThemeContext";


/* =========================================================
   ANIMATION CONFIG
========================================================= */

const pageEase = [0.22, 1, 0.36, 1];

const pageVariants = {
    hidden: {
        opacity: 0
    },

    visible: {
        opacity: 1,

        transition: {
            duration: 0.6,
            ease: pageEase,
            staggerChildren: 0.08
        }
    }
};

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 18
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.55,
            ease: pageEase
        }
    }
};

const slideLeft = {
    hidden: {
        opacity: 0,
        x: -18
    },

    visible: {
        opacity: 1,
        x: 0,

        transition: {
            duration: 0.5,
            ease: pageEase
        }
    }
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.98
    },

    visible: {
        opacity: 1,
        y: 0,
        scale: 1,

        transition: {
            duration: 0.45,
            ease: pageEase
        }
    }
};

const staggerContainer = {
    hidden: {},

    visible: {
        transition: {
            staggerChildren: 0.07
        }
    }
};


/* =========================================================
   SETTINGS PAGE
========================================================= */

function Settings() {

    const navigate = useNavigate();

    const {
        theme,
        setTheme,
        compactMode,
        setCompactMode,
        resetTheme
    } = useTheme();

    const role =
        localStorage.getItem("role") || "VIEWER";

    const username =
        localStorage.getItem("username") || "Operator";


    const [activeSection, setActiveSection] =
        useState("profile");


    const [saved, setSaved] =
        useState(false);


    const [hasChanges, setHasChanges] =
        useState(false);


    const [settings, setSettings] =
        useState({
            telemetryInterval: "1000",
            defaultProvider: "SIMULATOR",
            autoReconnect: true,

            lowBatteryAlert: true,
            connectionAlert: true,
            missionAlert: true,
            emailNotifications: false
        });


    /* =====================================================
       LOAD SETTINGS
    ===================================================== */

    useEffect(() => {

        const stored =
            localStorage.getItem(
                "aerionSettings"
            );

        if (!stored) {
            return;
        }

        try {

            setSettings(
                JSON.parse(stored)
            );

        } catch (error) {

            console.error(
                "Unable to load AERION settings:",
                error
            );

        }

    }, []);


    /* =====================================================
       SETTINGS NAVIGATION
    ===================================================== */

    const sections = [

        {
            id: "profile",
            label: "Operator",
            description: "Identity & account",
            icon: User,
            category: "ACCOUNT"
        },

        {
            id: "appearance",
            label: "Interface",
            description: "Visual preferences",
            icon: Palette,
            category: "SYSTEM"
        },

        {
            id: "telemetry",
            label: "Telemetry",
            description: "Flight data pipeline",
            icon: Radio,
            category: "OPERATIONS"
        },

        {
            id: "notifications",
            label: "Alerts",
            description: "Operational notifications",
            icon: Bell,
            category: "OPERATIONS"
        },

        {
            id: "security",
            label: "Security",
            description: "Access & sessions",
            icon: Shield,
            category: "ACCOUNT"
        },

        {
            id: "system",
            label: "System",
            description: "Platform diagnostics",
            icon: Server,
            category: "SYSTEM"
        }

    ];


    const active =
        sections.find(
            section =>
                section.id === activeSection
        );


    /* =====================================================
       UPDATE SETTING
    ===================================================== */

    function updateSetting(
        key,
        value
    ) {

        setSettings(prev => ({
            ...prev,
            [key]: value
        }));

        setSaved(false);
        setHasChanges(true);
    }


    /* =====================================================
       SAVE SETTINGS
    ===================================================== */

    function saveSettings() {

        localStorage.setItem(
            "aerionSettings",
            JSON.stringify(settings)
        );

        setSaved(true);
        setHasChanges(false);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
    }


    /* =====================================================
       RESET SETTINGS
    ===================================================== */

    function resetSettings() {

        const defaults = {
            telemetryInterval: "1000",
            defaultProvider: "SIMULATOR",
            autoReconnect: true,

            lowBatteryAlert: true,
            connectionAlert: true,
            missionAlert: true,
            emailNotifications: false
        };

        // Reset normal settings
        setSettings(defaults);

        // Reset global appearance settings
        resetTheme();

        // Make UI show unsaved/default state
        setHasChanges(true);
        setSaved(false);

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    async function logout() {

        try {

            const refreshToken =
                localStorage.getItem(
                    "refreshToken"
                );

            /*
             * If logout endpoint exists,
             * revoke refresh token server-side.
             */
            if (refreshToken) {

                try {

                    await api.post(
                        "/api/auth/logout",
                        {
                            refreshToken
                        }
                    );

                } catch (error) {

                    console.warn(
                        "Server logout endpoint unavailable or failed:",
                        error
                    );

                }

            }

        } finally {

            localStorage.removeItem("token");

            localStorage.removeItem(
                "refreshToken"
            );

            localStorage.removeItem("role");

            localStorage.removeItem(
                "username"
            );

            localStorage.removeItem(
                "userId"
            );

            navigate("/login");
        }
    }


    return (

        <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            className="relative min-h-full space-y-6 pb-10"
        >

            {/* =================================================
                AURORA BACKGROUND
            ================================================= */}

            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

                <motion.div
                    animate={{
                        x: [0, 40, -10, 0],
                        y: [0, -25, 15, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 24,
                        ease: "easeInOut"
                    }}
                    className="absolute -left-40 top-[-80px] h-[480px] w-[480px] rounded-full bg-[#F0C24B]/[0.09] blur-[140px]"
                />

                <motion.div
                    animate={{
                        x: [0, -35, 15, 0],
                        y: [0, 25, -15, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 28,
                        ease: "easeInOut"
                    }}
                    className="absolute -right-40 top-40 h-[440px] w-[440px] rounded-full bg-[#8B6BD8]/[0.08] blur-[140px]"
                />

                <motion.div
                    animate={{
                        x: [0, 25, -20, 0],
                        y: [0, -15, 20, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-[-160px] left-1/3 h-[420px] w-[420px] rounded-full bg-[#4FD1E3]/[0.06] blur-[140px]"
                />

                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
                        `,
                        backgroundSize: "42px 42px",
                        maskImage:
                            "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 85%)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 85%)"
                    }}
                />

            </div>

            {/* =================================================
                HEADER
            ================================================= */}

            <motion.div
                variants={fadeUp}
                className="relative overflow-hidden rounded-[28px] border border-white/[0.08] border-t-white/[0.22] bg-white/[0.045] backdrop-blur-2xl p-7 shadow-[0_25px_80px_rgba(0,0,0,.4)]"
            >

                {/* TOP GRADIENT BAR */}

                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-80"
                    style={{
                        backgroundImage:
                            "linear-gradient(90deg, transparent, #F0C24B 15%, #8B6BD8 50%, #4FD1E3 85%, transparent)"
                    }}
                />

                {/* SHINE SWEEP */}

                <motion.div
                    aria-hidden="true"
                    initial={{ left: "-60%" }}
                    animate={{ left: "130%" }}
                    transition={{
                        repeat: Infinity,
                        repeatDelay: 6,
                        delay: 1,
                        duration: 2.2,
                        ease: "easeInOut"
                    }}
                    className="pointer-events-none absolute top-0 h-full w-[28%] -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
                />

                {/* GOLD AMBIENT GLOW */}

                <motion.div
                    animate={{
                        x: [0, 35, 0],
                        y: [0, -20, 0],
                        opacity: [0.25, 0.4, 0.25]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[var(--aerion-primary-soft)] blur-3xl"
                />


                {/* CYAN AMBIENT GLOW */}

                <motion.div
                    animate={{
                        x: [0, -30, 0],
                        opacity: [0.15, 0.3, 0.15]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="pointer-events-none absolute bottom-[-120px] left-[35%] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
                />

                {/* VIOLET AMBIENT GLOW */}

                <motion.div
                    animate={{
                        x: [0, 25, 0],
                        y: [0, 15, 0],
                        opacity: [0.12, 0.24, 0.12]
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="pointer-events-none absolute -left-20 top-[-60px] h-64 w-64 rounded-full bg-[#8B6BD8]/10 blur-3xl"
                />


                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <motion.div
                            variants={fadeUp}
                            className="mb-3 flex items-center gap-3"
                        >

                            <motion.div
                                whileHover={{
                                    rotate: 8,
                                    scale: 1.08
                                }}
                                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#F0C24B]/20 bg-white/[0.05] backdrop-blur-sm"
                            >

                                <SlidersHorizontal
                                    size={20}
                                    className="text-[var(--aerion-primary)]"
                                />

                            </motion.div>


                            <div className="flex items-center gap-2">

                                <motion.span
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [1, 0.5, 1]
                                    }}
                                    transition={{
                                        duration: 1.8,
                                        repeat: Infinity
                                    }}
                                    className="h-2 w-2 rounded-full bg-emerald-400"
                                />

                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400">

                                    Command Configuration

                                </span>

                            </div>

                        </motion.div>


                        <motion.h1
                            variants={fadeUp}
                            className="bg-gradient-to-r from-white via-white to-[#F0C24B] bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl"
                        >

                            AERION Settings

                        </motion.h1>


                        <motion.p
                            variants={fadeUp}
                            className="mt-2 max-w-2xl text-sm leading-6 text-gray-500"
                        >

                            Configure your operator environment,
                            telemetry pipeline, alerts and system
                            preferences.

                        </motion.p>

                    </div>


                    {/* HEADER STATUS */}

                    <motion.div
                        variants={fadeUp}
                        className="flex items-center gap-3"
                    >

                        <StatusBadge
                            label="Access Level"
                            value={role}
                            icon={Shield}
                        />

                        <StatusBadge
                            label="System"
                            value="ONLINE"
                            icon={Activity}
                            green
                        />

                    </motion.div>

                </div>

            </motion.div>


            {/* =================================================
                MAIN GRID
            ================================================= */}

            <div className="grid grid-cols-12 gap-5">


                {/* =================================================
                    SETTINGS SIDEBAR
                ================================================= */}

                <motion.aside
                    variants={slideLeft}
                    className="col-span-12 xl:col-span-3"
                >

                    <div className="sticky top-5 rounded-[26px] border border-white/[0.08] border-t-white/[0.2] bg-white/[0.04] backdrop-blur-2xl p-3 shadow-[0_20px_60px_rgba(0,0,0,.35)]">

                        <div className="px-4 pb-4 pt-3">

                            <div className="flex items-center justify-between">

                                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-600">

                                    Configuration

                                </p>


                                <AnimatePresence>

                                    {hasChanges && (

                                        <motion.span
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.8
                                            }}
                                            className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[var(--aerion-primary)]"
                                        >

                                            <motion.span
                                                animate={{
                                                    opacity: [
                                                        1,
                                                        0.3,
                                                        1
                                                    ]
                                                }}
                                                transition={{
                                                    duration: 1.2,
                                                    repeat: Infinity
                                                }}
                                                className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#FFDE8A] via-[#F0C24B] to-[#B8842A]"
                                            />

                                            Unsaved

                                        </motion.span>

                                    )}

                                </AnimatePresence>

                            </div>

                        </div>


                        <nav className="space-y-1">

                            {sections.map(
                                (
                                    section,
                                    index
                                ) => {

                                    const Icon =
                                        section.icon;

                                    const isActive =
                                        activeSection ===
                                        section.id;

                                    const previous =
                                        index > 0
                                            ? sections[
                                            index - 1
                                            ]
                                            : null;

                                    const showCategory =
                                        !previous ||
                                        previous.category !==
                                        section.category;

                                    return (

                                        <motion.div
                                            key={section.id}
                                            initial={{
                                                opacity: 0,
                                                x: -12
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0
                                            }}
                                            transition={{
                                                delay:
                                                    0.2 +
                                                    index *
                                                    0.06,
                                                duration:
                                                    0.4,
                                                ease:
                                                    pageEase
                                            }}
                                        >

                                            {showCategory && (

                                                <p className="px-4 pb-2 pt-4 text-[8px] font-bold uppercase tracking-[0.28em] text-gray-700">

                                                    {section.category}

                                                </p>

                                            )}


                                            <motion.button
                                                whileHover={{
                                                    x: 3
                                                }}
                                                whileTap={{
                                                    scale: 0.98
                                                }}
                                                onClick={() =>
                                                    setActiveSection(
                                                        section.id
                                                    )
                                                }
                                                className={`group relative flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-all duration-300 ${isActive
                                                    ? "bg-white/[0.045] backdrop-blur-sm text-white"
                                                    : "text-gray-500 hover:bg-white/[0.04] backdrop-blur-sm hover:text-white"
                                                    }`}
                                            >

                                                <AnimatePresence>

                                                    {isActive && (

                                                        <motion.span
                                                            layoutId="settings-active-bar"
                                                            initial={{
                                                                opacity: 0
                                                            }}
                                                            animate={{
                                                                opacity: 1
                                                            }}
                                                            exit={{
                                                                opacity: 0
                                                            }}
                                                            className="absolute left-0 top-3 h-9 w-[2px] rounded-full bg-gradient-to-br from-[#FFDE8A] via-[#F0C24B] to-[#B8842A] shadow-[0_0_12px_rgba(240,194,75,.7)]"
                                                        />

                                                    )}

                                                </AnimatePresence>


                                                <motion.div
                                                    animate={{
                                                        scale:
                                                            isActive
                                                                ? 1
                                                                : 0.95
                                                    }}
                                                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${isActive
                                                        ? "border border-[#F0C24B]/20 bg-[var(--aerion-primary-soft)] text-[var(--aerion-primary)]"
                                                        : "bg-white/[0.04] backdrop-blur-sm text-gray-600 group-hover:text-gray-300"
                                                        }`}
                                                >

                                                    <Icon size={18} />

                                                </motion.div>


                                                <div className="min-w-0 flex-1">

                                                    <p className="text-sm font-semibold">

                                                        {section.label}

                                                    </p>

                                                    <p className="mt-0.5 truncate text-[10px] text-gray-600">

                                                        {section.description}

                                                    </p>

                                                </div>


                                                <motion.div
                                                    animate={{
                                                        x:
                                                            isActive
                                                                ? 0
                                                                : -3
                                                    }}
                                                >

                                                    <ChevronRight
                                                        size={14}
                                                        className={
                                                            isActive
                                                                ? "text-[var(--aerion-primary)]"
                                                                : "text-gray-800"
                                                        }
                                                    />

                                                </motion.div>

                                            </motion.button>

                                        </motion.div>

                                    );

                                }
                            )}

                        </nav>


                        {/* OPERATOR CARD */}

                        <motion.div
                            variants={fadeUp}
                            className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4"
                        >

                            <div className="flex items-center gap-3">

                                <motion.div
                                    whileHover={{
                                        scale: 1.08
                                    }}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--aerion-primary-soft)] text-xs font-black text-[var(--aerion-primary)]"
                                >

                                    {username
                                        .slice(0, 2)
                                        .toUpperCase()}

                                </motion.div>


                                <div className="min-w-0">

                                    <p className="truncate text-xs font-bold text-white">

                                        {username}

                                    </p>

                                    <p className="mt-0.5 text-[9px] uppercase tracking-widest text-gray-600">

                                        {role} ACCESS

                                    </p>

                                </div>


                                <motion.span
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [1, 0.5, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity
                                    }}
                                    className="ml-auto h-2 w-2 rounded-full bg-emerald-400"
                                />

                            </div>

                        </motion.div>

                    </div>

                </motion.aside>


                {/* =================================================
                    SETTINGS CONTENT
                ================================================= */}

                <motion.main
                    variants={fadeUp}
                    className="col-span-12 xl:col-span-9"
                >

                    <div className="relative overflow-hidden rounded-[26px] border border-white/[0.08] border-t-white/[0.2] bg-white/[0.04] backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,.35)]">

                        <motion.div
                            aria-hidden="true"
                            initial={{ left: "-60%" }}
                            animate={{ left: "130%" }}
                            transition={{
                                repeat: Infinity,
                                repeatDelay: 7,
                                delay: 2.5,
                                duration: 2.4,
                                ease: "easeInOut"
                            }}
                            className="pointer-events-none absolute top-0 z-10 h-full w-[24%] -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/[0.045] to-transparent"
                        />


                        {/* CONTENT HEADER */}

                        <div className="border-b border-white/[0.07] bg-white/[0.025] backdrop-blur-xl px-6 py-5 md:px-8">

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <div className="flex items-center gap-3">

                                    <motion.div
                                        key={activeSection}
                                        initial={{
                                            opacity: 0,
                                            rotate: -20,
                                            scale: 0.7
                                        }}
                                        animate={{
                                            opacity: 1,
                                            rotate: 0,
                                            scale: 1
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            ease: pageEase
                                        }}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] backdrop-blur-sm"
                                    >

                                        {active && (() => {

                                            const Icon =
                                                active.icon;

                                            return (
                                                <Icon
                                                    size={18}
                                                    className="text-[var(--aerion-primary)]"
                                                />
                                            );

                                        })()}

                                    </motion.div>


                                    <div>

                                        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-600">

                                            Configuration Module

                                        </p>


                                        <AnimatePresence
                                            mode="wait"
                                        >

                                            <motion.h2
                                                key={activeSection}
                                                initial={{
                                                    opacity: 0,
                                                    y: 6
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: -6
                                                }}
                                                transition={{
                                                    duration: 0.25
                                                }}
                                                className="mt-1 text-lg font-bold text-white"
                                            >

                                                {active?.label}

                                            </motion.h2>

                                        </AnimatePresence>

                                    </div>

                                </div>


                                {/* SAVE MESSAGE */}

                                <AnimatePresence>

                                    {saved && (

                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8,
                                                x: 15
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                x: 0
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.8,
                                                x: 15
                                            }}
                                            className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs font-semibold text-emerald-400"
                                        >

                                            <CheckCircle2
                                                size={14}
                                            />

                                            Configuration saved

                                        </motion.div>

                                    )}

                                </AnimatePresence>

                            </div>

                        </div>


                        {/* =================================================
                            SECTION CONTENT
                        ================================================= */}

                        <AnimatePresence
                            mode="wait"
                        >

                            <motion.div
                                key={activeSection}
                                initial={{
                                    opacity: 0,
                                    x: 20,
                                    filter: "blur(4px)"
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    filter: "blur(0px)"
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -15,
                                    filter: "blur(4px)"
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: pageEase
                                }}
                                className="p-6 md:p-8"
                            >

                                {activeSection === "profile" && (

                                    <ProfileSection
                                        username={username}
                                        role={role}
                                    />

                                )}


                                {activeSection === "appearance" && (

                                    <AppearanceSection
                                        settings={settings}
                                        updateSetting={
                                            updateSetting
                                        }
                                    />

                                )}


                                {activeSection === "telemetry" && (

                                    <TelemetrySection
                                        settings={settings}
                                        updateSetting={
                                            updateSetting
                                        }
                                        role={role}
                                    />

                                )}


                                {activeSection === "notifications" && (

                                    <NotificationSection
                                        settings={settings}
                                        updateSetting={
                                            updateSetting
                                        }
                                    />

                                )}


                                {activeSection === "security" && (

                                    <SecuritySection
                                        logout={logout}
                                    />

                                )}


                                {activeSection === "system" && (

                                    <SystemSection
                                        role={role}
                                    />

                                )}

                            </motion.div>

                        </AnimatePresence>


                        {/* =================================================
                            SETTINGS FOOTER
                        ================================================= */}

                        {activeSection !== "profile" &&
                            activeSection !== "security" && (

                                <div className="flex flex-col gap-3 border-t border-white/[0.07] bg-white/[0.025] backdrop-blur-xl px-6 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">

                                    <motion.button
                                        whileHover={{
                                            scale: 1.02,
                                            x: 2
                                        }}
                                        whileTap={{
                                            scale: 0.97
                                        }}
                                        type="button"
                                        onClick={resetSettings}
                                        className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm px-4 py-2.5 text-xs font-semibold text-gray-500 transition hover:border-gray-600 hover:text-white"
                                    >

                                        <RotateCcw
                                            size={14}
                                        />

                                        Restore Defaults

                                    </motion.button>


                                    <motion.button
                                        whileHover={
                                            hasChanges
                                                ? {
                                                    scale: 1.025
                                                }
                                                : {}
                                        }
                                        whileTap={
                                            hasChanges
                                                ? {
                                                    scale: 0.97
                                                }
                                                : {}
                                        }
                                        onClick={saveSettings}
                                        disabled={!hasChanges}
                                        className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition ${hasChanges
                                            ? "bg-gradient-to-br from-[#FFDE8A] via-[#F0C24B] to-[#B8842A] text-black shadow-[0_0_25px_rgba(240,194,75,.15)]"
                                            : "cursor-not-allowed bg-white/[0.05] backdrop-blur-sm text-gray-600"
                                            }`}
                                    >

                                        {saved
                                            ? (
                                                <CheckCircle2
                                                    size={15}
                                                />
                                            )
                                            : (
                                                <Save
                                                    size={15}
                                                />
                                            )}

                                        {saved
                                            ? "Saved"
                                            : "Apply Configuration"}

                                    </motion.button>

                                </div>

                            )}

                    </div>

                </motion.main>

            </div>

        </motion.div>
    );
}


/* =========================================================
   PROFILE SECTION
========================================================= */

function ProfileSection({
    username,
    role
}) {

    const initials =
        username
            .slice(0, 2)
            .toUpperCase();

    return (

        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-7"
        >

            <motion.div
                variants={cardVariants}
                whileHover={{
                    y: -2,
                    borderColor:
                        "rgba(240,194,75,.25)"
                }}
                className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-gradient-to-br from-[#151719] to-[#0E1012] p-6"
            >

                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[var(--aerion-primary-soft)] blur-3xl"
                />


                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">

                    <motion.div
                        initial={{
                            scale: 0.7,
                            opacity: 0
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1
                        }}
                        transition={{
                            delay: 0.15,
                            duration: 0.5,
                            ease: pageEase
                        }}
                        whileHover={{
                            scale: 1.05,
                            rotate: 2
                        }}
                        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[22px] border border-[#F0C24B]/25 bg-[var(--aerion-primary-soft)] text-xl font-black text-[var(--aerion-primary)] shadow-[0_0_35px_rgba(240,194,75,.08)]"
                    >

                        {initials}

                    </motion.div>


                    <div className="flex-1">

                        <div className="flex flex-wrap items-center gap-3">

                            <h3 className="text-2xl font-black text-white">

                                {username}

                            </h3>


                            <span className="rounded-full border border-[#F0C24B]/20 bg-[var(--aerion-primary-soft)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--aerion-primary)]">

                                {role}

                            </span>

                        </div>


                        <p className="mt-2 text-sm text-gray-500">

                            AERION operator account

                        </p>


                        <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">

                            <motion.span
                                animate={{
                                    scale: [1, 1.4, 1],
                                    opacity: [1, 0.5, 1]
                                }}
                                transition={{
                                    duration: 1.8,
                                    repeat: Infinity
                                }}
                                className="h-2 w-2 rounded-full bg-emerald-400"
                            />

                            Active authentication session

                        </div>

                    </div>

                </div>

            </motion.div>


            <motion.div variants={fadeUp}>

                <div className="mb-4 flex items-center gap-2">

                    <User
                        size={15}
                        className="text-[var(--aerion-primary)]"
                    />

                    <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">

                        Account Identity

                    </h3>

                </div>


                <div className="grid gap-4 md:grid-cols-2">

                    <IdentityCard
                        label="Username"
                        value={username}
                    />

                    <IdentityCard
                        label="Access Level"
                        value={role}
                    />

                </div>

            </motion.div>

        </motion.div>
    );
}


/* =========================================================
   APPEARANCE SECTION
========================================================= */

function AppearanceSection({
    settings,
    updateSetting
}) {

    const {
        theme,
        setTheme,
        compactMode,
        setCompactMode
    } = useTheme();


    const themeProfiles = [

        {
            id: "aerion-dark",

            label: "AERION Dark",

            description:
                "Signature AERION command interface.",

            accent: "#F0C24B",

            background: "#090B0D",

            surface: "#111315"
        },

        {
            id: "midnight",

            label: "Midnight",

            description:
                "Cool blue tactical command environment.",

            accent: "#38BDF8",

            background: "#070B12",

            surface: "#0D1420"
        },

        {
            id: "high-contrast",

            label: "High Contrast",

            description:
                "Maximum visibility for operations.",

            accent: "#F5C542",

            background: "#050505",

            surface: "#0C0C0C"
        }

    ];


    function selectTheme(themeId) {

        setTheme(themeId);
    }


    function toggleCompact() {

        setCompactMode(
            !compactMode
        );
    }


    return (

        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-5"
        >

            {/* =====================================================
                INTERFACE CONTROLS
            ===================================================== */}

            <div className="grid gap-4 md:grid-cols-2">


                {/* DARK COMMAND UI */}

                <motion.div
                    variants={cardVariants}
                    whileHover={{
                        y: -3,
                        borderColor:
                            "rgba(240,194,75,.2)"
                    }}
                    className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5"
                >

                    <div className="flex items-start justify-between gap-4">

                        <div className="flex gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] backdrop-blur-sm">

                                <Palette
                                    size={17}
                                    className="text-[var(--aerion-primary)]"
                                />

                            </div>


                            <div>

                                <p className="text-sm font-bold text-white">

                                    Interface Theme

                                </p>

                                <p className="mt-1 text-xs leading-5 text-gray-600">

                                    Choose the visual environment
                                    for AERION.

                                </p>

                            </div>

                        </div>


                        <motion.div
                            animate={{
                                scale:
                                    theme ===
                                        "aerion-dark"
                                        ? [1, 1.08, 1]
                                        : 1
                            }}
                            transition={{
                                duration: 2,
                                repeat:
                                    theme ===
                                        "aerion-dark"
                                        ? Infinity
                                        : 0
                            }}
                            className="rounded-full border border-[#F0C24B]/20 bg-[var(--aerion-primary-soft)] px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest text-[var(--aerion-primary)]"
                        >

                            {theme ===
                                "aerion-dark"
                                ? "Active"
                                : "Theme"}

                        </motion.div>

                    </div>

                </motion.div>


                {/* COMPACT MODE */}

                <motion.div
                    variants={cardVariants}
                    whileHover={{
                        y: -3,
                        borderColor:
                            "rgba(240,194,75,.2)"
                    }}
                    className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5"
                >

                    <div className="flex items-start justify-between gap-4">

                        <div className="flex gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] backdrop-blur-sm">

                                <Eye
                                    size={17}
                                    className="text-[var(--aerion-primary)]"
                                />

                            </div>


                            <div>

                                <p className="text-sm font-bold text-white">

                                    Compact Mode

                                </p>

                                <p className="mt-1 text-xs leading-5 text-gray-600">

                                    Reduce spacing and interface
                                    density across AERION.

                                </p>

                            </div>

                        </div>


                        <Toggle
                            enabled={
                                compactMode
                            }
                            onChange={
                                toggleCompact
                            }
                        />

                    </div>

                </motion.div>

            </div>


            {/* =====================================================
                THEME PROFILE
            ===================================================== */}

            <motion.div
                variants={cardVariants}
                className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5"
            >

                <div className="mb-5 flex items-center gap-3">

                    <motion.div
                        animate={{
                            rotate: [0, 3, -3, 0]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] backdrop-blur-sm"
                    >

                        <Palette
                            size={17}
                            className="text-[var(--aerion-primary)]"
                        />

                    </motion.div>


                    <div>

                        <p className="text-sm font-bold text-white">

                            Interface Profile

                        </p>

                        <p className="text-xs text-gray-600">

                            Select the visual command environment.

                        </p>

                    </div>

                </div>


                <div className="grid gap-3 md:grid-cols-3">

                    {themeProfiles.map(
                        profile => {

                            const isActive =
                                theme ===
                                profile.id;


                            return (

                                <motion.button
                                    key={
                                        profile.id
                                    }
                                    type="button"
                                    onClick={() =>
                                        selectTheme(
                                            profile.id
                                        )
                                    }
                                    whileHover={{
                                        y: -5,
                                        scale: 1.015
                                    }}
                                    whileTap={{
                                        scale: 0.97
                                    }}
                                    className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition-all duration-300 ${isActive
                                        ? "border-[#F0C24B]/50 shadow-[0_0_30px_rgba(240,194,75,.08)]"
                                        : "border-white/[0.08] hover:border-white/[0.2]"
                                        }`}
                                >

                                    {/* ACTIVE GLOW */}

                                    {isActive && (

                                        <motion.div
                                            layoutId="theme-glow"
                                            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFDE8A] via-[#F0C24B] to-[#B8842A]/[0.035]"
                                        />

                                    )}


                                    {/* MINI UI PREVIEW */}

                                    <div
                                        className="relative mb-4 h-24 overflow-hidden rounded-xl border"
                                        style={{
                                            background:
                                                profile.background,

                                            borderColor:
                                                isActive
                                                    ? profile.accent
                                                    : "#242628"
                                        }}
                                    >

                                        {/* HEADER */}

                                        <div
                                            className="h-5 border-b px-2"
                                            style={{
                                                borderColor:
                                                    profile.surface
                                            }}
                                        >

                                            <div className="flex items-center gap-1 pt-1.5">

                                                <span
                                                    className="h-1.5 w-7 rounded-full"
                                                    style={{
                                                        background:
                                                            profile.accent
                                                    }}
                                                />

                                                <span
                                                    className="h-1.5 w-4 rounded-full"
                                                    style={{
                                                        background:
                                                            profile.surface
                                                    }}
                                                />

                                            </div>

                                        </div>


                                        {/* BODY */}

                                        <div className="flex gap-2 p-2">

                                            <div
                                                className="h-12 w-[24%] rounded-md"
                                                style={{
                                                    background:
                                                        profile.surface
                                                }}
                                            />


                                            <div className="flex-1 space-y-2">

                                                <div
                                                    className="h-3 rounded-md"
                                                    style={{
                                                        background:
                                                            profile.surface
                                                    }}
                                                />

                                                <div
                                                    className="h-6 rounded-md"
                                                    style={{
                                                        background:
                                                            profile.surface
                                                    }}
                                                />

                                            </div>

                                        </div>


                                        {/* SCANNING LINE */}

                                        {isActive && (

                                            <motion.div
                                                animate={{
                                                    y: [
                                                        20,
                                                        80,
                                                        20
                                                    ]
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                                className="absolute left-0 right-0 h-px"
                                                style={{
                                                    background:
                                                        profile.accent,

                                                    boxShadow:
                                                        `0 0 12px ${profile.accent}`
                                                }}
                                            />

                                        )}

                                    </div>


                                    {/* PROFILE INFO */}

                                    <div className="relative">

                                        <div className="flex items-center justify-between">

                                            <div>

                                                <p
                                                    className={`text-xs font-bold ${isActive
                                                        ? "text-white"
                                                        : "text-gray-400"
                                                        }`}
                                                >

                                                    {
                                                        profile.label
                                                    }

                                                </p>


                                                <p className="mt-1 text-[9px] leading-4 text-gray-600">

                                                    {
                                                        profile.description
                                                    }

                                                </p>

                                            </div>


                                            <AnimatePresence>

                                                {isActive && (

                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.5,
                                                            rotate: -45
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            scale: 1,
                                                            rotate: 0
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            scale: 0.5
                                                        }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 400,
                                                            damping: 20
                                                        }}
                                                    >

                                                        <CheckCircle2
                                                            size={17}
                                                            style={{
                                                                color:
                                                                    profile.accent
                                                            }}
                                                        />

                                                    </motion.div>

                                                )}

                                            </AnimatePresence>

                                        </div>

                                    </div>


                                    {/* ACTIVE BORDER */}

                                    {isActive && (

                                        <motion.div
                                            layoutId="theme-active-border"
                                            className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full"
                                            style={{
                                                background:
                                                    profile.accent,

                                                boxShadow:
                                                    `0 0 12px ${profile.accent}`
                                            }}
                                        />

                                    )}

                                </motion.button>

                            );

                        }
                    )}

                </div>


                {/* CURRENT THEME STATUS */}

                <motion.div
                    layout
                    className="mt-5 flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-md p-4 sm:flex-row sm:items-center sm:justify-between"
                >

                    <div className="flex items-center gap-3">

                        <motion.span
                            animate={{
                                opacity: [
                                    1,
                                    0.35,
                                    1
                                ]
                            }}
                            transition={{
                                duration: 1.6,
                                repeat: Infinity
                            }}
                            className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.6)]"
                        />


                        <div>

                            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-600">

                                Active Profile

                            </p>


                            <p className="mt-1 text-xs font-semibold text-white">

                                {
                                    themeProfiles.find(
                                        profile =>
                                            profile.id ===
                                            theme
                                    )?.label
                                }

                            </p>

                        </div>

                    </div>


                    <span className="text-[9px] font-medium uppercase tracking-widest text-gray-700">

                        Changes apply instantly

                    </span>

                </motion.div>

            </motion.div>

        </motion.div>
    );
}


/* =========================================================
   TELEMETRY SECTION
========================================================= */

function TelemetrySection({
    settings,
    updateSetting,
    role
}) {

    return (

        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-5"
        >

            <div className="grid gap-4 md:grid-cols-3">

                <TelemetryMetric
                    icon={Radio}
                    label="Pipeline"
                    value="ACTIVE"
                    index={0}
                />

                <TelemetryMetric
                    icon={Wifi}
                    label="Transport"
                    value="WEBSOCKET"
                    index={1}
                />

                <TelemetryMetric
                    icon={Activity}
                    label="Status"
                    value="ONLINE"
                    index={2}
                />

            </div>


            {role !== "VIEWER" && (

                <ControlCard
                    icon={Cpu}
                    title="Default Telemetry Provider"
                    description="Provider used by Mission Control when a session starts."
                >

                    <SelectControl
                        value={
                            settings.defaultProvider
                        }
                        onChange={e =>
                            updateSetting(
                                "defaultProvider",
                                e.target.value
                            )
                        }
                    >

                        <option value="SIMULATOR">
                            Simulator
                        </option>

                        <option value="REAL">
                            Real Drone
                        </option>

                    </SelectControl>

                </ControlCard>

            )}


            <ControlCard
                icon={Gauge}
                title="Update Frequency"
                description="How frequently the telemetry interface refreshes data."
            >

                <SelectControl
                    value={
                        settings.telemetryInterval
                    }
                    onChange={e =>
                        updateSetting(
                            "telemetryInterval",
                            e.target.value
                        )
                    }
                >

                    <option value="500">
                        500 ms
                    </option>

                    <option value="1000">
                        1 second
                    </option>

                    <option value="2000">
                        2 seconds
                    </option>

                    <option value="5000">
                        5 seconds
                    </option>

                </SelectControl>

            </ControlCard>


            <ControlCard
                icon={Zap}
                title="Automatic Reconnect"
                description="Automatically restore the telemetry connection after interruption."
            >

                <Toggle
                    enabled={
                        settings.autoReconnect
                    }
                    onChange={value =>
                        updateSetting(
                            "autoReconnect",
                            value
                        )
                    }
                />

            </ControlCard>


            <motion.div
                variants={cardVariants}
                className="rounded-2xl border border-[#F0C24B]/10 bg-gradient-to-br from-[#FFDE8A] via-[#F0C24B] to-[#B8842A]/5 p-5"
            >

                <div className="flex gap-3">

                    <AlertTriangle
                        size={18}
                        className="mt-0.5 shrink-0 text-[var(--aerion-primary)]"
                    />

                    <div>

                        <p className="text-sm font-semibold text-[var(--aerion-primary)]">

                            Operational telemetry

                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">

                            Telemetry provider controls are restricted
                            by your backend role permissions.

                        </p>

                    </div>

                </div>

            </motion.div>

        </motion.div>
    );
}


/* =========================================================
   NOTIFICATIONS SECTION
========================================================= */

function NotificationSection({
    settings,
    updateSetting
}) {

    const alerts = [

        {
            icon: Gauge,
            title: "Low Battery",
            description:
                "Alert when a drone reaches a critical battery level.",
            key: "lowBatteryAlert"
        },

        {
            icon: Wifi,
            title: "Connection Lost",
            description:
                "Alert when communication with a drone is interrupted.",
            key: "connectionAlert"
        },

        {
            icon: AlertTriangle,
            title: "Mission Alerts",
            description:
                "Display important mission operation notifications.",
            key: "missionAlert"
        },

        {
            icon: Globe,
            title: "Email Notifications",
            description:
                "Send operational alerts to your registered email.",
            key: "emailNotifications"
        }

    ];


    return (

        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-3"
        >

            {alerts.map(
                alert => {

                    const Icon =
                        alert.icon;

                    return (

                        <motion.div
                            key={alert.key}
                            variants={cardVariants}
                            whileHover={{
                                x: 3,
                                borderColor:
                                    "rgba(240,194,75,.2)"
                            }}
                            className="flex items-center gap-4 rounded-[20px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5"
                        >

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] backdrop-blur-sm">

                                <Icon
                                    size={17}
                                    className="text-[var(--aerion-primary)]"
                                />

                            </div>


                            <div className="min-w-0 flex-1">

                                <p className="text-sm font-bold text-white">

                                    {alert.title}

                                </p>

                                <p className="mt-1 text-xs leading-5 text-gray-600">

                                    {alert.description}

                                </p>

                            </div>


                            <Toggle
                                enabled={
                                    settings[
                                    alert.key
                                    ]
                                }
                                onChange={value =>
                                    updateSetting(
                                        alert.key,
                                        value
                                    )
                                }
                            />

                        </motion.div>

                    );
                }
            )}

        </motion.div>
    );
}


/* =========================================================
   SECURITY SECTION
========================================================= */

function SecuritySection({
    logout
}) {

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });


    const [loading, setLoading] =
        useState(false);


    const [message, setMessage] =
        useState(null);


    function updateField(
        field,
        value
    ) {

        setForm(prev => ({
            ...prev,
            [field]: value
        }));

        setMessage(null);
    }


    async function changePassword(e) {

        e.preventDefault();

        setMessage(null);


        /* -----------------------------------------
           BASIC VALIDATION
        ----------------------------------------- */

        if (
            !form.currentPassword ||
            !form.newPassword ||
            !form.confirmPassword
        ) {

            setMessage({
                type: "error",
                text: "Please complete all password fields."
            });

            return;
        }


        if (
            form.newPassword.length < 8
        ) {

            setMessage({
                type: "error",
                text: "New password must be at least 8 characters."
            });

            return;
        }


        if (
            form.newPassword !==
            form.confirmPassword
        ) {

            setMessage({
                type: "error",
                text: "New passwords do not match."
            });

            return;
        }


        if (
            form.currentPassword ===
            form.newPassword
        ) {

            setMessage({
                type: "error",
                text: "New password must be different from the current password."
            });

            return;
        }


        try {

            setLoading(true);


            await api.post(
                "/api/auth/change-password",
                {
                    currentPassword:
                        form.currentPassword,

                    newPassword:
                        form.newPassword,

                    confirmPassword:
                        form.confirmPassword
                }
            );


            setMessage({
                type: "success",
                text: "Password changed successfully."
            });


            setForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });


        } catch (error) {

            console.error(
                "Password change failed:",
                error
            );


            const backendMessage =
                error?.response?.data?.message;


            setMessage({
                type: "error",
                text:
                    backendMessage ||
                    "Unable to change password. Please check your current password."
            });


        } finally {

            setLoading(false);
        }
    }


    return (

        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-5"
        >

            {/* =================================================
                AUTH STATUS
            ================================================= */}

            <motion.div
                variants={cardVariants}
                className="rounded-[22px] border border-emerald-500/10 bg-emerald-500/5 p-6"
            >

                <div className="flex items-start gap-4">

                    <motion.div
                        animate={{
                            boxShadow: [
                                "0 0 0 rgba(16,185,129,0)",
                                "0 0 25px rgba(16,185,129,.12)",
                                "0 0 0 rgba(16,185,129,0)"
                            ]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity
                        }}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10"
                    >

                        <Shield
                            size={20}
                            className="text-emerald-400"
                        />

                    </motion.div>


                    <div className="flex-1">

                        <div className="flex flex-wrap items-center gap-3">

                            <h3 className="font-bold text-white">

                                Authentication Active

                            </h3>

                            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-emerald-400">

                                Protected

                            </span>

                        </div>


                        <p className="mt-2 text-sm leading-6 text-gray-500">

                            Your account is protected by JWT
                            authentication and server-side
                            authorization.

                        </p>

                    </div>

                </div>

            </motion.div>


            {/* =================================================
                CHANGE PASSWORD
            ================================================= */}

            <motion.form
                variants={cardVariants}
                onSubmit={changePassword}
                className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6"
            >

                <div className="mb-6 flex items-center gap-3">

                    <motion.div
                        whileHover={{
                            rotate: 8,
                            scale: 1.05
                        }}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--aerion-primary-soft)]"
                    >

                        <Lock
                            size={19}
                            className="text-[var(--aerion-primary)]"
                        />

                    </motion.div>


                    <div>

                        <h3 className="text-base font-bold text-white">

                            Change Password

                        </h3>

                        <p className="mt-1 text-xs text-gray-600">

                            Update your AERION account credentials.

                        </p>

                    </div>

                </div>


                <div className="grid gap-5">

                    <PasswordInput
                        label="Current Password"
                        value={
                            form.currentPassword
                        }
                        onChange={value =>
                            updateField(
                                "currentPassword",
                                value
                            )
                        }
                        placeholder="Enter current password"
                    />


                    <div className="grid gap-5 md:grid-cols-2">

                        <PasswordInput
                            label="New Password"
                            value={
                                form.newPassword
                            }
                            onChange={value =>
                                updateField(
                                    "newPassword",
                                    value
                                )
                            }
                            placeholder="Minimum 8 characters"
                        />


                        <PasswordInput
                            label="Confirm New Password"
                            value={
                                form.confirmPassword
                            }
                            onChange={value =>
                                updateField(
                                    "confirmPassword",
                                    value
                                )
                            }
                            placeholder="Repeat new password"
                        />

                    </div>

                </div>


                {/* PASSWORD STRENGTH */}

                <AnimatePresence>

                    {form.newPassword && (

                        <motion.div
                            initial={{
                                opacity: 0,
                                height: 0
                            }}
                            animate={{
                                opacity: 1,
                                height: "auto"
                            }}
                            exit={{
                                opacity: 0,
                                height: 0
                            }}
                            className="mt-5 overflow-hidden"
                        >

                            <PasswordStrength
                                password={
                                    form.newPassword
                                }
                            />

                        </motion.div>

                    )}

                </AnimatePresence>


                {/* MESSAGE */}

                <AnimatePresence mode="wait">

                    {message && (

                        <motion.div
                            key={message.text}
                            initial={{
                                opacity: 0,
                                y: 8,
                                scale: 0.98
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1
                            }}
                            exit={{
                                opacity: 0,
                                y: -8
                            }}
                            className={`mt-5 flex items-center gap-3 rounded-xl border p-4 text-sm ${message.type === "success"
                                ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                                : "border-red-500/20 bg-red-500/5 text-red-400"
                                }`}
                        >

                            {message.type === "success"
                                ? (
                                    <CheckCircle2
                                        size={17}
                                    />
                                )
                                : (
                                    <AlertTriangle
                                        size={17}
                                    />
                                )}

                            {message.text}

                        </motion.div>

                    )}

                </AnimatePresence>


                {/* SUBMIT */}

                <div className="mt-6 flex justify-end">

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={
                            !loading
                                ? {
                                    scale: 1.025,
                                    boxShadow:
                                        "0 0 30px rgba(240,194,75,.15)"
                                }
                                : {}
                        }
                        whileTap={
                            !loading
                                ? {
                                    scale: 0.97
                                }
                                : {}
                        }
                        className="flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#FFDE8A] via-[#F0C24B] to-[#B8842A] px-5 py-3 text-sm font-bold text-black transition disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {loading ? (

                            <>
                                <motion.div
                                    animate={{
                                        rotate: 360
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="h-4 w-4 rounded-full border-2 border-black/30 border-t-black"
                                />

                                Updating...

                            </>

                        ) : (

                            <>
                                <Lock
                                    size={15}
                                />

                                Change Password

                            </>

                        )}

                    </motion.button>

                </div>

            </motion.form>


            {/* =================================================
                SECURITY STATUS
            ================================================= */}

            <div className="grid gap-4 md:grid-cols-2">

                <SecurityCard
                    icon={Lock}
                    title="Access Control"
                    value="RBAC Enabled"
                />

                <SecurityCard
                    icon={Clock3}
                    title="Session"
                    value="Authenticated"
                />

            </div>


            {/* =================================================
                LOGOUT
            ================================================= */}

            <motion.div
                variants={cardVariants}
                className="rounded-[22px] border border-red-500/15 bg-red-500/[0.03] p-6"
            >

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <div className="flex items-center gap-2">

                            <LogOut
                                size={17}
                                className="text-red-400"
                            />

                            <h3 className="font-bold text-white">

                                End Current Session

                            </h3>

                        </div>


                        <p className="mt-2 text-sm text-gray-600">

                            Revoke your session and return
                            to the AERION login screen.

                        </p>

                    </div>


                    <motion.button
                        type="button"
                        whileHover={{
                            scale: 1.03
                        }}
                        whileTap={{
                            scale: 0.96
                        }}
                        onClick={logout}
                        className="flex items-center justify-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500/20"
                    >

                        <LogOut size={16} />

                        Sign Out

                    </motion.button>

                </div>

            </motion.div>

        </motion.div>
    );
}


/* =========================================================
   SYSTEM SECTION
========================================================= */

function SystemSection({
    role
}) {

    return (

        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-5"
        >

            <div className="grid gap-4 md:grid-cols-2">

                <SystemCard
                    icon={Server}
                    title="Backend"
                    value="Spring Boot"
                    status="RUNNING"
                    index={0}
                />

                <SystemCard
                    icon={Database}
                    title="Database"
                    value="PostgreSQL"
                    status="CONNECTED"
                    index={1}
                />

                <SystemCard
                    icon={Radio}
                    title="Telemetry"
                    value="WebSocket"
                    status="AVAILABLE"
                    index={2}
                />

                <SystemCard
                    icon={Shield}
                    title="Authorization"
                    value={role}
                    status="ENFORCED"
                    index={3}
                />

            </div>


            <motion.div
                variants={cardVariants}
                whileHover={{
                    y: -2
                }}
                className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6"
            >

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-4">

                        <motion.div
                            whileHover={{
                                rotate: 10,
                                scale: 1.05
                            }}
                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] backdrop-blur-sm"
                        >

                            <Cpu
                                size={21}
                                className="text-[var(--aerion-primary)]"
                            />

                        </motion.div>


                        <div>

                            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-600">

                                Platform

                            </p>

                            <h3 className="mt-1 font-bold text-white">

                                AERION Drone Monitoring System

                            </h3>

                        </div>

                    </div>


                    <div className="text-left sm:text-right">

                        <p className="text-[9px] uppercase tracking-[0.2em] text-gray-600">

                            Build

                        </p>

                        <p className="mt-1 font-mono text-sm font-bold text-[var(--aerion-primary)]">

                            v1.0.0

                        </p>

                    </div>

                </div>

            </motion.div>

        </motion.div>
    );
}


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
    label,
    value,
    icon: Icon,
    green = false
}) {

    return (

        <motion.div
            whileHover={{
                y: -2
            }}
            className={`rounded-2xl border px-5 py-3 ${green
                ? "border-emerald-500/10 bg-emerald-500/5"
                : "border-white/[0.08] bg-white/[0.03] backdrop-blur-xl"
                }`}
        >

            <p className="text-[9px] uppercase tracking-[0.25em] text-gray-600">

                {label}

            </p>


            <div className="mt-1 flex items-center gap-2">

                <Icon
                    size={14}
                    className={
                        green
                            ? "text-emerald-400"
                            : "text-[var(--aerion-primary)]"
                    }
                />

                <span
                    className={`text-sm font-bold ${green
                        ? "text-emerald-400"
                        : "text-white"
                        }`}
                >

                    {value}

                </span>

            </div>

        </motion.div>
    );
}


/* =========================================================
   IDENTITY CARD
========================================================= */

function IdentityCard({
    label,
    value
}) {

    return (

        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -3,
                scale: 1.01,
                borderColor:
                    "rgba(240,194,75,.2)"
            }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5"
        >

            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-600">

                {label}

            </p>


            <p className="mt-3 text-lg font-black text-white">

                {value}

            </p>

        </motion.div>
    );
}


/* =========================================================
   PREFERENCE CARD
========================================================= */

function AnimatedPreferenceCard({
    icon: Icon,
    title,
    description,
    children
}) {

    return (

        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -3,
                borderColor:
                    "rgba(240,194,75,.2)"
            }}
            className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5"
        >

            <div className="flex items-start justify-between gap-4">

                <div className="flex gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] backdrop-blur-sm">

                        <Icon
                            size={17}
                            className="text-[var(--aerion-primary)]"
                        />

                    </div>


                    <div>

                        <p className="text-sm font-bold text-white">

                            {title}

                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-600">

                            {description}

                        </p>

                    </div>

                </div>


                {children}

            </div>

        </motion.div>
    );
}

/* =========================================================
   TELEMETRY METRIC
========================================================= */

function TelemetryMetric({
    icon: Icon,
    label,
    value,
    index
}) {

    return (

        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -4,
                scale: 1.015
            }}
            className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5"
        >

            <div className="flex items-center justify-between">

                <motion.div
                    whileHover={{
                        rotate: 8
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] backdrop-blur-sm"
                >

                    <Icon
                        size={16}
                        className="text-[var(--aerion-primary)]"
                    />

                </motion.div>


                <motion.span
                    animate={{
                        scale: [1, 1.35, 1],
                        opacity: [1, 0.5, 1]
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: index * 0.2
                    }}
                    className="h-2 w-2 rounded-full bg-emerald-400"
                />

            </div>


            <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.22em] text-gray-600">

                {label}

            </p>


            <p className="mt-1 font-mono text-sm font-bold text-white">

                {value}

            </p>

        </motion.div>
    );
}


/* =========================================================
   CONTROL CARD
========================================================= */

function ControlCard({
    icon: Icon,
    title,
    description,
    children
}) {

    return (

        <motion.div
            variants={cardVariants}
            whileHover={{
                x: 2,
                borderColor:
                    "rgba(240,194,75,.18)"
            }}
            className="flex flex-col gap-5 rounded-[20px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5 md:flex-row md:items-center md:justify-between"
        >

            <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] backdrop-blur-sm">

                    <Icon
                        size={17}
                        className="text-[var(--aerion-primary)]"
                    />

                </div>


                <div>

                    <h3 className="text-sm font-bold text-white">

                        {title}

                    </h3>


                    <p className="mt-1 max-w-xl text-xs leading-5 text-gray-600">

                        {description}

                    </p>

                </div>

            </div>


            <div className="shrink-0">

                {children}

            </div>

        </motion.div>
    );
}


/* =========================================================
   SELECT
========================================================= */

function SelectControl({
    value,
    onChange,
    children
}) {

    return (

        <motion.select
            whileFocus={{
                scale: 1.01
            }}
            value={value}
            onChange={onChange}
            className="rounded-xl border border-white/[0.1] bg-white/[0.045] backdrop-blur-sm px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-[#F0C24B]"
        >

            {children}

        </motion.select>
    );
}


/* =========================================================
   SECURITY CARD
========================================================= */

function SecurityCard({
    icon: Icon,
    title,
    value
}) {

    return (

        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -3
            }}
            className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5"
        >

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] backdrop-blur-sm">

                    <Icon
                        size={17}
                        className="text-[var(--aerion-primary)]"
                    />

                </div>


                <div>

                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-600">

                        {title}

                    </p>


                    <p className="mt-1 text-sm font-bold text-white">

                        {value}

                    </p>

                </div>

            </div>

        </motion.div>
    );
}


/* =========================================================
   SYSTEM CARD
========================================================= */

function SystemCard({
    icon: Icon,
    title,
    value,
    status,
    index
}) {

    return (

        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -4,
                scale: 1.015
            }}
            className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5"
        >

            <div className="flex items-center justify-between">

                <motion.div
                    whileHover={{
                        rotate: 8
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] backdrop-blur-sm"
                >

                    <Icon
                        size={17}
                        className="text-[var(--aerion-primary)]"
                    />

                </motion.div>


                <div className="flex items-center gap-1.5">

                    <motion.span
                        animate={{
                            opacity: [
                                1,
                                0.35,
                                1
                            ]
                        }}
                        transition={{
                            duration: 1.7,
                            repeat: Infinity,
                            delay: index * 0.15
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                    />


                    <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-400">

                        {status}

                    </span>

                </div>

            </div>


            <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">

                {title}

            </p>


            <p className="mt-1 text-base font-bold text-white">

                {value}

            </p>

        </motion.div>
    );
}


/* =========================================================
   TOGGLE
========================================================= */

function Toggle({
    enabled,
    onChange
}) {

    return (

        <motion.button
            type="button"
            onClick={() =>
                onChange(!enabled)
            }
            whileTap={{
                scale: 0.9
            }}
            className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-300 ${enabled
                ? "border-[#F0C24B]/40 bg-gradient-to-br from-[#FFDE8A] via-[#F0C24B] to-[#B8842A]"
                : "border-white/[0.12] bg-white/[0.06]"
                }`}
        >

            <motion.span
                animate={{
                    x: enabled
                        ? 20
                        : 0
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
                className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-lg"
            />

        </motion.button>
    );
}


/* =========================================================
   PASSWORD INPUT
========================================================= */

function PasswordInput({
    label,
    value,
    onChange,
    placeholder
}) {

    const [show, setShow] =
        useState(false);


    return (

        <div>

            <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-gray-600">

                {label}

            </label>


            <div className="relative">

                <Lock
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />


                <input
                    type={
                        show
                            ? "text"
                            : "password"
                    }
                    value={value}
                    onChange={e =>
                        onChange(
                            e.target.value
                        )
                    }
                    placeholder={placeholder}
                    autoComplete="off"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.045] backdrop-blur-sm py-3.5 pl-11 pr-12 text-sm text-white outline-none transition-all placeholder:text-gray-700 focus:border-[#F0C24B]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#F0C24B]/10"
                />


                <motion.button
                    type="button"
                    whileTap={{
                        scale: 0.9
                    }}
                    onClick={() =>
                        setShow(
                            prev => !prev
                        )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-600 transition hover:text-gray-300"
                >

                    <Eye size={16} />

                </motion.button>

            </div>

        </div>
    );
}


/* =========================================================
   PASSWORD STRENGTH
========================================================= */

function PasswordStrength({
    password
}) {

    let score = 0;


    if (password.length >= 8) {
        score++;
    }


    if (/[A-Z]/.test(password)) {
        score++;
    }


    if (/[0-9]/.test(password)) {
        score++;
    }


    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }


    const labels = [
        "Too weak",
        "Weak",
        "Fair",
        "Strong",
        "Very strong"
    ];


    const label =
        labels[score];


    return (

        <div>

            <div className="mb-2 flex items-center justify-between">

                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">

                    Password strength

                </span>


                <span
                    className={`text-[10px] font-bold ${score >= 3
                        ? "text-emerald-400"
                        : "text-[var(--aerion-primary)]"
                        }`}
                >

                    {label}

                </span>

            </div>


            <div className="flex gap-1.5">

                {[0, 1, 2, 3].map(
                    index => (

                        <motion.div
                            key={index}
                            initial={{
                                scaleX: 0
                            }}
                            animate={{
                                scaleX:
                                    index <
                                        score
                                        ? 1
                                        : 0.35
                            }}
                            transition={{
                                duration: 0.3,
                                delay:
                                    index *
                                    0.05
                            }}
                            className={`h-1.5 flex-1 origin-left rounded-full ${index <
                                score
                                ? "bg-gradient-to-br from-[#FFDE8A] via-[#F0C24B] to-[#B8842A]"
                                : "bg-white/[0.06]"
                                }`}
                        />

                    )
                )}

            </div>


            <p className="mt-2 text-[9px] text-gray-700">

                Use 8+ characters with uppercase,
                numbers and special characters.

            </p>

        </div>
    );
}


/* =========================================================
   EXPORT
========================================================= */

export default Settings;
