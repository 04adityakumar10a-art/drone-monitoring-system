import {
    Activity,
    BatteryCharging,
    Gauge,
    Plane,
    Compass,
    Radio,
    MapPinned,
    Cpu
} from "lucide-react";

function AircraftPanel({ telemetry, drone }) {

    if (!telemetry) {

        return (

            <div className="rounded-2xl border border-[#262626] bg-[#111111] p-8">

                <h2 className="text-2xl font-bold text-white">

                    Aircraft Status

                </h2>

                <p className="mt-5 text-gray-400">

                    Waiting for telemetry...

                </p>

            </div>

        );

    }

    const battery = telemetry.batteryLevel ?? 0;

    let batteryColor = "text-green-400";

    let batteryBar = "bg-green-500";

    if (battery < 50) {

        batteryColor = "text-yellow-400";

        batteryBar = "bg-yellow-500";

    }

    if (battery < 20) {

        batteryColor = "text-red-400";

        batteryBar = "bg-red-500";

    }

    return (

        <div className="rounded-2xl border border-[#262626] bg-[#111111]">

            {/* Header */}

            <div className="border-b border-[#262626] p-6">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">

                            Aircraft

                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-white">

                            {drone?.model || `Drone-${telemetry.droneId}`}

                        </h2>

                        <p className="text-sm text-gray-400">

                            {drone?.manufacturer || "Unknown Manufacturer"}

                        </p>

                    </div>

                    <div className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">

                        ● LIVE

                    </div>

                </div>

            </div>

            {/* Battery */}

            <div className="border-b border-[#262626] p-6">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <BatteryCharging className={batteryColor} size={24} />

                        <span className="font-semibold text-white">

                            Battery

                        </span>

                    </div>

                    <span className={`text-3xl font-bold ${batteryColor}`}>

                        {battery}%

                    </span>

                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#222]">

                    <div

                        className={`h-full ${batteryBar} transition-all duration-500`}

                        style={{

                            width: `${battery}%`

                        }}

                    />

                </div>

            </div>

            {/* Metrics */}

            <div className="grid grid-cols-2 gap-4 p-6">

                <Metric

                    icon={<Gauge size={18} />}

                    title="Speed"

                    value={`${telemetry.speed?.toFixed(1)} m/s`}

                />

                <Metric

                    icon={<Plane size={18} />}

                    title="Altitude"

                    value={`${telemetry.altitude?.toFixed(1)} m`}

                />

                <Metric

                    icon={<Compass size={18} />}

                    title="Heading"

                    value={`${telemetry.heading?.toFixed(0)}°`}

                />

                <Metric

                    icon={<Radio size={18} />}

                    title="Signal"

                    value={`${telemetry.signalStrength}%`}

                />

            </div>

            {/* GPS */}

            <div className="border-t border-[#262626] p-6">

                <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">

                    <MapPinned

                        size={18}

                        className="text-[#D4AF37]"

                    />

                    GPS Position

                </h3>

                <div className="space-y-3">

                    <Coordinate

                        label="Latitude"

                        value={telemetry.latitude?.toFixed(6)}

                    />

                    <Coordinate

                        label="Longitude"

                        value={telemetry.longitude?.toFixed(6)}

                    />

                </div>

            </div>

            {/* Footer */}

            <div className="border-t border-[#262626] bg-[#0D0D0D] p-5">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 text-gray-400">

                        <Cpu size={16} />

                        Flight Controller

                    </div>

                    <div className="flex items-center gap-2 text-green-400">

                        <Activity size={16} />

                        Healthy

                    </div>

                </div>

            </div>

        </div>

    );

}

function Metric({

    icon,

    title,

    value

}) {

    return (

        <div className="rounded-xl border border-[#262626] bg-[#0D0D0D] p-4">

            <div className="mb-3 flex items-center gap-2 text-[#D4AF37]">

                {icon}

                <span className="text-xs uppercase tracking-[0.2em] text-gray-400">

                    {title}

                </span>

            </div>

            <h2 className="text-xl font-bold text-white">

                {value}

            </h2>

        </div>

    );

}

function Coordinate({

    label,

    value

}) {

    return (

        <div className="flex items-center justify-between rounded-xl border border-[#262626] bg-[#0D0D0D] px-4 py-3">

            <span className="text-gray-400">

                {label}

            </span>

            <span className="font-mono text-sm text-white">

                {value}

            </span>

        </div>

    );

}

export default AircraftPanel;