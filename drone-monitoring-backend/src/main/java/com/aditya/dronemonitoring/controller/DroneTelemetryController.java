package com.aditya.dronemonitoring.controller;

import com.aditya.dronemonitoring.dto.TelemetryRequestDTO;
import com.aditya.dronemonitoring.dto.TelemetryResponseDTO;
import com.aditya.dronemonitoring.dto.TelemetrySearchDTO;
import com.aditya.dronemonitoring.service.DroneTelemetryService;
import jakarta.validation.Valid;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("/api/telemetry")
public class DroneTelemetryController {

    private final DroneTelemetryService telemetryService;

    public DroneTelemetryController(DroneTelemetryService telemetryService) {
        this.telemetryService = telemetryService;
    }

    @PostMapping
    public ResponseEntity<TelemetryResponseDTO> saveTelemetry(
            @Valid @RequestBody TelemetryRequestDTO request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(telemetryService.saveTelemetry(request));
    }

    @GetMapping("/latest/{droneId}")
public ResponseEntity<TelemetryResponseDTO> getLatestTelemetry(
        @PathVariable Long droneId) {

    return ResponseEntity.ok(
            telemetryService.getLatestTelemetry(droneId));
}

@GetMapping("/history/{droneId}")
public ResponseEntity<Page<TelemetryResponseDTO>>
getTelemetryHistory(

        @PathVariable Long droneId,

        @RequestParam(defaultValue = "0")
        int page,

        @RequestParam(defaultValue = "10")
        int size,

        @RequestParam(defaultValue = "timestamp")
        String sortBy,

        @RequestParam(defaultValue = "desc")
        String direction) {

    Sort sort = direction.equalsIgnoreCase("desc")
            ? Sort.by(sortBy).descending()
            : Sort.by(sortBy).ascending();

    Pageable pageable =
            PageRequest.of(page, size, sort);

    return ResponseEntity.ok(
            telemetryService.getTelemetryHistory(
                    droneId,
                    pageable));
}

@GetMapping("/search")
public ResponseEntity<Page<TelemetryResponseDTO>> searchTelemetry(

        TelemetrySearchDTO searchDTO,

        @RequestParam(defaultValue = "0")
        int page,

        @RequestParam(defaultValue = "10")
        int size,

        @RequestParam(defaultValue = "timestamp")
        String sortBy,

        @RequestParam(defaultValue = "desc")
        String direction) {

    Sort sort = direction.equalsIgnoreCase("desc")
            ? Sort.by(sortBy).descending()
            : Sort.by(sortBy).ascending();

    Pageable pageable =
            PageRequest.of(page, size, sort);

    return ResponseEntity.ok(
            telemetryService.searchTelemetry(
                    searchDTO,
                    pageable));
}
}