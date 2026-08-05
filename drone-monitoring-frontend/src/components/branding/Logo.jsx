import logo from "../../assets/images/logo.png";

function Logo({ collapsed = false }) {

    return (

        <div
            className={`
                flex
                items-center
                transition-all
                duration-300
                ${collapsed ? "justify-center" : "gap-4"}
            `}
        >

            <div
                className={`
                    flex
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[#D4AF37]/30
                    bg-[#161616]
                    transition-all
                    duration-300
                    ${collapsed ? "h-12 w-12" : "h-14 w-14"}
                `}
            >

                <img
                    src={logo}
                    alt="AERION"
                    className={`
                        object-contain
                        transition-all
                        duration-300
                        ${collapsed ? "h-7 w-7" : "h-8 w-8"}
                    `}
                />

            </div>

            <div
                className={`
                    overflow-hidden
                    transition-all
                    duration-300
                    ${collapsed ? "w-0 opacity-0" : "ml-4 w-40 opacity-100"}
                `}
            >

                <h1 className="text-xl font-bold tracking-[0.25em] text-white whitespace-nowrap">

                    AERION

                </h1>

                <p className="text-xs uppercase tracking-[0.35em] text-gray-500 whitespace-nowrap">

                    Fleet Command

                </p>

            </div>

        </div>

    );

}

export default Logo;