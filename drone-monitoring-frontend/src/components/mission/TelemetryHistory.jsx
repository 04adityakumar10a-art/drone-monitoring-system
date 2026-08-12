import api from "../../api/axios";
import {
    Download,
    Clock3,
    BatteryCharging,
    Gauge,
    Plane,
    Radio
} from "lucide-react";

function TelemetryHistory({

    droneId,

    history

}) {

    async function exportCsv() {

        try {

            const response = await api.get(

                `/api/telemetry/export/${droneId}`,

                {

                    responseType: "blob"

                }

            );

            const url = window.URL.createObjectURL(

                new Blob([response.data])

            );

            const link = document.createElement("a");

            link.href = url;

            link.download = `drone_${droneId}_telemetry.csv`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        }

        catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="rounded-2xl border border-[#262626] bg-[#111111]">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-[#262626] p-6">

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        Mission Timeline

                    </h2>

                    <p className="mt-1 text-gray-400">

                        Recorded telemetry events

                    </p>

                </div>

                <button

                    onClick={exportCsv}

                    className="flex items-center gap-2 rounded-xl border border-[#D4AF37] px-4 py-2 font-semibold text-[var(--aerion-primary)] transition hover:bg-[#D4AF37] hover:text-black"

                >

                    <Download size={18} />

                    Export CSV

                </button>

            </div>

            {

                history.length === 0 ? (

                    <div className="py-20 text-center text-gray-500">

                        No telemetry history available.

                    </div>

                ) : (

                    <div className="max-h-[650px] overflow-y-auto p-6">

                        <div className="relative">

                            {/* Timeline Line */}

                            <div className="absolute left-[19px] top-0 h-full w-px bg-[#333]" />

                            {

                                history.map(item => {

                                    let batteryColor = "text-green-400";

                                    let batteryBg = "bg-green-500";

                                    if (item.batteryLevel < 50) {

                                        batteryColor = "text-yellow-400";

                                        batteryBg = "bg-yellow-500";

                                    }

                                    if (item.batteryLevel < 20) {

                                        batteryColor = "text-red-400";

                                        batteryBg = "bg-red-500";

                                    }

                                    return (

                                        <div

                                            key={item.id}

                                            className="relative mb-6 pl-12"

                                        >

                                            {/* Timeline Dot */}

                                            <div className="absolute left-0 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#444] bg-[#1A1A1A]">

                                                <Clock3

                                                    size={18}

                                                    className="text-[var(--aerion-primary)]"

                                                />

                                            </div>

                                            {/* Card */}

                                            <div className="rounded-xl border border-[#262626] bg-[#0D0D0D] p-5 transition hover:border-[#D4AF37]">

                                                <div className="flex items-center justify-between">

                                                    <h3 className="font-semibold text-white">

                                                        {

                                                            new Date(

                                                                item.timestamp

                                                            ).toLocaleTimeString()

                                                        }

                                                    </h3>

                                                    <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">

                                                        TELEMETRY

                                                    </span>

                                                </div>

                                                <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">

                                                    {/* Battery */}

                                                    <Metric

                                                        icon={<BatteryCharging size={16} />}

                                                        title="Battery"

                                                        value={`${item.batteryLevel ?? "--"}%`}

                                                        color={batteryColor}

                                                    />

                                                    {/* Speed */}

                                                    <Metric

                                                        icon={<Gauge size={16} />}

                                                        title="Speed"

                                                        value={`${item.speed?.toFixed(1) ?? "--"} m/s`}

                                                    />

                                                    {/* Altitude */}

                                                    <Metric

                                                        icon={<Plane size={16} />}

                                                        title="Altitude"

                                                        value={`${item.altitude?.toFixed(1) ?? "--"} m`}

                                                    />

                                                    {/* Signal */}

                                                    <Metric

                                                        icon={<Radio size={16} />}

                                                        title="Signal"

                                                        value={`${item.signalStrength ?? "--"}%`}

                                                    />

                                                </div>

                                                {/* Battery Bar */}

                                                <div className="mt-5">

                                                    <div className="mb-2 flex items-center justify-between text-xs">

                                                        <span className="text-gray-500">

                                                            Battery Health

                                                        </span>

                                                        <span className={batteryColor}>

                                                            {item.batteryLevel ?? "--"}%

                                                        </span>

                                                    </div>

                                                    <div className="h-2 overflow-hidden rounded-full bg-[#222]">

                                                        <div

                                                            className={`h-full ${batteryBg}`}

                                                            style={{

                                                                width: `${item.batteryLevel ?? 0}%`

                                                            }}

                                                        />

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    );

                                })

                            }

                        </div>

                    </div>

                )

            }

        </div>

    );

}

function Metric({

    icon,

    title,

    value,

    color = "text-white"

}) {

    return (

        <div className="rounded-lg border border-[#262626] bg-[#151515] p-4">

            <div className="mb-2 flex items-center gap-2 text-[var(--aerion-primary)]">

                {icon}

                <span className="text-xs uppercase tracking-[0.2em] text-gray-500">

                    {title}

                </span>

            </div>

            <h3 className={`text-lg font-bold ${color}`}>

                {value}

            </h3>

        </div>

    );

}

export default TelemetryHistory;