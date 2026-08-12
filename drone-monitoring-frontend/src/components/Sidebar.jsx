import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import {
    LayoutDashboard,
    Plane,
    Radar,
    Users,
    Activity,
    Settings,
    FileText
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

import Logo from "./branding/Logo";

import { useSidebar } from "../context/SidebarContext";

/* =========================================================
   NAV ITEM
   Wraps NavLink with an icon chip, optional caption/badge,
   and an animated active accent bar.
========================================================= */

function NavItem({
    to,
    icon: Icon,
    label,
    caption,
    collapsed,
    compactMode
}) {

    return (

        <NavLink to={to}>

            {({ isActive }) => (

                <motion.div
                    whileHover={{
                        x: collapsed ? 0 : 3
                    }}
                    transition={{
                        duration: 0.18
                    }}
                    className={`
                        group
                        relative
                        flex
                        items-center

                        ${collapsed
                            ? "justify-center gap-0 px-0"
                            : "gap-3 px-3"
                        }

                        ${compactMode
                            ? "py-2"
                            : "py-2.5"
                        }

                        rounded-2xl
                        border
                        transition-all
                        duration-300

                        ${isActive
                            ? `
                                border-[#F0C24B]/25
                                bg-gradient-to-r
                                from-[#F0C24B]/[0.16]
                                to-[#F0C24B]/[0.02]
                                text-white
                                shadow-[0_6px_20px_rgba(240,194,75,0.12),inset_0_1px_0_rgba(255,255,255,0.05)]
                            `
                            : `
                                border-transparent
                                text-gray-500
                                hover:border-white/[0.08]
                                hover:bg-white/[0.04]
                                hover:text-white
                            `
                        }
                    `}
                >

                    {/* ACTIVE ACCENT BAR */}

                    {isActive && !collapsed && (

                        <motion.span
                            layoutId="sidebar-active-bar"
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 35
                            }}
                            className="
                                absolute
                                -left-3
                                top-1/2
                                h-6
                                w-[3px]
                                -translate-y-1/2
                                rounded-full
                                bg-gradient-to-b
                                from-[#F0C24B]
                                to-[#B8842A]
                                shadow-[0_0_10px_rgba(240,194,75,0.8)]
                            "
                        />

                    )}

                    {/* ICON CHIP */}

                    <div
                        className={`
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            transition-all
                            duration-300

                            ${isActive
                                ? `
                                    border-[#F0C24B]/40
                                    bg-gradient-to-br
                                    from-[#F0C24B]/[0.22]
                                    to-[#F0C24B]/[0.04]
                                    text-[var(--aerion-primary)]
                                    shadow-[0_0_14px_rgba(240,194,75,0.25)]
                                `
                                : `
                                    border-white/[0.06]
                                    bg-white/[0.03]
                                    text-gray-500
                                    group-hover:border-cyan-400/25
                                    group-hover:text-cyan-400
                                `
                            }
                        `}
                    >
                        <Icon size={17} />
                    </div>

                    {/* LABEL + CAPTION */}

                    {!collapsed && (

                        <div className="min-w-0 flex-1">

                            <p className="truncate text-sm font-semibold">
                                {label}
                            </p>

                            {caption && (

                                <p className="mt-0.5 truncate text-[10px] text-gray-600">
                                    {caption}
                                </p>

                            )}

                        </div>

                    )}

                </motion.div>

            )}

        </NavLink>

    );

}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar() {

    const {
        compactMode
    } = useTheme();

    const role = localStorage.getItem("role") || "VIEWER";

    const username =
        localStorage.getItem("username") || "Operator";

    const { collapsed } = useSidebar();

    const initials =
        username.slice(0, 2).toUpperCase();

    const navGroups = [

        {
            label: "OPERATIONS",
            items: [
                { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", caption: "Overview & KPIs" },
                { to: "/drones", icon: Plane, label: "Fleet", caption: "Registered aircraft" },
                { to: "/mission-control", icon: Radar, label: "Mission Control", caption: "Live ground station" }
            ]
        },
        {
            label: "INSIGHTS",
            items: [
                { to: "/analytics", icon: Activity, label: "Analytics", caption: "Trends & telemetry" },
                { to: "/reports", icon: FileText, label: "Reports", caption: "Exports & logs" }
            ]
        },
        {
            label: "MANAGEMENT",
            items: [
                { to: "/settings", icon: Settings, label: "Settings", caption: "System configuration" },
                ...(role === "ADMIN"
                    ? [{ to: "/users", icon: Users, label: "Operators", caption: "Team & permissions" }]
                    : [])
            ]
        }

    ];

    return (

        <aside

            className={`
                relative
                flex
                flex-col
                justify-between
                overflow-hidden
                border-r
                border-white/[0.08]
                bg-white/[0.04]
                backdrop-blur-2xl
                transition-all
                duration-300
                ease-in-out
                ${collapsed
                    ? "w-24"
                    : "w-72"
                }
            `}

        >

            {/* =========================
                AMBIENT GLOW
            ========================= */}

            <div className="pointer-events-none absolute inset-0 -z-10">

                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: "easeInOut"
                    }}
                    className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#F0C24B]/[0.09] blur-[110px]"
                />

                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        opacity: [0.5, 0.9, 0.5]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 12,
                        ease: "easeInOut"
                    }}
                    className="absolute -right-24 top-1/2 h-56 w-56 rounded-full bg-[#8B6BD8]/[0.07] blur-[110px]"
                />

                <div className="absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-[#4FD1E3]/[0.05] blur-[110px]" />

            </div>

            {/* EDGE GRADIENT LINE */}

            <div
                className="pointer-events-none absolute right-0 top-0 h-full w-px opacity-60"
                style={{
                    backgroundImage:
                        "linear-gradient(180deg, transparent, #F0C24B 15%, #8B6BD8 50%, #4FD1E3 85%, transparent)"
                }}
            />

            {/* SHINE SWEEP */}

            <motion.div
                aria-hidden="true"
                initial={{ left: "-70%" }}
                animate={{ left: "140%" }}
                transition={{
                    repeat: Infinity,
                    repeatDelay: 7,
                    duration: 2.2,
                    ease: "easeInOut"
                }}
                className="pointer-events-none absolute top-0 h-full w-[30%] -skew-x-[16deg] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
            />

            {/* =========================
                LOGO
            ========================= */}

            <div className="relative z-10">

                <div

                    className={`
                        border-b
                        border-white/[0.07]
                        transition-all
                        duration-300
                        ${collapsed
                            ? "p-4"
                            : "p-8"
                        }
                    `}

                >

                    <Logo collapsed={collapsed} />

                </div>


                {/* =========================
                    NAVIGATION
                ========================= */}

                <div

                    className={`
                        transition-all
                        duration-300
                        ${collapsed
                            ? "px-2 pt-6"
                            : "px-6 pt-8"
                        }
                    `}

                >

                    <nav className="space-y-6">

                        {navGroups.map((group, gi) => (

                            <div key={group.label}>

                                {!collapsed && (

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: gi * 0.08 }}
                                        className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-gray-600"
                                    >
                                        {group.label}
                                    </motion.p>

                                )}

                                <div className="space-y-2">

                                    {group.items.map((item, ii) => (

                                        <motion.div
                                            key={item.to}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: gi * 0.08 + ii * 0.05,
                                                duration: 0.35
                                            }}
                                        >

                                            <NavItem
                                                to={item.to}
                                                icon={item.icon}
                                                label={item.label}
                                                caption={item.caption}
                                                collapsed={collapsed}
                                                compactMode={compactMode}
                                            />

                                        </motion.div>

                                    ))}

                                </div>

                            </div>

                        ))}

                    </nav>

                </div>

            </div>


            {/* =========================
                BOTTOM PANEL
            ========================= */}

            <div

                className={`
                    relative
                    z-10
                    border-t
                    border-white/[0.07]
                    transition-all
                    duration-300
                    ${collapsed
                        ? "p-3"
                        : "p-6"
                    }
                `}

            >

                <div

                    className={`
                        rounded-2xl
                        border
                        border-white/[0.08]
                        bg-white/[0.035]
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        ${collapsed
                            ? "p-3"
                            : "p-5"
                        }
                    `}

                >

                    {/* SYSTEM STATUS */}

                    <div

                        className={`
                            flex
                            items-center
                            ${collapsed
                                ? "justify-center"
                                : "gap-2"
                            }
                        `}

                    >

                        <motion.span
                            animate={{
                                opacity: [1, 0.4, 1]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.8
                            }}
                            className="h-2 w-2 shrink-0 rounded-full bg-[var(--aerion-success)] shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                        />

                        {!collapsed && (

                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--aerion-success)]">

                                System Online

                            </span>

                        )}

                    </div>


                    {/* USER */}

                    {!collapsed && (

                        <>

                            <div className="mt-5 flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-gradient-to-br
                                        from-[#FFE9A8]
                                        via-[#F0C24B]
                                        to-[#B8842A]
                                        text-sm
                                        font-black
                                        text-[#2A1F05]
                                        shadow-[0_0_0_1px_rgba(255,255,255,0.25)_inset]
                                    "
                                >
                                    {initials}
                                </div>

                                <div className="min-w-0">

                                    <p className="text-[10px] uppercase tracking-[0.22em] text-gray-600">

                                        Operator

                                    </p>

                                    <h2 className="truncate text-sm font-semibold text-white">

                                        {username}

                                    </h2>

                                </div>

                            </div>


                            {/* ROLE */}

                            <div className="mt-4">

                                <span className="rounded-full border border-[#F0C24B]/30 bg-[var(--aerion-primary-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--aerion-primary)]">

                                    {role}

                                </span>

                            </div>

                        </>

                    )}

                </div>

            </div>

        </aside>

    );
}

export default Sidebar;