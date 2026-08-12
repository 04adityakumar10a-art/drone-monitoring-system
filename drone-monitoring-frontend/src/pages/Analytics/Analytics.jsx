import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";

import TopPerformingDrones from "./components/TopPerformingDrones";
import RecentActivity from "./components/RecentActivity";

import AnalyticsHeader from "./components/AnalyticsHeader";
import AnalyticsCards from "./components/AnalyticsCards";
import BatteryChart from "./components/BatteryChart";
import AltitudeChart from "./components/AltitudeChart";
import MissionChart from "./components/MissionChart";
import FleetHealthChart from "./components/FleetHealthChart";


const sectionVariants = {
    hidden: {
        opacity: 0,
        y: 18
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};


function Analytics() {

    const [drones, setDrones] = useState([]);

    useEffect(() => {

        load();

    }, []);


    async function load() {

        try {

            const res =
                await api.get(
                    "/api/drones?page=0&size=100"
                );

            setDrones(
                Array.isArray(res.data)
                    ? res.data
                    : res.data.content ?? []
            );

        } catch (err) {

            console.error(
                "Failed to load analytics data:",
                err
            );

        }

    }


    return (

        <motion.div
            initial="hidden"
            animate="visible"
            className="
                relative
                space-y-6
                pb-8
            "
        >

            {/* =====================================================
                PAGE AMBIENT LIGHT
            ===================================================== */}

            <div
                className="
                    pointer-events-none
                    fixed
                    left-[35%]
                    top-[18%]
                    -z-10
                    h-[420px]
                    w-[420px]
                    rounded-full
                    bg-[#D4AF37]/[0.035]
                    blur-[140px]
                "
            />

            <div
                className="
                    pointer-events-none
                    fixed
                    right-[5%]
                    bottom-[5%]
                    -z-10
                    h-[360px]
                    w-[360px]
                    rounded-full
                    bg-cyan-500/[0.025]
                    blur-[130px]
                "
            />


            {/* =====================================================
                HEADER
            ===================================================== */}

            <motion.section
                variants={sectionVariants}
            >

                <AnalyticsHeader />

            </motion.section>


            {/* =====================================================
                KPI CARDS
            ===================================================== */}

            <motion.section
                variants={sectionVariants}
            >

                <AnalyticsCards
                    drones={drones}
                />

            </motion.section>


            {/* =====================================================
                PRIMARY ANALYTICS
            ===================================================== */}

            <motion.section
                variants={sectionVariants}
                className="
                    grid
                    gap-6
                    lg:grid-cols-2
                "
            >

                <BatteryChart
                    drones={drones}
                />

                <AltitudeChart
                    drones={drones}
                />

            </motion.section>


            {/* =====================================================
                SECONDARY ANALYTICS
            ===================================================== */}

            <motion.section
                variants={sectionVariants}
                className="
                    grid
                    gap-6
                    lg:grid-cols-2
                "
            >

                <MissionChart
                    drones={drones}
                />

                <FleetHealthChart
                    drones={drones}
                />

            </motion.section>


            {/* =====================================================
                OPERATIONS
            ===================================================== */}

            <motion.section
                variants={sectionVariants}
                className="
                    grid
                    gap-6
                    xl:grid-cols-2
                "
            >

                <TopPerformingDrones
                    drones={drones}
                />

                <RecentActivity
                    drones={drones}
                />

            </motion.section>

        </motion.div>

    );

}

export default Analytics;