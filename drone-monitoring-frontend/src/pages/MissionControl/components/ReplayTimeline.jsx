import {
    Play,
    Pause,
    RotateCcw,
    SkipBack,
    SkipForward
} from "lucide-react";

function ReplayTimeline({

    playing,

    play,

    pause,

    stop,

    speed,

    setSpeed,

    currentIndex,

    totalFrames,

    seek,

    skipForward,

    skipBackward

}) {

    return (

        <div className="h-20 bg-[#0b0b0b] border-t border-[#232323] px-5 flex items-center gap-6">

            <div className="flex items-center gap-3">

                <button
                    onClick={stop}
                    className="p-2 rounded-lg bg-[#171717] hover:bg-[#222]"
                >
                    <RotateCcw size={18} />
                </button>

                <button
                    onClick={() => skipBackward(10)}
                    className="p-2 rounded-lg bg-[#171717] hover:bg-[#222]"
                >
                    <SkipBack size={18} />
                </button>

                <button
                    onClick={playing ? pause : play}
                    className="p-3 rounded-full bg-[#D4AF37] text-black"
                >
                    {playing
                        ? <Pause size={20} />
                        : <Play size={20} />
                    }
                </button>

                <button
                    onClick={() => skipForward(10)}
                    className="p-2 rounded-lg bg-[#171717] hover:bg-[#222]"
                >
                    <SkipForward size={18} />
                </button>

            </div>

            <div className="flex-1 flex flex-col gap-2">

                <input
                    type="range"
                    min={0}
                    max={Math.max(totalFrames - 1, 0)}
                    value={currentIndex}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="w-full h-2 rounded-full accent-[#D4AF37] cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-gray-500">

                    <span>Start</span>

                    <span>
                        {currentIndex + 1} / {totalFrames}
                    </span>

                    <span>End</span>

                </div>

            </div>
            <select

                value={speed}

                onChange={(e) => setSpeed(Number(e.target.value))}

                className="bg-[#171717] border border-[#2b2b2b] rounded-lg px-3 py-2"

            >

                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={4}>4x</option>

            </select>

            <div className="w-24 text-right">

                <div className="text-sm">

                    {totalFrames === 0
                        ? "0 / 0"
                        : `${currentIndex + 1} / ${totalFrames}`}

                </div>

                <div className="text-xs text-gray-500">

                    Replay

                </div>

            </div>

        </div>

    );

}

export default ReplayTimeline;