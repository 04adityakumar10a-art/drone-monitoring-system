package com.aditya.dronemonitoring.service;

import com.aditya.dronemonitoring.dto.WeatherResponseDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class WeatherService {

    private final RestTemplate restTemplate = new RestTemplate();

    public WeatherResponseDTO getWeather(double latitude, double longitude) {

        String url = "https://api.open-meteo.com/v1/forecast" +
                "?latitude=" + latitude +
                "&longitude=" + longitude +
                "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,visibility";

        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        if (response == null || !response.containsKey("current")) {
            throw new RuntimeException("Unable to fetch weather data.");
        }

        Map<String, Object> current = (Map<String, Object>) response.get("current");

        double temperature = ((Number) current.get("temperature_2m")).doubleValue();

        double windSpeed = ((Number) current.get("wind_speed_10m")).doubleValue();

        int humidity = ((Number) current.get("relative_humidity_2m")).intValue();

        int windDirection = ((Number) current.get("wind_direction_10m")).intValue();

        double visibility = current.get("visibility") == null
                ? 10000
                : ((Number) current.get("visibility")).doubleValue();

        int weatherCode = ((Number) current.get("weather_code")).intValue();

        String weather = getWeatherDescription(weatherCode);

        String flightStatus = getFlightStatus(
                windSpeed,
                weatherCode,
                visibility);

        return new WeatherResponseDTO(
                temperature,
                windSpeed,
                windDirection,
                humidity,
                visibility / 1000.0,
                weather,
                flightStatus);
    }

    private String getFlightStatus(
            double windSpeed,
            int weatherCode,
            double visibility) {

        if (windSpeed >= 30)
            return "HIGH WIND";

        if (visibility < 3000)
            return "LOW VISIBILITY";

        if (weatherCode >= 51)
            return "RAIN";

        return "SAFE";
    }

    private String getWeatherDescription(int code) {

        return switch (code) {

            case 0 -> "Clear";

            case 1, 2, 3 -> "Partly Cloudy";

            case 45, 48 -> "Fog";

            case 51, 53, 55,
                    61, 63, 65,
                    80, 81, 82 ->
                "Rain";

            case 71, 73, 75 -> "Snow";

            case 95, 96, 99 -> "Thunderstorm";

            default -> "Unknown";
        };
    }

}