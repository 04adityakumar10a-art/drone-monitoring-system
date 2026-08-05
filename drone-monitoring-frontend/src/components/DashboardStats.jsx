import {
    Plane,
    CircleCheckBig,
    TriangleAlert,
    BatteryCharging,
    TrendingUp
} from "lucide-react";

import { motion } from "framer-motion";

function DashboardStats({ stats }) {

    const cards = [

        {
            title: "FLEET",
            value: stats.totalDrones,
            icon: Plane,
            color: "#D4AF37",
            progress: 100
        },

        {
            title: "AVAILABLE",
            value: stats.availableDrones,
            icon: CircleCheckBig,
            color: "#22C55E",
            progress:
                stats.totalDrones > 0
                    ? (stats.availableDrones / stats.totalDrones) * 100
                    : 0
        },

        {
            title: "LOW BATTERY",
            value: stats.lowBatteryDrones,
            icon: TriangleAlert,
            color: "#F59E0B",
            progress:
                stats.totalDrones > 0
                    ? (stats.lowBatteryDrones / stats.totalDrones) * 100
                    : 0
        },

        {
            title: "AVG BATTERY",
            value: Number(stats.averageBattery).toFixed(1),
            suffix: "%",
            icon: BatteryCharging,
            color: "#3B82F6",
            progress: Number(stats.averageBattery)
        }

    ];

    return (

        <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card, index) => {

                const Icon = card.icon;

                return (

                    <motion.div

                        key={card.title}

                        initial={{ opacity: 0, y: 25 }}

                        animate={{ opacity: 1, y: 0 }}

                        transition={{
                            delay: index * 0.08,
                            duration: 0.4
                        }}

                        whileHover={{
                            y: -4
                        }}

                        className="rounded-2xl border border-[#262626] bg-[#111111] p-6 transition-all hover:border-[#D4AF37]"

                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                                    {card.title}

                                </p>

                                <h2 className="mt-4 text-4xl font-bold text-white">

                                    {card.value}

                                    {card.suffix}

                                </h2>

                            </div>

                            <div

                                className="flex h-14 w-14 items-center justify-center rounded-xl"

                                style={{

                                    backgroundColor: `${card.color}15`

                                }}

                            >

                                <Icon

                                    size={28}

                                    color={card.color}

                                />

                            </div>

                        </div>

                        {/* Progress */}

                        <div className="mt-6">

                            <div className="h-2 rounded-full bg-[#1E1E1E]">

                                <motion.div

                                    initial={{ width: 0 }}

                                    animate={{

                                        width: `${Math.min(card.progress, 100)}%`

                                    }}

                                    transition={{ duration: 1 }}

                                    className="h-2 rounded-full"

                                    style={{

                                        backgroundColor: card.color

                                    }}

                                />

                            </div>

                        </div>

                        <div className="mt-5 flex items-center justify-between">

                            <span className="text-xs text-gray-500">

                                Last Updated

                            </span>

                            <span className="flex items-center gap-1 text-sm font-medium text-[#D4AF37]">

                                <TrendingUp size={15} />

                                Live

                            </span>

                        </div>

                    </motion.div>

                );

            })}

        </div>

    );

}

export default DashboardStats;