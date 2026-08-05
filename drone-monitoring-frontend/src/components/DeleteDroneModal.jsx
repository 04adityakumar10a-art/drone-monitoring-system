import api from "../api/axios";
import toast from "react-hot-toast";

import {
    ExclamationTriangleIcon,
    TrashIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

function DeleteDroneModal({

    isOpen,

    drone,

    onClose,

    onDroneDeleted

}) {

    if (!isOpen || !drone) return null;

    async function handleDelete() {

        try {

            await api.delete(`/api/drones/${drone.id}`);

            toast.success("Drone deleted successfully!");

            onDroneDeleted();

            onClose();

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to delete drone.");

        }

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

            <div
                className="
                    w-full
                    max-w-xl
                    rounded-3xl
                    border
                    border-red-500/20
                    bg-slate-900/90
                    shadow-[0_0_60px_rgba(239,68,68,.15)]
                    backdrop-blur-2xl
                "
            >

                {/* Header */}

                <div className="flex items-center justify-between border-b border-red-500/10 px-8 py-6">

                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">

                            <ExclamationTriangleIcon className="h-8 w-8 text-red-400" />

                        </div>

                        <div>

                            <p className="text-xs uppercase tracking-[0.30em] text-slate-500">

                                Mission Confirmation

                            </p>

                            <h2 className="mt-1 text-3xl font-bold text-white">

                                Delete Drone

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

                <div className="px-8 py-8">

                    <div
                        className="
                            rounded-2xl
                            border
                            border-red-500/10
                            bg-red-500/5
                            p-6
                        "
                    >

                        <p className="text-slate-300">

                            You are about to permanently remove the following drone from the fleet:

                        </p>

                        <h3 className="mt-4 text-2xl font-bold text-red-400">

                            {drone.model}

                        </h3>

                        <p className="mt-2 text-slate-500">

                            Serial Number: {drone.serialNumber}

                        </p>

                    </div>

                    <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">

                        <p className="text-sm text-amber-300">

                            This action is permanent and cannot be undone.

                        </p>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-4 border-t border-red-500/10 px-8 py-6">

                    <button

                        onClick={onClose}

                        className="
                            rounded-2xl
                            border
                            border-slate-700
                            px-6
                            py-3
                            text-slate-300
                            transition-all
                            hover:border-cyan-400
                            hover:text-cyan-400
                        "

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleDelete}

                        className="
                            flex
                            items-center
                            gap-2
                            rounded-2xl
                            bg-gradient-to-r
                            from-red-500
                            to-red-700
                            px-7
                            py-3
                            font-semibold
                            text-white
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-[0_0_25px_rgba(239,68,68,.35)]
                        "

                    >

                        <TrashIcon className="h-5 w-5" />

                        Delete Drone

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteDroneModal;