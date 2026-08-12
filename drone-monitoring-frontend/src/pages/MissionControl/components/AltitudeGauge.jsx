import {
    Mountain,
    ArrowUp,
    Plane
} from "lucide-react";

import { motion } from "motion/react";

import TelemetryCard from "./TelemetryCard";

function AltitudeGauge({

    value = 0

}) {

    const altitude = Math.max(0, value);

    const color =
        altitude < 20
            ? "#22C55E"
            : altitude < 80
            ? "#D4AF37"
            : "#38BDF8";

    const zone =
        altitude < 20
            ? "Ground"

            : altitude < 80
            ? "Low"

            : altitude < 150
            ? "Cruise"

            : "High";

    const Icon =

        altitude > 100

            ? Plane

            : ArrowUp;

    return (

        <TelemetryCard

            title="Altitude"

            value={altitude}

            unit="m"

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

                                        altitude >

                                        (index + 1) * 30

                                            ? {

                                                opacity: [0.5, 1, 0.5]

                                            }

                                            : {}

                                    }

                                    transition={{

                                        repeat: Infinity,

                                        duration: 2,

                                        delay: index * 0.15

                                    }}

                                    className="h-1.5 w-5 rounded-full"

                                    style={{

                                        background:

                                            altitude >

                                            (index + 1) * 30

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

                    y: [0, -4, 0]

                }}

                transition={{

                    repeat: Infinity,

                    duration: 2.5

                }}

            >

                <Icon

                    size={20}

                    color={color}

                />

            </motion.div>

        </TelemetryCard>

    );

}

export default AltitudeGauge;