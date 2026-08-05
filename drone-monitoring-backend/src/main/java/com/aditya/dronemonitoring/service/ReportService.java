package com.aditya.dronemonitoring.service;

import com.aditya.dronemonitoring.entity.Drone;
import com.aditya.dronemonitoring.repository.DroneRepository;
import com.aditya.dronemonitoring.util.CsvGenerator;
import com.aditya.dronemonitoring.util.ExcelGenerator;
import com.aditya.dronemonitoring.util.PdfGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final DroneRepository droneRepository;

    public byte[] exportFleetCsv() {

        List<Drone> drones = droneRepository.findAll();

        return CsvGenerator.generateFleetCsv(drones);

    }

    public byte[] exportFleetExcel() {

        List<Drone> drones = droneRepository.findAll();

        return ExcelGenerator.generateFleetExcel(drones);

    }

    public byte[] exportFleetPdf() {

        List<Drone> drones = droneRepository.findAll();

        return PdfGenerator.generateFleetPdf(drones);

    }

    public byte[] exportDroneCsv(Long id) {

        Drone drone = droneRepository.findById(id)

                .orElseThrow(() -> new RuntimeException("Drone Not Found"));

        return CsvGenerator.generateFleetCsv(List.of(drone));

    }

    public byte[] exportDroneExcel(Long id) {

        Drone drone = droneRepository.findById(id)

                .orElseThrow(() -> new RuntimeException("Drone Not Found"));

        return ExcelGenerator.generateFleetExcel(List.of(drone));

    }

    public byte[] exportDronePdf(Long id) {

        Drone drone = droneRepository.findById(id)

                .orElseThrow(() -> new RuntimeException("Drone Not Found"));

        return PdfGenerator.generateFleetPdf(List.of(drone));

    }

}