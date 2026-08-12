import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    MapContainer,
    TileLayer,
    Polyline
} from "react-leaflet";

import {
    MapPinned,
    Activity,
    Radio,
    Plane,
    BatteryCharging,
    Gauge
} from "lucide-react";

import DroneMarker from "./DroneMarker";
import MapController from "./MapController";

function LiveDroneMap({

    telemetryMap,

    selectedDroneId,

    onSelectDrone,

    replayTrail

}) {

    const [trails, setTrails] = useState({});

    const initialCenter = [22.7533, 75.8937];

    const selectedTelemetry = useMemo(() => {

        if (!selectedDroneId) {

            return null;

        }

        return telemetryMap[selectedDroneId] ?? null;

    }, [

        telemetryMap,

        selectedDroneId

    ]);

    /*
    ===========================================
            LIVE TRAIL
    ===========================================
    */

    useEffect(() => {

        if (!selectedTelemetry) return;

        if (replayTrail && replayTrail.length > 0) {

            return;

        }

        setTrails(previous => {

            const currentTrail =

                previous[selectedDroneId] || [];

            const updatedTrail = [

                ...currentTrail,

                [

                    selectedTelemetry.latitude,

                    selectedTelemetry.longitude

                ]

            ];

            if (updatedTrail.length > 100) {

                updatedTrail.shift();

            }

            return {

                ...previous,

                [selectedDroneId]: updatedTrail

            };

        });

    }, [

        selectedTelemetry,

        selectedDroneId,

        replayTrail

    ]);

    /*
    ===========================================
            WHICH TRAIL TO DRAW?
    ===========================================
    */

    const trailToDraw =

        replayTrail && replayTrail.length > 0

            ? replayTrail

            : trails[selectedDroneId] || [];

    return (

        <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.4 }}

            className="
                overflow-hidden
                rounded-3xl
                border
                border-[#262626]
                bg-[#111111]
                transition-all
                hover:border-[#D4AF37]
            "

        >

            {/* Header */}

            <div className="flex items-center justify-between border-b border-[#262626] bg-[#0D0D0D] px-6 py-5">

                <div>

                    <p className="text-xs uppercase tracking-[0.35em] text-gray-500">

                        Mission Operations

                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white">

                        Live Navigation Map

                    </h2>

                </div>

                <div className="flex items-center gap-8">

                    <div>

                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">

                            Fleet

                        </p>

                        <h3 className="font-semibold text-white">

                            {Object.keys(telemetryMap).length} Active

                        </h3>

                    </div>

                    <div className="rounded-full border border-green-500/20 bg-green-500/10 px-5 py-2">

                        <span className="flex items-center gap-2 text-sm font-semibold text-green-500">

                            <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>

                            LIVE

                        </span>

                    </div>

                </div>

            </div>

            {/* Map */}

            <MapContainer

                center={initialCenter}

                zoom={17}

                scrollWheelZoom={true}

                style={{

                    height: "650px",

                    width: "100%"

                }}

            >

                <TileLayer

                    attribution="&copy; OpenStreetMap & CARTO"

                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"

                />

                {

                    selectedTelemetry && (

                        <MapController

                            telemetry={selectedTelemetry}

                        />

                    )

                }

                {

                    Object.values(telemetryMap).map(drone => (

                        <DroneMarker

                            key={drone.droneId}

                            telemetry={drone}

                            selected={

                                drone.droneId === selectedDroneId

                            }

                            onClick={() =>

                                onSelectDrone(

                                    drone.droneId

                                )

                            }

                        />

                    ))

                }

                {

                    trailToDraw.length > 1 && (

                        <Polyline

                            positions={trailToDraw}

                            pathOptions={{

                                color: "#D4AF37",

                                weight: 5,

                                opacity: 0.95,

                                lineCap: "round",

                                lineJoin: "round"

                            }}

                        />

                    )

                }

            </MapContainer>
                        {/* Bottom Telemetry Status */}

            <div className="grid grid-cols-2 border-t border-[#262626] bg-[#0D0D0D] md:grid-cols-5">

                <StatusItem
                    icon={<MapPinned size={18} className="text-[var(--aerion-primary)]" />}
                    title="Latitude"
                    value={
                        selectedTelemetry?.latitude?.toFixed(6) ?? "--"
                    }
                />

                <StatusItem
                    icon={<MapPinned size={18} className="text-[var(--aerion-primary)]" />}
                    title="Longitude"
                    value={
                        selectedTelemetry?.longitude?.toFixed(6) ?? "--"
                    }
                />

                <StatusItem
                    icon={<Plane size={18} className="text-blue-400" />}
                    title="Altitude"
                    value={
                        selectedTelemetry
                            ? `${selectedTelemetry.altitude?.toFixed(1) ?? "--"} m`
                            : "--"
                    }
                />

                <StatusItem
                    icon={<Gauge size={18} className="text-green-500" />}
                    title="Speed"
                    value={
                        selectedTelemetry
                            ? `${selectedTelemetry.speed?.toFixed(1) ?? "--"} m/s`
                            : "--"
                    }
                />

                <StatusItem
                    icon={<BatteryCharging size={18} className="text-[var(--aerion-primary)]" />}
                    title="Battery"
                    value={
                        selectedTelemetry
                            ? `${selectedTelemetry.batteryLevel}%`
                            : "--"
                    }
                />

            </div>

        </motion.div>

    );

}

function StatusItem({

    icon,

    title,

    value

}) {

    return (

        <div className="flex items-center gap-4 border-r border-[#222] p-5 last:border-r-0">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#333] bg-[#161616]">

                {icon}

            </div>

            <div>

                <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">

                    {title}

                </p>

                <h3 className="mt-1 text-lg font-semibold text-white">

                    {value}

                </h3>

            </div>

        </div>

    );

}

export default LiveDroneMap;