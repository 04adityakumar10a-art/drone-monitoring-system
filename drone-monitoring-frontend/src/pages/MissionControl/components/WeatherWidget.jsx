import {
    Sun,
    Wind,
    Droplets,
    Eye,
    ShieldCheck,
    ShieldAlert,
    CloudRain,
    Loader2
} from "lucide-react";

import useWeather from "../../../hooks/useWeather";

function Row({ icon, label, value }) {

    return (

        <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

                {icon}

                <span className="text-gray-400">

                    {label}

                </span>

            </div>

            <span className="font-semibold text-white">

                {value}

            </span>

        </div>

    );

}

function WeatherWidget({ drone }) {

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

            <div className="rounded-2xl border border-[#262626] bg-[#1A1A1A] p-5">

                <div className="flex items-center justify-center gap-3 py-8">

                    <Loader2
                        size={22}
                        className="animate-spin text-cyan-400"
                    />

                    <span className="text-gray-400">

                        Loading Weather...

                    </span>

                </div>

            </div>

        );

    }

    if (!weather) {

        return (

            <div className="rounded-2xl border border-[#262626] bg-[#1A1A1A] p-5">

                <p className="text-center text-gray-400">

                    Unable to load weather.

                </p>

            </div>

        );

    }

    return (

        <div className="rounded-2xl border border-[#262626] bg-[#1A1A1A] p-5">

            <div className="mb-5 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <Sun
                        className="text-yellow-400"
                        size={28}
                    />

                    <div>

                        <h2 className="font-bold text-white">

                            Weather

                        </h2>

                        <p className="text-sm text-gray-500">

                            {weather.weather}

                        </p>

                    </div>

                </div>

                <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        weather.flightStatus === "SAFE"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                    }`}
                >

                    {weather.flightStatus === "SAFE"

                        ? <div className="flex items-center gap-1">

                            <ShieldCheck size={14}/>

                            SAFE

                        </div>

                        : <div className="flex items-center gap-1">

                            <ShieldAlert size={14}/>

                            {weather.flightStatus}

                        </div>

                    }

                </div>

            </div>

            <div className="space-y-4">

                <Row

                    icon={<Sun size={18} className="text-yellow-400"/>}

                    label="Temperature"

                    value={`${weather.temperature} °C`}

                />

                <Row

                    icon={<Wind size={18} className="text-blue-400"/>}

                    label="Wind"

                    value={`${weather.windSpeed} km/h`}

                />

                <Row

                    icon={<Droplets size={18} className="text-cyan-400"/>}

                    label="Humidity"

                    value={`${weather.humidity}%`}

                />

                <Row

                    icon={<Eye size={18} className="text-green-400"/>}

                    label="Visibility"

                    value={`${weather.visibility} km`}

                />

                <Row

                    icon={<CloudRain size={18} className="text-indigo-400"/>}

                    label="Condition"

                    value={weather.weather}

                />

            </div>

        </div>

    );

}

export default WeatherWidget;