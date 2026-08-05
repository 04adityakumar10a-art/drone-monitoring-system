package com.aditya.dronemonitoring.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.aditya.dronemonitoring.telemetry.TelemetryManager;

@Component
public class TelemetryScheduler {

    private final TelemetryManager telemetryManager;

    public TelemetryScheduler(TelemetryManager telemetryManager) {

        this.telemetryManager = telemetryManager;

        System.out.println("TelemetryScheduler Initialized");

    }

    @Scheduled(fixedRate = 1000)
    public void publishTelemetry() {

        if (!telemetryManager.isRunning()) {
            return;
        }

        telemetryManager.publishTelemetry();

    }

}