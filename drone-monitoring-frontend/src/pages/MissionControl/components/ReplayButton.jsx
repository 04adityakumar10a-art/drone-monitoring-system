import { PlayCircle, X } from "lucide-react";

function ReplayButton({

    showReplay,
    setShowReplay

}) {

    return (

        <div className="absolute bottom-5 left-5 z-[1000]">

            <button

                onClick={() => setShowReplay(!showReplay)}

                className="flex items-center gap-2 rounded-xl border border-cyan-500/30
                           bg-[#111111]/90 backdrop-blur-md
                           px-4 py-3
                           text-cyan-400
                           shadow-lg
                           hover:border-cyan-400
                           hover:bg-[#161616]
                           transition-all duration-300"

            >

                {

                    showReplay

                        ? <X size={18}/>

                        : <PlayCircle size={18}/>

                }

                <span className="font-medium">

                    {

                        showReplay

                            ? "Hide Replay"

                            : "Replay"

                    }

                </span>

            </button>

        </div>

    );

}

export default ReplayButton;