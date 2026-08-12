import { motion } from "motion/react";
import { Plane } from "lucide-react";

import ConnectionStatus from "./ConnectionStatus";
import BatteryGauge from "./BatteryGauge";
import SpeedGauge from "./SpeedGauge";
import AltitudeGauge from "./AltitudeGauge";
import SignalGauge from "./SignalGauge";
import CompassCard from "./CompassCard";

function TelemetryPanel({

    drone

}) {

    if (!drone) {

        return (

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col items-center justify-center gap-4 p-5 text-center"
            >

                <div
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-[#F0C24B]/20
                        bg-gradient-to-br
                        from-[#F0C24B]/[0.1]
                        to-[#F0C24B]/[0.02]
                    "
                >
                    <Plane size={24} className="text-[var(--aerion-primary)]" />
                </div>

                <p className="text-sm text-gray-500">

                    Select a Drone

                </p>

            </motion.div>

        );

    }

    return (

        <motion.div

            initial={{

                opacity:0,

                x:-20

            }}

            animate={{

                opacity:1,

                x:0

            }}

            transition={{

                duration:.35

            }}

            className="
            relative
            h-full
            overflow-y-auto
            bg-transparent
            p-5
            scrollbar-hide
            "

        >

            <ConnectionStatus

                drone={drone}

            />

            <div className="mt-5 grid grid-cols-2 gap-4">

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

            <div className="mt-5">

                <CompassCard

                    heading={drone.heading}

                />

            </div>

        </motion.div>

    );

}

export default TelemetryPanel;