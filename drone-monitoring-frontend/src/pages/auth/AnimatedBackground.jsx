function AnimatedBackground() {

    return (

        <>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#D4AF3715,transparent_35%)]" />

            <div className="absolute -left-24 top-20 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl animate-pulse" />

            <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl animate-pulse" />

            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] bg-[size:50px_50px]" />

        </>

    );

}

export default AnimatedBackground;