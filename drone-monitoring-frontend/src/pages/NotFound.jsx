import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">

            <h1 className="text-8xl font-black text-cyan-500">

                404

            </h1>

            <p className="mt-6 text-xl text-white">

                Page Not Found

            </p>

            <Link

                to="/dashboard"

                className="mt-8 rounded-xl bg-cyan-600 px-6 py-3"

            >

                Go Dashboard

            </Link>

        </div>

    );

}

export default NotFound;