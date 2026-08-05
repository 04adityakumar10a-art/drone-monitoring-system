import BatteryGauge from "./BatteryGauge";
import AltitudeGauge from "./AltitudeGauge";
import SpeedGauge from "./SpeedGauge";
import SignalGauge from "./SignalGauge";

import WeatherWidget from "./WeatherWidget";
import MissionAlerts from "./MissionAlerts";
import ConnectionStatus from "./ConnectionStatus";
import SimulatorPanel from "./SimulatorPanel";

import CompassCard from "./CompassCard";
import MissionStatsCard from "./MissionStatsCard";

function TelemetrySidebar({

    drone,

    missionStats

}) {

    if (!drone) {

        return (

            <div className="h-full bg-[#111111] border-l border-[#262626] flex items-center justify-center">

                <p className="text-gray-500 text-sm">

                    Select a Drone

                </p>

            </div>

        );

    }

    return (

        <div className="h-full bg-[#0d0d0d] border-l border-[#262626] overflow-y-auto">

            <div className="p-4 space-y-4">

                {/* CONNECTION */}

                <ConnectionStatus

                    drone={drone}

                />

                {/* LIVE TELEMETRY */}

                <div className="grid grid-cols-2 gap-3">

                    <BatteryGauge

                        value={drone.battery}

                    />

                    <SpeedGauge

                        value={drone.speed}

                    />

                    <AltitudeGauge

                        value={drone.altitude}

                    />

                    <SignalGauge

                        value={drone.signal}

                    />

                </div>

                {/* COMPASS */}

                <CompassCard

                    heading={drone.heading}

                />

                {/* MISSION STATS */}

                <MissionStatsCard

                    stats={missionStats}

                />

                {/* WEATHER */}

                <WeatherWidget

                    drone={drone}

                />

                {/* ALERTS */}

                <MissionAlerts />

                {/* SIMULATOR */}

                <SimulatorPanel

                    selectedDroneId={drone.id}

                />

            </div>

        </div>

    );

}

export default TelemetrySidebar;