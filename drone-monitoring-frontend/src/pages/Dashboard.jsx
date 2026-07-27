import { useEffect, useState } from "react";

import api from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardStats from "../components/DashboardStats";

import StatusPieChart from "../components/charts/StatusPieChart";
import BatteryDistributionChart from "../components/charts/BatteryDistributionChart";

function Dashboard() {

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

        <DashboardLayout>

            <DashboardStats stats={stats} />

            <div className="grid lg:grid-cols-2 gap-6">

                <StatusPieChart
                    stats={stats}
                />

                <BatteryDistributionChart
                    data={batteryDistribution}
                />

            </div>

        </DashboardLayout>

    );

}

export default Dashboard;