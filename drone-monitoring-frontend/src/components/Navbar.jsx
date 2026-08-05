import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Search,
    Bell,
    LogOut,
    ShieldCheck,
    CalendarDays,
    Clock3,
    PanelLeft
} from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
function Navbar() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username") || "Operator";

    const role = localStorage.getItem("role") || "VIEWER";
    const { toggleSidebar } = useSidebar();
    const [date, setDate] = useState("");

    const [time, setTime] = useState("");

    useEffect(() => {

        function updateClock() {

            const now = new Date();

            setDate(

                now.toLocaleDateString("en-IN", {

                    day: "2-digit",

                    month: "short",

                    year: "numeric"

                })

            );

            setTime(

                now.toLocaleTimeString("en-IN", {

                    hour: "2-digit",

                    minute: "2-digit",

                    second: "2-digit",

                    hour12: true

                })

            );

        }

        updateClock();

        const timer = setInterval(updateClock, 1000);

        return () => clearInterval(timer);

    }, []);

    function logout() {

        localStorage.clear();

        navigate("/");

    }

    function roleColor() {

        switch (role) {

            case "ADMIN":

                return "text-[#D4AF37]";

            case "OPERATOR":

                return "text-blue-400";

            default:

                return "text-gray-400";

        }

    }

    return (

        <header className="sticky top-0 z-50 border-b border-[#232323] bg-[#0A0A0A]/95 backdrop-blur-xl">

            <div className="mx-auto flex h-20 items-center justify-between px-8">

                {/* LEFT */}

                <div className="flex flex-1 items-center gap-6 min-w-0">

                    {/* Sidebar Toggle */}

                    <button

                        onClick={toggleSidebar}

                        className="
            flex
            h-12
            w-12
            flex-shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-[#262626]
            bg-[#111111]
            text-gray-400
            transition-all
            duration-300
            hover:border-[#D4AF37]
            hover:bg-[#171717]
            hover:text-[#D4AF37]
        "

                    >

                        <PanelLeft size={20} />

                    </button>

                    {/* Title */}

                    <div className="min-w-[180px]">

                        <h1 className="text-2xl font-black tracking-[0.25em] text-white">

                            FLEET OPS

                        </h1>

                        <div className="mt-2 h-[3px] w-14 rounded-full bg-[#D4AF37]" />

                        <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-gray-500">

                            Drone Fleet Platform

                        </p>

                    </div>

                    {/* Search */}

                    <div className="relative flex-1 max-w-[360px] xl:max-w-[420px]">

                        <Search

                            size={18}

                            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"

                        />

                        <input

                            type="text"

                            placeholder="Search drones, operators, missions..."

                            className="
                h-12
                w-full
                rounded-2xl
                border
                border-[#262626]
                bg-[#111111]
                pl-14
                pr-5
                text-white
                placeholder:text-gray-500
                outline-none
                transition-all
                duration-300
                focus:border-[#D4AF37]
                focus:ring-2
                focus:ring-[#D4AF37]/20
            "

                        />

                    </div>

                </div>

                {/* RIGHT */}

                <div className="flex items-center gap-5">

                    {/* DATE */}

                    <div className="flex h-14 items-center gap-2 rounded-2xl border border-[#262626] bg-[#111111] px-4">

                        <CalendarDays

                            size={16}

                            className="text-[#D4AF37]"

                        />

                        <span className="text-sm text-gray-300">

                            {date}

                        </span>

                    </div>

                    {/* TIME */}

                    <div className="flex h-14 items-center gap-2 rounded-2xl border border-[#262626] bg-[#111111] px-4">

                        <Clock3

                            size={16}

                            className="text-[#D4AF37]"

                        />

                        <span className="text-lg font-bold tabular-nums text-white">

                            {time}

                        </span>

                    </div>
                    {/* NOTIFICATIONS */}

                    <button

                        className="
                            relative
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-[#262626]
                            bg-[#111111]
                            transition-all
                            duration-300
                            hover:border-[#D4AF37]
                            hover:bg-[#171717]
                        "

                    >

                        <Bell
                            size={19}
                            className="text-white"
                        />

                        <span
                            className="
                                absolute
                                right-4
                                top-4
                                h-2
                                w-2
                                rounded-full
                                bg-red-500
                            "
                        />

                    </button>

                    {/* USER */}

                    <div

                        className="
                            flex
                            h-14
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            border-[#262626]
                            bg-[#111111]
                            px-4
                        "

                    >

                        <div

                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-[#D4AF37]/30
                                bg-[#181818]
                                font-bold
                                text-white
                            "

                        >

                            {username.charAt(0).toUpperCase()}

                        </div>

                        <div>

                            <h2 className="text-sm font-semibold leading-none text-white">

                                {username}

                            </h2>

                            <div

                                className={`mt-1 flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] ${roleColor()}`}

                            >

                                <ShieldCheck size={12} />

                                {role}

                            </div>

                        </div>

                    </div>

                    {/* LOGOUT */}

                    <button

                        onClick={logout}

                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-[#262626]
                            bg-[#111111]
                            transition-all
                            duration-300
                            hover:border-red-500
                            hover:bg-red-500
                            hover:text-white
                        "

                    >

                        <LogOut size={19} />

                    </button>

                </div>

            </div>

        </header>

    );

}

export default Navbar;