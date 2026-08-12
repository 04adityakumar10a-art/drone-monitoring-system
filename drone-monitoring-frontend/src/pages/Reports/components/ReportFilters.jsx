import { useState } from "react";
import api from "../../../api/axios";
import {
    FileSpreadsheet,
    FileText,
    FileDown
} from "lucide-react";

function ReportFilters({ fleet }) {

    const [reportType, setReportType] = useState("fleet");

    const [selectedDrone, setSelectedDrone] = useState("all");

    async function download(format) {

        try {

            let url = "";
            let filename = "";

            if (reportType === "fleet") {

                switch (format) {

                    case "csv":
                        url = "/api/reports/fleet/csv";
                        filename = "fleet_report.csv";
                        break;

                    case "excel":
                        url = "/api/reports/fleet/excel";
                        filename = "fleet_report.xlsx";
                        break;

                    case "pdf":
                        url = "/api/reports/fleet/pdf";
                        filename = "fleet_report.pdf";
                        break;

                    default:
                        return;

                }

            }

            else {

                if (selectedDrone === "all") {

                    alert("Please select a drone.");

                    return;

                }

                switch (format) {

                    case "csv":
                        url = `/api/reports/drone/${selectedDrone}/csv`;
                        filename = `drone_${selectedDrone}.csv`;
                        break;

                    case "excel":
                        url = `/api/reports/drone/${selectedDrone}/excel`;
                        filename = `drone_${selectedDrone}.xlsx`;
                        break;

                    case "pdf":
                        url = `/api/reports/drone/${selectedDrone}/pdf`;
                        filename = `drone_${selectedDrone}.pdf`;
                        break;

                    default:
                        return;

                }

            }

            const response = await api.get(

                url,

                {

                    responseType: "blob"

                }

            );

            const blob = new Blob([response.data]);

            const downloadUrl =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = downloadUrl;

            link.download = filename;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(downloadUrl);

        }

        catch (error) {

            console.error(error);

            alert("Failed to download report.");

        }

    }

    return (

        <div className="rounded-3xl border border-[#232323] bg-[#101010] p-8">

            <h2 className="text-2xl font-bold text-white">

                Generate Report

            </h2>

            <p className="mt-2 text-gray-400">

                Generate fleet or drone reports in multiple formats.

            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">

                <div>

                    <label className="text-xs uppercase tracking-[0.25em] text-gray-500">

                        Report Type

                    </label>

                    <div className="mt-5 space-y-4">

                        <label className="flex items-center gap-3 text-white">

                            <input

                                type="radio"

                                checked={reportType === "fleet"}

                                onChange={() =>
                                    setReportType("fleet")
                                }

                            />

                            Fleet Report

                        </label>

                        <label className="flex items-center gap-3 text-white">

                            <input

                                type="radio"

                                checked={reportType === "drone"}

                                onChange={() =>
                                    setReportType("drone")
                                }

                            />

                            Single Drone Report

                        </label>

                    </div>

                </div>

                <div>

                    <label className="text-xs uppercase tracking-[0.25em] text-gray-500">

                        Select Drone

                    </label>

                    <select

                        value={selectedDrone}

                        disabled={reportType === "fleet"}

                        onChange={(e) =>
                            setSelectedDrone(
                                e.target.value
                            )
                        }

                        className="mt-5 w-full rounded-2xl border border-[#2d2d2d] bg-[var(--aerion-elevated)] p-4 text-white"

                    >

                        <option value="all">

                            Select Drone

                        </option>

                        {

                            fleet.map(drone => (

                                <option

                                    key={drone.id}

                                    value={drone.id}

                                >

                                    {drone.model}

                                </option>

                            ))

                        }

                    </select>

                </div>

            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">

                <button

                    onClick={() => download("csv")}

                    className="flex items-center justify-center gap-3 rounded-2xl border border-[#2b2b2b] bg-[#171717] py-5 text-white transition hover:border-[#D4AF37]"

                >

                    <FileSpreadsheet
                        className="text-[var(--aerion-primary)]"
                    />

                    CSV

                </button>

                <button

                    onClick={() => download("excel")}

                    className="flex items-center justify-center gap-3 rounded-2xl border border-[#2b2b2b] bg-[#171717] py-5 text-white transition hover:border-[#D4AF37]"

                >

                    <FileDown
                        className="text-[var(--aerion-primary)]"
                    />

                    Excel

                </button>

                <button

                    onClick={() => download("pdf")}

                    className="flex items-center justify-center gap-3 rounded-2xl border border-[#2b2b2b] bg-[#171717] py-5 text-white transition hover:border-[#D4AF37]"

                >

                    <FileText
                        className="text-[var(--aerion-primary)]"
                    />

                    PDF

                </button>

            </div>

        </div>

    );

}

export default ReportFilters;