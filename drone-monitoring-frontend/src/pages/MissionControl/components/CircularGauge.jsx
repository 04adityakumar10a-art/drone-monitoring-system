import { motion } from "motion/react";
import { useMemo } from "react";

import GlassPanel from "../../../ui/Panel/GlassPanel";
import AnimatedCounter from "../../../ui/Counter/AnimatedCounter";

function CircularGauge({

    title,

    value,

    unit,

    color,

    icon,

    max = 100,

    footer

}) {

    const radius = 34;
    const stroke = 7;

    const progress = Math.max(
        0,
        Math.min(value, max)
    );

    const circumference =
        2 * Math.PI * radius;

    const offset =
        circumference -
        (progress / max) * circumference;

    const ticks = useMemo(() => {

        return Array.from(

            { length: 24 },

            (_, index) => ({

                angle: index * 15,

                major: index % 3 === 0

            })

        );

    }, []);

    return (

        <GlassPanel

            glow

            className="
            relative
            overflow-hidden
            p-4
            "

        >

            {/* Ambient Glow */}

            <motion.div

                animate={{

                    opacity: [.03, .08, .03]

                }}

                transition={{

                    repeat: Infinity,

                    duration: 4

                }}

                className="absolute inset-0"

                style={{

                    background:
                        `radial-gradient(circle at center, ${color}20, transparent 70%)`

                }}

            />

            {/* Header */}

            <div className="relative z-10 mb-3">

                <p className="text-[10px] uppercase tracking-[0.22em] text-gray-500">

                    {title}

                </p>

            </div>

            {/* Gauge */}

            <div className="relative flex justify-center">

                <svg

                    width="100"

                    height="100"

                    className="-rotate-90"

                >

                    {

                        ticks.map((tick, index) => {

                            const inner =
                                tick.major ? 40 : 42;

                            const outer = 46;

                            const x1 =
                                50 +
                                inner *
                                Math.cos(
                                    (tick.angle - 90) *
                                    Math.PI /
                                    180
                                );

                            const y1 =
                                50 +
                                inner *
                                Math.sin(
                                    (tick.angle - 90) *
                                    Math.PI /
                                    180
                                );

                            const x2 =
                                50 +
                                outer *
                                Math.cos(
                                    (tick.angle - 90) *
                                    Math.PI /
                                    180
                                );

                            const y2 =
                                50 +
                                outer *
                                Math.sin(
                                    (tick.angle - 90) *
                                    Math.PI /
                                    180
                                );

                            return (

                                <line

                                    key={index}

                                    x1={x1}

                                    y1={y1}

                                    x2={x2}

                                    y2={y2}

                                    stroke={

                                        tick.major

                                            ? "#555"

                                            : "#2A2A2A"

                                    }

                                    strokeWidth={

                                        tick.major

                                            ? 1.6

                                            : 1

                                    }

                                />

                            );

                        })

                    }

                    <circle

                        cx="50"

                        cy="50"

                        r={radius}

                        fill="none"

                        stroke="#252525"

                        strokeWidth={stroke}

                    />

                    <circle

                        cx="50"

                        cy="50"

                        r={radius}

                        fill="none"

                        stroke={color}

                        strokeOpacity=".15"

                        strokeWidth={stroke + 4}

                    />

                    <motion.circle

                        cx="50"

                        cy="50"

                        r={radius}

                        fill="none"

                        stroke={color}

                        strokeWidth={stroke}

                        strokeLinecap="round"

                        strokeDasharray={circumference}

                        animate={{

                            strokeDashoffset: offset

                        }}

                        transition={{

                            duration: .7

                        }}

                    />

                </svg>

                {/* CENTER CONTENT STARTS HERE */}

                <div

                    className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    items-center
                    justify-center
                    "

                >
                    {/* Icon */}

                    <motion.div

                        whileHover={{

                            scale: 1.1,

                            rotate: 8

                        }}

                        animate={{

                            scale: [1, 1.04, 1]

                        }}

                        transition={{

                            repeat: Infinity,

                            duration: 2.2

                        }}

                        className="mb-1"

                    >

                        {icon}

                    </motion.div>

                    {/* Value */}

                    <AnimatedCounter

                        value={value}

                        decimals={

                            Number.isInteger(value)

                                ? 0

                                : 1

                        }

                        className="
                        text-[28px]
                        font-bold
                        leading-none
                        "

                    />

                    {/* Unit */}

                    <span

                        className="
                        -mt-0.5
                        text-[10px]
                        uppercase
                        tracking-[0.15em]
                        text-gray-500
                        "

                    >

                        {unit}

                    </span>

                </div>

            </div>

            {/* Footer */}

            {

                footer && (

                    <div className="mt-3 flex justify-center">

                        {footer}

                    </div>

                )

            }

            {/* Bottom Accent */}

            <motion.div

                animate={{

                    opacity: [0.15, 0.45, 0.15]

                }}

                transition={{

                    repeat: Infinity,

                    duration: 3

                }}

                className="mt-3 h-px"

                style={{

                    background: `linear-gradient(
                        90deg,
                        transparent,
                        ${color},
                        transparent
                    )`

                }}

            />

        </GlassPanel>

    );

}

export default CircularGauge;