package com.aditya.dronemonitoring.dto;

import java.time.LocalDateTime;

public class TelemetrySearchDTO {

    private Long droneId;

    private Integer minBattery;

    private Integer maxBattery;

    public Long getDroneId() {
        return droneId;
    }

    public void setDroneId(Long droneId) {
        this.droneId = droneId;
    }

    public Integer getMinBattery() {
        return minBattery;
    }

    public void setMinBattery(Integer minBattery) {
        this.minBattery = minBattery;
    }

    public Integer getMaxBattery() {
        return maxBattery;
    }

    public void setMaxBattery(Integer maxBattery) {
        this.maxBattery = maxBattery;
    }

    public Double getMinSpeed() {
        return minSpeed;
    }

    public void setMinSpeed(Double minSpeed) {
        this.minSpeed = minSpeed;
    }

    public Double getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(Double maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public Double getMinAltitude() {
        return minAltitude;
    }

    public void setMinAltitude(Double minAltitude) {
        this.minAltitude = minAltitude;
    }

    public Double getMaxAltitude() {
        return maxAltitude;
    }

    public void setMaxAltitude(Double maxAltitude) {
        this.maxAltitude = maxAltitude;
    }

    public Integer getMinSignalStrength() {
        return minSignalStrength;
    }

    public void setMinSignalStrength(Integer minSignalStrength) {
        this.minSignalStrength = minSignalStrength;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    private Double minSpeed;

    private Double maxSpeed;

    private Double minAltitude;

    private Double maxAltitude;

    private Integer minSignalStrength;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    // Generate Getters & Setters
}