package com.aditya.dronemonitoring.simulator;

import java.util.Random;

import org.springframework.stereotype.Component;

import com.aditya.dronemonitoring.dto.TelemetryRequestDTO;

@Component
public class TelemetryGenerator {

    private final Random random = new Random();

    // Initial Position (SGSITS Indore)
    private double latitude = 22.7533;
    private double longitude = 75.8937;

    private double altitude = 120.0;

    private double heading = 0.0;

    private int battery = 100;

    public TelemetryRequestDTO generate(Long droneId) {

        TelemetryRequestDTO dto = new TelemetryRequestDTO();

        // Drone ID
        dto.setDroneId(droneId);

        // Battery
        battery--;

        if (battery < 0) {
            battery = 100;
        }

        dto.setBatteryLevel(battery);

        // Small GPS movement
        latitude += (random.nextDouble() - 0.5) * 0.0002;
        longitude += (random.nextDouble() - 0.5) * 0.0002;

        dto.setLatitude(latitude);
        dto.setLongitude(longitude);

        // Altitude
        altitude += (random.nextDouble() - 0.5) * 3;

        if (altitude < 0) {
            altitude = 0;
        }

        dto.setAltitude(altitude);

        // Speed (10–20 m/s)
        dto.setSpeed(10 + random.nextDouble() * 10);

        // Heading
        heading += random.nextDouble() * 15;

        if (heading >= 360) {
            heading -= 360;
        }

        dto.setHeading(heading);

        // Signal Strength (80–100%)
        dto.setSignalStrength(80 + random.nextInt(21));

        return dto;
    }
}