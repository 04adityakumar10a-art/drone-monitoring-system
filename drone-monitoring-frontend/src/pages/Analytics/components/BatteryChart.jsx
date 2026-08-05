import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

import { BatteryCharging, TrendingUp } from "lucide-react";
import AnalyticsChartCard from "./AnalyticsChartCard";

function BatteryChart({ drones }) {

    const data = drones.map(d => ({
        name: d.model,
        battery: d.batteryLevel ?? 0
    }));

    const averageBattery = data.length
        ? Math.round(
              data.reduce((sum, d) => sum + d.battery, 0) / data.length
          )
        : 0;

    return (

        <AnalyticsChartCard
            title="Battery Trend"
            value={`${averageBattery}%`}
            subtitle="Average battery across active fleet"
            icon={<BatteryCharging size={26} />}
            footer={
                <div className="flex items-center gap-2 text-green-400">

                    <TrendingUp size={16} />

                    <span className="text-sm">

                        Battery health remains stable.

                    </span>

                </div>
            }
        >

            <ResponsiveContainer width="100%" height={300}>

                <AreaChart data={data}>

                    <defs>

                        <linearGradient
                            id="batteryFill"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="5%"
                                stopColor="#D4AF37"
                                stopOpacity={0.6}
                            />

                            <stop
                                offset="95%"
                                stopColor="#D4AF37"
                                stopOpacity={0}
                            />

                        </linearGradient>

                    </defs>

                    <XAxis
                        dataKey="name"
                        tick={{ fill: "#A3A3A3", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tick={{ fill: "#A3A3A3", fontSize: 12 }}
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

                    <Area
                        type="monotone"
                        dataKey="battery"
                        stroke="#D4AF37"
                        strokeWidth={3}
                        fill="url(#batteryFill)"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </AnalyticsChartCard>

    );

}

export default BatteryChart;