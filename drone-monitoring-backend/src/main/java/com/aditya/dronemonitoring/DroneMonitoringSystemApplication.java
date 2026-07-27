package com.aditya.dronemonitoring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableScheduling
public class DroneMonitoringSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(DroneMonitoringSystemApplication.class, args);
    }
}