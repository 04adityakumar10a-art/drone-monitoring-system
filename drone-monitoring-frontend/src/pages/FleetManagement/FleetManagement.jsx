import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";

import FleetHeader from "./components/FleetHeader";
import FleetStats from "./components/FleetStats";
import FleetToolbar from "./components/FleetToolbar";
import DroneGrid from "./components/DroneGrid";
import DroneTable from "./components/DroneTable";
import AddDroneModal from "./components/AddDroneModal";
import EditDroneModal from "./components/EditDroneModal";
import DeleteDialog from "./components/DeleteDialog";
import { useNavigate } from "react-router-dom";


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

    const [showAddModal, setShowAddModal] = useState(false);


    const [sortBy, setSortBy] = useState("name");

    async function loadFleet() {

        try {

            const response = await api.get("/api/drones");

            setDrones(response.data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadFleet();

    }, []);

    const filteredFleet = useMemo(() => {

        let result = drones.filter(/* existing filter logic */);

        switch (sortBy) {

            case "battery":
                result.sort((a, b) => (b.batteryLevel ?? 0) - (a.batteryLevel ?? 0));
                break;

            case "status":
                result.sort((a, b) => (a.status ?? "").localeCompare(b.status ?? ""));
                break;

            case "altitude":
                result.sort((a, b) => (b.altitude ?? 0) - (a.altitude ?? 0));
                break;

            case "signal":
                result.sort((a, b) => (b.signalStrength ?? 0) - (a.signalStrength ?? 0));
                break;

            default:
                result.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
        }

        return result;

    }, [drones, search, statusFilter, sortBy]);

    return (

        <div className="space-y-6">


            <FleetHeader
                total={drones.length}
                onAddDrone={() => setShowAddModal(true)}
                onImportFleet={() => { }}
            />

            <FleetStats

                drones={drones}

            />

            <FleetToolbar
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                view={view}
                setView={setView}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            <AddDroneModal

                open={showAddModal}

                onClose={() => setShowAddModal(false)}

                onSuccess={loadFleet}

            />

            <EditDroneModal

                open={showEditModal}

                drone={selectedDrone}

                onClose={() => setShowEditModal(false)}

                onSuccess={loadFleet}

            />

            <DeleteDialog

                open={showDeleteModal}

                drone={selectedDrone}

                onClose={() => setShowDeleteModal(false)}

                onSuccess={loadFleet}

            />


            {

                view === "grid"

                    ?

                    <DroneGrid

                        drones={filteredFleet}

                        loading={loading}

                        onEdit={(drone) => {

                            setSelectedDrone(drone);

                            setShowEditModal(true);

                        }}

                        onDelete={(drone) => {

                            setSelectedDrone(drone);

                            setShowDeleteModal(true);

                        }}

                        onOpen={(drone) => {

                            navigate(`/mission-control/${drone.id}`);

                        }}

                    />

                    :

                    <DroneTable

                        drones={filteredFleet}

                        loading={loading}

                        onEdit={(drone) => {

                            setSelectedDrone(drone);

                            setShowEditModal(true);

                        }}

                        onDelete={(drone) => {

                            setSelectedDrone(drone);

                            setShowDeleteModal(true);

                        }}

                        onOpen={(drone) => {

                            navigate(`/mission-control/${drone.id}`);

                        }}

                    />



            }

        </div>

    );

}

export default FleetManagement;