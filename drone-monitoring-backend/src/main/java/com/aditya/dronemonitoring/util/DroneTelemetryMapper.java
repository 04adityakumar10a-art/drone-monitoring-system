package com.aditya.dronemonitoring.util;

import com.aditya.dronemonitoring.dto.TelemetryRequestDTO;
import com.aditya.dronemonitoring.dto.TelemetryResponseDTO;
import com.aditya.dronemonitoring.entity.DroneTelemetry;

public final class DroneTelemetryMapper {

    private DroneTelemetryMapper() {
    }

    public static DroneTelemetry toEntity(
            TelemetryRequestDTO dto) {

        DroneTelemetry telemetry = new DroneTelemetry();

        telemetry.setLatitude(dto.getLatitude());
        telemetry.setLongitude(dto.getLongitude());
        telemetry.setAltitude(dto.getAltitude());
        telemetry.setSpeed(dto.getSpeed());
        telemetry.setHeading(dto.getHeading());
        telemetry.setBatteryLevel(dto.getBatteryLevel());
        telemetry.setSignalStrength(dto.getSignalStrength());

        return telemetry;
    }

    public static TelemetryResponseDTO toResponse(
            DroneTelemetry telemetry) {

        TelemetryResponseDTO dto =
                new TelemetryResponseDTO();

        dto.setId(telemetry.getId());

        dto.setDroneId(
                telemetry.getDrone().getId());

        dto.setLatitude(telemetry.getLatitude());
        dto.setLongitude(telemetry.getLongitude());
        dto.setAltitude(telemetry.getAltitude());
        dto.setSpeed(telemetry.getSpeed());
        dto.setHeading(telemetry.getHeading());
        dto.setBatteryLevel(telemetry.getBatteryLevel());
        dto.setSignalStrength(telemetry.getSignalStrength());
        dto.setTimestamp(telemetry.getTimestamp());

        return dto;
    }
}