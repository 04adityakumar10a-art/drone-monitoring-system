import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import {
    Rocket,
    Clock3,
    CircleCheckBig,
    ArrowUpRight
} from "lucide-react";

import PremiumCard from "../../../ui/Card/PremiumCard";

const missions = [
    {
        id: 1,
        name: "Infrastructure Inspection",
        drone: "REACT-007",
        status: "LIVE",
        progress: 72,
        color: "#22C55E"
    },
    {
        id: 2,
        name: "Agriculture Survey",
        drone: "ALPHA-014",
        status: "PENDING",
        progress: 0,
        color: "#FACC15"
    },
    {
        id: 3,
        name: "Thermal Scan",
        drone: "DELTA-005",
        status: "COMPLETED",
        progress: 100,
        color: "#38BDF8"
    }
];

function SummaryCard({
    icon: Icon,
    title,
    value,
    color
}) {
    return (
        <motion.div
            whileHover={{
                y: -4
            }}
            transition={{
                duration: 0.2
            }}
            className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-5
                transition-all
                duration-300
                hover:border-white/[0.14]
                hover:bg-white/[0.04]
            "
        >
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                        {title}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-white">
                        {value}
                    </h3>
                </div>

                <div
                    className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                    "
                    style={{
                        background: `${color}18`
                    }}
                >
                    <Icon
                        size={22}
                        style={{
                            color
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

function MissionOperationsCard() {

    const navigate = useNavigate();

    return (
        <PremiumCard
            className="p-7"
            delay={0.3}
        >
            {/* Header */}

            <div className="flex items-start justify-between gap-6">
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[var(--aerion-primary)]">
                        OPERATIONS
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold text-white">
                        Mission Operations Center
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Current mission execution overview
                    </p>
                </div>

                <motion.div
                    animate={{
                        boxShadow: [
                            "0 0 0px rgba(34,197,94,0)",
                            "0 0 22px rgba(34,197,94,.18)",
                            "0 0 0px rgba(34,197,94,0)"
                        ]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2.5
                    }}
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-green-500/20
                        bg-green-500/10
                        px-4
                        py-2
                    "
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.35, 1]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.6
                        }}
                        className="
                            h-2
                            w-2
                            rounded-full
                            bg-green-400
                        "
                    />

                    <span className="text-xs font-semibold tracking-[0.15em] text-green-400">
                        LIVE OPERATIONS
                    </span>
                </motion.div>
            </div>

            {/* Summary */}

            <div className="mt-8 grid gap-4 md:grid-cols-3">
                <SummaryCard
                    icon={Rocket}
                    title="Active"
                    value="03"
                    color="#22C55E"
                />

                <SummaryCard
                    icon={Clock3}
                    title="Pending"
                    value="02"
                    color="#FACC15"
                />

                <SummaryCard
                    icon={CircleCheckBig}
                    title="Completed"
                    value="21"
                    color="#38BDF8"
                />
            </div>

            {/* Mission List */}

            <div className="mt-8 space-y-4">
                {missions.map((mission, index) => (
                    <motion.div
                        key={mission.id}
                        initial={{
                            opacity: 0,
                            x: -18
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0
                        }}
                        viewport={{
                            once: true
                        }}
                        transition={{
                            delay: 0.15 + index * 0.1,
                            duration: 0.4
                        }}
                        whileHover={{
                            x: 5
                        }}
                        className="
                            rounded-2xl
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            p-5
                            transition-all
                            duration-300
                            hover:border-white/[0.14]
                            hover:bg-white/[0.04]
                        "
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <h3 className="truncate text-lg font-semibold text-white">
                                    {mission.name}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Drone • {mission.drone}
                                </p>
                            </div>

                            <span
                                className="
                                    shrink-0
                                    rounded-full
                                    px-3
                                    py-1
                                    text-xs
                                    font-semibold
                                    tracking-[0.08em]
                                "
                                style={{
                                    background: `${mission.color}18`,
                                    color: mission.color
                                }}
                            >
                                {mission.status}
                            </span>
                        </div>

                        {/* Progress */}

                        <div className="mt-5">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-xs uppercase tracking-[0.2em] text-gray-600">
                                    Progress
                                </span>

                                <span className="text-sm font-medium text-gray-300">
                                    {mission.progress}%
                                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                                <motion.div
                                    initial={{
                                        width: 0
                                    }}
                                    whileInView={{
                                        width: `${mission.progress}%`
                                    }}
                                    viewport={{
                                        once: true
                                    }}
                                    transition={{
                                        duration: 1.1,
                                        delay: 0.25 + index * 0.1,
                                        ease: "easeOut"
                                    }}
                                    className="relative h-full overflow-hidden rounded-full"
                                    style={{
                                        background: mission.color
                                    }}
                                >
                                    {mission.progress > 0 && (
                                        <motion.div
                                            animate={{
                                                x: ["-100%", "200%"]
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 2.2,
                                                ease: "linear"
                                            }}
                                            className="
                                                absolute
                                                inset-y-0
                                                w-1/3
                                                bg-white/25
                                                blur-sm
                                            "
                                        />
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA */}

            <motion.button
                onClick={() => navigate("/mission-control")}
                whileHover={{
                    scale: 1.015
                }}
                whileTap={{
                    scale: 0.985
                }}
                className="
                    mt-8
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    border
                    border-[#D4AF37]/20
                    bg-[var(--aerion-primary-soft)]
                    py-4
                    text-sm
                    font-semibold
                    text-[var(--aerion-primary)]
                    transition-all
                    duration-300
                    hover:border-[#D4AF37]/40
                    hover:bg-[#D4AF37]/15
                    hover:shadow-[0_0_30px_rgba(212,175,55,.08)]
                "
            >
                Open Mission Control

                <motion.span
                    animate={{
                        x: [0, 4, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.8
                    }}
                >
                    <ArrowUpRight size={18} />
                </motion.span>
            </motion.button>
        </PremiumCard>
    );
}

export default MissionOperationsCard;