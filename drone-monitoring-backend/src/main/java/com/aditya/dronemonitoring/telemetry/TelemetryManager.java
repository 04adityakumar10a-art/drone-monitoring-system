package com.aditya.dronemonitoring.telemetry;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TelemetryManager {

    private final SimulatorTelemetryProvider simulator;

    private final RealTelemetryProvider realProvider;

    private TelemetryProvider provider;

    public TelemetryManager(

            SimulatorTelemetryProvider simulator,

            RealTelemetryProvider realProvider,

            @Value("${telemetry.mode:SIMULATOR}")

            String mode

    ) {

        this.simulator = simulator;

        this.realProvider = realProvider;

        if ("REAL".equalsIgnoreCase(mode)) {

            provider = realProvider;

        }

        else {

            provider = simulator;

        }

    }

    public void start() {

        provider.start();

    }

    public void stop() {

        provider.stop();

    }

    public void publishTelemetry() {

        provider.publishTelemetry();

    }

    public boolean isRunning() {

        return provider.isRunning();

    }

    public TelemetryProvider getProvider() {

        return provider;

    }

    public void switchToSimulator() {

        provider.stop();

        provider = simulator;


    }

    public void switchToReal() {

        provider.stop();

        provider = realProvider;

    }

    public SimulatorTelemetryProvider getSimulator() {

    return simulator;

}

}