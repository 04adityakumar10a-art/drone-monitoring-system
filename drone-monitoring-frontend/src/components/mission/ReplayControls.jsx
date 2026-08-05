import {
    Play,
    Pause,
    Square,
    Gauge,
    Film,
    Activity
} from "lucide-react";

function ReplayControls({

    play,

    pause,

    stop,

    playing,

    speed,

    setSpeed

}) {

    const speeds = [1, 2, 4, 8];

    return (

        <div className="rounded-2xl border border-[#262626] bg-[#111111]">

            {/* Header */}

            <div className="border-b border-[#262626] p-6">

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-bold text-white">

                            Mission Replay

                        </h2>

                        <p className="mt-1 text-sm text-gray-400">

                            Playback recorded telemetry

                        </p>

                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-[#262626] bg-[#0D0D0D] px-3 py-2">

                        <Activity

                            size={14}

                            className={

                                playing

                                    ? "animate-pulse text-green-400"

                                    : "text-gray-500"

                            }

                        />

                        <span

                            className={`text-xs font-semibold ${

                                playing

                                    ? "text-green-400"

                                    : "text-gray-500"

                            }`}

                        >

                            {

                                playing

                                    ? "PLAYING"

                                    : "STOPPED"

                            }

                        </span>

                    </div>

                </div>

            </div>

            {/* Controls */}

            <div className="grid grid-cols-3 gap-4 p-6">

                <button

                    onClick={play}

                    disabled={playing}

                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"

                >

                    <Play size={18} />

                    PLAY

                </button>

                <button

                    onClick={pause}

                    disabled={!playing}

                    className="flex items-center justify-center gap-2 rounded-xl bg-yellow-600 py-4 font-semibold text-white transition hover:bg-yellow-700 disabled:cursor-not-allowed disabled:opacity-40"

                >

                    <Pause size={18} />

                    PAUSE

                </button>

                <button

                    onClick={stop}

                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-4 font-semibold text-white transition hover:bg-red-700"

                >

                    <Square size={18} />

                    STOP

                </button>

            </div>

            {/* Speed */}

            <div className="border-t border-[#262626] p-6">

                <div className="mb-4 flex items-center gap-2">

                    <Gauge

                        size={18}

                        className="text-[#D4AF37]"

                    />

                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">

                        Replay Speed

                    </span>

                </div>

                <div className="grid grid-cols-4 gap-3">

                    {

                        speeds.map(rate => (

                            <button

                                key={rate}

                                onClick={() => setSpeed(rate)}

                                className={`rounded-xl border py-3 text-sm font-semibold transition-all ${

                                    speed === rate

                                        ? "border-[#D4AF37] bg-[#1A1A1A] text-[#D4AF37]"

                                        : "border-[#262626] bg-[#0D0D0D] text-gray-300 hover:border-[#444]"

                                }`}

                            >

                                {rate}×

                            </button>

                        ))

                    }

                </div>

            </div>

            {/* Footer */}

            <div className="border-t border-[#262626] bg-[#0D0D0D] p-5">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 text-gray-400">

                        <Film size={16} />

                        Replay Engine

                    </div>

                    <span className="font-semibold text-[#D4AF37]">

                        {speed}× Speed

                    </span>

                </div>

            </div>

        </div>

    );

}

export default ReplayControls;