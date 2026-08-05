function DroneForm({

    formData,

    handleChange,

    handleSubmit,

    submitText,

    onCancel

}) {

    const isFormValid =

        formData.model.trim() !== "" &&

        formData.manufacturer.trim() !== "" &&

        formData.serialNumber.trim() !== "" &&

        formData.batteryLevel !== "" &&

        formData.batteryLevel >= 0 &&

        formData.batteryLevel <= 100;

    const inputClass = `
        w-full
        rounded-2xl
        border
        border-cyan-500/15
        bg-slate-900/60
        px-5
        py-2.5
        text-white
        placeholder:text-slate-500
        outline-none
        transition-all
        duration-300
        focus:border-cyan-400
        focus:ring-2
        focus:ring-cyan-500/20
    `;

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >

            {/* Model */}

            <div>

                <label className="mb-1 block text-sm font-semibold uppercase tracking-[0.20em] text-slate-400">

                    Drone Model

                </label>

                <input

                    name="model"

                    placeholder="e.g. DJI Mavic 3"

                    value={formData.model}

                    onChange={handleChange}

                    className={inputClass}

                    required

                />

            </div>

            {/* Manufacturer */}

            <div>

                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.20em] text-slate-400">

                    Manufacturer

                </label>

                <input

                    name="manufacturer"

                    placeholder="e.g. DJI"

                    value={formData.manufacturer}

                    onChange={handleChange}

                    className={inputClass}

                    required

                />

            </div>

            {/* Serial */}

            <div>

                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.20em] text-slate-400">

                    Serial Number

                </label>

                <input

                    name="serialNumber"

                    placeholder="DR-1001"

                    value={formData.serialNumber}

                    onChange={handleChange}

                    className={inputClass}

                    required

                />

            </div>

            {/* Battery */}

            <div>

                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.20em] text-slate-400">

                    Battery Level

                </label>

                <input

                    type="number"

                    name="batteryLevel"

                    min="0"

                    max="100"

                    placeholder="0 - 100"

                    value={formData.batteryLevel}

                    onChange={handleChange}

                    className={inputClass}

                    required

                />

                {formData.batteryLevel !== "" && (

                    <div className="mt-3">

                        <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                            <div

                                className={`h-full transition-all duration-300 ${formData.batteryLevel >= 70
                                    ? "bg-emerald-400"
                                    : formData.batteryLevel >= 40
                                        ? "bg-amber-400"
                                        : "bg-red-500"
                                    }`}

                                style={{

                                    width: `${formData.batteryLevel}%`

                                }}

                            />

                        </div>

                        <div className="mt-2 flex justify-between text-sm">

                            <span className="text-slate-400">

                                Battery

                            </span>

                            <span className="font-semibold text-cyan-400">

                                {formData.batteryLevel}%

                            </span>

                        </div>

                    </div>

                )}

            </div>

            {/* Status */}

            <div>

                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.20em] text-slate-400">

                    Status

                </label>

                <select

                    name="status"

                    value={formData.status}

                    onChange={handleChange}

                    className={inputClass}

                >

                    <option value="AVAILABLE">

                        AVAILABLE

                    </option>

                    <option value="IN_FLIGHT">

                        IN FLIGHT

                    </option>

                    <option value="MAINTENANCE">

                        MAINTENANCE

                    </option>

                </select>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4 pt-4">

                <button

                    type="button"

                    onClick={onCancel}

                    className="
                        rounded-2xl
                        border
                        border-slate-700
                        px-6
                        py-3
                        text-slate-300
                        transition-all
                        duration-300
                        hover:border-red-400
                        hover:bg-red-500/10
                        hover:text-red-400
                    "

                >

                    Cancel

                </button>

                <button

                    type="submit"

                    disabled={!isFormValid}

                    className={`
                        rounded-2xl
                        px-8
                        py-2.5
                        font-semibold
                        transition-all
                        duration-300
                        ${isFormValid
                            ? `
                                    bg-gradient-to-r
                                    from-cyan-500
                                    to-blue-600
                                    text-white
                                    hover:-translate-y-1
                                    hover:shadow-[0_0_30px_rgba(6,182,212,.40)]
                                  `
                            : `
                                    cursor-not-allowed
                                    bg-slate-700
                                    text-slate-500
                                  `
                        }
                    `}

                >

                    {submitText}

                </button>

            </div>

        </form>

    );

}

export default DroneForm;