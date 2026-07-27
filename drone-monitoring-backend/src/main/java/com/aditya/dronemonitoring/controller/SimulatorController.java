package com.aditya.dronemonitoring.controller;

import com.aditya.dronemonitoring.simulator.TelemetrySimulatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simulator")
public class SimulatorController {

    private final TelemetrySimulatorService simulatorService;

    public SimulatorController(
            TelemetrySimulatorService simulatorService) {

        this.simulatorService = simulatorService;
    }

    @PostMapping("/send/{droneId}")
    public ResponseEntity<String> sendTelemetry(
            @PathVariable Long droneId) {

        simulatorService.sendTelemetry(droneId);

        return ResponseEntity.ok(
                "Telemetry sent successfully.");
    }


    @PostMapping("/start")
public ResponseEntity<String> startSimulator() {

    simulatorService.startSimulator();

    return ResponseEntity.ok(
            "Telemetry Simulator Started");
}

@PostMapping("/stop")
public ResponseEntity<String> stopSimulator() {

    simulatorService.stopSimulator();

    return ResponseEntity.ok(
            "Telemetry Simulator Stopped");
}
}