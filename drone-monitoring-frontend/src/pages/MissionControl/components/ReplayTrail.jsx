import { Polyline } from "react-leaflet";

function ReplayTrail({ trail = [] }) {

    if (trail.length < 2) return null;

    return (
        <Polyline
            positions={trail}
            pathOptions={{
                color: "#00E5FF",
                weight: 5,
                opacity: 1
            }}
        />
    );
}

export default ReplayTrail;