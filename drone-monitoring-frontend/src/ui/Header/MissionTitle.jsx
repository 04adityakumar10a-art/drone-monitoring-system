import { Plane } from "lucide-react";
import { motion } from "motion/react";

function MissionTitle() {

    return (

        <div className="flex items-center gap-4">

            <motion.div

                animate={{

                    y: [0, -2, 0]

                }}

                transition={{

                    repeat: Infinity,

                    duration: 3

                }}

                className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3"

            >

                <Plane

                    size={24}

                    className="text-cyan-400"

                />

            </motion.div>

            <div>

                <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--aerion-primary)]">

                    AERION

                </p>

                <h1 className="text-2xl font-bold tracking-wide">

                    Mission Control

                </h1>

                <p className="text-xs text-gray-500">

                    Ground Control Station

                </p>

            </div>

        </div>

    );

}

export default MissionTitle;