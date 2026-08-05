import {
    Search,
    Filter,
    LayoutGrid,
    Table,
    Download,
    ArrowUpDown
} from "lucide-react";

function FleetToolbar({

    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    view,
    setView

}) {

    const filters = [

        "ALL",
        "ONLINE",
        "OFFLINE",
        "WARNING"

    ];

    return (

        <div className="rounded-2xl border border-[#262626] bg-[#111111] p-5">

            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                {/* Search */}

                <div className="relative w-full xl:max-w-md">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input

                        type="text"

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                        placeholder="Search drone, model or serial..."

                        className="w-full rounded-xl border border-[#262626] bg-[#0D0D0D] py-3 pl-11 pr-4 text-white outline-none transition focus:border-[#D4AF37]"

                    />

                </div>

                {/* Filters */}

                <div className="flex flex-wrap gap-2">

                    {

                        filters.map(filter => (

                            <button

                                key={filter}

                                onClick={() =>

                                    setStatusFilter(filter)

                                }

                                className={`rounded-xl px-4 py-2 text-sm font-medium transition

                                ${

                                    statusFilter === filter

                                        ? "bg-[#D4AF37] text-black"

                                        : "border border-[#333] bg-[#1A1A1A] text-gray-300 hover:border-[#D4AF37]"

                                }`}

                            >

                                {filter}

                            </button>

                        ))

                    }

                </div>

                {/* Right Side */}

                <div className="flex items-center gap-3">

                    {/* Sort */}

                    <div className="relative">

                        <ArrowUpDown

                            size={16}

                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"

                        />

                        <select

                            className="rounded-xl border border-[#333] bg-[#1A1A1A] py-2 pl-9 pr-8 text-white outline-none"

                        >

                            <option>Name</option>

                            <option>Battery</option>

                            <option>Status</option>

                            <option>Altitude</option>

                            <option>Signal</option>

                        </select>

                    </div>

                    {/* Grid */}

                    <button

                        onClick={() =>

                            setView("grid")

                        }

                        className={`rounded-xl p-3 transition

                        ${

                            view === "grid"

                                ? "bg-[#D4AF37] text-black"

                                : "border border-[#333] bg-[#1A1A1A] text-white"

                        }`}

                    >

                        <LayoutGrid size={18} />

                    </button>

                    {/* Table */}

                    <button

                        onClick={() =>

                            setView("table")

                        }

                        className={`rounded-xl p-3 transition

                        ${

                            view === "table"

                                ? "bg-[#D4AF37] text-black"

                                : "border border-[#333] bg-[#1A1A1A] text-white"

                        }`}

                    >

                        <Table size={18} />

                    </button>

                    {/* Export */}

                    <button

                        className="flex items-center gap-2 rounded-xl border border-[#333] bg-[#1A1A1A] px-4 py-3 text-white transition hover:border-[#D4AF37]"

                    >

                        <Download size={17} />

                        Export

                    </button>

                </div>

            </div>

        </div>

    );

}

export default FleetToolbar;