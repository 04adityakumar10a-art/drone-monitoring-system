package com.aditya.dronemonitoring.telemetry;

import java.util.concurrent.atomic.AtomicBoolean;

import org.springframework.stereotype.Component;
import com.aditya.dronemonitoring.repository.DroneRepository;
import com.aditya.dronemonitoring.dto.TelemetryRequestDTO;
import com.aditya.dronemonitoring.service.DroneTelemetryService;
import com.aditya.dronemonitoring.simulator.TelemetryGenerator;

@Component
public class SimulatorTelemetryProvider
        implements TelemetryProvider {

    private final AtomicBoolean running = new AtomicBoolean(false);

    private final TelemetryGenerator generator;

    private final DroneTelemetryService telemetryService;

    private final DroneRepository droneRepository;

    private boolean fleetMode = true;

    private Long selectedDroneId;

    public SimulatorTelemetryProvider(

            TelemetryGenerator generator,

            DroneTelemetryService telemetryService,

            DroneRepository droneRepository

    ) {

        this.generator = generator;

        this.telemetryService = telemetryService;

        this.droneRepository = droneRepository;

    }

    @Override
    public void start() {

        running.set(true);

    }

    @Override
    public void stop() {

        running.set(false);

    }

    @Override
    public boolean isRunning() {

        return running.get();

    }

    public void simulateFleet() {

        fleetMode = true;

        selectedDroneId = null;

    }

    public void simulateDrone(Long droneId) {

        fleetMode = false;

        selectedDroneId = droneId;

    }

    @Override
    public void publishTelemetry() {


        if (!running.get()) {
            return;

        }

        if (fleetMode) {

            droneRepository.findAll().forEach(drone -> {

                TelemetryRequestDTO request = generator.generate(drone.getId());

                telemetryService.saveTelemetry(request);

            });

        } else {

            TelemetryRequestDTO request = generator.generate(selectedDroneId);

            telemetryService.saveTelemetry(request);

        }

    }

}