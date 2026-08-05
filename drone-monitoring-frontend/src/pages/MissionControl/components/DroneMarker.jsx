import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

function getStatusColor(status) {

    switch ((status || "").toUpperCase()) {

        case "FLYING":
            return "#22C55E";

        case "IDLE":
            return "#3B82F6";

        case "WARNING":
            return "#F59E0B";

        case "OFFLINE":
            return "#EF4444";

        default:
            return "#D4AF37";
    }

}

function createDroneIcon(drone, selected) {

    const color = getStatusColor(drone.status);

    return L.divIcon({

        className: "",

        html: `
        <div
            style="
                position:relative;
                width:30px;
                height:30px;
                display:flex;
                justify-content:center;
                align-items:center;
                transform:rotate(${drone.heading || 0}deg);
                transition:transform .25s ease;
            "
        >

            <div
                style="
                    position:absolute;
                    width:${selected ? 30 : 22}px;
                    height:${selected ? 30 : 22}px;
                    border-radius:50%;
                    border:2px solid ${color};
                    background:#101010;
                    box-shadow:
                        0 0 8px ${color},
                        0 0 18px ${color};
                "
            ></div>

            <div
                style="
                    position:absolute;
                    width:10px;
                    height:10px;
                    border-radius:50%;
                    background:white;
                    border:3px solid ${color};
                "
            ></div>

            <div
                style="
                    position:absolute;
                    top:-8px;
                    width:0;
                    height:0;
                    border-left:5px solid transparent;
                    border-right:5px solid transparent;
                    border-bottom:10px solid ${color};
                "
            ></div>

        </div>
        `,

        iconSize: [30, 30],

        iconAnchor: [15, 15]

    });

}

function DroneMarker({

    drone,

    selected,

    onClick

}) {

    return (

        <Marker

            position={[drone.lat, drone.lng]}

            icon={createDroneIcon(drone, selected)}

            eventHandlers={{

                click: onClick

            }}

        >

            <Popup>

                <div className="min-w-[210px] space-y-3">

                    <div>

                        <div className="font-bold text-base">

                            {drone.name}

                        </div>

                        <div className="text-xs text-gray-500">

                            {drone.serialNumber}

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-y-2 text-sm">

                        <span>Battery</span>
                        <span>{drone.battery}%</span>

                        <span>Altitude</span>
                        <span>{drone.altitude} m</span>

                        <span>Speed</span>
                        <span>{drone.speed} m/s</span>

                        <span>Heading</span>
                        <span>{Math.round(drone.heading)}°</span>

                        <span>Status</span>
                        <span>{drone.status}</span>

                    </div>

                </div>

            </Popup>

        </Marker>

    );

}

export default DroneMarker;