import {
    FileSpreadsheet,
    FileText,
    FileDown
} from "lucide-react";

import api from "../../../api/axios";

async function downloadReport(url, filename) {

    try {

        const response = await api.get(url, {

            responseType: "blob"

        });

        const blob = new Blob([response.data]);

        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = downloadUrl;

        link.download = filename;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(downloadUrl);

    } catch (error) {

        console.error(error);

        alert("Failed to download report.");

    }

}

function Card({ title, subtitle, icon, onClick }) {

    return (

        <button
            onClick={onClick}
            className="group w-full rounded-3xl border border-[#232323] bg-[#101010] p-6 text-left transition-all duration-300 hover:border-[#D4AF37]/30 hover:shadow-[0_0_35px_rgba(212,175,55,0.08)]"
        >

            <div className="flex items-center justify-between">

                <div>

                    <h3 className="text-lg font-semibold text-white">

                        {title}

                    </h3>

                    <p className="mt-2 text-sm text-gray-400">

                        {subtitle}

                    </p>

                </div>

                <div className="rounded-2xl bg-[#171717] p-4 text-[#D4AF37]">

                    {icon}

                </div>

            </div>

        </button>

    );

}

function ExportCards() {

    return (

        <div className="grid gap-6 md:grid-cols-3">

            <Card

                title="Export CSV"

                subtitle="Download fleet report as CSV"

                icon={<FileSpreadsheet size={28} />}

                onClick={() =>
                    downloadReport(
                        "/api/reports/fleet/csv",
                        "fleet_report.csv"
                    )
                }

            />

            <Card

                title="Export Excel"

                subtitle="Coming Soon"

                icon={<FileDown size={28} />}

                onClick={() =>
                    alert("Excel export will be added next.")
                }

            />

            <Card

                title="Export PDF"

                subtitle="Coming Soon"

                icon={<FileText size={28} />}

                onClick={() =>
                    alert("PDF export will be added next.")
                }

            />

        </div>

    );

}

export default ExportCards;