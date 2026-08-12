import { motion } from "motion/react";
import { Compass } from "lucide-react";

import GlassPanel from "../../../ui/Panel/GlassPanel";
import AnimatedCounter from "../../../ui/Counter/AnimatedCounter";

function CompassCard({ heading = 0 }) {

    const directions = [

        { label: "N", angle: 0 },
        { label: "E", angle: 90 },
        { label: "S", angle: 180 },
        { label: "W", angle: 270 }

    ];

    return (

        <GlassPanel

            glow

            className="relative overflow-hidden p-5"

        >

            {/* Ambient Glow */}

            <motion.div

                animate={{

                    opacity: [0.04, 0.12, 0.04]

                }}

                transition={{

                    repeat: Infinity,

                    duration: 5

                }}

                className="absolute inset-0"

                style={{

                    background:

                        "radial-gradient(circle at center, rgba(212,175,55,.08), transparent 70%)"

                }}

            />

            {/* Header */}

            <div className="relative z-10 mb-5 flex items-center justify-between">

                <div>

                    <p className="text-[11px] uppercase tracking-[0.28em] text-gray-500">

                        Navigation

                    </p>

                    <h3 className="mt-1 text-lg font-semibold">

                        Compass

                    </h3>

                </div>

                <motion.div

                    whileHover={{

                        rotate: 20,

                        scale: 1.15

                    }}

                >

                    <Compass

                        size={22}

                        className="text-[var(--aerion-primary)]"

                    />

                </motion.div>

            </div>

            {/* Compass */}

            <div className="relative flex justify-center">

                <div className="relative h-44 w-44">

                    {/* Outer Ring */}

                    <motion.div

                        animate={{

                            rotate: heading

                        }}

                        transition={{

                            duration: 0.6

                        }}

                        className="
                        absolute
                        inset-0
                        rounded-full
                        border-2
                        border-white/10
                        "

                    >

                        {

                            directions.map((direction) => (

                                <div

                                    key={direction.label}

                                    className="absolute left-1/2 top-1/2"

                                    style={{

                                        transform: `rotate(${direction.angle}deg) translateY(-74px)`

                                    }}

                                >

                                    <span

                                        className="
                                        block
                                        -translate-x-1/2
                                        text-xs
                                        font-semibold
                                        text-gray-400
                                        "

                                    >

                                        {direction.label}

                                    </span>

                                </div>

                            ))

                        }

                    </motion.div>

                    {/* Tick Marks */}

                    {

                        Array.from({ length: 36 }).map((_, i) => (

                            <div

                                key={i}

                                className="absolute left-1/2 top-1/2"

                                style={{

                                    transform: `rotate(${i * 10}deg) translateY(-69px)`

                                }}

                            >

                                <div

                                    className={

                                        i % 3 === 0

                                            ? "h-4 w-[2px] bg-gray-400"

                                            : "h-2 w-px bg-gray-600"

                                    }

                                />

                            </div>

                        ))

                    }

                    {/* Fixed Aircraft */}

                    <div

                        className="
                        absolute
                        left-1/2
                        top-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        "

                    >

                        <div className="h-14 w-[3px] rounded-full bg-[#D4AF37]" />

                        <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-t-2 border-l-2 border-[#D4AF37]" />

                    </div>

                    {/* North Pointer */}

                    <motion.div

                        animate={{

                            opacity: [0.6, 1, 0.6]

                        }}

                        transition={{

                            repeat: Infinity,

                            duration: 2

                        }}

                        className="
                        absolute
                        left-1/2
                        top-2
                        -translate-x-1/2
                        "

                    >

                        <div className="h-3 w-3 rotate-45 bg-red-500" />

                    </motion.div>

                </div>

            </div>

            {/* Bottom */}

            <div className="mt-5 text-center">

                <AnimatedCounter

                    value={heading}

                    decimals={0}

                    suffix="°"

                    className="text-3xl font-bold"

                />

                <div className="mt-1 text-xs uppercase tracking-[0.25em] text-gray-500">

                    Current Heading

                </div>

            </div>

        </GlassPanel>

    );

}

export default CompassCard;