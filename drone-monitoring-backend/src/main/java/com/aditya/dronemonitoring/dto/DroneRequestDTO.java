package com.aditya.dronemonitoring.dto;

import com.aditya.dronemonitoring.entity.DroneStatus;

import jakarta.validation.constraints.*;
import jakarta.validation.constraints.NotNull;

public class DroneRequestDTO {

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Integer getBatteryLevel() {
        return batteryLevel;
    }

    public void setBatteryLevel(Integer batteryLevel) {
        this.batteryLevel = batteryLevel;
    }

    public DroneStatus getStatus() {
        return status;
    }

    public void setStatus(DroneStatus status) {
        this.status = status;
    }

    @NotBlank(message = "Serial Number is required")
    private String serialNumber;

    @NotBlank(message = "Model is required")
    private String model;

    @NotBlank(message = "Manufacturer is required")
    private String manufacturer;

    @Min(value = 0, message = "Battery cannot be negative")
    @Max(value = 100, message = "Battery cannot exceed 100")
    private Integer batteryLevel;

    @NotNull(message = "Status is required")
    private DroneStatus status;

    // Generate Getters and Setters
}