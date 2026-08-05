import {

Gauge

} from "lucide-react";

import TelemetryCard from "./TelemetryCard";

function SpeedGauge({

value

}){

return(

<TelemetryCard

title="Speed"

value={value}

unit="m/s"

>

<Gauge

size={34}

color="#D4AF37"

/>

</TelemetryCard>

);

}

export default SpeedGauge;