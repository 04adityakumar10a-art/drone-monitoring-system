import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";

import useDroneStatus from "../hooks/useDroneStatus";
import SearchBar from "../components/SearchBar";
import DroneTable from "../components/DroneTable";
import AddDroneModal from "../components/AddDroneModal";
import EditDroneModal from "../components/EditDroneModal";
import DeleteDroneModal from "../components/DeleteDroneModal";
import Pagination from "../components/Pagination";
import FleetHeader from "./FleetManagement/components/FleetHeader";
import { subscribe } from "../services/websocket";

import toast from "react-hot-toast";

function DroneList() {

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [manufacturerFilter, setManufacturerFilter] = useState("ALL");

    const [batteryFilter, setBatteryFilter] = useState("ALL");
    
    const liveDrones = useDroneStatus();

    const [page, setPage] = useState(0);

    const pageSize = 10;

    const [totalPages, setTotalPages] = useState(0);

    const [drones, setDrones] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedDrone, setSelectedDrone] = useState(null);

    /*
    =============================================
                FETCH DRONES
    =============================================
    */

    const fetchDrones = useCallback(async () => {

        try {

            setLoading(true);

            const response = await api.get(

                `/api/drones?page=${page}&size=${pageSize}`

            );

            setDrones(response.data.content);

            setTotalPages(response.data.totalPages);

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load drones");

        }

        finally {

            setLoading(false);

        }

    }, [page]);

    /*
    =============================================
                INITIAL LOAD
    =============================================
    */

    useEffect(() => {

        fetchDrones();

    }, [fetchDrones]);

    /*
    =============================================
                WEBSOCKET EVENTS
    =============================================
    */

    useEffect(() => {

        const subscription = subscribe(

            "/topic/drones",

            (event) => {

                switch (event.event) {

                    case "DRONE_CREATED":

                        toast.success(

                            `${event.data.model} added successfully`

                        );

                        break;

                    case "DRONE_UPDATED":

                        toast.success(

                            `${event.data.model} updated successfully`

                        );

                        break;

                    case "DRONE_DELETED":

                        toast.success(

                            "Drone deleted successfully"

                        );

                        break;

                    default:

                        console.warn(

                            "Unknown Event",

                            event

                        );

                        return;

                }

                requestAnimationFrame(() => {

                    fetchDrones();

                });

            }

        );

        return () => {

            subscription?.unsubscribe();

        };

    }, [fetchDrones]);


    useEffect(() => {

        setDrones(previous =>

            previous.map(drone =>

                liveDrones[drone.id]

                    ? {

                        ...drone,

                        ...liveDrones[drone.id]

                    }

                    : drone

            )

        );

    }, [liveDrones]);

    /*
    =============================================
                    SEARCH
    =============================================
    */

    const filteredDrones = drones.filter((drone) => {

        const term = search.toLowerCase();

        const matchesSearch =
            drone.model.toLowerCase().includes(term) ||
            drone.manufacturer.toLowerCase().includes(term) ||
            drone.serialNumber.toLowerCase().includes(term);

        const matchesStatus =

            statusFilter === "ALL"

            ||

            drone.status === statusFilter;

        const matchesManufacturer =

            manufacturerFilter === "ALL"

            ||

            drone.manufacturer === manufacturerFilter;

        let matchesBattery = true;

        switch (batteryFilter) {

            case "HIGH":

                matchesBattery = drone.batteryLevel >= 75;

                break;

            case "MEDIUM":

                matchesBattery =
                    drone.batteryLevel >= 40 &&
                    drone.batteryLevel < 75;

                break;

            case "LOW":

                matchesBattery = drone.batteryLevel < 40;

                break;

            default:

                matchesBattery = true;

        }

        return (

            matchesSearch &&

            matchesStatus &&

            matchesManufacturer &&

            matchesBattery

        );

    });

    return (
        <>

            {/* Header */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <FleetHeader drones={filteredDrones} />

                </div>

            </div>

            {/* Search */}

            <SearchBar

                search={search}

                setSearch={setSearch}

                statusFilter={statusFilter}

                setStatusFilter={setStatusFilter}

                manufacturerFilter={manufacturerFilter}

                setManufacturerFilter={setManufacturerFilter}

                batteryFilter={batteryFilter}

                setBatteryFilter={setBatteryFilter}

                manufacturers={[

                    "ALL",

                    ...new Set(

                        drones.map(

                            d => d.manufacturer

                        )

                    )

                ]}

                onAddDrone={() =>

                    setShowModal(true)

                }

            />
            {/* Loading */}

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

                        Click

                        <span className="font-semibold text-cyan-400">

                            {" "}Add Drone{" "}

                        </span>

                        to create your first drone.

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
            {/* Add Drone Modal */}

            <AddDroneModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onDroneAdded={() => {
                    setShowModal(false);
                }}
            />

            {/* Edit Drone Modal */}

            <EditDroneModal
                isOpen={showEditModal}
                drone={selectedDrone}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedDrone(null);
                }}
                onDroneUpdated={() => {
                    setShowEditModal(false);
                    setSelectedDrone(null);
                }}
            />

            {/* Delete Drone Modal */}

            <DeleteDroneModal
                isOpen={showDeleteModal}
                drone={selectedDrone}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedDrone(null);
                }}
                onDroneDeleted={() => {
                    setShowDeleteModal(false);
                    setSelectedDrone(null);
                }}
            />

            {/* Pagination */}

            {!loading && totalPages > 0 && (

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />

            )}

        </>
    );

}

export default DroneList;