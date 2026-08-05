import {
    PaperAirplaneIcon,
    BoltIcon,
    WifiIcon,
    CheckCircleIcon
} from "@heroicons/react/24/outline";

function RecentActivity() {

    const activities = [

        {
            time: "11:24",
            title: "Drone DR-101 Connected",
            subtitle: "Fleet communication established",
            icon: WifiIcon
        },

        {
            time: "11:26",
            title: "Mission Started",
            subtitle: "Autonomous mission initialized",
            icon: PaperAirplaneIcon
        },

        {
            time: "11:28",
            title: "Battery Updated",
            subtitle: "Battery level changed to 84%",
            icon: BoltIcon
        },

        {
            time: "11:31",
            title: "Mission Completed",
            subtitle: "Drone returned successfully",
            icon: CheckCircleIcon
        }

    ];

    return (

        <div
            className="
                mt-8
                rounded-3xl
                border
                border-cyan-500/15
                bg-slate-900/50
                backdrop-blur-xl
                p-8
                shadow-[0_0_40px_rgba(6,182,212,.08)]
            "
        >

            <div className="flex justify-between items-center mb-8">

                <div>

                    <p className="text-xs uppercase tracking-[0.30em] text-slate-500">

                        Mission Timeline

                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white">

                        Recent Activity

                    </h2>

                </div>

            </div>

            <div className="relative">

                {/* Timeline */}

                <div className="absolute left-5 top-2 bottom-2 w-px bg-cyan-500/20"></div>

                <div className="space-y-8">

                    {

                        activities.map((activity, index) => {

                            const Icon = activity.icon;

                            return (

                                <div
                                    key={index}
                                    className="relative flex gap-6"
                                >

                                    <div
                                        className="
                                            relative
                                            z-10
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-cyan-500/10
                                            border
                                            border-cyan-500/20
                                        "
                                    >

                                        <Icon className="h-5 w-5 text-cyan-400"/>

                                    </div>

                                    <div className="flex-1">

                                        <div className="flex justify-between items-center">

                                            <h3 className="font-semibold text-white">

                                                {activity.title}

                                            </h3>

                                            <span className="text-xs text-slate-500">

                                                {activity.time}

                                            </span>

                                        </div>

                                        <p className="mt-1 text-slate-400">

                                            {activity.subtitle}

                                        </p>

                                    </div>

                                </div>

                            );

                        })

                    }

                </div>

            </div>

        </div>

    );

}

export default RecentActivity;