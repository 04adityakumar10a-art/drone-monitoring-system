import {
    Sun,
    Wind,
    Droplets,
    Eye,
    ShieldCheck,
    ShieldAlert,
    CloudRain,
    Loader2,
    MapPin
} from "lucide-react";

import { motion } from "motion/react";

import GlassPanel from "../../../ui/Panel/GlassPanel";
import useWeather from "../../../hooks/useWeather";

function Row({

    icon,

    label,

    value

}) {

    return (

        <motion.div

            whileHover={{

                x:4

            }}

            className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-white/5
            bg-white/[0.03]
            px-4
            py-3
            "

        >

            <div className="flex items-center gap-3">

                {icon}

                <span className="text-gray-400">

                    {label}

                </span>

            </div>

            <span className="font-semibold">

                {value}

            </span>

        </motion.div>

    );

}

function WeatherWidget({

    drone

}) {

    const {

        weather,

        loading

    } = useWeather(

        drone?.lat,

        drone?.lng

    );

    if (!drone) return null;

    if (loading) {

        return (

            <GlassPanel

                glow

                className="p-6"

            >

                <div className="flex flex-col items-center gap-4 py-6">

                    <Loader2

                        size={28}

                        className="animate-spin text-cyan-400"

                    />

                    <p className="text-gray-400">

                        Fetching live weather...

                    </p>

                </div>

            </GlassPanel>

        );

    }

    if (!weather) {

        return (

            <GlassPanel

                glow

                className="p-6"

            >

                <div className="text-center">

                    <p className="text-gray-400">

                        Unable to load weather.

                    </p>

                </div>

            </GlassPanel>

        );

    }

    return (

        <GlassPanel

            glow

            className="relative overflow-hidden p-5"

        >

            {/* Ambient Glow */}

            <motion.div

                animate={{

                    opacity:[0.05,0.12,0.05]

                }}

                transition={{

                    repeat:Infinity,

                    duration:5

                }}

                className="absolute inset-0"

                style={{

                    background:

                    "radial-gradient(circle at top right, rgba(250,204,21,.08), transparent 70%)"

                }}

            />

            {/* Header */}

            <div className="relative z-10 flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <motion.div

                        animate={{

                            rotate:[0,8,0,-8,0]

                        }}

                        transition={{

                            repeat:Infinity,

                            duration:8

                        }}

                    >

                        <Sun

                            size={30}

                            className="text-yellow-400"

                        />

                    </motion.div>

                    <div>

                        <p className="text-[11px] uppercase tracking-[0.28em] text-gray-500">

                            Environment

                        </p>

                        <h3 className="mt-1 text-lg font-semibold">

                            Weather

                        </h3>

                    </div>

                </div>

                <div

                    className={`
                    flex
                    items-center
                    gap-2
                    rounded-full
                    px-3
                    py-1.5
                    text-xs
                    font-semibold

                    ${
                        weather.flightStatus==="SAFE"

                        ?

                        "bg-green-500/15 text-green-400"

                        :

                        "bg-red-500/15 text-red-400"

                    }
                    `}

                >

                    {

                        weather.flightStatus==="SAFE"

                        ?

                        <ShieldCheck size={15}/>

                        :

                        <ShieldAlert size={15}/>

                    }

                    {weather.flightStatus}

                </div>

            </div>

            {/* Temperature */}

            <div className="mt-6 flex items-end justify-between">

                <div>

                    <motion.div

                        key={weather.temperature}

                        initial={{

                            scale:.9,

                            opacity:0

                        }}

                        animate={{

                            scale:1,

                            opacity:1

                        }}

                        className="text-5xl font-bold"

                    >

                        {weather.temperature}°

                    </motion.div>

                    <p className="mt-1 text-gray-500">

                        {weather.weather}

                    </p>

                </div>

                <MapPin

                    className="text-cyan-400"

                    size={24}

                />

            </div>

            {/* Divider */}

            <div className="my-6 h-px bg-white/5"/>

            {/* Details */}

            <div className="space-y-3">

                <Row

                    icon={<Wind className="text-sky-400" size={18}/>}

                    label="Wind"

                    value={`${weather.windSpeed} km/h`}

                />

                <Row

                    icon={<Droplets className="text-cyan-400" size={18}/>}

                    label="Humidity"

                    value={`${weather.humidity}%`}

                />

                <Row

                    icon={<Eye className="text-green-400" size={18}/>}

                    label="Visibility"

                    value={`${weather.visibility} km`}

                />

                <Row

                    icon={<CloudRain className="text-indigo-400" size={18}/>}

                    label="Condition"

                    value={weather.weather}

                />

            </div>

        </GlassPanel>

    );

}

export default WeatherWidget;