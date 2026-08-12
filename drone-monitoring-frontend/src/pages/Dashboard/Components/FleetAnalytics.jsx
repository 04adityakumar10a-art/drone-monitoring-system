import { motion } from "motion/react";

import {
    BarChart3,
    Battery,
    BatteryWarning,
    ShieldCheck
} from "lucide-react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell
} from "recharts";

import PremiumCard from "../../../ui/Card/PremiumCard";

function MetricCard({
    title,
    value,
    subtitle,
    color,
    icon: Icon
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

                    <h3 className="mt-3 text-3xl font-bold text-white">
                        {value}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                        {subtitle}
                    </p>
                </div>

                <div
                    className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                    "
                    style={{
                        background: `${color}18`
                    }}
                >
                    <Icon
                        size={27}
                        style={{
                            color
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

function FleetAnalytics({
    batteryDistribution = []
}) {
    const totalFleet = batteryDistribution.reduce(
        (sum, item) => sum + Number(item.count || 0),
        0
    );

    const healthyFleet = batteryDistribution
        .filter(
            (item) =>
                item.range === "80-100%" ||
                item.range === "60-79%"
        )
        .reduce(
            (sum, item) => sum + Number(item.count || 0),
            0
        );

    const criticalFleet =
        batteryDistribution.find(
            (item) => item.range === "0-29%"
        )?.count || 0;

    const healthPercentage =
        totalFleet === 0
            ? 0
            : Math.round(
                  (healthyFleet / totalFleet) * 100
              );

    const chartData = batteryDistribution.map(
        (item) => ({
            range: item.range,
            count: Number(item.count || 0),
            color:
                item.range === "80-100%"
                    ? "#22C55E"
                    : item.range === "60-79%"
                    ? "#38BDF8"
                    : item.range === "30-59%"
                    ? "#FACC15"
                    : "#EF4444"
        })
    );

    return (
        <PremiumCard
            className="p-7"
            delay={0.2}
        >
            {/* Header */}

            <div className="flex items-start justify-between gap-6">
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[var(--aerion-primary)]">
                        ANALYTICS
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold text-white">
                        Fleet Battery Intelligence
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Real-time battery distribution across the fleet
                    </p>
                </div>

                <motion.div
                    whileHover={{
                        rotate: 8,
                        scale: 1.05
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
                    <BarChart3
                        size={28}
                        className="text-[var(--aerion-primary)]"
                    />
                </motion.div>
            </div>

            {/* Summary metrics */}

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
                <MetricCard
                    title="Fleet Size"
                    value={totalFleet}
                    subtitle="Registered drones"
                    color="#D4AF37"
                    icon={Battery}
                />

                <MetricCard
                    title="Healthy"
                    value={`${healthPercentage}%`}
                    subtitle="Battery above 60%"
                    color="#22C55E"
                    icon={ShieldCheck}
                />

                <MetricCard
                    title="Critical"
                    value={criticalFleet}
                    subtitle="Immediate charging required"
                    color="#EF4444"
                    icon={BatteryWarning}
                />
            </div>

            {/* Chart */}

            <div className="mt-10 h-[340px]">
                {chartData.length > 0 ? (
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 10,
                                left: -20,
                                bottom: 10
                            }}
                        >
                            <CartesianGrid
                                stroke="#222"
                                strokeDasharray="4 4"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="range"
                                stroke="#777"
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                stroke="#777"
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                            />

                            <Tooltip
                                cursor={{
                                    fill: "rgba(255,255,255,.03)"
                                }}
                                contentStyle={{
                                    background: "#111",
                                    border:
                                        "1px solid rgba(255,255,255,.08)",
                                    borderRadius: 16,
                                    color: "#fff"
                                }}
                                formatter={(value) => [
                                    value,
                                    "Drones"
                                ]}
                            />

                            <Bar
                                dataKey="count"
                                radius={[
                                    12,
                                    12,
                                    0,
                                    0
                                ]}
                                animationDuration={1200}
                                animationBegin={150}
                            >
                                {chartData.map(
                                    (entry, index) => (
                                        <Cell
                                            key={`${entry.range}-${index}`}
                                            fill={entry.color}
                                        />
                                    )
                                )}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div
                        className="
                            flex
                            h-full
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-dashed
                            border-white/10
                            bg-white/[0.015]
                        "
                    >
                        <div className="text-center">
                            <Battery
                                size={32}
                                className="mx-auto text-gray-600"
                            />

                            <p className="mt-3 text-sm text-gray-500">
                                Waiting for battery data
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Status summary */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 12
                }}
                whileInView={{
                    opacity: 1,
                    y: 0
                }}
                viewport={{
                    once: true
                }}
                transition={{
                    delay: 0.45,
                    duration: 0.4
                }}
                className="
                    mt-8
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    p-5
                "
            >
                <div className="flex items-start gap-4">
                    <div
                        className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[var(--aerion-primary-soft)]
                        "
                    >
                        <BarChart3
                            size={22}
                            className="text-[var(--aerion-primary)]"
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            Fleet Status Summary
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-gray-400">
                            {criticalFleet === totalFleet &&
                            totalFleet > 0
                                ? `All ${totalFleet} drones currently fall within the critical 0–29% battery range. Immediate charging is recommended before deployment.`
                                : criticalFleet > 0
                                ? `${criticalFleet} drone${
                                      criticalFleet === 1
                                          ? ""
                                          : "s"
                                  } currently require immediate battery attention.`
                                : totalFleet > 0
                                ? "Fleet battery distribution is currently within operational limits."
                                : "Waiting for fleet battery data."}
                        </p>
                    </div>
                </div>
            </motion.div>
        </PremiumCard>
    );
}

export default FleetAnalytics;