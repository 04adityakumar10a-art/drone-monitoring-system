import { useEffect, useState } from "react";

import api from "../api/axios";
import toast from "react-hot-toast";

import {
    ExclamationTriangleIcon,
    TrashIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

import {
    AnimatePresence,
    motion
} from "framer-motion";


function DeleteDroneModal({

    isOpen = false,

    drone,

    onClose,

    onDroneDeleted

}) {

    const [deleting, setDeleting] = useState(false);


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    useEffect(() => {

        if (isOpen !== true || !drone || deleting) {
            return;
        }

        function handleEscape(event) {

            if (event.key === "Escape") {

                onClose();

            }

        }

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {

            document.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, [
        isOpen,
        drone,
        deleting,
        onClose
    ]);


    /* =====================================================
       BODY SCROLL LOCK
    ===================================================== */

    useEffect(() => {

        if (isOpen !== true || !drone) {
            return;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow =
            "hidden";

        return () => {

            document.body.style.overflow =
                previousOverflow;

        };

    }, [isOpen, drone]);


    /* =====================================================
       DELETE
    ===================================================== */

    async function handleDelete() {

        if (
            deleting ||
            !drone?.id
        ) {
            return;
        }

        setDeleting(true);

        try {

            await api.delete(
                `/api/drones/${drone.id}`
            );


            toast.success(
                "Drone deleted successfully!"
            );


            if (onDroneDeleted) {

                onDroneDeleted();

            }


            onClose();

        }
        catch (error) {

            console.error(
                "Failed to delete drone:",
                error
            );


            toast.error(

                error?.response?.data?.message ||

                "Failed to delete drone."

            );

            setDeleting(false);

        }

    }


    /* =====================================================
       CLOSE
    ===================================================== */

    function handleClose() {

        if (deleting) {
            return;
        }

        onClose();

    }


    /* =====================================================
       IMPORTANT
    ===================================================== */

    if (
        isOpen !== true ||
        !drone
    ) {

        return null;

    }


    /* =====================================================
       MODAL
    ===================================================== */

    return (

        <AnimatePresence>

            <motion.div

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
                    duration: 0.2
                }}

                className="
                    fixed
                    inset-0
                    z-[1000]
                    flex
                    items-center
                    justify-center
                    overflow-y-auto
                    bg-black/75
                    px-4
                    py-24
                    backdrop-blur-md
                "

                onMouseDown={(event) => {

                    if (
                        event.target ===
                        event.currentTarget &&
                        !deleting
                    ) {

                        handleClose();

                    }

                }}

            >

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 25,
                        scale: 0.95
                    }}

                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1
                    }}

                    exit={{
                        opacity: 0,
                        y: 15,
                        scale: 0.97
                    }}

                    transition={{
                        duration: 0.25,
                        ease: [
                            0.16,
                            1,
                            0.3,
                            1
                        ]
                    }}

                    className="
                        relative
                        w-full
                        max-w-xl
                        overflow-hidden
                        rounded-3xl
                        border
                        border-red-500/[0.18]
                        bg-[#0b0d0f]/95
                        shadow-[0_30px_100px_rgba(0,0,0,.8)]
                        backdrop-blur-3xl
                    "

                    onMouseDown={(event) =>
                        event.stopPropagation()
                    }

                >

                    {/* =================================================
                       RED AMBIENT GLOW
                    ================================================= */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-24
                            -top-24
                            h-64
                            w-64
                            rounded-full
                            bg-red-500/10
                            blur-3xl
                        "
                    />


                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-24
                            -left-24
                            h-56
                            w-56
                            rounded-full
                            bg-orange-500/[0.05]
                            blur-3xl
                        "
                    />


                    {/* =================================================
                       TOP RED LINE
                    ================================================= */}

                    <div
                        className="
                            absolute
                            left-10
                            right-10
                            top-0
                            h-px
                            bg-gradient-to-r
                            from-transparent
                            via-red-500
                            to-transparent
                        "
                    />


                    {/* =================================================
                       HEADER
                    ================================================= */}

                    <div
                        className="
                            relative
                            flex
                            items-center
                            justify-between
                            border-b
                            border-white/[0.07]
                            px-8
                            py-6
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-4
                            "
                        >

                            {/* WARNING ICON */}

                            <motion.div

                                animate={{
                                    boxShadow: [
                                        "0 0 0 rgba(239,68,68,0)",
                                        "0 0 25px rgba(239,68,68,.18)",
                                        "0 0 0 rgba(239,68,68,0)"
                                    ]
                                }}

                                transition={{
                                    duration: 2.2,
                                    repeat: Infinity
                                }}

                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-red-500/20
                                    bg-red-500/10
                                "
                            >

                                <ExclamationTriangleIcon
                                    className="
                                        h-7
                                        w-7
                                        text-red-400
                                    "
                                />

                            </motion.div>


                            <div>

                                <p
                                    className="
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-[0.3em]
                                        text-white/30
                                    "
                                >
                                    Fleet Management
                                </p>

                                <h2
                                    className="
                                        mt-1
                                        text-2xl
                                        font-black
                                        tracking-tight
                                        text-white
                                    "
                                >
                                    Delete Drone
                                </h2>

                                <p
                                    className="
                                        mt-1
                                        text-[10px]
                                        text-red-400/70
                                    "
                                >
                                    Permanent fleet removal
                                </p>

                            </div>

                        </div>


                        {/* CLOSE */}

                        <motion.button

                            type="button"

                            onClick={handleClose}

                            disabled={deleting}

                            whileHover={{
                                scale: 1.05
                            }}

                            whileTap={{
                                scale: 0.94
                            }}

                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/[0.1]
                                bg-white/[0.04]
                                text-white/40
                                transition-all
                                hover:border-red-400/30
                                hover:bg-red-500/10
                                hover:text-red-400
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            "
                        >

                            <XMarkIcon
                                className="h-5 w-5"
                            />

                        </motion.button>

                    </div>


                    {/* =================================================
                       BODY
                    ================================================= */}

                    <div className="relative p-8">


                        {/* DRONE CARD */}

                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-red-500/[0.12]
                                bg-red-500/[0.045]
                                p-5
                            "
                        >

                            {/* subtle scan line */}

                            <motion.div

                                animate={{
                                    y: ["-100%", "300%"]
                                }}

                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}

                                className="
                                    pointer-events-none
                                    absolute
                                    left-0
                                    right-0
                                    h-px
                                    bg-gradient-to-r
                                    from-transparent
                                    via-red-400/30
                                    to-transparent
                                "
                            />


                            <div
                                className="
                                    relative
                                    flex
                                    items-center
                                    gap-4
                                "
                            >

                                {/* DRONE ICON */}

                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-red-500/15
                                        bg-red-500/10
                                    "
                                >

                                    <TrashIcon
                                        className="
                                            h-6
                                            w-6
                                            text-red-400
                                        "
                                    />

                                </div>


                                <div className="min-w-0">

                                    <p
                                        className="
                                            text-[8px]
                                            font-bold
                                            uppercase
                                            tracking-[0.2em]
                                            text-white/25
                                        "
                                    >
                                        Selected Aircraft
                                    </p>

                                    <h3
                                        className="
                                            mt-1
                                            truncate
                                            text-xl
                                            font-black
                                            text-white
                                        "
                                    >
                                        {drone.model}
                                    </h3>

                                </div>

                            </div>


                            {/* DETAILS */}

                            <div
                                className="
                                    relative
                                    mt-5
                                    grid
                                    grid-cols-2
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        rounded-xl
                                        border
                                        border-white/[0.06]
                                        bg-black/20
                                        px-3
                                        py-2.5
                                    "
                                >

                                    <p
                                        className="
                                            text-[8px]
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-white/25
                                        "
                                    >
                                        Serial Number
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            truncate
                                            font-mono
                                            text-[11px]
                                            text-white/65
                                        "
                                    >
                                        {drone.serialNumber}
                                    </p>

                                </div>


                                <div
                                    className="
                                        rounded-xl
                                        border
                                        border-white/[0.06]
                                        bg-black/20
                                        px-3
                                        py-2.5
                                    "
                                >

                                    <p
                                        className="
                                            text-[8px]
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-white/25
                                        "
                                    >
                                        Drone ID
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            font-mono
                                            text-[11px]
                                            text-white/65
                                        "
                                    >
                                        #{drone.id}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* WARNING */}

                        <motion.div

                            initial={{
                                opacity: 0,
                                y: 5
                            }}

                            animate={{
                                opacity: 1,
                                y: 0
                            }}

                            transition={{
                                delay: 0.12
                            }}

                            className="
                                mt-5
                                flex
                                gap-3
                                rounded-2xl
                                border
                                border-amber-500/15
                                bg-amber-500/[0.045]
                                p-4
                            "
                        >

                            <ExclamationTriangleIcon
                                className="
                                    mt-0.5
                                    h-5
                                    w-5
                                    shrink-0
                                    text-amber-400
                                "
                            />

                            <div>

                                <p
                                    className="
                                        text-xs
                                        font-bold
                                        text-amber-300
                                    "
                                >
                                    Permanent action
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-[11px]
                                        leading-relaxed
                                        text-amber-200/50
                                    "
                                >
                                    This drone will be permanently
                                    removed from your fleet.
                                    This action cannot be undone.
                                </p>

                            </div>

                        </motion.div>

                    </div>


                    {/* =================================================
                       FOOTER
                    ================================================= */}

                    <div
                        className="
                            relative
                            flex
                            justify-end
                            gap-3
                            border-t
                            border-white/[0.07]
                            px-8
                            py-5
                        "
                    >

                        {/* CANCEL */}

                        <motion.button

                            type="button"

                            onClick={handleClose}

                            disabled={deleting}

                            whileHover={{
                                y: -1
                            }}

                            whileTap={{
                                scale: 0.97
                            }}

                            className="
                                rounded-xl
                                border
                                border-white/[0.1]
                                bg-white/[0.04]
                                px-6
                                py-3
                                text-xs
                                font-semibold
                                text-white/60
                                transition-all
                                hover:border-white/[0.2]
                                hover:bg-white/[0.08]
                                hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            "
                        >

                            Cancel

                        </motion.button>


                        {/* DELETE */}

                        <motion.button

                            type="button"

                            onClick={handleDelete}

                            disabled={deleting}

                            whileHover={{
                                y: -2
                            }}

                            whileTap={{
                                scale: 0.97
                            }}

                            className="
                                flex
                                min-w-[145px]
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-gradient-to-r
                                from-red-500
                                to-red-700
                                px-6
                                py-3
                                text-xs
                                font-bold
                                text-white
                                shadow-[0_8px_30px_rgba(239,68,68,.18)]
                                transition-all
                                hover:shadow-[0_12px_40px_rgba(239,68,68,.30)]
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >

                            {deleting ? (

                                <>
                                    <span
                                        className="
                                            h-4
                                            w-4
                                            animate-spin
                                            rounded-full
                                            border-2
                                            border-white/30
                                            border-t-white
                                        "
                                    />

                                    Deleting...

                                </>

                            ) : (

                                <>
                                    <TrashIcon
                                        className="h-4 w-4"
                                    />

                                    Delete Drone

                                </>

                            )}

                        </motion.button>

                    </div>

                </motion.div>

            </motion.div>

        </AnimatePresence>

    );

}


export default DeleteDroneModal;