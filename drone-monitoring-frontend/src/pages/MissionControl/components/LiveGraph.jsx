import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

const data = [
    { t: "0", battery: 100, altitude: 10 },
    { t: "5", battery: 98, altitude: 35 },
    { t: "10", battery: 96, altitude: 65 },
    { t: "15", battery: 94, altitude: 95 },
    { t: "20", battery: 92, altitude: 120 },
    { t: "25", battery: 90, altitude: 118 }
];

function LiveGraph() {

    return (

        <div className="rounded-2xl border border-[#262626] bg-[#111111] p-5">

            <div className="mb-5">

                <h2 className="text-xl font-bold text-white">

                    Live Telemetry

                </h2>

                <p className="text-sm text-gray-500">

                    Battery & Altitude

                </p>

            </div>

            <ResponsiveContainer width="100%" height={300}>

                <LineChart data={data}>

                    <CartesianGrid stroke="#222"/>

                    <XAxis dataKey="t"/>

                    <YAxis/>

                    <Tooltip/>

                    <Line
                        type="monotone"
                        dataKey="battery"
                        stroke="#D4AF37"
                        strokeWidth={3}
                    />

                    <Line
                        type="monotone"
                        dataKey="altitude"
                        stroke="#22C55E"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default LiveGraph;