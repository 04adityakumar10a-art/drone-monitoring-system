package com.aditya.dronemonitoring.simulator;

import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.aditya.dronemonitoring.dto.DroneStatusDTO;
import com.aditya.dronemonitoring.entity.Drone;
import com.aditya.dronemonitoring.entity.DroneStatus;
import com.aditya.dronemonitoring.repository.DroneRepository;
import com.aditya.dronemonitoring.websocket.DronePublisher;

@Component
public class DroneStatusScheduler {
    private final DronePublisher dronePublisher;
    private final DroneRepository droneRepository;

    public DroneStatusScheduler(

            DroneRepository droneRepository,

            DronePublisher dronePublisher) {

        this.droneRepository = droneRepository;

        this.dronePublisher = dronePublisher;

    }

    @Scheduled(fixedDelay = 2000)
    public void updateOfflineStatus() {

        LocalDateTime now = LocalDateTime.now();

        for (Drone drone : droneRepository.findAll()) {

            if (drone.getLastSeen() == null) {

                continue;

            }

            long seconds =

                    java.time.Duration

                            .between(

                                    drone.getLastSeen(),

                                    now

                            )

                            .getSeconds();

            if (seconds >= 5 &&
                    drone.getStatus() != DroneStatus.OFFLINE) {

                drone.setStatus(

                        DroneStatus.OFFLINE

                );

                droneRepository.save(drone);
                DroneStatusDTO dto = new DroneStatusDTO();

                dto.setId(drone.getId());

                dto.setStatus(drone.getStatus().name());

                dto.setBatteryLevel(drone.getBatteryLevel());

                dto.setLatitude(drone.getLatitude());

                dto.setLongitude(drone.getLongitude());

                dto.setAltitude(drone.getAltitude());

                dronePublisher.publish(dto);

            }

        }

    }

}