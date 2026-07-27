package com.aditya.dronemonitoring.simulator;

import java.util.concurrent.atomic.AtomicBoolean;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.aditya.dronemonitoring.dto.TelemetryRequestDTO;
import com.aditya.dronemonitoring.service.DroneTelemetryService;

@Service
public class TelemetrySimulatorService {

    private final TelemetryGenerator telemetryGenerator;
    private final DroneTelemetryService telemetryService;
    private static final Logger logger =
        LoggerFactory.getLogger(TelemetrySimulatorService.class);
    public TelemetrySimulatorService(
            TelemetryGenerator telemetryGenerator,
            DroneTelemetryService telemetryService) {

        this.telemetryGenerator = telemetryGenerator;
        this.telemetryService = telemetryService;
    }

    public void sendTelemetry(Long droneId) {

        TelemetryRequestDTO request =
                telemetryGenerator.generate(droneId);

        telemetryService.saveTelemetry(request);
    }

    public void test() {

    sendTelemetry(2L);

}
private final AtomicBoolean simulatorRunning =
        new AtomicBoolean(false);

public void startSimulator() {

    simulatorRunning.set(true);

    logger.info("Telemetry Simulator Started");
}

public void stopSimulator() {

    simulatorRunning.set(false);

    logger.info("Telemetry Simulator Stopped");
}

public boolean isSimulatorRunning() {

    return simulatorRunning.get();
}
}