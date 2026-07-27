import { useEffect, useState } from "react";

import api from "../api/axios";

import DroneForm from "./DroneForm";

import toast from "react-hot-toast";


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

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-slate-800 rounded-xl p-8 w-[500px]">

                <h2 className="text-3xl text-white font-bold mb-6">

                    Edit Drone

                </h2>

                <DroneForm

                    formData={formData}

                    handleChange={handleChange}

                    handleSubmit={handleSubmit}

                    submitText="Update Drone"

                    onCancel={onClose}

                />

            </div>

        </div>

    );

}

export default EditDroneModal;