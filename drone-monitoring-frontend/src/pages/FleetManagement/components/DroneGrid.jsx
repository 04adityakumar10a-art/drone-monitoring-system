import { motion, AnimatePresence } from "motion/react";

import {
    Plane,
    Plus
} from "lucide-react";

import DroneCard from "./DroneCard";

function DroneGrid({
    drones = [],
    loading,
    onEdit = () => {},
    onDelete = () => {},
    onOpen = () => {}
}) {
    /* ============================
       LOADING
    ============================ */

    if (loading) {
        return (
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                className="
                    grid
                    gap-5
                    md:grid-cols-2
                    xl:grid-cols-3
                    2xl:grid-cols-4
                "
            >
                {Array.from({
                    length: 8
                }).map((_, index) => (
                    <SkeletonCard
                        key={index}
                        index={index}
                    />
                ))}
            </motion.div>
        );
    }

    /* ============================
       EMPTY STATE
    ============================ */

    if (drones.length === 0) {
        return (
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.98
                }}
                animate={{
                    opacity: 1,
                    scale: 1
                }}
                transition={{
                    duration: 0.4
                }}
                className="
                    relative
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    py-24
                "
            >
                {/* Glow */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-1/2
                        h-80
                        w-80
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-[#D4AF37]/[0.05]
                        blur-[120px]
                    "
                />

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        flex
                        max-w-md
                        flex-col
                        items-center
                        px-6
                        text-center
                    "
                >
                    {/* Icon */}

                    <motion.div
                        animate={{
                            y: [0, -7, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut"
                        }}
                        className="
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-3xl
                            border
                            border-[#D4AF37]/15
                            bg-[#D4AF37]/[0.07]
                            shadow-[0_0_50px_rgba(212,175,55,.08)]
                        "
                    >
                        <Plane
                            size={36}
                            className="text-[var(--aerion-primary)]"
                        />
                    </motion.div>

                    <p
                        className="
                            mt-7
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.35em]
                            text-[var(--aerion-primary)]
                        "
                    >
                        FLEET DATABASE
                    </p>

                    <h2
                        className="
                            mt-2
                            text-2xl
                            font-bold
                            text-white
                        "
                    >
                        No Drones Found
                    </h2>

                    <p
                        className="
                            mt-3
                            text-sm
                            leading-6
                            text-gray-500
                        "
                    >
                        No aircraft matched your current
                        search or filter configuration.
                    </p>

                    <motion.button
                        whileHover={{
                            scale: 1.04,
                            y: -2
                        }}
                        whileTap={{
                            scale: 0.97
                        }}
                        className="
                            mt-8
                            flex
                            items-center
                            gap-2
                            rounded-2xl
                            border
                            border-[#D4AF37]/30
                            bg-[#D4AF37]
                            px-6
                            py-3
                            text-sm
                            font-semibold
                            text-black
                            shadow-[0_10px_35px_rgba(212,175,55,.12)]
                        "
                    >
                        <Plus size={18} />

                        Add First Drone
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    /* ============================
       DRONE GRID
    ============================ */

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={drones
                    .map((drone) => drone.id)
                    .join("-")}
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                exit={{
                    opacity: 0
                }}
                transition={{
                    duration: 0.3
                }}
                className="
                    grid
                    gap-5
                    md:grid-cols-2
                    xl:grid-cols-3
                    2xl:grid-cols-4
                "
            >
                {drones.map((drone, index) => (
                    <motion.div
                        key={drone.id}
                        layout
                        initial={{
                            opacity: 0,
                            y: 25,
                            scale: 0.97
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                        }}
                        transition={{
                            duration: 0.45,
                            delay: Math.min(
                                index * 0.06,
                                0.5
                            ),
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1
                            ]
                        }}
                    >
                        <DroneCard
                            drone={drone}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onOpen={onOpen}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </AnimatePresence>
    );
}

/* ============================
   SKELETON
============================ */

function SkeletonCard({
    index = 0
}) {
    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                delay: index * 0.05
            }}
            className="
                overflow-hidden
                rounded-[26px]
                border
                border-white/[0.06]
                bg-white/[0.025]
                p-5
            "
        >
            {/* Header */}

            <div className="flex items-center gap-4">

                <div
                    className="
                        h-14
                        w-14
                        shrink-0
                        animate-pulse
                        rounded-2xl
                        bg-white/[0.06]
                    "
                />

                <div className="flex-1">

                    <div
                        className="
                            mb-3
                            h-4
                            w-32
                            animate-pulse
                            rounded
                            bg-white/[0.06]
                        "
                    />

                    <div
                        className="
                            h-3
                            w-20
                            animate-pulse
                            rounded
                            bg-white/[0.04]
                        "
                    />

                </div>

            </div>

            {/* Status */}

            <div
                className="
                    mt-6
                    h-2
                    animate-pulse
                    rounded-full
                    bg-white/[0.05]
                "
            />

            {/* Metrics */}

            <div className="
                mt-6
                grid
                grid-cols-2
                gap-3
            ">
                {Array.from({
                    length: 4
                }).map((_, index) => (
                    <div
                        key={index}
                        className="
                            h-20
                            animate-pulse
                            rounded-2xl
                            bg-white/[0.035]
                        "
                    />
                ))}
            </div>

            {/* Footer */}

            <div
                className="
                    mt-6
                    flex
                    items-center
                    justify-between
                "
            >
                <div className="flex gap-2">

                    <div
                        className="
                            h-10
                            w-10
                            animate-pulse
                            rounded-xl
                            bg-white/[0.05]
                        "
                    />

                    <div
                        className="
                            h-10
                            w-10
                            animate-pulse
                            rounded-xl
                            bg-white/[0.05]
                        "
                    />

                </div>

                <div
                    className="
                        h-10
                        w-28
                        animate-pulse
                        rounded-xl
                        bg-white/[0.05]
                    "
                />

            </div>
        </motion.div>
    );
}

export default DroneGrid;