import {
    BatteryCharging,
    Gauge,
    Compass,
    Signal,
    MapPinned,
    Plane,
    Activity
} from "lucide-react";

import { motion } from "framer-motion";

function LiveTelemetryPanel({ telemetry }) {

    if (!telemetry) {

        return (

            <div className="rounded-3xl border border-[#262626] bg-[#111111] p-8">

                <h2 className="text-xl font-bold text-white">

                    Live Telemetry

                </h2>

                <div className="mt-8 flex flex-col items-center justify-center py-12">

                    <Activity
                        size={48}
                        className="text-[var(--aerion-primary)]"
                    />

                    <p className="mt-6 text-gray-500">

                        Waiting for telemetry stream...

                    </p>

                </div>

            </div>

        );

    }

    const items = [

        {
            title: "Battery",
            value: `${telemetry.batteryLevel}%`,
            icon: BatteryCharging,
            color: "text-green-500"
        },

        {
            title: "Altitude",
            value: `${telemetry?.altitude?.toFixed(1) ?? "--"} m`,
            icon: Plane,
            color: "text-[var(--aerion-primary)]"
        },

        {
            title: "Speed",
            value: `${telemetry?.speed?.toFixed(1) ?? "--"} m/s`,
            icon: Gauge,
            color: "text-blue-400"
        },

        {
            title: "Heading",
            value: `${telemetry?.heading?.toFixed(0) ?? "--"}°`,
            icon: Compass,
            color: "text-purple-400"
        },

        {
            title: "Signal",
            value: `${telemetry?.signalStrength ?? "--"}%`,
            icon: Signal,
            color: "text-green-400"
        },

        {
            title: "Latitude",
            value: telemetry?.latitude?.toFixed(6) ?? "--",
            icon: MapPinned,
            color: "text-orange-400"
        },

        {
            title: "Longitude",
            value: telemetry?.longitude?.toFixed(6) ?? "--",
            icon: MapPinned,
            color: "text-orange-400"
        }

    ];

    return (

        <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            className="rounded-3xl border border-[#262626] bg-[#111111] p-8"

        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">

                        Active Drone

                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-white">

                        {telemetry.droneModel ??
                            `Drone ${telemetry.droneId}`}

                    </h2>

                </div>

                <div className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">

                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-500">

                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>

                        Live

                    </span>

                </div>

            </div>

            {/* Grid */}

            <div className="mt-8 grid grid-cols-2 gap-4">

                {

                    items.map(item => {

                        const Icon = item.icon;

                        return (

                            <div

                                key={item.title}

                                className="rounded-2xl border border-[#222] bg-[#0D0D0D] p-4 transition-all hover:border-[#D4AF37]"

                            >

                                <div className="flex items-center justify-between">

                                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">

                                        {item.title}

                                    </p>

                                    <Icon

                                        size={18}

                                        className={item.color}

                                    />

                                </div>

                                <h3 className="mt-4 text-2xl font-bold text-white">

                                    {item.value}

                                </h3>

                            </div>

                        );

                    })

                }

            </div>

            {/* Footer */}

            <div className="mt-8 flex items-center justify-between rounded-2xl border border-[#222] bg-[#0D0D0D] px-5 py-4">

                <div>

                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                        Telemetry Stream

                    </p>

                    <h3 className="mt-1 font-semibold text-white">

                        Stable

                    </h3>

                </div>

                <span className="text-[var(--aerion-primary)] font-medium">

                    Real Time

                </span>

            </div>

        </motion.div>

    );

}

export default LiveTelemetryPanel;