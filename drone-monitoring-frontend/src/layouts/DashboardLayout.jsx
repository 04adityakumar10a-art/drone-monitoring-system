import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function DashboardLayout({ children }) {

    return (

        <div className="min-h-screen bg-slate-900 flex flex-col">

            <Navbar />

            <div className="flex flex-1">

                <Sidebar />

                <main className="flex-1 p-8 flex flex-col">

                    <div className="flex-1">

                        {children}

                    </div>

                    <Footer />

                </main>

            </div>

        </div>

    );

}

export default DashboardLayout;