package com.aditya.dronemonitoring.util;

import com.aditya.dronemonitoring.dto.DroneRequestDTO;
import com.aditya.dronemonitoring.dto.DroneResponseDTO;
import com.aditya.dronemonitoring.entity.Drone;

public class DroneMapper {
    private DroneMapper() {
        /* This utility class should not be instantiated */
    }


    public static Drone toEntity(DroneRequestDTO dto) {

        Drone drone = new Drone();

        drone.setSerialNumber(dto.getSerialNumber());
        drone.setModel(dto.getModel());
        drone.setManufacturer(dto.getManufacturer());
        drone.setBatteryLevel(dto.getBatteryLevel());
        drone.setStatus(dto.getStatus());

        return drone;
    }

    public static DroneResponseDTO toResponse(Drone drone) {

        DroneResponseDTO dto = new DroneResponseDTO();

        dto.setId(drone.getId());
        dto.setSerialNumber(drone.getSerialNumber());
        dto.setModel(drone.getModel());
        dto.setManufacturer(drone.getManufacturer());
        dto.setBatteryLevel(drone.getBatteryLevel());
        dto.setStatus(drone.getStatus());

        return dto;
    }
}