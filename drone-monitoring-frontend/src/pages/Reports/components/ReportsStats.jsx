import {
    Plane,
    Download,
    Activity,
    Clock,
    ArrowUpRight
} from "lucide-react";

function StatCard({
    title,
    value,
    subtitle,
    icon
}) {


    return (

        <div className="group rounded-3xl border border-[#232323] bg-[#101010] p-6 transition-all duration-300 hover:border-[#D4AF37]/30 hover:shadow-[0_0_35px_rgba(212,175,55,0.08)]">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                        {title}

                    </p>

                    <h2 className="mt-4 text-5xl font-black text-white">

                        {value}

                    </h2>

                    <p className="mt-3 text-sm text-gray-400">

                        {subtitle}

                    </p>

                </div>

                <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#171717] p-4 text-[#D4AF37]">

                    {icon}

                </div>

            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#232323] pt-4">

                <span className="text-xs uppercase tracking-[0.2em] text-green-500">

                    UPDATED

                </span>

                <ArrowUpRight
                    size={18}
                    className="text-gray-500 transition-colors group-hover:text-[#D4AF37]"
                />

            </div>

        </div>

    );

}

function ReportsStats({ fleet = [] }) {
    fleet = Array.isArray(fleet) ? fleet : [];
    const fleetSize = fleet.length;


    const online = fleet.filter(
        d => d.status === "ONLINE"
    ).length;

    const totalBattery = fleet.reduce(
        (sum, d) => sum + (d.batteryLevel || 0),
        0
    );

    const avgBattery = fleetSize
        ? Math.round(totalBattery / fleetSize)
        : 0;

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatCard

                title="Fleet"

                value={fleetSize}

                subtitle="Registered aircraft"

                icon={<Plane size={30} />}

            />

            <StatCard

                title="Online"

                value={online}

                subtitle="Currently operational"

                icon={<Activity size={30} />}

            />

            <StatCard

                title="Avg Battery"

                value={`${avgBattery}%`}

                subtitle="Fleet battery health"

                icon={<Clock size={30} />}

            />

            <StatCard

                title="Reports"

                value="126"

                subtitle="Generated exports"

                icon={<Download size={30} />}

            />

        </div>

    );

}

export default ReportsStats;