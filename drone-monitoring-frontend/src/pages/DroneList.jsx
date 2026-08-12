import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Plane, Inbox } from "lucide-react";
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

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="
                        relative
                        overflow-hidden
                        rounded-[28px]
                        border
                        border-white/[0.08]
                        border-t-white/[0.18]
                        bg-white/[0.03]
                        p-14
                        text-center
                        backdrop-blur-xl
                    "
                >
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#F0C24B]/[0.08] blur-[110px]" />

                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                        className="
                            relative
                            z-10
                            mx-auto
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-3xl
                            border
                            border-[#F0C24B]/25
                            bg-gradient-to-br
                            from-[#F0C24B]/[0.16]
                            to-[#F0C24B]/[0.02]
                            shadow-[0_0_30px_rgba(240,194,75,.15)]
                        "
                    >
                        <Plane size={28} className="text-[var(--aerion-primary)]" />
                    </motion.div>

                    <h2 className="relative z-10 mt-6 text-xl font-semibold text-white">
                        Loading fleet...
                    </h2>

                    <p className="relative z-10 mt-2 text-sm text-gray-500">
                        Pulling the latest telemetry from the registry.
                    </p>
                </motion.div>

            ) : filteredDrones.length === 0 ? (

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="
                        relative
                        overflow-hidden
                        rounded-[28px]
                        border
                        border-white/[0.08]
                        border-t-white/[0.18]
                        bg-white/[0.03]
                        p-14
                        text-center
                        backdrop-blur-xl
                    "
                >
                    <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-[#8B6BD8]/[0.06] blur-[110px]" />

                    <div
                        className="
                            relative
                            z-10
                            mx-auto
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-3xl
                            border
                            border-white/[0.1]
                            bg-white/[0.04]
                        "
                    >
                        <Inbox size={28} className="text-gray-500" />
                    </div>

                    <h2 className="relative z-10 mt-6 text-xl font-semibold text-white">
                        No Drones Found
                    </h2>

                    <p className="relative z-10 mt-2 text-sm text-gray-500">
                        Click{" "}
                        <span className="font-semibold text-[var(--aerion-primary)]">
                            Add Drone
                        </span>{" "}
                        to create your first drone.
                    </p>
                </motion.div>

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