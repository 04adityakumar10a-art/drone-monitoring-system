import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import PremiumCard from "../../../ui/Card/PremiumCard";

function KPICard({
    title,
    value,
    suffix = "",
    icon: Icon,
    color = "#D4AF37",
    subtitle,
    delay = 0
}) {
    return (
        <PremiumCard
            className="p-6"
            delay={delay}
        >
            {/* Top */}

            <div className="flex items-center justify-between">
                <motion.div
                    whileHover={{
                        rotate: 10,
                        scale: 1.08
                    }}
                    transition={{
                        duration: 0.2
                    }}
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                    "
                    style={{
                        background: `${color}15`
                    }}
                >
                    {Icon && (
                        <Icon
                            size={27}
                            style={{
                                color
                            }}
                        />
                    )}
                </motion.div>

                <motion.div
                    whileHover={{
                        x: 3,
                        y: -3
                    }}
                    className="
                        rounded-full
                        border
                        border-white/[0.08]
                        bg-white/[0.03]
                        p-2
                    "
                >
                    <ArrowUpRight
                        size={16}
                        className="text-gray-500"
                    />
                </motion.div>
            </div>

            {/* Number */}

            <div className="mt-8">
                <div className="flex items-baseline gap-1">
                    <motion.span
                        initial={{
                            opacity: 0,
                            y: 10
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0
                        }}
                        viewport={{
                            once: true
                        }}
                        transition={{
                            duration: 0.5,
                            delay: delay + 0.15
                        }}
                        className="text-5xl font-bold tracking-tight text-white"
                    >
                        {Number(value || 0).toLocaleString()}
                    </motion.span>

                    {suffix && (
                        <span
                            className="text-2xl font-semibold"
                            style={{
                                color
                            }}
                        >
                            {suffix}
                        </span>
                    )}
                </div>

                <p className="mt-3 text-xs uppercase tracking-[0.25em] text-gray-500">
                    {title}
                </p>
            </div>

            {/* Footer */}

            <div className="mt-7">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                <p className="mt-4 text-sm text-gray-500">
                    {subtitle}
                </p>
            </div>

            {/* Bottom indicator */}

            <motion.div
                initial={{
                    scaleX: 0
                }}
                whileInView={{
                    scaleX: 1
                }}
                viewport={{
                    once: true
                }}
                transition={{
                    duration: 0.9,
                    delay: delay + 0.2
                }}
                className="
                    mt-5
                    h-[2px]
                    w-full
                    origin-left
                    rounded-full
                "
                style={{
                    background: color
                }}
            />
        </PremiumCard>
    );
}

export default KPICard;