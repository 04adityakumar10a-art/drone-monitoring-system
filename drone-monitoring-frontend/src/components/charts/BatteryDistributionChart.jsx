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

import {
    Battery100Icon
} from "@heroicons/react/24/outline";

const COLORS = [

    "#10B981",
    "#06B6D4",
    "#F59E0B",
    "#EF4444"

];

function BatteryDistributionChart({ data }) {

    return (

        <div
            className="
                rounded-3xl
                border
                border-cyan-500/15
                bg-slate-900/45
                backdrop-blur-2xl
                p-7
                shadow-[0_0_35px_rgba(6,182,212,.08)]
            "
        >

            {/* Header */}

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.30em] text-slate-500">

                        Power Analytics

                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-white">

                        Battery Distribution

                    </h2>

                </div>

                <div
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-cyan-500/10
                    "
                >

                    <Battery100Icon className="h-7 w-7 text-cyan-400" />

                </div>

            </div>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart
                    data={data}
                    margin={{
                        top: 15,
                        right: 20,
                        left: 0,
                        bottom: 10
                    }}
                >

                    <CartesianGrid

                        strokeDasharray="3 3"

                        stroke="rgba(148,163,184,.15)"

                    />

                    <XAxis

                        dataKey="range"

                        tick={{
                            fill: "#94A3B8",
                            fontSize: 12
                        }}

                        axisLine={false}

                        tickLine={false}

                    />

                    <YAxis

                        allowDecimals={false}

                        tick={{
                            fill: "#94A3B8",
                            fontSize: 12
                        }}

                        axisLine={false}

                        tickLine={false}

                    />

                    <Tooltip

                        cursor={{
                            fill: "rgba(6,182,212,.05)"
                        }}

                        contentStyle={{

                            background: "#0f172a",

                            border: "1px solid rgba(6,182,212,.25)",

                            borderRadius: "18px",

                            color: "#fff"

                        }}

                    />

                    <Bar

                        dataKey="count"

                        radius={[10, 10, 0, 0]}

                    >

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