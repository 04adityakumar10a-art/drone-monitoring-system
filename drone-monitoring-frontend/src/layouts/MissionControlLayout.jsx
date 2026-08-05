import Sidebar from "../components/Sidebar";

function MissionControlLayout({ children }) {

    return (

        <div className="h-screen flex overflow-hidden bg-[#050505] text-white">

            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">

                {children}

            </div>

        </div>

    );

}

export default MissionControlLayout;