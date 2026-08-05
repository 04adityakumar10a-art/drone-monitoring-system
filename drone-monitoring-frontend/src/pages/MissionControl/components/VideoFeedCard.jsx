import {
    Camera,
    Maximize2,
    Settings
} from "lucide-react";

function VideoFeedCard({

    title,

    status

}) {

    return (

        <div className="overflow-hidden rounded-xl border border-[#262626] bg-[#1A1A1A]">

            <div className="relative aspect-video bg-gradient-to-br from-[#222] via-[#111] to-black">

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <Camera

                        size={48}

                        className="text-[#D4AF37]"

                    />

                    <span className="mt-3 text-gray-400">

                        Camera Stream

                    </span>

                </div>

                <div className="absolute left-3 top-3 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">

                    {status}

                </div>

                <div className="absolute right-3 top-3 flex gap-2">

                    <button className="rounded bg-black/60 p-2">

                        <Settings

                            size={16}

                            className="text-white"

                        />

                    </button>

                    <button className="rounded bg-black/60 p-2">

                        <Maximize2

                            size={16}

                            className="text-white"

                        />

                    </button>

                </div>

            </div>

            <div className="flex items-center justify-between p-4">

                <h3 className="font-semibold text-white">

                    {title}

                </h3>

                <span className="text-sm text-green-500">

                    Connected

                </span>

            </div>

        </div>

    );

}

export default VideoFeedCard;