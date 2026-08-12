import {
    ShieldCheck,
    CircleCheckBig,
    TriangleAlert,
    Wifi,
    Activity
} from "lucide-react";

import { motion } from "framer-motion";

function FleetHealthCard({ stats }) {

    const total = stats.totalDrones || 0;
    const healthy = stats.availableDrones || 0;

    const health =
        total === 0
            ? 0
            : Math.round((healthy / total) * 100);

    const radius = 90;
    const circumference = 2 * Math.PI * radius;

    const offset =
        circumference -
        (circumference * health) / 100;

    return (

        <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            className="
                rounded-3xl
                border
                border-[#262626]
                bg-[#111111]
                p-8
                transition-all
                hover:border-[#D4AF37]
            "

        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.35em] text-gray-500">

                        Fleet Analytics

                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white">

                        Fleet Health

                    </h2>

                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[var(--aerion-primary-soft)]">

                    <ShieldCheck
                        size={30}
                        className="text-[var(--aerion-primary)]"
                    />

                </div>

            </div>

            {/* Gauge */}

            <div className="mt-10 flex justify-center">

                <div className="relative">

                    <svg
                        width="230"
                        height="230"
                    >

                        <circle

                            cx="115"

                            cy="115"

                            r={radius}

                            stroke="#222"

                            strokeWidth="12"

                            fill="none"

                        />

                        <motion.circle

                            cx="115"

                            cy="115"

                            r={radius}

                            stroke="#D4AF37"

                            strokeWidth="12"

                            fill="none"

                            strokeLinecap="round"

                            strokeDasharray={circumference}

                            initial={{
                                strokeDashoffset: circumference
                            }}

                            animate={{
                                strokeDashoffset: offset
                            }}

                            transition={{
                                duration: 1.5
                            }}

                            transform="rotate(-90 115 115)"

                        />

                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">

                        <h1 className="text-6xl font-bold text-white">

                            {health}

                        </h1>

                        <span className="text-[var(--aerion-primary)] font-semibold">

                            %

                        </span>

                        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gray-500">

                            Mission Ready

                        </p>

                    </div>

                </div>

            </div>

            {/* Metrics */}

            <div className="mt-10 grid grid-cols-3 gap-5">

                <Metric

                    icon={<CircleCheckBig size={22} />}

                    color="text-green-500"

                    title="Available"

                    value={healthy}

                />

                <Metric

                    icon={<TriangleAlert size={22} />}

                    color="text-yellow-500"

                    title="Alerts"

                    value={stats.lowBatteryDrones}

                />

                <Metric

                    icon={<Wifi size={22} />}

                    color="text-[var(--aerion-primary)]"

                    title="Telemetry"

                    value="ONLINE"

                />

            </div>

            {/* Footer */}

            <div className="mt-8 flex items-center justify-between rounded-2xl border border-[#222] bg-[#0D0D0D] px-5 py-4">

                <div>

                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                        System Integrity

                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-white">

                        Operational

                    </h3>

                </div>

                <div className="flex items-center gap-2 text-[var(--aerion-primary)]">

                    <Activity size={18} />

                    <span className="font-medium">

                        Live

                    </span>

                </div>

            </div>

        </motion.div>

    );

}

function Metric({

    icon,
    color,
    title,
    value

}) {

    return (

        <div className="rounded-2xl border border-[#222] bg-[#0D0D0D] p-5 transition-all hover:border-[#D4AF37]">

            <div className={`${color}`}>

                {icon}

            </div>

            <p className="mt-3 text-sm text-gray-500">

                {title}

            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">

                {value}

            </h3>

        </div>

    );

}

export default FleetHealthCard;