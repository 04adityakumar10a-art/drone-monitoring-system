import { useEffect, useMemo, useState } from "react";

import api from "../api/axios";

import useTelemetry from "../hooks/useTelemetry";
import useReplay from "../hooks/useReplay";
import MiniFleetPanel from "./components/MiniFleetPanel";

import MissionHeader from "../components/mission/MissionHeader";
import FleetSidebar from "../components/mission/FleetSidebar";
import LiveDroneMap from "../components/mission/LiveDroneMap";
import TelemetryCard from "../components/mission/AircraftPanel";
import LiveCharts from "../components/mission/LiveCharts";
import SimulatorControls from "../components/mission/SimulatorControls";
import ReplayControls from "../components/mission/ReplayControls";
import TelemetryHistory from "../components/mission/TelemetryHistory";

function MissionControl() {

    const telemetry = useTelemetry();

    const [history, setHistory] = useState([]);

    const [drones, setDrones] = useState([]);

    const [selectedDroneId, setSelectedDroneId] = useState(null);

    /*
    ===========================================
                LOAD DRONES
    ===========================================
    */

    useEffect(() => {

        fetchDrones();

    }, []);

    async function fetchDrones() {

        try {

            const response = await api.get(
                "/api/drones?size=100"
            );

            const droneList = response.data.content.sort(
                (a, b) => a.id - b.id
            );

            setDrones(droneList);

            if (
                droneList.length > 0 &&
                selectedDroneId == null
            ) {

                setSelectedDroneId(droneList[0].id);

            }

        }

        catch (error) {

            console.log(error);

        }

    }

    /*
    ===========================================
            LOAD HISTORY
    ===========================================
    */

    useEffect(() => {

        if (!selectedDroneId) return;

        fetchTelemetryHistory();

    }, [selectedDroneId]);

    async function fetchTelemetryHistory() {

        try {

            const response = await api.get(
                `/api/telemetry/history/${selectedDroneId}?page=0&size=500`
            );

            setHistory(response.data.content);

        }

        catch (error) {

            console.log(error);

        }

    }

    /*
    ===========================================
            LIVE TELEMETRY
    ===========================================
    */

    const activeTelemetry =
        selectedDroneId != null
            ? telemetry[selectedDroneId] ?? null
            : null;

    /*
    ===========================================
                REPLAY
    ===========================================
    */

    const {

        telemetry: replayTelemetry,

        playing,

        play,

        pause,

        stop,

        speed,

        setSpeed,

        currentIndex

    } = useReplay(history);

    /*
    ===========================================
        DISPLAY TELEMETRY
    ===========================================
    */

    const displayTelemetry =
        playing
            ? replayTelemetry
            : activeTelemetry;

    /*
    ===========================================
            REPLAY TRAIL
    ===========================================
    */

    const replayTrail = useMemo(() => {

        if (!playing) {

            return [];

        }

        return history
            .slice(
                0,
                currentIndex + 1
            )
            .map(item => [
                item.latitude,
                item.longitude
            ]);

    }, [

        history,

        currentIndex,

        playing

    ]);

    /*
    ===========================================
            SELECTED DRONE
    ===========================================
    */

    const selectedDrone =
        drones.find(
            drone =>
                drone.id === selectedDroneId
        );

    return (

        <DashboardLayout>

            <MissionHeader

                activeDrone={selectedDrone}

                telemetry={displayTelemetry}

                totalDrones={drones.length}

                live={!playing}

            />

            <MiniFleetPanel

                drones={liveDrones}

                selectedDrone={activeDrone}

                onSelectDrone={setSelectedDrone}

            />

            <div className="mt-8 grid grid-cols-12 gap-6">

                {/* Fleet Sidebar */}

                <div className="col-span-12 xl:col-span-2">

                    <FleetSidebar

                        drones={drones}

                        telemetryMap={telemetry}

                        selectedDroneId={selectedDroneId}

                        onSelect={setSelectedDroneId}

                    />

                </div>

                {/* Live Map + Charts */}

                <div className="col-span-12 xl:col-span-7 space-y-6">

                    <LiveDroneMap

                        telemetryMap={
                            playing
                                ? {
                                    [selectedDroneId]:
                                        displayTelemetry
                                }
                                : telemetry
                        }

                        selectedDroneId={selectedDroneId}

                        onSelectDrone={setSelectedDroneId}

                        replayTrail={replayTrail}

                    />

                    <LiveCharts

                        telemetry={displayTelemetry}

                    />

                </div>

                {/* Aircraft Panel */}

                <div className="col-span-12 xl:col-span-3 space-y-6">

                    <TelemetryCard

                        telemetry={displayTelemetry}

                        drone={selectedDrone}

                    />

                    <SimulatorControls

                        selectedDroneId={selectedDroneId}

                    />

                    <ReplayControls

                        play={play}

                        pause={pause}

                        stop={stop}

                        playing={playing}

                        speed={speed}

                        setSpeed={setSpeed}

                    />

                </div>

            </div>

            <div className="mt-8">

                <TelemetryHistory

                    droneId={selectedDroneId}

                    history={history}

                />

            </div>

        </DashboardLayout>

    );

}

export default MissionControl;