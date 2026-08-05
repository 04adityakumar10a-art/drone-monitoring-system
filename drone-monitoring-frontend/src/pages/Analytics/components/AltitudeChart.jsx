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
        altitude: d.altitude ?? 0
    }));

    const highestAltitude = Math.max(
        ...data.map(d => d.altitude),
        0
    );

    return (

        <AnalyticsChartCard

            title="Altitude"

            value={`${highestAltitude} m`}

            subtitle="Highest recorded altitude"

            icon={<Mountain size={26} />}

            footer={

                <div className="flex items-center gap-2 text-sky-400">

                    <ArrowUp size={16} />

                    <span className="text-sm">

                        Flight altitude within operational limits.

                    </span>

                </div>

            }

        >

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart data={data}>

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
                        contentStyle={{
                            background: "#181818",
                            border: "1px solid #333",
                            borderRadius: 12,
                            color: "#fff"
                        }}
                    />

                    <Bar
                        dataKey="altitude"
                        radius={[8, 8, 0, 0]}
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

    );

}

export default AltitudeChart;