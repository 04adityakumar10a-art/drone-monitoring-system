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

    return (

        <form onSubmit={handleSubmit}>

            <input

                name="model"

                placeholder="Model"

                value={formData.model}

                onChange={handleChange}

                className="w-full mb-4 p-3 rounded bg-slate-700 text-white"

                required

            />

            <input

                name="manufacturer"

                placeholder="Manufacturer"

                value={formData.manufacturer}

                onChange={handleChange}

                className="w-full mb-4 p-3 rounded bg-slate-700 text-white"

                required

            />

            <input

                name="serialNumber"

                placeholder="Serial Number"

                value={formData.serialNumber}

                onChange={handleChange}

                className="w-full mb-4 p-3 rounded bg-slate-700 text-white"

                required

            />

            <input

                type="number"

                name="batteryLevel"

                placeholder="Battery"

                min="0"

                max="100"

                value={formData.batteryLevel}

                onChange={handleChange}

                className="w-full mb-2 p-3 rounded bg-slate-700 text-white"

                required

            />

            {formData.batteryLevel !== "" &&
                (formData.batteryLevel < 0 ||
                 formData.batteryLevel > 100) && (

                <p className="text-red-400 text-sm mb-3">

                    Battery must be between 0 and 100.

                </p>

            )}

            <select

                name="status"

                value={formData.status}

                onChange={handleChange}

                className="w-full mb-6 p-3 rounded bg-slate-700 text-white">

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

            <div className="flex justify-end gap-3">

                <button

                    type="button"

                    onClick={onCancel}

                    className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded">

                    Cancel

                </button>

                <button

                    type="submit"

                    disabled={!isFormValid}

                    className={`px-5 py-2 rounded text-white

                    ${isFormValid

                        ? "bg-cyan-500 hover:bg-cyan-600"

                        : "bg-gray-500 cursor-not-allowed"

                    }`}>

                    {submitText}

                </button>

            </div>

        </form>

    );

}

export default DroneForm;