package com.aditya.dronemonitoring.websocket;

import com.aditya.dronemonitoring.dto.TelemetryResponseDTO;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class TelemetryPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    public TelemetryPublisher(
            SimpMessagingTemplate messagingTemplate) {

        this.messagingTemplate = messagingTemplate;
    }

    public void publish(TelemetryResponseDTO telemetry) {

        messagingTemplate.convertAndSend(
                "/topic/telemetry",
                telemetry);

    }
}