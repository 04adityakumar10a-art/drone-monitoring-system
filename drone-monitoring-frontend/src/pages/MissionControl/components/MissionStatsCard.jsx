function MissionStatsCard({ stats }) {

    return (

        <div className="bg-[#121212] rounded-xl p-4 border border-[#232323]">

            <div className="font-semibold mb-3">

                Mission Statistics

            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">

                <div>

                    <div className="text-gray-500">
                        Flight Time
                    </div>

                    <div className="font-semibold">
                        {stats.flightTime}s
                    </div>

                </div>

                <div>

                    <div className="text-gray-500">
                        Max Speed
                    </div>

                    <div className="font-semibold">
                        {stats.maxSpeed.toFixed(1)} m/s
                    </div>

                </div>

                <div>

                    <div className="text-gray-500">
                        Max Altitude
                    </div>

                    <div className="font-semibold">
                        {stats.maxAltitude.toFixed(1)} m
                    </div>

                </div>

            </div>

        </div>

    );

}

export default MissionStatsCard;