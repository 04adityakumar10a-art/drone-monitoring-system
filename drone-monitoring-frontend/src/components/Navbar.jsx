import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username") || "User";

    const role = localStorage.getItem("role") || "VIEWER";

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        navigate("/");

    }

    function getRoleColor() {

        switch (role) {

            case "ADMIN":
                return "bg-red-500";

            case "OPERATOR":
                return "bg-amber-500";

            default:
                return "bg-cyan-500";

        }

    }

    return (

        <nav className="bg-slate-800 border-b border-slate-700 shadow-lg px-8 py-4 flex justify-between items-center">

            <div>

                <h1 className="text-3xl font-bold text-cyan-400">

                    🚁 Drone Monitoring System

                </h1>

                <p className="text-gray-400 text-sm">

                    Real-Time Fleet Management Dashboard

                </p>

            </div>

            <div className="flex items-center gap-5">

                <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center text-xl font-bold text-white">

                    {username.charAt(0).toUpperCase()}

                </div>

                <div className="text-right">

                    <h2 className="text-white font-semibold text-lg">

                        {username}

                    </h2>

                    <span
                        className={`${getRoleColor()} text-white text-xs px-3 py-1 rounded-full font-semibold`}
                    >
                        {role}
                    </span>

                </div>

                <button

                    onClick={logout}

                    className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-lg text-white font-semibold"

                >

                    🚪 Logout

                </button>

            </div>

        </nav>

    );

}

export default Navbar;