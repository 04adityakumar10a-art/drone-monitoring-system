import {
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";

import {
    AnimatePresence,
    motion
} from "motion/react";

import {
    ChevronUp,
    ChevronDown,
    Search,
    ArrowUpDown,
    Check,
    X
} from "lucide-react";

function FleetHeader({

    drones,

    collapsed,

    onToggle,

    searchQuery,

    onSearchChange,

    sortBy,

    onSortChange

}) {

    const [sortOpen, setSortOpen] = useState(false);

    const commandBarRef = useRef(null);

    /*
    ======================================
            SORT OPTIONS
    ======================================
    */

    const sortOptions = useMemo(() => [

        {

            label: "Name",

            value: "NAME"

        },

        {

            label: "Battery",

            value: "BATTERY"

        },

        {

            label: "Signal",

            value: "SIGNAL"

        },

        {

            label: "Altitude",

            value: "ALTITUDE"

        },

        {

            label: "Speed",

            value: "SPEED"

        }

    ], []);

    /*
    ======================================
        AUTO EXPAND DURING SEARCH
    ======================================
    */

    /*
    ======================================
        CLOSE DROPDOWN OUTSIDE CLICK
    ======================================
    */

    useEffect(() => {

        function handleClick(event) {

            if (

                commandBarRef.current &&

                !commandBarRef.current.contains(event.target)

            ) {

                setSortOpen(false);

            }

        }

        window.addEventListener(

            "click",

            handleClick

        );

        return () =>

            window.removeEventListener(

                "click",

                handleClick

            );

    }, []);

    /*
    ======================================
            CURRENT SORT LABEL
    ======================================
    */

    const currentSort =

        sortOptions.find(

            option =>

                option.value === sortBy

        )?.label || "Name";

    /*
    ======================================
                UI
    ======================================
    */

    return (

        <div

            ref={commandBarRef}

            className="mb-3"

        >
            {/* ===================================
                    COMMAND BAR
            =================================== */}

            <div className="flex items-center gap-4">
                {/* ===========================
        SEARCH
=========================== */}

                <motion.div

                    whileHover={{ scale: 1.01 }}

                    className="
    flex
    flex-1
    items-center
    gap-3
    rounded-xl
    border
    border-white/10
    bg-white/[0.04]
    px-4
    py-2.5
    transition-all
    focus-within:border-[#D4AF37]
focus-within:shadow-[0_0_20px_rgba(212,175,55,.18)]
    "

                >

                    <Search

                        size={20}

                        className="text-[var(--aerion-primary)]"

                    />

                    <input

                        value={searchQuery}

                        onChange={(e) =>

                            onSearchChange(e.target.value)

                        }

                        onFocus={() => {

                            if (collapsed) {

                                onToggle();

                            }

                        }}

                        placeholder="Search by name or serial..."

                        className="
        w-full
        bg-transparent
        text-sm
        text-white
        outline-none
        placeholder:text-gray-500
        "

                    />

                    <AnimatePresence>

                        {

                            searchQuery && (

                                <motion.button

                                    initial={{

                                        opacity: 0,

                                        scale: .7

                                    }}

                                    animate={{

                                        opacity: 1,

                                        scale: 1

                                    }}

                                    exit={{

                                        opacity: 0,

                                        scale: .7

                                    }}

                                    whileHover={{

                                        rotate: 90

                                    }}

                                    whileTap={{

                                        scale: .9

                                    }}

                                    onClick={() =>

                                        onSearchChange("")

                                    }

                                    className="
                    rounded-full
                    p-1
                    text-gray-400
                    hover:bg-white/10
                    hover:text-white
                    "

                                >

                                    <X size={14} />

                                </motion.button>

                            )

                        }

                    </AnimatePresence>

                </motion.div>

                {/* ===========================
        SORT
=========================== */}

                <div className="relative shrink-0">

                    <motion.button

                        whileHover={{ scale: 1.02 }}

                        whileTap={{ scale: .97 }}

                        onClick={(e) => {

                            e.stopPropagation();

                            setSortOpen(

                                previous => !previous

                            );

                        }}

                        className="
        flex
        w-[145px]
        items-center
        justify-between
        rounded-xl
        border
        border-white/10
        bg-white/[0.04]
        px-4
        py-2.5
        transition-all
        hover:border-[#D4AF37]/40
        focus-within:border-[#D4AF37]
        focus-within:shadow-[0_0_20px_rgba(212,175,55,.18)]"

                    >

                        <div className="flex items-center gap-2">


                            <span className="text-sm">

                                {currentSort}

                            </span>

                        </div>

                        <motion.div

                            animate={{

                                rotate:

                                    sortOpen

                                        ? 180

                                        : 0

                            }}

                        >

                            <ChevronDown size={16} />

                        </motion.div>

                    </motion.button>
                    <AnimatePresence>

                        {

                            sortOpen && (

                                <motion.div

                                    onClick={(e) =>

                                        e.stopPropagation()

                                    }

                                    initial={{

                                        opacity: 0,

                                        y: -10,

                                        scale: .95

                                    }}

                                    animate={{

                                        opacity: 1,

                                        y: 8,

                                        scale: 1

                                    }}

                                    exit={{

                                        opacity: 0,

                                        y: -10,

                                        scale: .95

                                    }}

                                    transition={{

                                        duration: .18

                                    }}

                                    className="
                                    absolute
                                    right-0
                                    z-50
                                    mt-2
                                    w-[170px]
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-[#0E0E0E]
                                    shadow-[0_20px_80px_rgba(0,0,0,.45)]
                                    backdrop-blur-xl
                                    "

                                >
                                    {

                                        sortOptions.map((option) => (

                                            <motion.button

                                                key={option.value}

                                                whileHover={{

                                                    x: 5,

                                                    backgroundColor:
                                                        "rgba(212,175,55,.08)"

                                                }}

                                                whileTap={{

                                                    scale: .98

                                                }}

                                                onClick={() => {

                                                    onSortChange(

                                                        option.value

                                                    );

                                                    setSortOpen(false);

                                                }}

                                                className={`
                                                flex
                                                w-full
                                                items-center
                                                justify-between
                                                px-5
                                                py-3
                                                text-left
                                                transition-all

                                                ${sortBy === option.value

                                                        ?

                                                        "bg-[var(--aerion-primary-soft)] text-[var(--aerion-primary)]"

                                                        :

                                                        "text-white"

                                                    }

                                                `}

                                            >

                                                <span>

                                                    {option.label}

                                                </span>

                                                {

                                                    sortBy === option.value && (

                                                        <motion.div

                                                            layoutId="sort-check"

                                                            initial={{

                                                                scale: 0

                                                            }}

                                                            animate={{

                                                                scale: 1

                                                            }}

                                                        >

                                                            <Check

                                                                size={16}

                                                            />

                                                        </motion.div>

                                                    )

                                                }

                                            </motion.button>

                                        ))

                                    }

                                </motion.div>

                            )

                        }

                    </AnimatePresence>
                </div>

                <motion.button

                    whileHover={{ scale: 1.05 }}

                    whileTap={{ scale: .95 }}

                    onClick={onToggle}

                    className="
    ml-3
    flex
   h-[42px]
w-[42px]
    items-center
    justify-center
    rounded-xl
    border
    border-white/10
    bg-white/[0.04]
    transition-all
    hover:border-[#D4AF37]
hover:bg-[var(--aerion-primary-soft)]
    "

                >

                    {

                        collapsed

                            ?

                            <ChevronDown size={18} />

                            :

                            <ChevronUp size={18} />

                    }

                </motion.button>


            </div>

        </div>

    );

}

export default FleetHeader;