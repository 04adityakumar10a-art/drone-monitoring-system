import { useEffect, useState } from "react";
import api from "../../api/axios";

import ReportsHeader from "./components/ReportsHeader";
import ReportsStats from "./components/ReportsStats";
import ReportTemplates from "./components/ReportTemplates";
import ReportFilters from "./components/ReportFilters";
import RecentReports from "./components/RecentReports";

function Reports() {

    const [fleet, setFleet] = useState([]);

    useEffect(() => {

        load();

    }, []);

    async function load() {

        try {

            const res = await api.get("/api/drones");

            setFleet(

                Array.isArray(res.data)

                    ? res.data

                    : res.data.content ?? []

            );

        }

        catch (err) {

            console.error(err);

            setFleet([]);

        }

    }

    return (

        <div className="space-y-8">

            <ReportsHeader />

            <ReportsStats fleet={fleet} />

            <ReportTemplates />

            <ReportFilters fleet={fleet} />

            <RecentReports />

        </div>

    );

}

export default Reports;