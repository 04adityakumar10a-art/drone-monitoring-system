import { Wifi } from "lucide-react";
import TelemetryCard from "./TelemetryCard";

function SignalGauge({ value }) {

    const color =
        value > 80
            ? "#22C55E"
            : value > 50
            ? "#F59E0B"
            : "#EF4444";

    return (

        <TelemetryCard
            title="Signal Strength"
            value={value}
            unit="%"
            color={color}
        >
            <Wifi
                size={34}
                color={color}
            />
        </TelemetryCard>

    );

}

export default SignalGauge;