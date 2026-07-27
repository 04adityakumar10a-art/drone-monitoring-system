package com.aditya.dronemonitoring.exception;

public class DroneNotFoundException extends RuntimeException {

    public DroneNotFoundException(Long id) {
        super("Drone with ID " + id + " not found");
    }
}