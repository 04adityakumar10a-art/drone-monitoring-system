import { useEffect, useState } from "react";
import api from "../api/axios";
import DroneForm from "./DroneForm";
import toast from "react-hot-toast";

import {
    XMarkIcon,
    PaperAirplaneIcon
} from "@heroicons/react/24/outline";

import {
    AnimatePresence,
    motion
} from "framer-motion";


function AddDroneModal({
    isOpen = false,
    onClose,
    onDroneAdded
}) {

    const [formData, setFormData] = useState({

        model: "",

        manufacturer: "",

        batteryLevel: "",

        serialNumber: "",

        status: "AVAILABLE"

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    useEffect(() => {

        if (!isOpen) {
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

    }, [isOpen, onClose]);


    /* =====================================================
       BODY SCROLL LOCK
    ===================================================== */

    useEffect(() => {

        if (!isOpen) {
            return;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {

            document.body.style.overflow =
                previousOverflow;

        };

    }, [isOpen]);


    /* =====================================================
       RESET FORM
    ===================================================== */

    function resetForm() {

        setFormData({

            model: "",

            manufacturer: "",

            batteryLevel: "",

            serialNumber: "",

            status: "AVAILABLE"

        });

    }


    /* =====================================================
       CLOSE
    ===================================================== */

    function handleClose() {

        resetForm();

        onClose();

    }


    /* =====================================================
       FORM CHANGE
    ===================================================== */

    function handleChange(event) {

        const {
            name,
            value
        } = event.target;


        if (name === "batteryLevel") {

            let battery =
                value === ""
                    ? ""
                    : Number(value);


            if (battery !== "") {

                if (battery > 100) {
                    battery = 100;
                }

                if (battery < 0) {
                    battery = 0;
                }

            }


            setFormData(
                previous => ({
                    ...previous,
                    batteryLevel: battery
                })
            );

            return;

        }


        setFormData(
            previous => ({
                ...previous,
                [name]: value
            })
        );

    }


    /* =====================================================
       SUBMIT
    ===================================================== */

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            await api.post(
                "/api/drones",
                formData
            );

            toast.success(
                "Drone added successfully"
            );


            if (onDroneAdded) {

                onDroneAdded();

            }


            resetForm();

            onClose();

        }
        catch (error) {

            console.error(
                "Failed to create drone:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to create drone!"
            );

        }

    }


    /* =====================================================
       IMPORTANT
       DO NOT RENDER WHEN CLOSED
    ===================================================== */

    if (isOpen !== true) {

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
                    bg-black/70
                    px-4
                    py-24
                    backdrop-blur-md
                "

                onMouseDown={(event) => {

                    if (
                        event.target ===
                        event.currentTarget
                    ) {

                        handleClose();

                    }

                }}

            >

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 25,
                        scale: 0.96
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
                        max-w-2xl
                        overflow-hidden
                        rounded-3xl
                        border
                        border-white/[0.12]
                        bg-[#0b0d0f]/95
                        shadow-[0_30px_100px_rgba(0,0,0,.75)]
                        backdrop-blur-3xl
                    "

                    onMouseDown={(event) =>
                        event.stopPropagation()
                    }

                >

                    {/* =================================================
                       GOLD / CYAN AMBIENT GLOW
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
                            bg-[#F0C24B]/10
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
                            bg-cyan-500/[0.06]
                            blur-3xl
                        "
                    />


                    {/* =================================================
                       TOP GOLD LINE
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
                            via-[#F0C24B]
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

                            {/* ICON */}

                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-[#F0C24B]/20
                                    bg-[#F0C24B]/10
                                    shadow-[0_0_30px_rgba(240,194,75,.08)]
                                "
                            >

                                <PaperAirplaneIcon
                                    className="
                                        h-7
                                        w-7
                                        text-[#F0C24B]
                                    "
                                />

                            </div>


                            {/* TITLE */}

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
                                    Add New Drone
                                </h2>

                            </div>

                        </div>


                        {/* CLOSE */}

                        <motion.button

                            type="button"

                            onClick={handleClose}

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
                            "
                        >

                            <XMarkIcon
                                className="h-5 w-5"
                            />

                        </motion.button>

                    </div>


                    {/* =================================================
                       FORM
                    ================================================= */}

                    <div className="relative p-8">

                        <DroneForm

                            formData={formData}

                            handleChange={handleChange}

                            handleSubmit={handleSubmit}

                            submitText="Create Drone"

                            onCancel={handleClose}

                        />

                    </div>

                </motion.div>

            </motion.div>

        </AnimatePresence>

    );

}


export default AddDroneModal;