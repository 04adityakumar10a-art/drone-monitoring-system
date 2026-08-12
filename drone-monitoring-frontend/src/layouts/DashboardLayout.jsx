import { Outlet } from "react-router-dom";

import aerionBg from "../assets/images/aerion-bg.png";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function DashboardLayout() {

    return (
        <div
            className="
                relative
                min-h-screen
                overflow-hidden
                text-white
            "
            style={{
                backgroundImage: `
                    linear-gradient(
                        rgba(0,0,0,0.65),
                        rgba(0,0,0,0.65)
                    ),
                    url(${aerionBg})
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat"
            }}
        >

            <div className="relative z-10 flex min-h-screen">

                {/* SIDEBAR */}

                <Sidebar />

                {/* RIGHT CONTENT AREA */}

                <div className="flex min-w-0 flex-1 flex-col">

                    <Navbar />

                    <main className="flex-1 overflow-y-auto p-8">

                        <div className="mx-auto w-full max-w-[1800px]">

                            <Outlet />

                        </div>

                    </main>

                    <Footer />

                </div>

            </div>

        </div>
    );
}

export default DashboardLayout;