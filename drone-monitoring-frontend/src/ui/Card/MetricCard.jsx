import { motion } from "motion/react";
import {
    TrendingUp,
    TrendingDown
} from "lucide-react";

import GlassPanel from "../Panel/GlassPanel";
import AnimatedCounter from "../Counter/AnimatedCounter";
import StatusChip from "../Badge/StatusChip";
import clsx from "clsx";
import { theme } from "../../design";

function MetricCard({

    title,

    value,

    suffix = "",

    decimals = 0,

    icon: Icon,

    trend,

    status,

    progress,

    color = "#D4AF37"

}) {

    return (

        <GlassPanel

            glow

            className={clsx(

                theme.panel,

                "group p-5"

            )}

        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">

                        {title}

                    </p>

                </div>

                {

                    Icon && (

                        <motion.div

                            whileHover={{

                                rotate: 10,

                                scale: 1.15

                            }}

                            className="rounded-xl bg-white/5 p-3"

                        >

                            <Icon

                                size={20}

                                style={{

                                    color

                                }}

                            />

                        </motion.div>

                    )

                }

            </div>

            {/* Value */}

            <div className="mt-5">

                <AnimatedCounter

                    value={value}

                    decimals={decimals}

                    suffix={suffix}

                    className="text-4xl font-bold"

                />

            </div>

            {/* Progress */}

            {

                progress !== undefined && (

                    <div className="mt-5">

                        <div className="h-2 overflow-hidden rounded-full bg-white/10">

                            <motion.div

                                initial={{

                                    width: 0

                                }}

                                animate={{

                                    width: `${progress}%`

                                }}

                                transition={{

                                    duration: 1

                                }}

                                className="h-full rounded-full"

                                style={{

                                    background: color

                                }}

                            />

                        </div>

                    </div>

                )

            }

            {/* Footer */}

            <div className="mt-5 flex items-center justify-between">

                {

                    status && (

                        <StatusChip

                            variant={status.variant}

                            text={status.text}

                            pulse={status.pulse}

                        />

                    )

                }

                {

                    trend !== undefined && (

                        <div className="flex items-center gap-2 text-sm">

                            {

                                trend >= 0

                                    ?

                                    <TrendingUp
                                        size={16}
                                        className="text-emerald-400"
                                    />

                                    :

                                    <TrendingDown
                                        size={16}
                                        className="text-red-400"
                                    />

                            }

                            <span>

                                {Math.abs(trend)}%

                            </span>

                        </div>

                    )

                }

            </div>

        </GlassPanel>

    );

}

export default MetricCard;