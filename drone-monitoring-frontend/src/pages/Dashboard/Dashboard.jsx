import { useEffect, useState } from "react";
import { motion } from "motion/react";

import api from "../../api/axios";
import useTelemetry from "../../hooks/useTelemetry";

import DashboardHero from "./components/DashboardHero";
import KPISection from "./components/KPISection";
import AICommandCenter from "./components/AICommandCenter";
import FleetAnalytics from "./components/FleetAnalytics";
import WeatherCard from "./components/WeatherCard";
import SystemHealthCard from "./components/SystemHealthCard";
import MissionOperationsCard from "./components/MissionOperationsCard";
import ActivityTimeline from "./components/ActivityTimeline";

function Dashboard() {

    const telemetry = useTelemetry();

    const [batteryDistribution, setBatteryDistribution] = useState([]);

    const [stats, setStats] = useState({

        totalDrones: 0,
        availableDrones: 0,
        inFlightDrones: 0,
        maintenanceDrones: 0,
        averageBattery: 0

    });

    useEffect(() => {

        fetchDashboardStats();

        fetchBatteryDistribution();

    }, []);

    async function fetchDashboardStats() {

        try {

            const response = await api.get("/api/dashboard/stats");

            setStats(response.data);

        }

        catch (error) {

            console.error(error);

        }

    }

    async function fetchBatteryDistribution() {

        try {

            const response = await api.get(

                "/api/dashboard/battery-distribution"

            );

            setBatteryDistribution(response.data);

        }

        catch (error) {

            console.error(error);

        }

    }

    return (


        <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            transition={{ duration: .4 }}

            className="
relative
min-h-screen
overflow-hidden
bg-[#050608]
p-8
space-y-8
"

        >
            {/* =========================
    GLOBAL BACKGROUND
========================= */}

            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                {/* Gold Glow */}

                <motion.div

                    animate={{

                        x: [0, 120, 40, 0],
                        y: [0, -60, 30, 0]

                    }}

                    transition={{

                        repeat: Infinity,
                        duration: 24,
                        ease: "linear"

                    }}

                    className="
        absolute
        -left-56
        top-16
        h-[520px]
        w-[520px]
        rounded-full
        bg-[var(--aerion-primary-soft)]
        blur-[160px]
        "

                />

                {/* Cyan Glow */}

                <motion.div

                    animate={{

                        x: [0, -120, -40, 0],
                        y: [0, 80, -30, 0]

                    }}

                    transition={{

                        repeat: Infinity,
                        duration: 30,
                        ease: "linear"

                    }}

                    className="
        absolute
        right-[-220px]
        bottom-[-120px]
        h-[620px]
        w-[620px]
        rounded-full
        bg-cyan-500/10
        blur-[180px]
        "

                />

                {/* Grid */}

                <div

                    className="
        absolute
        inset-0
        opacity-[0.035]
        "

                    style={{

                        backgroundImage: `
                linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
            `,
                        backgroundSize: "48px 48px"

                    }}

                />

                {/* Vignette */}

                <div

                    className="
        absolute
        inset-0
        bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,.55))]
        "

                />

            </div>

            <div className="relative z-10 mb-8 space-y-8"> 
            <DashboardHero />

            <KPISection

                stats={stats}

            />
            {/* ============================
                    MAIN GRID
            ============================= */}

            <div

                className="
                grid
                grid-cols-12
                gap-8
                "

            >

                {/* ================= LEFT COLUMN ================= */}

                <div

                    className="
                    col-span-12
                    xl:col-span-8
                    space-y-8
                    "

                >

                    <AICommandCenter

                        stats={stats}

                        batteryDistribution={batteryDistribution}

                        telemetry={telemetry}

                    />

                    <FleetAnalytics

                        batteryDistribution={batteryDistribution}

                    />

                    <MissionOperationsCard />

                </div>

                {/* ================= RIGHT COLUMN ================= */}

                <div

                    className="
                    col-span-12
                    xl:col-span-4
                    space-y-8
                    "

                >

                    <WeatherCard />

                    <SystemHealthCard

                        telemetry={telemetry}

                    />

                    <ActivityTimeline />

                </div>

            </div>

            </div>

        </motion.div>

    );

}

export default Dashboard;