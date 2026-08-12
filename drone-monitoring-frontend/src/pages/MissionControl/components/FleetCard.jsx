import { motion } from "motion/react";
import {
    Plane,
    Battery,
    Gauge,
    MoveUp,
    Radio,
    MapPinned
} from "lucide-react";

import GlassPanel from "../../../ui/Panel/GlassPanel";

import BatteryRibbon from "./BatteryRibbon";
import MetricTile from "./MetricTile";
import StatusIndicator from "./StatusIndicator";

function FleetCard({

    drone,

    selected,

    onClick

}) {

    return (

        <motion.button

            layout

            whileHover={{

                y: -8,

                scale: 1.02

            }}

            whileTap={{

                scale: .98

            }}

            transition={{

                type: "spring",

                stiffness: 300,

                damping: 22

            }}

            onClick={onClick}

            className="snap-start"

        >

            <GlassPanel

                glow={selected}

                className={`
                relative
                overflow-hidden
                w-[300px]
                p-5
                transition-all
                duration-300

                ${selected
                    ? "border-[#D4AF37]/40 shadow-[0_0_35px_rgba(212,175,55,.18)]"
                    : ""
                }
                `}

            >

                {

                    selected && (

                        <motion.div

                            layoutId="selectedDrone"

                            className="
                            absolute
                            left-0
                            top-0
                            h-full
                            w-1
                            rounded-r-full
                            bg-[#D4AF37]
                            "

                        />

                    )

                }

                {/* Background Aircraft */}

                <motion.div

                    animate={{

                        rotate: [0, 2, 0, -2, 0],

                        y: [0, -5, 0]

                    }}

                    transition={{

                        repeat: Infinity,

                        duration: 8

                    }}

                    className="
                    absolute
                    right-4
                    top-3
                    opacity-[0.04]
                    "

                >

                    <Plane

                        size={120}

                    />

                </motion.div>

                {/* Header */}

                <div className="relative z-10 flex items-start justify-between">

                    <div>

                        <div className="flex items-center gap-3">

                            <motion.div

                                animate={{

                                    y: [0, -3, 0],

                                    rotate: [0, -4, 0, 4, 0]

                                }}

                                transition={{

                                    repeat: Infinity,

                                    duration: 4

                                }}

                            >

                                <Plane

                                    className="text-cyan-400"

                                    size={22}

                                />

                            </motion.div>

                            <div>

                                <h3 className="text-lg font-semibold">

                                    {drone.serialNumber}

                                </h3>

                                <p className="text-xs text-gray-500">

                                    Surveillance Drone

                                </p>

                            </div>

                        </div>

                    </div>

                    <StatusIndicator

                        status={drone.status}

                        signal={drone.signal}

                        selected={selected}

                    />

                </div>

                {/* Battery */}

                <BatteryRibbon

                    value={drone.battery}

                />

                {/* Divider */}

                <div className="my-5 h-px bg-white/5" />

                {/* Metrics */}

                <div className="grid grid-cols-2 gap-3">

                    <MetricTile

                        icon={

                            <Battery

                                size={16}

                            />

                        }

                        label="Battery"

                        value={drone.battery}

                        suffix="%"

                        color="#22C55E"

                        active={selected}

                    />

                    <MetricTile

                        icon={

                            <MoveUp

                                size={16}

                            />

                        }

                        label="Altitude"

                        value={drone.altitude}

                        suffix=" m"

                        color="#38BDF8"

                    />
                                        <MetricTile

                        icon={

                            <Gauge

                                size={16}

                            />

                        }

                        label="Speed"

                        value={drone.speed}

                        suffix=" m/s"

                        color="#D4AF37"

                    />

                    <MetricTile

                        icon={

                            <Radio

                                size={16}

                            />

                        }

                        label="Signal"

                        value={drone.signal}

                        suffix="%"

                        color="#A855F7"

                    />

                </div>

                {/* Divider */}

                <div className="my-5 h-px bg-white/5" />

                {/* Footer */}

                <div className="relative z-10 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <MapPinned

                            size={16}

                            className="text-cyan-400"

                        />

                        <div>

                            <p className="text-[10px] uppercase tracking-[0.22em] text-gray-500">

                                Mission

                            </p>

                            <p className="text-sm font-medium">

                                Surveillance

                            </p>

                        </div>

                    </div>

                    <div className="text-right">

                        <p className="text-[10px] uppercase tracking-[0.22em] text-gray-500">

                            Updated

                        </p>

                        <motion.p

                            key={`${drone.battery}-${drone.altitude}-${drone.speed}-${drone.signal}`}

                            initial={{

                                opacity: 0,

                                y: 5

                            }}

                            animate={{

                                opacity: 1,

                                y: 0

                            }}

                            transition={{

                                duration: 0.25

                            }}

                            className="text-sm font-medium text-cyan-400"

                        >

                            Live

                        </motion.p>

                    </div>

                </div>

            </GlassPanel>

        </motion.button>

    );

}

export default FleetCard;