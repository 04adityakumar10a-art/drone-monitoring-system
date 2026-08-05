import { useState } from "react";
import { X, Plane, Loader2 } from "lucide-react";
import api from "../../../api/axios";

const initialState = {
    name: "",
    model: "",
    serialNumber: "",
    firmwareVersion: "",
    status: "ONLINE"
};

function AddDroneModal({ open, onClose, onSuccess }) {

    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    function handleChange(e) {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            await api.post("/api/drones", form);

            setForm(initialState);

            onSuccess?.();

            onClose();

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="w-full max-w-xl rounded-2xl border border-[#262626] bg-[#111111] shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-[#262626] p-6">

                    <div className="flex items-center gap-3">

                        <Plane className="text-[#D4AF37]" />

                        <h2 className="text-2xl font-bold text-white">

                            Add Drone

                        </h2>

                    </div>

                    <button onClick={onClose}>

                        <X className="text-gray-400 hover:text-white" />

                    </button>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >

                    <Input
                        label="Drone Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <Input
                        label="Model"
                        name="model"
                        value={form.model}
                        onChange={handleChange}
                    />

                    <Input
                        label="Serial Number"
                        name="serialNumber"
                        value={form.serialNumber}
                        onChange={handleChange}
                    />

                    <Input
                        label="Firmware Version"
                        name="firmwareVersion"
                        value={form.firmwareVersion}
                        onChange={handleChange}
                    />

                    <div>

                        <label className="mb-2 block text-sm text-gray-400">

                            Status

                        </label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-[#333] bg-[#1A1A1A] p-3 text-white"
                        >

                            <option value="ONLINE">

                                ONLINE

                            </option>

                            <option value="OFFLINE">

                                OFFLINE

                            </option>

                        </select>

                    </div>

                    <div className="flex justify-end gap-3 pt-4">

                        <button

                            type="button"

                            onClick={onClose}

                            className="rounded-xl border border-[#333] px-5 py-3 text-white"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            disabled={loading}

                            className="flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-black"

                        >

                            {

                                loading

                                    ? <Loader2 className="animate-spin" size={18} />

                                    : null

                            }

                            Save Drone

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

function Input({

    label,

    ...props

}) {

    return (

        <div>

            <label className="mb-2 block text-sm text-gray-400">

                {label}

            </label>

            <input

                {...props}

                className="w-full rounded-xl border border-[#333] bg-[#1A1A1A] p-3 text-white outline-none focus:border-[#D4AF37]"

            />

        </div>

    );

}

export default AddDroneModal;