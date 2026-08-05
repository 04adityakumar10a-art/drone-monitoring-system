import AnimatedBackground from "./AnimatedBackground";

function AuthLayout({ children }) {

    return (

        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090909]">

            <AnimatedBackground />

            <div className="relative z-10 w-full max-w-md px-6">

                {children}

            </div>

        </div>

    );

}

export default AuthLayout;