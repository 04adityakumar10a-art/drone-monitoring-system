import {
    Clock3,
    Activity
} from "lucide-react";

function RecentActivity({ drones }) {

    const events = drones.slice(0, 6).map((d, i) => ({

        drone: d.model,

        time: `${10 + i}:2${i}`,

        status:
            d.status === "ONLINE"
                ? "Connected"
                : "Disconnected"

    }));

    return (

        <div className="rounded-3xl border border-[#232323] bg-[#101010]">

            <div className="border-b border-[#232323] p-6">

                <div className="flex items-center gap-3">

                    <Clock3
                        className="text-[var(--aerion-primary)]"
                    />

                    <div>

                        <h2 className="text-xl font-bold text-white">

                            Recent Activity

                        </h2>

                        <p className="text-sm text-gray-400">

                            Latest fleet events

                        </p>

                    </div>

                </div>

            </div>

            <div className="p-5 space-y-5">

                {events.map((e, i) => (

                    <div
                        key={i}
                        className="flex items-start gap-4"
                    >

                        <div className="mt-1 h-3 w-3 rounded-full bg-[#D4AF37]" />

                        <div className="flex-1">

                            <p className="font-medium text-white">

                                {e.drone}

                            </p>

                            <p className="text-sm text-gray-400">

                                {e.status}

                            </p>

                        </div>

                        <span className="text-xs text-gray-500">

                            {e.time}

                        </span>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default RecentActivity;