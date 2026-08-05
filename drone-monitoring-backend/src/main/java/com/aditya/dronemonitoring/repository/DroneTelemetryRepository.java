package com.aditya.dronemonitoring.repository;

import com.aditya.dronemonitoring.entity.DroneTelemetry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DroneTelemetryRepository
                extends JpaRepository<DroneTelemetry, Long>,
                JpaSpecificationExecutor<DroneTelemetry> {
        Optional<DroneTelemetry> findTopByDrone_IdOrderByTimestampDesc(Long droneId);

        Page<DroneTelemetry> findByDrone_Id(
                        Long droneId,
                        Pageable pageable);

        List<DroneTelemetry> findByDrone_IdOrderByTimestampAsc(Long droneId);
}