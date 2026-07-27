package com.aditya.dronemonitoring.simulator;

import com.aditya.dronemonitoring.entity.Drone;
import com.aditya.dronemonitoring.repository.DroneRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TelemetryScheduler {

    private final DroneRepository droneRepository;
    private final TelemetrySimulatorService simulatorService;

    public TelemetryScheduler(
            DroneRepository droneRepository,
            TelemetrySimulatorService simulatorService) {

        this.droneRepository = droneRepository;
        this.simulatorService = simulatorService;
    }

@Scheduled(fixedDelay = 1000)
public void simulateFleet() {

    if (!simulatorService.isSimulatorRunning()) {
        return;
    }

    for (Drone drone : droneRepository.findAll()) {

        simulatorService.sendTelemetry(drone.getId());

    }

}
}