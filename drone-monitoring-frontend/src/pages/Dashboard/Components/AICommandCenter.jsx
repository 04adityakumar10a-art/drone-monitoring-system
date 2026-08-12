import { motion } from "motion/react";

import {
    Bot,
    Sparkles,
    BatteryWarning,
    Wifi,
    CloudSun,
    Send,
    BrainCircuit
} from "lucide-react";

import PremiumCard from "../../../ui/Card/PremiumCard";

function Insight({
    icon: Icon,
    title,
    description,
    color
}) {
    return (
        <motion.div
            whileHover={{
                x: 5
            }}
            transition={{
                duration: 0.2
            }}
            className="
                flex
                gap-4
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-4
                transition-colors
                duration-300
                hover:border-white/[0.14]
                hover:bg-white/[0.04]
            "
        >
            <div
                className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                "
                style={{
                    background: `${color}20`
                }}
            >
                <Icon
                    size={20}
                    style={{
                        color
                    }}
                />
            </div>

            <div>
                <h3 className="font-semibold text-white">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-400">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

function AICommandCenter({
    stats,
    batteryDistribution,
    telemetry
}) {
    const critical =
        batteryDistribution.find(
            (item) => item.range === "0-29%"
        )?.count || 0;

    const telemetryOnline =
        Object.keys(telemetry ?? {}).length > 0;

    const fleetHealth =
        critical > 0
            ? "CRITICAL"
            : "HEALTHY";

    const healthColor =
        critical > 0
            ? "#EF4444"
            : "#22C55E";

    const recommendations = [
        {
            icon: BatteryWarning,
            color: "#EF4444",
            title: "Battery Intelligence",
            description:
                critical > 0
                    ? `${critical} drone${critical === 1 ? "" : "s"} require immediate charging before deployment.`
                    : "Battery levels are currently within acceptable operational limits."
        },
        {
            icon: Wifi,
            color: telemetryOnline
                ? "#22C55E"
                : "#EF4444",
            title: "Telemetry",
            description:
                telemetryOnline
                    ? "Live telemetry stream detected and actively receiving drone data."
                    : "No active telemetry stream detected. Waiting for drone telemetry."
        },
        {
            icon: CloudSun,
            color: critical > 0
                ? "#FACC15"
                : "#22C55E",
            title: "Flight Recommendation",
            description:
                critical > 0
                    ? "Delay new missions until critically low batteries have been recharged."
                    : "Fleet battery conditions are suitable for continued operations."
        }
    ];

    return (
        <PremiumCard
            className="p-7"
            delay={0.1}
        >
            {/* Header */}

            <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                    <motion.div
                        whileHover={{
                            rotate: 8,
                            scale: 1.05
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
                            border-[#D4AF37]/15
                            bg-[var(--aerion-primary-soft)]
                        "
                    >
                        <BrainCircuit
                            size={30}
                            className="text-[var(--aerion-primary)]"
                        />
                    </motion.div>

                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-[var(--aerion-primary)]">
                            AERION AI
                        </p>

                        <h2 className="mt-2 text-3xl font-semibold text-white">
                            AI Command Center
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Fleet intelligence and operational recommendations
                        </p>
                    </div>
                </div>

                <motion.div
                    animate={{
                        boxShadow: [
                            `0 0 0px ${healthColor}00`,
                            `0 0 20px ${healthColor}30`,
                            `0 0 0px ${healthColor}00`
                        ]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2.5
                    }}
                    className="
                        shrink-0
                        rounded-full
                        border
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        tracking-[0.15em]
                    "
                    style={{
                        borderColor: `${healthColor}30`,
                        background: `${healthColor}12`,
                        color: healthColor
                    }}
                >
                    {fleetHealth}
                </motion.div>
            </div>

            {/* AI status */}

            <div
                className="
                    mt-7
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-[#D4AF37]/10
                    bg-[#D4AF37]/[0.04]
                    px-4
                    py-3
                "
            >
                <motion.div
                    animate={{
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 8,
                        ease: "linear"
                    }}
                >
                    <Sparkles
                        size={17}
                        className="text-[var(--aerion-primary)]"
                    />
                </motion.div>

                <p className="text-sm text-gray-400">
                    AERION intelligence engine is analyzing current fleet conditions.
                </p>

                <span className="ml-auto text-xs font-medium text-[var(--aerion-primary)]">
                    LIVE
                </span>
            </div>

            {/* Recommendations */}

            <div className="mt-5 space-y-3">
                {recommendations.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{
                            opacity: 0,
                            x: -15
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0
                        }}
                        viewport={{
                            once: true
                        }}
                        transition={{
                            delay: 0.15 + index * 0.1,
                            duration: 0.4
                        }}
                    >
                        <Insight
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            color={item.color}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Metrics */}

            <div className="mt-7 grid gap-4 md:grid-cols-3">
                <div
                    className="
                        rounded-2xl
                        border
                        border-white/[0.07]
                        bg-white/[0.025]
                        p-5
                    "
                >
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                        Confidence
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                        <h3 className="text-4xl font-bold text-[var(--aerion-primary)]">
                            98%
                        </h3>

                        <Sparkles
                            size={17}
                            className="text-[var(--aerion-primary)]"
                        />
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                        Recommendation confidence
                    </p>
                </div>

                <div
                    className="
                        rounded-2xl
                        border
                        border-white/[0.07]
                        bg-white/[0.025]
                        p-5
                    "
                >
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                        Fleet
                    </p>

                    <h3 className="mt-3 text-4xl font-bold text-white">
                        {stats?.totalDrones ?? 0}
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                        Registered drones
                    </p>
                </div>

                <div
                    className="
                        rounded-2xl
                        border
                        border-white/[0.07]
                        bg-white/[0.025]
                        p-5
                    "
                >
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                        AI Engine
                    </p>

                    <h3 className="mt-3 text-3xl font-bold text-green-400">
                        ONLINE
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                        Intelligence engine active
                    </p>
                </div>
            </div>

            {/* Ask AERION */}

            <div
                className="
                    mt-7
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-black/20
                    p-3
                    transition-all
                    duration-300
                    focus-within:border-[#D4AF37]/30
                    focus-within:shadow-[0_0_30px_rgba(212,175,55,.06)]
                "
            >
                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[var(--aerion-primary-soft)]
                    "
                >
                    <Bot
                        size={19}
                        className="text-[var(--aerion-primary)]"
                    />
                </div>

                <input
                    type="text"
                    placeholder="Ask AERION about fleet health..."
                    className="
                        min-w-0
                        flex-1
                        bg-transparent
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-gray-600
                    "
                />

                <motion.button
                    whileHover={{
                        scale: 1.06
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
                        rounded-xl
                        bg-[#D4AF37]
                        text-black
                        shadow-[0_0_20px_rgba(212,175,55,.15)]
                    "
                >
                    <Send size={17} />
                </motion.button>
            </div>
        </PremiumCard>
    );
}

export default AICommandCenter;