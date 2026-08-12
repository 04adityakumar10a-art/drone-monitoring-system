import { motion, AnimatePresence } from "motion/react";

import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    PaperAirplaneIcon
} from "@heroicons/react/24/outline";

import {
    Battery,
    MapPin,
    Navigation,
    Clock3,
    Radio,
    Cpu,
    Activity
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function DroneTable({
    drones = [],
    onEdit = () => {},
    onDelete = () => {}
}) {
    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    function getBattery(level) {
        const value = Number(level ?? 0);

        if (value >= 80) {
            return {
                color: "#22C55E",
                label: "Excellent"
            };
        }

        if (value >= 50) {
            return {
                color: "#D4AF37",
                label: "Healthy"
            };
        }

        if (value >= 20) {
            return {
                color: "#F97316",
                label: "Low"
            };
        }

        return {
            color: "#EF4444",
            label: "Critical"
        };
    }

    function getStatus(status) {
        switch (status) {
            case "AVAILABLE":
                return {
                    color: "#22C55E",
                    label: "AVAILABLE"
                };

            case "IN_FLIGHT":
                return {
                    color: "#38BDF8",
                    label: "IN FLIGHT"
                };

            case "MAINTENANCE":
                return {
                    color: "#F97316",
                    label: "MAINTENANCE"
                };

            default:
                return {
                    color: "#EF4444",
                    label: status
                        ? status.replaceAll("_", " ")
                        : "OFFLINE"
                };
        }
    }

    return (
        <motion.section
            initial={{
                opacity: 0,
                y: 20
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.5
            }}
            className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/[0.08]
                bg-[#0A0A0A]
                shadow-[0_25px_80px_rgba(0,0,0,.45)]
            "
        >

            {/* =========================================
                AMBIENT GLOW
            ========================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    -top-40
                    h-[420px]
                    w-[420px]
                    rounded-full
                    bg-[#D4AF37]/[0.035]
                    blur-[140px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-40
                    left-1/3
                    h-[300px]
                    w-[300px]
                    rounded-full
                    bg-cyan-500/[0.025]
                    blur-[120px]
                "
            />

            {/* =========================================
                TOP BAR
            ========================================= */}

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

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <div className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[#D4AF37]/15
                        bg-[#D4AF37]/[0.06]
                    ">
                        <Activity
                            size={18}
                            className="text-[var(--aerion-primary)]"
                        />
                    </div>

                    <div>

                        <p className="
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.3em]
                            text-[var(--aerion-primary)]
                        ">
                            FLEET REGISTRY
                        </p>

                        <h2 className="
                            mt-1
                            text-lg
                            font-bold
                            text-white
                        ">
                            Aircraft Telemetry
                        </h2>

                    </div>

                </div>

                <div className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/[0.06]
                    bg-white/[0.02]
                    px-3
                    py-1.5
                ">

                    <motion.span
                        animate={{
                            opacity: [1, 0.3, 1]
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
                        "
                    />

                    <span className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-gray-600
                    ">
                        {drones.length} Aircraft
                    </span>

                </div>

            </div>

            {/* =========================================
                TABLE
            ========================================= */}

            <div className="
                relative
                z-10
                overflow-x-auto
            ">

                <table className="
                    min-w-[1150px]
                    w-full
                ">

                    {/* HEADER */}

                    <thead>

                        <tr className="
                            border-b
                            border-white/[0.06]
                            bg-white/[0.015]
                        ">

                            <TableHeader>
                                Drone
                            </TableHeader>

                            <TableHeader>
                                Telemetry
                            </TableHeader>

                            <TableHeader>
                                Battery
                            </TableHeader>

                            <TableHeader>
                                Status
                            </TableHeader>

                            <TableHeader>
                                Position
                            </TableHeader>

                            {role !== "VIEWER" && (
                                <TableHeader align="center">
                                    Actions
                                </TableHeader>
                            )}

                        </tr>

                    </thead>

                    {/* BODY */}

                    <tbody>

                        {drones.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={
                                        role !== "VIEWER"
                                            ? 6
                                            : 5
                                    }
                                    className="
                                        px-8
                                        py-24
                                    "
                                >

                                    <EmptyState />

                                </td>

                            </tr>

                        ) : (

                            <AnimatePresence>

                                {drones.map(
                                    (drone, index) => {

                                        const battery =
                                            getBattery(
                                                drone.batteryLevel
                                            );

                                        const status =
                                            getStatus(
                                                drone.status
                                            );

                                        return (
                                            <motion.tr
                                                key={drone.id}
                                                initial={{
                                                    opacity: 0,
                                                    y: 12
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0
                                                }}
                                                exit={{
                                                    opacity: 0
                                                }}
                                                transition={{
                                                    duration: 0.35,
                                                    delay:
                                                        Math.min(
                                                            index *
                                                                0.05,
                                                            0.4
                                                        )
                                                }}
                                                onClick={() =>
                                                    navigate(
                                                        `/drones/${drone.id}`
                                                    )
                                                }
                                                className="
                                                    group
                                                    cursor-pointer
                                                    border-b
                                                    border-white/[0.05]
                                                    transition-all
                                                    duration-300
                                                    hover:bg-white/[0.025]
                                                "
                                            >

                                                {/* =================================
                                                    DRONE
                                                ================================= */}

                                                <td className="
                                                    px-6
                                                    py-6
                                                ">

                                                    <div className="
                                                        flex
                                                        items-center
                                                        gap-4
                                                    ">

                                                        <motion.div
                                                            whileHover={{
                                                                scale: 1.08,
                                                                rotate: 5
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
                                                                border-[#D4AF37]/15
                                                                bg-[#D4AF37]/[0.06]
                                                            "
                                                        >

                                                            <PaperAirplaneIcon
                                                                className="
                                                                    h-6
                                                                    w-6
                                                                    text-[var(--aerion-primary)]
                                                                "
                                                            />

                                                        </motion.div>

                                                        <div>

                                                            <h3 className="
                                                                text-sm
                                                                font-bold
                                                                text-white
                                                            ">
                                                                {drone.model}
                                                            </h3>

                                                            <p className="
                                                                mt-1
                                                                text-[11px]
                                                                text-gray-600
                                                            ">
                                                                #{drone.serialNumber}
                                                            </p>

                                                            <p className="
                                                                mt-1.5
                                                                text-[10px]
                                                                font-semibold
                                                                uppercase
                                                                tracking-[0.16em]
                                                                text-[var(--aerion-primary)]
                                                            ">
                                                                {drone.manufacturer}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* =================================
                                                    TELEMETRY
                                                ================================= */}

                                                <td className="
                                                    px-6
                                                    py-6
                                                ">

                                                    <div className="
                                                        space-y-2.5
                                                    ">

                                                        <TelemetryItem
                                                            icon={Navigation}
                                                            label="Altitude"
                                                            value={`${drone.altitude ?? 0} m`}
                                                            color="#D4AF37"
                                                        />

                                                        <TelemetryItem
                                                            icon={Clock3}
                                                            label="Last Seen"
                                                            value={
                                                                drone.lastSeen
                                                                    ? new Date(
                                                                          drone.lastSeen
                                                                      ).toLocaleTimeString()
                                                                    : "--"
                                                            }
                                                            color="#38BDF8"
                                                        />

                                                    </div>

                                                </td>

                                                {/* =================================
                                                    BATTERY
                                                ================================= */}

                                                <td className="
                                                    min-w-[190px]
                                                    px-6
                                                    py-6
                                                ">

                                                    <div className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                    ">

                                                        <Battery
                                                            size={18}
                                                            style={{
                                                                color:
                                                                    battery.color
                                                            }}
                                                        />

                                                        <div className="
                                                            flex-1
                                                        ">

                                                            <div className="
                                                                h-2
                                                                overflow-hidden
                                                                rounded-full
                                                                bg-white/[0.06]
                                                            ">

                                                                <motion.div
                                                                    initial={{
                                                                        width: 0
                                                                    }}
                                                                    animate={{
                                                                        width: `${Math.max(
                                                                            0,
                                                                            Math.min(
                                                                                100,
                                                                                Number(
                                                                                    drone.batteryLevel ??
                                                                                        0
                                                                                )
                                                                            )
                                                                        )}%`
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.9,
                                                                        delay:
                                                                            index *
                                                                            0.04
                                                                    }}
                                                                    className="
                                                                        h-full
                                                                        rounded-full
                                                                    "
                                                                    style={{
                                                                        background:
                                                                            battery.color
                                                                    }}
                                                                />

                                                            </div>

                                                            <div className="
                                                                mt-2
                                                                flex
                                                                items-center
                                                                justify-between
                                                            ">

                                                                <span
                                                                    className="
                                                                        text-sm
                                                                        font-bold
                                                                    "
                                                                    style={{
                                                                        color:
                                                                            battery.color
                                                                    }}
                                                                >
                                                                    {drone.batteryLevel ??
                                                                        0}
                                                                    %
                                                                </span>

                                                                <span className="
                                                                    text-[9px]
                                                                    uppercase
                                                                    tracking-wider
                                                                    text-gray-700
                                                                ">
                                                                    {battery.label}
                                                                </span>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* =================================
                                                    STATUS
                                                ================================= */}

                                                <td className="
                                                    px-6
                                                    py-6
                                                ">

                                                    <div
                                                        className="
                                                            inline-flex
                                                            items-center
                                                            gap-2
                                                            rounded-full
                                                            border
                                                            px-3
                                                            py-1.5
                                                            text-[9px]
                                                            font-bold
                                                            uppercase
                                                            tracking-[0.12em]
                                                        "
                                                        style={{
                                                            color:
                                                                status.color,
                                                            borderColor:
                                                                `${status.color}30`,
                                                            background:
                                                                `${status.color}10`
                                                        }}
                                                    >

                                                        <motion.span
                                                            animate={{
                                                                opacity:
                                                                    [
                                                                        1,
                                                                        0.3,
                                                                        1
                                                                    ],
                                                                scale:
                                                                    [
                                                                        1,
                                                                        1.2,
                                                                        1
                                                                    ]
                                                            }}
                                                            transition={{
                                                                repeat:
                                                                    Infinity,
                                                                duration:
                                                                    1.8
                                                            }}
                                                            className="
                                                                h-1.5
                                                                w-1.5
                                                                rounded-full
                                                            "
                                                            style={{
                                                                background:
                                                                    status.color
                                                            }}
                                                        />

                                                        {status.label}

                                                    </div>

                                                </td>

                                                {/* =================================
                                                    POSITION
                                                ================================= */}

                                                <td className="
                                                    px-6
                                                    py-6
                                                ">

                                                    <div className="
                                                        space-y-2
                                                    ">

                                                        <div className="
                                                            flex
                                                            items-center
                                                            gap-2
                                                            text-xs
                                                            text-gray-300
                                                        ">

                                                            <MapPin
                                                                size={14}
                                                                className="text-[var(--aerion-primary)]"
                                                            />

                                                            {drone.latitude != null
                                                                ? drone.latitude.toFixed(
                                                                      5
                                                                  )
                                                                : "--"}

                                                        </div>

                                                        <div className="
                                                            pl-5
                                                            text-[11px]
                                                            text-gray-600
                                                        ">

                                                            {drone.longitude != null
                                                                ? drone.longitude.toFixed(
                                                                      5
                                                                  )
                                                                : "--"}

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* =================================
                                                    ACTIONS
                                                ================================= */}

                                                {role !==
                                                    "VIEWER" && (
                                                    <td
                                                        className="
                                                            px-6
                                                            py-6
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                justify-center
                                                                gap-2
                                                            "
                                                        >

                                                            {/* View */}

                                                            <ActionButton
                                                                color="gold"
                                                                title="View Drone"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();

                                                                    navigate(
                                                                        `/drones/${drone.id}`
                                                                    );
                                                                }}
                                                            >
                                                                <EyeIcon className="h-4 w-4" />
                                                            </ActionButton>

                                                            {/* Edit */}

                                                            {(role ===
                                                                "ADMIN" ||
                                                                role ===
                                                                    "OPERATOR") && (
                                                                <ActionButton
                                                                    color="cyan"
                                                                    title="Edit Drone"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.stopPropagation();

                                                                        onEdit(
                                                                            drone
                                                                        );
                                                                    }}
                                                                >
                                                                    <PencilSquareIcon className="h-4 w-4" />
                                                                </ActionButton>
                                                            )}

                                                            {/* Delete */}

                                                            {role ===
                                                                "ADMIN" && (
                                                                <ActionButton
                                                                    color="red"
                                                                    title="Delete Drone"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.stopPropagation();

                                                                        onDelete(
                                                                            drone
                                                                        );
                                                                    }}
                                                                >
                                                                    <TrashIcon className="h-4 w-4" />
                                                                </ActionButton>
                                                            )}

                                                        </div>

                                                    </td>
                                                )}

                                            </motion.tr>
                                        );
                                    }
                                )}

                            </AnimatePresence>
                        )}

                    </tbody>

                </table>

            </div>

            {/* =========================================
                FOOTER
            ========================================= */}

            <div className="
                relative
                z-10
                flex
                items-center
                justify-between
                border-t
                border-white/[0.05]
                px-6
                py-4
            ">

                <div className="
                    flex
                    items-center
                    gap-2
                ">

                    <Radio
                        size={13}
                        className="text-emerald-400"
                    />

                    <span className="
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
                        text-gray-700
                    ">
                        Live telemetry stream
                    </span>

                </div>

                <span className="
                    text-[10px]
                    text-gray-700
                ">
                    {drones.length} aircraft displayed
                </span>

            </div>

        </motion.section>
    );
}


