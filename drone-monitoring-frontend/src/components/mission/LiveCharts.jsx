import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import {
    BatteryCharging,
    Gauge,
    Plane
} from "lucide-react";

import { useEffect, useState } from "react";

function LiveCharts({ telemetry }) {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        if (!telemetry) return;

        setHistory(prev => {

            const updated = [

                ...prev,

                {

                    time: new Date().toLocaleTimeString(),

                    battery: telemetry.batteryLevel,

                    altitude: telemetry.altitude,

                    speed: telemetry.speed

                }

            ];

            if (updated.length > 30) {

                updated.shift();

            }

            return updated;

        });

    }, [telemetry]);

    function CustomTooltip({

        active,

        payload,

        label

    }) {

        if (

            active &&

            payload &&

            payload.length

        ) {

            return (

                <div className="rounded-xl border border-[#333] bg-[#111111] p-4 shadow-xl">

                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-gray-400">

                        {label}

                    </p>

                    {

                        payload.map(item => (

                            <div

                                key={item.name}

                                className="flex items-center justify-between gap-8 py-1"

                            >

                                <span

                                    style={{

                                        color: item.color

                                    }}

                                >

                                    {item.name}

                                </span>

                                <span className="font-bold text-white">

                                    {item.value}

                                </span>

                            </div>

                        ))

                    }

                </div>

            );

        }

        return null;

    }

    return (

        <div className="rounded-2xl border border-[#262626] bg-[#111111]">

            {/* Header */}

            <div className="border-b border-[#262626] p-6">

                <h2 className="text-2xl font-bold text-white">

                    Telemetry Analytics

                </h2>

                <p className="mt-1 text-gray-400">

                    Live aircraft performance

                </p>

            </div>

            {/* KPI */}

            <div className="grid grid-cols-3 gap-4 p-6">

                <StatCard

                    icon={<BatteryCharging size={20}/>}

                    title="Battery"

                    value={

                        telemetry

                            ? `${telemetry.batteryLevel}%`

                            : "--"

                    }

                    color="text-green-400"

                />

                <StatCard

                    icon={<Plane size={20}/>}

                    title="Altitude"

                    value={

                        telemetry

                            ? `${telemetry.altitude?.toFixed(1)} m`

                            : "--"

                    }

                    color="text-sky-400"

                />

                <StatCard

                    icon={<Gauge size={20}/>}

                    title="Speed"

                    value={

                        telemetry

                            ? `${telemetry.speed?.toFixed(1)} m/s`

                            : "--"

                    }

                    color="text-[#D4AF37]"

                />

            </div>

            {/* Charts */}

            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">

                                {/* Battery */}

                <ChartCard title="Battery">

                    <ResponsiveContainer
                        width="100%"
                        height={220}
                    >

                        <AreaChart data={history}>

                            <defs>

                                <linearGradient id="batteryFill">

                                    <stop
                                        offset="0%"
                                        stopColor="#22C55E"
                                        stopOpacity={0.7}
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#22C55E"
                                        stopOpacity={0}
                                    />

                                </linearGradient>

                            </defs>

                            <CartesianGrid
                                stroke="#262626"
                                strokeDasharray="3 3"
                            />

                            <XAxis

                                dataKey="time"

                                tick={{

                                    fill: "#888"

                                }}

                            />

                            <YAxis

                                tick={{

                                    fill: "#888"

                                }}

                            />

                            <Tooltip

                                content={<CustomTooltip />}

                            />

                            <Area

                                type="monotone"

                                dataKey="battery"

                                stroke="#22C55E"

                                strokeWidth={3}

                                fill="url(#batteryFill)"

                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </ChartCard>

                {/* Altitude */}

                <ChartCard title="Altitude">

                    <ResponsiveContainer
                        width="100%"
                        height={220}
                    >

                        <AreaChart data={history}>

                            <defs>

                                <linearGradient id="altitudeFill">

                                    <stop
                                        offset="0%"
                                        stopColor="#3B82F6"
                                        stopOpacity={0.7}
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#3B82F6"
                                        stopOpacity={0}
                                    />

                                </linearGradient>

                            </defs>

                            <CartesianGrid
                                stroke="#262626"
                                strokeDasharray="3 3"
                            />

                            <XAxis

                                dataKey="time"

                                tick={{

                                    fill: "#888"

                                }}

                            />

                            <YAxis

                                tick={{

                                    fill: "#888"

                                }}

                            />

                            <Tooltip

                                content={<CustomTooltip />}

                            />

                            <Area

                                type="monotone"

                                dataKey="altitude"

                                stroke="#3B82F6"

                                strokeWidth={3}

                                fill="url(#altitudeFill)"

                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </ChartCard>

                {/* Speed */}

                <ChartCard title="Speed">

                    <ResponsiveContainer
                        width="100%"
                        height={220}
                    >

                        <AreaChart data={history}>

                            <defs>

                                <linearGradient id="speedFill">

                                    <stop
                                        offset="0%"
                                        stopColor="#D4AF37"
                                        stopOpacity={0.8}
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#D4AF37"
                                        stopOpacity={0}
                                    />

                                </linearGradient>

                            </defs>

                            <CartesianGrid
                                stroke="#262626"
                                strokeDasharray="3 3"
                            />

                            <XAxis

                                dataKey="time"

                                tick={{

                                    fill: "#888"

                                }}

                            />

                            <YAxis

                                tick={{

                                    fill: "#888"

                                }}

                            />

                            <Tooltip

                                content={<CustomTooltip />}

                            />

                            <Area

                                type="monotone"

                                dataKey="speed"

                                stroke="#D4AF37"

                                strokeWidth={3}

                                fill="url(#speedFill)"

                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </ChartCard>

            </div>

                        {/* Footer */}

            <div className="border-t border-[#262626] bg-[#0D0D0D] p-5">

                <div className="flex items-center justify-between">

                    <span className="text-sm text-gray-400">

                        Last Update

                    </span>

                    <span className="font-semibold text-[#D4AF37]">

                        {

                            history.length

                                ? history[history.length - 1].time

                                : "--"

                        }

                    </span>

                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#222]">

                    <div

                        className="h-full rounded-full bg-[#D4AF37] transition-all duration-500"

                        style={{

                            width: `${Math.min(

                                history.length * 3.33,

                                100

                            )}%`

                        }}

                    />

                </div>

                <div className="mt-3 flex items-center justify-between text-sm">

                    <span className="text-gray-500">

                        Buffer Size

                    </span>

                    <span className="font-semibold text-white">

                        {history.length} / 30 Samples

                    </span>

                </div>

            </div>

        </div>

    );

}

/* ======================================================

                    KPI CARD

====================================================== */

function StatCard({

    icon,

    title,

    value,

    color

}) {

    return (

        <div className="rounded-xl border border-[#262626] bg-[#0D0D0D] p-5">

            <div className={`mb-3 flex items-center gap-2 ${color}`}>

                {icon}

                <span className="text-xs uppercase tracking-[0.2em]">

                    {title}

                </span>

            </div>

            <h2 className="text-2xl font-bold text-white">

                {value}

            </h2>

        </div>

    );

}

/* ======================================================

                    CHART CARD

====================================================== */

function ChartCard({

    title,

    children

}) {

    return (

        <div className="rounded-xl border border-[#262626] bg-[#0D0D0D] p-4">

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">

                {title}

            </h3>

            {children}

        </div>

    );

}

export default LiveCharts;