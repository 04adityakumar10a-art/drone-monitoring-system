package com.aditya.dronemonitoring.dto;

import jakarta.validation.constraints.*;

public class TelemetryRequestDTO {

    @NotNull(message = "Drone ID is required")
    private Long droneId;

    public Long getDroneId() {
        return droneId;
    }

    public void setDroneId(Long droneId) {
        this.droneId = droneId;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getAltitude() {
        return altitude;
    }

    public void setAltitude(Double altitude) {
        this.altitude = altitude;
    }

    public Double getSpeed() {
        return speed;
    }

    public void setSpeed(Double speed) {
        this.speed = speed;
    }

    public Double getHeading() {
        return heading;
    }

    public void setHeading(Double heading) {
        this.heading = heading;
    }

    public Integer getBatteryLevel() {
        return batteryLevel;
    }

    public void setBatteryLevel(Integer batteryLevel) {
        this.batteryLevel = batteryLevel;
    }

    public Integer getSignalStrength() {
        return signalStrength;
    }

    public void setSignalStrength(Integer signalStrength) {
        this.signalStrength = signalStrength;
    }

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;

    @NotNull
    private Double altitude;

    @NotNull
    private Double speed;

    @NotNull
    private Double heading;

    @Min(0)
    @Max(100)
    private Integer batteryLevel;

    @Min(0)
    @Max(100)
    private Integer signalStrength;

    // Generate Getters and Setters
}