import { useEffect, useState } from "react";
import { subscribe } from "../services/websocket";

export default function useDroneStatus() {

    const [drones, setDrones] = useState({});

    useEffect(() => {

        const subscription = subscribe(

            "/topic/drone-status",

            (drone) => {

                setDrones(previous => ({

                    ...previous,

                    [drone.id]: drone

                }));

            }

        );

        return () => {

            subscription?.unsubscribe();

        };

    }, []);

    return drones;

    (drone) => {

        console.log("Live Status:", drone);

        setDrones(previous => ({
            ...previous,
            [drone.id]: drone
        }));

    }

}