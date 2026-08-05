function TelemetryCard({

    title,

    value,

    unit,

    color = "#D4AF37",

    children

}) {

    return (

        <div
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-[#262626]
                bg-gradient-to-br
                from-[#181818]
                via-[#141414]
                to-[#101010]
                p-5
                transition-all
                duration-300
                hover:border-[#3a3a3a]
                hover:-translate-y-1
            "
        >

            {/* Glow */}

            <div
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl opacity-20"
                style={{
                    background: color
                }}
            />

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">

                        {title}

                    </p>

                    <div className="mt-3 flex items-end gap-2 flex-wrap">

                        <span
                            className="text-.3xl font-bold leading-none transition-colors duration-300"
                            style={{
                                color
                            }}
                        >
                            {typeof value === "number"
                                ? Number.isInteger(value)
                                    ? value
                                    : value.toFixed(2)
                                : value}
                        </span>

                        <span className="mb-1 text-base text-gray-400 whitespace-nowrap">
                            {unit}

                        </span>

                    </div>

                </div>

                <div
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[#2f2f2f]
                        bg-[#1f1f1f]
                        transition-all
                        duration-300
                        group-hover:scale-110
                    "
                >

                    {children}

                </div>

            </div>

            {/* Progress */}

            <div className="mt-5">

                <div className="h-2 overflow-hidden rounded-full bg-[#242424]">

                    <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                            width: `${Math.max(
                                0,
                                Math.min(Number(value), 100)
                            )}%`,
                            background: color,
                            boxShadow: `0 0 18px ${color}`
                        }}
                    />

                </div>

            </div>

        </div>

    );

}

export default TelemetryCard;