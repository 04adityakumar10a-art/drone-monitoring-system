import { motion } from "motion/react";

import {
    Plane,
    Activity,
    Radio
} from "lucide-react";

import fleetBg from "../../../assets/images/fleet-bg.png";

function FleetHeader({
    total = 0,
    drones = []
}) {
    const fleetTotal =
        drones.length > 0
            ? drones.length
            : total;

    const online = drones.filter(
        (drone) =>
            drone.status?.toUpperCase() === "AVAILABLE"
    ).length;

    const inFlight = drones.filter(
        (drone) =>
            drone.status?.toUpperCase() === "IN_FLIGHT"
    ).length;

    return (
        <motion.section
            initial={{
                opacity: 0,
                y: 18
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1]
            }}
            className="
                relative
                mb-8
                overflow-hidden
                rounded-[30px]
                border
                border-white/[0.08]
                border-t-white/[0.22]
                bg-[#0B0B0B]
                shadow-[0_25px_80px_rgba(0,0,0,.5)]
            "
            style={{
                backgroundImage: `
                    linear-gradient(
                        rgba(5,6,8,0.88),
                        rgba(5,6,8,0.94)
                    ),
                    url(${fleetBg})
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >

            {/* Gold glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    -top-32
                    h-96
                    w-96
                    rounded-full
                    bg-[#F0C24B]/[0.12]
                    blur-[130px]
                "
            />

            {/* Violet glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-24
                    -top-24
                    h-72
                    w-72
                    rounded-full
                    bg-[#8B6BD8]/[0.08]
                    blur-[120px]
                "
            />

            {/* Cyan glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-40
                    left-1/3
                    h-80
                    w-80
                    rounded-full
                    bg-cyan-500/[0.05]
                    blur-[120px]
                "
            />

            {/* Technical grid */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.03]
                "
                style={{
                    backgroundImage: `
                        linear-gradient(
                            rgba(255,255,255,.12) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            rgba(255,255,255,.12) 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: "42px 42px",
                    maskImage:
                        "radial-gradient(ellipse 85% 70% at 30% 0%, black, transparent 85%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 85% 70% at 30% 0%, black, transparent 85%)"
                }}
            />

            {/* Shine sweep */}

            <motion.div
                aria-hidden="true"
                initial={{ left: "-60%" }}
                animate={{ left: "130%" }}
                transition={{
                    repeat: Infinity,
                    repeatDelay: 5,
                    duration: 2.2,
                    ease: "easeInOut"
                }}
                className="
                    pointer-events-none
                    absolute
                    top-0
                    h-full
                    w-[35%]
                    -skew-x-[20deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.06]
                    to-transparent
                "
            />

            {/* Content */}

            <div className="relative z-10 p-7 lg:p-8">

                <div
                    className="
                        flex
                        flex-col
                        gap-8
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    {/* LEFT */}

                    <div className="flex items-center gap-5">

                        <motion.div
                            whileHover={{
                                scale: 1.06,
                                rotate: 4
                            }}
                            transition={{
                                duration: 0.2
                            }}
                            className="
                                flex
                                h-16
                                w-16
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-[#F0C24B]/25
                                bg-gradient-to-br
                                from-[#F0C24B]/[0.14]
                                to-[#F0C24B]/[0.02]
                                shadow-[0_0_35px_rgba(240,194,75,.1)_inset]
                            "
                        >
                            <Plane
                                size={32}
                                className="text-[var(--aerion-primary)]"
                            />
                        </motion.div>

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <p
                                    className="
                                        bg-gradient-to-r
                                        from-[#FFE9A8]
                                        via-[#F0C24B]
                                        to-[#B8842A]
                                        bg-clip-text
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-[0.3em]
                                        text-transparent
                                    "
                                >
                                    AERION FLEET
                                </p>

                                <span
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        border
                                        border-emerald-500/20
                                        bg-emerald-500/[0.08]
                                        px-3
                                        py-1
                                        text-[10px]
                                        font-semibold
                                        tracking-[0.15em]
                                        text-emerald-400
                                    "
                                >
                                    <motion.span
                                        animate={{
                                            scale: [1, 1.35, 1]
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1.7
                                        }}
                                        className="
                                            h-1.5
                                            w-1.5
                                            rounded-full
                                            bg-emerald-400
                                            shadow-[0_0_8px_rgba(52,211,153,.8)]
                                        "
                                    />

                                    LIVE
                                </span>

                            </div>

                            <h1
                                className="
                                    mt-2
                                    text-4xl
                                    font-black
                                    tracking-tight
                                    text-white
                                "
                            >
                                Fleet Operations
                            </h1>

                            <p
                                className="
                                    mt-2
                                    max-w-xl
                                    text-sm
                                    leading-6
                                    text-gray-500
                                "
                            >
                                Real-time drone fleet management
                                and operational intelligence.
                            </p>

                        </div>

                    </div>

                    {/* FLEET METRICS */}

                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-3
                            sm:gap-4
                        "
                    >

                        {/* Fleet */}

                        <motion.div
                            whileHover={{
                                y: -4
                            }}
                            className="
                                min-w-[130px]
                                rounded-2xl
                                border
                                border-white/[0.07]
                                border-t-white/[0.14]
                                bg-white/[0.035]
                                px-5
                                py-4
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                hover:border-[#F0C24B]/25
                                hover:bg-white/[0.05]
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <Activity
                                    size={14}
                                    className="text-[var(--aerion-primary)]"
                                />

                                <p
                                    className="
                                        text-[10px]
                                        uppercase
                                        tracking-[0.2em]
                                        text-gray-500
                                    "
                                >
                                    Fleet
                                </p>
                            </div>

                            <h2
                                className="
                                    mt-2
                                    text-3xl
                                    font-bold
                                    text-white
                                "
                            >
                                {fleetTotal}
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-gray-600
                                "
                            >
                                Registered drones
                            </p>

                        </motion.div>

                        {/* Online */}

                        <motion.div
                            whileHover={{
                                y: -4
                            }}
                            className="
                                min-w-[130px]
                                rounded-2xl
                                border
                                border-white/[0.07]
                                border-t-white/[0.14]
                                bg-white/[0.035]
                                px-5
                                py-4
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                hover:border-emerald-500/25
                                hover:bg-white/[0.05]
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <Radio
                                    size={14}
                                    className="text-emerald-400"
                                />

                                <p
                                    className="
                                        text-[10px]
                                        uppercase
                                        tracking-[0.2em]
                                        text-gray-500
                                    "
                                >
                                    Online
                                </p>
                            </div>

                            <h2
                                className="
                                    mt-2
                                    text-3xl
                                    font-bold
                                    text-emerald-400
                                "
                            >
                                {online}
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-gray-600
                                "
                            >
                                Available now
                            </p>

                        </motion.div>

                    </div>

                </div>

                {/* Bottom operational strip */}

                <div
                    className="
                        mt-7
                        flex
                        flex-wrap
                        items-center
                        gap-x-6
                        gap-y-2
                        border-t
                        border-white/[0.06]
                        pt-5
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <span
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-emerald-400
                                shadow-[0_0_6px_rgba(52,211,153,.7)]
                            "
                        />

                        <span
                            className="
                                text-xs
                                text-gray-500
                            "
                        >
                            {online} available
                        </span>
                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <span
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-cyan-400
                                shadow-[0_0_6px_rgba(34,211,238,.7)]
                            "
                        />

                        <span
                            className="
                                text-xs
                                text-gray-500
                            "
                        >
                            {inFlight} in flight
                        </span>
                    </div>

                    <div
                        className="
                            ml-auto
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <span
                            className="
                                text-[10px]
                                uppercase
                                tracking-[0.2em]
                                text-gray-600
                            "
                        >
                            Fleet monitoring
                        </span>

                        <motion.span
                            animate={{
                                opacity: [0.4, 1, 0.4]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2
                            }}
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-[#F0C24B]
                                shadow-[0_0_8px_rgba(240,194,75,.7)]
                            "
                        />

                    </div>

                </div>

            </div>

        </motion.section>
    );
}

export default FleetHeader;