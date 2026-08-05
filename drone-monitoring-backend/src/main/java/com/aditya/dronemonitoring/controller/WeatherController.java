package com.aditya.dronemonitoring.controller;


import com.aditya.dronemonitoring.dto.WeatherResponseDTO;
import com.aditya.dronemonitoring.service.WeatherService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {

        this.weatherService = weatherService;

    }

    @GetMapping
    public WeatherResponseDTO getWeather(

            @RequestParam double lat,

            @RequestParam double lon

    ) {

        return weatherService.getWeather(lat, lon);

    }

}