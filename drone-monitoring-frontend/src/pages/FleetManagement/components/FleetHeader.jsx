import {
    Plane,
    Activity,
    BatteryCharging,
    Radio
} from "lucide-react";
import fleetBg from "../../../assets/images/fleet-bg.png";
function FleetHeader({ drones }) {

    const total = drones.length;

    const online = drones.filter(
        d => d.status === "AVAILABLE"
    ).length;

    return (

        <div
            className="relative mb-8 overflow-hidden rounded-3xl border border-[#232323] p-8 shadow-[0_25px_70px_rgba(0,0,0,.45)]"
            style={{
                backgroundImage: `
            linear-gradient(rgba(10,10,10,0.88), rgba(10,10,10,0.88)),
            url(${fleetBg})
        `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                {/* Left */}

                <div className="flex items-center gap-5">

                    <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#171717] p-5">

                        <Plane
                            size={34}
                            className="text-[#D4AF37]"
                        />

                    </div>

                    <div>

                        <h1 className="text-4xl font-black text-white">

                            Fleet Operations

                        </h1>

                        <p className="mt-2 text-gray-400">

                            Real-Time Drone Fleet Management Platform

                        </p>

                    </div>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-2 gap-6">

                    <div className="rounded-2xl bg-[#171717] px-6 py-4">

                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">

                            Fleet

                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-white">

                            {total}

                        </h2>

                    </div>

                    <div className="rounded-2xl bg-[#171717] px-6 py-4">

                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">

                            Online

                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-emerald-400">

                            {online}

                        </h2>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default FleetHeader;