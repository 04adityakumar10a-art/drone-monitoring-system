package com.aditya.dronemonitoring.dto;

public class BatteryDistributionDTO {

    private String range;
    private long count;

    public BatteryDistributionDTO() {
    }

    public BatteryDistributionDTO(String range, long count) {
        this.range = range;
        this.count = count;
    }

    public String getRange() {
        return range;
    }

    public void setRange(String range) {
        this.range = range;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}