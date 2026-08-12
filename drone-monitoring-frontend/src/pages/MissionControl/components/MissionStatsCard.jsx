import { motion } from "motion/react";
import {
    Timer,
    Gauge,
    MoveUp,
    Activity
} from "lucide-react";

import GlassPanel from "../../../ui/Panel/GlassPanel";
import AnimatedCounter from "../../../ui/Counter/AnimatedCounter";

function MissionStatsCard({ stats }) {

    const progress = Math.min(
        Math.max((stats.flightTime / 600) * 100, 0),
        100
    );

    return (

        <GlassPanel

            glow

            className="relative overflow-hidden p-5"

        >

            {/* Ambient Glow */}

            <motion.div

                animate={{

                    opacity: [0.05, 0.12, 0.05]

                }}

                transition={{

                    repeat: Infinity,

                    duration: 5

                }}

                className="absolute inset-0"

                style={{

                    background:
                        "radial-gradient(circle at top right, rgba(212,175,55,.08), transparent 70%)"

                }}

            />

            {/* Header */}

            <div className="relative z-10 flex items-center justify-between">

                <div>

                    <p className="text-[11px] uppercase tracking-[0.28em] text-gray-500">

                        Mission

                    </p>

                    <h3 className="mt-1 text-lg font-semibold">

                        Statistics

                    </h3>

                </div>

                <Activity

                    size={22}

                    className="text-[var(--aerion-primary)]"

                />

            </div>

            {/* Progress */}

            <div className="mt-6">

                <div className="mb-2 flex items-center justify-between">

                    <span className="text-xs uppercase tracking-[0.25em] text-gray-500">

                        Mission Progress

                    </span>

                    <span className="text-sm font-semibold text-[var(--aerion-primary)]">

                        {Math.round(progress)}%

                    </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/5">

                    <motion.div

                        animate={{

                            width: `${progress}%`

                        }}

                        transition={{

                            duration: .8

                        }}

                        className="h-full rounded-full"

                        style={{

                            background:
                                "linear-gradient(90deg,#D4AF37,#22D3EE)"

                        }}

                    />

                </div>

            </div>

            {/* Metrics */}

            <div className="mt-6 grid grid-cols-2 gap-4">

                <Metric

                    icon={<Timer size={16}/>}

                    label="Flight"

                    value={stats.flightTime}

                    suffix=" s"

                    color="#22D3EE"

                />

                <Metric

                    icon={<Gauge size={16}/>}

                    label="Speed"

                    value={stats.maxSpeed}

                    suffix=" m/s"

                    decimals={1}

                    color="#22C55E"

                />

                <Metric

                    icon={<MoveUp size={16}/>}

                    label="Altitude"

                    value={stats.maxAltitude}

                    suffix=" m"

                    decimals={1}

                    color="#D4AF37"

                />

                <Metric

                    icon={<Activity size={16}/>}

                    label="Status"

                    text="ACTIVE"

                    color="#22C55E"

                />

            </div>

        </GlassPanel>

    );

}

function Metric({

    icon,

    label,

    value,

    suffix = "",

    decimals = 0,

    text,

    color

}) {

    return (

        <motion.div

            whileHover={{

                scale: 1.03,

                y: -2

            }}

            className="
            rounded-xl
            border
            border-white/5
            bg-white/[0.03]
            p-3
            "

        >

            <div className="mb-2 flex items-center gap-2">

                <div

                    style={{

                        color

                    }}

                >

                    {icon}

                </div>

                <span className="text-[10px] uppercase tracking-[0.22em] text-gray-500">

                    {label}

                </span>

            </div>

            {

                text

                ?

                <div

                    className="text-lg font-bold"

                    style={{

                        color

                    }}

                >

                    {text}

                </div>

                :

                <AnimatedCounter

                    value={value}

                    decimals={decimals}

                    suffix={suffix}

                    className="text-2xl font-bold"

                />

            }

        </motion.div>

    );

}

export default MissionStatsCard;