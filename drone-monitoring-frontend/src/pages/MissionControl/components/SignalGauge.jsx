import {
    Wifi,
    WifiHigh,
    WifiLow,
    WifiOff,
    Radio
} from "lucide-react";

import { motion } from "motion/react";

import TelemetryCard from "./TelemetryCard";

function SignalGauge({

    value = 0

}) {

    const signal = Math.max(0, Math.min(100, value));

    const color =
        signal > 80
            ? "#22C55E"
            : signal > 50
            ? "#F59E0B"
            : "#EF4444";

    const quality =
        signal > 90
            ? "Excellent"
            : signal > 70
            ? "Good"
            : signal > 40
            ? "Weak"
            : "Lost";

    const Icon =
        signal > 80

            ? WifiHigh

            : signal > 50

            ? Wifi

            : signal > 20

            ? WifiLow

            : WifiOff;

    return (

        <TelemetryCard

            title="Signal"

            value={signal}

            unit="%"

            color={color}

            footer={

                <div className="flex flex-col items-center">

                    <span

                        className="text-[11px] font-semibold uppercase tracking-[0.25em]"

                        style={{

                            color

                        }}

                    >

                        {quality}

                    </span>

                    <div className="mt-2 flex items-end gap-1">

                        {

                            [20, 40, 60, 80].map((level, index) => (

                                <motion.div

                                    key={level}

                                    animate={

                                        signal >= level

                                            ? {

                                                opacity: [0.45, 1, 0.45]

                                            }

                                            : {}

                                    }

                                    transition={{

                                        repeat: Infinity,

                                        duration: 1.5,

                                        delay: index * 0.15

                                    }}

                                    className="w-2 rounded-full"

                                    style={{

                                        height: `${8 + index * 5}px`,

                                        background:

                                            signal >= level

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

            <div className="relative">

                <motion.div

                    animate={{

                        scale:

                            signal < 30

                                ? [1, 1.15, 1]

                                : [1, 1.05, 1]

                    }}

                    transition={{

                        repeat: Infinity,

                        duration: signal < 30 ? 0.8 : 2

                    }}

                >

                    <Icon

                        size={22}

                        color={color}

                    />

                </motion.div>

                {

                    signal > 60 && (

                        <motion.div

                            animate={{

                                scale: [1, 1.6, 1],

                                opacity: [0.3, 0.8, 0.3]

                            }}

                            transition={{

                                repeat: Infinity,

                                duration: 1.6

                            }}

                            className="absolute -right-1 -top-1"

                        >

                            <Radio

                                size={10}

                                color="#38BDF8"

                            />

                        </motion.div>

                    )

                }

            </div>

        </TelemetryCard>

    );

}

export default SignalGauge;