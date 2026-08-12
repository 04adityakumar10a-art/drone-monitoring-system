import { motion } from "motion/react";

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

            <div className="flex h-full items-center justify-center border-l border-white/5 bg-[#0b0b0b]">

                <motion.div

                    initial={{

                        opacity: 0,

                        scale: .9

                    }}

                    animate={{

                        opacity: 1,

                        scale: 1

                    }}

                    className="text-center"

                >

                    <p className="text-lg font-semibold text-gray-300">

                        No Drone Selected

                    </p>

                    <p className="mt-2 text-sm text-gray-500">

                        Select a drone from the fleet.

                    </p>

                </motion.div>

            </div>

        );

    }

    return (

        <aside

            className="
            relative
            h-full
            overflow-y-auto
            border-l
            border-white/5
            bg-gradient-to-b
            from-[#090909]
            via-[#0d0d0d]
            to-[#111111]
            scrollbar-hide
            "

        >

            {/* Ambient Glow */}

            <motion.div

                animate={{

                    opacity: [.05,.12,.05]

                }}

                transition={{

                    repeat:Infinity,

                    duration:5

                }}

                className="pointer-events-none absolute inset-0"

                style={{

                    background:

                    "radial-gradient(circle at top right, rgba(34,211,238,.08), transparent 60%)"

                }}

            />

            <div className="relative space-y-6 p-5">

                {/* CONNECTION */}

                <SectionTitle>

                    Connection

                </SectionTitle>

                <AnimatedBlock delay={0}>

                    <ConnectionStatus

                        drone={drone}

                    />

                </AnimatedBlock>

                {/* TELEMETRY */}

                <SectionTitle>

                    Live Telemetry

                </SectionTitle>

                <AnimatedBlock delay={0.05}>

                    <div className="grid grid-cols-2 gap-4">

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

                </AnimatedBlock>

                {/* NAVIGATION */}

                <SectionTitle>

                    Navigation

                </SectionTitle>

                <AnimatedBlock delay={0.1}>

                    <CompassCard

                        heading={drone.heading}

                    />

                </AnimatedBlock>

                {/* MISSION */}

                <SectionTitle>

                    Mission

                </SectionTitle>

                <AnimatedBlock delay={0.15}>

                    <MissionStatsCard

                        stats={missionStats}

                    />

                </AnimatedBlock>

                {/* ENVIRONMENT */}

                <SectionTitle>

                    Environment

                </SectionTitle>

                <AnimatedBlock delay={0.2}>

                    <WeatherWidget

                        drone={drone}

                    />

                </AnimatedBlock>

                {/* ALERTS */}

                <SectionTitle>

                    Alerts

                </SectionTitle>

                <AnimatedBlock delay={0.25}>

                    <MissionAlerts />

                </AnimatedBlock>

                {/* SIMULATOR */}

                <SectionTitle>

                    Simulator

                </SectionTitle>

                <AnimatedBlock delay={0.3}>

                    <SimulatorPanel

                        selectedDroneId={drone.id}

                    />

                </AnimatedBlock>

            </div>

        </aside>

    );

}

function SectionTitle({

    children

}) {

    return (

        <div>

            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--aerion-primary)]">

                {children}

            </p>

            <motion.div

                animate={{

                    opacity:[.3,.7,.3]

                }}

                transition={{

                    repeat:Infinity,

                    duration:3

                }}

                className="h-px"

                style={{

                    background:

                    "linear-gradient(90deg,#D4AF37,transparent)"

                }}

            />

        </div>

    );

}

function AnimatedBlock({

    children,

    delay

}) {

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

                delay,

                duration:.35

            }}

        >

            {children}

        </motion.div>

    );

}

export default TelemetrySidebar;