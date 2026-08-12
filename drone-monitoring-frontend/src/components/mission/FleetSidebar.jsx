import { Search, Plane, Battery, Radio } from "lucide-react";
import { useMemo, useState } from "react";

function FleetSidebar({

    drones,

    telemetryMap,

    selectedDroneId,

    onSelect

}) {

    const [search, setSearch] = useState("");

    const filteredDrones = useMemo(() => {

        return drones.filter(drone => {

            const name = (

                drone.name ||

                `Drone-${drone.id}`

            ).toLowerCase();

            return name.includes(search.toLowerCase());

        });

    }, [

        drones,

        search

    ]);

    return (

        <div className="h-full rounded-2xl border border-[#262626] bg-[#111111]">

            {/* Header */}

            <div className="border-b border-[#262626] p-5">

                <h2 className="text-xl font-bold text-white">

                    Fleet

                </h2>

                <p className="mt-1 text-sm text-gray-400">

                    Active Aircraft

                </p>

                <div className="relative mt-4">

                    <Search

                        size={16}

                        className="absolute left-3 top-3 text-gray-500"

                    />

                    <input

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                        placeholder="Search drone..."

                        className="w-full rounded-xl border border-[#262626] bg-[#0D0D0D] py-2 pl-10 pr-3 text-sm text-white outline-none focus:border-[#D4AF37]"

                    />

                </div>

            </div>

            {/* List */}

            <div className="max-h-[700px] overflow-y-auto">

                {

                    filteredDrones.map(drone => {

                        const telemetry =

                            telemetryMap?.[drone.id];

                        const battery =

                            telemetry?.batteryLevel ?? 0;

                        const online =

                            telemetry != null;

                        const selected =

                            drone.id === selectedDroneId;

                        let batteryColor =

                            "bg-green-500";

                        if (battery < 50)

                            batteryColor = "bg-yellow-500";

                        if (battery < 20)

                            batteryColor = "bg-red-500";

                        return (

                            <button

                                key={drone.id}

                                onClick={() =>

                                    onSelect(drone.id)

                                }

                                className={`w-full border-b border-[#222] p-5 text-left transition-all hover:bg-[#191919] ${

                                    selected

                                        ? "bg-[#1B1B1B] ring-1 ring-[#D4AF37]"

                                        : ""

                                }`}

                            >

                                {/* Top */}

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-3">

                                        <div

                                            className={`h-3 w-3 rounded-full ${

                                                online

                                                    ? "bg-green-500"

                                                    : "bg-red-500"

                                            }`}

                                        />

                                        <span className="font-semibold text-white">

                                            {

                                                drone.name ||

                                                `Drone-${drone.id}`

                                            }

                                        </span>

                                    </div>

                                    <Plane

                                        size={16}

                                        className="text-[var(--aerion-primary)]"

                                    />

                                </div>

                                {/* Battery */}

                                <div className="mt-4 flex items-center justify-between">

                                    <div className="flex items-center gap-2 text-xs text-gray-400">

                                        <Battery size={14} />

                                        Battery

                                    </div>

                                    <span className="text-xs text-white">

                                        {battery}%

                                    </span>

                                </div>

                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#262626]">

                                    <div

                                        className={`h-full ${batteryColor}`}

                                        style={{

                                            width: `${battery}%`

                                        }}

                                    />

                                </div>

                                {/* Bottom */}

                                <div className="mt-4 flex items-center justify-between text-xs">

                                    <div className="flex items-center gap-2 text-gray-400">

                                        <Radio size={13} />

                                        {

                                            online

                                                ? "ONLINE"

                                                : "OFFLINE"

                                        }

                                    </div>

                                    <span className="text-[var(--aerion-primary)]">

                                        ID {drone.id}

                                    </span>

                                </div>

                            </button>

                        );

                    })

                }

            </div>

        </div>

    );

}

export default FleetSidebar;