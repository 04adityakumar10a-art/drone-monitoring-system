import { Trash2, X } from "lucide-react";
import api from "../../../api/axios";

function DeleteDialog({

    open,

    drone,

    onClose,

    onSuccess

}) {

    if (!open || !drone) return null;

    async function handleDelete() {

        try {

            await api.delete(`/api/drones/${drone.id}`);

            onSuccess?.();

            onClose();

        }

        catch (err) {

            console.error(err);

        }

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-2xl border border-[#262626] bg-[#111111]">

                <div className="flex items-center justify-between border-b border-[#262626] p-6">

                    <div className="flex items-center gap-3">

                        <Trash2 className="text-red-500"/>

                        <h2 className="text-xl font-bold text-white">

                            Delete Drone

                        </h2>

                    </div>

                    <button onClick={onClose}>

                        <X className="text-gray-400"/>

                    </button>

                </div>

                <div className="space-y-5 p-6">

                    <div>

                        <p className="text-gray-400">

                            You are about to permanently delete

                        </p>

                        <h3 className="mt-2 text-lg font-bold text-white">

                            {drone.name}

                        </h3>

                        <p className="text-gray-500">

                            {drone.serialNumber}

                        </p>

                    </div>

                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">

                        This action cannot be undone.

                    </div>

                    <div className="flex justify-end gap-3">

                        <button

                            onClick={onClose}

                            className="rounded-xl border border-[#333] px-5 py-3 text-white"

                        >

                            Cancel

                        </button>

                        <button

                            onClick={handleDelete}

                            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"

                        >

                            Delete

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DeleteDialog;