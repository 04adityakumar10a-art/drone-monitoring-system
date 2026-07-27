import {

    ResponsiveContainer,

    BarChart,

    XAxis,

    YAxis,

    Tooltip,

    CartesianGrid,

    Bar

} from "recharts";

function BatteryBarChart({ batteryData  }) {
console.log(batteryData);
    return (

        <div className="bg-slate-800 rounded-xl p-6 shadow-lg">

            <h2 className="text-xl text-white font-bold mb-4">

                Battery Levels

            </h2>

           <ResponsiveContainer width="100%" height={350}>
    <BarChart
        data={batteryData}
        margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 80
        }}
    >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
            dataKey="model"
            angle={-35}
            textAnchor="end"
            interval={0}
            height={80}
        />

        <YAxis
            domain={[0, 100]}
        />

        <Tooltip />

        <Bar
            dataKey="batteryLevel"
            fill="#06b6d4"
        />

    </BarChart>
</ResponsiveContainer>

        </div>

    );

}

export default BatteryBarChart;