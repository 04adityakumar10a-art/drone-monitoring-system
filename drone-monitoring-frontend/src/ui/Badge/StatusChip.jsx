import { motion } from "motion/react";
import clsx from "clsx";
import {
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Radio,
    Cpu,
    Satellite
} from "lucide-react";

import { theme } from "../../design";

const variants = {

    success: {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        text: "text-emerald-400",
        glow: "shadow-[0_0_25px_rgba(16,185,129,0.18)]",
        icon: CheckCircle2
    },

    warning: {
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        text: "text-amber-400",
        glow: "shadow-[0_0_25px_rgba(245,158,11,0.18)]",
        icon: AlertTriangle
    },

    danger: {
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        text: "text-red-400",
        glow: "shadow-[0_0_25px_rgba(239,68,68,0.18)]",
        icon: XCircle
    },

    live: {
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
        text: "text-cyan-400",
        glow: "shadow-[0_0_25px_rgba(34,211,238,0.18)]",
        icon: Radio
    },

    simulator: {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        text: "text-yellow-300",
        glow: "shadow-[0_0_25px_rgba(250,204,21,0.18)]",
        icon: Cpu
    },

    real: {
        bg: "bg-sky-500/10",
        border: "border-sky-500/20",
        text: "text-sky-400",
        glow: "shadow-[0_0_25px_rgba(14,165,233,0.18)]",
        icon: Satellite
    }

};

function StatusChip({

    variant = "success",

    text,

    pulse = false,

    icon,

    className = ""

}) {

    const style = variants[variant];

    const DefaultIcon = style.icon;

    const Icon = icon || <DefaultIcon size={15} />;

    return (

        <motion.div

            whileHover={{
                scale: 1.04
            }}

            transition={{
                duration: 0.2
            }}

            className={clsx(

                theme.chip,

                "inline-flex items-center gap-2 px-3 py-2",

                style.bg,

                style.border,

                style.text,

                style.glow,

                className

            )}

        >

            <motion.div

                animate={
                    pulse
                        ? {
                            scale: [1, 1.35, 1],
                            opacity: [1, 0.55, 1]
                        }
                        : {}
                }

                transition={{
                    repeat: Infinity,
                    duration: 1.8
                }}

            >

                {Icon}

            </motion.div>

            <span className="text-xs font-semibold tracking-wide">

                {text}

            </span>

        </motion.div>

    );

}

export default StatusChip;