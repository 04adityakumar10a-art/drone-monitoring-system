import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
    Search,
    Bell,
    Shield,
    CalendarDays,
    PanelLeft,
    LogOut,
    Settings,
    UserRound,
    CircleCheck,
    ChevronDown
} from "lucide-react";

import { useSidebar } from "../context/SidebarContext";


function Navbar() {

    const navigate = useNavigate();

    const username =
        localStorage.getItem("username") || "Operator";

    const role =
        localStorage.getItem("role") || "VIEWER";

    const { toggleSidebar } = useSidebar();

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [profileOpen, setProfileOpen] = useState(false);

    const profileRef = useRef(null);


    /* =====================================================
       CLOCK
    ===================================================== */

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

        const interval = setInterval(
            updateClock,
            1000
        );

        return () => clearInterval(interval);

    }, []);


    /* =====================================================
       CLOSE PROFILE
    ===================================================== */

    useEffect(() => {

        function handleOutsideClick(event) {

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }

        }

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

        };

    }, []);


    /* =====================================================
       ESCAPE
    ===================================================== */

    useEffect(() => {

        function handleEscape(event) {

            if (event.key === "Escape") {
                setProfileOpen(false);
            }

        }

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {

            document.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, []);


    /* =====================================================
       LOGOUT
    ===================================================== */

    function logout() {

        localStorage.clear();

        setProfileOpen(false);

        navigate("/", {
            replace: true
        });

    }


    /* =====================================================
       ROLE
    ===================================================== */

    function getRoleLabel() {

        switch (role) {

            case "ADMIN":
                return "ADMIN";

            case "OPERATOR":
                return "OPERATOR";

            default:
                return "VIEWER";

        }

    }


    function getRoleColor() {

        switch (role) {

            case "ADMIN":
                return "text-[#F0C24B]";

            case "OPERATOR":
                return "text-[#4FD1E3]";

            default:
                return "text-gray-400";

        }

    }


    /* =====================================================
       PROFILE CARD
    ===================================================== */

    function ProfileCard() {

        return (

            <motion.div

                initial={{
                    opacity: 0,
                    y: -8,
                    scale: 0.96
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                }}

                exit={{
                    opacity: 0,
                    y: -6,
                    scale: 0.97
                }}

                transition={{
                    duration: 0.18,
                    ease: [0.16, 1, 0.3, 1]
                }}

                className="
                    absolute
                    right-0
                    top-[calc(100%+12px)]
                    z-[99999]
                    w-[290px]
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/[0.14]
                    bg-[#0b0c0f]/90
                    shadow-[0_25px_80px_rgba(0,0,0,.65)]
                    backdrop-blur-3xl
                "
            >

                {/* TOP GOLD GLOW */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-20
                        h-40
                        w-40
                        rounded-full
                        bg-[#F0C24B]/10
                        blur-3xl
                    "
                />


                {/* TOP GOLD LINE */}

                <div
                    className="
                        absolute
                        left-8
                        right-8
                        top-0
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-[#F0C24B]
                        to-transparent
                    "
                />


                {/* PROFILE HEADER */}

                <div className="relative p-5">

                    <div className="flex items-center gap-3">

                        {/* AVATAR */}

                        <div
                            className="
                                relative
                                flex
                                h-12
                                w-12
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-gradient-to-br
                                from-[#FFE9A8]
                                via-[#F0C24B]
                                to-[#B8842A]
                                text-base
                                font-black
                                text-[#2A1F05]
                                shadow-[0_0_25px_rgba(240,194,75,.25)]
                            "
                        >

                            {username
                                .charAt(0)
                                .toUpperCase()}

                            {/* ONLINE DOT */}

                            <span
                                className="
                                    absolute
                                    -bottom-1
                                    -right-1
                                    h-3.5
                                    w-3.5
                                    rounded-full
                                    border-2
                                    border-[#0b0c0f]
                                    bg-[#4FD1A3]
                                    shadow-[0_0_8px_rgba(79,209,163,.8)]
                                "
                            />

                        </div>


                        {/* NAME */}

                        <div className="min-w-0">

                            <p
                                className="
                                    truncate
                                    text-sm
                                    font-bold
                                    text-[#FBF8F2]
                                "
                            >
                                {username}
                            </p>

                            <p
                                className={`
                                    mt-1
                                    flex
                                    items-center
                                    gap-1
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.12em]
                                    ${getRoleColor()}
                                `}
                            >

                                <Shield size={10} />

                                {getRoleLabel()}

                            </p>

                        </div>

                    </div>


                    {/* STATUS */}

                    <div
                        className="
                            mt-5
                            flex
                            items-center
                            justify-between
                            rounded-xl
                            border
                            border-white/[0.08]
                            bg-white/[0.035]
                            px-3
                            py-2.5
                        "
                    >

                        <div className="flex items-center gap-2">

                            <CircleCheck
                                size={14}
                                className="text-[#4FD1A3]"
                            />

                            <span
                                className="
                                    text-[11px]
                                    text-gray-400
                                "
                            >
                                System account
                            </span>

                        </div>

                        <span
                            className="
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[0.12em]
                                text-[#4FD1A3]
                            "
                        >
                            Active
                        </span>

                    </div>

                </div>


                {/* MENU */}

                <div
                    className="
                        border-t
                        border-white/[0.07]
                        p-2
                    "
                >

                    {/* PROFILE */}

                    <button
                        type="button"
                        onClick={() => {

                            setProfileOpen(false);

                            navigate("/settings");

                        }}
                        className="
                            group
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            text-left
                            transition-all
                            duration-200
                            hover:bg-white/[0.07]
                        "
                    >

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-white/[0.08]
                                bg-white/[0.04]
                                text-gray-500
                                transition
                                group-hover:border-[#F0C24B]/30
                                group-hover:bg-[#F0C24B]/10
                                group-hover:text-[#F0C24B]
                            "
                        >

                            <UserRound size={15} />

                        </div>

                        <div>

                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    text-gray-300
                                    group-hover:text-white
                                "
                            >
                                Profile & Settings
                            </p>

                            <p
                                className="
                                    mt-0.5
                                    text-[9px]
                                    text-gray-600
                                "
                            >
                                Manage your account
                            </p>

                        </div>

                    </button>


                    {/* SETTINGS */}

                    <button
                        type="button"
                        onClick={() => {

                            setProfileOpen(false);

                            navigate("/settings");

                        }}
                        className="
                            group
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            text-left
                            transition-all
                            duration-200
                            hover:bg-white/[0.07]
                        "
                    >

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-white/[0.08]
                                bg-white/[0.04]
                                text-gray-500
                                transition
                                group-hover:border-[#F0C24B]/30
                                group-hover:bg-[#F0C24B]/10
                                group-hover:text-[#F0C24B]
                            "
                        >

                            <Settings size={15} />

                        </div>

                        <div>

                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    text-gray-300
                                    group-hover:text-white
                                "
                            >
                                System Settings
                            </p>

                            <p
                                className="
                                    mt-0.5
                                    text-[9px]
                                    text-gray-600
                                "
                            >
                                Interface & security
                            </p>

                        </div>

                    </button>


                    {/* DIVIDER */}

                    <div
                        className="
                            my-1
                            h-px
                            bg-white/[0.06]
                        "
                    />


                    {/* LOGOUT */}

                    <button
                        type="button"
                        onClick={logout}
                        className="
                            group
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            text-left
                            transition-all
                            duration-200
                            hover:bg-red-500/[0.08]
                        "
                    >

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-white/[0.08]
                                bg-white/[0.04]
                                text-gray-500
                                transition
                                group-hover:border-red-500/30
                                group-hover:bg-red-500/10
                                group-hover:text-red-400
                            "
                        >

                            <LogOut size={15} />

                        </div>

                        <div>

                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    text-gray-300
                                    group-hover:text-red-400
                                "
                            >
                                Sign Out
                            </p>

                            <p
                                className="
                                    mt-0.5
                                    text-[9px]
                                    text-gray-600
                                "
                            >
                                End current session
                            </p>

                        </div>

                    </button>

                </div>

            </motion.div>

        );

    }


    return (

        <header
            className="
        relative
        z-[100]
        mx-[22px]
        mt-[22px]
        rounded-[18px]
        border
        border-white/[0.14]
        border-t-white/[0.28]
        bg-gradient-to-b
        from-white/[0.07]
        to-white/[0.03]
        shadow-[0_20px_50px_rgba(0,0,0,.55)]
        backdrop-blur-[22px]
        supports-[backdrop-filter]:bg-white/[0.045]
    "
        >

            {/* =================================================
               SHINE SWEEP
            ================================================= */}

            <motion.div
                animate={{
                    left: [
                        "-60%",
                        "-60%",
                        "130%"
                    ]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="
                    pointer-events-none
                    absolute
                    top-0
                    h-full
                    w-[40%]
                    skew-x-[-20deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/10
                    to-transparent
                "
            />


            {/* =================================================
               HEADER CONTENT
            ================================================= */}

            <div
                className="
                    relative
                    flex
                    min-h-[68px]
                    items-center
                    gap-4
                    px-[18px]
                    py-[13px]
                "
            >

                {/* =================================================
                   SIDEBAR
                ================================================= */}

                <motion.button

                    type="button"

                    onClick={toggleSidebar}

                    whileHover={{
                        y: -1,
                        scale: 1.03
                    }}

                    whileTap={{
                        scale: 0.94
                    }}

                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-[11px]
                        border
                        border-white/[0.14]
                        bg-white/[0.075]
                        text-white/60
                        transition-all
                        hover:border-white/[0.24]
                        hover:bg-white/[0.13]
                        hover:text-white
                    "
                >

                    <PanelLeft
                        size={17}
                        strokeWidth={1.7}
                    />

                </motion.button>


                {/* =================================================
                   BRAND
                ================================================= */}

                <div
                    className="
                        flex
                        shrink-0
                        flex-col
                        pr-1
                    "
                >

                    <div
                        className="
                            bg-gradient-to-r
                            from-[#FFF3D2]
                            via-[#F0C24B]
                            to-[#B8842A]
                            bg-clip-text
                            text-[20px]
                            font-black
                            tracking-[0.2em]
                            text-transparent
                            drop-shadow-[0_0_14px_rgba(240,194,75,.35)]
                        "
                    >
                        FLEET OPS
                    </div>

                    <div
                        className="
                            mt-[6px]
                            ml-px
                            h-[2px]
                            w-20
                            bg-gradient-to-r
                            from-[#F0C24B]
                            to-transparent
                            shadow-[0_0_8px_rgba(240,194,75,.6)]
                        "
                    />

                    <div
                        className="
                            mt-1
                            text-[9px]
                            font-bold
                            tracking-[0.24em]
                            text-white/30
                        "
                    >
                        DRONE FLEET PLATFORM
                    </div>

                </div>


                {/* =================================================
                   SEARCH
                ================================================= */}

                <div
                    className="
                        group
                        flex
                        min-w-[220px]
                        flex-1
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/[0.14]
                        bg-white/[0.045]
                        px-[15px]
                        py-[11px]
                        transition-all
                        focus-within:border-[#F0C24B]/50
                        focus-within:bg-white/[0.07]
                        focus-within:shadow-[0_0_0_3px_rgba(240,194,75,.08)]
                    "
                >

                    <Search
                        size={17}
                        strokeWidth={1.7}
                        className="
                            shrink-0
                            text-white/30
                        "
                    />

                    <input
                        type="text"
                        placeholder="Search drones, operators, missions..."
                        className="
                            min-w-0
                            flex-1
                            border-none
                            bg-transparent
                            text-[13px]
                            text-white
                            outline-none
                            placeholder:text-white/30
                        "
                    />

                    <span
                        className="
                            hidden
                            rounded-[5px]
                            border
                            border-white/[0.14]
                            bg-white/[0.04]
                            px-1.5
                            py-0.5
                            text-[10px]
                            font-semibold
                            text-white/30
                            lg:block
                        "
                    >
                        ⌘K
                    </span>

                </div>


                {/* =================================================
                   DATE
                ================================================= */}

                <div
                    className="
                        hidden
                        shrink-0
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/[0.14]
                        bg-white/[0.075]
                        px-[15px]
                        py-[10px]
                        text-[12.5px]
                        text-white/60
                        xl:flex
                    "
                >

                    <CalendarDays
                        size={14}
                        className="text-[#F0C24B]"
                    />

                    {date}

                </div>


                {/* =================================================
                   CLOCK
                ================================================= */}

                <div
                    className="
                        hidden
                        shrink-0
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/[0.14]
                        bg-white/[0.075]
                        px-[15px]
                        py-[10px]
                        text-[12.5px]
                        font-bold
                        tabular-nums
                        text-white
                        lg:flex
                    "
                >

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
                        className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-[#4FD1E3]
                            shadow-[0_0_8px_#4FD1E3]
                        "
                    />

                    {time}

                </div>


                {/* =================================================
                   NOTIFICATION
                ================================================= */}

                <motion.button

                    type="button"

                    whileHover={{
                        y: -1
                    }}

                    whileTap={{
                        scale: 0.94
                    }}

                    className="
                        relative
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-[11px]
                        border
                        border-white/[0.14]
                        bg-white/[0.075]
                        text-white/60
                        transition-all
                        hover:border-white/[0.24]
                        hover:bg-white/[0.13]
                        hover:text-white
                    "
                >

                    <Bell
                        size={17}
                        strokeWidth={1.7}
                    />

                    <span
                        className="
                            absolute
                            right-2
                            top-2
                            h-2
                            w-2
                            rounded-full
                            bg-[#FF5C6C]
                            shadow-[0_0_0_3px_rgba(5,5,7,.9),0_0_8px_rgba(255,92,108,.8)]
                        "
                    />

                </motion.button>


                {/* =================================================
                   PROFILE
                ================================================= */}

                <div
                    ref={profileRef}
                    className="
                        relative
                        shrink-0
                    "
                >

                    <motion.button

                        type="button"

                        onClick={() =>
                            setProfileOpen(
                                previous =>
                                    !previous
                            )
                        }

                        whileHover={{
                            y: -1
                        }}

                        whileTap={{
                            scale: 0.97
                        }}

                        className="
                            flex
                            items-center
                            gap-2.5
                            rounded-xl
                            border
                            border-white/[0.14]
                            bg-white/[0.075]
                            px-[15px]
                            py-[6px]
                            pl-[6px]
                            transition-all
                            hover:border-white/[0.22]
                            hover:bg-white/10
                        "
                    >

                        {/* AVATAR */}

                        <div
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-[10px]
                                bg-gradient-to-br
                                from-[#FFE9A8]
                                via-[#F0C24B]
                                to-[#B8842A]
                                text-[13px]
                                font-extrabold
                                text-[#2A1F05]
                                shadow-[0_0_0_1px_rgba(255,255,255,.25)_inset,0_2px_10px_rgba(240,194,75,.35)]
                            "
                        >

                            {username
                                .charAt(0)
                                .toUpperCase()}

                        </div>


                        {/* USER */}

                        <div
                            className="
                                hidden
                                flex-col
                                text-left
                                leading-[1.3]
                                sm:flex
                            "
                        >

                            <span
                                className="
                                    text-[12.5px]
                                    font-bold
                                    text-[#FBF8F2]
                                "
                            >
                                {username}
                            </span>

                            <span
                                className={`
                                    flex
                                    items-center
                                    gap-[3px]
                                    text-[9.5px]
                                    font-bold
                                    tracking-[0.07em]
                                    ${getRoleColor()}
                                `}
                            >

                                <Shield
                                    size={9}
                                />

                                {getRoleLabel()}

                            </span>

                        </div>


                        <motion.div
                            animate={{
                                rotate:
                                    profileOpen
                                        ? 180
                                        : 0
                            }}
                        >

                            <ChevronDown
                                size={13}
                                className="
                                    text-white/30
                                "
                            />

                        </motion.div>

                    </motion.button>


                    <AnimatePresence>

                        {profileOpen && (
                            <ProfileCard />
                        )}

                    </AnimatePresence>

                </div>

            </div>

        </header>

    );

}


export default Navbar;