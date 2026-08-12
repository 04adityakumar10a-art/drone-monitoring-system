import {
    MapContainer,
    TileLayer,
    useMap
} from "react-leaflet";
import ReplayTrail from "./ReplayTrail";

import { useEffect } from "react";

import DroneMarker from "./DroneMarker";
import DronePathLayer from "./DronePathLayer";
import GeofenceOverlay from "./GeofenceOverlay";

import "leaflet/dist/leaflet.css";


function FollowSelectedDrone({ drone }) {

    const map = useMap();

    useEffect(() => {

        if (!drone) return;

        if (drone.lat == null || drone.lng == null) return;

        map.panTo(
            [drone.lat, drone.lng],
            {
                animate: true,
                duration: 0.35
            }
        );

    }, [drone, map]);

    return null;
}

function MissionMap({

    drones = [],
    selectedDrone,
    setSelectedDrone,
    replayTrail = []

}) {

    return (

        <div className="h-full w-full rounded-xl overflow-hidden border border-[#232323]">

            <MapContainer

                className="h-full w-full"

                center={[22.7196, 75.8577]}

                zoom={15}

                zoomControl={false}

            >

                <TileLayer

                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                />

                <GeofenceOverlay />

                <ReplayTrail
                    trail={replayTrail}
                />

                <FollowSelectedDrone
                    drone={selectedDrone}
                />

                <FollowSelectedDrone

                    drone={selectedDrone}

                />

                {

                    drones.map((drone) => (

                        <DronePathLayer

                            key={`path-${drone.id}`}

                            drone={drone}

                            selected={selectedDrone?.id === drone.id}

                        />

                    ))

                }

                {

                    drones.map((drone) => (

                        <DroneMarker
                            key={`marker-${drone.id}`}
                            drone={drone}
                            selected={selectedDrone?.id === drone.id}
                            onClick={() => setSelectedDrone(drone)}
                        />

                    ))
                }

            </MapContainer>

        </div>

    );

}

export default MissionMap;