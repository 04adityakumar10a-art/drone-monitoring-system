import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

        <AnimatePresence>
            {open && (

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                >

                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.97 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="
                            relative
                            w-full
                            max-w-xl
                            overflow-hidden
                            rounded-[26px]
                            border
                            border-white/[0.1]
                            border-t-white/[0.22]
                            bg-white/[0.045]
                            shadow-[0_30px_80px_rgba(0,0,0,0.6)]
                            backdrop-blur-2xl
                        "
                    >

                        {/* Top gradient bar */}

                        <div
                            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-80"
                            style={{
                                backgroundImage:
                                    "linear-gradient(90deg, transparent, #F0C24B 15%, #8B6BD8 50%, #4FD1E3 85%, transparent)"
                            }}
                        />

                        {/* Ambient glows */}

                        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#F0C24B]/[0.08] blur-[110px]" />
                        <div className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-[#8B6BD8]/[0.06] blur-[100px]" />

                        {/* Header */}

                        <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] p-6">

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-[#F0C24B]/25
                                        bg-gradient-to-br
                                        from-[#F0C24B]/[0.16]
                                        to-[#F0C24B]/[0.02]
                                    "
                                >
                                    <Plane
                                        size={20}
                                        className="text-[var(--aerion-primary)]"
                                    />
                                </div>

                                <h2 className="text-2xl font-bold text-white">
                                    Add Drone
                                </h2>

                            </div>

                            <button
                                onClick={onClose}
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-white/[0.08]
                                    bg-white/[0.03]
                                    text-gray-400
                                    transition-all
                                    hover:border-white/[0.2]
                                    hover:text-white
                                "
                            >
                                <X size={17} />
                            </button>

                        </div>

                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="relative z-10 space-y-5 p-6"
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
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/[0.09]
                                        bg-white/[0.035]
                                        p-3
                                        text-white
                                        outline-none
                                        transition-all
                                        duration-300
                                        focus:border-[#F0C24B]/45
                                        focus:bg-white/[0.06]
                                        focus:shadow-[0_0_0_3px_rgba(240,194,75,0.08)]
                                    "
                                >

                                    <option value="ONLINE" className="bg-[#111]">
                                        ONLINE
                                    </option>

                                    <option value="OFFLINE" className="bg-[#111]">
                                        OFFLINE
                                    </option>

                                </select>

                            </div>

                            <div className="flex justify-end gap-3 pt-4">

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="
                                        rounded-xl
                                        border
                                        border-white/[0.09]
                                        bg-white/[0.02]
                                        px-5
                                        py-3
                                        text-white
                                        transition-all
                                        hover:border-white/[0.2]
                                        hover:bg-white/[0.05]
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-white/[0.25]
                                        bg-gradient-to-br
                                        from-[#FFDE8A]
                                        via-[#F0C24B]
                                        to-[#B8842A]
                                        px-6
                                        py-3
                                        font-semibold
                                        text-[#2A1F05]
                                        shadow-[0_4px_18px_rgba(240,194,75,0.3)]
                                        transition-all
                                        hover:shadow-[0_6px_22px_rgba(240,194,75,0.42)]
                                        disabled:opacity-60
                                    "
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

                    </motion.div>

                </motion.div>

            )}
        </AnimatePresence>

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

                className="
                    w-full
                    rounded-xl
                    border
                    border-white/[0.09]
                    bg-white/[0.035]
                    p-3
                    text-white
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[#F0C24B]/45
                    focus:bg-white/[0.06]
                    focus:shadow-[0_0_0_3px_rgba(240,194,75,0.08)]
                "

            />

        </div>

    );

}

export default AddDroneModal;