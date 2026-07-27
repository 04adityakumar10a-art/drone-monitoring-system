function DashboardStats({ stats }) {

    const cards = [

        {
            title: "🚁 Total Drones",
            value: stats.totalDrones,
            color: "border-cyan-500"
        },

        {
            title: "🟢 Available",
            value: stats.availableDrones,
            color: "border-green-500"
        },

        {
            title: "🔋 Low Battery",
            value: stats.lowBatteryDrones,
            color: "border-yellow-500"
        },

        {
            title: "📊 Avg Battery",
            value: `${Number(stats.averageBattery).toFixed(1)}%`,
            color: "border-purple-500"
        }

    ];

    return (

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">

            {

                cards.map((card) => (

                    <div
                        key={card.title}
                        className={`bg-slate-800 rounded-xl border-l-4 ${card.color} p-6 shadow hover:scale-105 transition duration-300`}>

                        <p className="text-gray-400">

                            {card.title}

                        </p>

                        <h2 className="text-4xl font-bold text-white mt-3">

                            {card.value}

                        </h2>

                    </div>

                ))

            }

        </div>

    );

}

export default DashboardStats;