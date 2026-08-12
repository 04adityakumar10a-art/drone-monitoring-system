import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

import FleetHeader from "./components/FleetHeader";
import FleetStats from "./components/FleetStats";
import FleetToolbar from "./components/FleetToolbar";
import DroneGrid from "./components/DroneGrid";
import DroneTable from "./components/DroneTable";
import AddDroneModal from "./components/AddDroneModal";
import EditDroneModal from "./components/EditDroneModal";
import DeleteDialog from "./components/DeleteDialog";

function FleetManagement() {
    const navigate = useNavigate();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedDrone, setSelectedDrone] = useState(null);

    const [drones, setDrones] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [view, setView] = useState("grid");
    const [sortBy, setSortBy] = useState("name");

    async function loadFleet() {
        try {
            setLoading(true);

            const response = await api.get("/api/drones");

            setDrones(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );
        } catch (err) {
            console.error("Failed to load fleet:", err);
            setDrones([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadFleet();
    }, []);

    const filteredFleet = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase();

        let result = drones.filter((drone) => {
            const name =
                drone.name ??
                drone.droneName ??
                "";

            const status =
                drone.status ??
                "";

            const matchesSearch =
                normalizedSearch === "" ||
                name
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                status
                    .toLowerCase()
                    .includes(normalizedSearch);

            const matchesStatus =
                statusFilter === "ALL" ||
                status.toUpperCase() ===
                statusFilter.toUpperCase();

            return (
                matchesSearch &&
                matchesStatus
            );
        });

        result = [...result];

        switch (sortBy) {
            case "battery":
                result.sort(
                    (a, b) =>
                        (b.batteryLevel ?? 0) -
                        (a.batteryLevel ?? 0)
                );
                break;

            case "status":
                result.sort(
                    (a, b) =>
                        (a.status ?? "").localeCompare(
                            b.status ?? ""
                        )
                );
                break;

            case "altitude":
                result.sort(
                    (a, b) =>
                        (b.altitude ?? 0) -
                        (a.altitude ?? 0)
                );
                break;

            case "signal":
                result.sort(
                    (a, b) =>
                        (b.signalStrength ?? 0) -
                        (a.signalStrength ?? 0)
                );
                break;

            default:
                result.sort(
                    (a, b) =>
                        (
                            a.name ??
                            a.droneName ??
                            ""
                        ).localeCompare(
                            b.name ??
                            b.droneName ??
                            ""
                        )
                );
        }

        return result;
    }, [
        drones,
        search,
        statusFilter,
        sortBy
    ]);

    const handleEdit = (drone) => {
        setSelectedDrone(drone);
        setShowEditModal(true);
    };

    const handleDelete = (drone) => {
        setSelectedDrone(drone);
        setShowDeleteModal(true);
    };

    const handleOpen = (drone) => {
        navigate(
            `/mission-control/${drone.id}`
        );
    };

    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                duration: 0.45
            }}
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#050608]
                p-6
                lg:p-8
            "
        >
            {/* =================================
                FLEET BACKGROUND
            ================================= */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 100, 30, 0],
                        y: [0, -40, 30, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 26,
                        ease: "linear"
                    }}
                    className="
                        absolute
                        -left-56
                        top-20
                        h-[500px]
                        w-[500px]
                        rounded-full
                        bg-[#D4AF37]/[0.07]
                        blur-[150px]
                    "
                />

                <motion.div
                    animate={{
                        x: [0, -80, -20, 0],
                        y: [0, 50, -20, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 32,
                        ease: "linear"
                    }}
                    className="
                        absolute
                        -right-56
                        bottom-0
                        h-[560px]
                        w-[560px]
                        rounded-full
                        bg-cyan-500/[0.06]
                        blur-[160px]
                    "
                />

                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.025]
                    "
                    style={{
                        backgroundImage: `
                            linear-gradient(
                                rgba(255,255,255,.08) 1px,
                                transparent 1px
                            ),
                            linear-gradient(
                                90deg,
                                rgba(255,255,255,.08) 1px,
                                transparent 1px
                            )
                        `,
                        backgroundSize:
                            "48px 48px"
                    }}
                />

                <div
                    className="
                        absolute
                        inset-0
                        bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,.55))]
                    "
                />
            </div>

            {/* =================================
                CONTENT
            ================================= */}

            <div className="relative z-5 space-y-6">

                <FleetHeader
                    total={drones.length}
                    drones={drones}
                />

                <FleetStats
                    drones={drones}
                />

                <FleetToolbar
                    search={search}
                    setSearch={setSearch}
                    statusFilter={statusFilter}
                    setStatusFilter={
                        setStatusFilter
                    }
                    view={view}
                    setView={setView}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                {/* =================================
                    MODALS
                ================================= */}

                <AddDroneModal
                    open={showAddModal}
                    onClose={() =>
                        setShowAddModal(false)
                    }
                    onSuccess={loadFleet}
                />

                <EditDroneModal
                    open={showEditModal}
                    drone={selectedDrone}
                    onClose={() =>
                        setShowEditModal(false)
                    }
                    onSuccess={loadFleet}
                />

                <DeleteDialog
                    open={showDeleteModal}
                    drone={selectedDrone}
                    onClose={() =>
                        setShowDeleteModal(false)
                    }
                    onSuccess={loadFleet}
                />

                {/* =================================
                    FLEET CONTENT
                ================================= */}

                <motion.div
                    key={view}
                    initial={{
                        opacity: 0,
                        y: 12
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.35
                    }}
                >
                    {view === "grid" ? (
                        <DroneGrid
                            drones={filteredFleet}
                            loading={loading}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onOpen={handleOpen}
                        />
                    ) : (
                        <DroneTable
                            drones={filteredFleet}
                            loading={loading}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onOpen={handleOpen}
                        />
                    )}
                </motion.div>

            </div>
        </motion.div>
    );
}

export default FleetManagement;