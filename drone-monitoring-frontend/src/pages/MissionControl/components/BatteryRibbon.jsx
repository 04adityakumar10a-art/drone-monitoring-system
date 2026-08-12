import { motion } from "motion/react";

function BatteryRibbon({

    value = 0

}) {

    const battery = Math.max(0, Math.min(100, value));

    const color =
        battery > 60
            ? "#22C55E"
            : battery > 30
            ? "#F59E0B"
            : "#EF4444";

    const health =
        battery > 80
            ? "Excellent"
            : battery > 60
            ? "Healthy"
            : battery > 30
            ? "Medium"
            : battery > 15
            ? "Low"
            : "Critical";

    return (

        <div className="mt-5">

            {/* Header */}

            <div className="mb-2 flex items-center justify-between">

                <span className="text-[10px] uppercase tracking-[0.22em] text-gray-500">

                    Battery

                </span>

                <motion.span

                    key={battery}

                    initial={{

                        opacity: 0,

                        y: -4

                    }}

                    animate={{

                        opacity: 1,

                        y: 0

                    }}

                    className="text-sm font-semibold"

                    style={{

                        color

                    }}

                >

                    {battery}%

                </motion.span>

            </div>

            {/* Progress */}

            <div className="relative h-2 overflow-hidden rounded-full bg-white/5">

                {/* Glow */}

                <motion.div

                    animate={{

                        opacity: [0.35, 0.8, 0.35]

                    }}

                    transition={{

                        repeat: Infinity,

                        duration: 2.4

                    }}

                    className="absolute inset-0"

                    style={{

                        background: `linear-gradient(90deg, transparent, ${color}, transparent)`

                    }}

                />

                {/* Fill */}

                <motion.div

                    initial={{

                        width: 0

                    }}

                    animate={{

                        width: `${battery}%`

                    }}

                    transition={{

                        duration: 0.8,

                        ease: "easeOut"

                    }}

                    className="relative h-full rounded-full"

                    style={{

                        background: `linear-gradient(90deg, ${color}, ${color}CC)`

                    }}

                />

            </div>

            {/* Footer */}

            <div className="mt-2 flex items-center justify-between">

                <span

                    className="text-xs font-medium"

                    style={{

                        color

                    }}

                >

                    {health}

                </span>

                <span className="text-[11px] text-gray-500">

                    Live

                </span>

            </div>

        </div>

    );

}

export default BatteryRibbon;