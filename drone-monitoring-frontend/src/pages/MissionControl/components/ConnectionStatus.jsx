import {
    Wifi,
    Satellite,
    Radio
} from "lucide-react";

function Status({

    icon,

    label,

    value,

    color

}) {

    return (

        <div className="rounded-xl border border-[#262626] bg-[#1A1A1A] p-4">

            <div className="mb-2 flex items-center gap-2">

                {icon}

                <span className="text-sm text-gray-400">

                    {label}

                </span>

            </div>

            <h3

                className="font-bold"

                style={{ color }}

            >

                {value}

            </h3>

        </div>

    );

}

function ConnectionStatus() {

    return (

        <div className="grid grid-cols-3 gap-3">

            <Status

                icon={<Wifi size={18} className="text-green-500" />}

                label="Network"

                value="ONLINE"

                color="#22C55E"

            />

            <Status

                icon={<Satellite size={18} className="text-[#D4AF37]" />}

                label="GPS"

                value="LOCKED"

                color="#D4AF37"

            />

            <Status

                icon={<Radio size={18} className="text-blue-500" />}

                label="Link"

                value="ACTIVE"

                color="#3B82F6"

            />

        </div>

    );

}

export default ConnectionStatus;