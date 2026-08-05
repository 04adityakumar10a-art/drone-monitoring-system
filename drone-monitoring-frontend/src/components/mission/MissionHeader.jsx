import { Activity, Clock3, Plane, Radio, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

function MissionHeader({

    activeDrone,

    telemetry,

    totalDrones,

    live

}) {

    const [utcTime, setUtcTime] = useState("");

    useEffect(() => {

        const timer = setInterval(() => {

            setUtcTime(

                new Date().toUTCString().split(" ")[4]

            );

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    return (

        <div className="overflow-hidden rounded-2xl border border-[#262626] bg-[#111111]">

            {/* Top */}

            <div className="flex flex-col gap-6 p-7 lg:flex-row lg:items-center lg:justify-between">

                {/* Left */}

                <div>

                    <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">

                        AERION

                    </p>

                    <h1 className="mt-2 text-4xl font-black text-white">

                        Mission Control

                    </h1>

                    <p className="mt-2 text-gray-400">

                        Enterprise Fleet Command Center

                    </p>

                </div>

                {/* Right */}

                <div className="flex flex-wrap gap-4">

                    <StatusCard

                        icon={<Activity size={18} />}

                        title="System"

                        value={live ? "LIVE" : "REPLAY"}

                        color={live ? "text-green-400" : "text-orange-400"}

                    />

                    <StatusCard

                        icon={<Plane size={18} />}

                        title="Fleet"

                        value={`${totalDrones} Aircraft`}

                    />

                    <StatusCard

                        icon={<Radio size={18} />}

                        title="Selected"

                        value={

                            activeDrone

                                ? activeDrone.name ||

                                  `Drone-${activeDrone.id}`

                                : "--"

                        }

                    />

                    <StatusCard

                        icon={<Clock3 size={18} />}

                        title="UTC"

                        value={utcTime}

                    />

                    <StatusCard

                        icon={<ShieldCheck size={18} />}

                        title="Operator"

                        value="ADMIN"

                    />

                </div>

            </div>

            {/* Bottom Metrics */}

            <div className="grid grid-cols-2 border-t border-[#262626] lg:grid-cols-4">

                <Metric

                    label="Battery"

                    value={

                        telemetry

                            ? `${telemetry.batteryLevel}%`

                            : "--"

                    }

                />

                <Metric

                    label="Altitude"

                    value={

                        telemetry

                            ? `${telemetry.altitude?.toFixed(1)} m`

                            : "--"

                    }

                />

                <Metric

                    label="Speed"

                    value={

                        telemetry

                            ? `${telemetry.speed?.toFixed(1)} m/s`

                            : "--"

                    }

                />

                <Metric

                    label="Heading"

                    value={

                        telemetry

                            ? `${telemetry.heading?.toFixed(0)}°`

                            : "--"

                    }

                />

            </div>

        </div>

    );

}

function StatusCard({

    icon,

    title,

    value,

    color = "text-white"

}) {

    return (

        <div className="flex items-center gap-3 rounded-xl border border-[#262626] bg-[#0D0D0D] px-4 py-3">

            <div className="text-[#D4AF37]">

                {icon}

            </div>

            <div>

                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">

                    {title}

                </p>

                <h3 className={`text-sm font-semibold ${color}`}>

                    {value}

                </h3>

            </div>

        </div>

    );

}

function Metric({

    label,

    value

}) {

    return (

        <div className="border-r border-[#262626] p-5 last:border-r-0">

            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                {label}

            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">

                {value}

            </h2>

        </div>

    );

}

export default MissionHeader;