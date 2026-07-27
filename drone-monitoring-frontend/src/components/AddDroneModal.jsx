import { useState } from "react";
import api from "../api/axios";
import DroneForm from "./DroneForm";
import toast from "react-hot-toast";

function AddDroneModal({ isOpen, onClose, onDroneAdded }) {

    const [formData, setFormData] = useState({

        model: "",

        manufacturer: "",

        batteryLevel: "",

        serialNumber: "",

        status: "AVAILABLE"

    });

    if (!isOpen) return null;

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

            const response = await api.post("/api/drones", formData);

            toast.success("Drone created successfully!");

            onDroneAdded();

            onClose();

            setFormData({

                model: "",

                manufacturer: "",

                batteryLevel: "",

                serialNumber: "",

                status: "AVAILABLE"

            });

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to create drone!");

        }

    }

    return (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-slate-800 rounded-xl w-[500px] p-8">

                <h2 className="text-3xl text-white font-bold mb-6">

                    Add New Drone

                </h2>

                <DroneForm

                    formData={formData}

                    handleChange={handleChange}

                    handleSubmit={handleSubmit}

                    submitText="Save Drone"

                    onCancel={onClose}

                />

            </div>

        </div>

    );

}

export default AddDroneModal;