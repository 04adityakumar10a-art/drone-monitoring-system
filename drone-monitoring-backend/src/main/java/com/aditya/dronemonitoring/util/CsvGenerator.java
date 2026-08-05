package com.aditya.dronemonitoring.util;

import com.aditya.dronemonitoring.entity.Drone;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;

import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class CsvGenerator {

    private CsvGenerator() {
    }

    public static byte[] generateFleetCsv(List<Drone> drones) {

        try {

            ByteArrayOutputStream out = new ByteArrayOutputStream();

            CSVPrinter csvPrinter = new CSVPrinter(
                    new OutputStreamWriter(out, StandardCharsets.UTF_8),
                    CSVFormat.DEFAULT.builder()
                            .setHeader(
                                    "ID",
                                    "Serial Number",
                                    "Model",
                                    "Manufacturer",
                                    "Battery",
                                    "Status",
                                    "Latitude",
                                    "Longitude",
                                    "Altitude",
                                    "Last Seen"
                            )
                            .build()
            );

            for (Drone drone : drones) {

                csvPrinter.printRecord(

                        drone.getId(),

                        drone.getSerialNumber(),

                        drone.getModel(),

                        drone.getManufacturer(),

                        drone.getBatteryLevel(),

                        drone.getStatus(),

                        drone.getLatitude(),

                        drone.getLongitude(),

                        drone.getAltitude(),

                        drone.getLastSeen()

                );

            }

            csvPrinter.flush();

            return out.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException("Failed to generate CSV report.", e);

        }

    }

}