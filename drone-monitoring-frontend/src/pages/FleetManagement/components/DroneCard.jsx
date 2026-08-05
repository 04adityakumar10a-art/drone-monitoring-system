import {
    Plane,
    BatteryCharging,
    Radio,
    MapPin,
    Cpu,
    Pencil,
    Trash2,
    ArrowRight,
    Activity
} from "lucide-react";

function DroneCard({

    drone,

    onEdit,

    onDelete,

    onOpen

}) {

    const battery = drone.batteryLevel ?? 0;

    const batteryColor =
        battery > 60
            ? "bg-green-500"
            : battery > 25
            ? "bg-yellow-500"
            : "bg-red-500";

    const statusColor =
        drone.status === "ONLINE"
            ? "bg-green-500"
            : "bg-red-500";

    return (

        <div className="group rounded-2xl border border-[#262626] bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-2xl">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-[#262626] p-5">

                <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1A1A1A]">

                        <Plane
                            size={28}
                            className="text-[#D4AF37]"
                        />

                    </div>

                    <div>

                        <h3 className="text-lg font-bold text-white">

                            {drone.name}

                        </h3>

                        <p className="text-sm text-gray-500">

                            {drone.model}

                        </p>

                    </div>

                </div>

                <span className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white ${statusColor}`}>

                    <Activity size={12} />

                    {drone.status}

                </span>

            </div>

            {/* Body */}

            <div className="space-y-5 p-5">

                {/* Battery */}

                <div>

                    <div className="mb-2 flex justify-between">

                        <span className="flex items-center gap-2 text-gray-400">

                            <BatteryCharging size={16} />

                            Battery

                        </span>

                        <span className="font-semibold text-white">

                            {battery}%

                        </span>

                    </div>

                    <div className="h-2 rounded-full bg-[#222]">

                        <div

                            className={`h-full rounded-full transition-all ${batteryColor}`}

                            style={{

                                width: `${battery}%`

                            }}

                        />

                    </div>

                </div>

                {/* Info Grid */}

                <div className="grid grid-cols-2 gap-4">

                    <InfoItem

                        icon={<Radio size={16}/>}

                        title="Signal"

                        value={`${drone.signalStrength ?? "--"}%`}

                    />

                    <InfoItem

                        icon={<Cpu size={16}/>}

                        title="Firmware"

                        value={drone.firmwareVersion ?? "v1.0"}

                    />

                    <InfoItem

                        icon={<MapPin size={16}/>}

                        title="Latitude"

                        value={

                            drone.latitude?.toFixed(4)

                            ?? "--"

                        }

                    />

                    <InfoItem

                        icon={<MapPin size={16}/>}

                        title="Longitude"

                        value={

                            drone.longitude?.toFixed(4)

                            ?? "--"

                        }

                    />

                </div>

            </div>

            {/* Footer */}

            <div className="flex items-center justify-between border-t border-[#262626] p-5">

                <div className="flex gap-2">

                    <button

                        onClick={() => onEdit(drone)}

                        className="rounded-lg border border-[#333] p-2 text-gray-300 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"

                    >

                        <Pencil size={17}/>

                    </button>

                    <button

                        onClick={() => onDelete(drone)}

                        className="rounded-lg border border-[#333] p-2 text-gray-300 transition hover:border-red-500 hover:text-red-500"

                    >

                        <Trash2 size={17}/>

                    </button>

                </div>

                <button

                    onClick={() => onOpen(drone)}

                    className="flex items-center gap-2 rounded-xl bg-[#D4AF37] px-4 py-2 font-semibold text-black transition hover:scale-105"

                >

                    Mission

                    <ArrowRight size={16}/>

                </button>

            </div>

        </div>

    );

}

function InfoItem({

    icon,

    title,

    value

}) {

    return (

        <div className="rounded-xl border border-[#262626] bg-[#0D0D0D] p-3">

            <div className="mb-2 flex items-center gap-2 text-[#D4AF37]">

                {icon}

                <span className="text-xs uppercase tracking-[0.15em] text-gray-500">

                    {title}

                </span>

            </div>

            <div className="font-semibold text-white">

                {value}

            </div>

        </div>

    );

}

export default DroneCard;