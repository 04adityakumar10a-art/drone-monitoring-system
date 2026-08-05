import VideoFeedCard from "./VideoFeedCard";

function LiveCameraPanel() {

    const feeds = [
        {
            id: 1,
            title: "Front Camera",
            status: "LIVE"
        },
        {
            id: 2,
            title: "Bottom Camera",
            status: "LIVE"
        }
    ];

    return (

        <div className="rounded-2xl border border-[#262626] bg-[#111111] p-5">

            <div className="mb-5 flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold text-white">

                        Live Video Feeds

                    </h2>

                    <p className="text-sm text-gray-500">

                        Real-time Drone Cameras

                    </p>

                </div>

                <div className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white animate-pulse">

                    ● LIVE

                </div>

            </div>

            <div className="grid grid-cols-2 gap-4">

                {

                    feeds.map(feed => (

                        <VideoFeedCard

                            key={feed.id}

                            title={feed.title}

                            status={feed.status}

                        />

                    ))

                }

            </div>

        </div>

    );

}

export default LiveCameraPanel;