package com.aditya.dronemonitoring.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aditya.dronemonitoring.dto.BatteryChartDTO;
import com.aditya.dronemonitoring.dto.BatteryDistributionDTO;
import com.aditya.dronemonitoring.dto.DashboardStatsDTO;
import com.aditya.dronemonitoring.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {

        return ResponseEntity.ok(

                dashboardService.getDashboardStats()

        );

    }

    @GetMapping("/battery")
public ResponseEntity<List<BatteryChartDTO>> getBatteryChart() {

    return ResponseEntity.ok(
            dashboardService.getBatteryChartData());

}


@GetMapping("/battery-distribution")
public ResponseEntity<List<BatteryDistributionDTO>>
getBatteryDistribution() {

    return ResponseEntity.ok(

            dashboardService.getBatteryDistribution()

    );

}
}