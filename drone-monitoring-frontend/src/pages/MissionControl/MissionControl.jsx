import { useEffect, useMemo, useState } from "react";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
import api from "../../api/axios";

import useTelemetry from "../../hooks/useTelemetry";
import useReplay from "../../hooks/useReplay";

import MissionControlLayout from "../../layouts/MissionControlLayout";

import MissionToolbar from "./components/MissionToolbar";
import FleetHeader from "./components/FleetHeader";
import FleetStrip from "./components/FleetStrip";
import MissionMap from "./components/MissionMap";
import TelemetrySidebar from "./components/TelemetrySidebar";
import ReplayTimeline from "./components/ReplayTimeline";
import ReplayButton from "./components/ReplayButton";
import MissionStatsOverlay from "./components/MissionStatsOverlay";

function MissionControl() {

    /*
    =====================================
            STATE
    =====================================
    */

    const [drones, setDrones] = useState([]);

    const [selectedDrone, setSelectedDrone] = useState(null);

    const [history, setHistory] = useState([]);

    const [fleetCollapsed, setFleetCollapsed] = useState(false);

    const [showReplay, setShowReplay] = useState(false);

    const { toggleSidebar } = useSidebar();

    /*
    =====================================
            LIVE TELEMETRY
    =====================================
    */

    const telemetryMap = useTelemetry();

    /*
    =====================================
            LOAD DRONES
    =====================================
    */

    useEffect(() => {

        fetchDrones();

    }, []);

    async function fetchDrones() {

        try {

            const response = await api.get(
                "/api/drones?size=100"
            );

            const droneList = response.data.content;

            setDrones(droneList);

            if (droneList.length > 0) {

                setSelectedDrone(droneList[0]);

            }

        }

        catch (error) {

            console.error(error);

        }

    }

    /*
    =====================================
        LOAD TELEMETRY HISTORY
    =====================================
    */

    useEffect(() => {

        if (!selectedDrone?.id) return;

        fetchTelemetryHistory();

    }, [selectedDrone]);

    async function fetchTelemetryHistory() {

        try {

            const response = await api.get(

                `/api/telemetry/history/${selectedDrone.id}?page=0&size=500`

            );

            setHistory(response.data.content);

        }

        catch (error) {

            console.error(error);

        }

    }

    /*
    =====================================
        LIVE DRONES
    =====================================
    */

    const liveDrones = drones.map(drone => {

        const telemetry = telemetryMap[drone.id];

        return {

            ...drone,

            battery: telemetry?.batteryLevel ?? drone.batteryLevel,

            altitude: telemetry?.altitude ?? 0,

            speed: telemetry?.speed ?? 0,

            signal: telemetry?.signalStrength ?? 0,

            lat: telemetry?.latitude ?? 22.7196,

            lng: telemetry?.longitude ?? 75.8577,

            heading: telemetry?.heading ?? 0,

            status: telemetry?.status ?? drone.status

        };

    });

    /*
    =====================================
        ACTIVE DRONE
    =====================================
    */

    const activeDrone = liveDrones.find(

        d => d.id === selectedDrone?.id

    );

    /*
    =====================================
            REPLAY
    =====================================
    */

    const {

        telemetry: replayTelemetry,

        playing,

        play,

        pause,

        stop,

        seek,

        skipForward,

        skipBackward,

        speed,

        setSpeed,

        currentIndex,

        totalFrames

    } = useReplay(history);

    /*
    =====================================
        DISPLAY DRONE
    =====================================
    */

    const displayDrone = useMemo(() => {

        if (!activeDrone) return null;

        if (!playing || !replayTelemetry) {

            return activeDrone;

        }

        return {

            ...activeDrone,

            battery: replayTelemetry.batteryLevel,

            altitude: replayTelemetry.altitude,

            speed: replayTelemetry.speed,

            signal: replayTelemetry.signalStrength,

            heading: replayTelemetry.heading,

            lat: replayTelemetry.latitude,

            lng: replayTelemetry.longitude

        };

    }, [

        activeDrone,

        replayTelemetry,

        playing

    ]);

    /*
    =====================================
        REPLAY TRAIL
    =====================================
    */

    const replayTrail = useMemo(() => {

        if (!playing) return [];

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

    const mapDrones = liveDrones.map(drone =>

        drone.id === displayDrone?.id

            ? displayDrone

            : drone

    );

    /*
    =====================================
        MISSION STATS
    =====================================
    */

    const missionStats = useMemo(() => {

        if (history.length === 0) {

            return {

                flightTime: 0,

                maxAltitude: 0,

                maxSpeed: 0,

                distance: 0

            };

        }

        let distance = 0;

        for (let i = 1; i < history.length; i++) {

            const dx =
                history[i].latitude -
                history[i - 1].latitude;

            const dy =
                history[i].longitude -
                history[i - 1].longitude;

            distance += Math.sqrt(dx * dx + dy * dy);

        }

        return {

            flightTime: history.length,

            maxAltitude: Math.max(

                ...history.map(h => h.altitude || 0)

            ),

            maxSpeed: Math.max(

                ...history.map(h => h.speed || 0)

            ),

            distance

        };

    }, [history]);

    /*
    =====================================
            LAYOUT
    =====================================
    */

    return (

        <MissionControlLayout>

            <div className="flex h-screen flex-col bg-[#090909]">

                <MissionToolbar

                    selectedDrone={displayDrone}

                />

                <FleetHeader

                    drones={liveDrones}

                    selectedDrone={displayDrone}

                    collapsed={fleetCollapsed}

                    onToggle={() =>
                        setFleetCollapsed(!fleetCollapsed)
                    }

                />

                {!fleetCollapsed && (

                    <FleetStrip

                        drones={liveDrones}

                        selectedDrone={selectedDrone}

                        onSelectDrone={setSelectedDrone}

                    />

                )}

                <div className="relative flex flex-1 min-h-0 overflow-hidden">

                    {/* ===========================
                            MAP
                    ============================ */}

                    <div className="relative flex-1 min-h-0">

                        <MissionMap

                            drones={mapDrones}

                            selectedDrone={displayDrone}

                            setSelectedDrone={setSelectedDrone}

                            replayTrail={replayTrail}

                        />

                        <MissionStatsOverlay

                            stats={missionStats}

                        />

                        <ReplayButton

                            showReplay={showReplay}

                            setShowReplay={setShowReplay}

                        />

                    </div>

                    {/* ===========================
                        TELEMETRY SIDEBAR
                    ============================ */}

                    <div className="w-[380px] border-l border-[#232323] bg-[#0c0c0c]">

                        <TelemetrySidebar

                            drone={displayDrone}

                            missionStats={missionStats}

                        />

                    </div>

                </div>

                {/* ===========================
                        REPLAY TIMELINE
                ============================ */}

                {

                    showReplay && (

                        <ReplayTimeline

                            playing={playing}

                            play={play}

                            pause={pause}

                            stop={stop}

                            speed={speed}

                            setSpeed={setSpeed}

                            currentIndex={currentIndex}

                            totalFrames={totalFrames}

                            seek={seek}

                            skipForward={skipForward}

                            skipBackward={skipBackward}

                        />

                    )

                }

            </div>

        </MissionControlLayout>

    );

}

export default MissionControl;