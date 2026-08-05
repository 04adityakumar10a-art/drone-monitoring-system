function CircularGauge({

    title,

    value,

    unit,

    color,

    icon,

    max = 100

}) {

    const radius = 46;

    const stroke = 8;

    const circumference = 2 * Math.PI * radius;

    const progress = Math.min(value, max);

    const offset =
        circumference -
        (progress / max) * circumference;

    return (

        <div className="rounded-2xl border border-[#262626] bg-[#171717] p-5 flex flex-col items-center">

            <div className="mb-3 text-sm text-gray-400">

                {title}

            </div>

            <div className="relative h-32 w-32">

                <svg
                    className="-rotate-90"
                    width="128"
                    height="128"
                >

                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke="#2A2A2A"
                        strokeWidth={stroke}
                        fill="none"
                    />

                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke={color}
                        strokeWidth={stroke}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{
                            transition:
                                "stroke-dashoffset .6s ease"
                        }}
                    />

                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                    {icon}

                    <div
                        className="mt-2 text-3xl font-bold"
                        style={{ color }}
                    >
                        {Math.round(value)}
                    </div>

                    <div className="text-xs text-gray-400">

                        {unit}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CircularGauge;