import {
    AlertTriangle,
    CheckCircle2,
    ShieldAlert,
    BellRing,
    ChevronRight
} from "lucide-react";

import { motion } from "motion/react";
import GlassPanel from "../../../ui/Panel/GlassPanel";

const alerts = [

    {
        level: "success",
        icon: CheckCircle2,
        title: "Telemetry Stable",
        description: "All telemetry streams are synchronized.",
        color: "#22C55E"
    },

    {
        level: "warning",
        icon: AlertTriangle,
        title: "Moderate Wind",
        description: "Wind speed exceeds optimal flight conditions.",
        color: "#F59E0B"
    },

    {
        level: "danger",
        icon: ShieldAlert,
        title: "Battery Below 25%",
        description: "Immediate landing is recommended.",
        color: "#EF4444"
    }

];

function MissionAlerts() {

    return (

        <GlassPanel

            glow

            className="relative overflow-hidden p-5"

        >

            {/* Ambient Glow */}

            <motion.div

                animate={{

                    opacity:[0.04,0.1,0.04]

                }}

                transition={{

                    repeat:Infinity,

                    duration:5

                }}

                className="absolute inset-0"

                style={{

                    background:
                    "radial-gradient(circle at top right, rgba(239,68,68,.08), transparent 70%)"

                }}

            />

            {/* Header */}

            <div className="relative z-10 flex items-center justify-between">

                <div>

                    <p className="text-[11px] uppercase tracking-[0.28em] text-gray-500">

                        Mission

                    </p>

                    <h3 className="mt-1 text-lg font-semibold">

                        Live Alerts

                    </h3>

                </div>

                <motion.div

                    animate={{

                        rotate:[0,10,0,-10,0]

                    }}

                    transition={{

                        repeat:Infinity,

                        duration:6

                    }}

                >

                    <BellRing

                        size={22}

                        className="text-[var(--aerion-primary)]"

                    />

                </motion.div>

            </div>

            {/* Alert Count */}

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">

                <span className="text-sm text-gray-400">

                    Active Alerts

                </span>

                <span className="text-2xl font-bold text-[var(--aerion-primary)]">

                    {alerts.length}

                </span>

            </div>

            {/* Alerts */}

            <div className="mt-5 space-y-3">

                {

                    alerts.map((item,index)=>{

                        const Icon=item.icon;

                        return(

                            <motion.div

                                key={item.title}

                                initial={{

                                    opacity:0,

                                    x:20

                                }}

                                animate={{

                                    opacity:1,

                                    x:0

                                }}

                                transition={{

                                    delay:index*0.08

                                }}

                                whileHover={{

                                    x:6,

                                    scale:1.02

                                }}

                                className="
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-white/5
                                bg-white/[0.03]
                                p-4
                                "

                            >

                                {/* Left Accent */}

                                <div

                                    className="absolute left-0 top-0 h-full w-1"

                                    style={{

                                        background:item.color

                                    }}

                                />

                                <div className="flex items-start justify-between">

                                    <div className="flex gap-3">

                                        <motion.div

                                            animate={{

                                                scale:

                                                item.level==="danger"

                                                ? [1,1.15,1]

                                                : 1

                                            }}

                                            transition={{

                                                repeat:Infinity,

                                                duration:1.5

                                            }}

                                            style={{

                                                color:item.color

                                            }}

                                        >

                                            <Icon size={20}/>

                                        </motion.div>

                                        <div>

                                            <div className="font-semibold">

                                                {item.title}

                                            </div>

                                            <div className="mt-1 text-xs leading-5 text-gray-500">

                                                {item.description}

                                            </div>

                                        </div>

                                    </div>

                                    <ChevronRight

                                        size={18}

                                        className="text-gray-500"

                                    />

                                </div>

                            </motion.div>

                        );

                    })

                }

            </div>

        </GlassPanel>

    );

}

export default MissionAlerts;