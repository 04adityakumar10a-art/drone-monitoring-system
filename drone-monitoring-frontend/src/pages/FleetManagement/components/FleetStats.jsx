import {
    Plane,
    Wifi,
    WifiOff,
    TriangleAlert,
    BatteryCharging,
    Target
} from "lucide-react";

function FleetStats({ drones }) {

    const total = drones.length;

    const online = drones.filter(
        drone => drone.status === "ONLINE"
    ).length;

    const offline = drones.filter(
        drone => drone.status === "OFFLINE"
    ).length;

    const warning = drones.filter(
        drone =>
            drone.batteryLevel !== undefined &&
            drone.batteryLevel < 25
    ).length;

    const averageBattery = total
        ? Math.round(
              drones.reduce(
                  (sum, drone) =>
                      sum + (drone.batteryLevel ?? 0),
                  0
              ) / total
          )
        : 0;

    const activeMissions = drones.filter(
        drone =>
            drone.status === "ONLINE" &&
            drone.speed > 0
    ).length;

    return (

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">

            <StatCard
                title="Total Drones"
                value={total}
                icon={<Plane size={22} />}
                color="text-[#D4AF37]"
            />

            <StatCard
                title="Online"
                value={online}
                icon={<Wifi size={22} />}
                color="text-green-400"
            />

            <StatCard
                title="Offline"
                value={offline}
                icon={<WifiOff size={22} />}
                color="text-red-400"
            />

            <StatCard
                title="Warnings"
                value={warning}
                icon={<TriangleAlert size={22} />}
                color="text-yellow-400"
            />

            <StatCard
                title="Avg Battery"
                value={`${averageBattery}%`}
                icon={<BatteryCharging size={22} />}
                color="text-sky-400"
            />

            <StatCard
                title="Active Missions"
                value={activeMissions}
                icon={<Target size={22} />}
                color="text-purple-400"
            />

        </div>

    );

}

function StatCard({

    title,

    value,

    icon,

    color

}) {

    return (

        <div className="rounded-2xl border border-[#262626] bg-[#111111] p-5 transition-all duration-300 hover:border-[#D4AF37] hover:-translate-y-1">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                        {title}

                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-white">

                        {value}

                    </h2>

                </div>

                <div className={`rounded-xl bg-[#1A1A1A] p-3 ${color}`}>

                    {icon}

                </div>

            </div>

        </div>

    );

}

export default FleetStats;