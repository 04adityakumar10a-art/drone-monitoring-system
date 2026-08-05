import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Plane,
    Radar,
    Users,
    Activity
} from "lucide-react";

import Logo from "./branding/Logo";

import { useSidebar } from "../context/SidebarContext";

function Sidebar() {

    const role = localStorage.getItem("role") || "VIEWER";

    const username = localStorage.getItem("username") || "Operator";

    const { collapsed } = useSidebar();

    const menuClass = ({ isActive }) => `
        group
        flex
        items-center
        ${collapsed ? "justify-center px-0" : "gap-4 px-4"}
        py-3
        rounded-2xl
        transition-all
        duration-300
        ${isActive
            ? "bg-[#181818] border-l-4 border-[#D4AF37] text-white shadow-[0_0_25px_rgba(212,175,55,.12)]"
            : "text-gray-400 hover:bg-[#141414] hover:text-white"
        }
    `;

    return (

        <aside

            className={`
                flex
                flex-col
                justify-between
                border-r
                border-[#232323]
                bg-[#090909]
                transition-all
                duration-300
                ease-in-out
                ${collapsed
                    ? "w-24"
                    : "w-72"
                }
            `}

        >

            {/* Logo */}

            <div>

                <div

                    className={`
                        border-b
                        border-[#1f1f1f]
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

                {/* Navigation */}

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

                    {!collapsed && (

                        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gray-500">

                            Navigation

                        </p>

                    )}

                    <nav className="space-y-2">

                        <NavLink
                            to="/dashboard"
                            className={menuClass}
                        >

                            <LayoutDashboard size={20} />

                            {!collapsed && "Dashboard"}

                        </NavLink>

                        <NavLink
                            to="/drones"
                            className={menuClass}
                        >

                            <Plane size={20} />

                            {!collapsed && "Fleet"}

                        </NavLink>

                        <NavLink
                            to="/mission-control"
                            className={menuClass}
                        >

                            <Radar size={20} />

                            {!collapsed && "Mission Control"}

                        </NavLink>

                        <NavLink
                            to="/analytics"
                            className={menuClass}
                        >

                            <Activity size={20} />

                            {!collapsed && "Analytics"}

                        </NavLink>

                        <NavLink
                            to="/reports"
                            className={menuClass}
                        >

                            <Activity size={20} />

                            {!collapsed && "Reports"}

                        </NavLink>

                        {role === "ADMIN" && (

                            <NavLink
                                to="/users"
                                className={menuClass}
                            >

                                <Users size={20} />

                                {!collapsed && "Operators"}

                            </NavLink>

                        )}

                    </nav>

                </div>

            </div>
            {/* Bottom */}

            <div

                className={`
                    border-t
                    border-[#1f1f1f]
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
                        border-[#232323]
                        bg-[#111111]
                        transition-all
                        duration-300
                        ${collapsed
                            ? "p-3"
                            : "p-5"
                        }
                    `}

                >

                    {/* System Status */}

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

                        <Activity

                            size={16}

                            className="text-green-500"

                        />

                        {!collapsed && (

                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-500">

                                System Online

                            </span>

                        )}

                    </div>

                    {/* User */}

                    {!collapsed && (

                        <>

                            <div className="mt-6">

                                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                                    Operator

                                </p>

                                <h2 className="mt-2 text-lg font-semibold text-white">

                                    {username}

                                </h2>

                            </div>

                            <div className="mt-5">

                                <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">

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