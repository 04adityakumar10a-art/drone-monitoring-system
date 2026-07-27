import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b"
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

        <div className="bg-slate-800 rounded-xl p-6 shadow-lg">

            <h2 className="text-xl text-white font-bold mb-4">

                Drone Status

            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={100}
                        label>

                        {

                            data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))

                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default StatusPieChart;