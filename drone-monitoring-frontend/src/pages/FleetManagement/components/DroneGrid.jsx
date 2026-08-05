import DroneCard from "./DroneCard";
import {
    Plane,
    Plus
} from "lucide-react";

function DroneGrid({

    drones,

    loading,

    onEdit = () => {},

    onDelete = () => {},

    onOpen = () => {}

}) {

    if (loading) {

        return (

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

                {

                    Array.from({ length: 8 }).map((_, index) => (

                        <SkeletonCard key={index} />

                    ))

                }

            </div>

        );

    }

    if (drones.length === 0) {

        return (

            <div className="rounded-2xl border border-[#262626] bg-[#111111] py-24">

                <div className="mx-auto flex max-w-md flex-col items-center text-center">

                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#1A1A1A]">

                        <Plane
                            size={38}
                            className="text-[#D4AF37]"
                        />

                    </div>

                    <h2 className="text-2xl font-bold text-white">

                        No Drones Found

                    </h2>

                    <p className="mt-3 text-gray-400">

                        No aircraft matched your current search or filters.

                    </p>

                    <button

                        className="mt-8 flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-black transition hover:scale-105"

                    >

                        <Plus size={18} />

                        Add First Drone

                    </button>

                </div>

            </div>

        );

    }

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

            {

                drones.map(drone => (

                    <DroneCard

                        key={drone.id}

                        drone={drone}

                        onEdit={onEdit}

                        onDelete={onDelete}

                        onOpen={onOpen}

                    />

                ))

            }

        </div>

    );

}

function SkeletonCard() {

    return (

        <div className="animate-pulse rounded-2xl border border-[#262626] bg-[#111111] p-5">

            <div className="mb-6 flex items-center gap-4">

                <div className="h-14 w-14 rounded-xl bg-[#222]" />

                <div className="flex-1">

                    <div className="mb-3 h-5 w-32 rounded bg-[#222]" />

                    <div className="h-4 w-20 rounded bg-[#222]" />

                </div>
            </div>

            <div className="mb-6 h-2 rounded bg-[#222]" />

            <div className="grid grid-cols-2 gap-4">

                {

                    Array.from({ length: 4 }).map((_, i) => (

                        <div
                            key={i}
                            className="h-20 rounded-xl bg-[#1A1A1A]"
                        />

                    ))

                }

            </div>

            <div className="mt-6 flex justify-between">

                <div className="flex gap-2">

                    <div className="h-10 w-10 rounded bg-[#222]" />
                    <div className="h-10 w-10 rounded bg-[#222]" />

                </div>

                <div className="h-10 w-28 rounded bg-[#222]" />

            </div>

        </div>

    );

}

export default DroneGrid;