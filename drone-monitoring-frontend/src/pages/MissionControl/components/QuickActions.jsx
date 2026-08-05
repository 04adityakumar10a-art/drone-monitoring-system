import {
    Play,
    Square,
    Home,
    Plane,
    Pause,
    OctagonAlert
} from "lucide-react";

const actions = [

    {
        title: "Takeoff",
        icon: Plane,
        color: "bg-green-600"
    },

    {
        title: "Land",
        icon: Square,
        color: "bg-blue-600"
    },

    {
        title: "RTL",
        icon: Home,
        color: "bg-yellow-600"
    },

    {
        title: "Resume",
        icon: Play,
        color: "bg-emerald-600"
    },

    {
        title: "Pause",
        icon: Pause,
        color: "bg-orange-600"
    },

    {
        title: "Emergency",
        icon: OctagonAlert,
        color: "bg-red-600"
    }

];

function QuickActions() {

    return (

        <div className="rounded-2xl border border-[#262626] bg-[#1A1A1A] p-5">

            <h2 className="mb-5 text-lg font-bold text-white">

                Mission Controls

            </h2>

            <div className="grid grid-cols-2 gap-3">

                {

                    actions.map((action) => {

                        const Icon = action.icon;

                        return (

                            <button

                                key={action.title}

                                className={`${action.color} flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white transition hover:scale-105`}

                            >

                                <Icon size={18} />

                                {action.title}

                            </button>

                        );

                    })

                }

            </div>

        </div>

    );

}

export default QuickActions;