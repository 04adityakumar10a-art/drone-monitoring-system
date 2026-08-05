import { Polyline } from "react-leaflet";

function DronePathLayer({ drone }) {

    if (!drone?.path || drone.path.length < 2) {

        return null;

    }

    return (

        <Polyline

            positions={drone.path}

            pathOptions={{

                color: "#D4AF37",

                weight: 4,

                opacity: 0.85,

                lineCap: "round",

                lineJoin: "round"

            }}

        />

    );

}

export default DronePathLayer;