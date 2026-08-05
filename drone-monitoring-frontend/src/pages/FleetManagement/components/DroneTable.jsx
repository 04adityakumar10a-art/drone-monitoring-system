import {
    MoreVertical,
    Pencil,
    Trash2,
    Plane,
    BatteryCharging,
    Radio,
    MapPin
} from "lucide-react";

function DroneTable({

    drones,

    loading,

    onEdit = () => {},

    onDelete = () => {},

    onOpen = () => {}

}) {

    if (loading) {

        return (

            <div className="rounded-2xl border border-[#262626] bg-[#111111] p-10">

                <div className="animate-pulse space-y-5">

                    {

                        Array.from({ length: 8 }).map((_, i) => (

                            <div
                                key={i}
                                className="h-12 rounded-lg bg-[#222]"
                            />

                        ))

                    }

                </div>

            </div>

        );

    }

    if (drones.length === 0) {

        return (

            <div className="rounded-2xl border border-[#262626] bg-[#111111] py-20 text-center">

                <Plane
                    size={50}
                    className="mx-auto mb-5 text-[#D4AF37]"
                />

                <h2 className="text-2xl font-bold text-white">

                    No Drones Found

                </h2>

                <p className="mt-2 text-gray-500">

                    Try changing your search or filters.

                </p>

            </div>

        );

    }

    return (

        <div className="overflow-hidden rounded-2xl border border-[#262626] bg-[#111111]">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>

                        <tr className="border-b border-[#262626] bg-[#0D0D0D] text-left">

                            <th className="px-6 py-4">

                                Aircraft

                            </th>

                            <th className="px-6 py-4">

                                Status

                            </th>

                            <th className="px-6 py-4">

                                Battery

                            </th>

                            <th className="px-6 py-4">

                                Signal

                            </th>

                            <th className="px-6 py-4">

                                Position

                            </th>

                            <th className="px-6 py-4">

                                Firmware

                            </th>

                            <th className="px-6 py-4 text-right">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            drones.map(drone => {

                                const battery =
                                    drone.batteryLevel ?? 0;

                                const batteryColor =
                                    battery > 60
                                        ? "bg-green-500"
                                        : battery > 25
                                        ? "bg-yellow-500"
                                        : "bg-red-500";

                                return (

                                    <tr

                                        key={drone.id}

                                        className="border-b border-[#222] transition hover:bg-[#171717]"

                                    >

                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-4">

                                                <div className="rounded-xl bg-[#1A1A1A] p-3">

                                                    <Plane

                                                        size={22}

                                                        className="text-[#D4AF37]"

                                                    />

                                                </div>

                                                <div>

                                                    <div className="font-semibold text-white">

                                                        {drone.name}

                                                    </div>

                                                    <div className="text-sm text-gray-500">

                                                        {drone.model}

                                                    </div>

                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-6">

                                            <span

                                                className={`rounded-full px-3 py-1 text-xs font-semibold

                                                ${

                                                    drone.status === "ONLINE"

                                                        ? "bg-green-500/20 text-green-400"

                                                        : "bg-red-500/20 text-red-400"

                                                }`}

                                            >

                                                {drone.status}

                                            </span>

                                        </td>

                                        <td className="px-6">

                                            <div className="flex items-center gap-3">

                                                <BatteryCharging

                                                    size={16}

                                                    className="text-[#D4AF37]"

                                                />

                                                <div className="w-28 rounded-full bg-[#222]">

                                                    <div

                                                        className={`h-2 rounded-full ${batteryColor}`}

                                                        style={{

                                                            width: `${battery}%`

                                                        }}

                                                    />

                                                </div>

                                                <span className="text-white">

                                                    {battery}%

                                                </span>

                                            </div>

                                        </td>

                                        <td className="px-6">

                                            <div className="flex items-center gap-2 text-white">

                                                <Radio
                                                    size={16}
                                                    className="text-[#D4AF37]"
                                                />

                                                {drone.signalStrength ?? "--"}%

                                            </div>

                                        </td>

                                        <td className="px-6">

                                            <div className="flex items-center gap-2 text-sm text-gray-300">

                                                <MapPin
                                                    size={15}
                                                    className="text-[#D4AF37]"
                                                />

                                                {

                                                    drone.latitude?.toFixed(4)

                                                    ?? "--"

                                                }

                                                ,

                                                {

                                                    drone.longitude?.toFixed(4)

                                                    ?? "--"

                                                }

                                            </div>

                                        </td>

                                        <td className="px-6 text-white">

                                            {drone.firmwareVersion ?? "v1.0"}

                                        </td>

                                        <td className="px-6">

                                            <div className="flex justify-end gap-2">

                                                <button

                                                    onClick={() =>

                                                        onOpen(drone)

                                                    }

                                                    className="rounded-lg border border-[#333] px-3 py-2 text-sm text-[#D4AF37] transition hover:border-[#D4AF37]"

                                                >

                                                    Mission

                                                </button>

                                                <button

                                                    onClick={() =>

                                                        onEdit(drone)

                                                    }

                                                    className="rounded-lg border border-[#333] p-2 transition hover:border-[#D4AF37]"

                                                >

                                                    <Pencil

                                                        size={16}

                                                        className="text-white"

                                                    />

                                                </button>

                                                <button

                                                    onClick={() =>

                                                        onDelete(drone)

                                                    }

                                                    className="rounded-lg border border-[#333] p-2 transition hover:border-red-500"

                                                >

                                                    <Trash2

                                                        size={16}

                                                        className="text-red-400"

                                                    />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                );

                            })

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default DroneTable;