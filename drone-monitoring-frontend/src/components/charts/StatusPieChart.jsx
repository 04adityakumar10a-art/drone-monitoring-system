import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import {
    SignalIcon
} from "@heroicons/react/24/outline";

const COLORS = [

    "#10B981",
    "#06B6D4",
    "#F59E0B"

];

function StatusPieChart({ stats }) {

    const data = [

        {
            name: "Available",
            value: stats.availableDrones
        },

        {
            name: "In Flight",
            value: stats.inFlightDrones
        },

        {
            name: "Maintenance",
            value: stats.maintenanceDrones
        }

    ];

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

                        Fleet Analytics

                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-white">

                        Fleet Status

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

                    <SignalIcon className="h-7 w-7 text-cyan-400" />

                </div>

            </div>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <PieChart>

                    <Pie

                        data={data}

                        dataKey="value"

                        innerRadius={70}

                        outerRadius={110}

                        paddingAngle={4}

                        stroke="none"

                    >

                        {

                            data.map((entry, index) => (

                                <Cell

                                    key={index}

                                    fill={COLORS[index]}

                                />

                            ))

                        }

                    </Pie>

                    <Tooltip

                        contentStyle={{

                            background: "#0f172a",

                            border: "1px solid rgba(6,182,212,.25)",

                            borderRadius: "18px",

                            color: "#fff"

                        }}

                    />

                    <Legend

                        verticalAlign="bottom"

                        iconType="circle"

                        wrapperStyle={{

                            color: "#CBD5E1",

                            paddingTop: 20

                        }}

                    />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default StatusPieChart;