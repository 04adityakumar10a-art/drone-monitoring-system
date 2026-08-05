import {
    BarChart3,
    Plane,
    BatteryCharging,
    Wrench,
    ArrowRight
} from "lucide-react";

function TemplateCard({
    title,
    description,
    icon,
    items
}) {

    return (

        <div className="group rounded-3xl border border-[#232323] bg-[#101010] p-6 transition-all duration-300 hover:border-[#D4AF37]/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.08)]">

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#171717] p-4 text-[#D4AF37]">

                        {icon}

                    </div>

                    <div>

                        <h2 className="text-xl font-bold text-white">

                            {title}

                        </h2>

                        <p className="mt-1 text-sm text-gray-400">

                            {description}

                        </p>

                    </div>

                </div>

            </div>

            <div className="mt-6 space-y-3">

                {items.map((item) => (

                    <div
                        key={item}
                        className="flex items-center gap-3 text-gray-300"
                    >

                        <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />

                        <span>{item}</span>

                    </div>

                ))}

            </div>

            <button
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-3 font-semibold text-black transition hover:brightness-110"
            >

                Generate Report

                <ArrowRight size={18} />

            </button>

        </div>

    );

}

function ReportTemplates() {

    return (

        <div>

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-white">

                    Report Templates

                </h2>

                <p className="mt-2 text-gray-400">

                    Select a report type to generate and export.

                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <TemplateCard

                    title="Fleet Summary"

                    description="Complete operational overview"

                    icon={<BarChart3 size={28} />}

                    items={[
                        "Fleet Status",
                        "Battery Summary",
                        "Signal Quality",
                        "Overall Health"
                    ]}

                />

                <TemplateCard

                    title="Mission Report"

                    description="Flight history and missions"

                    icon={<Plane size={28} />}

                    items={[
                        "Mission Timeline",
                        "Flight Duration",
                        "Distance",
                        "Mission Success"
                    ]}

                />

                <TemplateCard

                    title="Battery Health"

                    description="Power usage analytics"

                    icon={<BatteryCharging size={28} />}

                    items={[
                        "Battery Levels",
                        "Charging History",
                        "Low Battery Alerts",
                        "Battery Trends"
                    ]}

                />

                <TemplateCard

                    title="Maintenance"

                    description="Maintenance records"

                    icon={<Wrench size={28} />}

                    items={[
                        "Service History",
                        "Fault Reports",
                        "Recommendations",
                        "Maintenance Status"
                    ]}

                />

            </div>

        </div>

    );

}

export default ReportTemplates;