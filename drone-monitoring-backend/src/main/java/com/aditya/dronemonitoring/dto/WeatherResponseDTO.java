package com.aditya.dronemonitoring.dto;

public class WeatherResponseDTO {

    private double temperature;
    private double windSpeed;
    private int windDirection;
    private int humidity;
    private double visibility;
    private String weather;
    private String flightStatus;

    public WeatherResponseDTO() {
    }

    public WeatherResponseDTO(
            double temperature,
            double windSpeed,
            int windDirection,
            int humidity,
            double visibility,
            String weather,
            String flightStatus
    ) {
        this.temperature = temperature;
        this.windSpeed = windSpeed;
        this.windDirection = windDirection;
        this.humidity = humidity;
        this.visibility = visibility;
        this.weather = weather;
        this.flightStatus = flightStatus;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(double windSpeed) {
        this.windSpeed = windSpeed;
    }

    public int getWindDirection() {
        return windDirection;
    }

    public void setWindDirection(int windDirection) {
        this.windDirection = windDirection;
    }

    public int getHumidity() {
        return humidity;
    }

    public void setHumidity(int humidity) {
        this.humidity = humidity;
    }

    public double getVisibility() {
        return visibility;
    }

    public void setVisibility(double visibility) {
        this.visibility = visibility;
    }

    public String getWeather() {
        return weather;
    }

    public void setWeather(String weather) {
        this.weather = weather;
    }

    public String getFlightStatus() {
        return flightStatus;
    }

    public void setFlightStatus(String flightStatus) {
        this.flightStatus = flightStatus;
    }
}