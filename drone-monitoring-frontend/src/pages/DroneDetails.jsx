import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function DroneDetails() {

    const { id } = useParams();

    const [drone, setDrone] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDrone();

    }, [id]);

    async function fetchDrone() {

        try {

            const response = await api.get(`/api/drones/${id}`);

            setDrone(response.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <h1 className="text-white text-3xl">

                Loading...

            </h1>

        );

    }

    if (!drone) {

        return (

            

                <h1 className="text-red-500 text-3xl">

                    Drone Not Found

                </h1>


        );

    }

    return (

      

            <div className="space-y-8">

                <div>

                    <h1 className="text-5xl font-black text-white">

                        {drone.model}

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Drone Details

                    </p>

                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <InfoCard
                        title="Manufacturer"
                        value={drone.manufacturer}
                    />

                    <InfoCard
                        title="Battery"
                        value={`${drone.batteryLevel}%`}
                    />

                    <InfoCard
                        title="Status"
                        value={drone.status}
                    />

                    <InfoCard
                        title="Serial Number"
                        value={drone.serialNumber}
                    />

                </div>

            </div>

      

    );

}

function InfoCard({ title, value }) {

    return (

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

            <p className="text-slate-500">

                {title}

            </p>

            <h2 className="mt-3 text-2xl font-bold text-white">

                {value}

            </h2>

        </div>

    );

}

export default DroneDetails;