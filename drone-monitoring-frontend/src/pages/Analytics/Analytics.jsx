import { useEffect, useState } from "react";
import api from "../../api/axios";

import TopPerformingDrones from "./components/TopPerformingDrones";
import RecentActivity from "./components/RecentActivity";

import AnalyticsHeader from "./components/AnalyticsHeader";
import AnalyticsCards from "./components/AnalyticsCards";
import BatteryChart from "./components/BatteryChart";
import AltitudeChart from "./components/AltitudeChart";
import MissionChart from "./components/MissionChart";
import FleetHealthChart from "./components/FleetHealthChart";

function Analytics() {

    const [drones, setDrones] = useState([]);

    useEffect(() => {

        load();

    }, []);

    async function load() {

        try {

            const res = await api.get("/api/drones?page=0&size=100");

            setDrones(
                Array.isArray(res.data)
                    ? res.data
                    : res.data.content ?? []
            );

        } catch (err) {

            console.error(err);

        }

    }

    return (

        <div className="space-y-6">

            <AnalyticsHeader />

            <AnalyticsCards drones={drones} />

            <div className="grid lg:grid-cols-2 gap-6">

                <BatteryChart drones={drones} />

                <AltitudeChart drones={drones} />

            </div>

            <div className="grid lg:grid-cols-2 gap-6">

                <MissionChart drones={drones} />

                <FleetHealthChart drones={drones} />

            </div>

            <div className="grid gap-6 xl:grid-cols-2">

                <TopPerformingDrones drones={drones} />

                <RecentActivity drones={drones} />

            </div>

        </div>

    );

}

export default Analytics;