package com.aditya.dronemonitoring.repository;

import com.aditya.dronemonitoring.dto.BatteryChartDTO;
import com.aditya.dronemonitoring.entity.Drone;
import com.aditya.dronemonitoring.entity.DroneStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface DroneRepository extends
                JpaRepository<Drone, Long>,
                JpaSpecificationExecutor<Drone> {
        long countByStatus(DroneStatus status);

        @Query("SELECT AVG(d.batteryLevel) FROM Drone d")
        Double getAverageBatteryLevel();

        long countByBatteryLevelLessThan(Integer batteryLevel);

        @Query("""
                        SELECT new com.aditya.dronemonitoring.dto.BatteryChartDTO(
                        d.model,
                        d.batteryLevel
                        )
                        FROM Drone d
                        ORDER BY d.model
                        """)
        List<BatteryChartDTO> getBatteryChartData();
}