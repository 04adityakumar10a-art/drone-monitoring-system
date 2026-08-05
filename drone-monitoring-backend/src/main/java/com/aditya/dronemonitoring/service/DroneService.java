package com.aditya.dronemonitoring.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import com.aditya.dronemonitoring.dto.DroneRequestDTO;
import com.aditya.dronemonitoring.dto.DroneResponseDTO;
import com.aditya.dronemonitoring.dto.websocket.DroneEvent;
import com.aditya.dronemonitoring.entity.Drone;
import com.aditya.dronemonitoring.entity.DroneStatus;
import com.aditya.dronemonitoring.exception.DroneNotFoundException;
import com.aditya.dronemonitoring.repository.DroneRepository;
import com.aditya.dronemonitoring.specification.DroneSpecification;
import com.aditya.dronemonitoring.util.DroneMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DroneService {
    private final DroneRepository droneRepository;

    private final SimpMessagingTemplate messagingTemplate;
    private static final Logger logger = LoggerFactory.getLogger(DroneService.class);

    public DroneService(
            DroneRepository droneRepository,
            SimpMessagingTemplate messagingTemplate) {

        this.droneRepository = droneRepository;
        this.messagingTemplate = messagingTemplate;

    }

    public DroneResponseDTO saveDrone(DroneRequestDTO request) {

        logger.info("Creating drone with serial number {}", request.getSerialNumber());

        Drone drone = DroneMapper.toEntity(request);

        Drone savedDrone = droneRepository.save(drone);

        messagingTemplate.convertAndSend(

                "/topic/drones",

                new DroneEvent(

                        "DRONE_CREATED",

                        DroneMapper.toResponse(savedDrone)

                )

        );

        logger.info("Drone created successfully with ID {}", savedDrone.getId());

        return DroneMapper.toResponse(savedDrone);
    }

    public Page<DroneResponseDTO> getAllDrones(Pageable pageable) {

        logger.info("Fetching page {} of drones", pageable.getPageNumber());

        return droneRepository.findAll(pageable)
                .map(DroneMapper::toResponse);
    }

    public DroneResponseDTO getDroneById(Long id) {

        logger.info("Fetching drone with ID {}", id);

        Drone drone = droneRepository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Drone with ID {} not found", id);
                    return new DroneNotFoundException(id);
                });

        logger.info("Drone with ID {} retrieved successfully", id);

        return DroneMapper.toResponse(drone);
    }

    public DroneResponseDTO updateDrone(Long id, DroneRequestDTO request) {

        logger.info("Updating drone with ID {}", id);

        Drone existingDrone = droneRepository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Drone with ID {} not found for update", id);
                    return new DroneNotFoundException(id);
                });

        existingDrone.setSerialNumber(request.getSerialNumber());
        existingDrone.setModel(request.getModel());
        existingDrone.setManufacturer(request.getManufacturer());
        existingDrone.setBatteryLevel(request.getBatteryLevel());
        existingDrone.setStatus(request.getStatus());

        Drone updatedDrone = droneRepository.save(existingDrone);

        messagingTemplate.convertAndSend(

                "/topic/drones",

                new DroneEvent(

                        "DRONE_UPDATED",

                        DroneMapper.toResponse(updatedDrone)

                )

        );

        logger.info("Drone with ID {} updated successfully", id);

        return DroneMapper.toResponse(updatedDrone);
    }

    public void deleteDrone(Long id) {

        logger.info("Deleting drone with ID {}", id);

        Drone drone = droneRepository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Drone with ID {} not found for deletion", id);
                    return new DroneNotFoundException(id);
                });
        messagingTemplate.convertAndSend(

                "/topic/drones",

                new DroneEvent(

                        "DRONE_DELETED",

                        id

                )

        );
        droneRepository.delete(drone);

        logger.info("Drone with ID {} deleted successfully", id);
    }

    public List<DroneResponseDTO> searchDrones(
            DroneStatus status,
            String manufacturer,
            Integer batteryLessThan) {

        Specification<Drone> specification = Specification.unrestricted();

        if (status != null) {
            specification = specification.and(
                    DroneSpecification.hasStatus(status));
        }

        if (manufacturer != null) {
            specification = specification.and(
                    DroneSpecification.hasManufacturer(manufacturer));
        }

        if (batteryLessThan != null) {
            specification = specification.and(
                    DroneSpecification.batteryLessThan(batteryLessThan));
        }

        logger.info(
                "Searching drones with filters - Status: {}, Manufacturer: {}, Battery < {}",
                status,
                manufacturer,
                batteryLessThan);

        return droneRepository.findAll(specification)
                .stream()
                .map(DroneMapper::toResponse)
                .toList();
    }

}