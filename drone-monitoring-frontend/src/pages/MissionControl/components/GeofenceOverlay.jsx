import { Circle } from "react-leaflet";

function GeofenceOverlay(){

return(

<Circle

center={[22.7196,75.8577]}

radius={600}

pathOptions={{

color:"#22C55E",

weight:3,

fillOpacity:0.08

}}

/>

);

}

export default GeofenceOverlay;