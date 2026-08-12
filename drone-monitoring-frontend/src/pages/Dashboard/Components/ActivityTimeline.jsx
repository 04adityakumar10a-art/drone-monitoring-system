import { motion } from "motion/react";

import {
    Radio,
    Plane,
    BatteryCharging,
    ShieldCheck,
    AlertTriangle
} from "lucide-react";

import PremiumCard from "../../../ui/Card/PremiumCard";

const activities = [
    {
        id: 1,
        icon: Radio,
        title: "Telemetry stream connected",
        description: "Live fleet telemetry channel is active.",
        time: "Now",
        color: "#22C55E"
    },
    {
        id: 2,
        icon: Plane,
        title: "Mission execution updated",
        description: "Active mission telemetry received.",
        time: "2 min ago",
        color: "#38BDF8"
    },
    {
        id: 3,
        icon: BatteryCharging,
        title: "Battery threshold detected",
        description: "Low battery drones identified by analytics.",
        time: "8 min ago",
        color: "#FACC15"
    },
    {
        id: 4,
        icon: ShieldCheck,
        title: "Fleet health check completed",
        description: "Platform health monitoring completed successfully.",
        time: "14 min ago",
        color: "#A855F7"
    }
];

function ActivityTimeline() {
    return (
        <PremiumCard
            className="p-7"
            delay={0.5}
        >
            {/* Header */}

            <div className="flex items-start justify-between gap-5">
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[var(--aerion-primary)]">
                        ACTIVITY
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold text-white">
                        Operations Timeline
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Latest platform events
                    </p>
                </div>

                <motion.div
                    animate={{
                        scale: [1, 1.06, 1]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2.5
                    }}
                    className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[#D4AF37]/15
                        bg-[var(--aerion-primary-soft)]
                    "
                >
                    <Radio
                        size={22}
                        className="text-[var(--aerion-primary)]"
                    />
                </motion.div>
            </div>

            {/* Timeline */}

            <div className="relative mt-8">
                {/* Vertical line */}

                <div
                    className="
                        absolute
                        bottom-5
                        left-[21px]
                        top-5
                        w-px
                        bg-gradient-to-b
                        from-[#D4AF37]/40
                        via-white/10
                        to-transparent
                    "
                />

                <div className="space-y-6">
                    {activities.map((activity, index) => {
                        const Icon = activity.icon;

                        return (
                            <motion.div
                                key={activity.id}
                                initial={{
                                    opacity: 0,
                                    x: -15
                                }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0
                                }}
                                viewport={{
                                    once: true
                                }}
                                transition={{
                                    delay:
                                        0.1 +
                                        index * 0.1,
                                    duration: 0.4
                                }}
                                className="
                                    relative
                                    flex
                                    gap-4
                                "
                            >
                                {/* Icon */}

                                <motion.div
                                    whileHover={{
                                        scale: 1.08
                                    }}
                                    className="
                                        relative
                                        z-10
                                        flex
                                        h-[43px]
                                        w-[43px]
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-white/[0.08]
                                        bg-[#0B0B0B]
                                    "
                                >
                                    <Icon
                                        size={18}
                                        style={{
                                            color:
                                                activity.color
                                        }}
                                    />
                                </motion.div>

                                {/* Content */}

                                <div
                                    className="
                                        min-w-0
                                        flex-1
                                        rounded-2xl
                                        border
                                        border-white/[0.07]
                                        bg-white/[0.025]
                                        p-4
                                        transition-all
                                        duration-300
                                        hover:border-white/[0.14]
                                        hover:bg-white/[0.04]
                                    "
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-sm font-semibold text-white">
                                            {activity.title}
                                        </h3>

                                        <span className="shrink-0 text-xs text-gray-600">
                                            {activity.time}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        {
                                            activity.description
                                        }
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}

            <motion.div
                initial={{
                    opacity: 0
                }}
                whileInView={{
                    opacity: 1
                }}
                viewport={{
                    once: true
                }}
                transition={{
                    delay: 0.6
                }}
                className="
                    mt-7
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-white/[0.02]
                    px-4
                    py-3
                "
            >
                <div className="flex items-center gap-2">
                    <motion.div
                        animate={{
                            opacity: [1, 0.35, 1]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.8
                        }}
                        className="
                            h-2
                            w-2
                            rounded-full
                            bg-green-400
                        "
                    />

                    <span className="text-xs text-gray-500">
                        Monitoring live events
                    </span>
                </div>

                <AlertTriangle
                    size={15}
                    className="text-gray-600"
                />
            </motion.div>
        </PremiumCard>
    );
}

export default ActivityTimeline;