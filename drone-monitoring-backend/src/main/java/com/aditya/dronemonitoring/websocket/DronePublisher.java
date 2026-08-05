package com.aditya.dronemonitoring.websocket;

import com.aditya.dronemonitoring.dto.DroneStatusDTO;
import com.aditya.dronemonitoring.entity.Drone;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class DronePublisher {

    private final SimpMessagingTemplate messagingTemplate;

    public DronePublisher(
            SimpMessagingTemplate messagingTemplate) {

        this.messagingTemplate = messagingTemplate;

    }

    public void publish(DroneStatusDTO drone) {

        messagingTemplate.convertAndSend(

                "/topic/drone-status",

                drone

        );

    }

}