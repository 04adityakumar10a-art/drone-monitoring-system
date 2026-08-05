function StatusRibbon() {

    return (

        <div className="flex gap-3">

            <Badge text="GPS LOCKED" color="bg-green-600"/>

            <Badge text="RTK ACTIVE" color="bg-blue-600"/>

            <Badge text="LTE CONNECTED" color="bg-yellow-600"/>

            <Badge text="MISSION RUNNING" color="bg-[#D4AF37] text-black"/>

        </div>

    );

}

function Badge({

    text,

    color

}) {

    return (

        <div className={`${color} rounded-full px-4 py-2 text-xs font-bold text-white`}>

            {text}

        </div>

    );

}

export default StatusRibbon;