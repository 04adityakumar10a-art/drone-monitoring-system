import {
    Activity,
    BatteryWarning,
    CheckCircle2,
    Radio,
    PlaneTakeoff
} from "lucide-react";

import { motion } from "framer-motion";

function LiveAlerts() {

    const alerts = [

        {
            time: "14:31",
            title: "Fleet Connected",
            description: "All telemetry streams operational.",
            icon: Radio,
            color: "text-green-500"
        },

        {
            time: "14:27",
            title: "Low Battery",
            description: "Drone-04 battery dropped below 20%.",
            icon: BatteryWarning,
            color: "text-yellow-500"
        },

        {
            time: "14:21",
            title: "Mission Started",
            description: "Drone-02 entered autonomous mission.",
            icon: PlaneTakeoff,
            color: "text-[#D4AF37]"
        },

        {
            time: "14:17",
            title: "System Healthy",
            description: "No critical fleet alerts detected.",
            icon: CheckCircle2,
            color: "text-green-500"
        }

    ];

    return (

        <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            className="rounded-3xl border border-[#262626] bg-[#111111] p-8"

        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.35em] text-gray-500">

                        Mission Feed

                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white">

                        Live Events

                    </h2>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10">

                    <Activity
                        size={28}
                        className="text-[#D4AF37]"
                    />

                </div>

            </div>

            {/* Timeline */}

            <div className="mt-8 space-y-6">

                {

                    alerts.map((alert, index) => {

                        const Icon = alert.icon;

                        return (

                            <div

                                key={index}

                                className="relative pl-8"

                            >

                                {/* Vertical Line */}

                                {

                                    index !== alerts.length - 1 && (

                                        <div className="absolute left-[10px] top-7 h-full w-px bg-[#262626]" />

                                    )

                                }

                                {/* Dot */}

                                <div className={`absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#111111] ${alert.color}`}>

                                    <div className="h-2.5 w-2.5 rounded-full bg-current" />

                                </div>

                                <div className="rounded-2xl border border-[#222] bg-[#0D0D0D] p-4 transition-all hover:border-[#D4AF37]">

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <Icon

                                                size={20}

                                                className={alert.color}

                                            />

                                            <h3 className="font-semibold text-white">

                                                {alert.title}

                                            </h3>

                                        </div>

                                        <span className="text-xs text-gray-500">

                                            {alert.time}

                                        </span>

                                    </div>

                                    <p className="mt-2 text-sm text-gray-400">

                                        {alert.description}

                                    </p>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </motion.div>

    );

}

export default LiveAlerts;