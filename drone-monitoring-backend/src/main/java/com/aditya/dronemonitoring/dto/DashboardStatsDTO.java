package com.aditya.dronemonitoring.dto;

public class DashboardStatsDTO {

    private long totalDrones;
    private long availableDrones;
    private long inFlightDrones;
    private long maintenanceDrones;
    private double averageBattery;
    private long lowBatteryDrones;

    public DashboardStatsDTO() {
    }

    public DashboardStatsDTO(
        long totalDrones,
        long availableDrones,
        long inFlightDrones,
        long maintenanceDrones,
        long lowBatteryDrones,
        double averageBattery) {

    this.totalDrones = totalDrones;
    this.availableDrones = availableDrones;
    this.inFlightDrones = inFlightDrones;
    this.maintenanceDrones = maintenanceDrones;
    this.lowBatteryDrones = lowBatteryDrones;
    this.averageBattery = averageBattery;
}

    public long getLowBatteryDrones() {
        return lowBatteryDrones;
    }

    public void setLowBatteryDrones(long lowBatteryDrones) {
        this.lowBatteryDrones = lowBatteryDrones;
    }

    public long getTotalDrones() {
        return totalDrones;
    }

    public void setTotalDrones(long totalDrones) {
        this.totalDrones = totalDrones;
    }

    public long getAvailableDrones() {
        return availableDrones;
    }

    public void setAvailableDrones(long availableDrones) {
        this.availableDrones = availableDrones;
    }

    public long getInFlightDrones() {
        return inFlightDrones;
    }

    public void setInFlightDrones(long inFlightDrones) {
        this.inFlightDrones = inFlightDrones;
    }

    public long getMaintenanceDrones() {
        return maintenanceDrones;
    }

    public void setMaintenanceDrones(long maintenanceDrones) {
        this.maintenanceDrones = maintenanceDrones;
    }

    public double getAverageBattery() {
        return averageBattery;
    }

    public void setAverageBattery(double averageBattery) {
        this.averageBattery = averageBattery;
    }
}