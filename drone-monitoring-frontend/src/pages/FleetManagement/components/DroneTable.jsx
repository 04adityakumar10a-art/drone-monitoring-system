import { motion, AnimatePresence } from "motion/react";

import {
    Pencil,
    Trash2,
    Plane,
    BatteryCharging,
    Radio,
    MapPin,
    ArrowRight,
    Activity,
    Cpu,
    Navigation
} from "lucide-react";

function DroneTable({
    drones = [],
    loading,
    onEdit = () => {},
    onDelete = () => {},
    onOpen = () => {}
}) {
    if (loading) {
        return (
            <div
                className="
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/[0.08]
                    bg-[#0B0B0B]
                    p-6
                "
            >
                <div className="space-y-3">
                    {Array.from({ length: 7 }).map(
                        (_, index) => (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1
                                }}
                                transition={{
                                    delay:
                                        index * 0.06
                                }}
                                className="
                                    relative
                                    h-20
                                    overflow-hidden
                                    rounded-2xl
                                    bg-white/[0.035]
                                "
                            >
                                <motion.div
                                    animate={{
                                        x: ["-100%", "200%"]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.6,
                                        ease: "linear",
                                        delay: index * 0.06
                                    }}
                                    className="
                                        absolute
                                        inset-y-0
                                        w-1/3
                                        bg-gradient-to-r
                                        from-transparent
                                        via-white/[0.05]
                                        to-transparent
                                    "
                                />
                            </motion.div>
                        )
                    )}
                </div>
            </div>
        );
    }

    if (drones.length === 0) {
        return (
            <motion.div
                initial={{
                    opacity: 0,
                    y: 15
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                className="
                    flex
                    min-h-[420px]
                    flex-col
                    items-center
                    justify-center
                    rounded-[28px]
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    text-center
                "
            >
                <div
                    className="
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-3xl
                        border
                        border-[#F0C24B]/25
                        bg-gradient-to-br
                        from-[#F0C24B]/[0.14]
                        to-[#F0C24B]/[0.02]
                        shadow-[0_0_30px_rgba(240,194,75,.12)]
                    "
                >
                    <Plane
                        size={36}
                        className="text-[var(--aerion-primary)]"
                    />
                </div>

                <p
                    className="
                        mt-6
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-[var(--aerion-primary)]
                    "
                >
                    FLEET DATABASE
                </p>

                <h2 className="
                    mt-2
                    text-2xl
                    font-bold
                    text-white
                ">
                    No Drones Found
                </h2>

                <p className="
                    mt-2
                    max-w-sm
                    text-sm
                    text-gray-500
                ">
                    Try changing your search or filter
                    configuration.
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 15
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.45
            }}
            className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/[0.08]
                border-t-white/[0.2]
                bg-[#0B0B0B]
                shadow-[0_20px_70px_rgba(0,0,0,.4)]
            "
        >
            {/* Top gradient bar */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    h-[2px]
                    bg-gradient-to-r
                    from-transparent
                    via-[#F0C24B]
                    to-transparent
                    opacity-70
                "
                style={{
                    backgroundImage:
                        "linear-gradient(90deg, transparent, #F0C24B 15%, #8B6BD8 50%, #4FD1E3 85%, transparent)"
                }}
            />

            {/* Ambient gold glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    -top-40
                    h-96
                    w-96
                    rounded-full
                    bg-[#F0C24B]/[0.06]
                    blur-[130px]
                "
            />

            {/* Ambient violet glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-32
                    -bottom-32
                    h-72
                    w-72
                    rounded-full
                    bg-[#8B6BD8]/[0.04]
                    blur-[120px]
                "
            />

            {/* Shine sweep */}

            <motion.div
                aria-hidden="true"
                initial={{ left: "-60%" }}
                animate={{ left: "130%" }}
                transition={{
                    repeat: Infinity,
                    repeatDelay: 8,
                    delay: 2,
                    duration: 2.2,
                    ease: "easeInOut"
                }}
                className="
                    pointer-events-none
                    absolute
                    top-0
                    h-full
                    w-[26%]
                    -skew-x-[20deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.035]
                    to-transparent
                "
            />

            {/* Header */}

            <div className="
                relative
                z-10
                flex
                items-center
                justify-between
                border-b
                border-white/[0.06]
                px-6
                py-5
            ">
                <div>
                    <p
                        className="
                            text-[10px]
                            uppercase
                            tracking-[0.3em]
                            bg-gradient-to-r
                            from-[#FFE9A8]
                            via-[#F0C24B]
                            to-[#B8842A]
                            bg-clip-text
                            text-transparent
                        "
                    >
                        FLEET REGISTRY
                    </p>

                    <h2 className="
                        mt-1
                        text-lg
                        font-semibold
                        text-white
                    ">
                        Aircraft Overview
                    </h2>
                </div>

                <div className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-emerald-500/25
                    bg-emerald-500/[0.08]
                    px-3
                    py-1.5
                    shadow-[0_0_16px_rgba(52,211,153,.1)]
                ">
                    <motion.span
                        animate={{
                            opacity: [1, 0.35, 1]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.8
                        }}
                        className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-emerald-400
                            shadow-[0_0_6px_rgba(52,211,153,.8)]
                        "
                    />

                    <span className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.15em]
                        text-emerald-300
                    ">
                        {drones.length} Aircraft
                    </span>
                </div>
            </div>

            {/* Table */}

            <div className="relative z-10 overflow-x-auto">

                <table className="min-w-[1050px] w-full">

                    <thead>
                        <tr className="
                            border-b
                            border-white/[0.06]
                            bg-white/[0.015]
                            text-left
                        ">
                            <th className="
                                px-6
                                py-4
                                text-[10px]
                                uppercase
                                tracking-[0.25em]
                                text-gray-600
                            ">
                                Aircraft
                            </th>

                            <th className="
                                px-5
                                py-4
                                text-[10px]
                                uppercase
                                tracking-[0.25em]
                                text-gray-600
                            ">
                                Status
                            </th>

                            <th className="
                                px-5
                                py-4
                                text-[10px]
                                uppercase
                                tracking-[0.25em]
                                text-gray-600
                            ">
                                Battery
                            </th>

                            <th className="
                                px-5
                                py-4
                                text-[10px]
                                uppercase
                                tracking-[0.25em]
                                text-gray-600
                            ">
                                Signal
                            </th>

                            <th className="
                                px-5
                                py-4
                                text-[10px]
                                uppercase
                                tracking-[0.25em]
                                text-gray-600
                            ">
                                Position
                            </th>

                            <th className="
                                px-5
                                py-4
                                text-[10px]
                                uppercase
                                tracking-[0.25em]
                                text-gray-600
                            ">
                                Firmware
                            </th>

                            <th className="
                                px-6
                                py-4
                                text-right
                                text-[10px]
                                uppercase
                                tracking-[0.25em]
                                text-gray-600
                            ">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <AnimatePresence>
                            {drones.map(
                                (drone, index) => {
                                    const battery =
                                        Math.max(
                                            0,
                                            Math.min(
                                                100,
                                                Number(
                                                    drone.batteryLevel ??
                                                        0
                                                )
                                            )
                                        );

                                    const signal =
                                        drone.signalStrength ??
                                        "--";

                                    const status =
                                        drone.status?.toUpperCase() ??
                                        "UNKNOWN";

                                    const isOnline =
                                        status ===
                                            "ONLINE" ||
                                        status ===
                                            "AVAILABLE";

                                    const isFlight =
                                        status ===
                                            "IN_FLIGHT" ||
                                        status ===
                                            "FLYING";

                                    const isMaintenance =
                                        status ===
                                        "MAINTENANCE";

                                    const statusColor =
                                        isFlight
                                            ? "#4FD1E3"
                                            : isOnline
                                            ? "#34D399"
                                            : isMaintenance
                                            ? "#F97316"
                                            : "#EF4444";

                                    const batteryColor =
                                        battery >= 60
                                            ? "#34D399"
                                            : battery >= 30
                                            ? "#FACC15"
                                            : "#EF4444";

                                    const ringR = 15;
                                    const ringC =
                                        2 *
                                        Math.PI *
                                        ringR;
                                    const ringOffset =
                                        ringC -
                                        (battery / 100) *
                                            ringC;

                                    return (
                                        <motion.tr
                                            key={drone.id}
                                            initial={{
                                                opacity: 0,
                                                x: -15
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                delay: Math.min(
                                                    index *
                                                        0.06,
                                                    0.45
                                                )
                                            }}
                                            className="
                                                group
                                                relative
                                                border-b
                                                border-white/[0.05]
                                                transition-colors
                                                duration-300
                                                hover:bg-white/[0.03]
                                            "
                                        >

                                            {/* Aircraft */}

                                            <td className="relative px-6 py-5">

                                                {/* hover accent bar */}
                                                <span
                                                    className="
                                                        pointer-events-none
                                                        absolute
                                                        left-0
                                                        top-1/2
                                                        h-9
                                                        w-[2px]
                                                        -translate-y-1/2
                                                        rounded-full
                                                        bg-gradient-to-b
                                                        from-[#F0C24B]
                                                        to-[#8B6BD8]
                                                        opacity-0
                                                        transition-opacity
                                                        duration-300
                                                        group-hover:opacity-90
                                                    "
                                                />

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-4
                                                ">

                                                    <motion.div
                                                        whileHover={{
                                                            scale: 1.08,
                                                            rotate: -5
                                                        }}
                                                        className="
                                                            flex
                                                            h-12
                                                            w-12
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-2xl
                                                            border
                                                            border-[#F0C24B]/20
                                                            bg-gradient-to-br
                                                            from-[#F0C24B]/[0.12]
                                                            to-[#F0C24B]/[0.02]
                                                        "
                                                    >
                                                        <Plane
                                                            size={23}
                                                            className="text-[var(--aerion-primary)]"
                                                        />
                                                    </motion.div>

                                                    <div className="min-w-0">

                                                        <p className="
                                                            truncate
                                                            text-sm
                                                            font-bold
                                                            text-white
                                                        ">
                                                            {drone.name ||
                                                                "Unnamed Drone"}
                                                        </p>

                                                        <p className="
                                                            mt-1
                                                            text-xs
                                                            text-gray-600
                                                        ">
                                                            {drone.model ||
                                                                "Unknown Model"}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* Status */}

                                            <td className="px-5">

                                                <span
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        rounded-full
                                                        border
                                                        px-3
                                                        py-1.5
                                                        text-[10px]
                                                        font-semibold
                                                        tracking-[0.08em]
                                                    "
                                                    style={{
                                                        color:
                                                            statusColor,
                                                        borderColor:
                                                            `${statusColor}35`,
                                                        background:
                                                            `${statusColor}12`
                                                    }}
                                                >

                                                    <motion.span
                                                        animate={
                                                            isOnline ||
                                                            isFlight
                                                                ? {
                                                                      opacity:
                                                                          [
                                                                              1,
                                                                              0.35,
                                                                              1
                                                                          ]
                                                                  }
                                                                : {}
                                                        }
                                                        transition={{
                                                            repeat:
                                                                Infinity,
                                                            duration: 1.8
                                                        }}
                                                        className="
                                                            h-1.5
                                                            w-1.5
                                                            rounded-full
                                                        "
                                                        style={{
                                                            background:
                                                                statusColor,
                                                            boxShadow:
                                                                `0 0 6px ${statusColor}`
                                                        }}
                                                    />

                                                    {isFlight
                                                        ? "IN FLIGHT"
                                                        : status}

                                                </span>

                                            </td>

                                            {/* Battery — radial gauge */}

                                            <td className="px-5">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                ">

                                                    <div className="relative h-9 w-9 shrink-0">
                                                        <svg
                                                            width="36"
                                                            height="36"
                                                            viewBox="0 0 36 36"
                                                            className="-rotate-90"
                                                        >
                                                            <circle
                                                                cx="18"
                                                                cy="18"
                                                                r={ringR}
                                                                fill="none"
                                                                stroke="rgba(255,255,255,0.08)"
                                                                strokeWidth="3.5"
                                                            />
                                                            <circle
                                                                cx="18"
                                                                cy="18"
                                                                r={ringR}
                                                                fill="none"
                                                                stroke={
                                                                    batteryColor
                                                                }
                                                                strokeWidth="3.5"
                                                                strokeLinecap="round"
                                                                strokeDasharray={
                                                                    ringC
                                                                }
                                                                strokeDashoffset={
                                                                    ringOffset
                                                                }
                                                                style={{
                                                                    filter: `drop-shadow(0 0 4px ${batteryColor}90)`,
                                                                    transition:
                                                                        "stroke-dashoffset 0.9s ease-out"
                                                                }}
                                                            />
                                                        </svg>
                                                        <BatteryCharging
                                                            size={12}
                                                            className="absolute inset-0 m-auto"
                                                            style={{
                                                                color: batteryColor
                                                            }}
                                                        />
                                                    </div>

                                                    <span
                                                        className="
                                                            font-mono
                                                            text-sm
                                                            font-semibold
                                                        "
                                                        style={{
                                                            color:
                                                                batteryColor
                                                        }}
                                                    >
                                                        {battery}%
                                                    </span>

                                                </div>

                                            </td>

                                            {/* Signal */}

                                            <td className="px-5">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    font-mono
                                                    text-sm
                                                    text-gray-300
                                                ">

                                                    <Radio
                                                        size={16}
                                                        className="text-[#4FD1E3]"
                                                    />

                                                    {signal !==
                                                    "--"
                                                        ? `${signal}%`
                                                        : "--"}

                                                </div>

                                            </td>

                                            {/* Position */}

                                            <td className="px-5">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    font-mono
                                                    text-xs
                                                    text-gray-500
                                                ">

                                                    <MapPin
                                                        size={15}
                                                        className="text-[var(--aerion-primary)]"
                                                    />

                                                    <span>
                                                        {typeof drone.latitude ===
                                                        "number"
                                                            ? drone.latitude.toFixed(
                                                                  4
                                                              )
                                                            : "--"}
                                                    </span>

                                                    <span className="text-gray-700">
                                                        /
                                                    </span>

                                                    <span>
                                                        {typeof drone.longitude ===
                                                        "number"
                                                            ? drone.longitude.toFixed(
                                                                  4
                                                              )
                                                            : "--"}
                                                    </span>

                                                </div>

                                            </td>

                                            {/* Firmware */}

                                            <td className="px-5">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    font-mono
                                                    text-xs
                                                    text-gray-400
                                                ">

                                                    <Cpu
                                                        size={14}
                                                        className="text-[#8B6BD8]"
                                                    />

                                                    {drone.firmwareVersion ??
                                                        "v1.0"}

                                                </div>

                                            </td>

                                            {/* Actions */}

                                            <td className="px-6">

                                                <div className="
                                                    flex
                                                    items-center
                                                    justify-end
                                                    gap-2
                                                ">

                                                    <motion.button
                                                        whileHover={{
                                                            scale: 1.05,
                                                            y: -1
                                                        }}
                                                        whileTap={{
                                                            scale: 0.94
                                                        }}
                                                        onClick={() =>
                                                            onOpen(
                                                                drone
                                                            )
                                                        }
                                                        className="
                                                            flex
                                                            h-9
                                                            items-center
                                                            gap-2
                                                            rounded-xl
                                                            border
                                                            border-[#F0C24B]/25
                                                            bg-gradient-to-r
                                                            from-[#F0C24B]/[0.12]
                                                            to-[#F0C24B]/[0.04]
                                                            px-3
                                                            text-xs
                                                            font-semibold
                                                            text-[var(--aerion-primary)]
                                                            transition-all
                                                            hover:border-[#F0C24B]/45
                                                            hover:from-[#F0C24B]/[0.2]
                                                            hover:shadow-[0_0_18px_rgba(240,194,75,.18)]
                                                        "
                                                    >
                                                        Mission
                                                        <ArrowRight
                                                            size={14}
                                                        />
                                                    </motion.button>

                                                    <motion.button
                                                        whileHover={{
                                                            scale: 1.06,
                                                            y: -1
                                                        }}
                                                        whileTap={{
                                                            scale: 0.94
                                                        }}
                                                        onClick={() =>
                                                            onEdit(
                                                                drone
                                                            )
                                                        }
                                                        className="
                                                            flex
                                                            h-9
                                                            w-9
                                                            items-center
                                                            justify-center
                                                            rounded-xl
                                                            border
                                                            border-white/[0.08]
                                                            bg-white/[0.025]
                                                            text-gray-500
                                                            transition-all
                                                            hover:border-cyan-400/35
                                                            hover:text-cyan-400
                                                            hover:shadow-[0_0_16px_rgba(79,209,227,.18)]
                                                        "
                                                        title="Edit drone"
                                                    >
                                                        <Pencil
                                                            size={15}
                                                        />
                                                    </motion.button>

                                                    <motion.button
                                                        whileHover={{
                                                            scale: 1.06,
                                                            y: -1
                                                        }}
                                                        whileTap={{
                                                            scale: 0.94
                                                        }}
                                                        onClick={() =>
                                                            onDelete(
                                                                drone
                                                            )
                                                        }
                                                        className="
                                                            flex
                                                            h-9
                                                            w-9
                                                            items-center
                                                            justify-center
                                                            rounded-xl
                                                            border
                                                            border-red-500/15
                                                            bg-red-500/[0.05]
                                                            text-red-400
                                                            transition-all
                                                            hover:border-red-500/35
                                                            hover:bg-red-500/[0.1]
                                                            hover:shadow-[0_0_16px_rgba(239,68,68,.18)]
                                                        "
                                                        title="Delete drone"
                                                    >
                                                        <Trash2
                                                            size={15}
                                                        />
                                                    </motion.button>

                                                </div>

                                            </td>

                                        </motion.tr>
                                    );
                                }
                            )}
                        </AnimatePresence>
                    </tbody>

                </table>

            </div>

            {/* Footer */}

            <div className="
                relative
                z-10
                flex
                items-center
                justify-between
                border-t
                border-white/[0.06]
                px-6
                py-4
            ">

                <div className="
                    flex
                    items-center
                    gap-2
                ">
                    <Activity
                        size={14}
                        className="text-[var(--aerion-primary)]"
                    />

                    <span className="
                        text-[10px]
                        uppercase
                        tracking-[0.18em]
                        text-gray-600
                    ">
                        Live fleet registry
                    </span>
                </div>

                <span className="
                    text-xs
                    text-gray-600
                ">
                    {drones.length} aircraft displayed
                </span>

            </div>
        </motion.div>
    );
}

export default DroneTable;