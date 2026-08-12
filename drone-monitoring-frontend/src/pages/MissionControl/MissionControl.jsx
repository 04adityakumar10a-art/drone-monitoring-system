import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import api from "../../api/axios";

import useTelemetry from "../../hooks/useTelemetry";
import useReplay from "../../hooks/useReplay";

import MissionControlLayout from "../../layouts/MissionControlLayout";

import MissionToolbar from "./components/MissionToolbar";
import FleetStrip from "./components/FleetStrip";
import MissionMap from "./components/MissionMap";

import TelemetryPanel from "./components/TelemetryPanel";
import MissionPanel from "./components/MissionPanel";

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

            <div className="flex h-screen flex-col overflow-hidden bg-[#080808]">

                {/* ===========================================
                        TOP TOOLBAR
            ============================================ */}

                <MissionToolbar

                    selectedDrone={displayDrone}

                />

                {/* ===========================================
                        FLEET STRIP
            ============================================ */}

                <AnimatePresence initial={false}>

                    {

                        !fleetCollapsed && (

                            <motion.div

                                initial={{

                                    height: 0,

                                    opacity: 0

                                }}

                                animate={{

                                    height: "auto",

                                    opacity: 1

                                }}

                                exit={{

                                    height: 0,

                                    opacity: 0

                                }}

                                transition={{

                                    duration: .35

                                }}

                                className="overflow-x-hidden overflow-y-visible"

                            >

                                <FleetStrip

                                    drones={liveDrones}

                                    selectedDrone={selectedDrone}

                                    onSelectDrone={setSelectedDrone}

                                />

                            </motion.div>

                        )

                    }

                </AnimatePresence>

                {/* ===========================================
                        MAIN GRID
            ============================================ */}

                <div

                    className="
grid
flex-1
min-h-0

overflow-hidden
grid-cols-[330px_minmax(0,1fr)_380px]
"

                >

                    {/* ===========================================
                        LEFT TELEMETRY
                ============================================ */}

                    <aside
                        className="
    overflow-hidden
    border-r
    border-white/5
    bg-[#0B0B0B]
    w-[330px]
    "
                    >

                        <TelemetryPanel

                            drone={displayDrone}

                        />

                    </aside>

                    {/* ===========================================
                            MAP
                ============================================ */}

                    <main

                        className="
                    relative
                    overflow-hidden
                    "

                    >

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

                    </main>

                    {/* ===========================================
                        RIGHT PANEL
                ============================================ */}

                    <aside
                        className="
    overflow-hidden
    border-l
    border-white/5
    bg-[#0B0B0B]
    w-[380px]
    "
                    >

                        <MissionPanel

                            drone={displayDrone}

                            missionStats={missionStats}

                        />

                    </aside>

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