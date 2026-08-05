import { useEffect, useState } from "react";
import api from "../api/axios";
import DroneForm from "./DroneForm";
import toast from "react-hot-toast";

import {
    PencilSquareIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

function EditDroneModal({

    isOpen,

    drone,

    onClose,

    onDroneUpdated

}) {

    const [formData, setFormData] = useState({

        model: "",

        manufacturer: "",

        serialNumber: "",

        batteryLevel: "",

        status: "AVAILABLE"

    });

    useEffect(() => {

        if (drone) {

            setFormData({

                model: drone.model,

                manufacturer: drone.manufacturer,

                serialNumber: drone.serialNumber,

                batteryLevel: drone.batteryLevel,

                status: drone.status

            });

        }

    }, [drone]);

    if (!isOpen || !drone) return null;

    function handleChange(event) {

        const { name, value } = event.target;

        if (name === "batteryLevel") {

            let battery = value === "" ? "" : Number(value);

            if (battery !== "") {

                if (battery > 100) battery = 100;

                if (battery < 0) battery = 0;

            }

            setFormData({

                ...formData,

                batteryLevel: battery

            });

            return;

        }

        setFormData({

            ...formData,

            [name]: value

        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            await api.put(

                `/api/drones/${drone.id}`,

                formData

            );

            onDroneUpdated();

            onClose();

            toast.success("Drone updated successfully!");

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to update drone!");

        }

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

            <div
                className="
                    relative
                    w-full
                    max-w-[720px]
                    rounded-3xl
                    border
                    border-cyan-500/20
                    bg-slate-900/90
                    shadow-[0_0_60px_rgba(6,182,212,.20)]
                    backdrop-blur-2xl
                "
            >

                {/* Header */}

                <div className="flex items-center justify-between border-b border-cyan-500/10 px-8 py-6">

                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

                            <PencilSquareIcon className="h-8 w-8 text-cyan-400" />

                        </div>

                        <div>

                            <p className="text-xs uppercase tracking-[0.30em] text-slate-500">

                                Fleet Management

                            </p>

                            <h2 className="mt-1 text-3xl font-bold text-white">

                                Edit Drone

                            </h2>

                        </div>

                    </div>

                    <button

                        onClick={onClose}

                        className="
                            rounded-xl
                            border
                            border-slate-700
                            p-2
                            text-slate-400
                            transition-all
                            hover:border-red-400
                            hover:bg-red-500/10
                            hover:text-red-400
                        "

                    >

                        <XMarkIcon className="h-6 w-6" />

                    </button>

                </div>

                {/* Body */}

                <div
                    className="
        max-h-[70vh]
        overflow-y-auto
        p-8
    "
                >

                    <DroneForm

                        formData={formData}

                        handleChange={handleChange}

                        handleSubmit={handleSubmit}

                        submitText="Update Drone"

                        onCancel={onClose}

                    />

                </div>

            </div>

        </div>

    );

}

export default EditDroneModal;