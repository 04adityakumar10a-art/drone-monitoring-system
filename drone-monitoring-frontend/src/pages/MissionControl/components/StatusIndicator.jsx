import { motion } from "motion/react";
import {
    CheckCircle2,
    TriangleAlert,
    WifiOff,
    Radio
} from "lucide-react";

function StatusIndicator({

    status = "ACTIVE",

    signal = 100,

    selected = false

}) {

    const isActive = status === "ACTIVE";

    const isWarning = signal < 40 && signal >= 15;

    const isOffline = status === "OFFLINE";

    const color = isOffline
        ? "#6B7280"
        : isWarning
        ? "#F59E0B"
        : "#22C55E";

    const label = isOffline
        ? "OFFLINE"
        : isWarning
        ? "WARNING"
        : "LIVE";

    const Icon = isOffline
        ? WifiOff
        : isWarning
        ? TriangleAlert
        : CheckCircle2;

    return (

        <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

                <motion.div

                    animate={

                        isActive

                            ? {

                                  scale: [1, 1.35, 1],

                                  opacity: [1, 0.5, 1]

                              }

                            : {}

                    }

                    transition={{

                        repeat: Infinity,

                        duration: 1.6

                    }}

                    className="h-2.5 w-2.5 rounded-full"

                    style={{

                        background: color,

                        boxShadow: `0 0 15px ${color}`

                    }}

                />

                <span

                    className="text-[10px] font-semibold tracking-[0.25em]"

                    style={{ color }}

                >

                    {label}

                </span>

            </div>

            <motion.div

                whileHover={{

                    rotate: 10,

                    scale: 1.08

                }}

                className="flex items-center gap-2"

            >

                <Radio

                    size={14}

                    className="text-cyan-400"

                />

                <span className="text-xs text-gray-400">

                    {signal}%

                </span>

            </motion.div>

            {selected && (

                <motion.div

                    layoutId="fleet-selection"

                    className="absolute inset-0 rounded-3xl border border-[#D4AF37]/40"

                    style={{

                        boxShadow:
                            "0 0 25px rgba(212,175,55,.18)"

                    }}

                />

            )}

        </div>

    );

}

export default StatusIndicator;