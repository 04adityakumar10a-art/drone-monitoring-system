import { motion } from "motion/react";
import clsx from "clsx";
import { theme } from "../../design";

function HeaderButton({

    children,

    onClick,

    active = false,

    className = ""

}) {

    return (

        <motion.button

            whileHover={{
                scale: 1.05,
                rotate: active ? 0 : 3
            }}

            whileTap={{
                scale: 0.96
            }}

            transition={{
                duration: 0.2
            }}

            onClick={onClick}

            className={clsx(

                theme.button,

                `
                flex
                h-12
                w-12
                items-center
                justify-center
                text-gray-300
                hover:text-[var(--aerion-primary)]
                hover:border-[#D4AF37]/40
                `,

                active &&

                `
                border-[#D4AF37]/40
                bg-[var(--aerion-primary-soft)]
                text-[var(--aerion-primary)]
                `,

                className

            )}

        >

            {children}

        </motion.button>

    );

}

export default HeaderButton;