package com.aditya.dronemonitoring.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.aditya.dronemonitoring.dto.BatteryChartDTO;
import com.aditya.dronemonitoring.dto.BatteryDistributionDTO;
import com.aditya.dronemonitoring.dto.DashboardStatsDTO;
import com.aditya.dronemonitoring.entity.Drone;
import com.aditya.dronemonitoring.entity.DroneStatus;
import com.aditya.dronemonitoring.repository.DroneRepository;

@Service
public class DashboardService {

        private final DroneRepository droneRepository;

        public DashboardService(DroneRepository droneRepository) {
                this.droneRepository = droneRepository;
        }

        public DashboardStatsDTO getDashboardStats() {

                long total = droneRepository.count();

                long available = droneRepository.countByStatus(DroneStatus.AVAILABLE);

                long inFlight = droneRepository.countByStatus(DroneStatus.IN_FLIGHT);

                long maintenance = droneRepository.countByStatus(DroneStatus.MAINTENANCE);

                long lowBattery = droneRepository.countByBatteryLevelLessThan(30);

                Double avg = droneRepository.getAverageBatteryLevel();

                return new DashboardStatsDTO(

                                total,

                                available,

                                inFlight,

                                maintenance,

                                lowBattery,

                                avg == null ? 0 : avg

                );

        }

        public List<BatteryChartDTO> getBatteryChartData() {

                return droneRepository.getBatteryChartData();

        }

        public List<BatteryDistributionDTO> getBatteryDistribution() {

                List<Drone> drones = droneRepository.findAll();

                long high = drones.stream()
                                .filter(d -> d.getBatteryLevel() >= 80)
                                .count();

                long medium = drones.stream()
                                .filter(d -> d.getBatteryLevel() >= 60 && d.getBatteryLevel() < 80)
                                .count();

                long low = drones.stream()
                                .filter(d -> d.getBatteryLevel() >= 30 && d.getBatteryLevel() < 60)
                                .count();

                long critical = drones.stream()
                                .filter(d -> d.getBatteryLevel() < 30)
                                .count();

                return List.of(

                                new BatteryDistributionDTO("80-100%", high),

                                new BatteryDistributionDTO("60-79%", medium),

                                new BatteryDistributionDTO("30-59%", low),

                                new BatteryDistributionDTO("0-29%", critical)

                );

        }

}