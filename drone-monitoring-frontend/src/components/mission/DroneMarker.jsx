import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";
import { renderToString } from "react-dom/server";

function DroneMarker({

    telemetry,

    selected,

    onClick

}) {

    const battery = telemetry?.batteryLevel ?? 0;

    let color = "#22C55E";

    if (battery < 50) color = "#F59E0B";

    if (battery < 20) color = "#EF4444";

    if (selected) {

        color = "#D4AF37";

    }

    const icon = useMemo(() => {

        return L.divIcon({

            className: "",

            html: renderToString(

                <div
                    style={{
                        position: "relative",
                        width: "74px",
                        height: "74px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >

                    {/* Radar Pulse */}

                    <div

                        style={{

                            position: "absolute",

                            width: "62px",

                            height: "62px",

                            borderRadius: "50%",

                            border: `2px solid ${color}`,

                            opacity: 0.35,

                            animation: "pulse 2s infinite"

                        }}

                    />

                    {/* Selection Ring */}

                    {

                        selected && (

                            <div

                                style={{

                                    position: "absolute",

                                    width: "52px",

                                    height: "52px",

                                    borderRadius: "50%",

                                    border: "2px solid #D4AF37",

                                    boxShadow:

                                        "0 0 18px rgba(212,175,55,.7)"

                                }}

                            />

                        )

                    }

                    {/* Aircraft */}

                    <div

                        style={{

                            transform:

                                `rotate(${telemetry.heading}deg)`,

                            transition: "0.25s",

                            zIndex: 5

                        }}

                    >

                        <svg

                            xmlns="http://www.w3.org/2000/svg"

                            width="34"

                            height="34"

                            fill={color}

                            viewBox="0 0 24 24"

                        >

                            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9L2 14v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z"/>

                        </svg>

                    </div>

                    {/* Drone ID */}

                    <div

                        style={{

                            position: "absolute",

                            top: "62px",

                            background: "#111111",

                            color: "white",

                            fontSize: "10px",

                            padding: "2px 8px",

                            borderRadius: "999px",

                            border: "1px solid #333",

                            fontWeight: 600,

                            whiteSpace: "nowrap"

                        }}

                    >

                        D-{telemetry.droneId}

                    </div>

                </div>

            ),

            iconSize: [74, 74],

            iconAnchor: [37, 37]

        });

    }, [

        telemetry.heading,

        telemetry.droneId,

        battery,

        selected,

        color

    ]);

    return (

        <Marker

            position={[

                telemetry.latitude,

                telemetry.longitude

            ]}

            icon={icon}

            eventHandlers={{

                click() {

                    onClick?.();

                }

            }}

        >

            <Popup>

                <div className="min-w-[220px] space-y-3">

                    <div>

                        <h2 className="text-lg font-bold">

                            Drone {telemetry.droneId}

                        </h2>

                        <p className="text-sm text-gray-500">

                            Live Aircraft Status

                        </p>

                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">

                        <div>

                            🔋 {telemetry.batteryLevel}%

                        </div>

                        <div>

                            📶 {telemetry.signalStrength}%

                        </div>

                        <div>

                            🚀 {telemetry.speed?.toFixed(1)} m/s

                        </div>

                        <div>

                            📏 {telemetry.altitude?.toFixed(1)} m

                        </div>

                        <div>

                            🧭 {telemetry.heading?.toFixed(0)}°

                        </div>

                        <div>

                            🛰 LIVE

                        </div>

                    </div>

                </div>

            </Popup>

        </Marker>

    );

}

export default DroneMarker;