import {

Plane,

Navigation,

BatteryCharging,

AlertTriangle,

CheckCircle

} from "lucide-react";

const events = [

    {

        time: "13:02",

        title: "Mission Started",

        icon: Plane,

        color: "text-green-500"

    },

    {

        time: "13:05",

        title: "Reached Waypoint 1",

        icon: Navigation,

        color: "text-blue-500"

    },

    {

        time: "13:11",

        title: "Battery 90%",

        icon: BatteryCharging,

        color: "text-yellow-500"

    },

    {

        time: "13:16",

        title: "Obstacle Detected",

        icon: AlertTriangle,

        color: "text-orange-500"

    },

    {

        time: "13:18",

        title: "Obstacle Avoided",

        icon: CheckCircle,

        color: "text-green-500"

    }

];

function MissionTimeline() {

    return (

        <div className="rounded-2xl border border-[#262626] bg-[#111111] p-5">

            <div className="mb-6">

                <h2 className="text-xl font-bold text-white">

                    Mission Timeline

                </h2>

                <p className="text-sm text-gray-500">

                    Flight Event History

                </p>

            </div>

            <div className="space-y-5">

                {

                    events.map((event, index) => {

                        const Icon = event.icon;

                        return (

                            <div

                                key={index}

                                className="flex gap-4"

                            >

                                <div className="flex flex-col items-center">

                                    <div className="rounded-full bg-[#1A1A1A] p-2">

                                        <Icon

                                            size={18}

                                            className={event.color}

                                        />

                                    </div>

                                    {

                                        index !== events.length - 1 && (

                                            <div className="mt-2 h-10 w-px bg-[#333]" />

                                        )

                                    }

                                </div>

                                <div className="flex-1">

                                    <div className="text-sm text-[#D4AF37]">

                                        {event.time}

                                    </div>

                                    <div className="font-semibold text-white">

                                        {event.title}

                                    </div>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

}

export default MissionTimeline;