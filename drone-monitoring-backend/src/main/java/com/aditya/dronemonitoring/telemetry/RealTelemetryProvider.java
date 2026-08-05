package com.aditya.dronemonitoring.telemetry;

import org.springframework.stereotype.Component;

@Component
public class RealTelemetryProvider
        implements TelemetryProvider {

    @Override
    public void start() {

    }

    @Override
    public void stop() {

    }

    @Override
    public boolean isRunning() {

        return false;

    }

    @Override
    public void publishTelemetry() {

        /*
         *
         * MAVSDK
         *
         * DJI SDK
         *
         * ESP32
         *
         * PX4
         *
         */

    }

}