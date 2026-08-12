import { motion } from "motion/react";

function PremiumCard({
    children,
    className = "",
    delay = 0,
    hover = true,
    glow = true
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 24
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            viewport={{
                once: true,
                amount: 0.15
            }}
            transition={{
                duration: 0.55,
                delay,
                ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={
                hover
                    ? {
                          y: -5,
                          transition: {
                              duration: 0.2,
                              ease: "easeOut"
                          }
                      }
                    : undefined
            }
            className={`
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/[0.08]
                border-t-white/[0.16]
                bg-white/[0.025]
                backdrop-blur-xl
                shadow-[0_20px_80px_rgba(0,0,0,0.32)]
                transition-[border-color,box-shadow,background-color]
                duration-500
                hover:border-[#F0C24B]/25
                hover:bg-white/[0.04]
                hover:shadow-[0_24px_90px_rgba(0,0,0,0.42)]
                ${className}
            `}
        >
            {/* Ambient gold glow */}

            {glow && (
                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-28
                        -top-28
                        h-72
                        w-72
                        rounded-full
                        bg-[#F0C24B]/0
                        blur-[110px]
                        transition-all
                        duration-700
                        group-hover:bg-[#F0C24B]/[0.10]
                    "
                />
            )}

            {/* Ambient violet glow */}

            {glow && (
                <div
                    className="
                        pointer-events-none
                        absolute
                        -left-24
                        -top-24
                        h-60
                        w-60
                        rounded-full
                        bg-[#8B6BD8]/0
                        blur-[100px]
                        transition-all
                        duration-700
                        group-hover:bg-[#8B6BD8]/[0.06]
                    "
                />
            )}

            {/* Ambient cyan glow */}

            {glow && (
                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-28
                        -left-28
                        h-72
                        w-72
                        rounded-full
                        bg-cyan-400/0
                        blur-[110px]
                        transition-all
                        duration-700
                        group-hover:bg-cyan-400/[0.04]
                    "
                />
            )}

            {/* Top highlight */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-x-8
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.16]
                    to-transparent
                "
            />

            {/* Shine sweep */}

            <motion.div
                aria-hidden="true"
                initial={{ left: "-60%" }}
                animate={{ left: "130%" }}
                transition={{
                    repeat: Infinity,
                    repeatDelay: 6,
                    delay: delay + 1,
                    duration: 1.8,
                    ease: "easeInOut"
                }}
                className="
                    pointer-events-none
                    absolute
                    top-0
                    h-full
                    w-[30%]
                    -skew-x-[20deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.05]
                    to-transparent
                "
            />

            {/* Animated bottom accent */}

            <motion.div
                initial={{
                    scaleX: 0,
                    opacity: 0
                }}
                whileInView={{
                    scaleX: 1,
                    opacity: 1
                }}
                viewport={{
                    once: true
                }}
                transition={{
                    duration: 1,
                    delay: delay + 0.15,
                    ease: "easeOut"
                }}
                className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-full
                    origin-left
                    rounded-full
                    bg-gradient-to-r
                    from-[#F0C24B]
                    via-[#8B6BD8]/50
                    to-cyan-400/60
                "
            />

            {/* Content */}

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

export default PremiumCard;