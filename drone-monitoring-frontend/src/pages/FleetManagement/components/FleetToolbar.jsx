import { motion } from "motion/react";

import {
    Search,
    LayoutGrid,
    Table,
    Download,
    ArrowUpDown,
    SlidersHorizontal
} from "lucide-react";

function FleetToolbar({
    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    view,
    setView,

    sortBy,
    setSortBy
}) {
    const filters = [
        "ALL",
        "ONLINE",
        "OFFLINE",
        "WARNING"
    ];

    return (
        <motion.section
            initial={{
                opacity: 0,
                y: 15
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.45,
                delay: 0.15
            }}
            className="
                relative
                overflow-hidden
                rounded-[26px]
                border
                border-white/[0.08]
                border-t-white/[0.16]
                bg-white/[0.025]
                p-5
                backdrop-blur-xl
                shadow-[0_20px_70px_rgba(0,0,0,.30)]
            "
        >
            {/* Ambient gold glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-64
                    w-64
                    rounded-full
                    bg-[#F0C24B]/[0.07]
                    blur-[100px]
                "
            />

            {/* Ambient violet glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-20
                    -bottom-20
                    h-56
                    w-56
                    rounded-full
                    bg-[#8B6BD8]/[0.05]
                    blur-[100px]
                "
            />

            {/* Shine sweep */}

            <motion.div
                aria-hidden="true"
                initial={{ left: "-60%" }}
                animate={{ left: "130%" }}
                transition={{
                    repeat: Infinity,
                    repeatDelay: 7,
                    delay: 2.4,
                    duration: 2,
                    ease: "easeInOut"
                }}
                className="
                    pointer-events-none
                    absolute
                    top-0
                    h-full
                    w-[30%]
                    -skew-x-[20deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.05]
                    to-transparent
                "
            />

            <div className="relative z-10">

                <div className="
                    flex
                    flex-col
                    gap-5
                    xl:flex-row
                    xl:items-center
                    xl:justify-between
                ">

                    {/* =========================
                        SEARCH
                    ========================= */}

                    <div className="w-full xl:max-w-md">

                        <div className="relative">

                            <Search
                                size={18}
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-600
                                "
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                placeholder="Search drone, model or serial..."
                                className="
                                    h-12
                                    w-full
                                    rounded-2xl
                                    border
                                    border-white/[0.08]
                                    bg-black/20
                                    pl-11
                                    pr-12
                                    text-sm
                                    text-white
                                    outline-none
                                    placeholder:text-gray-600
                                    transition-all
                                    duration-300
                                    focus:border-[#F0C24B]/45
                                    focus:bg-white/[0.045]
                                    focus:shadow-[0_0_30px_rgba(240,194,75,.1)]
                                "
                            />

                            {search && (
                                <button
                                    onClick={() =>
                                        setSearch("")
                                    }
                                    className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-xs
                                        text-gray-600
                                        transition
                                        hover:text-white
                                    "
                                >
                                    ESC
                                </button>
                            )}

                        </div>

                    </div>

                    {/* =========================
                        STATUS FILTERS
                    ========================= */}

                    <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                    ">

                        <div className="
                            mr-1
                            hidden
                            items-center
                            gap-2
                            text-xs
                            uppercase
                            tracking-[0.2em]
                            text-gray-600
                            2xl:flex
                        ">
                            <SlidersHorizontal
                                size={14}
                            />

                            Status
                        </div>

                        {filters.map(
                            (filter) => {

                                const active =
                                    statusFilter ===
                                    filter;

                                return (
                                    <motion.button
                                        key={filter}
                                        whileHover={{
                                            y: -2
                                        }}
                                        whileTap={{
                                            scale: 0.96
                                        }}
                                        onClick={() =>
                                            setStatusFilter(
                                                filter
                                            )
                                        }
                                        className={`
                                            rounded-xl
                                            px-4
                                            py-2.5
                                            text-xs
                                            font-semibold
                                            tracking-[0.08em]
                                            transition-all
                                            duration-300

                                            ${
                                                active
                                                    ? `
                                                        border
                                                        border-[#F0C24B]/45
                                                        bg-[var(--aerion-primary-soft)]
                                                        text-[var(--aerion-primary)]
                                                        shadow-[0_0_22px_rgba(240,194,75,.15)]
                                                    `
                                                    : `
                                                        border
                                                        border-white/[0.07]
                                                        bg-white/[0.025]
                                                        text-gray-500
                                                        hover:border-white/[0.15]
                                                        hover:text-gray-300
                                                    `
                                            }
                                        `}
                                    >
                                        {filter}
                                    </motion.button>
                                );
                            }
                        )}

                    </div>

                    {/* =========================
                        CONTROLS
                    ========================= */}

                    <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                    ">

                        {/* Sort */}

                        <div className="relative">

                            <ArrowUpDown
                                size={15}
                                className="
                                    pointer-events-none
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-600
                                "
                            />

                            <select
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(
                                        e.target.value
                                    )
                                }
                                className="
                                    h-11
                                    appearance-none
                                    rounded-xl
                                    border
                                    border-white/[0.08]
                                    bg-black/20
                                    py-2
                                    pl-9
                                    pr-9
                                    text-xs
                                    font-medium
                                    text-gray-300
                                    outline-none
                                    transition-all
                                    duration-300
                                    hover:border-white/[0.15]
                                    focus:border-[#F0C24B]/45
                                "
                            >
                                <option value="name">
                                    Name
                                </option>

                                <option value="battery">
                                    Battery
                                </option>

                                <option value="status">
                                    Status
                                </option>

                                <option value="altitude">
                                    Altitude
                                </option>

                                <option value="signal">
                                    Signal
                                </option>
                            </select>

                        </div>

                        {/* View switch */}

                        <div className="
                            flex
                            rounded-xl
                            border
                            border-white/[0.08]
                            bg-black/20
                            p-1
                        ">

                            <motion.button
                                whileTap={{
                                    scale: 0.92
                                }}
                                onClick={() =>
                                    setView("grid")
                                }
                                className={`
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-lg
                                    transition-all
                                    duration-300

                                    ${
                                        view === "grid"
                                            ? `
                                                bg-gradient-to-br
                                                from-[#FFDE8A]
                                                via-[#F0C24B]
                                                to-[#B8842A]
                                                text-black
                                                shadow-[0_0_18px_rgba(240,194,75,.3)]
                                            `
                                            : `
                                                text-gray-600
                                                hover:text-gray-300
                                            `
                                    }
                                `}
                            >
                                <LayoutGrid
                                    size={17}
                                />
                            </motion.button>

                            <motion.button
                                whileTap={{
                                    scale: 0.92
                                }}
                                onClick={() =>
                                    setView("table")
                                }
                                className={`
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-lg
                                    transition-all
                                    duration-300

                                    ${
                                        view === "table"
                                            ? `
                                                bg-gradient-to-br
                                                from-[#FFDE8A]
                                                via-[#F0C24B]
                                                to-[#B8842A]
                                                text-black
                                                shadow-[0_0_18px_rgba(240,194,75,.3)]
                                            `
                                            : `
                                                text-gray-600
                                                hover:text-gray-300
                                            `
                                    }
                                `}
                            >
                                <Table
                                    size={17}
                                />
                            </motion.button>

                        </div>

                        {/* Export */}

                        <motion.button
                            whileHover={{
                                y: -2
                            }}
                            whileTap={{
                                scale: 0.96
                            }}
                            className="
                                flex
                                h-11
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-white/[0.08]
                                bg-white/[0.025]
                                px-4
                                text-xs
                                font-semibold
                                text-gray-400
                                transition-all
                                duration-300
                                hover:border-[#F0C24B]/30
                                hover:text-[var(--aerion-primary)]
                            "
                        >
                            <Download
                                size={16}
                            />

                            <span className="hidden sm:inline">
                                Export
                            </span>
                        </motion.button>

                    </div>

                </div>

            </div>
        </motion.section>
    );
}

export default FleetToolbar;