function DroneTable({

    drones,

    onEdit,

    onDelete

}){

const role = localStorage.getItem("role");

function batteryColor(level) {

    if (level >= 70) return "text-green-400";

    if (level >= 40) return "text-yellow-400";

    return "text-red-400";
}

return (

    <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden">

        <table className="w-full text-white">

            <thead className="bg-slate-700">

                <tr>

                    <th className="p-4 text-left">
                        🚁 Model
                    </th>

                    <th className="p-4 text-left">
                        🏭 Manufacturer
                    </th>

                    <th className="p-4 text-center">
                        🔋 Battery
                    </th>

                    <th className="p-4 text-center">
                        📡 Status
                    </th>

                    {role !== "VIEWER" && (

                        <th className="p-4 text-center">

                            ⚙️ Actions

                        </th>

                    )}

                </tr>

            </thead>

            <tbody>

                {drones.length === 0 ? (

                    <tr>

                        <td
                            colSpan="5"
                            className="text-center p-8 text-gray-400">

                            No drones found.

                        </td>

                    </tr>

                ) : (

                    drones.map((drone) => (

                        <tr
                            key={drone.id}
                            className="border-b border-slate-700 hover:bg-slate-700 transition-all duration-200">

                            <td className="p-4 font-semibold">

                                {drone.model}

                            </td>

                            <td className="p-4">

                                {drone.manufacturer}

                            </td>

                            <td
                                className={`p-4 text-center font-semibold ${batteryColor(drone.batteryLevel)}`}>

                                {drone.batteryLevel}%

                            </td>

                            <td className="p-4 text-center">

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold
                                        ${drone.status === "AVAILABLE"
                                            ? "bg-green-600"

                                            : drone.status === "IN_FLIGHT"
                                                ? "bg-blue-600"

                                                : drone.status === "MAINTENANCE"
                                                    ? "bg-yellow-500 text-black"

                                                    : "bg-red-600"
                                        }`}>

                                    {drone.status}

                                </span>

                            </td>

                            {role !== "VIEWER" && (

                                <td className="p-4">

                                    <div className="flex justify-center gap-2">

                                        {(role === "ADMIN" || role === "OPERATOR") && (

                                            <button

                                                onClick={() => onEdit(drone)}

                                                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded transition">

                                                ✏️

                                            </button>

                                        )}

                                        {role === "ADMIN" && (

                                            <button

                                                onClick={() => onDelete(drone)}

                                                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition">

                                                🗑️

                                            </button>

                                        )}

                                    </div>

                                </td>

                            )}
                        </tr>

                    ))

                )}

            </tbody>

        </table>

    </div>

);

}

export default DroneTable;