import { Polyline } from "react-leaflet";

function DronePathLayer({

    drone,

    selected = false

}) {

    if (

        !drone?.path ||

        drone.path.length < 2

    ) {

        return null;

    }

    const color =

        selected

            ? "#22323b"

            : "#6B7280";

    return (

        <>

            {/* Glow */}

            <Polyline

                positions={drone.path}

                pathOptions={{

                    color,

                    weight: 10,

                    opacity: 0.18,

                    lineCap: "round",

                    lineJoin: "round"

                }}

            />

            {/* Main Path */}

            <Polyline

                positions={drone.path}

                pathOptions={{

                    color,

                    weight: selected ? 5 : 3,

                    opacity: selected ? 1 : 0.6,

                    lineCap: "round",

                    lineJoin: "round"

                }}

            />

        </>

    );

}

export default DronePathLayer;