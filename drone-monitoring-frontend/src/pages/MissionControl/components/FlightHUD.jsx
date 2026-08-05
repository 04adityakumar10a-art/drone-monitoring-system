import {
    Compass,
    Plane,
    Timer,
    Crosshair
} from "lucide-react";

function Item({

    icon,

    title,

    value

}) {

    return (

        <div className="rounded-xl border border-[#262626] bg-[#111111] p-5 text-center">

            <div className="mb-3 flex justify-center text-[#D4AF37]">

                {icon}

            </div>

            <p className="text-sm text-gray-500">

                {title}

            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">

                {value}

            </h2>

        </div>

    );

}

function FlightHUD() {

    return (

        <div className="grid grid-cols-4 gap-4">

            <Item
                icon={<Compass/>}
                title="Heading"
                value="145°"
            />

            <Item
                icon={<Plane/>}
                title="Mode"
                value="AUTO"
            />

            <Item
                icon={<Timer/>}
                title="Flight"
                value="18:23"
            />

            <Item
                icon={<Crosshair/>}
                title="Satellites"
                value="18"
            />

        </div>

    );

}

export default FlightHUD;