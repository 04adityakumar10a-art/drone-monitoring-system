package com.aditya.dronemonitoring.service;

import com.aditya.dronemonitoring.entity.DroneTelemetry;
import com.aditya.dronemonitoring.repository.DroneTelemetryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TelemetryExportService {

    private final DroneTelemetryRepository telemetryRepository;

    public TelemetryExportService(
            DroneTelemetryRepository telemetryRepository) {

        this.telemetryRepository = telemetryRepository;

    }

    public String exportTelemetry(Long droneId) {

        List<DroneTelemetry> telemetryList =
                telemetryRepository.findByDrone_IdOrderByTimestampAsc(droneId);

        StringBuilder csv = new StringBuilder();

        csv.append("Timestamp,Battery,Speed,Altitude,Heading,Signal,Latitude,Longitude\n");

        for (DroneTelemetry telemetry : telemetryList) {

            csv.append(telemetry.getTimestamp()).append(",")

                    .append(telemetry.getBatteryLevel()).append(",")

                    .append(telemetry.getSpeed()).append(",")

                    .append(telemetry.getAltitude()).append(",")

                    .append(telemetry.getHeading()).append(",")

                    .append(telemetry.getSignalStrength()).append(",")

                    .append(telemetry.getLatitude()).append(",")

                    .append(telemetry.getLongitude())

                    .append("\n");

        }

        return csv.toString();

    }

}