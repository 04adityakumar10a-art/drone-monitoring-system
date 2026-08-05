import { useEffect, useState } from "react";
import { subscribe } from "../services/websocket";

export default function useTelemetry() {

    const [telemetry, setTelemetry] = useState({});

    useEffect(() => {

        const subscription = subscribe(

            "/topic/telemetry",


            (data) => {

                console.log("Telemetry:", data);
                setTelemetry(previous => ({

                    ...previous,

                    [data.droneId]: data



                }));

            }

        );

        return () => {

            subscription?.unsubscribe();

        };

    }, []);

    return telemetry;

}