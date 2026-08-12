import { motion } from "motion/react";

import {
    CloudSun,
    Wind,
    Droplets,
    Eye,
    ThermometerSun
} from "lucide-react";

import PremiumCard from "../../../ui/Card/PremiumCard";

function WeatherMetric({
    icon: Icon,
    label,
    value,
    color
}) {
    return (
        <motion.div
            whileHover={{
                y: -3
            }}
            className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-4
                transition-all
                duration-300
                hover:border-white/[0.14]
            "
        >
            <div className="flex items-center gap-3">
                <div
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                    "
                    style={{
                        background: `${color}18`
                    }}
                >
                    <Icon
                        size={18}
                        style={{
                            color
                        }}
                    />
                </div>

                <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-gray-600">
                        {label}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                        {value}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

function WeatherCard() {
    return (
        <PremiumCard
            className="p-7"
            delay={0.35}
        >
            {/* Header */}

            <div className="flex items-start justify-between gap-5">
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[var(--aerion-primary)]">
                        FLIGHT CONDITIONS
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold text-white">
                        Weather Intelligence
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Current atmospheric conditions
                    </p>
                </div>

                <motion.div
                    animate={{
                        y: [0, -4, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
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
                        bg-[var(--aerion-primary-soft)]
                    "
                >
                    <CloudSun
                        size={29}
                        className="text-[var(--aerion-primary)]"
                    />
                </motion.div>
            </div>

            {/* Main weather */}

            <div
                className="
                    relative
                    mt-8
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    p-6
                "
            >
                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-16
                        h-44
                        w-44
                        rounded-full
                        bg-[#D4AF37]/[0.06]
                        blur-[70px]
                    "
                />

                <div className="relative flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">
                            Flight Environment
                        </p>

                        <div className="mt-3 flex items-end gap-3">
                            <span className="text-6xl font-bold tracking-tight text-white">
                                24°
                            </span>

                            <span className="mb-2 text-sm text-gray-500">
                                Clear
                            </span>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                            <motion.span
                                animate={{
                                    opacity: [1, 0.4, 1]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2
                                }}
                                className="
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-green-400
                                "
                            />

                            <span className="text-xs font-medium text-green-400">
                                FLIGHT CONDITIONS OPTIMAL
                            </span>
                        </div>
                    </div>

                    <motion.div
                        animate={{
                            rotate: [0, 8, -8, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 6,
                            ease: "easeInOut"
                        }}
                    >
                        <CloudSun
                            size={76}
                            strokeWidth={1.2}
                            className="text-[var(--aerion-primary)]"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Weather metrics */}

            <div className="mt-5 grid grid-cols-2 gap-4">
                <WeatherMetric
                    icon={Wind}
                    label="Wind"
                    value="12 km/h"
                    color="#38BDF8"
                />

                <WeatherMetric
                    icon={Droplets}
                    label="Humidity"
                    value="58%"
                    color="#60A5FA"
                />

                <WeatherMetric
                    icon={Eye}
                    label="Visibility"
                    value="10 km"
                    color="#22C55E"
                />

                <WeatherMetric
                    icon={ThermometerSun}
                    label="Feels Like"
                    value="25°"
                    color="#FACC15"
                />
            </div>

            {/* Flight advisory */}

            <div
                className="
                    mt-5
                    rounded-2xl
                    border
                    border-green-500/10
                    bg-green-500/[0.04]
                    p-5
                "
            >
                <div className="flex items-center gap-3">
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-green-500/10
                        "
                    >
                        <CloudSun
                            size={19}
                            className="text-green-400"
                        />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-green-400">
                            Flight Advisory
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Atmospheric conditions currently support normal drone operations.
                        </p>
                    </div>
                </div>
            </div>
        </PremiumCard>
    );
}

export default WeatherCard;