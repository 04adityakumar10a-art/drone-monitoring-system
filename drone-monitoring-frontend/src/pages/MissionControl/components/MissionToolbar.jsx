import { Radio, Shield, Cpu, PanelLeft } from "lucide-react";
import { motion } from "motion/react";

import { useSidebar } from "../../../context/SidebarContext";

import GlassPanel from "../../../ui/Panel/GlassPanel";
import HeaderButton from "../../../ui/Header/HeaderButton";
import HeaderInfoCard from "../../../ui/Header/HeaderInfoCard";
import MissionTitle from "../../../ui/Header/MissionTitle";
import LiveClock from "../../../ui/Header/LiveClock";
import StatusChip from "../../../ui/Badge/StatusChip";

function MissionToolbar({ selectedDrone }) {

    const { toggleSidebar } = useSidebar();

    return (

        <motion.header

            initial={{
                opacity: 0,
                y: -30
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.45
            }}

            className="relative border-b border-white/[0.08] bg-white/[0.025] backdrop-blur-xl px-6 py-4"

        >

            {/* Background Glow */}

            <motion.div

                animate={{

                    opacity: [0.06, 0.16, 0.06]

                }}

                transition={{

                    repeat: Infinity,

                    duration: 5

                }}

                className="
                absolute
                inset-0
                pointer-events-none
                "

                style={{

                    background:
                        "radial-gradient(circle at 30% -40%, rgba(240,194,75,.2), transparent 60%), radial-gradient(circle at 75% -40%, rgba(139,107,216,.14), transparent 60%)"

                }}

            />

            <GlassPanel

                hover={false}

                glow

                className="relative overflow-hidden px-6 py-5"

            >

                {/* Gold Accent */}

                <motion.div

                    animate={{

                        opacity: [0.4, 1, 0.4]

                    }}

                    transition={{

                        repeat: Infinity,

                        duration: 4

                    }}

                    className="
                    absolute
                    left-0
                    top-0
                    h-1
                    w-full
                    "

                    style={{

                        background:
                            "linear-gradient(90deg, transparent, #F0C24B 15%, #8B6BD8 50%, #4FD1E3 85%, transparent)"

                    }}

                />

                <div className="flex items-center justify-between">

                    {/* LEFT */}

                    <div className="flex items-center gap-5">

                        <HeaderButton

                            onClick={toggleSidebar}

                        >

                            <PanelLeft size={20} />

                        </HeaderButton>

                        <motion.div

                            animate={{

                                y: [0, -2, 0]

                            }}

                            transition={{

                                repeat: Infinity,

                                duration: 4

                            }}

                        >

                            <MissionTitle />

                        </motion.div>

                    </div>

                    {/* CENTER */}

                    <motion.div

                        layout

                        className="hidden xl:flex items-center gap-4"

                    >

                        <HeaderInfoCard

                            title="Active Drone"

                            value={selectedDrone?.serialNumber ?? "--"}

                        />

                        <HeaderInfoCard

                            title="Mission"

                            value="Surveillance"

                        />

                        <HeaderInfoCard

                            title="Status"

                            value={selectedDrone?.status ?? "--"}

                        />

                    </motion.div>

                    {/* RIGHT */}

                    <div className="flex items-center gap-3">

                        <StatusChip

                            variant="live"

                            pulse

                            text="Telemetry"

                            icon={<Radio size={14}/>}

                        />

                        <StatusChip

                            variant="success"

                            text="Secure"

                            icon={<Shield size={14}/>}

                        />

                        <StatusChip

                            variant="simulator"

                            text="Simulator"

                            icon={<Cpu size={14}/>}

                        />

                        <LiveClock/>

                    </div>

                </div>

            </GlassPanel>

        </motion.header>

    );

}

export default MissionToolbar;