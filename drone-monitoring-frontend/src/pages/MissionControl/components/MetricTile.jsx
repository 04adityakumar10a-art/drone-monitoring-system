import { motion } from "motion/react";
import clsx from "clsx";
import AnimatedCounter from "../../../ui/Counter/AnimatedCounter";

function MetricTile({

    icon,

    label,

    value = 0,

    suffix = "",

    color = "#22D3EE",

    trend,

    active = false

}) {

    return (

        <motion.div

            whileHover={{

                y: -3,

                scale: 1.03

            }}

            transition={{

                duration: 0.2

            }}

            className={clsx(

                `
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/5
                bg-white/[0.03]
                p-3
                backdrop-blur-xl
                transition-all
                duration-300
                `,

                active &&
                "border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,.15)]"

            )}

        >

            {/* Glow */}

            <motion.div

                animate={{

                    opacity: active ? [0.08, 0.18, 0.08] : 0.04

                }}

                transition={{

                    repeat: Infinity,

                    duration: 2.5

                }}

                className="absolute inset-0"

                style={{

                    background: `radial-gradient(circle at top right, ${color}, transparent 65%)`

                }}

            />

            <div className="relative z-10">

                {/* Header */}

                <div className="flex items-center gap-2">

                    <div

                        className="rounded-lg p-2"

                        style={{

                            backgroundColor: `${color}15`

                        }}

                    >

                        <div style={{ color }}>

                            {icon}

                        </div>

                    </div>

                    <span className="text-[10px] uppercase tracking-[0.22em] text-gray-500">

                        {label}

                    </span>

                </div>

                {/* Value */}

                <div className="mt-4 flex items-end gap-2">

                    <AnimatedCounter

                        value={value}

                        decimals={Number.isInteger(value) ? 0 : 1}

                        suffix={suffix}

                        className="text-2xl font-bold"

                    />

                    {

                        trend && (

                            <motion.span

                                initial={{

                                    opacity: 0

                                }}

                                animate={{

                                    opacity: 1

                                }}

                                className={clsx(

                                    "mb-1 text-xs font-medium",

                                    trend > 0

                                        ? "text-green-400"

                                        : "text-red-400"

                                )}

                            >

                                {trend > 0 ? "+" : ""}

                                {trend}

                            </motion.span>

                        )

                    }

                </div>

            </div>

        </motion.div>

    );

}

export default MetricTile;