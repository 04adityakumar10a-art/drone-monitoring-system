function Pagination({

    page,

    totalPages,

    setPage

}) {

    return (

        <div className="flex justify-center items-center gap-5 mt-8">

            <button

                disabled={page === 0}

                onClick={() => setPage(page - 1)}

                className="bg-slate-700 px-4 py-2 rounded disabled:opacity-50">

                Previous

            </button>

            <span className="text-white">

                Page {page + 1} of {totalPages}

            </span>

            <button

                disabled={page === totalPages - 1}

                onClick={() => setPage(page + 1)}

                className="bg-slate-700 px-4 py-2 rounded disabled:opacity-50">

                Next

            </button>

        </div>

    );

}

export default Pagination;