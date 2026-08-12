import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

function getStatusColor(status) {

    switch ((status || "").toUpperCase()) {

        case "FLYING":
            return "#22C55E";

        case "ACTIVE":
            return "#22C55E";

        case "IDLE":
            return "#3B82F6";

        case "WARNING":
            return "#F59E0B";

        case "OFFLINE":
            return "#EF4444";

        default:
            return "#22D3EE";

    }

}

function createDroneIcon(drone, selected) {

    const color = getStatusColor(drone.status);

    const glow = selected ? 40 : 24;

    const ring = selected ? 42 : 34;

    return L.divIcon({

        className: "",

        iconSize: [72, 72],

        iconAnchor: [36, 36],

        popupAnchor: [0, -30],

        html: `

<div
style="
position:relative;
width:72px;
height:72px;
display:flex;
justify-content:center;
align-items:center;
pointer-events:none;
">

    ${selected
                ?

                `
<div
style="
position:absolute;
width:58px;
height:58px;
border-radius:50%;
border:2px solid ${color};
animation:aerionPulse 2s infinite;
">
</div>
`
                :
                ""
            }

<div
style="
position:absolute;
width:${ring}px;
height:${ring}px;
border-radius:50%;
background:#090909;
border:2px solid ${color};
box-shadow:
0 0 12px ${color},
0 0 ${glow}px ${color};
">
</div>

<div
style="
position:absolute;
transform:rotate(${drone.heading || 0}deg);
transition:transform .45s cubic-bezier(.22,.61,.36,1);
">

<svg
width="34"
height="34"
viewBox="0 0 64 64"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>

<path

d="M32 3
L38 22
L56 30
L38 36
L32 61
L26 36
L8 30
L26 22Z"

fill="${color}"

stroke="white"

stroke-width="2"

stroke-linejoin="round"

/>

<circle

cx="32"

cy="30"

r="5"

fill="#ffffff"

/>

</svg>

</div>

<div

style="
position:absolute;
top:-6px;
left:50%;
transform:translateX(-50%);
padding:2px 7px;
border-radius:999px;
background:rgba(8,8,8,.95);
border:1px solid ${color};
font-size:10px;
font-weight:700;
letter-spacing:.12em;
color:white;
white-space:nowrap;
"

>

${drone.serialNumber ?? drone.id}

</div>

<div

style="
position:absolute;
bottom:-8px;
left:50%;
transform:translateX(-50%);
padding:2px 6px;
border-radius:999px;
background:${color}20;
border:1px solid ${color};
font-size:10px;
font-weight:600;
color:${color};
"

>

${Math.round(drone.altitude ?? 0)} m

</div>

<style>

@keyframes aerionPulse{

0%{

transform:scale(.9);
opacity:1;

}

70%{

transform:scale(1.45);
opacity:0;

}

100%{

transform:scale(1.45);
opacity:0;

}

}

</style>

</div>

`

    });

}
function DroneMarker({

    drone,

    selected,

    onClick

}) {

    const statusColor = getStatusColor(drone.status);

    const batteryColor =

        drone.battery > 70

            ? "#22C55E"

            : drone.battery > 35

            ? "#F59E0B"

            : "#EF4444";

    return (

        <Marker

            position={[

                drone.lat,

                drone.lng

            ]}

            icon={createDroneIcon(

                drone,

                selected

            )}

            eventHandlers={{

                click: onClick

            }}

        >

            <Popup

                closeButton={false}

                minWidth={260}

            >

                <div

                    className="
                    min-w-[260px]
                    overflow-hidden
                    rounded-2xl
                    bg-[#090909]
                    text-white
                    "

                >

                    {/* ===========================
                            HEADER
                    ============================ */}

                    <div

                        className="
                        border-b
                        border-white/10
                        px-5
                        py-4
                        "

                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <h3 className="text-lg font-bold">

                                    {

                                        drone.name ||

                                        "Drone"

                                    }

                                </h3>

                                <p className="text-xs text-gray-500">

                                    {

                                        drone.serialNumber

                                    }

                                </p>

                            </div>

                            <div

                                className="
                                rounded-full
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                "

                                style={{

                                    background:

                                    `${statusColor}20`,

                                    color:

                                    statusColor,

                                    border:

                                    `1px solid ${statusColor}`

                                }}

                            >

                                {drone.status}

                            </div>

                        </div>

                    </div>

                    {/* ===========================
                            BATTERY
                    ============================ */}

                    <div className="px-5 pt-4">

                        <div className="mb-2 flex justify-between">

                            <span className="text-sm text-gray-400">

                                Battery

                            </span>

                            <span

                                style={{

                                    color:

                                    batteryColor

                                }}

                                className="font-semibold"

                            >

                                {drone.battery}%

                            </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[#202020]">

                            <div

                                className="h-full rounded-full"

                                style={{

                                    width:

                                    `${drone.battery}%`,

                                    background:

                                    batteryColor

                                }}

                            />

                        </div>

                    </div>

                    {/* ===========================
                            TELEMETRY
                    ============================ */}

                    <div

                        className="
                        grid
                        grid-cols-2
                        gap-4
                        px-5
                        py-5
                        text-sm
                        "

                    >

                        <Info

                            title="Altitude"

                            value={`${Math.round(

                                drone.altitude

                            )} m`}

                        />

                        <Info

                            title="Speed"

                            value={`${drone.speed.toFixed(

                                1

                            )} m/s`}

                        />

                        <Info

                            title="Heading"

                            value={`${Math.round(

                                drone.heading

                            )}°`}

                        />

                        <Info

                            title="Signal"

                            value={`${drone.signal}%`}

                        />

                    </div>

                </div>

            </Popup>

        </Marker>

    );

}

function Info({

    title,

    value

}){

    return(

        <div>

            <div className="text-xs uppercase tracking-[0.18em] text-gray-500">

                {title}

            </div>

            <div className="mt-1 font-semibold">

                {value}

            </div>

        </div>

    );

}

export default DroneMarker;