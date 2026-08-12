import { motion } from "motion/react";

import {
    Database,
    Wifi,
    Activity,
    Server,
    CircleCheckBig,
    CircleAlert
} from "lucide-react";

import PremiumCard from "../../../ui/Card/PremiumCard";

function HealthItem({
    icon: Icon,
    title,
    status,
    description,
    color
}) {
    return (
        <motion.div
            whileHover={{
                x: 5
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
            <div className="flex gap-4">

                {/* Icon */}

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

                {/* Content */}

                <div className="min-w-0 flex-1">

                    <h3 className="text-sm font-semibold text-white">
                        {title}
                    </h3>

                    {/* Status BELOW title */}

                    <div className="mt-2">

                        <span
                            className="
                                inline-flex
                                whitespace-nowrap
                                rounded-full
                                px-3
                                py-1
                                text-[10px]
                                font-semibold
                                tracking-[0.08em]
                            "
                            style={{
                                background: `${color}18`,
                                color
                            }}
                        >
                            {status}
                        </span>

                    </div>

                    <p className="mt-2 text-sm leading-5 text-gray-500">
                        {description}
                    </p>

                </div>

            </div>
        </motion.div>
    );
}

function SystemHealthCard({
    telemetry
}) {
    const telemetryOnline =
        Object.keys(telemetry ?? {}).length > 0;

    const healthScore =
        telemetryOnline
            ? 96
            : 72;

    const healthGrade =
        telemetryOnline
            ? "A"
            : "B";

    return (
        <PremiumCard
            className="p-7"
            delay={0.4}
        >
            {/* Header */}

            <div className="flex items-start justify-between gap-5">
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[var(--aerion-primary)]">
                        SYSTEM
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold text-white">
                        System Health
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Enterprise infrastructure status
                    </p>
                </div>

                <motion.div
                    animate={{
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 4
                    }}
                    className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-[#D4AF37]/15
                        bg-[var(--aerion-primary-soft)]
                    "
                >
                    <Activity
                        size={28}
                        className="text-[var(--aerion-primary)]"
                    />
                </motion.div>
            </div>

            {/* Services */}

            <div className="mt-8 space-y-4">
                <HealthItem
                    icon={Server}
                    title="Backend API"
                    status="ONLINE"
                    description="REST services responding normally."
                    color="#22C55E"
                />

                <HealthItem
                    icon={Database}
                    title="Database"
                    status="HEALTHY"
                    description="PostgreSQL connection established."
                    color="#38BDF8"
                />

                <HealthItem
                    icon={Wifi}
                    title="Telemetry"
                    status={
                        telemetryOnline
                            ? "LIVE"
                            : "OFFLINE"
                    }
                    description={
                        telemetryOnline
                            ? "Receiving live drone telemetry."
                            : "Waiting for telemetry stream."
                    }
                    color={
                        telemetryOnline
                            ? "#22C55E"
                            : "#EF4444"
                    }
                />

                <HealthItem
                    icon={
                        telemetryOnline
                            ? CircleCheckBig
                            : CircleAlert
                    }
                    title="Communication"
                    status={
                        telemetryOnline
                            ? "CONNECTED"
                            : "DISCONNECTED"
                    }
                    description="WebSocket communication channel."
                    color={
                        telemetryOnline
                            ? "#22C55E"
                            : "#EF4444"
                    }
                />
            </div>

            {/* Overall Health */}

            <div
                className="
                    relative
                    mt-8
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#D4AF37]/15
                    bg-[#D4AF37]/[0.04]
                    p-6
                "
            >
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#D4AF37]/[0.06] blur-[80px]" />

                <div className="relative flex items-center justify-between gap-6">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-[var(--aerion-primary)]">
                            OVERALL HEALTH
                        </p>

                        <h3 className="mt-3 text-4xl font-bold text-white">
                            {healthScore}%
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Enterprise platform operational score
                        </p>
                    </div>

                    <div className="relative h-28 w-28 shrink-0">
                        <svg
                            className="h-full w-full -rotate-90"
                            viewBox="0 0 100 100"
                        >
                            <circle
                                cx="50"
                                cy="50"
                                r="42"
                                stroke="rgba(255,255,255,0.07)"
                                strokeWidth="8"
                                fill="none"
                            />

                            <motion.circle
                                cx="50"
                                cy="50"
                                r="42"
                                stroke="#D4AF37"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray="264"
                                initial={{
                                    strokeDashoffset: 264
                                }}
                                whileInView={{
                                    strokeDashoffset:
                                        264 -
                                        (264 * healthScore) /
                                        100
                                }}
                                viewport={{
                                    once: true
                                }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeOut"
                                }}
                            />
                        </svg>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-[var(--aerion-primary)]">
                                {healthGrade}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </PremiumCard>
    );
}

export default SystemHealthCard;