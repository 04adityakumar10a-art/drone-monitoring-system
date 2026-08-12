import { motion } from "motion/react";
import { useMemo, useState } from "react";

import FleetHeader from "./FleetHeader";
import FleetCard from "./FleetCard";

import { fadeUp } from "../../../animations";

function FleetStrip({

    drones,

    selectedDrone,

    onSelectDrone

}) {

    const [collapsed, setCollapsed] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const [sortBy, setSortBy] = useState("NAME");

    const filteredDrones = useMemo(() => {

        let list = drones.filter((drone) => {

            if (!searchQuery.trim()) {

                return true;

            }

            const query = searchQuery.toLowerCase();

            return (

                drone.name?.toLowerCase().includes(query) ||

                drone.serialNumber?.toLowerCase().includes(query) ||

                drone.status?.toLowerCase().includes(query)

            );

        });

        switch (sortBy) {

            case "BATTERY":

                list.sort(

                    (a, b) => (b.battery ?? 0) - (a.battery ?? 0)

                );

                break;

            case "SIGNAL":

                list.sort(

                    (a, b) => (b.signal ?? 0) - (a.signal ?? 0)

                );

                break;

            case "ALTITUDE":

                list.sort(

                    (a, b) => (b.altitude ?? 0) - (a.altitude ?? 0)

                );

                break;

            case "SPEED":

                list.sort(

                    (a, b) => (b.speed ?? 0) - (a.speed ?? 0)

                );

                break;

            default:

                list.sort((a, b) =>

                    (a.serialNumber ?? "").localeCompare(

                        b.serialNumber ?? ""

                    )

                );

        }

        return list;

    }, [

        drones,

        searchQuery,

        sortBy

    ]);

    return (

        <motion.section

            {...fadeUp}

            className="border-b border-white/5 bg-[#090909]"

        >

            <div className="px-6 pt-5">

                <FleetHeader

                    drones={drones}

                    collapsed={collapsed}

                    onToggle={() =>

                        setCollapsed(previous => !previous)

                    }

                    searchQuery={searchQuery}

                    onSearchChange={setSearchQuery}

                    sortBy={sortBy}

                    onSortChange={setSortBy}

                />

                <motion.div

                    initial={false}

                    animate={{

                        height: collapsed ? 0 : "auto",

                        opacity: collapsed ? 0 : 1,

                        marginTop: collapsed ? 0 : 8

                    }}

                    transition={{

                        duration: 0.35,

                        ease: "easeInOut"

                    }}

                    className="overflow-hidden"

                >

                    <div

                        className="
                        flex
                        gap-4
                        overflow-x-auto
                        pb-5
                        snap-x
                        snap-mandatory
                        scrollbar-hide
                        "

                    >

                        {

                            filteredDrones.length > 0

                                ? (

                                    filteredDrones.map((drone) => (

                                        <FleetCard

                                            key={drone.id}

                                            drone={drone}

                                            selected={selectedDrone?.id === drone.id}

                                            onClick={() => onSelectDrone(drone)}

                                        />

                                    ))

                                )

                                : (

                                    <div className="flex h-36 w-full items-center justify-center rounded-2xl border border-dashed border-white/10">

                                        <div className="text-center">

                                            <p className="text-lg font-semibold text-white">

                                                No drones found

                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">

                                                Try searching by name, serial number or status.

                                            </p>

                                        </div>

                                    </div>

                                )

                        }

                    </div>

                </motion.div>

            </div>

        </motion.section>

    );

}

export default FleetStrip;