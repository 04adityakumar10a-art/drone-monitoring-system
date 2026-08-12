import {
    ArrowUpRight,
    BatteryCharging,
    Plane,
    Radio,
    Target
} from "lucide-react";

function Card({
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

                <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#171717] p-4 text-[var(--aerion-primary)]">

                    {icon}

                </div>

            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#232323] pt-4">

                <span className="text-xs uppercase tracking-[0.2em] text-green-500">

                    LIVE

                </span>

                <ArrowUpRight
                    size={18}
                    className="text-gray-500 transition-colors group-hover:text-[var(--aerion-primary)]"
                />

            </div>

        </div>

    );

}

function AnalyticsCards({ drones }) {

    const total = drones.length;

    const avgBattery = total
        ? Math.round(
              drones.reduce(
                  (sum, d) => sum + (d.batteryLevel || 0),
                  0
              ) / total
          )
        : 0;

    const avgSignal = total
        ? Math.round(
              drones.reduce(
                  (sum, d) => sum + (d.signalStrength || 0),
                  0
              ) / total
          )
        : 0;

    const active = drones.filter(
        d => d.status === "ONLINE"
    ).length;

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <Card
                title="Fleet"
                value={total}
                subtitle="Registered aircraft"
                icon={<Plane size={30} />}
            />

            <Card
                title="Battery"
                value={`${avgBattery}%`}
                subtitle="Average fleet battery"
                icon={<BatteryCharging size={30} />}
            />

            <Card
                title="Online"
                value={active}
                subtitle="Active aircraft"
                icon={<Target size={30} />}
            />

            <Card
                title="Signal"
                value={`${avgSignal}%`}
                subtitle="Average signal quality"
                icon={<Radio size={30} />}
            />

        </div>

    );

}

export default AnalyticsCards;