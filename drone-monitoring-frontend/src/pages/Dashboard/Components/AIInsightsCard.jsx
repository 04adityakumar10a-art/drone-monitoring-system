import { motion } from "motion/react";
import {
    BrainCircuit,
    ChevronRight,
    BatteryWarning,
    Wind,
    ShieldCheck,
    Radar
} from "lucide-react";

const insights = [

    {
        id: 1,
        title: "Fleet Health",
        description: "All operational drones are performing within expected parameters.",
        icon: ShieldCheck,
        color: "#22C55E"
    },

    {
        id: 2,
        title: "Wind Advisory",
        description: "Crosswind expected to increase over the next 20 minutes.",
        icon: Wind,
        color: "#38BDF8"
    },

    {
        id: 3,
        title: "Battery Intelligence",
        description: "Drone REACT-007 is showing faster-than-normal battery degradation.",
        icon: BatteryWarning,
        color: "#F59E0B"
    },

    {
        id: 4,
        title: "Mission Optimization",
        description: "Three idle drones are available for automatic task reassignment.",
        icon: Radar,
        color: "#D4AF37"
    }

];

function AIInsightsCard() {

    return (

        <motion.section

            initial={{

                opacity:0,
                y:30

            }}

            animate={{

                opacity:1,
                y:0

            }}

            transition={{

                duration:.6

            }}

            whileHover={{

                y:-5

            }}

            className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-[#0B0B0B]
            p-7
            shadow-[0_0_50px_rgba(212,175,55,.05)]
            "

        >

            <div

                className="
                absolute
                right-[-80px]
                top-[-80px]
                h-72
                w-72
                rounded-full
                bg-[var(--aerion-primary-soft)]
                blur-[130px]
                "

            />

            <div className="relative z-10">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <div

                            className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-[var(--aerion-primary-soft)]
                            text-[var(--aerion-primary)]
                            "

                        >

                            <BrainCircuit size={28}/>

                        </div>

                        <div>

                            <p className="text-xs uppercase tracking-[0.35em] text-[var(--aerion-primary)]">

                                AI COPILOT

                            </p>

                            <h2 className="mt-1 text-2xl font-semibold text-white">

                                Operational Insights

                            </h2>

                        </div>

                    </div>

                    <motion.button

                        whileHover={{

                            x:4

                        }}

                        className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-4
                        py-2
                        text-sm
                        text-gray-300
                        "

                    >

                        View Report

                        <ChevronRight size={16}/>

                    </motion.button>

                </div>

                <div className="mt-8 space-y-4">

                    {

                        insights.map((item,index)=>{

                            const Icon=item.icon;

                            return(

                                <motion.div

                                    key={item.id}

                                    initial={{

                                        opacity:0,
                                        x:-20

                                    }}

                                    animate={{

                                        opacity:1,
                                        x:0

                                    }}

                                    transition={{

                                        delay:.2+(index*.12)

                                    }}

                                    whileHover={{

                                        x:8

                                    }}

                                    className="
                                    flex
                                    items-start
                                    gap-4
                                    rounded-2xl
                                    border
                                    border-white/5
                                    bg-white/[0.03]
                                    p-5
                                    transition-all
                                    hover:border-[#D4AF37]/20
                                    "

                                >

                                    <div

                                        className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        "

                                        style={{

                                            background:`${item.color}15`

                                        }}

                                    >

                                        <Icon

                                            size={22}

                                            style={{

                                                color:item.color

                                            }}

                                        />

                                    </div>

                                    <div className="flex-1">

                                        <h3 className="font-semibold text-white">

                                            {item.title}

                                        </h3>

                                        <p className="mt-1 text-sm leading-7 text-gray-400">

                                            {item.description}

                                        </p>

                                    </div>

                                </motion.div>

                            );

                        })

                    }

                </div>

            </div>

        </motion.section>

    );

}

export default AIInsightsCard;