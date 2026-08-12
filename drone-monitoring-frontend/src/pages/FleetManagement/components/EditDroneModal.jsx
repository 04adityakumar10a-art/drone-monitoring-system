import { useEffect, useState } from "react";
import { X, Plane, Loader2 } from "lucide-react";
import api from "../../../api/axios";

const initialState = {
    name: "",
    model: "",
    serialNumber: "",
    firmwareVersion: "",
    status: "ONLINE"
};

function EditDroneModal({

    open,

    drone,

    onClose,

    onSuccess

}) {

    const [form, setForm] = useState(initialState);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (drone) {

            setForm({

                name: drone.name || "",

                model: drone.model || "",

                serialNumber: drone.serialNumber || "",

                firmwareVersion: drone.firmwareVersion || "",

                status: drone.status || "ONLINE"

            });

        }

    }, [drone]);

    if (!open || !drone) return null;

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

            await api.put(

                `/api/drones/${drone.id}`,

                form

            );

            onSuccess?.();

            onClose();

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="w-full max-w-xl rounded-2xl border border-[#262626] bg-[#111111]">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-[#262626] p-6">

                    <div className="flex items-center gap-3">

                        <Plane className="text-[var(--aerion-primary)]" />

                        <h2 className="text-2xl font-bold text-white">

                            Edit Drone

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

                        label="Firmware"

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

                                loading &&

                                <Loader2

                                    size={18}

                                    className="animate-spin"

                                />

                            }

                            Update Drone

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

export default EditDroneModal;