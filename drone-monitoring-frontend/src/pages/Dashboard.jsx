import { useEffect, useState } from "react";
import api from "../api/axios";

import useTelemetry from "../hooks/useTelemetry";
import LiveTelemetryPanel from "../components/LiveTelemetryPanel";

import DashboardStats from "../components/DashboardStats";

import FleetHealthCard from "../components/dashboard/FleetHealthCard";
import LiveAlerts from "../components/dashboard/LiveAlerts";
import RecentActivity from "../components/dashboard/RecentActivity";

function Dashboard() {

    const [batteryDistribution, setBatteryDistribution] = useState([]);

    const [stats, setStats] = useState({

        totalDrones: 0,
        availableDrones: 0,
        inFlightDrones: 0,
        maintenanceDrones: 0,
        averageBattery: 0

    });

    const telemetry = useTelemetry();

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

            console.log(error);

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

            console.log(error);

        }

    }

    return (

        <>

            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Left Section */}

                <div className="xl:col-span-2 space-y-6">

                    <FleetHealthCard
                        stats={stats}
                    />

                    <RecentActivity />

                </div>

                {/* Right Section */}

                <div className="space-y-6">

                    <LiveTelemetryPanel
                        telemetry={
                            Object.values(telemetry)[0]
                        }
                    />

                    <LiveAlerts />

                </div>

            </div>

        </>

    );
}

export default Dashboard;