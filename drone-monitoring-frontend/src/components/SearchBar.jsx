import {
    MagnifyingGlassIcon,
    PlusIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline";

function SearchBar({

    search,

    setSearch,

    statusFilter,

    setStatusFilter,

    manufacturerFilter,

    setManufacturerFilter,

    batteryFilter,

    setBatteryFilter,

    manufacturers,

    onAddDrone

}) {

    const role = localStorage.getItem("role");

    function resetFilters() {

        setSearch("");

        setStatusFilter("ALL");

        setManufacturerFilter("ALL");

        setBatteryFilter("ALL");

    }

    return (

        <div className="mb-8 rounded-3xl border border-[#232323] bg-gradient-to-r from-[#111111] to-[#0A0A0A] p-6 shadow-[0_20px_60px_rgba(0,0,0,.45)]">

            <div className="grid gap-6 xl:grid-cols-[2fr_1fr_1fr_1fr_auto_auto]">

                {/* SEARCH */}

                <div>

                    <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-gray-500">

                        Fleet Search

                    </label>

                    <div className="relative">

                        <MagnifyingGlassIcon
                            className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#D4AF37]"
                        />

                        <input

                            type="text"

                            value={search}

                            onChange={(e) =>
                                setSearch(e.target.value)
                            }

                            placeholder="Search by model or manufacturer..."

                            className="
                                w-full
                                rounded-2xl
                                border
                                border-[#2D2D2D]
                                bg-[#181818]
                                py-4
                                pl-14
                                pr-5
                                text-white
                                placeholder:text-gray-500
                                outline-none
                                transition-all
                                duration-300
                                focus:border-[#D4AF37]
                                focus:ring-2
                                focus:ring-[#D4AF37]/20
                            "

                        />

                    </div>

                </div>

                {/* STATUS */}

                <div>

                    <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-gray-500">

                        Status

                    </label>

                    <select

                        value={statusFilter}

                        onChange={(e)=>

                            setStatusFilter(e.target.value)

                        }

                        className="
                            w-full
                            rounded-2xl
                            border
                            border-[#2D2D2D]
                            bg-[#181818]
                            p-4
                            text-white
                            outline-none
                            focus:border-[#D4AF37]
                        "

                    >

                        <option value="ALL">All</option>

                        <option value="AVAILABLE">Available</option>

                        <option value="IN_FLIGHT">In Flight</option>

                        <option value="MAINTENANCE">Maintenance</option>

                        <option value="OFFLINE">Offline</option>

                    </select>

                </div>

                {/* MANUFACTURER */}

                <div>

                    <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-gray-500">

                        Manufacturer

                    </label>

                    <select

                        value={manufacturerFilter}

                        onChange={(e)=>

                            setManufacturerFilter(e.target.value)

                        }

                        className="
                            w-full
                            rounded-2xl
                            border
                            border-[#2D2D2D]
                            bg-[#181818]
                            p-4
                            text-white
                            outline-none
                            focus:border-[#D4AF37]
                        "

                    >

                        {

                            manufacturers.map(name=>(

                                <option

                                    key={name}

                                    value={name}

                                >

                                    {name}

                                </option>

                            ))

                        }

                    </select>

                </div>

                {/* BATTERY */}

                <div>

                    <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-gray-500">

                        Battery

                    </label>

                    <select

                        value={batteryFilter}

                        onChange={(e)=>

                            setBatteryFilter(e.target.value)

                        }

                        className="
                            w-full
                            rounded-2xl
                            border
                            border-[#2D2D2D]
                            bg-[#181818]
                            p-4
                            text-white
                            outline-none
                            focus:border-[#D4AF37]
                        "

                    >

                        <option value="ALL">

                            All

                        </option>

                        <option value="HIGH">

                            High (75%+)

                        </option>

                        <option value="MEDIUM">

                            Medium (40-74%)

                        </option>

                        <option value="LOW">

                            Low (&lt;40%)

                        </option>

                    </select>

                </div>

                {/* RESET */}

                <button

                    onClick={resetFilters}

                    className="
                        mt-8
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        border
                        border-[#2D2D2D]
                        bg-[#181818]
                        px-5
                        text-gray-300
                        transition-all
                        duration-300
                        hover:border-[#D4AF37]
                        hover:text-[#D4AF37]
                    "

                >

                    <ArrowPathIcon className="h-5 w-5"/>

                    Reset

                </button>

                {/* ADD */}

                {

                    role==="ADMIN" && (

                        <button

                            onClick={onAddDrone}

                            className="
                                mt-8
                                flex
                                items-center
                                justify-center
                                gap-3
                                rounded-2xl
                                bg-[#D4AF37]
                                px-6
                                font-semibold
                                text-black
                                transition-all
                                duration-300
                                hover:scale-105
                                hover:shadow-[0_0_30px_rgba(212,175,55,.45)]
                            "

                        >

                            <PlusIcon className="h-5 w-5"/>

                            Add Drone

                        </button>

                    )

                }

            </div>

        </div>

    );

}

export default SearchBar;