import { useMap } from "react-leaflet";
import { useEffect } from "react";

function MapController({ telemetry }) {

    const map = useMap();

    useEffect(() => {

        if (!telemetry) return;

        map.flyTo(

            [

                telemetry.latitude,

                telemetry.longitude

            ],

            map.getZoom(),

            {

                duration:1

            }

        );

    }, [telemetry]);

    return null;

}

export default MapController;