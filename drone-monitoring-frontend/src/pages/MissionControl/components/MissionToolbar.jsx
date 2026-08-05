import {

    Plane,

    Radio,

    Shield,

    Clock3,

    Circle

} from "lucide-react";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "../../../context/SidebarContext";

import { useEffect, useState } from "react";

function MissionToolbar({

    selectedDrone

}) {
    const { toggleSidebar } = useSidebar();
    const [time, setTime] = useState("");

    useEffect(() => {

        const update = () => {

            setTime(

                new Date().toLocaleTimeString()

            );

        };

        update();

        const timer = setInterval(update, 1000);

        return () => clearInterval(timer);

    }, []);

    return (

        <div className="flex h-16 items-center justify-between border-b border-[#232323] bg-[#0B0B0B] px-6">

            <div className="flex items-center gap-5">
                <button

                    onClick={toggleSidebar}

                    className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-[#262626]
        bg-[#111111]
        text-gray-400
        transition-all
        duration-300
        hover:border-[#D4AF37]
        hover:bg-[#171717]
        hover:text-[#D4AF37]
    "

                >

                    <PanelLeft size={20} />

                </button>
                <Plane

                    size={28}

                    className="text-cyan-400"

                />

                <div>

                    <h1 className="text-xl font-bold">

                        Mission Control

                    </h1>

                    <p className="text-xs text-gray-500">

                        Ground Control Station

                    </p>

                </div>

            </div>

            <div className="hidden xl:flex gap-5">

                <InfoCard

                    title="Drone"

                    value={selectedDrone?.serialNumber ?? "--"}

                />

                <InfoCard

                    title="Mission"

                    value="Surveillance"

                />

                <InfoCard

                    title="Status"

                    value={selectedDrone?.status ?? "--"}

                />

            </div>

            <div className="flex items-center gap-3">

                <StatusChip

                    icon={<Radio size={15} />}

                    text="Telemetry"

                    color="text-green-400"

                />

                <StatusChip

                    icon={<Shield size={15} />}

                    text="Secure"

                    color="text-yellow-400"

                />

                <StatusChip

                    icon={<Clock3 size={15} />}

                    text={time}

                    color="text-cyan-400"

                />

            </div>

        </div>

    );

}

function InfoCard({

    title,

    value

}) {

    return (

        <div className="rounded-xl bg-[#141414] px-4 py-2 border border-[#232323]">

            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500">

                {title}

            </div>

            <div className="font-semibold mt-1">

                {value}

            </div>

        </div>

    );

}

function StatusChip({

    icon,

    text,

    color

}) {

    return (

        <div className="flex items-center gap-2 rounded-xl border border-[#232323] bg-[#151515] px-3 py-2">

            <Circle

                size={8}

                fill="currentColor"

                className={color}

            />

            {icon}

            <span className="text-sm">

                {text}

            </span>

        </div>

    );

}

export default MissionToolbar;