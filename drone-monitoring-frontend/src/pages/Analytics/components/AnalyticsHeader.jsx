import {
    Activity,
    BarChart3,
    Clock3
} from "lucide-react";

function AnalyticsHeader() {

    return (

        <div className="relative overflow-hidden rounded-3xl border border-[#232323] bg-[#101010] p-8">

            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--aerion-primary-soft)] blur-3xl" />

            <div className="relative flex items-center justify-between">

                <div className="flex items-center gap-5">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#171717]">

                        <BarChart3
                            size={34}
                            className="text-[var(--aerion-primary)]"
                        />

                    </div>

                    <div>

                        <p className="text-xs uppercase tracking-[0.35em] text-[var(--aerion-primary)]">

                            Drone Operations

                        </p>

                        <h1 className="mt-2 text-4xl font-black text-white">

                            Fleet Analytics

                        </h1>

                        <p className="mt-2 max-w-xl text-gray-400">

                            Monitor fleet performance, battery health,
                            altitude trends and operational status in
                            real time.

                        </p>

                    </div>

                </div>

                <div className="hidden xl:flex gap-5">

                    <div className="rounded-2xl border border-[#232323] bg-[#171717] px-5 py-4">

                        <div className="flex items-center gap-2 text-[var(--aerion-primary)]">

                            <Activity size={16} />

                            <span className="text-xs uppercase tracking-[0.2em]">

                                LIVE

                            </span>

                        </div>

                        <p className="mt-2 font-semibold text-white">

                            Real-Time Monitoring

                        </p>

                    </div>

                    <div className="rounded-2xl border border-[#232323] bg-[#171717] px-5 py-4">

                        <div className="flex items-center gap-2 text-[var(--aerion-primary)]">

                            <Clock3 size={16} />

                            <span className="text-xs uppercase tracking-[0.2em]">

                                STATUS

                            </span>

                        </div>

                        <p className="mt-2 font-semibold text-white">

                            Fleet Healthy

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AnalyticsHeader;