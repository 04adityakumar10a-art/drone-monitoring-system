import { ChevronDown, ChevronRight, Activity, Battery } from "lucide-react";

function FleetHeader({

    drones,
    selectedDrone,
    collapsed,
    onToggle

}) {

    return (

        <div className="h-12 border-b border-[#232323] bg-[#101010] px-5 flex items-center justify-between">

            {/* Left */}

            <button

                onClick={onToggle}

                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"

            >

                {

                    collapsed

                        ? <ChevronRight size={18}/>

                        : <ChevronDown size={18}/>

                }

                <span className="font-semibold">

                    Fleet ({drones.length})

                </span>

            </button>

            {/* Right */}

            {

                selectedDrone && (

                    <div className="flex items-center gap-6 text-sm">

                        <div className="flex items-center gap-2">

                            <Activity
                                size={14}
                                className="text-green-400"
                            />

                            <span className="text-green-400">

                                LIVE

                            </span>

                        </div>

                        <div>

                            <span className="text-gray-400">

                                Selected

                            </span>

                            <span className="ml-2 text-white font-medium">

                                {selectedDrone.serialNumber}

                            </span>

                        </div>

                        <div className="flex items-center gap-2">

                            <Battery
                                size={14}
                                className="text-yellow-400"
                            />

                            <span className="text-yellow-400">

                                {selectedDrone.battery ?? 0}%

                            </span>

                        </div>

                    </div>

                )

            }

        </div>

    );

}

export default FleetHeader;