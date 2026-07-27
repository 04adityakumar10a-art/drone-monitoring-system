import { NavLink } from "react-router-dom";

function Sidebar() {

    const role = localStorage.getItem("role");

    const username = localStorage.getItem("username");

    const menuClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive
                ? "bg-cyan-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-slate-800 hover:text-cyan-400"
        }`;

    return (

        <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between">

            <div>

                {/* Logo */}

                <div className="p-6 border-b border-slate-800">

                    <h1 className="text font-bold text-cyan-200">

                        🚁 Drone Monitor

                    </h1>

                    <p className="text-gray-400 text-sm mt-1">

                        Navigation

                    </p>

                </div>

                {/* Menu */}

                <nav className="p-4 space-y-2">

                    <NavLink

                        to="/dashboard"

                        className={menuClass}

                    >

                        <span className="text-xl">📊</span>

                        Dashboard

                    </NavLink>

                    <NavLink

                        to="/drones"

                        className={menuClass}

                    >

                        <span className="text-xl">🚁</span>

                        Drones

                    </NavLink>

                    {role === "ADMIN" && (

                        <NavLink

                            to="/users"

                            className={menuClass}

                        >

                            <span className="text-xl">👤</span>

                            Users

                        </NavLink>

                    )}

                </nav>

            </div>

            {/* Footer */}

            <div className="border-t border-slate-800 p-5">

                <p className="text-gray-400 text-xs">

                    Logged in as

                </p>

                <h2 className="text-white font-semibold mt-1">

                    {username}

                </h2>

                <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        role === "ADMIN"
                            ? "bg-red-500"
                            : role === "OPERATOR"
                            ? "bg-amber-500"
                            : "bg-cyan-500"
                    }`}
                >

                    {role}

                </span>

            </div>

        </aside>

    );

}

export default Sidebar;