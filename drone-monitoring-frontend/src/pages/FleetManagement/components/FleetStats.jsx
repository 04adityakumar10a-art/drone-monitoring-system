import { motion } from "motion/react";

import {
    Plane,
    CheckCircle2,
    Radio,
    Wrench,
    BatteryWarning
} from "lucide-react";

import PremiumCard from "../../../ui/Card/PremiumCard";

function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
    delay
}) {
    return (
        <PremiumCard
            delay={delay}
            className="p-6"
        >
            <div className="flex items-start justify-between gap-4">

                <div>
                    <p className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.25em]
                        text-gray-500
                    ">
                        {title}
                    </p>

                    <motion.h3
                        initial={{
                            opacity: 0,
                            y: 8
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0
                        }}
                        viewport={{
                            once: true
                        }}
                        transition={{
                            delay: delay + 0.1,
                            duration: 0.4
                        }}
                        className="
                            mt-3
                            text-4xl
                            font-bold
                            tracking-tight
                            text-white
                        "
                    >
                        {value}
                    </motion.h3>

                    <p className="
                        mt-2
                        text-xs
                        text-gray-600
                    ">
                        {subtitle}
                    </p>
                </div>

                <motion.div
                    whileHover={{
                        rotate: 8,
                        scale: 1.08
                    }}
                    transition={{
                        duration: 0.2
                    }}
                    className="
                        flex
                        h-13
                        w-13
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        border
                    "
                    style={{
                        background: `linear-gradient(135deg, ${color}26, ${color}08)`,
                        borderColor: `${color}30`,
                        boxShadow: `0 0 22px ${color}22, inset 0 1px 0 ${color}20`
                    }}
                >
                    <Icon
                        size={25}
                        style={{
                            color,
                            filter: `drop-shadow(0 0 6px ${color}80)`
                        }}
                    />
                </motion.div>

            </div>
        </PremiumCard>
    );
}

function FleetStats({
    drones = []
}) {
    const total = drones.length;

    const available = drones.filter(
        (drone) =>
            drone.status?.toUpperCase() ===
            "AVAILABLE"
    ).length;

    const inFlight = drones.filter(
        (drone) =>
            drone.status?.toUpperCase() ===
            "IN_FLIGHT"
    ).length;

    const maintenance = drones.filter(
        (drone) =>
            drone.status?.toUpperCase() ===
            "MAINTENANCE"
    ).length;

    const criticalBattery = drones.filter(
        (drone) =>
            Number(drone.batteryLevel ?? 0) < 30
    ).length;

    return (
        <section
            className="
                grid
                gap-5
                sm:grid-cols-2
                xl:grid-cols-5
            "
        >

            <StatCard
                title="Total Fleet"
                value={total}
                subtitle="Registered drones"
                icon={Plane}
                color="#F0C24B"
                delay={0}
            />

            <StatCard
                title="Available"
                value={available}
                subtitle="Ready for deployment"
                icon={CheckCircle2}
                color="#34D399"
                delay={0.08}
            />

            <StatCard
                title="In Flight"
                value={inFlight}
                subtitle="Currently airborne"
                icon={Radio}
                color="#4FD1E3"
                delay={0.16}
            />

            <StatCard
                title="Maintenance"
                value={maintenance}
                subtitle="Requires inspection"
                icon={Wrench}
                color="#F97316"
                delay={0.24}
            />

            <StatCard
                title="Low Battery"
                value={criticalBattery}
                subtitle="Below 30% charge"
                icon={BatteryWarning}
                color="#EF4444"
                delay={0.32}
            />

        </section>
    );
}

export default FleetStats;