import { useEffect, useState } from "react";

import api from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import SearchBar from "../components/SearchBar";
import DroneTable from "../components/DroneTable";
import AddDroneModal from "../components/AddDroneModal";
import EditDroneModal from "../components/EditDroneModal";
import DeleteDroneModal from "../components/DeleteDroneModal";
import Pagination from "../components/Pagination";

function DroneList() {

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const pageSize = 10;

    const [drones, setDrones] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedDrone, setSelectedDrone] = useState(null);

    useEffect(() => {

        fetchDrones();

    }, [page]);

    async function fetchDrones() {

        try {

            setLoading(true);

            const response = await api.get(
                `/api/drones?page=${page}&size=${pageSize}`
            );

            setDrones(response.data.content);

            setTotalPages(response.data.totalPages);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }

    const filteredDrones = drones.filter(drone =>

        drone.model.toLowerCase().includes(search.toLowerCase()) ||

        drone.manufacturer.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <DashboardLayout>

            {/* Header */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-white">

                        🚁 Drone Management

                    </h1>

                    <p className="text-gray-400 mt-2">

                        Manage your complete drone fleet from one place.

                    </p>

                </div>

                {/* <div className="bg-slate-800 rounded-xl px-6 py-4 shadow-lg">

                    <p className="text-gray-400 text-sm">

                        Total Drones

                    </p>

                    <h2 className="text-3xl font-bold text-cyan-400">

                        {drones.length}

                    </h2>

                </div> */}

            </div>

            {/* Search */}

            <SearchBar

                search={search}

                setSearch={setSearch}

                onAddDrone={() => setShowModal(true)}

            />

            {/* Drone Table */}

            {loading ? (

                <div className="bg-slate-800 rounded-xl p-12 text-center">

                    <div className="text-6xl animate-pulse">

                        🚁

                    </div>

                    <h2 className="text-2xl text-white mt-4">

                        Loading drones...

                    </h2>

                </div>

            ) : filteredDrones.length === 0 ? (

                <div className="bg-slate-800 rounded-xl p-12 text-center">

                    <div className="text-6xl">

                        📭

                    </div>

                    <h2 className="text-2xl text-white mt-4">

                        No Drones Found

                    </h2>

                    <p className="text-gray-400 mt-3">

                        Click <span className="font-semibold text-cyan-400">Add Drone</span> to create your first drone.

                    </p>

                </div>

            ) : (

                <DroneTable

                    drones={filteredDrones}

                    onEdit={(drone) => {

                        setSelectedDrone(drone);

                        setShowEditModal(true);

                    }}

                    onDelete={(drone) => {

                        setSelectedDrone(drone);

                        setShowDeleteModal(true);

                    }}

                />

            )}

            {/* Add */}

            <AddDroneModal

                isOpen={showModal}

                onClose={() => setShowModal(false)}

                onDroneAdded={() => {

                    fetchDrones();

                }}

            />

            {/* Edit */}

            <EditDroneModal

                isOpen={showEditModal}

                drone={selectedDrone}

                onClose={() => setShowEditModal(false)}

                onDroneUpdated={() => {

                    fetchDrones();

                }}

            />

            {/* Delete */}

            <DeleteDroneModal

                isOpen={showDeleteModal}

                drone={selectedDrone}

                onClose={() => setShowDeleteModal(false)}

                onDroneDeleted={() => {

                    fetchDrones();

                }}

            />

            {/* Pagination */}

            {!loading && filteredDrones.length > 0 && (

                <Pagination

                    page={page}

                    totalPages={totalPages}

                    setPage={setPage}

                />

            )}

        </DashboardLayout>

    );

}

export default DroneList;