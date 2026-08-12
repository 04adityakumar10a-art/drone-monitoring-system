import {
    FileBarChart,
    CalendarDays,
    Download,
} from "lucide-react";

function ReportsHeader() {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-[#232323] bg-[#101010] p-8">

            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--aerion-primary-soft)] blur-3xl" />

            <div className="relative flex items-center justify-between">

                <div className="flex items-center gap-5">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#171717]">

                        <FileBarChart
                            size={34}
                            className="text-[var(--aerion-primary)]"
                        />

                    </div>

                    <div>

                        <p className="text-xs uppercase tracking-[0.35em] text-[var(--aerion-primary)]">

                            Report Center

                        </p>

                        <h1 className="mt-2 text-4xl font-black text-white">

                            Fleet Reports

                        </h1>

                        <p className="mt-2 max-w-2xl text-gray-400">

                            Generate professional fleet reports, mission summaries,
                            battery analytics and operational documents for auditing,
                            compliance and data sharing.

                        </p>

                    </div>

                </div>

                <div className="hidden xl:flex gap-5">

                    <div className="rounded-2xl border border-[#232323] bg-[#171717] px-5 py-4">

                        <div className="flex items-center gap-2 text-[var(--aerion-primary)]">

                            <CalendarDays size={16} />

                            <span className="text-xs uppercase tracking-[0.2em]">

                                TODAY

                            </span>

                        </div>

                        <p className="mt-2 font-semibold text-white">

                            Ready to Generate

                        </p>

                    </div>

                    <div className="rounded-2xl border border-[#232323] bg-[#171717] px-5 py-4">

                        <div className="flex items-center gap-2 text-[var(--aerion-primary)]">

                            <Download size={16} />

                            <span className="text-xs uppercase tracking-[0.2em]">

                                EXPORTS

                            </span>

                        </div>

                        <p className="mt-2 font-semibold text-white">

                            PDF • CSV • Excel

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ReportsHeader;