/* =========================================
   TABLE HEADER
========================================= */

function TableHeader({
    children,
    align = "left"
}) {
    const alignment =
        align === "center"
            ? "text-center"
            : "text-left";

    return (
        <th
            className={`
                px-6
                py-4
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-gray-600
                ${alignment}
            `}
        >
            {children}
        </th>
    );
}


/* =========================================
   TELEMETRY ITEM
========================================= */

function TelemetryItem({
    icon: Icon,
    label,
    value,
    color
}) {
    return (
        <div className="
            flex
            items-center
            gap-2
            text-xs
        ">

            <Icon
                size={14}
                style={{
                    color
                }}
            />

            <span className="text-gray-500">
                {label}
            </span>

            <span className="
                ml-auto
                font-semibold
                text-gray-200
            ">
                {value}
            </span>

        </div>
    );
}


/* =========================================
   ACTION BUTTON
========================================= */

function ActionButton({
    children,
    color,
    title,
    onClick
}) {
    const colors = {
        gold: {
            border:
                "hover:border-[#D4AF37]/40",
            bg:
                "hover:bg-[var(--aerion-primary-soft)]",
            text:
                "hover:text-[var(--aerion-primary)]"
        },

        cyan: {
            border:
                "hover:border-cyan-400/40",
            bg:
                "hover:bg-cyan-400/10",
            text:
                "hover:text-cyan-400"
        },

        red: {
            border:
                "hover:border-red-400/40",
            bg:
                "hover:bg-red-400/10",
            text:
                "hover:text-red-400"
        }
    };

    const selected =
        colors[color] || colors.gold;

    return (
        <motion.button
            whileHover={{
                y: -2,
                scale: 1.05
            }}
            whileTap={{
                scale: 0.94
            }}
            onClick={onClick}
            title={title}
            className={`
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-white/[0.07]
                bg-white/[0.02]
                text-gray-600
                transition-all
                duration-300
                ${selected.border}
                ${selected.bg}
                ${selected.text}
            `}
        >
            {children}
        </motion.button>
    );
}


/* =========================================
   EMPTY STATE
========================================= */

function EmptyState() {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.97
            }}
            animate={{
                opacity: 1,
                scale: 1
            }}
            className="
                flex
                flex-col
                items-center
                text-center
            "
        >

            <div className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-3xl
                border
                border-[#D4AF37]/15
                bg-[#D4AF37]/[0.06]
            ">

                <PaperAirplaneIcon
                    className="
                        h-9
                        w-9
                        text-[var(--aerion-primary)]
                    "
                />

            </div>

            <h2 className="
                mt-6
                text-xl
                font-bold
                text-white
            ">
                No Fleet Available
            </h2>

            <p className="
                mt-2
                text-sm
                text-gray-600
            ">
                Create or register an aircraft
                to begin monitoring.
            </p>

        </motion.div>
    );
}

export default DroneTable;