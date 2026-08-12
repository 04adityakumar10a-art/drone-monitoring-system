import { useEffect, useState } from "react";

import { motion } from "motion/react";

import {

    ShieldCheck,
    Radio,
    Clock3,
    Cpu,
    ChevronRight

} from "lucide-react";

function InfoCard({

    title,

    value,

    color,

    icon: Icon

}) {



    return (

        <motion.div

            whileHover={{

                y: -5,

                scale: 1.02

            }}

            className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            p-5
            "

        >

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                        {title}

                    </p>

                    <h3 className="mt-3 text-3xl font-bold">

                        {value}

                    </h3>

                </div>

                <div

                    className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    "

                    style={{

                        background: `${color}20`

                    }}

                >

                    <Icon

                        size={22}

                        style={{

                            color

                        }}

                    />

                </div>

            </div>

        </motion.div>

    );

}

function DashboardHero() {

    const userName =
        localStorage.getItem("userName") ||
        localStorage.getItem("username") ||
        "User";

    const [time, setTime] = useState(

        new Date()

    );

    useEffect(() => {

        const timer = setInterval(() => {

            setTime(

                new Date()

            );

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const greeting = () => {

        const h = new Date().getHours();

        if (h < 12) return "Good Morning";

        if (h < 18) return "Good Afternoon";

        return "Good Evening";

    };

    return (

        <motion.section

            initial={{

                opacity: 0,

                y: 25

            }}

            animate={{

                opacity: 1,

                y: 0

            }}

            transition={{

                duration: .6

            }}

            className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-[#D4AF37]/15
            bg-[#0B0B0B]
            p-8
            "

        >

            {/* Background Glow */}

            <div

                className="
                absolute
                -right-28
                -top-28
                h-96
                w-96
                rounded-full
                bg-[var(--aerion-primary-soft)]
                blur-[140px]
                "

            />

            <div className="relative z-10">

                <div className="flex items-start justify-between">

                    <div>

                        <motion.div

                            initial={{

                                opacity: 0,

                                x: -20

                            }}

                            animate={{

                                opacity: 1,

                                x: 0

                            }}

                            className="
                            flex
                            items-center
                            gap-3
                            "

                        >

                            <div

                                className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-green-500/20
                                bg-green-500/10
                                px-4
                                py-2
                                "

                            >

                                <motion.div

                                    animate={{

                                        scale: [1, 1.4, 1],

                                        opacity: [1, .4, 1]

                                    }}

                                    transition={{

                                        repeat: Infinity,

                                        duration: 1.8

                                    }}

                                    className="h-2.5 w-2.5 rounded-full bg-green-400"

                                />

                                <span className="text-xs font-semibold tracking-[0.2em] text-green-400">

                                    LIVE

                                </span>

                            </div>

                            <div className="text-sm text-gray-500">

                                Enterprise Fleet Command

                            </div>

                        </motion.div>

                        <h1

                            className="
                            mt-6
                            text-5xl
                            font-bold
                            tracking-tight
                            "

                        >

                            {greeting()},

                            <span className="text-[var(--aerion-primary)]">

                                {" "}{userName}

                            </span>

                        </h1>

                        <p

                            className="
                            mt-4
                            max-w-2xl
                            text-lg
                            leading-8
                            text-gray-400
                            "

                        >

                            Welcome back to AERION.

                            All fleet operations, telemetry streams,

                            mission intelligence and enterprise monitoring

                            are centralized in one command platform.

                        </p>

                    </div>

                    <div

                        className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        p-5
                        text-right
                        "

                    >

                        <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                            LAST SYNC

                        </p>

                        <h2 className="mt-3 text-4xl font-bold">

                            {

                                time.toLocaleTimeString()

                            }

                        </h2>

                        <div className="mt-4 flex items-center justify-end gap-2 text-green-400">

                            <Radio size={16} />

                            <span className="text-sm">

                                Live Telemetry

                            </span>

                        </div>

                    </div>

                </div>
                <div>    </div>
                <div className="mt-10 grid gap-5 lg:grid-cols-4">
                    <InfoCard

                        title="Fleet"

                        value="19"

                        color="#D4AF37"

                        icon={ShieldCheck}

                    />

                    <InfoCard

                        title="Readiness"

                        value="96%"

                        color="#22C55E"

                        icon={Cpu}

                    />

                    <InfoCard

                        title="Network"

                        value="ONLINE"

                        color="#38BDF8"

                        icon={Radio}

                    />

                    <InfoCard

                        title="Uptime"

                        value="99.98%"

                        color="#A855F7"

                        icon={Clock3}

                    />

                </div>

                {/* Command Button */}

                <motion.div

                    initial={{

                        opacity: 0,

                        y: 15

                    }}

                    animate={{

                        opacity: 1,

                        y: 0

                    }}

                    transition={{

                        delay: .4

                    }}

                    className="mt-10"

                >
                </motion.div>

            </div>

        </motion.section>

    );

}

export default DashboardHero;