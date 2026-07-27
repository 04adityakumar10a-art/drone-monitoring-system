function SearchBar({

    search,

    setSearch,

    onAddDrone

}) {

    const role = localStorage.getItem("role");

    return (

        <div className="flex justify-between mb-6">

            <input

                type="text"

                placeholder="🔍 Search Drone..."

                value={search}

                onChange={(event) =>
                    setSearch(event.target.value)
                }

                className="bg-slate-800 text-white rounded-lg px-5 py-3 w-96"

            />

            {role === "ADMIN" && (

                <button

                    onClick={onAddDrone}

                    className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-white">

                    + Add Drone

                </button>

            )}

        </div>

    );

}

export default SearchBar;