function EmptyState({ title, message }) {

    return (

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-12 text-center">

            <h2 className="text-2xl font-bold text-white">

                {title}

            </h2>

            <p className="mt-3 text-slate-400">

                {message}

            </p>

        </div>

    );

}

export default EmptyState;