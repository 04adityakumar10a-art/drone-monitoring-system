import {
    Gauge,
    Rocket,
    Zap
} from "lucide-react";

import { motion } from "motion/react";

import TelemetryCard from "./TelemetryCard";

function SpeedGauge({

    value = 0

}) {

    const speed = Math.max(0, value);

    const color =
        speed < 5
            ? "#22C55E"
            : speed < 12
            ? "#D4AF37"
            : "#38BDF8";

    const zone =
        speed < 5
            ? "Hover"
            : speed < 12
            ? "Cruise"
            : speed < 20
            ? "Fast"
            : "Maximum";

    const Icon =
        speed > 15

            ? Rocket

            : Gauge;

    return (

        <TelemetryCard

            title="Speed"

            value={speed}

            unit="m/s"

            color={color}

            footer={

                <div className="flex flex-col items-center">

                    <span

                        className="text-[11px] font-semibold uppercase tracking-[0.25em]"

                        style={{

                            color

                        }}

                    >

                        {zone}

                    </span>

                    <div className="mt-2 flex items-center gap-1">

                        {

                            [...Array(5)].map((_, index) => (

                                <motion.div

                                    key={index}

                                    animate={

                                        speed >

                                        (index + 1) * 4

                                            ? {

                                                opacity: [0.45, 1, 0.45]

                                            }

                                            : {}

                                    }

                                    transition={{

                                        repeat: Infinity,

                                        duration: 1.2,

                                        delay: index * 0.1

                                    }}

                                    className="h-1.5 w-5 rounded-full"

                                    style={{

                                        background:

                                            speed >

                                            (index + 1) * 4

                                                ? color

                                                : "#2A2A2A"

                                    }}

                                />

                            ))

                        }

                    </div>

                </div>

            }

        >

            <motion.div

                animate={{

                    rotate:

                        speed > 0

                            ? [0, 12, -12, 0]

                            : 0

                }}

                transition={{

                    repeat: Infinity,

                    duration: 1.8

                }}

            >

                <Icon

                    size={20}

                    color={color}

                />

            </motion.div>

            {

                speed > 18 && (

                    <motion.div

                        animate={{

                            scale: [1, 1.3, 1],

                            opacity: [0.5, 1, 0.5]

                        }}

                        transition={{

                            repeat: Infinity,

                            duration: 0.8

                        }}

                        className="absolute -right-2 -top-2"

                    >

                        <Zap

                            size={14}

                            color="#FACC15"

                        />

                    </motion.div>

                )

            }

        </TelemetryCard>

    );

}

export default SpeedGauge;