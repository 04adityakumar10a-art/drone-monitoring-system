package com.aditya.dronemonitoring.controller;

import com.aditya.dronemonitoring.dto.DroneRequestDTO;
import com.aditya.dronemonitoring.dto.DroneResponseDTO;
import com.aditya.dronemonitoring.entity.DroneStatus;
import com.aditya.dronemonitoring.service.DroneService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/drones")
public class DroneController {

    private final DroneService droneService;

    public DroneController(DroneService droneService) {
        this.droneService = droneService;
    }

    @PostMapping
@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DroneResponseDTO> createDrone(
            @Valid @RequestBody DroneRequestDTO request) {

        DroneResponseDTO response = droneService.saveDrone(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
@PreAuthorize("isAuthenticated()")
public ResponseEntity<Page<DroneResponseDTO>> getAllDrones(Pageable pageable) {

    return ResponseEntity.ok(
            droneService.getAllDrones(pageable));
}

    @GetMapping("/{id}")
@PreAuthorize("isAuthenticated()")   
public ResponseEntity<DroneResponseDTO> getDroneById(
        @PathVariable Long id) {

    return ResponseEntity.ok(
            droneService.getDroneById(id));
}


    @PutMapping("/{id}")
@PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
public ResponseEntity<DroneResponseDTO> updateDrone(
        @PathVariable Long id,
        @Valid @RequestBody DroneRequestDTO request) {

    return ResponseEntity.ok(
            droneService.updateDrone(id, request));
} 

   @DeleteMapping("/{id}")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<Void> deleteDrone(@PathVariable Long id) {

    droneService.deleteDrone(id);

    return ResponseEntity.noContent().build();
}

@GetMapping("/search")
public ResponseEntity<List<DroneResponseDTO>> searchDrones(

        @RequestParam(required = false) DroneStatus status,

        @RequestParam(required = false) String manufacturer,

        @RequestParam(required = false) Integer batteryLessThan) {

    return ResponseEntity.ok(
            droneService.searchDrones(
                    status,
                    manufacturer,
                    batteryLessThan));
}
}