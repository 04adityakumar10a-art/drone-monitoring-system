import { motion, animate, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

function AnimatedCounter({

    value = 0,

    decimals = 0,

    prefix = "",

    suffix = "",

    duration = 0.8,

    className = ""

}) {

    const count = useMotionValue(0);

    const rounded = useTransform(

        count,

        (latest) => latest.toFixed(decimals)

    );

    useEffect(() => {

        const controls = animate(

            count,

            value,

            {

                duration,

                ease: "easeOut"

            }

        );

        return () => controls.stop();

    }, [value, duration, count]);

    return (

        <motion.span

            initial={{

                opacity: 0,

                y: 8

            }}

            animate={{

                opacity: 1,

                y: 0

            }}

            transition={{

                duration: 0.25

            }}

            className={className}

        >

            {prefix}

            <motion.span>

                {rounded}

            </motion.span>

            {suffix}

        </motion.span>

    );

}

export default AnimatedCounter;