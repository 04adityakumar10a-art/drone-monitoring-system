import { useEffect, useRef, useState } from "react";
import api from "../api/axios";

function useWeather(latitude, longitude) {

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const lastFetchTime = useRef(0);

    useEffect(() => {

        if (latitude == null || longitude == null) return;

        const now = Date.now();

        // Only refresh every 5 minutes
        if (
            weather &&
            now - lastFetchTime.current < 5 * 60 * 1000
        ) {
            return;
        }

        fetchWeather();

    }, [latitude, longitude]);

    async function fetchWeather() {

        try {

            setLoading(true);

            const response = await api.get(
                `/api/weather?lat=${latitude}&lon=${longitude}`
            );

            setWeather(response.data);

            lastFetchTime.current = Date.now();

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    return {
        weather,
        loading
    };

}

export default useWeather;