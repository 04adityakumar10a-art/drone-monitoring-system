import clsx from "clsx";
import { motion } from "motion/react";
import { theme } from "../../design";

function GlassPanel({

    children,

    className = "",

    hover = true,

    glow = false

}) {

    return (

        <motion.div

            whileHover={

                hover

                    ? {

                        y: -4,

                        scale: 1.01

                    }

                    : {}

            }

            transition={{

                duration: 0.25

            }}

            className={clsx(

                theme.panel,

                glow && "hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]",

                className

            )}

        >

            {children}

        </motion.div>

    );

}

export default GlassPanel;