import {
    Battery,
    BatteryCharging,
    BatteryWarning
} from "lucide-react";

import { motion } from "motion/react";

import CircularGauge from "./CircularGauge";

function BatteryGauge({

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
        battery > 85
            ? "Excellent"
            : battery > 60
            ? "Healthy"
            : battery > 30
            ? "Low"
            : "Critical";

    const Icon =
        battery < 20

            ? BatteryWarning

            : battery > 95

            ? BatteryCharging

            : Battery;

    return (

        <CircularGauge

            title="Battery"

            value={battery}

            unit="%"

            color={color}

            max={100}

            icon={

                <motion.div

                    animate={

                        battery < 20

                            ? {

                                scale: [1, 1.18, 1],

                                opacity: [1, .55, 1]

                            }

                            : battery > 95

                            ? {

                                y: [0, -3, 0]

                            }

                            : {}

                    }

                    transition={{

                        repeat: Infinity,

                        duration: battery < 20 ? 0.8 : 2

                    }}

                >

                    <Icon

                        size={24}

                        color={color}

                    />

                </motion.div>

            }

            footer={

                <div className="flex flex-col items-center">

                    <span

                        className="text-[11px] font-semibold uppercase tracking-[0.25em]"

                        style={{

                            color

                        }}

                    >

                        {health}

                    </span>

                    <div

                        className="mt-2 h-1.5 w-24 overflow-hidden rounded-full"

                        style={{

                            background: "#232323"

                        }}

                    >

                        <motion.div

                            animate={{

                                width: `${battery}%`

                            }}

                            transition={{

                                duration: 0.7

                            }}

                            className="h-full rounded-full"

                            style={{

                                background: color

                            }}

                        />

                    </div>

                </div>

            }

        />

    );

}

export default BatteryGauge;