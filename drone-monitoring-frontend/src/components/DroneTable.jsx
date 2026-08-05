import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon
} from "@heroicons/react/24/outline";

import {
    Battery,
    MapPin,
    Navigation,
    Clock3
} from "lucide-react";

import { useNavigate } from "react-router-dom";
function DroneTable({

    drones,

    onEdit,

    onDelete

}) {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    function batteryColor(level) {

        if (level >= 80)
            return {
                bar: "bg-emerald-500",
                text: "text-emerald-400"
            };

        if (level >= 50)
            return {
                bar: "bg-[#D4AF37]",
                text: "text-[#D4AF37]"
            };

        if (level >= 20)
            return {
                bar: "bg-orange-500",
                text: "text-orange-400"
            };

        return {
            bar: "bg-red-500",
            text: "text-red-400"
        };

    }

    function statusStyle(status) {

        switch (status) {

            case "AVAILABLE":

                return {
                    bg: "bg-emerald-500/10",
                    text: "text-emerald-400",
                    border: "border-emerald-500/20"
                };

            case "IN_FLIGHT":

                return {
                    bg: "bg-sky-500/10",
                    text: "text-sky-400",
                    border: "border-sky-500/20"
                };

            case "MAINTENANCE":

                return {
                    bg: "bg-orange-500/10",
                    text: "text-orange-400",
                    border: "border-orange-500/20"
                };

            default:

                return {
                    bg: "bg-red-500/10",
                    text: "text-red-400",
                    border: "border-red-500/20"
                };

        }

    }

    return (

        <div
            className="
        overflow-hidden
        rounded-3xl
        border
        border-[#232323]
        bg-gradient-to-b
        from-[#111111]
        to-[#0A0A0A]
        shadow-[0_30px_80px_rgba(0,0,0,.6)]
transition-all
duration-300
hover:shadow-[0_35px_90px_rgba(212,175,55,.08)]
    "
        >

            <table className="w-full">

                <thead className="border-b border-[#2C2C2C] bg-gradient-to-r from-[#171717] to-[#101010]">

                    <tr className="text-left">

                        <th className="px-8 py-5 text-xs uppercase tracking-[0.22em] text-gray-500">

                            Drone

                        </th>

                        <th className="px-6 py-5 text-xs uppercase tracking-[0.22em] text-gray-500">

                            Telemetry

                        </th>

                        <th className="px-6 py-5 text-xs uppercase tracking-[0.22em] text-gray-500">

                            Battery

                        </th>

                        <th className="px-6 py-5 text-xs uppercase tracking-[0.22em] text-gray-500">

                            Status

                        </th>

                        <th className="px-6 py-5 text-xs uppercase tracking-[0.22em] text-gray-500">

                            Position

                        </th>

                        {role !== "VIEWER" && (

                            <th className="px-6 py-5 text-center text-xs uppercase tracking-[0.22em] text-gray-500">

                                Actions

                            </th>

                        )}

                    </tr>

                </thead>

                <tbody>

                    {drones.length === 0 ? (

                        <tr>

                            <td
                                colSpan="5"
                                className="px-8 py-20 text-center"
                            >

                                <div className="flex flex-col items-center">

                                    <PaperAirplaneIcon className="h-16 w-16 text-slate-600" />

                                    <h2 className="mt-6 text-xl font-semibold text-white">

                                        No Fleet Available

                                    </h2>

                                    <p className="mt-2 text-slate-500">

                                        Create your first drone to begin monitoring.

                                    </p>

                                </div>

                            </td>

                        </tr>

                    ) : (

                        drones.map((drone) => {

                            const battery = batteryColor(drone.batteryLevel);

                            const status = statusStyle(drone.status);

                            return (

                                <tr

                                    key={drone.id}

                                    onClick={() => navigate(`/drones/${drone.id}`)}

                                    className="
    cursor-pointer
    border-b
    border-[#232323]
    transition-all
    duration-300
    hover:bg-[#171717]
    hover:shadow-[inset_4px_0_0_#D4AF37]
"

                                >

                                    {/* ================= DRONE ================= */}

                                    <td className="px-8 py-7">

                                        <div>

                                            <h2 className="text-lg font-bold text-white">

                                                {drone.model}

                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">

                                                #{drone.serialNumber}

                                            </p>

                                            <p className="mt-3 text-sm text-[#D4AF37]">

                                                {drone.manufacturer}

                                            </p>

                                        </div>

                                    </td>

                                    {/* ================= TELEMETRY ================= */}

                                    <td className="px-6 py-7">

                                        <div className="space-y-3 text-sm">

                                            <div className="flex items-center gap-2 text-gray-300">

                                                <Navigation size={16} className="text-[#D4AF37]" />

                                                <span>Altitude</span>

                                                <span className="ml-auto font-semibold text-white">

                                                    {drone.altitude ?? 0} m

                                                </span>

                                            </div>

                                            <div className="flex items-center gap-2 text-gray-300">

                                                <Clock3 size={16} className="text-[#D4AF37]" />

                                                <span>Last Seen</span>

                                                <span className="ml-auto text-white">

                                                    {drone.lastSeen
                                                        ? new Date(drone.lastSeen).toLocaleTimeString()
                                                        : "--"}

                                                </span>

                                            </div>

                                        </div>

                                    </td>

                                    {/* ================= BATTERY ================= */}

                                    <td className="px-6 py-7">

                                        <div className="flex items-center gap-3">

                                            <Battery
                                                size={18}
                                                className={battery.text}
                                            />

                                            <div className="flex-1">

                                                <div className="h-2 overflow-hidden rounded-full bg-[#222]">

                                                    <div

                                                        className={`h-full ${battery.bar}`}

                                                        style={{

                                                            width: `${drone.batteryLevel}%`

                                                        }}

                                                    />

                                                </div>

                                                <p className={`mt-2 text-sm font-semibold ${battery.text}`}>

                                                    {drone.batteryLevel}%

                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* ================= STATUS ================= */}

                                    <td className="px-6 py-7">

                                        <span

                                            className={`
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        px-4
                        py-2
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        ${status.bg}
                        ${status.text}
                        ${status.border}
                    `}

                                        >

                                            <span className="h-2 w-2 rounded-full bg-current"></span>

                                            {drone.status.replace("_", " ")}

                                        </span>

                                    </td>

                                    {/* ================= POSITION ================= */}

                                    <td className="px-6 py-7">

                                        <div className="space-y-2 text-sm">

                                            <div className="flex items-center gap-2 text-gray-300">

                                                <MapPin size={16} className="text-[#D4AF37]" />

                                                {drone.latitude?.toFixed(5) ?? "--"}

                                            </div>

                                            <div className="pl-6 text-gray-500">

                                                {drone.longitude?.toFixed(5) ?? "--"}

                                            </div>

                                        </div>

                                    </td>
                                    {/* ================= ACTIONS ================= */}

                                    {role !== "VIEWER" && (

                                        <td className="px-6 py-7">

                                            <div className="flex items-center justify-center gap-3">

                                                <button

                                                    onClick={(e) => {

                                                        e.stopPropagation();

                                                        navigate(`/drones/${drone.id}`);

                                                    }}

                                                    className="
                    rounded-xl
                    border
                    border-[#D4AF37]/20
                    bg-[#D4AF37]/10
                    p-3
                    text-[#D4AF37]
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:bg-[#D4AF37]
                    hover:text-black
                "

                                                    title="View Drone"

                                                >

                                                    <EyeIcon className="h-5 w-5" />

                                                </button>

                                                {(role === "ADMIN" || role === "OPERATOR") && (

                                                    <button

                                                        onClick={(e) => {

                                                            e.stopPropagation();

                                                            onEdit(drone);

                                                        }}

                                                        className="
                        rounded-xl
                        border
                        border-cyan-500/20
                        bg-cyan-500/10
                        p-3
                        text-cyan-400
                        transition-all
                        duration-300
                        hover:scale-110
                        hover:bg-cyan-500
                        hover:text-white
                    "

                                                        title="Edit"

                                                    >

                                                        <PencilSquareIcon className="h-5 w-5" />

                                                    </button>

                                                )}

                                                {role === "ADMIN" && (

                                                    <button

                                                        onClick={(e) => {

                                                            e.stopPropagation();

                                                            onDelete(drone);

                                                        }}

                                                        className="
                        rounded-xl
                        border
                        border-red-500/20
                        bg-red-500/10
                        p-3
                        text-red-400
                        transition-all
                        duration-300
                        hover:scale-110
                        hover:bg-red-500
                        hover:text-white
                    "

                                                        title="Delete"

                                                    >

                                                        <TrashIcon className="h-5 w-5" />

                                                    </button>

                                                )}

                                            </div>

                                        </td>

                                    )}

                                </tr>

                            );

                        })

                    )}

                </tbody>
            </table>

        </div>

    );

}

export default DroneTable;