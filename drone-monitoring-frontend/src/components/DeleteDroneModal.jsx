import api from "../api/axios";
import toast from "react-hot-toast";

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

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-slate-800 rounded-xl w-[450px] p-8">

                <h2 className="text-3xl text-red-500 font-bold mb-4">

                    Delete Drone

                </h2>

                <p className="text-white">

                    Are you sure you want to delete

                </p>

                <p className="text-cyan-400 text-xl font-semibold mt-2 mb-6">

                    {drone.model}

                </p>

                <p className="text-gray-400 mb-8">

                    This action cannot be undone.

                </p>

                <div className="flex justify-end gap-3">

                    <button

                        onClick={onClose}

                        className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded">

                        Cancel

                    </button>

                    <button

                        onClick={handleDelete}

                        className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded">

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteDroneModal;