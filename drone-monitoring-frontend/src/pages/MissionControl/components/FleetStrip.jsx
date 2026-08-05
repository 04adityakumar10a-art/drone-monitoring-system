import {
    Plane,
    Battery,
    Radio,
    MoveUp,
    Gauge
} from "lucide-react";

function FleetStrip({

    drones,
    selectedDrone,
    onSelectDrone

}) {

    return (

        <div className="border-b border-[#232323] bg-[#0B0B0B]">

            <div className="flex gap-3 overflow-x-auto px-5 py-3">

                {drones.map((drone) => (

                    <button

                        key={drone.id}

                        onClick={() => onSelectDrone(drone)}

                        className={`
                            min-w-[240px]
                            rounded-xl
                            border
                            p-3
                            transition-all

                            ${
                                selectedDrone?.id === drone.id
                                    ? "border-cyan-400 bg-cyan-500/10"
                                    : "border-[#262626] bg-[#131313] hover:border-cyan-500"
                            }
                        `}

                    >

                        <div className="mb-3 flex items-center justify-between">

                            <div className="flex items-center gap-2">

                                <Plane
                                    size={18}
                                    className="text-cyan-400"
                                />

                                <span className="font-semibold text-white">

                                    {drone.serialNumber}

                                </span>

                            </div>

                            <span className="text-xs text-gray-400">

                                {drone.status}

                            </span>

                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">

                            <Metric
                                icon={<Battery size={14} />}
                                value={`${drone.battery ?? 0}%`}
                            />

                            <Metric
                                icon={<MoveUp size={14} />}
                                value={`${drone.altitude ?? 0} m`}
                            />

                            <Metric
                                icon={<Gauge size={14} />}
                                value={`${drone.speed ?? 0} m/s`}
                            />

                            <Metric
                                icon={<Radio size={14} />}
                                value={`${drone.signal ?? 0}%`}
                            />

                        </div>

                    </button>

                ))}

            </div>

        </div>

    );

}

function Metric({ icon, value }) {

    return (

        <div className="flex items-center gap-2 rounded-lg bg-[#1A1A1A] px-2 py-2 text-gray-300">

            <div className="text-cyan-400">

                {icon}

            </div>

            <span>{value}</span>

        </div>

    );

}

export default FleetStrip;