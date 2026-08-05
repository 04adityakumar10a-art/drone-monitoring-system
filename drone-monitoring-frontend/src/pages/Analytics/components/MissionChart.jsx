import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts";

import {
    Activity,
    CheckCircle2
} from "lucide-react";

import AnalyticsChartCard from "./AnalyticsChartCard";

const COLORS = [
    "#22C55E",
    "#EF4444"
];

function MissionChart({ drones }) {

    const online = drones.filter(
        d => d.status === "ONLINE"
    ).length;

    const offline = drones.filter(
        d => d.status === "OFFLINE"
    ).length;

    const total = online + offline;

    const uptime = total
        ? Math.round((online / total) * 100)
        : 0;

    const data = [
        {
            name: "Online",
            value: online
        },
        {
            name: "Offline",
            value: offline
        }
    ];

    return (

        <AnalyticsChartCard

            title="Fleet Availability"

            value={`${uptime}%`}

            subtitle="Current fleet uptime"

            icon={<Activity size={26} />}

            footer={

                <div className="flex items-center gap-2 text-green-400">

                    <CheckCircle2 size={16} />

                    <span className="text-sm">

                        {online} drones currently operational

                    </span>

                </div>

            }

        >

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <PieChart>

                    <Pie

                        data={data}

                        dataKey="value"

                        innerRadius={70}

                        outerRadius={105}

                        paddingAngle={4}

                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />

                        ))}

                    </Pie>

                    <Legend />

                    <Tooltip

                        contentStyle={{

                            background: "#181818",

                            border: "1px solid #333",

                            borderRadius: 12,

                            color: "#fff"

                        }}

                    />

                </PieChart>

            </ResponsiveContainer>

        </AnalyticsChartCard>

    );

}

export default MissionChart;