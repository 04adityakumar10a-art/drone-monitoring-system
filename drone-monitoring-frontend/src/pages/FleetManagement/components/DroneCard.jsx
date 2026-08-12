import { motion } from "motion/react";

import {
    Plane,
    BatteryCharging,
    Radio,
    MapPin,
    Cpu,
    Pencil,
    Trash2,
    ArrowRight,
    Activity,
    Navigation
} from "lucide-react";

function DroneCard({
    drone,
    onEdit,
    onDelete,
    onOpen
}) {
    const battery = Math.max(
        0,
        Math.min(
            100,
            Number(drone.batteryLevel ?? 0)
        )
    );

    const signal = Number(
        drone.signalStrength ?? 0
    );

    const status =
        drone.status?.toUpperCase() ??
        "UNKNOWN";

    const isOnline =
        status === "ONLINE" ||
        status === "AVAILABLE";

    const isFlight =
        status === "IN_FLIGHT" ||
        status === "FLYING";

    const isMaintenance =
        status === "MAINTENANCE";

    const statusColor = isFlight
        ? "#38BDF8"
        : isOnline
        ? "#22C55E"
        : isMaintenance
        ? "#F97316"
        : "#EF4444";

    const statusLabel = isFlight
        ? "IN FLIGHT"
        : isOnline
        ? "AVAILABLE"
        : isMaintenance
        ? "MAINTENANCE"
        : status;

    const batteryColor =
        battery >= 60
            ? "#22C55E"
            : battery >= 30
            ? "#FACC15"
            : "#EF4444";

    return (
        <motion.article
            whileHover={{
                y: -7
            }}
            transition={{
                duration: 0.25,
                ease: "easeOut"
            }}
            className="
                group
                relative
                overflow-hidden
                rounded-[26px]
                border
                border-white/[0.08]
                bg-[#0B0B0B]
                shadow-[0_15px_50px_rgba(0,0,0,.25)]
                transition-all
                duration-300
                hover:border-white/[0.15]
                hover:shadow-[0_25px_70px_rgba(0,0,0,.45)]
            "
        >

            {/* =================================
                AMBIENT GLOW
            ================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-48
                    w-48
                    rounded-full
                    blur-[90px]
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                "
                style={{
                    background: `${statusColor}12`
                }}
            />

            {/* =================================
                TOP STATUS LINE
            ================================= */}

            <motion.div
                initial={{
                    scaleX: 0
                }}
                whileInView={{
                    scaleX: 1
                }}
                viewport={{
                    once: true
                }}
                transition={{
                    duration: 0.8
                }}
                className="
                    absolute
                    left-0
                    right-0
                    top-0
                    h-[2px]
                    origin-left
                "
                style={{
                    background: statusColor
                }}
            />

            {/* =================================
                HEADER
            ================================= */}

            <div className="
                relative
                flex
                items-start
                justify-between
                gap-4
                border-b
                border-white/[0.06]
                p-5
            ">

                <div className="
                    flex
                    min-w-0
                    items-center
                    gap-4
                ">

                    {/* Drone Icon */}

                    <motion.div
                        whileHover={{
                            rotate: 6,
                            scale: 1.06
                        }}
                        transition={{
                            duration: 0.2
                        }}
                        className="
                            flex
                            h-14
                            w-14
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-[#D4AF37]/15
                            bg-[#D4AF37]/[0.06]
                        "
                    >
                        <Plane
                            size={27}
                            className="text-[var(--aerion-primary)]"
                        />
                    </motion.div>

                    {/* Name */}

                    <div className="min-w-0">

                        <p className="
                            text-[9px]
                            uppercase
                            tracking-[0.28em]
                            text-gray-600
                        ">
                            AIRCRAFT
                        </p>

                        <h3 className="
                            mt-1
                            truncate
                            text-lg
                            font-bold
                            text-white
                        ">
                            {drone.name ||
                                "Unnamed Drone"}
                        </h3>

                        <p className="
                            mt-1
                            truncate
                            text-xs
                            text-gray-500
                        ">
                            {drone.model ||
                                "Unknown Model"}
                        </p>

                    </div>

                </div>

                {/* Status */}

                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-2
                        rounded-full
                        border
                        px-3
                        py-1.5
                        text-[9px]
                        font-semibold
                        tracking-[0.1em]
                    "
                    style={{
                        borderColor:
                            `${statusColor}30`,
                        background:
                            `${statusColor}10`,
                        color: statusColor
                    }}
                >

                    <motion.span
                        animate={
                            isOnline ||
                            isFlight
                                ? {
                                      opacity: [
                                          1,
                                          0.35,
                                          1
                                      ],
                                      scale: [
                                          1,
                                          1.25,
                                          1
                                      ]
                                  }
                                : {}
                        }
                        transition={{
                            repeat: Infinity,
                            duration: 1.8
                        }}
                        className="
                            h-1.5
                            w-1.5
                            rounded-full
                        "
                        style={{
                            background:
                                statusColor
                        }}
                    />

                    {statusLabel}

                </div>

            </div>

            {/* =================================
                BODY
            ================================= */}

            <div className="relative space-y-5 p-5">

                {/* Battery */}

                <div>

                    <div className="
                        mb-3
                        flex
                        items-center
                        justify-between
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                            text-gray-500
                        ">
                            <BatteryCharging
                                size={16}
                                style={{
                                    color:
                                        batteryColor
                                }}
                            />

                            <span className="
                                text-xs
                                uppercase
                                tracking-[0.15em]
                            ">
                                Battery
                            </span>
                        </div>

                        <span
                            className="
                                text-sm
                                font-bold
                            "
                            style={{
                                color:
                                    batteryColor
                            }}
                        >
                            {battery}%
                        </span>

                    </div>

                    <div className="
                        relative
                        h-2
                        overflow-hidden
                        rounded-full
                        bg-white/[0.06]
                    ">

                        <motion.div
                            initial={{
                                width: 0
                            }}
                            whileInView={{
                                width:
                                    `${battery}%`
                            }}
                            viewport={{
                                once: true
                            }}
                            transition={{
                                duration: 1,
                                ease: "easeOut"
                            }}
                            className="
                                relative
                                h-full
                                rounded-full
                            "
                            style={{
                                background:
                                    batteryColor
                            }}
                        >

                            <motion.div
                                animate={{
                                    x: [
                                        "-100%",
                                        "250%"
                                    ]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2.5,
                                    ease: "linear"
                                }}
                                className="
                                    absolute
                                    inset-y-0
                                    w-1/3
                                    bg-white/30
                                    blur-sm
                                "
                            />

                        </motion.div>

                    </div>

                </div>

                {/* Information Grid */}

                <div className="
                    grid
                    grid-cols-2
                    gap-3
                ">

                    <InfoItem
                        icon={Radio}
                        title="Signal"
                        value={
                            drone.signalStrength != null
                                ? `${signal}%`
                                : "--"
                        }
                        color="#38BDF8"
                    />

                    <InfoItem
                        icon={Cpu}
                        title="Firmware"
                        value={
                            drone.firmwareVersion ??
                            "v1.0"
                        }
                        color="#A855F7"
                    />

                    <InfoItem
                        icon={MapPin}
                        title="Latitude"
                        value={
                            typeof drone.latitude ===
                                "number"
                                ? drone.latitude.toFixed(
                                      4
                                  )
                                : "--"
                        }
                        color="#22C55E"
                    />

                    <InfoItem
                        icon={Navigation}
                        title="Longitude"
                        value={
                            typeof drone.longitude ===
                                "number"
                                ? drone.longitude.toFixed(
                                      4
                                  )
                                : "--"
                        }
                        color="#D4AF37"
                    />

                </div>

            </div>

            {/* =================================
                FOOTER
            ================================= */}

            <div className="
                relative
                flex
                items-center
                justify-between
                border-t
                border-white/[0.06]
                bg-white/[0.015]
                p-5
            ">

                {/* Actions */}

                <div className="
                    flex
                    items-center
                    gap-2
                ">

                    <motion.button
                        whileHover={{
                            y: -2,
                            scale: 1.04
                        }}
                        whileTap={{
                            scale: 0.94
                        }}
                        onClick={() =>
                            onEdit(drone)
                        }
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/[0.08]
                            bg-white/[0.025]
                            text-gray-500
                            transition-all
                            duration-300
                            hover:border-[#D4AF37]/30
                            hover:text-[var(--aerion-primary)]
                        "
                        title="Edit drone"
                    >
                        <Pencil size={16} />
                    </motion.button>

                    <motion.button
                        whileHover={{
                            y: -2,
                            scale: 1.04
                        }}
                        whileTap={{
                            scale: 0.94
                        }}
                        onClick={() =>
                            onDelete(drone)
                        }
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/[0.08]
                            bg-white/[0.025]
                            text-gray-500
                            transition-all
                            duration-300
                            hover:border-red-500/30
                            hover:text-red-400
                        "
                        title="Delete drone"
                    >
                        <Trash2 size={16} />
                    </motion.button>

                </div>

                {/* Mission */}

                <motion.button
                    whileHover={{
                        x: 3
                    }}
                    whileTap={{
                        scale: 0.97
                    }}
                    onClick={() =>
                        onOpen(drone)
                    }
                    className="
                        group/mission
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-[#D4AF37]/25
                        bg-[#D4AF37]/[0.08]
                        px-4
                        py-2.5
                        text-xs
                        font-semibold
                        text-[var(--aerion-primary)]
                        transition-all
                        duration-300
                        hover:border-[#D4AF37]/45
                        hover:bg-[#D4AF37]/[0.14]
                        hover:shadow-[0_0_25px_rgba(212,175,55,.08)]
                    "
                >
                    Mission

                    <motion.span
                        animate={{
                            x: [0, 3, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.8
                        }}
                    >
                        <ArrowRight
                            size={15}
                        />
                    </motion.span>

                </motion.button>

            </div>

        </motion.article>
    );
}

/* =================================
   INFO ITEM
================================= */

function InfoItem({
    icon: Icon,
    title,
    value,
    color
}) {
    return (
        <motion.div
            whileHover={{
                y: -2
            }}
            transition={{
                duration: 0.2
            }}
            className="
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                p-3
                transition-all
                duration-300
                hover:border-white/[0.12]
                hover:bg-white/[0.04]
            "
        >

            <div className="
                mb-2
                flex
                items-center
                gap-2
            ">

                <Icon
                    size={14}
                    style={{
                        color
                    }}
                />

                <span className="
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    text-gray-600
                ">
                    {title}
                </span>

            </div>

            <div className="
                truncate
                text-sm
                font-semibold
                text-gray-200
            ">
                {value}
            </div>

        </motion.div>
    );
}

export default DroneCard;