import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell
} from "recharts";

import {
    Mountain,
    ArrowUp
} from "lucide-react";

import AnalyticsChartCard from "./AnalyticsChartCard";

function AltitudeChart({ drones }) {

    const data = drones.map(d => ({
        name: d.model,
        altitude: Number(d.altitude) || 0
    }));

    const highestAltitude = Math.max(
        ...data.map(d => d.altitude),
        0
    );

    return (

        <div className="
            relative
            rounded-3xl
            border border-white/10
            bg-white/[0.04]
            backdrop-blur-2xl
            shadow-[0_8px_40px_rgba(0,0,0,0.35)]
            overflow-hidden
        ">

            {/* Glass highlight */}
            <div className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-br
                from-white/[0.08]
                via-transparent
                to-transparent
            " />

            {/* Subtle gold ambient glow */}
            <div className="
                pointer-events-none
                absolute
                -top-24
                right-[-40px]
                w-48
                h-48
                bg-[#D4AF37]/10
                rounded-full
                blur-3xl
            " />

            <div className="relative z-10">

                <AnalyticsChartCard

                    title="Altitude"

                    value={`${highestAltitude} m`}

                    subtitle="Highest recorded altitude"

                    icon={
                        <div className="
                            flex
                            items-center
                            justify-center
                            w-11
                            h-11
                            rounded-2xl
                            bg-white/[0.06]
                            border border-white/10
                            backdrop-blur-xl
                            shadow-inner
                        ">
                            <Mountain
                                size={24}
                                className="text-[#D4AF37]"
                            />
                        </div>
                    }

                    footer={

                        <div className="
                            flex
                            items-center
                            gap-2
                            px-3
                            py-2
                            rounded-xl
                            bg-sky-400/[0.06]
                            border border-sky-400/10
                            backdrop-blur-md
                        ">

                            <ArrowUp
                                size={16}
                                className="text-sky-400"
                            />

                            <span className="
                                text-sm
                                text-sky-300
                            ">
                                Flight altitude within operational limits.
                            </span>

                        </div>

                    }

                >

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <BarChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 5
                            }}
                        >

                            <XAxis
                                dataKey="name"
                                tick={{
                                    fill: "#A3A3A3",
                                    fontSize: 12
                                }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                tick={{
                                    fill: "#A3A3A3",
                                    fontSize: 12
                                }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip
                                cursor={{
                                    fill: "rgba(255,255,255,0.03)"
                                }}
                                contentStyle={{
                                    background: "rgba(15, 15, 15, 0.75)",
                                    backdropFilter: "blur(16px)",
                                    WebkitBackdropFilter: "blur(16px)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    borderRadius: "16px",
                                    color: "#fff",
                                    boxShadow: "0 8px 30px rgba(0,0,0,0.35)"
                                }}
                                labelStyle={{
                                    color: "#D4AF37",
                                    fontWeight: 600
                                }}
                            />

                            <Bar
                                dataKey="altitude"
                                radius={[10, 10, 3, 3]}
                            >

                                {data.map((_, index) => (

                                    <Cell
                                        key={index}
                                        fill="#D4AF37"
                                    />

                                ))}

                            </Bar>

                        </BarChart>

                    </ResponsiveContainer>

                </AnalyticsChartCard>

            </div>

        </div>
    );
}

export default AltitudeChart;