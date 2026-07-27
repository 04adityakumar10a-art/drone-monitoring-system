import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell
} from "recharts";

const COLORS = [
    "#22c55e", // Green
    "#3b82f6", // Blue
    "#f59e0b", // Orange
    "#ef4444"  // Red
];

function BatteryDistributionChart({ data }) {

    return (

        <div className="bg-slate-800 rounded-xl p-6 shadow-lg">

            <h2 className="text-xl font-bold text-white mb-6">

                🔋 Battery Distribution

            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}>

                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 10,
                        bottom: 10
                    }}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#475569"
                    />

                    <XAxis
                        dataKey="range"
                        tick={{ fill: "#ffffff" }}
                    />

                    <YAxis
                        allowDecimals={false}
                        tick={{ fill: "#ffffff" }}
                    />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        radius={[8, 8, 0, 0]}>

                        {

                            data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))

                        }

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default BatteryDistributionChart;