import { Outlet } from "react-router-dom";
import aerionBg from "../assets/images/aerion-bg.png";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useSidebar } from "../context/SidebarContext";
function DashboardLayout() {

    const { collapsed } = useSidebar();

    return (

        <div
            className="relative min-h-screen overflow-hidden text-white"
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

                {/* Sidebar */}

                <Sidebar />

                {/* Right Side */}

                <div
                    className={`
        flex
        flex-1
        flex-col
        transition-all
        duration-300
        ease-in-out
        ${collapsed
                            ? "ml-0"
                            : "ml-0"
                        }
    `}
                >

                    {/* Navbar */}

                    <Navbar />

                    {/* Main Content */}

                    <main
                        className={`
        flex-1
        overflow-y-auto
        transition-all
        duration-300
        ${collapsed
                                ? "p-6"
                                : "p-8"
                            }
    `}
                    >

                        <div className="mx-auto max-w-[1800px]">

                            <Outlet />

                        </div>

                    </main>

                    {/* Footer */}

                    <Footer />

                </div>

            </div>

        </div>

    );

}

export default DashboardLayout;