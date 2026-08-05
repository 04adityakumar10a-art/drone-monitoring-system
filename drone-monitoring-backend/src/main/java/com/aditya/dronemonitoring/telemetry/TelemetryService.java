package com.aditya.dronemonitoring.telemetry;

import com.aditya.dronemonitoring.entity.Drone;
import com.aditya.dronemonitoring.entity.DroneStatus;
import com.aditya.dronemonitoring.repository.DroneRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TelemetryService {

    private final DroneRepository droneRepository;

    private final Random random = new Random();

    /*
     * Stores previous telemetry values
     * so movement looks smooth instead of random.
     */
    private final Map<Long, TelemetryDTO> telemetryCache =
            new ConcurrentHashMap<>();

    public TelemetryService(DroneRepository droneRepository) {

        this.droneRepository = droneRepository;

    }

    public List<TelemetryDTO> generateTelemetry() {

        List<Drone> drones = droneRepository.findAll();

        List<TelemetryDTO> telemetry = new ArrayList<>();

        for (Drone drone : drones) {

            telemetry.add(generateTelemetry(drone));

        }

        return telemetry;

    }

    private TelemetryDTO generateTelemetry(Drone drone) {

        TelemetryDTO previous = telemetryCache.get(drone.getId());

        TelemetryDTO dto = new TelemetryDTO();

        dto.setDroneId(drone.getId());

        dto.setDroneModel(drone.getModel());

        dto.setStatus(drone.getStatus().name());

        dto.setTimestamp(LocalDateTime.now());

        /*
         * Battery
         */

        double battery;

        if (previous == null) {

            battery = drone.getBatteryLevel();

        } else {

            battery = previous.getBattery() - random.nextDouble() * 0.15;

        }

        battery = Math.max(0, battery);

        dto.setBattery(round(battery));

        /*
         * Altitude
         */

        double altitude;

        if (drone.getStatus() == DroneStatus.IN_FLIGHT) {

            if (previous == null) {

                altitude = 15;

            } else {

                altitude = previous.getAltitude()

                        + random.nextDouble() * 4 - 2;

            }

            altitude = Math.max(5, altitude);

        } else {

            altitude = 0;

        }

        dto.setAltitude(round(altitude));

        /*
         * Speed
         */

        double speed;

        if (drone.getStatus() == DroneStatus.IN_FLIGHT) {

            speed = 10 + random.nextDouble() * 10;

        } else {

            speed = 0;

        }

        dto.setSpeed(round(speed));

        /*
         * GPS
         */

        double latitude;

        double longitude;

        if (previous == null) {

            latitude = 22.7196;

            longitude = 75.8577;

        }

        else {

            latitude = previous.getLatitude()

                    + (random.nextDouble() - 0.5) * 0.00005;

            longitude = previous.getLongitude()

                    + (random.nextDouble() - 0.5) * 0.00005;

        }

        dto.setLatitude(round(latitude));

        dto.setLongitude(round(longitude));

        /*
         * Heading
         */

        dto.setHeading(

                round(random.nextDouble() * 360)

        );

        /*
         * Temperature
         */

        dto.setTemperature(

                round(30 + random.nextDouble() * 15)

        );

        /*
         * Signal
         */

        dto.setSignalStrength(

                round(85 + random.nextDouble() * 15)

        );

        telemetryCache.put(

                drone.getId(),

                dto

        );

        return dto;

    }

    private double round(double value) {

        return Math.round(value * 100.0) / 100.0;

    }

}