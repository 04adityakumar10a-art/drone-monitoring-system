import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Clock3,
    Gauge,
    Mountain,
    Route
} from "lucide-react";

function StatRow({ icon, label, value, unit }) {

    return (

        <div className="flex items-center justify-between py-2 border-b border-[#1d1d1d] last:border-b-0">

            <div className="flex items-center gap-2 text-gray-300">

                {icon}

                <span>{label}</span>

            </div>

            <div className="font-semibold text-white">

                {value}

                <span className="ml-1 text-xs text-gray-400">

                    {unit}

                </span>

            </div>

        </div>

    );

}

function MissionStatsOverlay({ stats }) {

    const [collapsed, setCollapsed] = useState(true);

    if (collapsed) {

        return (

            <button

                onClick={() => setCollapsed(false)}

                className="absolute top-4 right-4 z-[900]
                           flex items-center gap-2
                           rounded-xl
                           border border-cyan-500/30
                           bg-[#111111]/90
                           backdrop-blur-md
                           px-3 py-2
                           text-cyan-400
                           hover:bg-[var(--aerion-elevated)]
                           transition"

            >

                <Gauge size={18} />

                <span className="font-medium">

                    Stats

                </span>

                <ChevronLeft size={16} />

            </button>

        );

    }

    return (

        <div

            className="absolute top-4 right-4 z-[900]
                       w-[280px]
                       rounded-2xl
                       border border-[#252525]
                       bg-[#090909]/90
                       backdrop-blur-xl
                       shadow-2xl"

        >

            <div className="flex items-center justify-between px-4 py-3 border-b border-[#202020]">

                <h3 className="font-semibold text-white">

                    Mission Statistics

                </h3>

                <button

                    onClick={() => setCollapsed(true)}

                    className="rounded-lg p-1 text-gray-400 hover:bg-[#1b1b1b] hover:text-white transition"

                >

                    <ChevronRight size={18} />

                </button>

            </div>

            <div className="p-4">

                <StatRow

                    icon={<Clock3 size={16} />}

                    label="Flight Time"

                    value={stats.flightTime}

                    unit="pts"

                />

                <StatRow

                    icon={<Mountain size={16} />}

                    label="Max Altitude"

                    value={stats.maxAltitude.toFixed(1)}

                    unit="m"

                />

                <StatRow

                    icon={<Gauge size={16} />}

                    label="Max Speed"

                    value={stats.maxSpeed.toFixed(1)}

                    unit="m/s"

                />

                <StatRow

                    icon={<Route size={16} />}

                    label="Distance"

                    value={stats.distance.toFixed(3)}

                    unit="km"

                />

            </div>

        </div>

    );

}

export default MissionStatsOverlay;