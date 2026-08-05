package com.aditya.dronemonitoring.telemetry;

public interface TelemetryProvider {

    void start();

    void stop();

    boolean isRunning();

    void publishTelemetry();

}