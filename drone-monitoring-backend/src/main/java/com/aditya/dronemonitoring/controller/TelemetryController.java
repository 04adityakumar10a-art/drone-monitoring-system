package com.aditya.dronemonitoring.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aditya.dronemonitoring.telemetry.TelemetryManager;

@RestController
@RequestMapping("/api/telemetry")
public class TelemetryController {

        private final TelemetryManager manager;

        public TelemetryController(TelemetryManager manager) {

                this.manager = manager;

        }

        @PostMapping("/start")
        public ResponseEntity<String> start() {

                manager.start();

                return ResponseEntity.ok("Telemetry Started");

        }

        @PostMapping("/stop")
        public ResponseEntity<String> stop() {

                manager.stop();

                return ResponseEntity.ok("Telemetry Stopped");

        }

        @PostMapping("/mode/fleet")
        public ResponseEntity<String> fleetMode() {

                manager.switchToSimulator();

                manager.getSimulator().simulateFleet();

                return ResponseEntity.ok("Fleet Simulator Mode");

        }

        @PostMapping("/mode/drone/{droneId}")
        public ResponseEntity<String> droneMode(
                        @PathVariable Long droneId) {

                manager.switchToSimulator();

                manager.getSimulator().simulateDrone(droneId);

                return ResponseEntity.ok(
                                "Simulator Mode For Drone " + droneId);

        }

        @PostMapping("/mode/real")
        public ResponseEntity<String> realMode() {

                manager.switchToReal();

                return ResponseEntity.ok("Real Drone Mode");

        }

}