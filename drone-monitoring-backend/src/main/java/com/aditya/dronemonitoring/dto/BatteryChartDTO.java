package com.aditya.dronemonitoring.dto;

public class BatteryChartDTO {

    private String model;
    private Integer batteryLevel;

    public BatteryChartDTO() {
    }

    public BatteryChartDTO(String model, Integer batteryLevel) {
        this.model = model;
        this.batteryLevel = batteryLevel;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getBatteryLevel() {
        return batteryLevel;
    }

    public void setBatteryLevel(Integer batteryLevel) {
        this.batteryLevel = batteryLevel;
    }
}