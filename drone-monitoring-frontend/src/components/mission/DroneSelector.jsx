function DroneSelector({

    drones,

    selectedDroneId,

    onChange

}) {

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

            <label className="block text-sm font-semibold text-slate-400 mb-3">

                Select Drone

            </label>

            <select
                value={selectedDroneId ?? ""}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 p-3 text-white"
            >

                {drones.map((drone) => (

                    <option
                        key={drone.id}
                        value={drone.id}
                    >
                        Drone {drone.id} - {drone.model}
                    </option>

                ))}

            </select>

        </div>

    );

}

export default DroneSelector;