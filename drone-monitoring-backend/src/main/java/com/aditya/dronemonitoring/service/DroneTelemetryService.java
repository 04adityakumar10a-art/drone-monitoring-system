package com.aditya.dronemonitoring.service;

import com.aditya.dronemonitoring.dto.TelemetryRequestDTO;
import com.aditya.dronemonitoring.dto.TelemetryResponseDTO;
import com.aditya.dronemonitoring.entity.Drone;
import com.aditya.dronemonitoring.entity.DroneStatus;
import com.aditya.dronemonitoring.entity.DroneTelemetry;
import com.aditya.dronemonitoring.exception.DroneNotFoundException;
import com.aditya.dronemonitoring.repository.DroneRepository;
import com.aditya.dronemonitoring.repository.DroneTelemetryRepository;
import com.aditya.dronemonitoring.util.DroneTelemetryMapper;
import com.aditya.dronemonitoring.websocket.TelemetryPublisher;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.aditya.dronemonitoring.dto.TelemetrySearchDTO;
import com.aditya.dronemonitoring.specification.DroneTelemetrySpecification;
import java.time.LocalDateTime;

@Service
public class DroneTelemetryService {

        private static final Logger logger = LoggerFactory.getLogger(DroneTelemetryService.class);
        private final TelemetryPublisher telemetryPublisher;
        private final DroneRepository droneRepository;

        private final DroneTelemetryRepository telemetryRepository;

        public DroneTelemetryService(
        DroneTelemetryRepository telemetryRepository,
        DroneRepository droneRepository,
        TelemetryPublisher telemetryPublisher) {

                this.droneRepository = droneRepository;
                this.telemetryRepository = telemetryRepository;
                this.telemetryPublisher = telemetryPublisher;
        }

        @Transactional
        public TelemetryResponseDTO saveTelemetry(
                        TelemetryRequestDTO request) {

                logger.info(
                                "Received telemetry for drone {}",
                                request.getDroneId());

                Drone drone = droneRepository.findById(request.getDroneId())
                                .orElseThrow(() -> new DroneNotFoundException(
                                                request.getDroneId()));

                DroneTelemetry telemetry = DroneTelemetryMapper.toEntity(request);

                telemetry.setDrone(drone);

                telemetry.setTimestamp(LocalDateTime.now());

                DroneTelemetry savedTelemetry = telemetryRepository.save(telemetry);

                // Update current drone state
                drone.setBatteryLevel(request.getBatteryLevel());
                drone.setLatitude(request.getLatitude());
                drone.setLongitude(request.getLongitude());
                drone.setAltitude(request.getAltitude());
                drone.setLastSeen(LocalDateTime.now());
                drone.setStatus(determineStatus(request.getBatteryLevel()));

                droneRepository.save(drone);

                logger.info(
                                "Telemetry stored successfully for drone {}",
                                drone.getId());

                TelemetryResponseDTO response = DroneTelemetryMapper.toResponse(savedTelemetry);

                telemetryPublisher.publish(response);

                return response;
        }

        private static final int LOW_BATTERY_THRESHOLD = 20;

        private DroneStatus determineStatus(Integer batteryLevel) {

                if (batteryLevel < LOW_BATTERY_THRESHOLD) {
                        return DroneStatus.LOW_BATTERY;
                }

                return DroneStatus.AVAILABLE;
        }

        public TelemetryResponseDTO getLatestTelemetry(Long droneId) {

                logger.info("Fetching latest telemetry for drone {}", droneId);

                DroneTelemetry telemetry = telemetryRepository
                                .findTopByDrone_IdOrderByTimestampDesc(droneId)
                                .orElseThrow(() -> new DroneNotFoundException(droneId));

                return DroneTelemetryMapper.toResponse(telemetry);
        }

        public Page<TelemetryResponseDTO> getTelemetryHistory(
                        Long droneId,
                        Pageable pageable) {

                logger.info(
                                "Fetching telemetry history for drone {}",
                                droneId);

                return telemetryRepository
                                .findByDrone_Id(droneId, pageable)
                                .map(DroneTelemetryMapper::toResponse);
        }

        public Page<TelemetryResponseDTO> searchTelemetry(
                        TelemetrySearchDTO searchDTO,
                        Pageable pageable) {

                logger.info("Searching telemetry with filters");

                Specification<DroneTelemetry> specification =

                                Specification.where(
                                                DroneTelemetrySpecification.hasDroneId(
                                                                searchDTO.getDroneId()))

                                                .and(
                                                                DroneTelemetrySpecification.batteryBetween(
                                                                                searchDTO.getMinBattery(),
                                                                                searchDTO.getMaxBattery()))

                                                .and(
                                                                DroneTelemetrySpecification.speedBetween(
                                                                                searchDTO.getMinSpeed(),
                                                                                searchDTO.getMaxSpeed()))

                                                .and(
                                                                DroneTelemetrySpecification.altitudeBetween(
                                                                                searchDTO.getMinAltitude(),
                                                                                searchDTO.getMaxAltitude()))

                                                .and(
                                                                DroneTelemetrySpecification.signalStrengthGreaterThan(
                                                                                searchDTO.getMinSignalStrength()))

                                                .and(
                                                                DroneTelemetrySpecification.timestampBetween(
                                                                                searchDTO.getStartTime(),
                                                                                searchDTO.getEndTime()));

                return telemetryRepository
                                .findAll(specification, pageable)
                                .map(DroneTelemetryMapper::toResponse);
        }
}