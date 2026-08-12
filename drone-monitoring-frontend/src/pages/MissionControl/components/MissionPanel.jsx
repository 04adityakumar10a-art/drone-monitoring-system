import { motion } from "motion/react";

import MissionStatsCard from "./MissionStatsCard";
import WeatherWidget from "./WeatherWidget";
import MissionAlerts from "./MissionAlerts";
import SimulatorPanel from "./SimulatorPanel";

function MissionPanel({

    drone,

    missionStats

}) {

    if (!drone) {

        return (

            <div className="flex h-full items-center justify-center">

                <p className="text-gray-500">

                    No Mission Selected

                </p>

            </div>

        );

    }

    return (

        <motion.div

            initial={{

                opacity:0,

                x:20

            }}

            animate={{

                opacity:1,

                x:0

            }}

            transition={{

                duration:.35

            }}

            className="
            h-full
            overflow-y-auto
            bg-[#0B0B0B]
            p-5
            space-y-5
            scrollbar-hide
            "

        >

            <MissionStatsCard

                stats={missionStats}

            />

            <WeatherWidget

                drone={drone}

            />

            <MissionAlerts />

            <SimulatorPanel

                selectedDroneId={drone.id}

            />

        </motion.div>

    );

}

export default MissionPanel;