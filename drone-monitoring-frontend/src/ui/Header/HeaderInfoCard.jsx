import { motion } from "motion/react";
import GlassPanel from "../Panel/GlassPanel";

function HeaderInfoCard({

    title,

    value

}) {

    return (

        <motion.div

            whileHover={{

                y: -3

            }}

        >

            <GlassPanel

                hover={false}

                className="px-5 py-3 min-w-[150px]"

            >

                <p className="text-[10px] uppercase tracking-[0.22em] text-gray-500">

                    {title}

                </p>

                <h3 className="mt-2 text-sm font-semibold">

                    {value}

                </h3>

            </GlassPanel>

        </motion.div>

    );

}

export default HeaderInfoCard;