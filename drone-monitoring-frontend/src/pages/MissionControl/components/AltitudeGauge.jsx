import {

Mountain

} from "lucide-react";

import TelemetryCard from "./TelemetryCard";

function AltitudeGauge({

value

}){

return(

<TelemetryCard

title="Altitude"

value={value}

unit="m"

>

<Mountain

size={34}

color="#D4AF37"

/>

</TelemetryCard>

);

}

export default AltitudeGauge;