import {
    Trophy,
    BatteryCharging,
    Radio,
    ArrowUpRight
} from "lucide-react";

function TopPerformingDrones({ drones }) {

    const sorted = [...drones]
        .sort((a, b) => {

            const scoreA =
                (a.batteryLevel || 0) +
                (a.signalStrength || 0);

            const scoreB =
                (b.batteryLevel || 0) +
                (b.signalStrength || 0);

            return scoreB - scoreA;

        })
        .slice(0, 5);

    return (

        <div className="rounded-3xl border border-[#232323] bg-[#101010]">

            <div className="border-b border-[#232323] p-6">

                <div className="flex items-center gap-3">

                    <Trophy
                        className="text-[#D4AF37]"
                        size={24}
                    />

                    <div>

                        <h2 className="text-xl font-bold text-white">

                            Top Performing Drones

                        </h2>

                        <p className="text-sm text-gray-400">

                            Ranked by battery & signal quality

                        </p>

                    </div>

                </div>

            </div>

            <div>

                {sorted.map((drone, index) => (

                    <div
                        key={drone.id}
                        className="flex items-center justify-between border-b border-[#232323] p-5 last:border-none hover:bg-[#151515]"
                    >

                        <div>

                            <p className="font-semibold text-white">

                                #{index + 1} {drone.model}

                            </p>

                            <div className="mt-2 flex gap-5 text-sm text-gray-400">

                                <span className="flex items-center gap-1">

                                    <BatteryCharging size={15} />

                                    {drone.batteryLevel}%

                                </span>

                                <span className="flex items-center gap-1">

                                    <Radio size={15} />

                                    {drone.signalStrength}%

                                </span>

                            </div>

                        </div>

                        <ArrowUpRight
                            className="text-[#D4AF37]"
                        />

                    </div>

                ))}

            </div>

        </div>

    );

}

export default TopPerformingDrones;