function CompassCard({ heading = 0 }) {

    return (

        <div className="bg-[#121212] rounded-xl p-4 border border-[#232323]">

            <div className="text-xs text-gray-400 mb-3">
                Heading
            </div>

            <div className="flex justify-center">

                <div
                    className="relative w-28 h-28 rounded-full border-2 border-[#2d2d2d]"
                >

                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs">
                        N
                    </div>

                    <div
                        className="absolute left-1/2 top-1/2 origin-bottom transition-transform duration-300"
                        style={{
                            transform:
                                `translate(-50%,-100%) rotate(${heading}deg)`
                        }}
                    >

                        <div className="w-1 h-10 bg-[#D4AF37] rounded-full"/>

                    </div>

                </div>

            </div>

            <div className="text-center mt-3 font-semibold">

                {Math.round(heading)}°

            </div>

        </div>

    );

}

export default CompassCard;