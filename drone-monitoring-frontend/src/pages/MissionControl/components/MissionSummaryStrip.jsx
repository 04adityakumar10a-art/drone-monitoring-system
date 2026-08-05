import {
    Clock3,
    Gauge,
    Mountain,
    Route
} from "lucide-react";

function Stat({ icon, title, value }) {

    return (

        <div className="flex items-center gap-3 rounded-xl border border-[#232323] bg-[#111111] px-5 py-3">

            <div className="text-[#D4AF37]">

                {icon}

            </div>

            <div>

                <div className="text-xs uppercase tracking-wider text-gray-500">

                    {title}

                </div>

                <div className="text-lg font-semibold">

                    {value}

                </div>

            </div>

        </div>

    );

}

function MissionSummaryStrip({

    stats

}) {

    return (

        <div className="border-t border-[#232323] bg-[#0D0D0D] px-6 py-4">

            <div className="grid grid-cols-4 gap-4">

                <Stat

                    icon={<Clock3 size={20}/>}

                    title="Flight Time"

                    value={`${stats.flightTime}s`}

                />

                <Stat

                    icon={<Gauge size={20}/>}

                    title="Peak Speed"

                    value={`${stats.maxSpeed.toFixed(1)} m/s`}

                />

                <Stat

                    icon={<Mountain size={20}/>}

                    title="Max Altitude"

                    value={`${stats.maxAltitude.toFixed(1)} m`}

                />

                <Stat

                    icon={<Route size={20}/>}

                    title="Distance"

                    value={`${stats.distance.toFixed(2)} km`}

                />

            </div>

        </div>

    );

}

export default MissionSummaryStrip;