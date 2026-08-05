import {
    AlertTriangle,
    CheckCircle,
    ShieldAlert
} from "lucide-react";

const alerts = [

    {
        level: "success",
        icon: CheckCircle,
        title: "Telemetry Stable",
        color: "text-green-500"
    },

    {
        level: "warning",
        icon: AlertTriangle,
        title: "Moderate Wind",
        color: "text-yellow-500"
    },

    {
        level: "danger",
        icon: ShieldAlert,
        title: "Battery < 25%",
        color: "text-red-500"
    }

];

function MissionAlerts() {

    return (

        <div className="rounded-2xl border border-[#262626] bg-[#1A1A1A] p-5">

            <h2 className="mb-5 text-lg font-bold text-white">

                Live Alerts

            </h2>

            <div className="space-y-3">

                {

                    alerts.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <div

                                key={index}

                                className="flex items-center gap-3 rounded-xl border border-[#262626] bg-[#111111] p-3"

                            >

                                <Icon

                                    size={20}

                                    className={item.color}

                                />

                                <span className="text-white">

                                    {item.title}

                                </span>

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

}

export default MissionAlerts;